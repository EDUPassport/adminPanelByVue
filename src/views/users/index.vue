<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.nickname"
        placeholder="Nickname"
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
      <el-select
        v-model="listQuery.is_seeking"
        placeholder="Is Seeking"
        clearable
        style="width: 110px;"
        class="filter-item"
      >
        <el-option
          v-for="(item,index) in seekingOptions"
          :key="index"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
      <el-select
        v-model="listQuery.sex"
        placeholder="Gender"
        clearable
        style="width: 110px;"
        class="filter-item"
      >
        <el-option
          v-for="(item,index) in sexOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-form-item label="Country">
              <span>{{ props.row.country }}</span>
            </el-form-item>
            <el-form-item label="Province">
              <span>{{ props.row.province }}</span>
            </el-form-item>
            <el-form-item label="City">
              <span>{{ props.row.city }}</span>
            </el-form-item>
            <el-form-item label="Language">
              <span>{{ props.row.language }}</span>
            </el-form-item>
            <el-form-item label="Birthday">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-collapse accordion>
              <el-collapse-item v-if="props.row.educator">
                <template slot="title">
                  <b style="font-size:28px;color: #99a9bf;"> Educator Info</b>
                </template>
                <div>
                  <span>First name & Last name:</span>{{
                    props.row.educator.first_name
                  }}{{ props.row.educator.last_name }}
                </div>
                <div>
                  <span>Location:</span>{{ props.row.educator.country }}, {{ props.row.educator.province }},
                  {{ props.row.educator.city }}, {{ props.row.educator.district }}, {{ props.row.educator.address }}
                </div>
                <div><span>Sub Identity Name:</span>{{ props.row.educator.sub_identity_name }}</div>
                <div><span>Bio:</span>{{ props.row.educator.bio }}</div>
                <div><span>Hobbies:</span>{{ props.row.educator.hobbies }}</div>
                <div><span>Nationality:</span>{{ props.row.educator.nationality }}</div>
                <div class="photo">
                  <span>Profile photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.educator.profile_photo"
                    :preview-src-list="[props.row.educator.profile_photo]"
                  />
                </div>
                <div class="photo">
                  <span>Header photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.educator.header_photo"
                    :preview-src-list="[props.row.educator.header_photo]"
                  />
                </div>
                <div class="video">
                  <span>Video:</span>
                  <video
                    width="120"
                    :src="props.row.educator.video_url"
                    controls
                  />
                </div>
              </el-collapse-item>
              <el-collapse-item v-if="props.row.business">
                <template slot="title">
                  <b style="font-size:28px;color: #99a9bf;"> Business Info</b>
                </template>
                <div>
                  <span>First name & Last name:</span>{{
                    props.row.business.first_name
                  }}{{ props.row.business.last_name }}
                </div>
                <div>
                  <span>Location:</span>{{ props.row.business.country }}, {{ props.row.business.province }},
                  {{ props.row.business.city }}, {{ props.row.business.district }}, {{ props.row.business.address }}
                </div>
                <div><span>Sub Identity Name:</span>{{ props.row.business.sub_identity_name }}</div>
                <div><span>Bio:</span>{{ props.row.business.bio }}</div>
                <div><span>Business Bio:</span>{{ props.row.business.business_bio }}</div>
                <div><span>Business name:</span>{{ props.row.business.business_name }}</div>
                <div><span>Business phone:</span>{{ props.row.business.business_phone }}</div>
                <div><span>Business type name:</span>{{ props.row.business.business_type_name }}</div>
                <div><span>contact name:</span>{{ props.row.business.contact_name }}</div>
                <div><span>contact phone:</span>{{ props.row.business.contact_phone }}</div>
                <div><span>Curriculum:</span>{{ props.row.business.curriculum }}</div>
                <div>
                  <span>Fields Trips:</span>
                  <span v-if="props.row.business.felds_trips==1">Yes</span>
                  <span v-if="props.row.business.felds_trips==0">Unknown</span>
                </div>
                <div>
                  <span>is_currently_hiring:</span>
                  <span v-if="props.row.business.is_currently_hiring==1">Yes</span>
                  <span v-if="props.row.business.is_currently_hiring==0">Unknown</span>
                </div>
                <div>
                  <span>Is Events: </span>
                  <span v-if="props.row.business.is_events==1">Yes</span>
                  <span v-if="props.row.business.is_events==0">Unknown</span>
                </div>
                <div>
                  <span>Special Needs: </span>
                  <span v-if="props.row.business.is_special_needs==1">Yes</span>
                  <span v-if="props.row.business.is_special_needs==0">Unknown</span>
                </div>
                <div><span>Job Title: </span>{{ props.row.business.job_title }}</div>
                <div><span>Staff student ratio:</span>{{ props.row.business.staff_student_ratio }}</div>
                <div><span>Technology Available:</span>{{ props.row.business.technology_available }}</div>
                <div><span>Website:</span>{{ props.row.business.website }}</div>
                <div><span>Work Email:</span>{{ props.row.business.work_email }}</div>
                <div><span>Year Founded:</span>{{ props.row.business.year_founded }}</div>
                <div><span>Hobbies:</span>{{ props.row.business.hobbies }}</div>
                <div><span>Nationality:</span>{{ props.row.business.nationality }}</div>
                <div>
                  <span>Profile photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.business.profile_photo"
                    :preview-src-list="[props.row.business.profile_photo]"
                  />
                </div>
                <div>
                  <span>logo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.business.logo"
                    :preview-src-list="[props.row.business.logo]"
                  />
                </div>
                <div>
                  <span>Header photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.business.header_photo"
                    :preview-src-list="[props.row.business.header_photo]"
                  />
                </div>
                <div>
                  <span>Video:</span>
                  <video
                    width="120"
                    controls
                    :src="props.row.business.video_url"
                  />
                </div>
              </el-collapse-item>
              <el-collapse-item v-if="props.row.vendor">
                <template slot="title">
                  <b style="font-size:28px;color: #99a9bf;"> Vendor Info</b>
                </template>
                <div>
                  <span>First name & Last name:</span>{{ props.row.vendor.first_name }}{{
                    props.row.vendor.last_name
                  }}
                </div>
                <div><span>Wechat Id:</span>{{ props.row.vendor.wx_id }}</div>
                <div>
                  <span>Location:</span>{{ props.row.vendor.country }}{{
                    props.row.vendor.province
                  }}{{ props.row.vendor.city }}{{ props.row.vendor.address }}
                </div>
                <div><span>Business reg img:</span>{{ props.row.vendor.busin_reg_img }}</div>
                <div><span>Business reg number:</span>{{ props.row.vendor.busin_reg_num }}</div>
                <div><span>Vendor Bio:</span>{{ props.row.vendor.vendor_bio }}</div>
                <div><span>Vendor name:</span>{{ props.row.vendor.vendor_name }}</div>
                <div><span>Vendor name en:</span>{{ props.row.vendor.vendor_name_en }}</div>
                <div><span>Vendor type name:</span>{{ props.row.vendor.vendor_type_name }}</div>

                <div>
                  <span>Is Dog Friendly:</span>
                  <span v-if="props.row.vendor.is_dog_friendly==1">Yes</span>
                  <span v-if="props.row.vendor.is_dog_friendly==0">Unknown</span>
                </div>
                <div>
                  <span>Is Events:</span>
                  <span v-if="props.row.vendor.is_events==1">Yes</span>
                  <span v-if="props.row.vendor.is_events==0">Unknown</span>
                </div>
                <div><span>Job Title:</span>{{ props.row.vendor.job_title }}</div>
                <div><span>Legal Company Name:</span>{{ props.row.vendor.legal_company_name }}</div>
                <div><span>Phone:</span>{{ props.row.vendor.phone }}</div>

                <div><span>Website:</span>{{ props.row.vendor.website }}</div>
                <div><span>Work Email:</span>{{ props.row.vendor.work_email }}</div>
                <div><span>Wechat Public Name:</span>{{ props.row.vendor.wechat_public_name }}</div>
                <div><span>Wechat Public Qrcode:</span>{{ props.row.vendor.wechat_public_qrcode }}</div>
                <div><span>Nationality:</span>{{ props.row.vendor.nationality }}</div>
                <div>
                  <span>Profile photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.vendor.profile_photo"
                    :preview-src-list="[props.row.vendor.profile_photo]"
                  />
                </div>
                <div>
                  <span>logo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.vendor.logo"
                    :preview-src-list="[props.row.vendor.logo]"
                  />
                </div>
                <div>
                  <span>Header photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.vendor.header_photo"
                    :preview-src-list="[props.row.vendor.header_photo]"
                  />
                </div>
                <div>
                  <span>Video:</span>
                  <video
                    width="120"
                    controls
                    :src="props.row.vendor.video_url"
                  />
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="User Id"
        prop="id"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Parent Id"
        prop="pid"
        align="center"
        width="120"
      >
        <template slot-scope="{row}">
          <span>{{ row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Username"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.username }}
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
        label="Is Seeking"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.is_seeking===0">Unknown</span>
          <span v-if="scope.row.is_seeking===1">Yes</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Gender"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
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
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.identity ===0"
            effect="dark"
            color="#005956"
          >
            Other
          </el-tag>
          <el-tag
            v-if="scope.row.identity ===1"
            effect="dark"
            color="#0aa0a8"
          >
            Educator
          </el-tag>
          <el-tag
            v-if="scope.row.identity ===2"
            effect="dark"
            color="#b1c452"
          >
            Business
          </el-tag>
          <el-tag
            v-if="scope.row.identity ===3"
            effect="dark"
            color="#00b3d2"
          >
            Vendor
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="Actions"
        align="center"
        width="680"
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
          <!--          <el-input v-model="temp.birthday" />-->
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
        <el-form-item label="Duration" prop="month_num">
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
      <!--      :rules="rules"-->
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

  </div>
</template>

<script>

import {userList, editUserInfo, deleteUser, vipList, changeVipLevel, userObjectList,assignAccount,changeBindPhone,unbindAccount} from '@/api/member'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'

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
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
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

      seekingOptions: [{label: 'no', value: 0}, {label: 'Yes', value: 1}],
      sexOptions: [{label: 'unco', value: 0}, {label: 'Male', value: 1}, {label: 'Female', value: 2}],
      identityOptions: [{label: 'Educator', value: 1}, {label: 'Business', value: 2}, {label: 'Vendor', value: 3}],
      levelOptions: [],
      vipList: [],

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
      rules: {
        username: [{required: true, message: 'username is required', trigger: 'change'}],
        birthday: [{type: 'date', required: true, message: 'birthday is required', trigger: 'change'}],
        nickname: [{required: true, message: 'nickname is required', trigger: 'blur'}]
      },
      downloadLoading: false,
      dialogUserDetailVisible: false,
      userDetailData: [],

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
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      userList(this.listQuery).then(response => {
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
    handleAddCustomUser() {

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
