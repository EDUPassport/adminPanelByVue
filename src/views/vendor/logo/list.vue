<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button   class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
    </div>

    <div>
      <el-table
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Description" width="160px" align="center">
          <template slot-scope="{row}">
            <span>{{row.logo_desc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Sort" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.sort }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Logo Image" width="160px" align="center">
          <template slot-scope="{row}">
            <el-image
              style="width: 100px; height: 50px"
              :src=" row.logo_url "
              fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column label="Create Time" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.c_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              Edit
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top">

        <el-form-item label="Description">
          <el-input v-model="temp.logo_desc"  type="textarea"/>
        </el-form-item>
        <el-form-item label="Sort">
          <el-input v-model="temp.sort" type="number" />
        </el-form-item>
        <el-form-item label="Logo Image">
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
            :before-remove="bannerBeforeRemove"
          >
            <i class="el-icon-upload" />
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

import waves from '@/directive/waves' // waves directive
import permission from '@/directive/permission/permission'
import {addSixLogo, getSixLogo} from '@/api/admin';

export default {
  name: 'list',
  components: {  },
  directives: { waves, permission },
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
        category:undefined,
        identity: 0,
        page: 1,
        limit: 50
      },
      importanceOptions: [1, 2, 3],
      isUseList:[
        { label: 'no', value: 0 },
        { label: 'yes', value: 1 }
      ],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        logo_url:'',
        logo_desc:'',
        sort:undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {

      },
      downloadLoading: false,
      fileUrl: undefined,
      fileList: undefined,
      categoryData:[],
      adsCategoryValue:undefined,
      adsBannerFileList:[],
      adsBannerFileUrl:undefined
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
    this.getSixLogo()
    // this.getList()
    // this.getAdsCategoryList()
  },
  methods: {
    getSixLogo(){
      let params = {}
      getSixLogo(params).then(res=>{
        console.log(res)
        this.list = res.message;
      }).catch(err=>{
        console.log(err)
      })
    },
    pidChange(e) {
      console.log(e)
      this.adsCategoryValue = e;
      this.temp.category = e;
    },
    resetTemp() {

      this.temp = {
        id: undefined,
        logo_url:'',
        logo_desc:'',
        sort:undefined
      }
    },
    handleCreate() {
      // console.log(this.adsCategoryValue)
      this.resetTemp()
      this.fileUrl='';
      this.fileList = [];

      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.temp.category = this.adsCategoryValue;
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.logo_url = this.fileUrl

          addSixLogo(this.temp).then((res) => {
            console.log(res)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            this.getSixLogo()
          })
        }
      })
    },
    handleUpdate(row) {
      console.log(row)

      this.temp = Object.assign({}, row) // copy obj
      this.temp.logo_id = row.id

      this.fileUrl = row.logo_url
      if(row.logo_url != ''){
        this.fileList = [{ name: '', url: row.logo_url }]
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
          this.temp.logo_url = this.fileUrl

          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          addSixLogo(tempData).then((res) => {
            console.log(res)
            if (res.code == 200) {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.getSixLogo()
              this.fileUrl = ''
            }
          })
        }
      })
    },
    uploadFileSuccess(response) {
      if (response.code == 200) {
        this.fileUrl = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    bannerBeforeRemove(file){
      if(file.status == 'success'){
        this.fileUrl = ''
      }
    }

  }
}
</script>
