<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.position" placeholder="Position" style="width: 200px;"/>
      <el-button v-waves type="primary" icon="el-icon-search" @click="getList">
        Search
      </el-button>
      <el-button v-waves type="primary" icon="el-icon-search" @click="handleCreate">
        Add
      </el-button>
      <el-button type="primary" @click="handleSettingAdsDiscount()"> Apply Universal Discount</el-button>
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Field Name(CN)" prop="user_id" width="160">
        <template v-slot="{row}">
          <span>{{ row.services_cn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Field Name(EN)" width="160">
        <template v-slot="{row}">
          {{ row.services_en }}
        </template>
      </el-table-column>
      <el-table-column label="Field Description(EN)" width="140">
        <template v-slot="scope">
          {{ scope.row.services_desc }}
        </template>
      </el-table-column>
      <el-table-column label="Field Description(CN)" width="140">
        <template v-slot="scope">
          {{ scope.row.services_desc_cn }}
        </template>
      </el-table-column>
      <el-table-column label="Amount" width="110">
        <template v-slot="scope">
          {{ scope.row.money / 100 }}
        </template>
      </el-table-column>
      <el-table-column label="Original Amount" width="140">
        <template v-slot="scope">
          {{ scope.row.originally_money / 100}}
        </template>
      </el-table-column>
      <el-table-column label="Discount(%)" width="140">
        <template v-slot="scope">
          {{ scope.row.discount}}
        </template>
      </el-table-column>

      <el-table-column label="Account Type" width="100">
        <template v-slot="{row}">
          <div v-if="row.identity==0">None</div>
          <div v-if="row.identity==1">Educator</div>
          <div v-if="row.identity==2">Business</div>
          <div v-if="row.identity==3">Vendor</div>
        </template>
      </el-table-column>
      <el-table-column label="Membership" width="100">
        <template v-slot="{row}">
          <div v-if="row.level == 0">None</div>
          <div v-if="row.level == 1">Basic</div>
          <div v-if="row.level == 2">Pro</div>
          <div v-if="row.level == 3">Plus</div>
        </template>
      </el-table-column>
      <!--    <el-table-column label="Position" width="110" align="center">-->
      <!--      <template v-slot="scope">-->
      <!--        <span>{{ scope.row.position }}</span>-->
      <!--      </template>-->
      <!--    </el-table-column>-->
      <el-table-column label="Actions" align="center" width="280" class-name="small-padding fixed-width">
        <template v-slot="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormUpdate">
      <el-form ref="dataForm" :model="tempUpdateData" label-position="top" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Field Name(CN)" prop="services_cn">
          <el-input v-model="tempUpdateData.services_cn" />
        </el-form-item>
        <el-form-item label="Field Name(EN)" prop="services_en">
          <el-input v-model="tempUpdateData.services_en" />
        </el-form-item>
        <el-form-item label="Field Description(EN)" prop="services_desc">
          <el-input v-model="tempUpdateData.services_desc" type="textarea" />
        </el-form-item>
        <el-form-item label="Field Description(CN)" prop="services_desc_cn">
          <el-input v-model="tempUpdateData.services_desc_cn" type="textarea" />
        </el-form-item>
        <el-form-item label="Amount" >
          <el-input v-model="bMoney" />
        </el-form-item>
        <el-form-item label="Original Amount" >
          <el-input v-model="bOriginallyMoney"  />
        </el-form-item>
        <el-form-item label="Discount" >
          <el-input v-model="tempUpdateData.discount"  >
            <template slot="append">%</template>
          </el-input>
        </el-form-item>

        <el-form-item label="Account Type">
          <el-select
            v-model="tempUpdateData.identity"
            filterable
            default-first-option
            placeholder="identity"
          >
            <el-option label="None" :value="0" />
            <el-option label="Educator" :value="1" />
            <el-option label="Business" :value="2" />
            <el-option label="Vendor" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="Membership">
          <el-select
            v-model="tempUpdateData.level"
            filterable
            default-first-option
            placeholder="level"
          >
            <el-option label="None" :value="0" />
            <el-option label="Basic" :value="1" />
            <el-option label="Pro" :value="2" />
            <el-option label="Plus" :value="3" />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormUpdate = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='Create' ? createService() : updateService()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

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
import { getServiceList, addServices, setJobServiceDiscount} from '@/api/jobs'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves'

export default {
  name: 'List',
  components: { Pagination },
  directives: { waves },
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
      tableKey: 0,
      list: undefined,
      total: 0,
      listQuery: {
        position: undefined,
        page: undefined,
        limit: undefined
      },
      dialogFormUpdate: false,
      tempUpdateData: {
        services_cn: undefined,
        services_en: undefined,
        services_desc: undefined,
        services_desc_cn:undefined,
        position: undefined,
        level: undefined,
        sale: undefined,
        identity: undefined,
        money: undefined,
        originally_money: undefined,
        discount:undefined

      },
      bMoney:undefined,
      bOriginallyMoney:undefined,
      textMap: {
        update: 'Edit',
        create: 'Create',
        upgrade: 'Upgrade'
      },
      dialogStatus: ''

    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleCreate() {

      let tempObj =  {
        services_cn: undefined,
          services_en: undefined,
          services_desc: undefined,
          services_desc_cn:undefined,
          position: undefined,
          level: undefined,
          sale: undefined,
          identity: undefined,
          money: undefined,
          originally_money: undefined,
          discount:undefined

      }
      this.tempUpdateData = tempObj
      this.dialogFormUpdate = true
      this.dialogStatus = 'Create'
    },
    createService() {
      this.tempUpdateData.money = this.bMoney * 100;
      this.tempUpdateData.originally_money = this.bOriginallyMoney * 100;
      let tempData = Object.assign({},this.tempUpdateData)

      addServices(tempData).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getList()
          this.dialogFormUpdate = false
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleDelete(row) {
      this.tempUpdateData = Object.assign({}, row)
      this.tempUpdateData.service_id = row.id
      this.tempUpdateData.is_delete = 1
      addServices(this.tempUpdateData).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleUpdate(row) {

      this.tempUpdateData = Object.assign({}, row)
      this.bOriginallyMoney = row.originally_money / 100
      this.bMoney = row.money / 100

      console.log(this.tempUpdateData)
      this.tempUpdateData.service_id = row.id
      this.dialogFormUpdate = true
      this.dialogStatus = 'Edit'
    },
    updateService() {
      this.tempUpdateData.money = this.bMoney * 100;
      this.tempUpdateData.originally_money = this.bOriginallyMoney * 100;

      let tempData = Object.assign({},this.tempUpdateData)

      addServices(tempData).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getList()
          this.dialogFormUpdate = false
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getList() {
      getServiceList(this.listQuery).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.list = res.message.data
          this.total = res.message.total
        } else {
          this.$message.error(res.msg)
        }
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
          setJobServiceDiscount(data).then(res => {
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

</style>
