<template>
  <div class="container">
    <div class="add-container">

      <el-select v-model="selectIdentityValue"
                 placeholder="Category"
                 clearable
                 class="filter-item">
        <el-option label="Educator" :value="1"/>
        <el-option label="Recruiter" :value="2"/>
        <el-option label="School" :value="3"/>
        <el-option label="Other" :value="4"/>
        <el-option label="Vendor" :value="5"/>
      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getAdsCategoryList()">
        Search
      </el-button>

      <el-button type="primary" @click="handleCreate()">Add+</el-button>
    </div>


    <el-dialog
      title="Ads Category"
      :visible.sync="addDialogVisible"
      width="60%"
      :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
          <el-form-item label="Name(EN)" prop="name_en">
            <el-input v-model="ruleForm.identity_name"></el-input>
          </el-form-item>
          <el-form-item label="Name(CN)" prop="name_cn">
            <el-input v-model="ruleForm.identity_name_cn"></el-input>
          </el-form-item>
          <el-form-item label="Category" >
            <el-select
              v-model="selectIdentityValue"
              placeholder="Category"
              clearable
              class="filter-item">
              <el-option label="Educator" :value="1"/>
              <el-option label="Recruiter" :value="2"/>
              <el-option label="School" :value="3"/>
              <el-option label="Other" :value="4"/>
              <el-option label="Vendor" :value="5"/>
            </el-select>
          </el-form-item>

          <el-form-item label="Icon">
            <el-upload
              class="upload-demo"
              drag
              :headers="uploadHeaders"
              action=""
              multiple
              list-type="picture"
              :limit="1"
              :http-request="iconHttpRequest"
              :file-list="iconFileList"
            >
              <i class="el-icon-upload"/>
              <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Confirm</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">Close</el-button>
      </span>
    </el-dialog>

    <div class="tree-container">
      <el-tree
        :data="tableData"
        node-key="id"
        default-expand-all
        auto-expand-parent
        highlight-current
        :expand-on-click-node="false">
        <template v-slot="{ node, data }">
       <span class="custom-tree-node">
        <span>{{ node.data.identity_name }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => editAdCategory(data)">
            Edit
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => deleteAdCategory(node, data)">
            Delete
          </el-button>
        </span>
      </span>

        </template>
      </el-tree>
    </div>

  </div>
</template>

<script>

import {addSubIdentity, getSubIdentity} from '@/api/system'
import permission from '@/directive/permission/permission'
import waves from "@/directive/waves";
import {uploadByAliOSS, uploadByService} from '@/api/upload.js'
import ImageCompressor from 'compressorjs'

export default {
  name: "subIdentity",
  directives: {waves, permission},
  data() {
    return {
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      addDialogVisible: false,
      adsDiscountVisible: false,
      discountForm: {
        discount: 0
      },
      discountRules: {
        discount: [
          {required: true, message: 'Please input', trigger: 'blur'}
        ],
      },
      ruleForm: {
        icon_url: '',
        id: '',
        identity_name: '',
        identity_name_cn: '',
        pid: '',
        sort: '',
      },
      rules: {
        identity_name: [
          {required: true, message: '请输入分类名字', trigger: 'blur'}
        ],
        identity_name_cn: [
          {required: true, message: '请输入分类名字', trigger: 'blur'}
        ]

      },
      tableData: [],
      categoryId: undefined,
      iconFileUrl: '',
      selectIconFileUrl: '',
      bannerImageFileUrl: '',
      iconFileList: [],
      selectIconFileList: [],
      bannerImageFileList: [],
      bMoney: undefined,

      selectIdentityValue: 1

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
  },
  methods: {
    resetFileList() {
      this.iconFileUrl = '';
      this.iconFileList = [];
    },
    handleCreate() {
      this.addDialogVisible = true;
      this.ruleForm.identity_id = undefined;
      this.resetFileList();
    },
    getAdsCategoryList() {
      let params = {
        pid: this.selectIdentityValue,
        tree: 1
      }
      getSubIdentity(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.tableData = res.message.data;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleClose(done) {
      done();
      this.resetFileList();
    },
    submitForm(formName) {

      this.ruleForm.icon_url = this.iconFileUrl;

      this.ruleForm.pid = this.selectIdentityValue

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // let data = Object.assign({}, this.ruleForm)
          addSubIdentity(this.ruleForm).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                message: 'Success',
                type: 'success'
              });
              this.getAdsCategoryList();
              this.addDialogVisible = false;
              this.resetFileList();
            } else {
              this.$message.error(res.msg);
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editAdCategory(row) {
      console.log(row)
      this.iconFileUrl = row.icon_url;
      if (row.icon_url) {
        this.iconFileList = [{name: '', url: row.icon_url}]
      }

      this.addDialogVisible = true;
      // this.ruleForm.category_id = row.id;
      this.ruleForm = Object.assign({identity_id: row.id}, row)

    },
    deleteAdCategory(node, row) {
      let data = {
        identity_id: row.id,
        is_delete: 1
      }

      this.$confirm('Please contact the technical department before deleting the subcategory under the app category, otherwise the technical department will not be responsible', 'Tips', {
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
        type: 'error'
      }).then(() => {

        addSubIdentity(data).then(res => {
          console.log(res)
          if (res.code == 200) {
            this.$message({
              message: 'Success',
              type: 'success'
            });
            this.getAdsCategoryList()
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          console.log(err)
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    iconHttpRequest(options) {
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
                self.iconFileUrl = myFileUrl
                self.iconFileList = [{name: myFileName, url: myFileUrl}]
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
                self.iconFileUrl = myFileUrl
                self.iconFileList = [{name: myFileName, url: myFileUrl}]
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


  }
}
</script>

<style scoped>
.container {
  width: 94%;
  margin: 0 auto;
  padding: 40px;
}

.tree-container {
  border: 1px solid #eeeeee;
  /*border-radius: 10px;*/

  padding: 20px;
  margin-top: 50px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  padding-left: 20px;
  border-bottom: 1px solid #eeeeee;

}


</style>
