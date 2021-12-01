<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button  class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
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
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Promo Code" width="110px" align="center">
        <template slot-scope="{row}">
          <span  class="link-type">{{row.card_no}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Redeem Time" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.exchange_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Duration(months)" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.month}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Amount(RMB 单位分)" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.money}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Max Limit" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.max_limit}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Number of Users" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.use_count}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="260" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="showUseUsers(row.card_no)">
            Used list
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.is_delete===1" size="mini" @click="handleRecover(row)">
            Activate
          </el-button>
          <el-button v-if="row.is_delete===0" size="mini" type="danger" @click="handleDelete(row,$index)">
            Deactivate
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="Add Promo Code" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="Promo Code" prop="code">
          <el-input v-model="temp.code" ></el-input>
        </el-form-item>
        <el-form-item label="Duration(months)" prop="month">
          <el-input v-model="temp.month" type="number" placeholder="1~12"></el-input>
        </el-form-item>
        <el-form-item label="Amount(RMB * 100)" prop="money">
          <el-input v-model="temp.money" type="number" placeholder="money"></el-input>
        </el-form-item>
        <el-form-item label="Max Limit" prop="max_limit">
          <el-input v-model="temp.max_limit" type="number" placeholder="max limit"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="createData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="Update Promo Code" :visible.sync="dialogUpdateFormVisible">
      <el-form ref="dataForm" :rules="updateRules" :model="updateTemp"
               label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="Duration(months)" prop="month">
          <el-input v-model="updateTemp.month" type="number" placeholder="1~12"></el-input>
        </el-form-item>
        <el-form-item label="Amount(RMB * 100)" prop="money">
          <el-input v-model="updateTemp.money" type="number" placeholder="money"></el-input>
        </el-form-item>
        <el-form-item label="Max Limit" prop="max_limit">
          <el-input v-model="updateTemp.max_limit" type="number" placeholder="max limit"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import { addPromoCode, promoCardList } from '@/api/admin'
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import permission from '@/directive/permission/permission'
  // import { format } from 'date-fns'

  export default {
    name: 'code',
    components: { Pagination },
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
          code: undefined,
          page: 1,
          limit: 20
        },
        importanceOptions: [1, 2, 3],
        identityList: [
          { label: 'Guest', value: 0 },
          { label: 'Educator', value: 1 },
          { label: 'Business', value: 2 },
          { label: 'Vendor', value: 3 }
        ],
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          code: '',
          month:0,
          money:0,
          max_limit:0
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
          code: [{ required: true, message: 'code is required', trigger: 'change' }],
          month: [{ required: true, message: 'month is required', trigger: 'change' }],
          money: [{ required: true, message: 'money is required', trigger: 'change' }],
        },
        downloadLoading: false,
        // uploadHeaders:undefined,
        fileUrl: undefined,
        fileList: undefined,
        dialogUpdateFormVisible:false,
        updateTemp:{
          id: undefined,
          month:0,
          money:0,
          max_limit:0
        },
        updateRules:{
          month: [{ required: true, message: 'month is required', trigger: 'change' }],
          money: [{ required: true, message: 'money is required', trigger: 'change' }],
        }
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
      showUseUsers(cardNo){
        this.$router.push({path:'/promo/usedList',query:{
          card_no:cardNo
          }})
      },
      getList() {
        this.listLoading = true
        promoCardList(this.listQuery).then(response => {
          // console.log(response)
          this.list = response.message.data.filter(item => item.is_delete === 0)
          this.total = response.message.total

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
      sortChange(data) {
        const { prop, order } = data
        if (prop === 'id') {
          this.sortByID(order)
        }
      },
      sortByID(order) {
        if (order === 'ascending') {
          this.listQuery.sort = '+id'
        } else {
          this.listQuery.sort = '-id'
        }
        this.handleFilter()
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          code: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // this.temp.max_limit = Number(this.temp.max_limit)
            let params = Object.assign({},this.temp)

            addPromoCode(params).then((res) => {
              if(res.code == 200){
                this.dialogFormVisible = false
                this.$notify({
                  title: 'Success',
                  message: 'Created Successfully',
                  type: 'success',
                  duration: 2000
                })
                // window.location.reload()
                this.getList()
              }else{
                this.$notify({
                  title: res.msg,
                  message: res.msg,
                  type: 'warning',
                  duration: 2000
                })
              }

            })
          }
        })
      },
      handleUpdate(row) {

        this.updateTemp = Object.assign({}, row) // copy obj
        this.updateTemp.id = row.id
        // this.dialogStatus = 'update'
        this.dialogUpdateFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.updateTemp)
            addPromoCode(tempData).then((res) => {
              if (res.code == 200) {
                this.dialogUpdateFormVisible = false
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
        addPromoCode({ is_delete: 1, id: row.id }).then(res => {
          console.log(res)
          if(res.code== 200){
            this.$notify({
              title: 'Success',
              message: 'Delete Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          }else{
            this.$notify({
              title: 'Error',
              message: res.msg,
              type: 'warning',
              duration: 2000
            })
          }

        }).catch(error => {
          console.log(error)
        })
      },
      handleRecover(row) {
        addPromoCode({ is_delete: 0, id: row.id }).then(res => {
          console.log(res)
          this.getList()
        }).catch(error => {
          console.log(error)
        })
      },
      formatJson(filterVal) {
        return this.list.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      getSortClass: function(key) {
        const sort = this.listQuery.sort
        return sort === `+${key}` ? 'ascending' : 'descending'
      },
    }
  }
</script>
