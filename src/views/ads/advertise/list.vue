<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        Search
      </el-button>
      <el-button v-permission="['lei']" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
        @click="handleCreate">
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
        <el-table-column label="Name" width="160px" align="center">
          <template v-slot="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Email" width="190px" align="center">
          <template v-slot="{ row }">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Phone No" width="200px" align="center">
          <template v-slot="{ row }">
            <span>{{ row.phone_no }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Request" width="200px" align="center">
          <template v-slot="{ row }">
            <span>{{ row.request.charAt(0).toUpperCase() + row.request.slice(1).toLowerCase().replace(/_/g, ' ') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Other Detail" width="200px" align="center">
          <template v-slot="{ row }">
            <span>{{ row.other }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Profile" width="200px" align="center">
          <template v-slot="{ row }">
            <span v-if="row.profile == 1">Educator</span>
            <span v-else-if="row.profile == 2">EDU Busniess</span>
            <span v-else-if="row.profile == 4">Other</span>
            <span v-else-if="row.profile == 5">Vendor</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template v-slot="{ row, $index }">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              Edit
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top">
        <el-form-item label="Nmae">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="Phone No">
          <el-input v-model="temp.phone_no" />
        </el-form-item>
        <el-form-item label="Request">
          <el-input v-model="temp.request" />
        </el-form-item>
        <el-form-item label="Other Detail">
          <el-input v-model="temp.other" />
        </el-form-item>
        <!-- <el-form-item label="Profile">
          <el-input v-model="temp.profile" />
        </el-form-item> -->
        <el-form-item label="Follow Up Detail">
          <el-input
          v-model="temp.follow_up_detail"
          maxlength="5000"
          placeholder="Please input"
          show-word-limit
          type="textarea"
  />
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
import { add, advertiseBusiness, updateAdvertiseBusiness } from '@/api/ads'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'
import { format } from 'date-fns'
import { adCategoryList } from "@/api/ads";
import { uploadByAliOSS, uploadByService } from '@/api/upload.js'
import ImageCompressor from 'compressorjs'
import Tinymce from '@/components/Tinymce'

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
      importanceOptions: [1, 2, 3],
      isUseList: [
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
        is_use: 0,
        title: undefined,
        desc: undefined,
        category: undefined,
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
      categoryData: [],
      adsCategoryValue: undefined,
      adsBannerFileList: [],
      adsBannerFileUrl: undefined,


      // advertise business edit
      name: undefined,
      email: undefined,
      phone_no: undefined,
      request: undefined,
      other: undefined,
      profile: undefined,
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
      advertiseBusiness(this.listQuery).then(response => {
        this.list = response.message.data.filter(item => item)
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
    handleCreate() {
      // console.log(this.adsCategoryValue)
      this.resetTemp()
      this.fileUrl = '';
      this.fileList = [];
      this.adsBannerFileUrl = undefined;
      this.adsBannerFileList = [];
      this.adsCategoryValue = undefined
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
      console.log(row)
      this.name = row.name;
      this.email = row.email;
      this.phone_no = row.phone_no;
      this.profile = row.profile;
      this.request = row.request;
      this.other = row.other;


      this.temp = Object.assign({}, row) // copy obj
      this.temp.ad_id = row.id

      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // update Advertise Business
          updateAdvertiseBusiness(tempData).then((res) => {
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
        text: 'uploading...'
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

    },
    adsBannerHttpRequest(options) {
      let self = this;
      this.$loading({
        text: 'uploading...'
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
