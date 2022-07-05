<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        Search
      </el-button>
      <el-button v-permission="['lei']"  class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
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
        size="mini"
      >
        <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
          <template v-slot="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Category" width="160px" align="center">
          <template v-slot="{row}">
            <span>{{row.category_en}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Profile" width="190px" align="center">
          <template v-slot="{row}">
            <span>{{row.name_key}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Link" width="200px" align="center">
          <template v-slot="{row}">
            <span>{{ row.link }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Title" width="200px" align="center">
          <template v-slot="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Relative Link" width="200px" align="center">
          <template v-slot="{row}">
            <span>{{ row.relative_link }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Default Image" width="160px" align="center">
          <template v-slot="{row}">
            <el-image
              style="width: 100px; height: 50px"
              :src=" row.url "
              fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column label="Ads Banner Image" width="160px" align="center">
          <template v-slot="{row}">
            <el-image
              style="width: 100px; height: 50px"
              :src=" row.user_url "
              fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template v-slot="{row,$index}">
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top">
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
        <el-form-item label="Is Use" prop="is_use">
          <el-select v-model="temp.is_use" class="filter-item" placeholder="Please select">
            <el-option v-for="item in isUseList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Link">
          <el-input v-model="temp.link" />
        </el-form-item>
        <el-form-item label="Relative Link">
          <el-input v-model="temp.relative_link" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="temp.title"  type="textarea"/>
        </el-form-item>
        <el-form-item label="Sort">
          <el-input v-model="temp.sort" type="number" />
        </el-form-item>
        <el-form-item label="Default Banner">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            action=""
            multiple
            list-type="picture"
            :limit="1"
            :http-request="bannerHttpRequest"
            :file-list="fileList"
            :before-remove="bannerBeforeRemove"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Ads Banner Image">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            action=""
            multiple
            list-type="picture"
            :limit="1"
            :http-request="adsBannerHttpRequest"
            :file-list="adsBannerFileList"
            :before-remove="adsBannerBeforeRemove"
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
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'
import { format } from 'date-fns'
import {adCategoryList} from "@/api/ads";
import {uploadByAliOSS, uploadByService} from '@/api/upload.js'
import ImageCompressor from 'compressorjs'

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
      isUseList:[
        { label: 'no', value: 0 },
        { label: 'yes', value: 1 }
      ],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        url: '',
        link: '',
        is_use:0,
        title:undefined,
        desc:undefined,
        category:undefined,
        sort: undefined,
        ad_id: undefined,
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
        // console.log(res)
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
      this.listQuery.category = this.$route.query.category;
      adList(this.listQuery).then(response => {
        // console.log(response)
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
    resetTemp() {

      this.temp = {
        id: undefined,
        url: '',
        link: '',
        is_use:0,
        category:undefined,
        sort: undefined,
        ad_id: undefined,
        relative_link: undefined
      }
    },
    handleCreate() {
      // console.log(this.adsCategoryValue)
      this.resetTemp()
      this.fileUrl='';
      this.fileList = [];
      this.adsBannerFileUrl = undefined;
      this.adsBannerFileList = [];
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
          this.temp.url = this.fileUrl
          this.temp.user_url = this.adsBannerFileUrl
          add(this.temp).then((res) => {
            console.log(res)
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
      // console.log(row)
      this.adsCategoryValue = row.category;

      this.temp = Object.assign({}, row) // copy obj
      this.temp.ad_id = row.id
      this.temp.category = row.category;

      this.temp.days = Number(row.days)
      this.temp.money = Number(row.money)
      this.fileUrl = row.url


      if(row.url != ''){
        this.fileList = [{ name: '', url: row.url }]
      }else{
        this.fileList = []
      }

      this.adsBannerFileUrl = row.user_url
      if(row.user_url !=''){
        this.adsBannerFileList = [{name:'',url:row.user_url}]
      }else{
        this.adsBannerFileList = []
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
          this.temp.url = this.fileUrl
          this.temp.user_url = this.adsBannerFileUrl
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
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      // this.list.splice(index, 1)
      add({ is_delete: 1, ad_id: row.id }).then(res => {
        console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    handleRecover(row) {
      add({ is_delete: 0, ad_id: row.id }).then(res => {
        console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    bannerHttpRequest(options) {
      let self = this;
      this.$loading({
        text:'uploading...'
      })
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            uploadByAliOSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                self.$loading().close();
                let myFileUrl = res.data[0]['file_url'];
                let myFileName = res.data[0]['file_name']
                self.uploadLoadingStatus = false;
                self.fileUrl = myFileUrl
                self.fileList = [{name: myFileName, url: myFileUrl}]
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            uploadByService(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                let myFileName = res.message.file_name;
                self.$loading().close();
                self.uploadLoadingStatus = false;
                self.fileUrl = myFileUrl
                self.fileList = [{name: myFileName, url: myFileUrl}]
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

        },
        error(err) {
          console.log(err.message)
          self.$loading().close();
        }

      })

    },
    adsBannerHttpRequest(options) {
      let self = this;
      this.$loading({
        text:'uploading...'
      })
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            uploadByAliOSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                self.$loading().close();
                let myFileUrl = res.data[0]['file_url'];
                let myFileName = res.data[0]['file_name']
                self.uploadLoadingStatus = false;
                self.adsBannerFileUrl = myFileUrl
                self.adsBannerFileList = [{name: myFileName, url: myFileUrl}]
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            uploadByService(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                let myFileName = res.message.file_name;
                self.$loading().close();
                self.uploadLoadingStatus = false;
                self.adsBannerFileUrl = myFileUrl
                self.adsBannerFileList = [{name: myFileName, url: myFileUrl}]
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

        },
        error(err) {
          console.log(err.message)
          self.$loading().close();
        }

      })

    },
    bannerBeforeRemove(file){
      if(file.status == 'success'){
        this.fileUrl = ''
      }
    },
    adsBannerBeforeRemove(file){
        if(file.status == 'success'){
          this.adsBannerFileUrl = ''
        }
    }
  }
}
</script>
