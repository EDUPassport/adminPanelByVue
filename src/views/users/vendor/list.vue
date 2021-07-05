<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.work_email"
        placeholder="Work Email"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.vendor_name"
        placeholder="Vendor Name"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.country"
        placeholder="Country"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.province"
        placeholder="Province"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.city"
        placeholder="City"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.phone"
        placeholder="Phone"
        style="width: 200px;"
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
        <template slot-scope="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-form-item label="Nickname">
              <span>{{ props.row.nickname }}</span>
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
              v-if="props.row.busin_reg_img !='' "
              label="Business Reg img"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.busin_reg_img"
                :preview-src-list="[props.row.busin_reg_img]"
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
              v-if="props.row.header_photo != '' "
              label="Header Photo"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.header_photo"
                :preview-src-list="[props.row.header_photo]"
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
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="User Id"
        prop="user_id"
        width="110"
      >
        <template slot-scope="{row}">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="First&&Last Name"
        width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.first_name }} {{ scope.row.last_name }}
        </template>
      </el-table-column>
      <el-table-column
        label="Company Name(EN)"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.vendor_name_en }}
        </template>
      </el-table-column>
      <el-table-column
        label="Wechat Id"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.wx_id }}
        </template>
      </el-table-column>
      <el-table-column
        label="Phone"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Membership Level"
        width="110"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.level == 1">Basic </span>
          <span v-if="scope.row.level == 2">Pro </span>
          <span v-if="scope.row.level == 3">Plus </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Deals(Count/Number)"
        align="center"
        width="100"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
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
        <template slot-scope="{row}">
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
        <template slot-scope="{row,$index}">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
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
  </div>
</template>

<script>

import {
  deleteUser,
  vipList,
  changeVipLevel,
  vendorList,
  addVendorBasic
} from '@/api/member'
import waves from '@/directive/waves' // waves directive
import {parseTime} from '@/utils'
import Pagination from '@/components/Pagination'
import {addEvent} from '@/api/events'

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

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        nickname: undefined,
        truename: undefined,
        phone: undefined,
        is_educator: undefined,
        is_business: undefined,
        is_vendor: undefined,
        is_other: undefined,
        is_seeking: undefined,
        sex: undefined
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
        levelId: undefined
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
      eventEndTime: undefined

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
    this.getAreas()
    this.getVipList()
    this.getUserObjList()
  },
  mounted() {

  },
  methods: {

    handleAddDeals(row) {
      this.$router.push({ path: '/deals/addDeals', query: { uid: row.user_id }})
    },
    handleAddEvents(row) {
      this.$router.push({ path: '/events/addEvents', query: { uid: row.user_id }})
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
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      vendorList(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.message.data
        this.total = response.message.total
        console.log(this.list)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
      this.$router.push({path: '/users/editVendor', query: {uid: row.user_id}})
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
    handleDelete(row, index) {
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
    handleMemberLevel(row, index) {
      // this.tempUpgrade = Object.assign({}, row) // copy obj
      this.tempUpgrade.user_id = row.user_id
      console.log(row)
      this.dialogStatus = 'Upgrade'
      this.dialogFormUpgrade = true
      this.tempUpgrade.levelId = undefined
      this.tempUpgrade.identity = undefined
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    upgradeLevel() {
      var that = this
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
            level_id: tempData.levelId
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
    handleRecover(row, index) {
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
