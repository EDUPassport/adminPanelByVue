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
      <el-input v-model="listQuery.phone" placeholder="Phone" style="width: 200px;" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.email" placeholder="Email" style="width: 200px;" @keyup.enter.native="handleFilter" />
      <el-input
        v-model="listQuery.job_title"
        placeholder="Job Title"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.contact_name"
        placeholder="Contact Name"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.contact_phone"
        placeholder="Contact Phone"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
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
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-if="props.row.nickname!=''" label="Nickname">
              <span>{{ props.row.nickname }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.phone!=''" label="Phone">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.job_title!=''" label="Job Title">
              <span>{{ props.row.job_title }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.business_type_name!=''" label="Business Type">
              <span>{{ props.row.business_type_name }}</span>
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
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="User Id" prop="user_id" width="100">
        <template slot-scope="{row}">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="First&Last Name" width="140">
        <template slot-scope="scope">
          {{ scope.row.first_name }} {{ scope.row.last_name }}
        </template>
      </el-table-column>
      <el-table-column label="Wechat Id" width="120">
        <template slot-scope="scope">
          {{ scope.row.wx_id }}
        </template>
      </el-table-column>
      <el-table-column label="Business Name" width="130">
        <template slot-scope="scope">
          {{ scope.row.business_name }}
        </template>
      </el-table-column>
      <el-table-column label="Business Phone" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.business_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.work_email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Level" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.level==1">Basic</span>
          <span v-if="scope.row.level==2">Pro</span>
          <span v-if="scope.row.level==3">Plus</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="280" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button type="primary" size="mini" @click="handleCreateJobs(row)">
            Jobs
          </el-button>
          <el-button size="mini" type="primary" @click="handleMemberLevel(row,$index)">Upgrade</el-button>
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
          <el-select v-model="tempUpgrade.levelId" class="filter-item" placeholder="Choose Level">
            <el-option v-for="item in levelOptions" :key="item.id" :label="item.level_en" :value="item.id" />
          </el-select>
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

  </div>
</template>

<script>

import { vipList, changeVipLevel, businessList } from '@/api/member'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'

export default {
  name: 'Index',
  components: { Pagination },
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
      userListData: [],
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
      identityOptions: [{ label: 'Educator', value: 1 }, { label: 'Business', value: 2 }, { label: 'Vendor', value: 3 }],
      levelOptions: [],
      vipList: [],
      tempUpgrade: {
        identity: undefined,
        levelId: undefined
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
    this.getVipList()
  },
  methods: {
    getList() {
      this.listLoading = true
      businessList(this.listQuery).then(response => {
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
    handleCreateJobs(row) {
      this.$router.push({ path: '/jobs/addJobs', query: { uid: row.user_id, business_id: row.id, business_name: row.business_name }})
    },
    handleUpdate(row) {
      this.$router.push({ path: '/users/editBusiness', query: { uid: row.user_id }})
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
      const that = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.tempUpgrade)
          const tempData = Object.assign({}, this.tempUpgrade)
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
        }
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
