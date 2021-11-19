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
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="110px" align="center">
        <template slot-scope="{row}">
          <span  class="link-type">{{row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Comment" width="210px" align="center">
        <template slot-scope="{row}">
          <span> {{row.comment}}</span>
        </template>
      </el-table-column>

      <!--      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">-->
      <!--        <template slot-scope="{row,$index}">-->
      <!--          <el-button type="primary" size="mini" @click="handleUpdate(row)">-->
      <!--            Edit-->
      <!--          </el-button>-->
      <!--          <el-button v-if="row.is_delete===1" v-permission="['lei']" size="mini" @click="handleRecover(row)">-->
      <!--            Recover-->
      <!--          </el-button>-->
      <!--          <el-button v-if="row.is_delete===0" v-permission="['lei']" size="mini" type="danger" @click="handleDelete(row,$index)">-->
      <!--            Delete-->
      <!--          </el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { subscribeEmailList } from '@/api/admin'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'
// import { format } from 'date-fns'

export default {
  name: 'email',
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

    getList() {
      this.listLoading = true
      subscribeEmailList(this.listQuery).then(response => {
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

  }
}
</script>
