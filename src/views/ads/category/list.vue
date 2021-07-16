<template>
  <div class="container">
    <div class="add-container">
      <el-button type="primary" @click="addDialogVisible=true">Add+</el-button>
    </div>

    <el-dialog
      title="Add"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="Name(EN)" prop="name_en">
            <el-input v-model="ruleForm.name_en"></el-input>
          </el-form-item>
          <el-form-item label="Name(CN)" prop="name_cn">
            <el-input v-model="ruleForm.name_cn"></el-input>
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
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Confirm</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
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
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.data.name_en }}</span>
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
      </el-tree>
    </div>

  </div>
</template>

<script>
import {adCategoryList, addCategory} from "@/api/ads";

export default {
  name: "list",
  data() {
    return {
      addDialogVisible: false,
      ruleForm: {
        name_en: '',
        name_cn: '',
        pid: '',
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
      categoryId: undefined

    }
  },
  created() {
    this.getAdsCategoryList()
  },
  methods: {
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
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {
      //   });
    },
    submitForm(formName) {
      this.ruleForm.pid = this.categoryId;

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
              this.getAdsCategoryList()
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    pidChange(e) {
      console.log(e)
      this.ruleForm.pid = e;
      this.categoryId = e;
    },
    editAdCategory(row) {
      console.log(row)

      this.addDialogVisible = true;
      // this.ruleForm.category_id = row.id;

      this.ruleForm = Object.assign({category_id: row.id}, row)
      this.categoryId = row.pid;

    },
    deleteAdCategory(node, row) {
      let data = {
        category_id: row.id,
        is_delete: 1
      }
      this.$confirm('Delete？')
        .then(_ => {
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
        })
        .catch(_ => {
        });
    }

  }
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
  padding: 40px;
}

.tree-container {
  border: 1px solid #eeeeee;
  border-radius: 10px;
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
  border-bottom: 1px solid #eeeeee;
}


</style>
