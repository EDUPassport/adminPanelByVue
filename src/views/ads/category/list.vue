<template>
  <div class="container">
    <div class="add-container">
      <el-button type="primary" @click="handleCreate()">Add+</el-button>
      <el-button type="primary" @click="handleSettingAdsDiscount()">Discount Setting</el-button>
    </div>

    <el-dialog
      title="Ads Category"
      :visible.sync="addDialogVisible"
      width="60%"
      :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
          <el-form-item label="Name(EN)" prop="name_en">
            <el-input v-model="ruleForm.name_en"></el-input>
          </el-form-item>
          <el-form-item label="Name(CN)" prop="name_cn">
            <el-input v-model="ruleForm.name_cn"></el-input>
          </el-form-item>
          <el-form-item v-permission="['lei']" label="Key" prop="name_key">
            <el-input v-model="ruleForm.name_key"></el-input>
          </el-form-item>
          <el-form-item label="Money" >
            <el-input v-model="bMoney"></el-input>
          </el-form-item>
          <el-form-item label="Discount">
            <el-input v-model="ruleForm.discount" >
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="Duration" prop="days">
            <el-input v-model="ruleForm.days"></el-input>
          </el-form-item>
          <el-form-item label="Title(EN)" prop="title_en">
            <el-input v-model="ruleForm.title_en"></el-input>
          </el-form-item>
          <el-form-item label="Title(CN)" prop="title_cn">
            <el-input v-model="ruleForm.title_cn"></el-input>
          </el-form-item>
          <el-form-item label="Description(EN)" prop="desc_en">
            <el-input v-model="ruleForm.desc_en" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="Description(CN)" prop="desc_cn">
            <el-input v-model="ruleForm.desc_cn" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="Only Show in Admin" prop="is_admin">
            <el-select v-model="ruleForm.is_admin" class="filter-item" placeholder="Please select">
              <el-option label="No" :value="0" checked />
              <el-option label="Yes" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="Category" prop="category">
            <el-cascader
              v-model="categoryId"
              :options="tableData"
              :props="{ checkStrictly: true ,emitPath:false,value:'id',label:'name_en'}"
              :show-all-levels="false"
              @change="pidChange"
              clearable>
            </el-cascader>
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
              :on-success="uploadIconSuccess"
              :file-list="iconFileList"
            >
              <i class="el-icon-upload" />
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
              :on-success="uploadSelectIconSuccess"
              :file-list="selectIconFileList"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
            </el-upload>
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
              :on-success="uploadBannerImageSuccess"
              :file-list="bannerImageFileList"
            >
              <i class="el-icon-upload" />
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

    <el-dialog
      title="Discount Setting"
      :visible.sync="adsDiscountVisible"
      width="60%"
      :before-close="handleClose">
      <div>
        <el-form
          :model="discountForm"
          :rules="discountRules"
          ref="discountForm"
          label-width="160px"
          class="demo-ruleForm">
          <el-form-item label="Discount" prop="discount" >
            <el-input v-model="discountForm.discount">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitDiscountForm('discountForm')">Confirm</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="adsDiscountVisible = false">Close</el-button>
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
       <span  class="custom-tree-node">
        <span>{{ node.data.name_en }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => addAds(data)">
            Ads
          </el-button>
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
import {adCategoryList, addCategory,setAdsCategoryDiscount} from "@/api/ads";
import permission from '@/directive/permission/permission'
import waves from "@/directive/waves";

export default {
  name: "list",
  data() {
    return {
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      addDialogVisible: false,
      adsDiscountVisible:false,
      discountForm:{
        discount: 0
      },
      discountRules:{
        discount: [
          {required: true, message: 'Please input', trigger: 'blur'}
        ],
      },
      ruleForm: {
        name_en: '',
        name_cn: '',
        name_key:'',
        money:'',
        discount:'',
        title_cn:'',
        title_en:'',
        desc_en:'',
        desc_cn:'',
        pid: '',
        days:0,
        is_admin:0,
        icon_before:'',
        icon_after:'',
        image_url:'',
        category_id: undefined
      },
      rules: {
        name_en: [
          {required: true, message: '请输入分类名字', trigger: 'blur'}
        ],
        name_cn: [
          {required: true, message: '请输入分类名字', trigger: 'blur'}
        ],
        pid: [
          {required: true, message: '请选择分类', trigger: 'change'}
        ]
      },
      tableData: [],
      categoryId: undefined,
      iconFileUrl:'',
      selectIconFileUrl:'',
      bannerImageFileUrl:'',
      iconFileList:[],
      selectIconFileList:[],
      bannerImageFileList:[],
      bMoney:undefined

    }
  },
  directives: { waves, permission },
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
    resetFileList(){
      this.iconFileUrl = '';
      this.selectIconFileUrl = '';
      this.bannerImageFileUrl = '';
      this.iconFileList = [];
      this.selectIconFileList = [];
      this.bannerImageFileList = [];
    },
    handleCreate(){
      this.addDialogVisible=true;
      this.ruleForm.category_id = undefined;
      this.resetFileList();
    },
    getAdsCategoryList() {
      let params = {
        tree: 1
      }
      adCategoryList(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.tableData = res.message;
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
      this.ruleForm.pid = this.categoryId;
      this.ruleForm.icon_before = this.iconFileUrl;
      this.ruleForm.icon_after = this.selectIconFileUrl;
      this.ruleForm.image_url = this.bannerImageFileUrl;
      this.ruleForm.money = this.bMoney * 100;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // let data = Object.assign({}, this.ruleForm)
          addCategory(this.ruleForm).then(res => {
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
    pidChange(e) {
      console.log(e)
      this.ruleForm.pid = e;
      this.categoryId = e;
    },
    editAdCategory(row) {
      console.log(row)
      this.iconFileUrl = row.icon_before;
      this.selectIconFileUrl = row.icon_after;
      this.bannerImageFileUrl = row.image_url;
      if(row.icon_before){
        this.iconFileList = [{ name: '', url: row.icon_before }]
      }
      if(row.icon_after){
        this.selectIconFileList = [{ name: '', url: row.icon_after }]
      }
      if(row.image_url){
        this.bannerImageFileList = [{ name: '', url: row.image_url }]
      }

      this.addDialogVisible = true;
      // this.ruleForm.category_id = row.id;
      this.ruleForm = Object.assign({category_id: row.id}, row)
      this.bMoney = row.money / 100
      this.categoryId = row.pid;

    },
    deleteAdCategory(node, row) {
      let data = {
        category_id: row.id,
        is_delete: 1
      }

      this.$confirm('Please contact the technical department before deleting the subcategory under the app category, otherwise the technical department will not be responsible', 'Tips', {
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
        type: 'error'
      }).then(() => {

        addCategory(data).then(res => {
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
    uploadIconSuccess(response) {

      if (response.code == 200) {
        this.iconFileUrl = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    uploadSelectIconSuccess(response) {

      if (response.code == 200) {
        this.selectIconFileUrl = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    uploadBannerImageSuccess(response) {

      if (response.code == 200) {
        this.bannerImageFileUrl = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    addAds(data){
      console.log(data)
      this.$router.push({path: '/ads/list', query: {category: data.id}})
    },
    handleSettingAdsDiscount(){
      this.adsDiscountVisible = true
    },
    submitDiscountForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let data = Object.assign({}, this.discountForm)
          setAdsCategoryDiscount(data).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                message: 'Success',
                type: 'success'
              });
              this.getAdsCategoryList();
              this.adsDiscountVisible = false;

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
    }

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
