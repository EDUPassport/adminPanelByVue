<template>
  <div class="app-container">
    <div class="filter-container" >
      <el-select v-model="listQuery.refresh_time" placeholder="Active" clearable class="filter-item">
        <el-option :key="0" label="Default" :value="0"/>
        <el-option :key="1" label="Active" :value="1"/>
      </el-select>
      <el-button v-waves  type="primary" class="filter-item" icon="el-icon-search" @click="getList()">
        Search
      </el-button>
      <el-button v-waves  type="primary" class="filter-item"  @click="handleBulkRefresh()">
        Multiple Refresh By time range
      </el-button>
      <el-button v-waves  type="primary" class="filter-item"
                 :disabled="multipleSelection.length <= 0"
                 @click="handleBulkRefreshByIds()">
        Multiple Refresh Jobs
      </el-button>
    </div>

    <el-tabs value="All" style="margin-top:15px;" type="border-card" @tab-click="tabClickJobs">
      <el-tab-pane v-for="item in adsTypeOptions2" :key="item.value" :label="item.label" :name="item.label">
        <el-table
          ref="multipleTable"
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55">

          </el-table-column>
          <el-table-column type="expand">
            <template v-slot="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="File" style="color: #20a0ff;">
                  <span><a :href="props.row.file">{{ props.row.file }}</a></span>
                </el-form-item>
                <el-form-item label="Desc" style="word-break: break-all;">
                  <pre>{{ props.row.desc }}</pre>
                </el-form-item>
                <el-form-item label="Education">
                  <span>{{ props.row.education }}</span>
                </el-form-item>
                <el-form-item label="Street Address">
                  <span>{{ props.row.street_address }}</span>
                </el-form-item>
                <el-form-item label="Employment_type">
                  <span v-if="props.row.employment_type == 1">FT</span>
                  <span v-if="props.row.employment_type == 2">PT</span>
                  <span v-if="props.row.employment_type == 3">S</span>
                </el-form-item>
                <el-form-item label="Entry Date">
                  <span>{{ props.row.entry_date }}</span>
                </el-form-item>
                <el-form-item v-if="props.row.interview_imgurl !=''" label="Interview image">
                  <el-image style="width: 100px;height: 100px;" :src="props.row.interview_imgurl" :preview-src-list="[props.row.interview_imgurl]" />
                </el-form-item>
                <el-form-item label="Interview Name">
                  <span>{{ props.row.interview_name }}</span>
                </el-form-item>
                <el-form-item v-if="props.row.province>0 && props.row.provinces != null" label="Province">
                  <span> {{ props.row.provinces.Pinyin }}</span>
                  <span>{{ props.row.provinces.ShortName }}</span>
                </el-form-item>
                <el-form-item v-if="props.row.city>0 && props.row.citys != null" label="City">
                  <span>{{ props.row.citys.Pinyin }}</span>
                  <span>{{ props.row.citys.ShortName }}</span>
                </el-form-item>
                <el-form-item v-if="props.row.district>0 && props.row.districts != null" label="District">
                  <span>{{ props.row.districts.Pinyin }}</span>
                  <span>{{ props.row.districts.ShortName }}</span>
                </el-form-item>
                <el-form-item label="Interview Nationality">
                  <span>{{ props.row.interview_nationality }}</span>
                </el-form-item>
                <el-form-item label="Is Cpr">
                  <span v-if="props.row.is_cpr == 1">Yes</span>
                  <span v-if="props.row.is_cpr == 0">Unknown</span>
                </el-form-item>
                <el-form-item label="Is Equal">
                  <span v-if="props.row.is_equal==1">Yes</span>
                  <span v-if="props.row.is_equal==0">Unknown</span>
                </el-form-item>
                <el-form-item label="Is First Aide">
                  <span v-if="props.row.is_first_aide==1">Yes</span>
                  <span v-if="props.row.is_first_aide==0">Unknown</span>
                </el-form-item>
                <el-form-item label="Is Interview">
                  <span v-if="props.row.is_interview==1">Yes</span>
                  <span v-if="props.row.is_interview==0">Unknown</span>
                </el-form-item>
                <el-form-item label="Is Native">
                  <span v-if="props.row.is_native==1">Yes</span>
                  <span v-if="props.row.is_native==0">Unknown</span>
                </el-form-item>
                <el-form-item label="Is Online">
                  <span v-if="props.row.is_online==1">Yes</span>
                  <span v-if="props.row.is_online==0">Unknown</span>
                </el-form-item>
                <el-form-item label="Is Open">
                  <span v-if="props.row.is_open==1">Yes</span>
                  <span v-if="props.row.is_open==0">Unknown</span>
                </el-form-item>
                <el-form-item label="Is Paid">
                  <span v-if="props.row.is_paid==1">Yes</span>
                  <span v-if="props.row.is_paid==0">Unknown</span>
                </el-form-item>
                <el-form-item label="Is Teaching Exp">
                  <span v-if="props.row.is_teaching_exp==1">Yes</span>
                  <span v-if="props.row.is_teaching_exp==0">Unknown</span>
                </el-form-item>
                <el-form-item label="Is Teaching License">
                  <span v-if="props.row.is_teaching_license==1">Yes</span>
                  <span v-if="props.row.is_teaching_license==0">Unknown</span>
                </el-form-item>

                <el-form-item label="Language">
                  <span>{{ props.row.language }}</span>
                </el-form-item>
                <el-form-item label="nationality">
                  <span>{{ props.row.nationality }}</span>
                </el-form-item>
                <el-form-item label="Numbers">
                  <span>{{ props.row.numbers }}</span>
                </el-form-item>
                <el-form-item label="Payment Period">
                  <span>{{ props.row.payment_period }}</span>
                </el-form-item>

                <el-form-item label="Gender">
                  <span v-if="props.row.sex == 1">Male</span>
                  <span v-if="props.row.sex == 2">Female</span>
                  <span v-if="props.row.sex == 3">Both</span>
                </el-form-item>
                <el-form-item label="Teaching Times">
                  <span>{{ props.row.teaching_times }}</span>
                </el-form-item>
                <el-form-item label="Third logo">
                  <el-image :src="props.row.third_com_logo" style="width: 100px; height: 100px" />
                </el-form-item>
                <el-form-item label="Third Header Photo">
                  <el-image :src="props.row.third_com_bg" style="width: 100px; height: 100px" />
                </el-form-item>
                <el-form-item label="Third Company Name">
                  <span>{{ props.row.third_com_name }}</span>
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
          <el-table-column label="Sort" prop="sort" width="80px">
            <template v-slot="{row}">
              <span>{{ row.sort }}</span>
            </template>
          </el-table-column>
          <el-table-column label="User Id" prop="user_id" width="80px">
            <template v-slot="{row}">
              <span style="cursor: pointer;" @click="turnProfileList(row)">{{ row.user_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Viewed"  width="80px">
            <template v-slot="{row}">
              <span>{{ row.views }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Job Title" width="180px" align="center">
            <template v-slot="{row}">
              <span v-if="row.employment_type == 1" class="xll-tag">FT</span>
              <span v-if="row.employment_type == 2" class="xll-tag">PT</span>
              <span v-if="row.employment_type == 3" class="xll-tag">S</span>
              <span style="margin-left: 10px;">{{ row.job_title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Location" width="110px" align="center">
            <template v-slot="{row}">
              <span v-if="row.city && row.citys">{{ row.citys.Pinyin }} {{ row.citys.ShortName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Detail Address" width="110px" align="center">
            <template v-slot="{row}">
              <span>{{ row.job_location }}</span>
            </template>
          </el-table-column>

          <el-table-column label="Due Date" width="110px" align="center">
            <template v-slot="{row}">
              <span>{{ row.apply_due_date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Refresh Time"
            width="110px"
            align="center"
          >
            <template v-slot="{row}">
              <el-tag  :type="row.refresh_time | refreshActiveStatusFilter">
                {{ row.refresh_time | refreshIsActive }}
              </el-tag>
              <br>
              <span>{{ row.refresh_time | refreshTimeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Business Name" width="210px" align="center">
            <template v-slot="{row}">
              <span>{{ row.company_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Salary" width="110px" align="center">
            <template v-slot="{row}">
              <span class="xll-tag">{{ row.currency }}</span> <br> <span>{{ row.salary_min }} - {{ row.salary_max }}</span>
            </template>
          </el-table-column>

          <el-table-column label="Status" class-name="status-col" width="100">
            <template v-slot="{row}">
              <el-tag v-if="row.status === 0" :type="row.status | statusFilter">
                Pending
              </el-tag>
              <el-tag v-if="row.status === 1" :type="row.status | statusFilter">
                Successful
              </el-tag>
              <el-tag v-if="row.status === 2" :type="row.status | statusFilter">
                Rejected
              </el-tag>
              <el-tag v-if="row.status === 3" :type="row.status | statusFilter">
                Expired
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Actions" align="center" width="240"
                           fixed="right"
                           class-name="small-padding fixed-width">
            <template v-slot="{row,$index}">
              <el-button size="mini" type="success" @click="handleCreateTokenToLogin(row)">
                Edit
              </el-button>
              <el-button size="mini" type="primary" @click="showMoreAction(row,$index)">
                More
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="Create Time" width="180">
            <template v-slot="scope">
              {{ scope.row.c_time }}
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

      </el-tab-pane>
    </el-tabs>

    <el-dialog title="Review" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Status" prop="status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Reason">
          <el-input
            v-model="temp.reason"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="reviewData">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="Feature" :visible.sync="dialogAdsFormVisible">

      <div class="feature-ads">
        <h4>Feature Ads</h4>
        <el-form
          ref="adsForm"
          :rules="adsRules"
          :model="adsTemp"
          label-position="left"
          label-width="70px"
          style="width: 400px; margin-left:50px;"
        >
          <el-form-item label="Type" prop="ad_type">
            <el-select v-model="adsTemp.ad_type" class="filter-item" placeholder="Please select">
              <el-option v-for="item in adsTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="Sort">
            <el-input v-model="adsTemp.sort" type="number" placeholder="Please input" />
          </el-form-item>
          <el-form-item label="Date" prop="ad_due_time">
            <el-date-picker v-model="adsTemp.ad_due_time" type="datetime" placeholder="Please pick a date" @change="adsDueDateChange" />
          </el-form-item>

        </el-form>
        <div class="feature-ads-btn">
          <el-button @click="dialogAdsFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="reviewAds">
            Confirm
          </el-button>
        </div>

      </div>

      <div class="feature-sort">
        <h4>Feature Sort</h4>
        <el-form
          ref="sortForm"
          :rules="sortRules"
          :model="sortTemp"
          label-position="left"
          label-width="70px"
          style="width: 400px; margin-left:50px;"
        >
          <el-form-item label="Sort" prop="sort">
            <el-input v-model="sortTemp.sort" type="number" placeholder="Please input" />
          </el-form-item>
        </el-form>

        <div class="feature-sort-btn">
          <el-button @click="dialogAdsFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="reviewSort">
            Confirm
          </el-button>
        </div>

      </div>

      <div slot="footer" class="dialog-footer">

      </div>
    </el-dialog>


    <el-dialog title="More Action" :visible.sync="moreActionDialog">
      <div class="dialog-action-container">
        <el-button type="primary" size="mini" @click="handleApplications(nowRow)">
          Applications
        </el-button>
        <el-button type="primary" size="mini" @click="handleAds(nowRow)">
          Feature
        </el-button>
        <el-button type="primary" size="mini" @click="handleRefresh(nowRow.id)">
          Refresh
        </el-button>
        <el-button type="primary" size="mini" @click="handleReview(nowRow)">
          Review
        </el-button>

        <el-button v-if="nowRow.is_delete===1" size="mini" @click="handleRecover(nowRow)">
          Recover
        </el-button>
        <el-button v-if="nowRow.is_delete===0" size="mini" type="danger" @click="handleDelete(nowRow,nowRowIndex)">
          Delete
        </el-button>
      </div>
      <div slot="footer" class="dialog-footer">

      </div>
    </el-dialog>

    <el-dialog title="Multiple Refresh" :visible.sync="bulkRefreshVisible">
      <el-date-picker
        v-model="bulkRefreshTimeValue"
        type="datetimerange"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="to"
        start-placeholder="Start time"
        end-placeholder="End time"
        align="right">
      </el-date-picker>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" round @click="confirmBulkRefresh()">Confirm</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>

import {setJobSort, jobList, approveJobs, delJobs, setJobFeature, refreshJobs, bulkRefreshJobs} from '@/api/jobs'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { format , formatDistanceToNow,add , isAfter} from 'date-fns'
import {loginToUser} from "@/api/admin";
import {encode} from "js-base64";
import {ADMIN_REFRESH_JOBS} from "@/api/api";

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info',
        2: 'danger'
      }
      return statusMap[status]
    },
    refreshTimeFilter(a){
      // console.log(a)
      if(a && a !== '0000-00-00 00:00:00'){
        return  formatDistanceToNow(new Date(a), { addSuffix: false }) + ' ago'
      }{
        return a;
      }

    },
    refreshIsActive(a){
      const aaa = add(new Date(a),{days:15})
      const rrr = isAfter(aaa,new Date())
      return rrr ? 'Active' : 'Expired';
    },
    refreshActiveStatusFilter(a) {
      const aaa = add(new Date(a),{days:15})
      const rrr = isAfter(aaa,new Date())
      return rrr ? 'success' : 'danger';
    },

  },
  data() {
    return {
      nowRowIndex:'',
      nowRow:{},
      moreActionDialog:false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 50,
        refresh_time: undefined,
        ad_type: undefined
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: [{ label: 'Pending', value: 0 }, { label: 'Successful', value: 1 }, { label: 'Rejected', value: 2 },{ label: 'Expired', value: 3 }],
      showReviewer: false,
      temp: {
        job_id: undefined,
        status: undefined,
        reason: ''
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
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogAdsFormVisible: false,
      adsTypeOptions: [{ label: 'Homepage', value: 1 }, { label: 'Jobs', value: 2 }, { label: 'Both', value: 3 }],
      adsTypeOptions2: [{ label: 'All', value: 0 }, { label: 'Homepage', value: 1 }, { label: 'Jobs', value: 2 }, { label: 'Both', value: 3 }],
      adsTemp: {
        job_id: undefined,
        sort: undefined,
        ad_type: undefined,
        ad_due_time: undefined
      },
      adsRules: {
        ad_type: [{ required: true, message: 'this is required', trigger: 'change' }],
        ad_due_time: [{ required: true, message: 'this is required', trigger: 'change' }]
      },
      sortTemp:{
        job_id:undefined,
        sort:undefined
      },
      sortRules:{
        sort: [{ required: true, message: 'this is required', trigger: 'change' }],
      },
      bulkRefreshVisible:false,
      pickerOptions: {
        shortcuts: [{
          text: 'last week',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'last month',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'last three months',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      bulkRefreshTimeValue:'',
      multipleSelection: []

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
    handleBulkRefresh(){
      this.bulkRefreshVisible = true;
    },
    confirmBulkRefresh(){
      console.log(this.bulkRefreshTimeValue)
      let timeArr = this.bulkRefreshTimeValue;
      let params = {
        start_date:timeArr[0],
        end_date:timeArr[1],
        status:1
      }
      bulkRefreshJobs(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$notify({
            title: 'Success',
            message: 'Refresh Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
          this.bulkRefreshVisible = false
        }
      }).catch(err=>{
        console.log(err)
      })
    },
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
    showMoreAction(row,index){
      this.nowRow = row
      this.moreActionDialog = true
      this.nowRowIndex = index
    },
    tabClickJobs(e) {
      console.log(e)
      if (e.index == 0) {
        this.listQuery.ad_type = undefined
        this.getList()
      }
      if (e.index == 1) {
        this.listQuery.ad_type = 1
        this.getList()
      }
      if (e.index == 2) {
        this.listQuery.ad_type = 2
        this.getList()
      }
      if (e.index == 3) {
        this.listQuery.ad_type = 3
        this.getList()
      }
    },
    paginationEvent(e){
      this.$router.push({path:'/business/jobs/list',query:{page:e.page, limit:e.limit}})
      this.getList()
    },
    getList() {
      this.listLoading = true
      jobList(this.listQuery).then(res => {
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
    handleSelectionChange(val){
      console.log(val)
      this.multipleSelection = val;
    },
    handleBulkRefreshByIds(){
      let multiData = this.multipleSelection
      let multiParams = []
      multiData.forEach(item=>{
        multiParams.push(item.id)
      })

      let params = {
        job_ids:multiParams.join(',')
      }
      ADMIN_REFRESH_JOBS(params).then(res=>{
        if(res.code == 200){
          this.$notify({
            title: 'Success',
            message: 'Refresh Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()

        }
      }).catch(err=>{
        console.log(err)
      })
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
    handleCreate() {
      this.$router.push({ path: '/business/jobs/addJobs' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/business/jobs/editJobs', query: { id: row.id, uid: row.user_id }})
    },
    handleApplications(row){
      this.$router.push({path:'/business/jobs/resume/list',query:{job_id:row.id}})
    },
    handleDelete(row, index) {
      this.$confirm('This operation will delete the Job, do you want to continue?', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        delJobs({ job_id: row.id, is_delete: 1 }).then(res => {
          if (res.code === 200) {
            this.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: 'Delete Success!'
            })
            this.getList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Undeleted'
        })
      })
    },
    handleRecover(row) {
      delJobs({ job_id: row.id, is_delete: 0 }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }
      })
    },
    handleAds(row) {
      this.dialogAdsFormVisible = true
      this.adsTemp.job_id = row.id
      this.sortTemp.job_id = row.id
    },
    handleRefresh(jobId) {
      const data = {
        job_id: jobId
      }
      refreshJobs(data).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$notify({
            title: 'Success',
            message: 'Refresh Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    adsDueDateChange(e) {
      console.log(format(e, 'yyyy-MM-dd HH:mm:ss'))
      this.adsTemp.ad_due_time = format(e, 'yyyy-MM-dd HH:mm:ss')
    },
    reviewAds() {
      this.$refs['adsForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.adsTemp)

          setJobFeature(tempData).then((res) => {
            console.log(res)
            this.dialogAdsFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    reviewSort() {
      this.$refs['sortForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.sortTemp)

          setJobSort(tempData).then((res) => {
            console.log(res)
            this.dialogAdsFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleReview(row) {
      // this.temp = Object.assign({}, row) // copy obj
      this.temp.job_id = row.id
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    reviewData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          approveJobs(tempData).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    handleCreateTokenToLogin(row){
      console.log(row)
      //business/jobs/addJobs?uid=1628&cid=204&identity=2
      this.$router.push({path:'/business/jobs/addJobs',
        query:{uid:row.user_id,cid:row.company_id,identity:row.identity,job_id:row.id}})
    },
    handleCreateTokenToLogin1(row){
      console.log(row)
      let params = {
        user_id:row.user_id
      }
      loginToUser(params).then(res=>{
        console.log(res)
        if(res.code == 200){

          let str = encode(JSON.stringify(res.message))

          let routerPath = process.env.VUE_APP_PC_DOMAIN

          window.open(routerPath+'?from_admin='+encodeURIComponent(str),'_blank')

        }

      }).catch(err=>{
        console.log(err)
      })
    }


  }
}
</script>
<style>
.xll-tag{
  background-color: #f9944a;
  color: #ffffff;
  padding: 10px;
  font-size: 10px;
  border-radius: 10px;
}

.feature-ads{
  padding: 20px;
  border: 1px solid #808080;
  border-radius: 10px;
}

.feature-sort{
  margin-top:20px;
  padding: 20px;
  border: 1px solid #808080;
  border-radius: 10px;
}

</style>
