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
      @sort-change="sortChange"
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-form-item label="Deal Description">
              <pre>{{ props.row.desc }}</pre>
            </el-form-item>
            <el-form-item label="Multiple Locations or 1">
              <span v-if="props.row.is_all==1">All Locations</span>
              <span v-if="props.row.is_all==0">Limited</span>
            </el-form-item>
            <el-form-item label="Deal/Discount">
              <span v-if="props.row.type==1">Deal</span>
              <span v-if="props.row.type==2">Discount</span>
            </el-form-item>
            <el-form-item
              v-if="props.row.provinces != null && props.row.citys != null && props.row.districts != null"
              label="Location"
            >
              <span>{{ props.row.districts.Pinyin }}, {{ props.row.citys.Pinyin }}, {{ props.row.provinces.Pinyin }}</span>
              <span>{{ props.row.districts.ShortName }}, {{ props.row.citys.ShortName }}, {{ props.row.provinces.ShortName }}</span>
            </el-form-item>
            <el-form-item label="Company Name (EN)" >
              <span v-if="props.row.user_info"> {{ props.row.user_info.vendor_name_en }}</span>
            </el-form-item>
            <el-form-item label="Legal Company Name">
              <span v-if="props.row.user_info"> {{ props.row.user_info.legal_company_name }}</span>
            </el-form-item>
            <el-form-item label="Vendor Type Name">
              <span v-if="props.row.user_info"> {{ props.row.user_info.vendor_type_name }}</span>
            </el-form-item>
            <el-form-item label="Work Email">
              <span v-if="props.row.user_info"> {{ props.row.user_info.work_email }}</span>
            </el-form-item>
            <el-form-item label="Wechat Id">
              <span v-if="props.row.user_info"> {{ props.row.user_info.wx_id }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="User Id"
        prop="user_id"
        width="80"
      >
        <template v-slot="{row}">
          <span  style="cursor: pointer;" @click="turnProfileList(row)">{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Company Name"
        width="150"
      >
        <template v-slot="{row}">
          <span> {{ row.company_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Deal/Discount Name"
        width="200px"
        align="center"
      >
        <template v-slot="{row}">
          <span v-if="row.title">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Participating Locations"
        width="150px"
        align="center"
      >
        <template v-slot="{row}">
          <a :href="row.file">{{ row.file_name }}</a>
        </template>
      </el-table-column>

      <el-table-column
        label="City"
        width="150px"
        align="center"
      >
        <template v-slot="{row}">
          <span v-if="row.city>0 && row.citys != null ">{{ row.citys.Pinyin }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Detail address"
        width="150px"
        align="center"
      >
        <template v-slot="{row}">
          <span v-if="row.location">{{ row.location }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Reason"
        width="150px"
        align="center"
      >
        <template v-slot="{row}">
          <span>{{ row.reason }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Views"
        width="150px"
        align="center"
      >
        <template v-slot="{row}">
          <span>{{ row.views }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Online"
        width="150px"
        align="center"
      >
        <template v-slot="{row}">
          <span v-if="row.is_online==1">online</span>
          <span v-if="row.is_online==2">offline</span>
          <span v-if="row.is_online==3">Both</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Status"
        class-name="status-col"
        width="100"
      >
        <template v-slot="{row}">
          <el-tag
            v-if="row.status === 0"
            :type="row.status | statusFilter"
          >
            Pending
          </el-tag>
          <el-tag
            v-if="row.status === 1"
            :type="row.status | statusFilter"
          >
            Passed
          </el-tag>
          <el-tag
            v-if="row.status === 2"
            :type="row.status | statusFilter"
          >
            Refuse
          </el-tag>
          <el-tag
            v-if="row.status === 3"
            :type="row.status | statusFilter"
          >
            Inactive
          </el-tag>
          <el-tag
            v-if="row.status === 4"
            :type="row.status | statusFilter"
          >
            Submitted
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Featured"
        align="center"
        width="100"
        class-name="small-padding fixed-width"
      >
        <template v-slot="{row}">
         {{row.is_featured}}
        </template>
      </el-table-column>

      <el-table-column
        label="Create Time"
        align="center"
        width="160"
        class-name="small-padding fixed-width"
      >
        <template v-slot="{row}">
          {{row.c_time}}
        </template>
      </el-table-column>

      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template v-slot="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="handleFeatured(row)"
          >
            Featured
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleReview(row)"
          >
            Review
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(row)"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="paginationEvent"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Status">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            v-model="temp.reason"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="reviewData"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>


    <el-dialog
      title="Set Featured"
      :visible.sync="dialogFeaturedVisible"
    >
      <el-form
        ref="dataFeaturedForm"
        :rules="featuredRules"
        :model="featuredTemp"
        label-position="top"
        label-width="170px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Featured Sort">
          <el-input v-model="featuredTemp.is_featured" type="number" placeholder="Set featured"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFeaturedVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="featuredData"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { dealsList, approveDeal } from '@/api/deals'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import {setFeaturedDeals} from '@/api/admin'

export default {
  name: 'Index',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info',
        2: 'danger',
        3:'warning',
        4:'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    return {

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 50,
        pay_money: undefined,
        status: undefined
      },
      statusOptions: [
        { label: 'Pending', value: 0 },
        { label: 'Successful', value: 1 },
        { label: 'Rejected', value: 2 },
        { label: 'Inactive', value: 3 },
        { label: 'Submitted', value: 4 }
      ],
      temp: {
        deal_id: undefined,
        reason: '',
        status: undefined
      },
      dialogFormVisible: false,
      dialogFormDealsVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'status is required', trigger: 'change' }]
      },
      downloadLoading: false,
      fileName: undefined,

      featuredTemp:{
        deal_id:undefined,
        is_featured:0
      },
      dialogFeaturedVisible:false,
      featuredRules:{}

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

    let page = this.$route.query.page;
    let limit = this.$route.query.limit;

    if(page){
      this.listQuery.page = Number(page)
    }
    if(limit){
      this.listQuery.limit = Number(limit)
    }

    this.getList()

  },
  methods: {
    turnProfileList(row){

      if(row.identity == 1){
        this.$router.push({path:'/educator/list',query:{uid:row.user_id}})
      }

      if(row.identity == 2){
        this.$router.push({path:'/business/recruiter',query:{uid:row.user_id,cid:row.company_id}})
      }

      if(row.identity == 3){
        this.$router.push({path:'/business/school',query:{uid:row.user_id,cid:row.company_id}})
      }

      if(row.identity == 4){
        this.$router.push({path:'/business/other',query:{uid:row.user_id,cid:row.company_id}})
      }

      if(row.identity == 5){
        this.$router.push({path:'/vendor/vendor',query:{uid:row.user_id, cid:row.company_id}})
      }

    },
    paginationEvent(e){
      this.$router.push({path:'/vendor/deals/list',query:{page:e.page, limit:e.limit}})
      this.getList()
    },
    getList() {
      this.listLoading = true

      dealsList(this.listQuery).then(res => {
        if(res.code == 200){
          this.list = res.message.data
          this.total = res.message.total
          this.listLoading = false
        }
      }).catch(err=>{
        console.log(err)
        this.listLoading = false
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
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleEdit(row) {

      this.$router.push({ path: '/vendor/deals/editDeals', query: { deal_id: row.id,cid:row.company_id,uid:row.user_id }})
    },
    handleFeatured(row){
      this.featuredTemp.deal_id = row.id;
      this.dialogFeaturedVisible = true;
      this.$nextTick(()=>{
        this.$refs['dataFeaturedForm'].clearValidate()
      })
    },
    handleReview(row) {
      // this.temp = Object.assign({}, row)
      this.temp.deal_id = row.id
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    featuredData() {
      this.$refs['dataFeaturedForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.featuredTemp)

          setFeaturedDeals(tempData).then((res) => {
            // console.log(res)
            if (res.code == 200) {
              this.dialogFeaturedVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }
      })
    },
    reviewData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)

          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          approveDeal(tempData).then((res) => {
            // console.log(res)
            if (res.code == 200) {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
