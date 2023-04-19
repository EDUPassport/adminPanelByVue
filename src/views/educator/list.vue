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
        v-model="listQuery.name"
        placeholder="name"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.phone"
        placeholder="Phone #"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.email"
        placeholder="Email address"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>

      <el-button
        v-waves
        type="primary"
        class="filter-item"
        :disabled="multipleSurvey.length <= 0"
        @click="handleMultipleSurvey()"
      >
        Multiple Survey
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-form-item
              v-if="props.row.address != ''"
              label="Address"
            >
              {{ props.row.address }}
            </el-form-item>
            <el-form-item
              v-if="props.row.hobbies"
              label="Hobbies"
            >
              {{ props.row.hobbies }}
            </el-form-item>
            <el-form-item
              v-if="props.row.bio"
              label="Introduction"
            >
              {{ props.row.bio }}
            </el-form-item>
            <el-form-item
              v-if="props.row.resume_pdf"
              label="Resume PDF"
            >
              <el-link :href="props.row.resume_pdf" target="_blank">
                View PDF
              </el-link>

            </el-form-item>

            <el-form-item
              v-if="props.row.profile_photo != '' "
              label="Profile Photo"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.profile_photo"
                :preview-src-list="[props.row.profile_photo]"
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.background_image"
              label="Background image"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.background_image"
                :preview-src-list="[props.row.background_image]"
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.video_url "
              label="Video"
            >
              <video
                width="200"
                :src="props.row.video_url"
                controls
              />
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
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Name"
        width="140"
      >
        <template v-slot="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column
        label="Phone"
        width="110"
        align="center"
      >
        <template v-slot="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Email"
        width="110"
      >
        <template v-slot="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column
        label="Job Title"
        width="110"
      >
        <template v-slot="scope">
          {{ scope.row.job_title }}
        </template>
      </el-table-column>

      <el-table-column
        label="Nationality"
        width="110"
        align="center"
      >
        <template v-slot="scope">
          {{ scope.row.nationality }}
        </template>
      </el-table-column>


      <el-table-column
        label="Wechat Id"
        width="140"
      >
        <template v-slot="scope">
          {{ scope.row.wx_id }}
        </template>
      </el-table-column>

      <el-table-column
        label="Level"
        width="110"
      >
        <template v-slot="scope">
          <el-tag v-if="scope.row.vip_level==1" type="success">Basic</el-tag>
          <el-tag v-if="scope.row.vip_level==2" type="warning">Pro</el-tag>
          <el-tag v-if="scope.row.vip_level==3" type="danger">Plus</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="Actions"
        align="center"
        width="280"
        class-name="small-padding fixed-width"
      >
        <template v-slot="{row,$index}">
          <el-button
            type="primary"
            size="mini"
            @click="handleCreateTokenToLogin(row)"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleMemberLevel(row,$index)"
          >
            Upgrade
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handlePurchaseAds(row)"
          >
            Purchase Ads
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

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          label="username"
          prop="username"
        >
          <el-input v-model="temp.username"/>
        </el-form-item>
        <el-form-item
          label="nickname"
          prop="nickname"
        >
          <el-input v-model="temp.nickname"/>
        </el-form-item>
        <el-form-item
          label="truename"
          prop="truename"
        >
          <el-input v-model="temp.truename"/>
        </el-form-item>
        <el-form-item
          label="sex"
          prop="sex"
        >
          <el-select
            v-model="temp.sex"
            class="filter-item"
            placeholder="Please select gender"
          >
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="phone"
          prop="phone"
        >
          <el-input v-model="temp.phone"/>
        </el-form-item>
        <el-form-item
          label="email"
          prop="email"
        >
          <el-input v-model="temp.email"/>
        </el-form-item>
        <el-form-item
          label="birthday"
          prop="birthday"
        >
          <el-date-picker
            v-model="temp.birthday"
            type="date"
            placeholder="Please picker a date"
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
          @click="dialogStatus==='create'?createData():updateData()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormUpgrade"
    >
      <el-form
        ref="dataForm"
        :model="tempUpgrade"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          label="Identity"
          prop="identity"
        >
          <el-select
            v-model="tempUpgrade.identity"
            class="filter-item"
            placeholder="Choose Identity"
            @change="changeIdentity"
          >
            <el-option
              v-for="item in identityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Level"
          prop="levelId"
        >
          <el-select
            v-model="tempUpgrade.levelId"
            class="filter-item"
            placeholder="Choose Level"
            @change="selectLevelChange"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.id"
              :label="item.level_en"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="showMonthNumStatus"
                      label="Duration"
                      prop="month_num">
          <el-input v-model="tempUpgrade.month_num"
                    type="text"
                    :show-word-limit="true"
                    placeholder="Duration">
            <template #append>
              (months)
            </template>
          </el-input>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormUpgrade = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="upgradeLevel()"
        >
          Confirm
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

  </div>
