<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        Search
      </el-button>
      <el-button v-permission="['lei','admin']" class="filter-item" style="margin-left: 10px;" type="primary"
                 icon="el-icon-edit" @click="handleCreateParent()">
        Add
      </el-button>
    </div>
    <div class="tree-container">
      <el-tree
        :data="list"
        node-key="id"
        default-expand-all
        auto-expand-parent
        highlight-current
        :expand-on-click-node="false">

      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.data.identity_name }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => handleCreate(data)">
            Add
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => handleUpdate(data)">
            Edit
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => handleDelete(data)">
            Delete
          </el-button>
        </span>
      </span>
      </el-tree>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top" style="width: 400px; margin-left:50px;">

        <el-form-item label="Name CN" prop="name_cn">
          <el-input v-model="temp.identity_name_cn" type="text"/>
        </el-form-item>
        <el-form-item label="Name EN" prop="name_en">
          <el-input v-model="temp.identity_name" type="text"/>
        </el-form-item>
        <el-form-item label="Icon Image">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="uploadFileSuccess"
            :file-list="fileList"
          >
            <i class="el-icon-upload"/>
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {addSubIdentity, getSubIdentity} from '@/api/system.js'
import {tree} from "@/utils";
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'

export default {
  name: 'Index',
  components: {Pagination},
  directives: {waves, permission},
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        cate: undefined,
        is_delete: 0,
        page: 1,
        limit: 1000
      },

      temp: {
        identity_name_cn: undefined,
        identity_name: undefined,
        icon_url: undefined,
        pid:undefined,
        identity_id:undefined,
        is_delete:0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        identity_name_cn: [{required: true, message: 'is required', trigger: 'change'}],
        identity_name: [{required: true, message: 'is required', trigger: 'change'}]
      },
      downloadLoading: false,
      // uploadHeaders:undefined,
      fileUrl: undefined,
      fileList: undefined
    }
  },
  computed: {
    token() {
      return this.$store.state.user.token
    },
    uploadHeaders() {
      return {
        token: this.$store.state.user.token
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getSubIdentity(this.listQuery).then(response => {

        let resData = response.message.data;
        // console.log(treeData);
        this.list = tree(resData);
        this.total = response.message.total

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        identity_name_cn: undefined,
        identity_name: undefined,
        icon_url: undefined,
        pid:undefined,
        identity_id:undefined
      }
      this.fileList = [];
      this.fileUrl = '';
    },
    handleCreateParent(){
      this.resetTemp()
      this.temp.pid = 0;
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreate(data) {

      this.resetTemp()
      this.temp.pid = data.id;

      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.icon_url = this.fileUrl
          addSubIdentity(this.temp).then((res) => {

            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            this.resetTemp()
            window.location.reload()
          })
        }
      })
    },
    handleUpdate(row) {
      // console.log(row)
      this.resetTemp();
      this.temp = Object.assign({}, row) // copy obj
      this.temp.identity_id = row.id
      if(row.icon_url){
        this.fileList = [{name: '', url: row.icon_url}]
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.icon_url = this.fileUrl
          const tempData = Object.assign({}, this.temp)

          addSubIdentity(tempData).then((res) => {
            // console.log(res)
            if (res.code == 200) {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.resetTemp()
            }
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      // this.list.splice(index, 1)
      addSubIdentity({is_delete: 1, identity_id: row.id}).then(res => {
        // console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    handleRecover(row) {
      addSubIdentity({is_delete: 0, identity_id: row.id}).then(res => {
        // console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    uploadFileSuccess(response, file, fileList) {

      if (response.code == 200) {
        this.fileUrl = response.data[0].file_url
      } else {
        console.log(response.msg)
      }

    }
  }
}
</script>

<style scoped>

.tree-container {
  border: 1px solid #eeeeee;
  /*border-radius: 10px;*/

  padding: 20px;
  margin-top: 50px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  padding-left: 20px;
  border-bottom: 1px solid #eeeeee;

}

</style>
