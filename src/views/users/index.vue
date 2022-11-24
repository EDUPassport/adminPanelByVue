<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
        placeholder="ID"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.first_name"
        placeholder="First name"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.last_name"
        placeholder="Last name"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.phone"
        placeholder="Phone #"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.email"
        placeholder="Email address"
        style="width: 200px;"
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

    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      size="mini"
      highlight-current-row
      style="width: 100%;"
      height="500px"
    >
      <el-table-column type="expand">
        <template v-slot="props">
          {{props.row.identity_string}}
        </template>
      </el-table-column>
      <el-table-column
        label="User Id"
        prop="id"
        align="center"
        width="80"
      >
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Parent Id"
        prop="pid"
        align="center"
        width="120"
      >
        <template v-slot="{row}">
          <span>{{ row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Source"
        width="180"
      >
        <template v-slot="scope">
          {{ scope.row.source }}
        </template>
      </el-table-column>

      <el-table-column
        label="Create Time"
        width="180"
      >
        <template v-slot="scope">
          {{ scope.row.c_time }}
        </template>
      </el-table-column>

      <el-table-column
        label="Email"
        width="180"
      >
        <template v-slot="scope">
          {{ scope.row.email }}
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
        label="Gender"
        width="110"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="scope.row.sex === 1">Male</span>
          <span v-if="scope.row.sex === 2">Female</span>
          <span v-if="scope.row.sex === 0">Unc</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Identity"
        width="110"
        align="center"
      >
        <template v-slot="scope">
          <el-button type="primary" @click="showAllIdentity(scope.row)">
            Show
          </el-button>
        </template>

      </el-table-column>

      <el-table-column
        label="Actions"
        align="center"
        width="680"
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
            type="danger"
            @click="handleDelete(row,$index)"
          >
            Delete
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleMemberLevel(row,$index)"
          >
            Upgrade
          </el-button>
          <el-button
            v-if="row.pid==0"
            size="mini"
            type="primary"
            @click="handleSubAccount(row)"
          >
            Sub Account
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleUserPhone(row)"
          >
            Update User Phone
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleUnBindAccount(row)"
          >
            Unbind Account
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
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          label="First name"
          prop="first_name"
        >
          <el-input v-model="temp.first_name"/>
        </el-form-item>
        <el-form-item
          label="Last name"
          prop="last_name"
        >
          <el-input v-model="temp.last_name"/>
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
          @click="updateData()"
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormUpgrade = false">Cancel</el-button>
        <el-button type="primary" @click="upgradeLevel()">Confirm</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Sub Account" :visible.sync="subAccountDialogVisible">

      <el-form ref="dataForm" :model="subAccountForm" label-position="left" label-width="90px"
               style="width: 400px; margin-left:50px;">

        <el-form-item label="Phone" prop="phone">
          <el-input type="number" v-model="subAccountForm.phone" ></el-input>
        </el-form-item>
        <el-form-item label="Username" prop="username">
          <el-input type="text" v-model="subAccountForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="text" v-model="subAccountForm.password"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subAccountDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addSubAccount()">Confirm</el-button>
      </div>

    </el-dialog>

    <el-dialog title="Change Bind Phone" :visible.sync="changeBindPhoneDialogVisible">
      <!--      :rules="rules"-->
      <el-form ref="dataForm" :model="changeBindPhoneForm" label-position="left" label-width="90px"
               style="width: 400px; margin-left:50px;">

        <el-form-item label="Phone" prop="phone">
          <el-input type="number" v-model="changeBindPhoneForm.phone" ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeBindPhoneDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateBindPhone()">Confirm</el-button>
      </div>

    </el-dialog>

    <el-dialog
      title="Create Account"
      :visible.sync="userAccountDialogFormVisible"
    >
      <el-form
        ref="userAccountForm"
        :rules="userAccountRules"
        :model="userAccountForm"
        label-position="left"
        label-width="160px"
      >
        <el-form-item
          label="Email"
          prop="email"
        >
          <el-input v-model="userAccountForm.email"/>
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password"
        >
          <el-input v-model="userAccountForm.password"/>
        </el-form-item>
        <el-form-item
          label="Confirm Password"
          prop="c_password"
        >
          <el-input v-model="userAccountForm.c_password"/>
        </el-form-item>
        <el-form-item
          label="Phone"
          prop="phone"
        >
          <el-input v-model="userAccountForm.phone"/>
        </el-form-item>

        <el-form-item
          label="First Name"
          prop="first_name"
        >
          <el-input v-model="userAccountForm.first_name"/>
        </el-form-item>
        <el-form-item
          label="Last Name"
          prop="last_name"
        >
          <el-input v-model="userAccountForm.last_name"/>
        </el-form-item>
        <el-form-item
          label="Company Name"
          prop="company_name"
        >
          <el-input v-model="userAccountForm.company_name"/>
        </el-form-item>

        <el-form-item
          label="Identity"
          prop="identity"
        >
          <el-select
            v-model="userAccountForm.identity"
            class="filter-item"
            placeholder="Please select identity"
          >
            <el-option
              v-for="item in identityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="userAccountDialogFormVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="addUserAccountByAdmin()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="All Identity"
      :visible.sync="allIdentityVisible"
    >
      <div class="all-identity-container">
         <div class="all-identity-items-bg">
           <div class="all-identity-items-label">Educator</div>
           <div class="all-identity-items">
             <div class="all-identity-item" v-for="(item,i) in allIdentityDataForEducator" :key="i"
                  @click="turnProfileList(item,1)"
             >
               <div class="all-identity-item-text">User id: <span>{{item.user_id}}</span></div>
               <div class="all-identity-item-text">Name: <span>{{item.name}}</span></div>
             </div>
           </div>
         </div>
        <div class="all-identity-items-bg">
          <div class="all-identity-items-label">Recruiter</div>
          <div class="all-identity-items">
            <div class="all-identity-item" v-for="(item,i) in allIdentityDataForRecruiter" :key="i"
                 @click="turnProfileList(item,2)"
            >
              <div class="all-identity-item-text">User id: {{item.user_id}}</div>
              <div class="all-identity-item-text">Display name: <span>{{item.display_name}}</span></div>
              <div class="all-identity-item-text">Company name: <span>{{item.company_name}}</span> </div>
            </div>
          </div>
        </div>
        <div class="all-identity-items-bg">
          <div class="all-identity-items-label">School</div>
          <div class="all-identity-items">
            <div class="all-identity-item" v-for="(item,i) in allIdentityDataForSchool" :key="i"
                 @click="turnProfileList(item,3)"
            >
              <div class="all-identity-item-text">User id: {{item.user_id}}</div>
              <div class="all-identity-item-text">Display name: <span>{{item.display_name}}</span></div>
              <div class="all-identity-item-text">Company name: <span>{{item.company_name}}</span> </div>
            </div>
          </div>
        </div>
        <div class="all-identity-items-bg">
          <div class="all-identity-items-label">Other</div>
          <div class="all-identity-items">
            <div class="all-identity-item" v-for="(item,i) in allIdentityDataForOther" :key="i"
                 @click="turnProfileList(item,4)"
            >
              <div class="all-identity-item-text">User id: {{item.user_id}}</div>
              <div class="all-identity-item-text">Display name: <span>{{item.display_name}}</span></div>
              <div class="all-identity-item-text">Company name: <span>{{item.company_name}}</span> </div>
            </div>
          </div>
        </div>
        <div class="all-identity-items-bg">
          <div class="all-identity-items-label">Vendor</div>
          <div class="all-identity-items">
            <div class="all-identity-item" v-for="(item,i) in allIdentityDataForVendor" :key="i"
                 @click="turnProfileList(item,5)"
            >
              <div class="all-identity-item-text">User id: {{item.user_id}}</div>
              <div class="all-identity-item-text">Display name: <span>{{item.display_name}}</span></div>
              <div class="all-identity-item-text">Company name: <span>{{item.company_name}}</span> </div>
            </div>
          </div>
        </div>
      </div>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="userAccountDialogFormVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="addUserAccountByAdmin()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>

import {
  userContactList, editUserInfo, deleteUser, vipList, changeVipLevel,
  userObjectList, assignAccount, changeBindPhone, unbindAccount
} from '@/api/member'
import {createUserAccount, loginToUser} from '@/api/admin'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import {encode} from 'js-base64'
import {USER_ALL_IDENTITY} from "@/api/api";

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
      allIdentityVisible:false,
      allIdentityDataForEducator:[],
      allIdentityDataForRecruiter:[],
      allIdentityDataForSchool:[],
      allIdentityDataForOther:[],
      allIdentityDataForVendor:[],

      userAccountDialogFormVisible:false,
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,

      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        id: undefined,
        first_name: undefined,
        last_name: undefined,
        phone: undefined,
        email: undefined
      },

      seekingOptions: [{label: 'no', value: 0}, {label: 'Yes', value: 1}],
      sexOptions: [{label: 'unco', value: 0}, {label: 'Male', value: 1}, {label: 'Female', value: 2}],
      identityOptions: [{label: 'Educator', value: 1}, {label: 'Business', value: 2}, {label: 'Vendor', value: 3}],
      levelOptions: [],
      vipList: [],

      temp: {
        user_id: undefined,
        first_name: undefined,
        last_name: undefined,
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
      rules: {
        username: [{required: false, message: 'username is required', trigger: 'change'}],
        birthday: [{type: 'date', required: true, message: 'birthday is required', trigger: 'change'}],
        nickname: [{required: false, message: 'nickname is required', trigger: 'blur'}]
      },
      downloadLoading: false,
      dialogUserDetailVisible: false,
      userDetailData: [],

      userAccountForm:{
        email:undefined,
        password:undefined,
        c_password:undefined,
        phone:undefined,
        code:undefined,
        first_name:undefined,
        last_name:undefined,
        company_name:undefined,
        identity:undefined
      },
      userAccountRules: {
        email: [{required: true, message: 'Email is required', trigger: 'change'}],
        first_name: [{required: true, message: 'First Name is required', trigger: 'change'}],
        last_name: [{ required: true, message: 'Last Name is required', trigger: 'change'}],
        company_name: [{required: true, message: 'Company Name is required', trigger: 'blur'}],
        password: [{required: true, message: 'Password Name is required', trigger: 'blur'}],
        c_password: [{required: true, message: 'Confirm Password Name is required', trigger: 'blur'}],
        identity: [{required: true, message: 'Identity is required', trigger: 'blur'}]
      },
      subAccountDialogVisible: false,
      subAccountForm: {
        pid: undefined,
        phone: undefined,
        username: undefined,
        password: undefined
      },
      changeBindPhoneDialogVisible:false,
      changeBindPhoneForm:{
        user_id:undefined,
        phone:undefined
      },
      showMonthNumStatus:true,


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
    this.getVipList()

  },
  methods: {
    turnProfileList(item,type){
      if(type == 1){
        this.$router.push({path:'/educator/list',query:{uid:item.user_id}})
      }

      if(type == 2){
        this.$router.push({path:'/business/recruiter',query:{uid:item.user_id,cid:item.id}})
      }

      if(type == 3){
        this.$router.push({path:'/business/school',query:{uid:item.user_id,cid:item.id}})
      }
      if(type == 4){
        this.$router.push({path:'/business/other',query:{uid:item.user_id,cid:item.id}})
      }
      if(type == 5){
        this.$router.push({path:'/vendor/vendor',query:{uid:item.user_id, cid:item.id}})
      }

    },
    showAllIdentity(row){
      let params = {
        user_id: row.id
      }

      USER_ALL_IDENTITY(params).then(res=>{
        if(res.code == 200){
          let userContact = res.message.user_contact;
          if(userContact.educarot_contact){
            this.allIdentityDataForEducator = userContact.educarot_contact
          }
          if(userContact.recruiting_company){
            this.allIdentityDataForRecruiter = userContact.recruiting_company
          }

          if(userContact.school_company){
            this.allIdentityDataForSchool = userContact.school_company
          }
          if(userContact.other_company){
            this.allIdentityDataForOther = userContact.other_company
          }
          if(userContact.vendor_company){
            this.allIdentityDataForVendor = userContact.vendor_company
          }

          this.allIdentityVisible = true;
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    showUserAccountModal(){
      this.userAccountDialogFormVisible = true;
    },
    addUserAccountByAdmin(){

      this.$refs['userAccountForm'].validate((valid) => {
        if (valid) {
          // console.log(this.temp)
          let params = Object.assign({},this.userAccountForm)
          createUserAccount(params).then(res=>{
            // console.log(res)
            if(res.code == 200){
              this.userAccountDialogFormVisible = false
              this.getList()
            }
          }).catch(err=>{
            console.log(err)
          })

        }
      })
    },
    handleUserPhone(row){
        this.changeBindPhoneDialogVisible = true;
        this.changeBindPhoneForm.user_id = row.id;
    },
    updateBindPhone(){
      let data = Object.assign({},this.changeBindPhoneForm);
      changeBindPhone(data).then(res=>{
        if(res.code==200){
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }
        this.changeBindPhoneDialogVisible = false;
        this.getList();
      }).catch(err=>{
        console.log(err)
      })
    },
    handleUnBindAccount(row){
       let data = {
         user_id:row.id
       }
      unbindAccount(data).then(res=>{
        if(res.code==200){
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }
        this.getList();
      }).catch(err=>{
        console.log(err)
      })
    },
    handleSubAccount(row) {
      this.subAccountForm.pid = row.id;
      this.subAccountDialogVisible = true;
    },
    addSubAccount(){
      let data = Object.assign({},this.subAccountForm)
      assignAccount(data).then(res=>{
        if(res.code==200){
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }
        this.subAccountDialogVisible = false;
      }).catch(err=>{
        console.log(err)
      })
    },
    getUserObjList() {
      userObjectList({pid: 71}).then(res => {
        console.log(res)
        this.popuCityList = res.message
      })
    },
    paginationEvent(e){
      this.$router.push({path:'/users/index',query:{page:e.page, limit:e.limit}})
      this.getList()
    },
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      userContactList(this.listQuery).then(res => {

        if(res.code == 200){
          this.list = res.message.data
          this.total = res.message.total
          this.listLoading = false
        }

      }).catch(err=>{
        console.log(err)
        this.listLoading = false;
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
      // console.log(this.levelOptions)
    },
    getVipList() {
      vipList().then(response => {
        // console.log(response)
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.user_id = row.id
      // console.log(this.temp.birthday)
      if (this.temp.birthday == '0000-00-00') {
        this.temp.birthday = new Date()
      } else {
        this.temp.birthday = new Date(this.temp.birthday)
      }
      // console.log(this.temp.birthday)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
        user_id: row.id
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
      this.tempUpgrade.user_id = row.id
      // console.log(row)
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
            month_num:tempData.month_num
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
    handleAddCustomUser() {

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
        user_id:row.id
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

.xll-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.xll-item{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  background-color: #eeeeee;
  //padding: 10px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
}

.xll-item-l{
  background-color: #f0dacf;
  padding: 10px;
}

.xll-item-r{
  background-color: #00b3d2;
  color: #FFFFFF;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
}

.image-container{
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.all-identity-container{
  padding: 10px;

}

.all-identity-items-bg{
  margin-bottom: 15px;
  background-color: #F0F2F5;
  border-radius: 8px;
  padding: 10px;
}

.all-identity-items-label{
  font-size: 18px;
  font-weight: bold;
}
.all-identity-items{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.all-identity-item{
  background-color: #ffffff;
  margin: 5px;
  color: #808080;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.all-identity-item:hover{
  background-color: #808080;
  color: #F0F2F5;
}
.all-identity-item:hover span{
  background-color: #808080;
  color: #F0F2F5;
}

.all-identity-item-text{
  /*color: #808080;*/
}

.all-identity-item span{
  color: #262626;
}

</style>
