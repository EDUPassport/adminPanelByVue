<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.cate" placeholder="Identity" clearable class="filter-item">
        <el-option v-for="item in identityList" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        Search
      </el-button>
      <el-button  class="filter-item" style="margin-left: 10px;" type="primary"
                 icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"

      size="mini"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80"
                       :class-name="getSortClass('id')">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Identity" width="210px" align="center">
        <template v-slot="{row}">
          <span v-if="row.identity == 1">Educator</span>
          <span v-if="row.identity == 2">Recruiter</span>
          <span v-if="row.identity == 3">School</span>
          <span v-if="row.identity == 4">Other</span>
          <span v-if="row.identity == 5">Vendor</span>
          <span v-if="row.identity == 6">Contributor</span>
        </template>
      </el-table-column>
      <el-table-column label="Name EN" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.menu_name_en }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Name CN" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.menu_name_cn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Link" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.link }}</span>
        </template>
      </el-table-column>
      <el-table-column label="H5 Link" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.link_h5 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Icon" width="110px" align="center">
        <template v-slot="{row}">
          <el-image
            style="width: 100px; height: 50px"
            :src=" row.icon "
            fit="contain"
          />
        </template>
      </el-table-column>
      <el-table-column label="Selected Icon" width="110px" align="center">
        <template v-slot="{row}">
          <el-image
            style="width: 100px; height: 50px"
            :src=" row.icon_hover "
            fit="contain"
          />
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template v-slot="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.is_delete===1" size="mini" @click="handleRecover(row)">
            Enable
          </el-button>
          <el-button v-if="row.is_delete===0"  size="mini" type="danger"
                     @click="handleDelete(row,$index)">
            Disable
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top" style="width: 400px; margin-left:50px;">

<!--        <el-form-item label="Platform" prop="platform">-->
<!--          <el-select v-model="temp.platform" class="filter-item" placeholder="Please select">-->
<!--            <el-option v-for="item in platformList" :key="item.value" :label="item.label" :value="item.value"/>-->
<!--          </el-select>-->
<!--        </el-form-item>-->

        <el-form-item label="Identity" prop="identity">
          <el-select v-model="temp.identity" class="filter-item" placeholder="Please select">
            <el-option v-for="item in identityList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="Name EN" prop="menu_name_en">
          <el-input v-model="temp.menu_name_en" type="text"/>
        </el-form-item>

        <el-form-item label="Name CN" prop="menu_name_cn">
          <el-input v-model="temp.menu_name_cn" type="text"/>
        </el-form-item>

        <el-form-item label="Link" prop="link">
          <el-input v-model="temp.link" type="text"/>
        </el-form-item>

        <el-form-item label="H5 Link" prop="link_h5">
          <el-input v-model="temp.link_h5" type="text"/>
        </el-form-item>

        <el-form-item label="Icon">
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

        <el-form-item label="Selected Icon">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="uploadFileForHoverSuccess"
            :file-list="fileListForHover"
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
import {addMenuForAdminUser, getAdminUserMenuList} from '@/api/system.js'
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
        identity: undefined,
        page: 1,
        limit: 20
      },
      importanceOptions: [1, 2, 3],
      platformList: [
        {label: 'H5', value: 'h5'},
        {label: 'Wechat Platform', value: 'mp'},
        {label: 'Mini Program', value: 'mini'},
        {label: 'PC', value: 'pc'},
        {label: 'APP', value: 'app'},
      ],
      identityList: [
        {label: 'Educator', value: 1},
        {label: 'Recruiter', value: 2},
        {label: 'School', value: 3},
        {label: 'Other', value: 4},
        {label: 'Vendor', value: 5},
        {label:'Contributor', value: 6}
      ],
      sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        platform:undefined,
        identity: undefined,
        menu_name_cn: undefined,
        menu_name_en: undefined,
        link: undefined,
        link_h5:undefined,
        icon: undefined,
        icon_hover: undefined
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
        menu_name_cn: [{required: true, message: 'name is required', trigger: 'change'}],
        menu_name_en: [{required: true, message: 'name is required', trigger: 'change'}],
        link: [{required: true, message: 'link is required', trigger: 'change'}]
      },
      downloadLoading: false,
      // uploadHeaders:undefined,
      fileUrl: undefined,
      fileList: undefined,
      fileUrlForHover:undefined,
      fileListForHover: undefined

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
      getAdminUserMenuList(this.listQuery).then(response => {
        console.log(response)
        // this.list = response.message.data
        this.list = response.message.data
        this.total = response.message.total

        // Just to simulate the time of the request
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
    sortChange(data) {
      const {prop, order} = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        identity: undefined,
        menu_name_cn: undefined,
        menu_name_en: undefined,
        link: undefined,
        link_h5: undefined,
        icon: undefined,
        icon_hover:undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.fileList = undefined
      this.fileListForHover = undefined
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          this.temp.icon = this.fileUrl
          this.temp.icon_hover = this.fileUrlForHover

          addMenuForAdminUser(this.temp).then((res) => {
            console.log(res)
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      console.log(row)
      this.temp = Object.assign({}, row) // copy obj
      this.temp.id = row.id

      this.fileList = [{name: '', url: row.icon}]
      this.fileListForHover = [{name: '', url: row.icon_hover}]
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.icon = this.fileUrl
          this.temp.icon_hover = this.fileUrlForHover
          const tempData = Object.assign({}, this.temp)

          addMenuForAdminUser(tempData).then((res) => {
            console.log(res)
            if (res.code == 200) {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.fileUrl = ''
              this.fileUrlForHover = ''
            }
          })
        }
      })
    },
    handleDelete(row) {

      // this.list.splice(index, 1)
      addMenuForAdminUser({is_delete: 1, id: row.id}).then(res => {
        console.log(res)
        if(res.code == 200){
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }

      }).catch(error => {
        console.log(error)
      })
    },
    handleRecover(row) {
      addMenuForAdminUser({is_delete: 0, id: row.id}).then(res => {
        console.log(res)
        if(res.code == 200){
          this.getList()
        }

      }).catch(error => {
        console.log(error)
      })
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    uploadFileSuccess(response) {
      if (response.code == 200) {
        this.fileUrl = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    uploadFileForHoverSuccess(response) {
      if (response.code == 200) {
        this.fileUrlForHover = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    }

  }
}

</script>
