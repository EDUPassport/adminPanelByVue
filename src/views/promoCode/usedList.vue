<template>
  <div class="app-container">
    <div class="filter-container">

    </div>

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
      <el-table-column label="Promo Code" width="110px" align="center">
        <template slot-scope="{row}">
          <span  class="link-type">{{row.card_no}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Redeem Time" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.c_time}}</span>
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
      <el-table-column label="User Id" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.user_id}}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { promoCardUserList} from '@/api/admin'
import waves from '@/directive/waves' // waves directive

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'

export default {
  name: 'usedList',
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
        card_no:'',
        page: 1,
        limit: 20
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
  watch:{
      $route(){
        // console.log(this.$route.query.card_no)
        this.getList(this.$route.query.card_no)
      }
  },
  created() {
    this.getList(this.$route.query.card_no)
  },
  methods: {

    getList(cardNo) {
      this.listLoading = true

      let listQuery = this.listQuery
      listQuery.card_no = cardNo
      // console.log(listQuery)

      promoCardUserList(listQuery).then(response => {
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


  }
}
</script>
