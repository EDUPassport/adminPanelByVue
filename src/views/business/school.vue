<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
        placeholder="ID"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.user_id"
        placeholder="User id"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.company_name"
        placeholder="Company name"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.work_phone"
        placeholder="Work phone"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.work_email"
        placeholder="Work email"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button v-waves  type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>

      <el-button v-loading="exportDataLoading" v-waves  type="primary" @click="exportBusinessAsExcel()">
        Export Data
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      stripe
      size="mini"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column fixed type="expand">
        <template v-slot="props">
          <el-form label-position="left" inline class="demo-table-expand">

            <el-form-item v-if="props.row.job_title" label="Job Title">
              <span>{{ props.row.job_title }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.category_name_en && props.row.category_name_en !='0'"
                          label="Category">
              <span>{{ props.row.category_name_en }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.country!=''" label="Country">
              <span>{{ props.row.country }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.province !='' " label="Province">
              <span>{{ props.row.province }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.city != '' " label="City">
              <span>{{ props.row.city }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.district !=''" label="District">
              <span>{{ props.row.district }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.address!=''" label="Address">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.bio !='' " label="Bio">
              <span>{{ props.row.bio }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.business_bio !=''" label="Business Bio">
              <span>{{ props.row.business_bio }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.contact_name !='' " label="Contact Name">
              <span>{{ props.row.contact_name }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.curriculum != '' " label="Curriculum">
              <span>{{ props.row.curriculum }}</span>
            </el-form-item>
            <el-form-item label="Fields Trips">
              <span v-if="props.row.felds_trips == 1">Yes</span>
              <span v-if="props.row.felds_trips == 0">Unknown</span>
            </el-form-item>
            <el-form-item v-if="props.row.hobbies != '' " label="Hobbies">
              <span>{{ props.row.hobbies }}</span>
            </el-form-item>
            <el-form-item label="Currently Hiring">
              <span v-if="props.row.is_currently_hiring==1">Yes</span>
              <span v-if="props.row.is_currently_hiring==0">Unknown</span>
            </el-form-item>
            <el-form-item label="Is Events">
              <span v-if="props.row.is_events==1">Yes</span>
              <span v-if="props.row.is_events==0">Unknown</span>
            </el-form-item>
            <el-form-item label="Special Needs">
              <span v-if="props.row.is_special_needs==1">Yes</span>
              <span v-if="props.row.is_special_needs==0">Unknown</span>
            </el-form-item>
            <el-form-item label="Nationality">
              <span>{{ props.row.nationality }}</span>
            </el-form-item>
            <el-form-item label="Average class size">
              <span>{{ props.row.staff_student_ratio }}</span>
            </el-form-item>
            <el-form-item label="technology_available">
              <span>{{ props.row.technology_available }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.website != ''" label="Website">
              <span>{{ props.row.website }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.year_founded !='' " label="Year Founded">
              <span>{{ props.row.year_founded }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.profile_photo!=''" label="Profile Photo">
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.profile_photo"
                :preview-src-list="[props.row.profile_photo]"
              />
            </el-form-item>
            <el-form-item v-if="props.row.header_photo != '' " label="Header Photo">
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.header_photo"
                :preview-src-list="[props.row.header_photo]"
              />
            </el-form-item>
            <el-form-item v-if="props.row.video_url != '' " label="Video">
              <video width="200" :src="props.row.video_url" controls />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column fixed label="ID" prop="id" sortable="custom" align="center" width="80">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="User Id" prop="user_id" width="100">
        <template v-slot="{row}">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Display Name" width="140">
        <template v-slot="scope">
          {{ scope.row.display_name }}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="80">
        <template v-slot="scope">
          <span v-if="scope.row.status == 0">Pending</span>
          <span v-if="scope.row.status == 1">Approve</span>
          <span v-if="scope.row.status == 2">Rejected</span>
        </template>
      </el-table-column>
      <el-table-column label="Number of Jobs posted" width="180">
        <template v-slot="scope">
          {{ scope.row.job_num }}
        </template>
      </el-table-column>
      <el-table-column label="Wechat Id" width="90">
        <template v-slot="scope">
          {{ scope.row.wx_id }}
        </template>
      </el-table-column>
      <el-table-column label="Company Name" width="130">
        <template v-slot="scope">
          {{ scope.row.company_name }}
        </template>
      </el-table-column>
      <el-table-column label="Work Phone" width="140" align="center">
        <template v-slot="scope">
          <span>{{ scope.row.work_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Work Email" width="140" align="center">
        <template v-slot="scope">
          <span>{{ scope.row.work_email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Level" width="110" align="center">
        <template v-slot="scope">
          <span v-if="scope.row.vip_level==1">Basic</span>
          <span v-if="scope.row.vip_level==2">Pro</span>
          <span v-if="scope.row.vip_level==3">Plus</span>
        </template>
      </el-table-column>
      <el-table-column border fixed="right" label="Actions" align="center" width="480" class-name="small-padding fixed-width">
        <template v-slot="{row,$index}">
          <el-button class="xll-btn" type="primary" size="mini" @click="handleReview(row)">
            Review
          </el-button>
          <el-button class="xll-btn" type="primary" size="mini" @click="handleCreateTokenToLogin(row)">
            Edit
          </el-button>

          <el-button class="xll-btn" type="primary" size="mini" @click="handleLookJobs(row)">
            Jobs
          </el-button>
          <el-button class="xll-btn" type="primary" size="mini" @click="handleCreateJobs(row)">
            Post a Job
          </el-button>

          <el-button class="xll-btn" type="primary" size="mini" @click="handleMultiCreateJobs(row)">
            Multi Posts
          </el-button>
          <el-button class="xll-btn" type="primary" size="mini" @click="handleCreateEvents(row)">
            Add Event
          </el-button>
          <el-button class="xll-btn" size="mini" type="primary" @click="handleMemberLevel(row,$index)">
            Upgrade
          </el-button>
          <el-button
            class="xll-btn"
            size="mini"
            type="primary"
            @click="handlePurchaseAds(row)"
          >
            Purchase Ads
          </el-button>
          <el-button
            class="xll-btn"
            size="mini"
            type="primary"
            @click="handleCopyAsRecruiter(row)"
          >
            Copy as a recruiter
          </el-button>
          <el-button
            class="xll-btn"
            v-if="row.is_delete == 0"
            size="mini"
            type="danger"
            @click="handleDelete(row)"
          >
            Delete
          </el-button>

          <el-button
            class="xll-btn"
            v-if="row.is_delete == 1"
            size="mini"
            type="warning"
            @click="handleRecover(row)"
          >
            Recover
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormUpgrade">
      <el-form
        ref="dataForm"
        :model="tempUpgrade"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Identity" prop="identity">
          <el-select
            v-model="tempUpgrade.identity"
            class="filter-item"
            placeholder="Choose Identity"
            @change="changeIdentity"
          >
            <el-option v-for="item in identityOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Level" prop="levelId">
          <el-select v-model="tempUpgrade.levelId"
                     @change="selectLevelChange"
                     class="filter-item"
                     placeholder="Choose Level">
            <el-option v-for="item in levelOptions" :key="item.id" :label="item.level_en" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="showMonthNumStatus" label="Duration" prop="month_num">
          <el-input v-model="tempUpgrade.month_num" type="text"
                    :show-word-limit="true" placeholder="Duration">
            <template #append>
              (months)
            </template>
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormUpgrade = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="upgradeLevel()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="Multi Posts" width="80%" :visible.sync="dialogFormMultiPosts">
      <upload-excel-component :on-success="handleExcelSuccess" :before-upload="beforeExcelUpload" />
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormMultiPosts = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="updateMultiPosts()">
          Post
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="Purchase Ads" :visible.sync="purchaseAdsDialogFormVisible">
      <el-form :model="purchaseAdsForm">
        <el-form-item label="Ad Category" label-width="200">
          <el-cascader
            ref="purchaseAdsCategory"
            v-model="purchaseAdsForm.category_id"
            :options="categoryData"
            :props="categoryProps"
            :show-all-levels="false"
            @change="pidChange"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="Need Design" label-width="200">
          <el-select v-model="purchaseAdsForm.is_design" placeholder="Please Select">
            <el-option label="Yes" :value="1"></el-option>
            <el-option label="No" :value="0"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="purchaseAdsDialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="purchaseConfirm()">Confirm</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Review" :visible.sync="dialogReviewFormVisible">
      <el-form
        ref="dataReviewForm"
        :model="tempReview"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Status">
          <el-select v-model="tempReview.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in reviewStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogReviewFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="reviewData">
          Confirm
        </el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import {vipList, changeVipLevel, addBusinessBasic, schoolList} from '@/api/member'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import { uploadJobs } from '@/api/jobs'
import {adCategoryList, buyAd} from "@/api/ads";
import {approveBusiness, adminExportBusiness, loginToUser} from "@/api/admin"
import {tree} from "@/utils";
import {encode} from "js-base64";
import {SCHOOL_COPY_AS_RECRUITER} from "@/api/api";

export default {
  name: 'school',
  components: { Pagination, UploadExcelComponent },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'info',
        0: 'danger',
        3: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      exportDataLoading:false,
      userListData: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 50,
        id: undefined,
        user_id: undefined,
        company_name: undefined,
        work_phone: undefined,
        work_email: undefined
      },
      identityOptions: [{ label: 'Educator', value: 1 }, { label: 'Business', value: 2 }, { label: 'Vendor', value: 3 }],
      levelOptions: [],
      vipList: [],
      tempUpgrade: {
        identity: undefined,
        levelId: undefined,
        month_num:undefined
      },
      dialogFormUpgrade: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create',
        upgrade: 'Upgrade'
      },
      rules: {
        username: [{ required: true, message: 'username is required', trigger: 'change' }],
        birthday: [{ type: 'date', required: true, message: 'birthday is required', trigger: 'change' }],
        nickname: [{ required: true, message: 'nickname is required', trigger: 'blur' }]
      },
      dialogFormMultiPosts: false,
      tempMultiPosts: {
        job_file: undefined,
        user_id: undefined,
        identity: 3,
        company_id:undefined
      },
      multiPostsFile: undefined,
      tableData: [],
      tableHeader: [],

      purchaseAdsDialogFormVisible: false,
      purchaseAdsForm: {
        category_id: undefined,
        money: undefined,
        is_design: 1,
        user_id: undefined,
        identity: 2,
        nickname: undefined
      },
      categoryArr: [],
      categoryData: [],
      adsCategoryValue: undefined,
      categoryProps: {
        checkStrictly: false,
        emitPath: false,
        value: 'id',
        label: 'name_en'
      },
      dialogReviewFormVisible:false,
      reviewStatusOptions: [{ label: 'Pending', value: 0 }, { label: 'Successful', value: 1 }, { label: 'Rejected', value: 2 }],
      tempReview: {
        business_id: undefined,
        status: undefined
      },
      showMonthNumStatus:true

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
    let cid = this.$route.query.cid;
    let uid = this.$route.query.uid;

    if(page){
      this.listQuery.page = Number(page)
    }
    if(limit){
      this.listQuery.limit = Number(limit)
    }
    if(cid){
      this.listQuery.id = Number(cid)
    }

    if(uid){
      this.listQuery.user_id = Number(uid)
    }

    this.getList()
    this.getVipList()
    this.getAdsCategoryList()
  },
  methods: {
    handleReview(row) {
      // this.temp = Object.assign({}, row) // copy obj
      this.tempReview.business_id = row.id
      this.dialogReviewFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataReviewForm'].clearValidate()
      })
    },
    reviewData() {
      this.$refs['dataReviewForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.tempReview)
          approveBusiness(tempData).then(() => {
            this.dialogReviewFormVisible = false
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
    purchaseConfirm() {
      let data = Object.assign({}, this.purchaseAdsForm)
      // console.log(data)
      buyAd(data).then(res => {
        console.log(res)
        if(res.code == 200){
          this.$message.success('Success')
        }else{
          this.$message.error(res.msg)
        }
        this.purchaseAdsDialogFormVisible = false;
      }).catch(err => {
        console.log(err)
      })
    },
    handlePurchaseAds(row) {
      console.log(row)
      this.purchaseAdsForm.nickname = row.first_name + ' ' + row.last_name;
      this.purchaseAdsForm.user_id = row.user_id;
      this.purchaseAdsDialogFormVisible = true;
    },
    handleCopyAsRecruiter(row){
      console.log(row)
      let params = {
        school_id: row.id,
        user_id: row.user_id,
        identity: 3
      }
      SCHOOL_COPY_AS_RECRUITER(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$message.success('Copy Success')
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    pidChange(e) {
      // console.log(e)
      this.purchaseAdsForm.category_id = e;
      this.purchaseAdsForm.money = this.$refs.purchaseAdsCategory.getCheckedNodes()[0].data.money;
      // console.log(this.$refs.purchaseAdsCategory.getCheckedNodes()[0].data.money)
    },
    getAdsCategoryList() {
      let params = {
        tree: 0
      }
      adCategoryList(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.categoryArr = res.message;
          this.categoryData = tree(res.message);
          // console.log(tree(res.message))
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    updateMultiPosts() {
      const data = Object.assign({}, this.tempMultiPosts)
      const form = new FormData()
      form.append('job_file', this.multiPostsFile)
      form.append('user_id', data.user_id)
      form.append('identity', 3)
      form.append('company_id',data.company_id)

      uploadJobs(form).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: 'Success',
            type: 'success'
          })
          this.$router.push({ path: '/business/jobs/list', query: {}})
          this.dialogFormMultiPosts = false
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    beforeExcelUpload(file) {
      console.log(file)
      const isLt20M = file.size / 1024 / 1024 < 20

      if (isLt20M) {
        // return true
        this.multiPostsFile = file
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 20m in size.',
        type: 'warning'
      })
      return false
    },
    handleExcelSuccess({ results, header }) {
      console.log(results)
      console.log(header)
      this.$message({
        message: 'Upload Success.',
        type: 'success'
      })
      this.tableData = results
      this.tableHeader = header
    },
    paginationEvent(e){
      this.$router.push({path:'/business/school',query:{page:e.page, limit:e.limit}})
      this.getList()
    },
    getList() {
      this.listLoading = true
      schoolList(this.listQuery).then(res => {
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
    changeIdentity(e) {
      // console.log(e)
      // this.levelOptions = []
      if (e == 1) {
        this.tempUpgrade.levelId = undefined
        this.levelOptions = this.vipList.filter(item => item.identity == 1)
      }
      if (e == 2) {
        this.tempUpgrade.levelId = undefined
        this.levelOptions = this.vipList.filter(item => item.identity == 2)
      }
      if (e == 3) {
        this.tempUpgrade.levelId = undefined
        this.levelOptions = this.vipList.filter(item => item.identity == 3)
      }
      console.log(this.levelOptions)
    },
    getVipList() {
      vipList().then(response => {
        console.log(response)
        this.vipList = response.message
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreateJobs(row) {
      this.$router.push({ path: '/business/jobs/addJobs', query: { uid: row.user_id, cid: row.id, identity:3 }})
    },
    handleLookJobs(row){
      console.log(row)
      this.$router.push({ path: '/business/filterJobs', query: { uid: row.user_id}})
    },
    handleCreateEvents(row){
      this.$router.push({ path: '/business/events/addEvents', query: { uid: row.user_id , cid:row.id, identity: 3 }})
    },
    handleMultiCreateJobs(row) {
      this.tempMultiPosts.user_id = row.user_id
      this.tempMultiPosts.company_id = row.id;
      this.dialogFormMultiPosts = true
    },
    handleUpdate(row) {
      this.$router.push({ path: '/business/editBusiness', query: { uid: row.user_id }})
    },
    handleDelete(row){

      let data = {
        user_id:row.user_id,
        is_delete:1
      }

      this.$confirm('Delete ?', 'Tips', {
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        addBusinessBasic(data).then(res => {
          // console.log(res)
          if (res.code === 200) {
            this.$message.success(res.msg)
            setTimeout(function() {
              window.location.reload()
            }, 1000)

            // this.$router.push({path:'/users/business'})
          } else {
            this.$message.error(res.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancel'
        });
      });

    },
    handleRecover(row){

      let data = {
        user_id:row.user_id,
        is_delete:0
      }

      this.$confirm('Recover ?', 'Tips', {
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        addBusinessBasic(data).then(res => {
          // console.log(res)
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.getList();
            // this.$router.push({path:'/users/business'})
          } else {
            this.$message.error(res.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancel'
        });
      });

    },
    handleMemberLevel(row) {
      // this.tempUpgrade = Object.assign({}, row) // copy obj
      this.tempUpgrade.user_id = row.user_id
      console.log(row)
      this.dialogStatus = 'Upgrade'
      this.dialogFormUpgrade = true
      this.tempUpgrade.levelId = undefined
      this.tempUpgrade.identity = undefined
      this.tempUpgrade.month_num = undefined

      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    upgradeLevel() {
      const that = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.tempUpgrade)
          const tempData = Object.assign({}, this.tempUpgrade)
          const data = {
            user_id: tempData.user_id,
            identity: tempData.identity,
            level_id: tempData.levelId,
            month_num: tempData.month_num
          }
          changeVipLevel(data).then(response => {
            // console.log(response)
            if (response.code == 200) {
              that.$notify({
                title: 'Success',
                message: 'Upgrade Successfully',
                type: 'success',
                duration: 2000
              })
              that.dialogFormUpgrade = false
            }
          })
        }
      })
    },
    selectLevelChange(e){
      // console.log(e)
      // console.log(this.levelOptions)
      let levelOptionsData = this.levelOptions

      let filterData = levelOptionsData.filter(item=>item.id === e)
      // console.log(filterData)
      if(filterData.length>0){
        if(filterData[0]['level'] == 4){
          this.showMonthNumStatus = false
        }else{
          this.showMonthNumStatus = true
        }
      }

    },
    exportBusinessAsExcel(){
      this.exportDataLoading = true
      adminExportBusiness().then(res=>{
        if(res.code == 200){
          this.exportDataLoading = false
          window.open(res.message,'_blank')
        }

      }).catch(err=>{
        console.log(err)
      })
    },
    handleCreateTokenToLogin(row){
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
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 20%;
}
.xll-btn{
  margin-top: 10px;
}
</style>