</template>

<script>

import {
  editUserInfo,
  deleteUser,
  vipList,
  changeVipLevel,
  userObjectList,
  educatorContactList
} from '@/api/member'
import waves from '@/directive/waves' // waves directive
import {parseTime, tree} from '@/utils'
import Pagination from '@/components/Pagination'
import {addDeals} from '@/api/deals' // secondary package based on el-pagination
import {addEvent} from '@/api/events'
import {adCategoryList, buyAd} from "@/api/ads";
import {loginToUser} from "@/api/admin";
import {encode} from "js-base64";
import {ADD_USER_QUESTION} from "@/api/api";

export default {
  name: 'Index',
  components: {Pagination},
  directives: {waves},
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
      dealsType: [{label: 'Deal', value: 1}, {label: 'Discount', value: 2}],
      dealsTwo: [{label: 'All Locations', value: 1}, {label: 'Limited', value: 0}],
      dealsThree: [{label: '1 year', value: 1}, {label: '2 year', value: 2}],
      dealsFour: [{label: 'Shanghai', value: 1}, {label: 'Other', value: 0}],
      eventsOne: [{label: 'Social', value: 1}, {label: 'Professional', value: 2}],
      userListData: [],
      popuCityList: [],
      dialogFormDealsVisible: false,

      dealsTempData: {
        user_id: 1,
        is_unregister: undefined,
        type: undefined,
        is_all: undefined,
        file: undefined,
        due_contract: undefined,
        pay_money: undefined,
        desc: undefined,
        deal_id: undefined,
        city: undefined,
        location: undefined,
        identity: undefined
      },
      fileUrl: undefined,
      fileList: undefined,
      eventsFileUrl: undefined,
      eventsFileList: undefined,
      dialogFormEventsVisible: false,
      eventsTempData: {
        user_id: 1,
        name: undefined,
        desc: undefined,
        is_all: undefined,
        type_desc: undefined,
        pay_money: undefined,
        date: undefined,
        start_time: undefined,
        end_time: undefined,
        file: undefined,
        location: undefined,
        city: undefined,
        is_unregister: 0
      },

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 50,
        id:undefined,
        user_id:undefined,
        name: undefined,
        phone: undefined,
        email: undefined
      },
      percentOptions: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      seekingOptions: [{label: 'no', value: 0}, {label: 'Yes', value: 1}],
      sexOptions: [{label: 'unco', value: 0}, {label: 'Male', value: 1}, {label: 'Female', value: 2}],
      identityOptions: [{label: 'Educator', value: 1}, {label: 'Business', value: 2}, {label: 'Vendor', value: 3}],
      levelOptions: [],
      vipList: [],

      importanceOptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        user_id: undefined,
        username: undefined,
        nickname: undefined,
        truename: undefined,
        sex: undefined,
        phone: undefined,
        email: undefined,
        birthday: ''
      },
      tempUpgrade: {
        identity: undefined,
        levelId: undefined,
        month_num:undefined
      },
      dialogFormVisible: false,
      dialogFormUpgrade: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create',
        upgrade: 'Upgrade'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        username: [{required: true, message: 'username is required', trigger: 'change'}],
        birthday: [{type: 'date', required: true, message: 'birthday is required', trigger: 'change'}],
        nickname: [{required: true, message: 'nickname is required', trigger: 'blur'}]
      },
      downloadLoading: false,
      dialogUserDetailVisible: false,
      userDetailData: [],

      purchaseAdsDialogFormVisible: false,
      purchaseAdsForm: {
        category_id: undefined,
        money: undefined,
        is_design: 1,
        user_id: undefined,
        identity: 1,
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
      showMonthNumStatus:true,
      multipleSurvey: []

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
    let uid = this.$route.query.uid;

    if(page){
      this.listQuery.page = Number(page)
    }
    if(limit){
      this.listQuery.limit = Number(limit)
    }

    if(uid){
      this.listQuery.user_id = uid;
    }

    this.getList()
    this.getVipList()
    this.getUserObjList()
    this.getAdsCategoryList()

  },
  methods: {
    handleSelectionChange(val){
      console.log(val)
      this.multipleSurvey = val;
    },
    handleMultipleSurvey(){

      let multiData = this.multipleSurvey
      let multiParams = []
      multiData.forEach(item=>{
        multiParams.push(item.id)
      })

      console.log(multiParams)
      let params = {
        identity:1,
        company_ids:multiParams.join(',')
      }
      ADD_USER_QUESTION(params).then(res=>{
        if(res.code === 200){
          this.$message.success('Success')
        }
      }).catch(err=>{
        console.log(err)
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
    getUserObjList() {
      userObjectList({pid: 71}).then(res => {
        console.log(res)
        this.popuCityList = res.message
      })
    },
    handleAddDeals(row) {
      this.dialogFormDealsVisible = true
      this.dealsTempData.user_id = row.id
    },
    handleAddEvents(row) {
      this.dialogFormEventsVisible = true

      this.dealsTempData.user_id = row.id
    },
    createEvents() {
      console.log(this.eventsTempData)
      // console.log(tempData.birthday.getFullYear())
      const year = this.eventsTempData.date.getFullYear()
      const month = this.eventsTempData.date.getMonth() + 1
      const day = this.eventsTempData.date.getDate()

      this.eventsTempData.date = year + '-' + month + '-' + day

      if (this.eventsTempData.is_unregister == 1) {
        this.eventsTempData.user_id = 1
      }
      addEvent(this.eventsTempData).then(response => {
        console.log(response)
        if (response.code == 200) {
          this.$message({
            message: '操作Success',
            type: 'success'
          })
          this.dialogFormEventsVisible = false
          this.eventsTempData = {
            user_id: 1,
            name: undefined,
            desc: undefined,
            is_all: undefined,
            type_desc: undefined,
            pay_money: undefined,
            date: undefined,
            start_time: undefined,
            end_time: undefined,
            file: undefined,
            location: undefined,
            city: undefined,
            is_unregister: 0
          }
        }
      })
    },
    createDeals() {
      console.log(this.dealsTempData)
      if (this.dealsTempData.is_unregister == 1) {
        this.dealsTempData.user_id = 1
      }
      addDeals(this.dealsTempData).then(response => {
        console.log(response)
        if (response.code == 200) {
          this.$message({
            message: '操作Success',
            type: 'success'
          })
          this.dialogFormDealsVisible = false
        }
      })
    },
    uploadFileSuccess(response) {
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.fileUrl = response.data[0].file_url
        this.dealsTempData.file = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    uploadEventsFileSuccess(response) {
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.eventsFileUrl = response.data[0].file_url
        this.eventsTempData.file = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    paginationEvent(e) {
      this.$router.push({path:'/educator/list',query:{page:e.page, limit:e.limit}})
      this.getList()
    },
    getList() {
      this.listLoading = true
      educatorContactList(this.listQuery).then(res => {
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const {prop, order} = data
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
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.$router.push({path: '/educator/editEducator', query: {uid: row.user_id}})
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(this.temp)
          const tempData = Object.assign({}, this.temp)
          const tempObj = {}
          tempObj.username = this.temp.username
          tempObj.nickname = this.temp.nickname
          tempObj.truename = this.temp.truename
          tempObj.sex = this.temp.sex
          tempObj.phone = this.temp.phone
          tempObj.email = this.temp.email
          tempObj.user_id = this.temp.user_id

          // console.log(tempData.birthday.getFullYear())
          const year = tempData.birthday.getFullYear()
          const month = tempData.birthday.getMonth() + 1
          const day = tempData.birthday.getDate()
          const birthdayStr = year + '-' + month + '-' + day
          tempObj.birthday = birthdayStr
          tempData.birthday = birthdayStr // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // console.log(tempData)
          editUserInfo(tempObj).then((res) => {
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
            }
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
          })
        }
      })
    },
    handleDelete(row) {
      // this.list.splice(index, 1)
      deleteUser({
        user_id: row.id,
        is_delete: 1
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'wrong',
            duration: 2000
          })
        }
      }).catch(error => {
        console.log(error)
      })
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
      let that = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(this.tempUpgrade)
          const tempData = Object.assign({}, this.tempUpgrade)
          // const tempObj = {}
          // tempObj.username = this.temp.username
          // tempObj.nickname = this.temp.nickname
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

          // console.log(tempData)
        }
      })
    },
    handleRecover(row) {
      // this.list.splice(index, 1)
      deleteUser({
        user_id: row.id,
        is_delete: 0
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$notify({
            title: 'Success',
            message: 'Recover Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'wrong',
            duration: 2000
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleFetchDetail(detail) {
      this.dialogUserDetailVisible = true
      this.userDetailData.push(detail)
      console.log(detail)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', 'name', 'phone', 'is_educator', 'is_business', 'is_vendor', 'is_other', 'is_seeking', 'identity']
        const filterVal = ['id', 'name', 'phone', 'is_educator', 'is_business', 'is_vendor', 'is_other', 'is_seeking', 'identity']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
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
    getSortClass: function (key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
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
  /*width: 90px;*/
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 20%;
}
</style>
