<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.cate" placeholder="Category" clearable class="filter-item">
        <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        Search
      </el-button>
      <el-button v-permission="['lei','admin']" class="filter-item" style="margin-left: 10px;" type="primary"
                 icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
    </div>

    <el-tabs value="APP" style="margin-top:15px;" type="border-card" @tab-click="tabClickJobs">
      <el-tab-pane v-for="item in categoryList" :key="item.value" :label="item.label" :name="item.label">
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
          <el-table-column label="Category" width="110px" align="center">
            <template v-slot="{row}">
              <span v-if="row.cate==1" class="link-type">APP</span>
              <span v-if="row.cate==2" class="link-type">Admin Panel</span>
            </template>
          </el-table-column>
          <el-table-column label="System Key" width="210px" align="center">
            <template v-slot="{row}">
              <span v-if="row.sys_key == 1">Vendor Qrcode</span>
              <span v-if="row.sys_key == 2">Discount Card</span>
              <span v-if="row.sys_key == 3">Contact Qrcode</span>
              <span v-if="row.sys_key == 4">Esl Logo</span>
              <span v-if="row.sys_key == 5">Discount_Sample</span>
              <span v-if="row.sys_key == 6">Educator_Upgrade_Basic</span>
              <span v-if="row.sys_key == 7">Educator_Upgrade_Pro</span>
              <span v-if="row.sys_key == 8">Educator_Upgrade_Plus</span>
              <span v-if="row.sys_key == 9">Business_Upgrade_Basic</span>
              <span v-if="row.sys_key == 10">Business_Upgrade_Pro</span>
              <span v-if="row.sys_key == 11">Business_Upgrade_Plus</span>
              <span v-if="row.sys_key == 12">Vendor_Upgrade_Basic</span>
              <span v-if="row.sys_key == 13">Vendor_Upgrade_Pro</span>
              <span v-if="row.sys_key == 14">Vendor_Upgrade_Plus</span>
              <span v-if="row.sys_key == 15">Lama</span>
              <span v-if="row.sys_key == 16">Vendor_Featured_logos</span>
              <span v-if="row.sys_key == 17">Me_Upgrade_Discount_Icon</span>
            </template>
          </el-table-column>
          <el-table-column label="Comment" width="200px" align="center">
            <template v-slot="{row}">
              <span>{{ row.comment }}</span>
            </template>
          </el-table-column>

          <el-table-column label="System Value" width="110px" align="center">
            <template v-slot="{row}">
              <el-image
                style="width: 100px; height: 50px"
                :src=" row.sys_value "
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
      </el-tab-pane>
    </el-tabs>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top" style="width: 400px; margin-left:50px;">
        <el-form-item label="Category" prop="cate">
          <el-select v-model="temp.cate" class="filter-item" placeholder="Please select">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="System Key" prop="sys_key">
          <el-select v-model="temp.sys_key" class="filter-item" placeholder="Please select">
            <el-option v-for="item in sysKeyList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Comment" prop="comment">
          <el-input v-model="temp.comment" type="textarea"/>
        </el-form-item>

        <el-form-item label="System Value">
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
import {addSystem, getSystemInfo} from '@/api/system.js'
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
        page: 1,
        limit: 20
      },
      importanceOptions: [1, 2, 3],
      categoryList: [
        {label: 'APP', value: 1},
        {label: 'Admin Panel', value: 2}
      ],
      sysKeyList: [
        {label: 'Vendor_Qrcode', value: 1},
        {label: 'Discount_Card', value: 2},
        {label: 'Contact_Qrcode', value: 3},
        {label: 'Esl_Logo', value: 4},
        {label: 'Discount_Sample', value: 5},
        {label: 'Educator_Upgrade_Basic', value: 6},
        {label: 'Educator_Upgrade_Pro', value: 7},
        {label: 'Educator_Upgrade_Plus', value: 8},
        {label: 'Business_Upgrade_Basic', value: 9},
        {label: 'Business_Upgrade_Pro', value: 10},
        {label: 'Business_Upgrade_Plus', value: 11},
        {label: 'Vendor_Upgrade_Basic', value: 12},
        {label: 'Vendor_Upgrade_Pro', value: 13},
        {label: 'Vendor_Upgrade_Plus', value: 14},
        {label: 'Lama', value: 15},
        {label:"Vendor_Featured_logos",value:16},
        {label:"Me_Upgrade_Discount_Icon",value:17}
      ],
      sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        sys_key: undefined,
        sys_value: undefined,
        comment: undefined,
        sys_id: undefined
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
        cate: [{required: true, message: 'category is required', trigger: 'change'}],
        sys_key: [{required: true, message: 'position is required', trigger: 'change'}]
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
    tabClickJobs(e) {
      console.log(e)
      if (e.index == 0) {
        this.listQuery.cate = 1
        this.getList()
      }
      if (e.index == 1) {
        this.listQuery.cate = 2
        this.getList()
      }
    },
    getList() {
      this.listLoading = true
      getSystemInfo(this.listQuery).then(response => {
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
        sys_key: undefined,
        sys_value: undefined,
        comment: undefined,
        sys_id: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.fileList = undefined
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
          this.temp.sys_value = this.fileUrl
          addSystem(this.temp).then((res) => {
            console.log(res)
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            window.location.reload()
          })
        }
      })
    },
    handleUpdate(row) {
      console.log(row)
      this.temp = Object.assign({}, row) // copy obj
      this.temp.sys_id = row.id

      this.fileList = [{name: '', url: row.sys_value}]
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
          this.temp.sys_value = this.fileUrl
          const tempData = Object.assign({}, this.temp)

          addSystem(tempData).then((res) => {
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
            }
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      // this.list.splice(index, 1)
      addSystem({is_delete: 1, sys_id: row.id}).then(res => {
        console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    handleRecover(row) {
      addSystem({is_delete: 0, sys_id: row.id}).then(res => {
        console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    uploadFileSuccess(response, file, fileList) {
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.fileUrl = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    }
  }
}
</script>
