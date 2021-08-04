<template>
  <div class="app-container">

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="Rank" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="identity" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag type="info" v-if="row.identity==1">Educator</el-tag>
          <el-tag type="info" v-if="row.identity==2">Business</el-tag>
          <el-tag type="info" v-if="row.identity==3">Vendor</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="UserId" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{row.user_id}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Create Time" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.c_time }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

  </div>
</template>

<script>
import {lamaRankingList} from '@/api/lama.js'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'
export default {
  name: 'Index',
  components: {Pagination},
  directives: {waves, permission},
  filters: {

  },
  data() {
    return {
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        cate: undefined,
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
  created() {
    this.getList()
  },
  methods: {

    getList() {
      this.listLoading = true
      lamaRankingList(this.listQuery).then(response => {
        console.log(response)
        // this.list = response.message.data
        this.list = response.message.data;
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
    }

  }
}
</script>
