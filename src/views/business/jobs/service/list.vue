<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.position" placeholder="Position" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        Search
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleCreate">
        Add
      </el-button>
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
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Field Name(CN)" prop="user_id" width="160">
        <template slot-scope="{row}">
          <span>{{ row.services_cn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Field Name(EN)" width="160">
        <template slot-scope="{row}">
          {{ row.services_en }}
        </template>
      </el-table-column>
      <el-table-column label="Field Description(EN)" width="140">
        <template slot-scope="scope">
          {{ scope.row.services_desc }}
        </template>
      </el-table-column>
      <el-table-column label="Field Description(CN)" width="140">
        <template slot-scope="scope">
          {{ scope.row.services_desc_cn }}
        </template>
      </el-table-column>
      <el-table-column label="Amount" width="110">
        <template slot-scope="scope">
          {{ scope.row.money / 100 }}
        </template>
      </el-table-column>
      <el-table-column label="Original Amount" width="140">
        <template slot-scope="scope">
          {{ scope.row.originally_money / 100}}
        </template>
      </el-table-column>

      <el-table-column label="Account Type" width="100">
        <template slot-scope="{row}">
          <div v-if="row.identity==0">None</div>
          <div v-if="row.identity==1">Educator</div>
          <div v-if="row.identity==2">Business</div>
          <div v-if="row.identity==3">Vendor</div>
        </template>
      </el-table-column>
      <el-table-column label="Membership" width="100">
        <template slot-scope="{row}">
          <div v-if="row.level == 0">None</div>
          <div v-if="row.level == 1">Basic</div>
          <div v-if="row.level == 2">Pro</div>
          <div v-if="row.level == 3">Plus</div>
        </template>
      </el-table-column>
      <!--    <el-table-column label="Position" width="110" align="center">-->
      <!--      <template slot-scope="scope">-->
      <!--        <span>{{ scope.row.position }}</span>-->
      <!--      </template>-->
      <!--    </el-table-column>-->
      <el-table-column label="Actions" align="center" width="280" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button type="primary" size="mini" @click="handleDelete(row)">
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
  </div>
</template>

<script>
import { getServiceList, addServices } from '@/api/jobs'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'List',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
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
    }
  }
}
</script>

<style scoped>

</style>
