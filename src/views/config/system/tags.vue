<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
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
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Name CN" width="110px" align="center">
        <template v-slot="{row}">
          <span>{{row.name_cn}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Name EN" width="110px" align="center">
        <template v-slot="{row}">
          <span>{{row.name_en}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Type" width="110px" align="center">
        <template v-slot="{row}">
          <span>{{row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Description" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Image" width="110px" align="center">
        <template v-slot="{row}">
          <el-image
            style="width: 100px; height: 50px"
            :src=" row.image_url "
            fit="contain"
          />
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template v-slot="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.is_delete===1"  size="mini" @click="handleRecover(row)">
            Recover
          </el-button>
          <el-button v-if="row.is_delete===0" v-permission="['lei']" size="mini" type="danger"
                     @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top" style="width: 400px; margin-left:50px;">

        <el-form-item label="Name CN" prop="name_cn">
          <el-input v-model="temp.name_cn" type="text"/>
        </el-form-item>
        <el-form-item label="Name EN" prop="name_en">
          <el-input v-model="temp.name_en" type="text"/>
        </el-form-item>
        <el-form-item label="Description" prop="desc">
          <el-input v-model="temp.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" placeholder="Type" clearable >
            <el-option v-for="item in typeOptions" :key="item.value"
                       :label="item.label" :value="item.value"/>
          </el-select>

        </el-form-item>

        <el-form-item label="Image">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            action=""
            multiple
            list-type="picture"
            :limit="1"
            :http-request="imageHttpRequest"
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
import {addSystemTag, tagList} from '@/api/system.js'

import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'
import {uploadByAliOSS, uploadByService} from '@/api/upload.js'
import ImageCompressor from 'compressorjs'


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

      temp: {
        name_cn: undefined,
        name_en: undefined,
        desc: undefined,
        type:undefined,
        image_url: undefined,
        tag_id:undefined,
        is_delete:0
      },
      typeOptions:[
        {
          label:"2",
          value:2
        },
        {
          label:'1',
          value:1
        }
      ],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        name_cn: [{required: true, message: 'please input', trigger: 'change'}],
        name_en: [{required: true, message: 'please input', trigger: 'change'}]
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
      tagList(this.listQuery).then(response => {
        console.log(response)
        // this.list = response.message.data
        this.list = response.message.data.filter(item => item.is_delete === 0)
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
    resetTemp() {
      this.temp = {
        name_cn: undefined,
        name_en: undefined,
        desc: undefined,
        image_url: undefined,
        tag_id: undefined
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
          this.temp.image_url = this.fileUrl
          addSystemTag(this.temp).then((res) => {
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
      this.temp.tag_id = row.id
      if(row.image_url){
        this.fileList = [{name: '', url: row.image_url}]
      }

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
          this.temp.image_url = this.fileUrl
          const tempData = Object.assign({}, this.temp)

          addSystemTag(tempData).then((res) => {
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
      addSystemTag({is_delete: 1, tag_id: row.id}).then(res => {
        console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    handleRecover(row) {
      addSystemTag({is_delete: 0, tag_id: row.id}).then(res => {
        console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    imageHttpRequest(options) {
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

    }

  }
}
</script>
