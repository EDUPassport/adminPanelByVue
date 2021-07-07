<template>
  <div class="app-container">
    <div class="filter-container" />

    <el-tabs value="All" style="margin-top:15px;" type="border-card" @tab-click="tabClickJobs">
      <el-tab-pane v-for="item in adsTypeOptions2" :key="item.value" :label="item.label" :name="item.label">
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
            <template slot-scope="props">
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
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="User Id" prop="user_id" width="80px">
            <template slot-scope="{row}">
              <span>{{ row.user_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Job Title" width="180px" align="center">
            <template slot-scope="{row}">
              <span v-if="row.employment_type == 1" class="xll-tag">FT</span>
              <span v-if="row.employment_type == 2" class="xll-tag">PT</span>
              <span v-if="row.employment_type == 3" class="xll-tag">S</span>
              <span style="margin-left: 10px;">{{ row.job_title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Location" width="110px" align="center">
            <template slot-scope="{row}">
              <span v-if="row.city>0 && row.city != null">{{ row.citys.Pinyin }} {{ row.citys.ShortName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Detail Address" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.job_location }}</span>
            </template>
          </el-table-column>

          <el-table-column label="Due Date" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.apply_due_date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Refresh Time" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.refresh_time | refreshTimeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Business Name" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.business_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Salary" width="110px" align="center">
            <template slot-scope="{row}">
              <span class="xll-tag">{{ row.currency }}</span> <br> <span>{{ row.salary_min }} - {{ row.salary_max }}</span>
            </template>
          </el-table-column>

          <el-table-column label="Status" class-name="status-col" width="100">
            <template slot-scope="{row}">
              <el-tag v-if="row.status === 0" :type="row.status | statusFilter">
                Pending
              </el-tag>
              <el-tag v-if="row.status === 1" :type="row.status | statusFilter">
                Successful
              </el-tag>
              <el-tag v-if="row.status === 2" :type="row.status | statusFilter">
                Rejected
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Actions" align="center" width="400" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" @click="handleAds(row)">
                Ads
              </el-button>
              <el-button type="primary" size="mini" @click="handleRefresh(row.id)">
                Refresh
              </el-button>
              <el-button type="primary" size="mini" @click="handleReview(row)">
                Review
              </el-button>
              <el-button size="mini" type="success" @click="handleUpdate(row)">
                Edit
              </el-button>
              <el-button v-if="row.is_delete===1" size="mini" @click="handleRecover(row)">
                Recover
              </el-button>
              <el-button v-if="row.is_delete===0" size="mini" type="danger" @click="handleDelete(row,$index)">
                Delete
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="Create Time" width="180">
            <template slot-scope="scope">
              {{ scope.row.c_time }}
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
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
        <el-form-item label="Status">
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

    <el-dialog title="Ads" :visible.sync="dialogAdsFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Type">
          <el-select v-model="adsTemp.ad_type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in adsTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Sort">
          <el-input v-model="adsTemp.sort" type="number" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="adsTemp.ad_due_time" type="datetime" placeholder="Please pick a date" @change="adsDueDateChange" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdsFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="reviewAds">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { jobList, approveJobs, delJobs, setJobFeature, refreshJobs } from '@/api/jobs'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { format , formatDistanceToNow} from 'date-fns'

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
      return  formatDistanceToNow(new Date(a), { addSuffix: true })
    }

  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 50,
        ad_type: undefined
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: [{ label: 'Pending', value: 0 }, { label: 'Successful', value: 1 }, { label: 'Rejected', value: 2 }],
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
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      jobList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.message.data
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
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.$router.push({ path: '/jobs/addJobs' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/jobs/editJobs', query: { id: row.id, uid: row.user_id }})
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
      this.$refs['dataForm'].validate((valid) => {
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
</style>
