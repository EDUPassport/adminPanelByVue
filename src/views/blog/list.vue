<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        Search
      </el-button>
      <el-button   class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
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
      >
        <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Category" width="160px" align="center">
          <template slot-scope="{row}">
            <span>{{row.cate_name_en}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Title" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Description" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.desc }}</span>
          </template>
        </el-table-column>
<!--        <el-table-column label="Content" width="200px" align="center">-->
<!--          <template slot-scope="{row}">-->
<!--            <span>{{ row.content }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="Tags" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.tags }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Banner Image" width="160px" align="center">
          <template slot-scope="{row}">
            <el-image
              style="width: 100px; height: 50px"
              :src=" row.image_url "
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top">
        <el-form-item label="Category" prop="category">
          <el-cascader
            v-model="adsCategoryValue"
            :options="categoryTreeData"
            :props="{ checkStrictly: true ,emitPath:false,value:'id',label:'name_en'}"
            :show-all-levels="false"
            @change="pidChange"
            clearable>
          </el-cascader>
        </el-form-item>

        <el-form-item label="Title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="temp.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="Content">
<!--          <el-input v-model="temp.content"  type="textarea"/>-->
          <tinymce v-model="temp.content" :height="300" />
        </el-form-item>
        <el-form-item label="Tags">
          <el-input v-model="temp.tags" type="textarea" />
        </el-form-item>
        <el-form-item label="Banner Image">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="bannerSuccess"
            :file-list="bannerFileList"
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
import Tinymce from '@/components/Tinymce'
import { blogList, addBlog ,blogCategoryList} from '@/api/blog'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'
import {tree} from "@/utils";
export default {
  name: 'Index',
  components: { Pagination,Tinymce },
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
        cate_id:undefined,
        cate_name_cn:undefined,
        cate_name_en:undefined,
        title:undefined,
        desc:undefined,
        content:undefined,
        image_url:undefined,
        tags:undefined,
        is_delete:0
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
      categoryTreeData:[],
      adsCategoryValue:undefined,
      bannerFileList:[],
      bannerFileUrl:undefined
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
      let categoryData = this.categoryData;
      let filterData = categoryData.filter(item=>item.id == e)
      // console.log(filterData)
      this.temp.cate_id = e;
      this.temp.cate_name_en = filterData[0]['name_en']
      this.temp.cate_name_cn = filterData[0]['name_cn']
    },
    getAdsCategoryList() {
      let params = {
        tree: 1
      }
      blogCategoryList(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          let categoryData = res.message.filter(item => item.is_delete === 0);
          this.categoryData = categoryData
          this.categoryTreeData = tree(categoryData)
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getList() {
      this.listLoading = true
      this.listQuery.category = this.$route.query.category;
      blogList(this.listQuery).then(response => {
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
        cate_id:undefined,
        cate_name_cn:undefined,
        cate_name_en:undefined,
        title:undefined,
        desc:undefined,
        content:undefined,
        image_url:undefined,
        tags:undefined,
        is_delete:0
      }
    },
    handleCreate() {
      // console.log(this.adsCategoryValue)
      this.resetTemp()

      this.bannerFileUrl = undefined;
      this.bannerFileList = [];
      this.adsCategoryValue=undefined
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.temp.cate_id = this.adsCategoryValue;
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.image_url = this.bannerFileUrl
          addBlog(this.temp).then((res) => {
            if(res.code == 200){
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
            // console.log(res)
            this.dialogFormVisible = false

          })
        }
      })
    },
    handleUpdate(row) {

      this.adsCategoryValue = row.cate_id;

      this.temp = Object.assign({}, row) // copy obj

      let categoryData = this.categoryData;
      let filterData = categoryData.filter(item=>item.id == row.cate_id)

      this.temp.cate_id = row.cate_id;
      this.temp.id = row.id
      this.temp.cate_name_en = filterData[0]['name_en']
      this.temp.cate_name_cn = filterData[0]['name_cn']
      this.bannerFileUrl = row.image_url

      if(row.image_url !=''){
        this.bannerFileList = [{name:'',url:row.image_url}]
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

          this.temp.image_url = this.bannerFileUrl
          const tempData = Object.assign({}, this.temp)
          addBlog(tempData).then((res) => {
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
      addBlog({ is_delete: 1, id: row.id }).then(res => {
        if(res.code == 200){
          this.getList()
        }
        // console.log(res)

      }).catch(error => {
        console.log(error)
      })
    },
    handleRecover(row) {
      addBlog({ is_delete: 0, id: row.id }).then(res => {
        // console.log(res)
        if(res.code == 200){
          this.getList()
        }

      }).catch(error => {
        console.log(error)
      })
    },
    bannerSuccess(response){
      if (response.code == 200) {
        this.bannerFileUrl = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    bannerBeforeRemove(file, fileList){
      if(file.status == 'success'){
        this.bannerFileUrl = ''
      }
    }
  }
}
</script>
