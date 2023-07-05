<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
        Add
      </el-button>

    </div>

    <div>
      <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;"
        size="mini">
        <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
          <template v-slot="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Page" width="200px" align="center">
          <template v-slot="{ row }">
            <span>{{ capitalizeFirstCharacter(row.page) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Category" width="160px" align="center">
          <template v-slot="{ row }">
            <span>{{ row.category_en }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="Profile" width="190px" align="center">
          <template v-slot="{ row }">
            <span>{{ row.name_key }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="Link" align="center">
          <template v-slot="{ row }">
            <span>{{ row.link }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Title" align="center">
          <template v-slot="{ row }">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="Impressions" align="center">
          <template v-slot="{ row }">
            <span>{{ row.views }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Clicks" align="center">
          <template v-slot="{ row }">
            <span>{{ row.click }}</span>
          </template>
        </el-table-column>
        <!-- unnessary field, need to remoe in future  -->
        <el-table-column label="Is Featured" align="center" v-if="false">
          <template v-slot="{ row }">
            <span v-if="row.is_featured == 1">Yes</span>
            <span v-else="row.is_featured == 0">No</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Relative Link" align="center">
          <template v-slot="{ row }">
            <span>{{ row.relative_link }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="Default Image" align="center">
          <template v-slot="{ row }">
            <el-image style="width: 100px; height: 50px" :src="row.url" fit="contain" />
          </template>
        </el-table-column>
        <el-table-column label="Ads Banner Image" align="center">
          <template v-slot="{ row }">
            <el-image style="width: 100px; height: 50px" :src="row.user_url" fit="contain" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Actions" align="center"  class-name="small-padding fixed-width">
          <template v-slot="{ row, $index }">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              Edit
            </el-button>
            <el-button  v-waves class="filter-item" size="mini"  title="Download Report"  type="primary" icon="el-icon-download" @click="downloadExcel(row)" >
            </el-button>
            <el-button v-if="row.is_delete === 1" v-permission="['lei']" size="mini" @click="handleRecover(row)">
              Recover
            </el-button>
            <el-button v-if="row.is_delete === 0" v-permission="['lei']" size="mini" type="danger"
              @click="handleDelete(row, $index)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top">
        <el-form-item label="Category" prop="category">
          <el-cascader v-model="adsCategoryValue" :options="categoryData" disabled
            :props="{ checkStrictly: true, emitPath: false, value: 'id', label: 'name_en' }" :show-all-levels="false"
            @change="pidChange" clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="Is Use" prop="is_use">
          <el-select v-model="temp.is_use" class="filter-item" placeholder="Please select" disabled>
            <el-option v-for="item in isUseList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- feature list -->
        <el-form-item label="Advertiser" prop="contact_user_id">
          <el-select v-model="temp.contact_user_id" class="filter-item" placeholder="Please select">
            <el-option v-for="item in isFeatureList" :key="item.id" :label="item.first_name + ' ' + item.last_name"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <!-- feature list -->
        <el-form-item label="Page" prop="page" >
          <el-select v-model="temp.page" class="filter-item" placeholder="Please select">
            <el-option v-for="item in isPageList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- position -->
        <el-form-item label="Position"  prop="position">
          <el-select v-model="temp.position" class="filter-item" placeholder="Please select" disabled>
            <el-option v-for="item in isPositionList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
          <!-- unnessary field, need to remoe in future  -->
        <el-form-item label="Is Featured" prop="is_featured" v-if="false">
          <el-select v-model="temp.is_featured" class="filter-item" placeholder="Please select">
            <el-option v-for="item in isFeaturedList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Link" prop="link">
          <el-input v-model="temp.link" />
        </el-form-item>
        <el-form-item label="Relative Link" >
          <el-input v-model="temp.relative_link" disabled />
        </el-form-item>
        <el-form-item label="Internal Notes">
          <!--          <el-input v-model="temp.title"  type="textarea"/>-->
          <tinymce v-model="temp.title" :height="300" />

        </el-form-item>
        <el-form-item label="Sort" >
          <el-input v-model="temp.sort" type="number"  disabled />
        </el-form-item>
        <el-form-item label="Default Banner">
          <el-upload class="upload-demo" drag :headers="uploadHeaders" name="file[]" action="" multiple
            list-type="picture" :limit="1" :http-request="bannerHttpRequest" :file-list="fileList"
            :before-remove="bannerBeforeRemove">
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Ads Banner Image">
          <el-upload class="upload-demo" drag :headers="uploadHeaders" name="file[]" action="" multiple
            list-type="picture" :limit="1" :http-request="adsBannerHttpRequest" :file-list="adsBannerFileList"
            :before-remove="adsBannerBeforeRemove">
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { add, adList, userContactsList, exportExcel } from '@/api/ads'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'
import { format } from 'date-fns'
import { adCategoryList } from "@/api/ads";
import { uploadByAliOSS, uploadByService } from '@/api/upload.js'
import ImageCompressor from 'compressorjs'
import Tinymce from '@/components/Tinymce'
import {adminExportBusiness} from "@/api/admin";

export default {
  name: 'Index',
  components: { Pagination, Tinymce },
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
      exportDataLoading:false,
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        category: undefined,
        identity: 0,
        page: 1,
        limit: 50
      },
      listContactUser: {
        identity: 0,
        page: 1,
        limit: 50
      },
      importanceOptions: [1, 2, 3],
      isUseList: [
        { label: 'no', value: 0 },
        { label: 'yes', value: 1 }
      ],
      isPageList: [
        { label: 'Deal', value: 'deal' },
        { label: 'Job', value: 'job' },
        { label: 'Event', value: 'event' }
      ],
      isPositionList: [
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
      ],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        url: '',
        link: '',
        is_use: 0,
        title: undefined,
        desc: undefined,
        category: undefined,
        sort: undefined,
        ad_id: undefined,
        relative_link: undefined,
        contact_user_id: null,
        page: null,
        position: null,
        is_featured:null
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
        page:[
          {required:true,message:'Please Select The Page',trigger:'change'},
        ],
        link:[
          {required:true,message:'Please Enter The Link',trigger:'change'},
        ]
      },
      downloadLoading: false,
      fileUrl: undefined,
      fileList: undefined,
      categoryData: [],
      adsCategoryValue: undefined,
      adsBannerFileList: [],
      adsBannerFileUrl: undefined,
      isFeatureList: [],

      isFeaturedList: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
      ],
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
    async downloadExcel(row) {
      exportExcel(row).then((res) => {
        var fileURL = window.URL.createObjectURL(new Blob([res.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'file.zip');
        document.body.appendChild(fileLink);
        fileLink.click();
        this.$notify({
          title: 'Success',
          message: 'Download Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },
    exportBusinessAsExcel(){
      this.exportDataLoading = true
      adminExportBusiness().then(res=>{
        if(res.code == 200){
          this.exportDataLoading = false
          window.open(res.message,'_blank')
        }

      }).catch(err=>{
        console.log(err)
      })
    },
    capitalizeFirstCharacter(string) {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },
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
        is_use: 0,
        category: undefined,
        sort: undefined,
        ad_id: undefined,
        relative_link: undefined
      }
    },
    async handleCreate() {
      // console.log(this.adsCategoryValue)
      this.resetTemp()
      this.fileUrl = '';
      this.fileList = [];
      this.adsBannerFileUrl = undefined;
      this.adsBannerFileList = [];
      this.adsCategoryValue = undefined
      this.dialogStatus = 'create'
      await this.getUserContactList();
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    async getUserContactList() {
      await userContactsList(this.listContactUser).then(response => {
        response.data.filter(item => {
          this.isFeatureList.push(item);
        })
        if (response.current_page < response.last_page) {
          this.listContactUser.page = response.current_page + 1;
        }
      })
    },

    createData() {
      this.temp.category = this.adsCategoryValue;
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.url = this.fileUrl
          this.temp.user_url = this.adsBannerFileUrl
          this.temp.create_request = "create"
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
          }).catch(err => {
                this.$message.error(err.msg)
          })
        }
      })
    },
    async handleUpdate(row) {
      // console.log(row)
      this.adsCategoryValue = row.category;
      await this.getUserContactList();
      this.temp = Object.assign({}, row) // copy obj
      this.temp.ad_id = row.id
      this.temp.category = row.category;

      this.temp.days = Number(row.days)
      this.temp.money = Number(row.money)
      this.fileUrl = row.url


      if (row.url != '') {
        this.fileList = [{ name: '', url: row.url }]
      } else {
        this.fileList = []
      }

      this.adsBannerFileUrl = row.user_url
      if (row.user_url != '') {
        this.adsBannerFileList = [{ name: '', url: row.user_url }]
      } else {
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
          }).catch(err => {
                this.$message.error(err.msg)
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
        text: 'uploading...'
      })
      const maxSize = 5 * 1024 * 1024;
      if (options?.file?.size > maxSize) {
        this.$notify({
          title: 'Failed',
          message: 'File Size Exceeding. Max 5MB Allowed',
          type: 'warning',
          duration: 2000
        })
        self.$loading().close();
        self.uploadLoadingStatus = false;
        this.fileList = [];
      }
      else {
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
                  self.fileList = [{ name: myFileName, url: myFileUrl }]
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
                  self.fileList = [{ name: myFileName, url: myFileUrl }]
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
      }
    },
    adsBannerHttpRequest(options) {
      let self = this;
      this.$loading({
        text: 'uploading...'
      })
      const maxSize = 5 * 1024 * 1024;
      if (options?.file?.size > maxSize) {
        this.$notify({
          title: 'Failed',
          message: 'File Size Exceeding. Max 5MB Allowed',
          type: 'warning',
          duration: 2000
        })
        self.$loading().close();
        self.uploadLoadingStatus = false;
        this.adsBannerFileList = [];
      }

      else {
        new ImageCompressor(options.file, {
          quality: 0.6,
          success(file) {
            const formData = new FormData();

            let isInChina = process.env.VUE_APP_CHINA
            if (isInChina === 'yes') {
              formData.append('file[]', file, file.name)
              uploadByAliOSS(formData).then(res => {
                if (res.code == 200) {
                  self.$loading().close();
                  let myFileUrl = res.data[0]['file_url'];
                  let myFileName = res.data[0]['file_name']
                  self.uploadLoadingStatus = false;
                  self.adsBannerFileUrl = myFileUrl
                  self.adsBannerFileList = [{ name: myFileName, url: myFileUrl }]
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
                  self.adsBannerFileList = [{ name: myFileName, url: myFileUrl }]
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

      }

      // console.log(options)

    },
    bannerBeforeRemove(file) {
      if (file.status == 'success') {
        this.fileUrl = ''
      }
    },
    adsBannerBeforeRemove(file) {
      if (file.status == 'success') {
        this.adsBannerFileUrl = ''
      }
    }
  }
}
</script>
