<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.first_name"
        placeholder="First Name"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.last_name"
        placeholder="Last Name"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.nickname"
        placeholder="Nickname"
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
      <el-input
        v-model="listQuery.email"
        placeholder="Email"
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
        <template slot-scope="{row}">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-form-item
              v-if="row.educator.country != ''"
              label="Country"
            >
              {{ row.educator.country }}
            </el-form-item>
            <el-form-item
              v-if="row.educator.province != ''"
              label="Province"
            >
              {{ row.educator.province }}
            </el-form-item>
            <el-form-item
              v-if="row.educator.city != ''"
              label="City"
            >
              {{ row.educator.city }}
            </el-form-item>
            <el-form-item
              v-if="row.educator.district != ''"
              label="District"
            >
              {{ row.educator.district }}
            </el-form-item>
            <el-form-item
              v-if="row.educator.nickname != ''"
              label="Nickname"
            >
              {{ row.educator.nickname }}
            </el-form-item>
            <el-form-item
              v-if="row.educator.profile_photo != '' "
              label="Profile Photo"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="row.educator.profile_photo"
                :preview-src-list="[row.educator.profile_photo]"
              />
            </el-form-item>
            <el-form-item
              v-if="row.educator.header_photo != '' "
              label="Header Photo"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="row.educator.header_photo"
                :preview-src-list="[row.educator.header_photo]"
              />
            </el-form-item>
            <el-form-item
              v-if="row.educator.video_url != '' "
              label="Video"
            >
              <video
                width="200"
                :src="row.educator.video_url"
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
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="User Id"
        prop="user_id"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.apply_user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="First&Last Name"
        width="140"
      >
        <template slot-scope="{row}">
          {{ row.educator.first_name }} {{ row.educator.last_name }}
        </template>
      </el-table-column>
      <el-table-column
        label="Wechat Id"
        width="140"
      >
        <template slot-scope="{row}">
          {{ row.educator.wx_id }}
        </template>
      </el-table-column>
      <el-table-column
        label="Email"
        width="110"
      >
        <template slot-scope="{row}">
          {{ row.educator.email }}
        </template>
      </el-table-column>
      <el-table-column
        label="Level"
        width="110"
      >
        <template slot-scope="{row}">
          <span v-if="row.educator.level==1">Basic</span>
          <span v-if="row.educator.level==2">Pro</span>
          <span v-if="row.educator.level==3">Plus</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Phone"
        width="110"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.educator.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Nationality"
        width="110"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.educator.nationality }}
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
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item
          label="nickname"
          prop="nickname"
        >
          <el-input v-model="temp.nickname" />
        </el-form-item>
        <el-form-item
          label="truename"
          prop="truename"
        >
          <el-input v-model="temp.truename" />
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
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item
          label="email"
          prop="email"
        >
          <el-input v-model="temp.email" />
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

import {getJobResume} from '@/api/jobs';
import {editUserInfo, deleteUser, vipList, changeVipLevel, userObjectList, educatorList} from '@/api/member'
import waves from '@/directive/waves' // waves directive
import {parseTime} from '@/utils'
import Pagination from '@/components/Pagination'
import {addDeals} from '@/api/deals' // secondary package based on el-pagination
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
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 50,
        job_id:this.$route.query.job_id,
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
        username: [{required: true, message: 'username is required', trigger: 'change'}],
        birthday: [{type: 'date', required: true, message: 'birthday is required', trigger: 'change'}],
        nickname: [{required: true, message: 'nickname is required', trigger: 'blur'}]
      },
      downloadLoading: false,
      dialogUserDetailVisible: false,
      userDetailData: []

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
    this.getVipList()
    this.getUserObjList()
  },
  methods: {
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
    uploadFileSuccess(response, file, fileList) {
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
    uploadEventsFileSuccess(response, file, eventsFileList) {
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
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      getJobResume(this.listQuery).then(response => {
        console.log(response)
        this.list = response.message.data
        this.total = response.message.total
        console.log(this.list)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 500)
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
