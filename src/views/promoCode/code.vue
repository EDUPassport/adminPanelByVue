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
      <el-table-column label="Code Text" width="110px" align="center">
        <template slot-scope="{row}">
          <span  class="link-type">{{row.card_no}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Exchange Time" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.exchange_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Month" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.month}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Money (Unit points)" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.money}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Use Count" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.use_count}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="showUseUsers(row.card_no)">
            Used list
          </el-button>
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


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="Code Text" prop="code">
          <el-input v-model="temp.code" ></el-input>
        </el-form-item>
        <el-form-item label="Month" prop="month">
          <el-input v-model="temp.month" type="number" placeholder="1~12"></el-input>
        </el-form-item>
        <el-form-item label="Money (Unit points)" prop="money">
          <el-input v-model="temp.money" type="number" placeholder="money"></el-input>
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
          money:0
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
      showUseUsers(cardNo){
        this.$router.push({path:'/promo/usedList',query:{
          card_no:cardNo
          }})
      },
      getList() {
        this.listLoading = true
        promoCardList(this.listQuery).then(response => {
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
            // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            // this.temp.author = 'vue-element-admin'
            addPromoCode(this.temp).then((res) => {
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
        this.temp.id = row.id
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            addPromoCode(tempData).then((res) => {
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

        // this.list.splice(index, 1)
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
