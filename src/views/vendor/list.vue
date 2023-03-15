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

      <el-button
        v-waves
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>

      <el-button v-loading="exportDataLoading" v-waves  type="primary" @click="exportBusinessAsExcel()">
        Export Data
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
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-form-item label="Wechat Id">
              <span>{{ props.row.wx_id }}</span>
            </el-form-item>
            <el-form-item label="Work Phone">
              <span>{{ props.row.work_phone }}</span>
            </el-form-item>
            <el-form-item label="Business Reg Number">
              <span>{{ props.row.busin_reg_num }}</span>
            </el-form-item>
            <el-form-item label="Province">
              <span>{{ props.row.province }}</span>
            </el-form-item>
            <el-form-item label="City">
              <span>{{ props.row.city }}</span>
            </el-form-item>
            <el-form-item label="District">
              <span>{{ props.row.district }}</span>
            </el-form-item>
            <el-form-item
              v-if="props.row.address !=''"
              label="Address"
            >
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="First Language">
              <span>{{ props.row.first_language }}</span>
            </el-form-item>
            <el-form-item label="Dog Friendly">
              <span v-if="props.row.is_dog_friendly==1">Yes</span>
              <span v-if="props.row.is_dog_friendly==0">Unknown</span>
            </el-form-item>
            <el-form-item label="Event">
              <span v-if="props.row.is_events==1">Yes</span>
              <span v-if="props.row.is_events==0">Unknown</span>
            </el-form-item>
            <el-form-item label="Job Title">
              <span>{{ props.row.job_title }}</span>
            </el-form-item>
            <el-form-item label="Nationality">
              <span>{{ props.row.nationality }}</span>
            </el-form-item>
            <el-form-item label="Vendor Bio">
              <span>{{ props.row.vendor_bio }}</span>
            </el-form-item>
            <el-form-item label="Legal Company Name">
              <span>{{ props.row.legal_company_name }}</span>
            </el-form-item>
            <el-form-item label="Company Name(EN)">
              <span>{{ props.row.vendor_name_en }}</span>
            </el-form-item>
            <el-form-item label="Category">
              <span>{{ props.row.vendor_type_name }}</span>
            </el-form-item>

            <el-form-item label="Email">
              <span>{{ props.row.work_email }}</span>
            </el-form-item>
            <el-form-item label="Website">
              <span>{{ props.row.website }}</span>
            </el-form-item>
            <el-form-item label="Company Wechat">
              <span>{{ props.row.wechat_public_name }}</span>
            </el-form-item>
            <el-form-item
              v-if="props.row.business_reg_img !='' "
              label="Business Reg img"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.business_reg_img"
                :preview-src-list="[props.row.business_reg_img]"
              />
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
              v-if="props.row.background_image != '' "
              label="Header Photo"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.background_image"
                :preview-src-list="[props.row.background_image]"
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.logo != '' "
              label="Logo"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.logo"
                :preview-src-list="[props.row.logo]"
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.wechat_public_qrcode !='' "
              label="Wechat Qrcode"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.wechat_public_qrcode"
                :preview-src-list="[props.row.wechat_public_qrcode]"
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.video_url != '' "
              label="Video"
            >
              <video
                width="200"
                :src="props.row.video_url"
                controls
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.proposed_deal != '' "
              label="Proposed Deal"
            >
              <span>{{ props.row.proposed_deal }}</span>
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
        width="110"
      >
        <template v-slot="{row}">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Display Name"
        width="160"
      >
        <template v-slot="scope">
          {{ scope.row.display_name }}
        </template>
      </el-table-column>
      <el-table-column
        label="Company Name"
        width="250"
      >
        <template v-slot="scope">
          {{ scope.row.company_name }}
        </template>
      </el-table-column>

      <el-table-column
        label="Membership Level"
        width="150"
      >
        <template v-slot="scope">
          <span v-if="scope.row.vip_level == 1">Basic </span>
          <span v-if="scope.row.vip_level == 2">Pro </span>
          <span v-if="scope.row.vip_level == 3">Plus </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Deals(Count/Number)"
        align="center"
        width="100"
        class-name="small-padding fixed-width"
      >
        <template v-slot="{row}">
          <el-tag type="success">
            {{ row.deals_count }}
          </el-tag>
          /
          <el-tag type="info">
            {{ row.deals_num }}
          </el-tag>
          <el-button
            type="primary"
            size="mini"
            @click="handleAddDeals(row)"
          >
            Add
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Events(Count/Number)"
        align="center"
        width="100"
        class-name="small-padding fixed-width"
      >
        <template v-slot="{row}">
          <el-tag type="success">
            {{ row.event_count }}
          </el-tag>
          /
          <el-tag type="info">
            {{ row.events_num }}
          </el-tag>
          <el-button
            type="primary"
            size="mini"
            @click="handleAddEvents(row)"
          >
            Add
          </el-button>
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
      :visible.sync="dialogFormUpgrade"
    >
      <!--      :rules="rules"-->
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
            @change="selectLevelChange"
            class="filter-item"
            placeholder="Choose Level"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.id"
              :label="item.level_en"
              :value="item.id"
            />
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
  deleteUser,
  vipList,
  changeVipLevel,
  addVendorBasic, vendorListV2
} from '@/api/member'
import waves from '@/directive/waves' // waves directive
import {parseTime, tree} from '@/utils'
import Pagination from '@/components/Pagination'
import {addEvent} from '@/api/events'
import {adCategoryList, buyAd} from "@/api/ads";
import {adminExportVendor, loginToUser} from "@/api/admin";
import {encode} from "js-base64";

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
      exportDataLoading:false,
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
        email: undefined,
        logo: undefined,
        wechat_public_qrcode: undefined,
        wechat_public_name: undefined,
        vendor_name_en: undefined,
        vendor_bio: undefined,
        work_email: undefined
      },
      tempUpgrade: {
        identity: undefined,
        levelId: undefined,
        month_num: undefined
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
        // username: [{ required: true, message: 'username is required', trigger: 'change' }],
        // birthday: [{ type: 'date', required: true, message: 'birthday is required', trigger: 'change' }],
        // nickname: [{ required: true, message: 'nickname is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogUserDetailVisible: false,
      userDetailData: [],
      eventStartTime: undefined,
      eventEndTime: undefined,

      purchaseAdsDialogFormVisible: false,
      purchaseAdsForm: {
        category_id: undefined,
        money: undefined,
        is_design: 1,
        user_id: undefined,
        identity: 3,
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
  mounted() {

  },
  methods: {
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
    handleAddDeals(row) {
      this.$router.push({ path: '/vendor/deals/addDeals', query: { uid: row.user_id,cid:row.id,identity: 5 }})
    },
    handleAddEvents(row) {
      this.$router.push({ path: '/vendor/events/addEvents', query: { uid: row.user_id,cid:row.id, identity:5 }})
    },
    createEvents() {
      // console.log(this.eventsTempData)
      // console.log(tempData.birthday.getFullYear())
      if (this.eventStartTime != undefined) {
        this.eventsTempData.start_time = this.eventStartTime
      }
      if (this.eventEndTime != undefined) {
        this.eventsTempData.end_time = this.eventEndTime
      }
      this.eventsTempData.location = this.mapInfo.address
      this.eventsTempData.lat = this.mapInfo.lat
      this.eventsTempData.lng = this.mapInfo.lng
      addEvent(this.eventsTempData).then(response => {
        // console.log(response)
        if (response.code == 200) {
          this.$message({
            message: 'Success',
            type: 'success'
          })
          this.dialogFormEventsVisible = false
          this.getList()
          this.eventsTempData = {
            user_id: undefined,
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
            province: undefined,
            province_name: undefined,
            city: undefined,
            city_name: undefined,
            district: undefined,
            district_name: undefined,
            third_com_name: undefined,
            third_com_logo: undefined,
            third_com_bg: undefined,
            lng: undefined,
            lat: undefined
          }
        }
      })
    },
    paginationEvent(e){
      this.$router.push({path:'/vendor/vendor',query:{page:e.page, limit:e.limit}})
      this.getList()
    },
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      vendorListV2(this.listQuery).then(res => {
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
      this.$router.push({path: '/vendor/editVendor', query: {uid: row.user_id}})
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(this.temp)
          const tempData = Object.assign({}, this.temp)

          addVendorBasic(tempData).then((res) => {
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
          console.log(this.tempUpgrade)
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
            console.log(response)
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
      adminExportVendor().then(res=>{
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
  /*width: 90px;*/
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 20%;
}
</style>
