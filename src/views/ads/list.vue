<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.identity" placeholder="Identity" clearable class="filter-item">
        <el-option v-for="item in identityList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        Search
      </el-button>
      <el-button v-permission="['lei','admin']" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
    </div>

    <div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
      >
        <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Category" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{row.category_en}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Identity" width="110px" align="center">
          <template slot-scope="{row}">
            <span v-if="row.identity == 0">Guest</span>
            <span v-if="row.identity == 1">Educator</span>
            <span v-if="row.identity == 2">Business</span>
            <span v-if="row.identity == 3">Vendor</span>
          </template>
        </el-table-column>
        <el-table-column label="Link" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.link }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Money" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Days" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.days }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Title" width="210px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Image" width="110px" align="center">
          <template slot-scope="{row}">
            <el-image
              style="width: 100px; height: 50px"
              :src=" row.url "
              fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              Edit
            </el-button>
            <el-button v-if="row.is_delete===1" v-permission="['lei']" size="mini" @click="handleRecover(row)">
              Recover
            </el-button>
            <el-button v-if="row.is_delete===0" v-permission="['lei']" size="mini" type="danger" @click="handleDelete(row,$index)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="Category" prop="category">
          <el-cascader
            v-model="adsCategoryValue"
            :options="categoryData"
            :props="{ checkStrictly: true ,emitPath:false,value:'id',label:'name_en'}"
            :show-all-levels="false"
            @change="pidChange"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="Identity" prop="identity">
          <el-select v-model="temp.identity" class="filter-item" placeholder="Please select">
            <el-option v-for="item in identityList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Is Buy" prop="is_buy">
          <el-select v-model="temp.is_buy" class="filter-item" placeholder="Please select">
            <el-option v-for="item in isBuyList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Is Use" prop="is_use">
          <el-select v-model="temp.is_use" class="filter-item" placeholder="Please select">
            <el-option v-for="item in isUseList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Money" prop="money">
          <el-input v-model="temp.money" type="number"/>
        </el-form-item>
        <el-form-item label="Days" prop="days">
          <el-input v-model="temp.days" type="number" />
        </el-form-item>
        <el-form-item label="Link">
          <el-input v-model="temp.link" />
        </el-form-item>
        <el-form-item label="Relative Link">
          <el-input v-model="temp.relative_link" />
        </el-form-item>
        <el-form-item label="Due Time">
          <el-date-picker
            v-model="temp.due_time"
            type="datetime"
            placeholder="Please pick a date"
            @change="adsDueDateChange"
          />
        </el-form-item>
        <el-form-item label="Sort">
          <el-input v-model="temp.sort" type="number" />
        </el-form-item>
        <el-form-item label="Image">
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
import { add, adList } from '@/api/ads'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'
import { format } from 'date-fns'
import {adCategoryList} from "@/api/ads";
export default {
  name: 'Index',
  components: { Pagination },
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
      identityList: [
        { label: 'Guest', value: 0 },
        { label: 'Educator', value: 1 },
        { label: 'Business', value: 2 },
        { label: 'Vendor', value: 3 }
      ],
      isBuyList:[
        { label: 'no', value: 0 },
        { label: 'yes', value: 1 }
      ],
      isUseList:[
        { label: 'no', value: 0 },
        { label: 'yes', value: 1 }
      ],
      adsTabsList: [
        { label: 'Guest', value: 0 },
        { label: 'Educator', value: 1 },
        { label: 'Business', value: 2 },
        { label: 'Vendor', value: 3 }
      ],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        money:0,
        days:5,
        title: '',
        url: '',
        link: '',
        is_buy:1,
        is_use:0,
        identity: undefined,
        category:undefined,
        sort: undefined,
        ad_id: undefined,
        due_time: undefined,
        relative_link: undefined
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
        identity: [{ required: false, message: 'identity is required', trigger: 'change' }],
        title: [{ required: false, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      fileUrl: undefined,
      fileList: undefined,
      categoryData:[],
      adsCategoryValue:undefined

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
    this.getAdsCategoryList()
  },
  methods: {
    pidChange(e) {
      console.log(e)
      this.adsCategoryValue = e;
      this.temp.category = e;
    },
    getAdsCategoryList() {
      let params = {
        tree: 1
      }
      adCategoryList(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.categoryData = res.message;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    adsDueDateChange(e) {
      // console.log(format(e, 'yyyy-MM-dd HH:mm:ss'))
      this.temp.due_time = format(e, 'yyyy-MM-dd HH:mm:ss')
    },
    getList() {
      this.listLoading = true
      adList(this.listQuery).then(response => {
        // console.log(response)
        // this.list = response.message.data
        this.list = response.message.data.filter(item => item.is_delete === 0)
        this.total = response.message.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
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
      const { prop, order } = data
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
        id: undefined,
        money:0,
        days:5,
        title: '',
        url: '',
        link: '',
        is_buy:1,
        is_use:0,
        identity: undefined,
        category:undefined,
        sort: undefined,
        ad_id: undefined,
        due_time: undefined,
        relative_link: undefined
      }
    },
    handleCreate() {
      // console.log(this.adsCategoryValue)
      this.resetTemp()
      this.adsCategoryValue=undefined
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
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          this.temp.url = this.fileUrl
          add(this.temp).then((res) => {
            // console.log(res)
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            // window.location.reload()
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      console.log(row)
      this.adsCategoryValue = row.category;

      this.temp = Object.assign({}, row) // copy obj
      this.temp.ad_id = row.id
      this.temp.category = row.category;

      this.temp.days = Number(row.days)
      this.temp.money = Number(row.money)
      this.fileList = [{ name: '', url: row.url }]

      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.url = this.fileUrl
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          add(tempData).then((res) => {
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
      add({ is_delete: 1, ad_id: row.id }).then(res => {
        // console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    handleRecover(row) {
      add({ is_delete: 0, ad_id: row.id }).then(res => {
        // console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
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
