<template>
  <div class="app-container">

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
        <el-form-item label="Top Banner">
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

    <div class="dialog-footer">
        <el-button type="primary" @click="submit()">
          Submit
        </el-button>
      </div>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import { addBlog ,blogCategoryList,blogDetail} from '@/api/blog'
  import waves from '@/directive/waves' // waves directive

  import permission from '@/directive/permission/permission'
  import {tree} from "@/utils";
  export default {
    name: 'detail',
    components: { Tinymce },
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
        bannerFileUrl:undefined,

        images6maxFileList:[],
        images6maxData:[]
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

      this.getAdsCategoryList()
      let id = this.$route.query.id;
      if(id && id != undefined){
        this.getBlogDetail(id)
      }
    },
    methods: {
      getBlogDetail(id){
        let params = {
          id:id
        }
        blogDetail(params).then(res=>{
          console.log(res)
          if(res.code == 200){
            let message = res.message;
            this.adsCategoryValue = message.cate_id;

            this.temp = Object.assign({}, message) // copy obj

            let categoryData = this.categoryData;
            let filterData = categoryData.filter(item=>item.id == message.cate_id)

            this.temp.cate_id = message.cate_id;
            this.temp.id = message.id
            this.temp.cate_name_en = filterData[0]['name_en']
            this.temp.cate_name_cn = filterData[0]['name_cn']
            this.bannerFileUrl = message.image_url

            if(message.image_url !=''){
              this.bannerFileList = [{name:'',url:message.image_url}]
            }
          }
        })
      },
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
      submit() {
        this.temp.cate_id = this.adsCategoryValue;

        this.$refs['dataForm'].validate((valid) => {
          if (valid) {

            this.temp.image_url = this.bannerFileUrl
            const tempData = Object.assign({}, this.temp)
            if(tempData.id != undefined && tempData.id){
              tempData.title = ''
            }

            addBlog(tempData).then((res) => {
              console.log(res)
              if (res.code == 200) {
                this.$notify({
                  title: 'Success',
                  message: 'Update Successfully',
                  type: 'success',
                  duration: 2000
                })
                this.$router.push('/blog/list')
              }
            })
          }
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
      bannerBeforeRemove(file){
        if(file.status == 'success'){
          this.bannerFileUrl = ''
        }
      },
      images6maxBeforeRemove(file){
        if(file.status == 'success'){
          let fileUrl = file.response.data[0]['file_url']
          let index = this.images6maxData.indexOf(fileUrl)
          this.images6maxData.splice(index,1)
        }
      },
      images6maxSuccess(response){
        // console.log(response);
        if(response.code == 200){
          let fileUrl = response.data[0].file_url;
          this.images6maxData.push(fileUrl)
        }else{
          console.log(response.msg)
        }
        console.log(this.images6maxData)

      },

    }
  }
</script>

<style scoped>
  .app-container{
    padding: 20px;
  }
  .dialog-footer{
    margin-top: 20px;
  }
</style>
