<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.identity"
        filterable
        @change="getList()"
        default-first-option
        placeholder="Please Select Identity">
        <el-option
          v-for="item in identityOptions"
          :key="item.id"
          :label="item.label"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button v-waves style="margin-left: 10px;"  type="primary" icon="el-icon-search" @click="getList()">
        Apply Filter
      </el-button>
      <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button type="primary" @click="handleSettingAdsDiscount()"> Apply Universal Discount</el-button>
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
      <el-table-column label="Level CN" width="110px" align="center">
        <template v-slot="{row}">
          <span>{{row.level_cn}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Level EN" width="110px" align="center">
        <template v-slot="{row}">
          <span>{{row.level_en}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Description" width="310px" >
        <template v-slot="{row}">
          <div  v-html="row.desc"></div>
        </template>
      </el-table-column>

      <el-table-column label="Identity" width="200px" align="center">
        <template v-slot="{row}">
          <span v-if="row.identity == 1">Educator</span>
          <span v-if="row.identity == 2">Business</span>
          <span v-if="row.identity == 3">Vendor</span>
        </template>
      </el-table-column>
      <el-table-column label="Amount(Price CNY)" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actual Amount(Price CNY)" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.original_money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Amount(Price $)" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.dollar }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actual Amount(Price $)" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.original_dollar }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Discount(%)" width="100px" align="center">
        <template v-slot="{row}">
          <span>{{ row.discount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Duration" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.month_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Deals Num" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.deals_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Events Num" width="200px" align="center">
        <template v-slot="{row}">
          <span>{{ row.events_num }}</span>
        </template>
      </el-table-column>

      <el-table-column  fixed="right" label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template v-slot="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.is_delete===1"  size="mini" @click="handleRecover(row)">
            Recover
          </el-button>
          <el-button v-if="row.is_delete===0"  size="mini" type="danger"
                     @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>


    <el-dialog
      title=" Apply Universal Discount"
      :visible.sync="adsDiscountVisible"
      width="60%"
      >
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

  </div>
</template>

<script>

import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'
import {vipList,setVipDiscount} from "@/api/member";
import {addVipLevel} from "@/api/admin";
import {encode} from 'js-base64'

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

      adsDiscountVisible:false,
      discountForm:{
        discount: 0
      },
      discountRules:{
        discount: [
          {required: true, message: 'Please input', trigger: 'blur'}
        ],
      },
      identityValue:1,
      identityOptions:[
        {
          id:1,
          label:'Educator'
        },
        {
          id:2,
          label: 'Business'
        },
        {
          id:3,
          label: 'Vendor'
        }
      ],
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        identity:1,
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        level_cn: [{required: true, message: 'level cn is required', trigger: 'change'}],
        level_en: [{required: true, message: 'level en is required', trigger: 'change'}]
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
    getList() {
      this.listLoading = true
      vipList(this.listQuery).then(response => {
        this.list = response.message
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        identity: undefined,
        level:undefined,
        level_cn:undefined,
        level_en:undefined,
        desc:undefined,
        deals_num:undefined,
        events_num:undefined,
        money:undefined,
        dollar:undefined,
        month_num:undefined
      }
    },
    handleCreate() {
      this.$router.push({path:'/config/vip/edit',query:{}})
    },
    handleUpdate(row) {
      let rowStr = encode(JSON.stringify(row))

      this.$router.push({path:'/config/vip/edit',query:{id:row.id,info:rowStr}})
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      // this.list.splice(index, 1)
      addVipLevel({is_delete: 1, tag_id: row.id}).then(res => {
        console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    handleRecover(row) {
      addVipLevel({is_delete: 0, tag_id: row.id}).then(res => {
        console.log(res)
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    handleSettingAdsDiscount(){
      this.adsDiscountVisible = true
    },
    submitDiscountForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let data = Object.assign({}, this.discountForm)
          setVipDiscount(data).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                message: 'Success',
                type: 'success'
              });
              this.getList();
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
    },


  }
}
</script>

<style scoped>
.filter-container{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
}
</style>
