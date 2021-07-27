<template>
  <div class="container">
    <el-form
      :model="jobForm"
      label-width="200px"
    >
      <div class="container-item">
        <div class="title">
          Job Details
        </div>

        <el-form-item label="Job Location">
          <el-select
            v-model="jobForm.province_name"
            placeholder="Province"
            @change="chooseProvince"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.Pinyin"
              :value="{id:item.id,name:item.Pinyin}"
            />
          </el-select>

          <el-select
            v-model="jobForm.city_name"
            placeholder="City"
            @change="chooseCity"
          >
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.Pinyin"
              :value="{id:item.id,name:item.Pinyin}"
            />
          </el-select>
          <el-select
            v-model="jobForm.district_name"
            placeholder="District"
            @change="chooseDistrict"
          >
            <el-option
              v-for="item in districtList"
              :key="item.id"
              :label="item.Pinyin"
              :value="{id:item.id,name:item.Pinyin}"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Add Location Pin">
          <div class="amap-page-container">
            <!--使用element UI作为输入框-->
            <el-input
              id="tipinput"
              v-model="mapInfo.address"
              placeholder="请输入内容"
            />
            <el-amap
              vid="amapDemo"
              :center="mapInfo.lnglat"
              :amap-manager="amapManager"
              :zoom="zoom"
              :events="events"
              class="amap-demo"
              style="height: 300px"
            >
              <el-amap-marker
                ref="marker"
                vid="component-marker"
                :position="mapInfo.lnglat"
              />
            </el-amap>
            <p>标记点：{{ mapInfo.address }}，经度：{{ mapInfo.lng }}，纬度：{{ mapInfo.lat }}</p>
          </div>
        </el-form-item>

        <el-form-item
          label="Class Size"
          prop="class_size"
        >
          <el-input
            v-model="jobForm.class_size"
            type="text"
          />
        </el-form-item>

        <el-form-item
          label="Working Hours"
          prop="working_hours"
        >
          <div>
            <el-button @click="dialogWorkingHours=true">Add</el-button>
          </div>
          <div class="working-hours-item" v-for="(item,index) in workingHoursData" :key="index">
            <el-tag class="working-hours-week" v-for="(week,i) in item.week" :key="i">
              <span v-if="week==1">M</span>
              <span v-if="week==2">T</span>
              <span v-if="week==3">W</span>
              <span v-if="week==4">Th</span>
              <span v-if="week==5">F</span>
              <span v-if="week==6">Sa</span>
              <span v-if="week==7">Su</span>
            </el-tag>
            <div class="working-hours-hours">{{item.hours}}</div>
            <div class="working-hours-remove" @click="removeWorkingHours(index)">
              <el-button type="danger" size="mini">Remove</el-button>
            </div>
          </div>
          <!--          <el-time-select-->
          <!--            v-model="workingStartTime"-->
          <!--            placeholder="Start Time"-->
          <!--            :picker-options="{-->
          <!--              start: '00:00',-->
          <!--              step: '00:01',-->
          <!--              end: '24:00'-->
          <!--            }"-->
          <!--          />-->
          <!--          <el-time-select-->
          <!--            v-model="workingEndTime"-->
          <!--            placeholder="End Time"-->
          <!--            :picker-options="{-->
          <!--              start: '00:00',-->
          <!--              step: '00:01',-->
          <!--              end: '24:00',-->
          <!--              minTime: workingStartTime-->
          <!--            }"-->
          <!--          />-->
        </el-form-item>

        <el-form-item
          label="Number of Vacancies"
          prop="numbers"
        >
          <el-input
            v-model="jobForm.numbers"
            type="number"
          />
        </el-form-item>
        <el-form-item
          label="Employment Type"
          prop="employment_type"
        >
          <el-select v-model="jobForm.employment_type">
            <el-option
              v-for="(item,i) in employmentTypeOptions"
              :key="i"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Online Job"
          prop="is_online"
        >
          <el-switch
            v-model="jobForm.is_online"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </div>

      <div class="container-item">
        <div class="title">
          General Information
        </div>
        <el-form-item
          label="Job Title"
          prop="job_title"
        >
          <el-input v-model="jobForm.job_title"/>
        </el-form-item>
        <el-form-item
          label="Position Description"
          prop="desc"
        >
          <el-input
            v-model="jobForm.desc"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          label="Application Due Date"
          prop="apply_due_date"
        >
          <el-input
            v-model="jobForm.apply_due_date"
            placeholder="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          label="Start Date"
          prop="entry_date"
        >
          <el-select
            v-model="jobForm.entry_date"
            filterable
            allow-create
            default-first-option
            placeholder="Start Date"
          >
            <el-option
              v-for="item in startDateOptions"
              :key="item.id"
              :label="item.object_en"
              :value="item.object_en"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Student(s) Age">
          <el-select
            v-model="studentsAge"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Student(s) Age"
          >
            <el-option
              v-for="item in studentsAgeOptions"
              :key="item.id"
              :label="item.object_en"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Subject(s)">
          <el-select
            v-model="subject"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Subject(s)"
          >
            <el-option
              v-for="item in subjectOptions"
              :key="item.id"
              :label="item.object_en"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </div>

      <div class="container-item">
        <div class="title">
          Compensation
        </div>
        <el-form-item
          label="Min Salary"
          prop="salary_min"
        >
          <el-input
            v-model="jobForm.salary_min"
            type="number"
          />
        </el-form-item>
        <el-form-item
          label="Max Salary"
          prop="salary_max"
        >
          <el-input
            v-model="jobForm.salary_max"
            type="number"
          />
        </el-form-item>
        <el-form-item
          label="Currency"
          prop="currency"
        >
          <el-select
            v-model="jobForm.currency"
            filterable
            allow-create
            default-first-option
            placeholder="Currency"
          >
            <el-option
              v-for="item in currencyOptions"
              :key="item.id"
              :label="item.object_en"
              :value="item.object_en"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Payment Period">
          <el-select v-model="jobForm.payment_period">
            <el-option
              v-for="(item,i) in paymentPeriodOptions"
              :key="i"
              :label="item.object_en"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Benefits">
          <el-select
            v-model="benefits"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Benefits"
          >
            <el-option
              v-for="item in benefitsOptions"
              :key="item.id"
              :label="item.object_en"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </div>

      <div class="container-item">
        <div class="title">
          Applicant Requirements
        </div>
        <el-form-item
          label="Gender"
          prop="sex"
        >
          <el-select v-model="jobForm.sex">
            <el-option
              v-for="(item,i) in genderOptions"
              :key="i"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Teaching Certificate(s)">
          <el-select
            v-model="certifications"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Benefits"
          >
            <el-option
              v-for="item in certificationsOptions"
              :key="item.id"
              :label="item.object_en"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="CPR Certified"
          prop="is_cpr"
        >
          <el-switch
            v-model="jobForm.is_cpr"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item
          label="First Aid Certified"
          prop="is_first_aide"
        >
          <el-switch
            v-model="jobForm.is_first_aide"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item
          label="Teaching Experience"
          prop="teaching_times"
        >
          <el-select v-model="jobForm.teaching_times">
            <el-option
              v-for="(item,i) in teachingTimesOptions"
              :key="i"
              :label="item.object_en"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Teaching License"
          prop="is_teaching_license"
        >
          <el-switch
            v-model="jobForm.is_teaching_license"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item
          label="Native Speaker"
          prop="is_mom_language"
        >
          <el-switch
            v-model="jobForm.is_mom_language"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item
          label="Education Level"
          prop="education"
        >
          <el-select v-model="jobForm.education">
            <el-option
              v-for="(item,i) in educationOptions"
              :key="i"
              :label="item.object_en"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Languages">
          <el-select
            v-model="languages"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="languages"
          >
            <el-option
              v-for="item in languagesOptions"
              :key="item.id"
              :label="item.object_en"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Min Age"
          prop="age_min"
        >
          <el-input
            v-model="jobForm.age_min"
            type="number"
          />
        </el-form-item>
        <el-form-item
          label="Max Age"
          prop="age_max"
        >
          <el-input
            v-model="jobForm.age_max"
            label="number"
          />
        </el-form-item>
        <el-form-item
          label="Equal Opportunity"
          prop="is_equal"
        >
          <el-switch
            v-model="jobForm.is_equal"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </div>

      <div class="container-item">
        <el-form-item>
          <el-button
            :loading="updateLoadingStatus"
            type="primary"
            @click="updateJob"
          >
            Update
          </el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-dialog title="Week" :visible.sync="dialogWorkingHours">
      <el-form :model="workingHoursForm" label-position="top">
        <el-form-item label="Week">
          <el-checkbox-group v-model="checkedWeekList" @change="handleCheckedWeeksChange">
            <el-checkbox v-for="(week,index) in weekList" :label="week.value" :key="index" :value="week.value">
              {{ week.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Hours">
          <el-input v-model="workingHoursStr" autocomplete="off" placeholder="09:00-18:00"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogWorkingHours = false">Cancel</el-button>
        <el-button type="primary" @click="confirmWorkingHours()">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import {userObjectList, userInfo} from '@/api/member'
import {addJobs, addJobProfile, jobDetail, uploadExcel} from '@/api/jobs'
import nationality from '@/utils/nationality'
import {randomString} from '@/utils'
import {getAreas} from '@/api/location'

import {AMapManager} from 'vue-amap'
import {addEvent} from "@/api/events";

const amapManager = new AMapManager()

export default {
  name: 'Edit',
  components: {},
  data() {
    return {
      mapInfo: {
        // 初始值默认为天安门
        address: '北京市东城区东华门街道天安门',
        lng: 116.397451,
        lat: 39.909187,
        lnglat: [116.397451, 39.909187]
      },
      zoom: 12,
      amapManager,
      events: {
        click: (e) => {
          this.mapInfo.lng = e.lnglat.lng
          this.mapInfo.lat = e.lnglat.lat
          this.mapInfo.lnglat = [e.lnglat.lng, e.lnglat.lat]
          this.getFormattedAddress()
        }
      },
      provinceList: [],
      cityList: [],
      districtList: [],
      employmentTypeOptions: [{
        value: 1,
        label_ch: '全职',
        label: 'Full-time'
      }, {
        value: 2,
        label_ch: '兼职',
        label: 'Part-time'
      }, {
        value: 3,
        label_cn: '季节性',
        label: 'Seasonal'
      }],
      ynOptions: [
        {label: 'Yes', value: 1},
        {label: 'No', value: 0}
      ],
      genderOptions: [
        {
          value: 1,
          label: 'Male Required'
        },
        {
          value: 2,
          label: 'Female Required'
        },
        {
          value: 3,
          label: 'No Gender Requirements'
        }
      ],
      nationalityList: [],
      jobForm: {
        age: undefined,
        age_max: undefined,
        age_min: undefined,
        apply_due_date: undefined,
        business_name: undefined,
        business_id: undefined,
        currency: undefined,
        desc: undefined,
        education: undefined,
        employment_type: undefined,
        entry_date: undefined,
        interview_imgurl: undefined,
        interview_name: undefined,
        interview_nationlity: undefined,
        is_cpr: undefined,
        is_equal: undefined,
        is_first_aide: undefined,
        is_interview: undefined,
        is_mom_language: undefined,
        is_native: undefined,
        is_online: undefined,
        is_open: undefined,
        is_teaching_exp: undefined,
        is_teaching_license: undefined,
        job_due_time: undefined,
        job_location: undefined,
        province: undefined,
        province_name: undefined,
        city: undefined,
        city_name: undefined,
        district: undefined,
        district_name: undefined,
        job_title: undefined,
        nationality: undefined,
        numbers: undefined,
        payment_period: undefined,
        salary_min: undefined,
        salary_max: undefined,
        sex: undefined,
        teaching_times: undefined,
        user_id: undefined,
        job_id: undefined,
        third_com_name: undefined,
        third_com_logo: undefined,
        third_com_bg: undefined,
        version_time: undefined,
        class_size: undefined,
        working_hours: '',
        address: undefined,
        lng: undefined,
        lat: undefined
      },
      studentsAge: undefined,
      studentsAgeOptions: undefined,
      subject: undefined,
      subjectOptions: undefined,
      paymentPeriod: undefined,
      paymentPeriodOptions: undefined,
      benefits: undefined,
      benefitsOptions: undefined,
      certifications: undefined,
      certificationsOptions: undefined,
      education: undefined,
      educationOptions: undefined,
      languages: undefined,
      languagesOptions: undefined,
      teachingTimes: undefined,
      teachingTimesOptions: undefined,
      age: undefined,
      ageOptions: undefined,
      startDate: undefined,
      startDateOptions: undefined,
      currency: undefined,
      currencyOptions: undefined,
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      photoFileList: undefined,
      businessUserInfo: undefined,

      thirdLogoFileList: undefined,
      thirdHeaderPhotoFileList: undefined,
      workingStartTime: '',
      workingEndTime: '',
      updateLoadingStatus: false,
      dialogWorkingHours: false,
      workingHoursForm: {
        week: undefined,
        hours: undefined
      },
      checkAll: false,
      checkedWeekList: [],
      weekList: [
        {
          label: 'M',
          value: 1
        },
        {
          label: 'T',
          value: 2
        },
        {
          label: 'W',
          value: 3
        },
        {
          label: 'Th',
          value: 4
        },
        {
          label: 'F',
          value: 5
        }, {
          label: 'Sa',
          value: 6
        },
        {
          label: "Su",
          value: 7
        }
      ],
      isIndeterminate: true,
      workingHoursData: [],
      weekData:[],
      workingHoursStr:''
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
    const jobId = this.$route.query.id
    if (typeof jobId !== 'undefined') {
      this.getJobDetail(jobId)
      this.jobForm.job_id = parseInt(jobId)
    } else {
      this.jobForm.version_time = randomString()
    }
    const uid = this.$route.query.uid
    const businessId = this.$route.query.business_id
    const businessName = this.$route.query.business_name
    if (typeof uid !== 'undefined') {
      this.jobForm.user_id = parseInt(uid)
      this.getUserInfo(uid)
    }
    if (typeof businessId !== 'undefined') {
      this.jobForm.business_id = businessId
    }
    if (typeof businessName !== 'undefined') {
      this.jobForm.business_name = businessName
    }
    this.getAreas()
    this.getUserObjList()
    nationality.forEach(item => {
      this.nationalityList = this.nationalityList.concat(item.data)
    })
  },
  mounted() {
    this.initMapByInput()
  },
  methods: {
    handleCheckedWeeksChange(value) {
      // console.log(value);
      this.weekData = value;
    },
    removeWorkingHours(index){
      // console.log(index)
      this.workingHoursData.splice(index,1)
    },
    confirmWorkingHours(){

      let weekData = this.weekData;
      let hoursStr = this.workingHoursStr;

      let obj = {
        week:weekData,
        hours:hoursStr,
        show:false
      }

      // console.log(obj)
      this.workingHoursData.push(obj);
      this.dialogWorkingHours = false;
    },
    getFormattedAddress() {
      AMap.plugin('AMap.Geocoder', () => {
        const GeocoderOptions = {
          city: '全国'
        }
        const geocoder = new AMap.Geocoder(GeocoderOptions)
        geocoder.getAddress(this.mapInfo.lnglat, (status, result) => {
          console.log('通过经纬度拿到的地址', result)
          if (status === 'complete' && result.info === 'OK') {
            this.mapInfo.address = result.regeocode.formattedAddress
          } else {
            this.mapInfo.address = '无法获取地址'
          }
        })
      })
    },
    initMapByInput() {
      AMap.plugin('AMap.Autocomplete', () => {
        const autoOptions = {
          city: '全国',
          input: 'tipinput'
        }
        const autoComplete = new AMap.Autocomplete(autoOptions)
        AMap.event.addListener(autoComplete, 'select', (e) => {
          console.log('通过输入拿到的地址', e)
          this.mapInfo.lat = e.poi.location.lat
          this.mapInfo.lng = e.poi.location.lng
          this.mapInfo.lnglat = [e.poi.location.lng, e.poi.location.lat]
          this.getFormattedAddress()
        })
      })
    },
    getAreas() {
      const params = {}
      getAreas(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.provinceList = res.message
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    chooseProvince(e) {
      console.log(e)
      this.jobForm.province = e.id
      this.jobForm.province_name = e.name
      this.jobForm.city = undefined
      this.jobForm.city_name = undefined
      this.jobForm.district = undefined
      this.jobForm.district_name = undefined

      const params = {
        pid: e.id
      }
      getAreas(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.cityList = res.message
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    chooseCity(e) {
      this.jobForm.city = e.id
      this.jobForm.city_name = e.name
      this.jobForm.district = undefined
      this.jobForm.district_name = undefined

      const params = {
        pid: e.id
      }
      getAreas(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.districtList = res.message
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    chooseDistrict(e) {
      // console.log(e)
      this.jobForm.district = e.id
      this.jobForm.district_name = e.name
      this.$forceUpdate()
    },
    updateJob() {
      this.updateLoadingStatus = true;

      this.jobForm.job_location = this.jobForm.district_name + ', ' + this.jobForm.city_name + ', ' + this.jobForm.province_name
      this.jobForm.address = this.mapInfo.address
      this.jobForm.lat = this.mapInfo.lat
      this.jobForm.lng = this.mapInfo.lng
      this.jobForm.working_hours = JSON.stringify(this.workingHoursData);
      const data = Object.assign({}, this.jobForm)

      this.$confirm('Sure you want to perform the operation?', 'Tips', {
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {

        addJobs(data).then(res => {
          console.log(res)
          if (res.code === 200) {
            let jobId = this.$route.query.id
            if (typeof jobId === 'undefined') {
              jobId = res.data.job_id
            }
            const uid = this.jobForm.user_id
            this.studentsAgeConfirm(jobId, uid)
            this.subjectConfirm(jobId, uid)
            this.benefitsConfirm(jobId, uid)
            this.certificationConfirm(jobId, uid)
            this.languagesConfirm(jobId, uid)
            this.getJobDetail(jobId)
            this.$message.success('Success')
            this.updateLoadingStatus = false;
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })

      }).catch(() => {

        this.$message({
          type: 'info',
          message: 'Canceled Successfully'
        });
        this.updateLoadingStatus = false;
      });


    },
    studentsAgeConfirm(jobId, uid) {
      const options = this.studentsAgeOptions
      const e = this.studentsAge

      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function (item) {
          return item.id === value
        })
        if (index === -1) {
          expand.push(value)
        } else {
          object_id.push(value)
        }
      })

      const data = {
        object_id: object_id,
        object_pid: 4,
        expand: expand,
        user_id: uid,
        job_id: jobId
      }

      addJobProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          console.log('students age success')
          // this.$message.success('students age success')
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    subjectConfirm(jobId, uid) {
      const options = this.subjectOptions
      const e = this.subject

      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function (item) {
          return item.id === value
        })
        if (index === -1) {
          expand.push(value)
        } else {
          object_id.push(value)
        }
      })

      const data = {
        object_id: object_id,
        object_pid: 1,
        expand: expand,
        user_id: uid,
        job_id: jobId
      }

      addJobProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          console.log('subject success')
          // this.$message.success('subject success')
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    certificationConfirm(jobId, uid) {
      const options = this.certificationsOptions
      const e = this.certifications

      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function (item) {
          return item.id === value
        })
        if (index === -1) {
          expand.push(value)
        } else {
          object_id.push(value)
        }
      })

      const data = {
        object_id: object_id,
        object_pid: 7,
        expand: expand,
        user_id: uid,
        job_id: jobId
      }

      addJobProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          console.log('certification success')
          // this.$message.success('certification success')
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    languagesConfirm(jobId, uid) {
      const options = this.languagesOptions
      const e = this.languages

      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function (item) {
          return item.id === value
        })
        if (index === -1) {
          expand.push(value)
        } else {
          object_id.push(value)
        }
      })

      const data = {
        object_id: object_id,
        object_pid: 2,
        expand: expand,
        user_id: uid,
        job_id: jobId
      }

      addJobProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          console.log('languages success')
          // this.$message.success('languages success')
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    benefitsConfirm(jobId, uid) {
      const options = this.benefitsOptions
      const e = this.benefits

      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function (item) {
          return item.id === value
        })
        if (index === -1) {
          expand.push(value)
        } else {
          object_id.push(value)
        }
      })

      const data = {
        object_id: object_id,
        object_pid: 6,
        expand: expand,
        user_id: uid,
        job_id: jobId
      }

      addJobProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          console.log('benefits success')
          // this.$message.success('benefits success')
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getUserObjList(pid) {
      const params = {
        pid: pid
      }
      userObjectList(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.studentsAgeOptions = res.message.filter(item => item.pid === 4) // age to teach
          this.subjectOptions = res.message.filter(item => item.pid === 1)
          this.paymentPeriodOptions = res.message.filter(item => item.pid === 111)
          this.benefitsOptions = res.message.filter(item => item.pid === 6)
          this.certificationsOptions = res.message.filter(item => item.pid === 7)
          this.educationOptions = res.message.filter(item => item.pid === 125)
          this.languagesOptions = res.message.filter(item => item.pid === 2)
          this.teachingTimesOptions = res.message.filter(item => item.pid === 120)
          this.ageOptions = res.message.filter(item => item.pid === 131)
          this.startDateOptions = res.message.filter(item => item.pid === 108)
          this.currencyOptions = res.message.filter(item => item.pid === 117)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getJobDetail(jobId) {
      var self = this
      const params = {
        job_id: jobId
      }
      jobDetail(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.jobForm.job_location = res.message.job_location
          this.jobForm.numbers = res.message.numbers
          this.jobForm.employment_type = res.message.employment_type
          this.jobForm.is_online = res.message.is_online

          this.jobForm.job_title = res.message.job_title
          this.jobForm.desc = res.message.desc
          this.jobForm.apply_due_date = res.message.apply_due_date
          this.jobForm.class_size = res.message.class_size


          const workHours = res.message.working_hours
          if (workHours) {
            // this.jobForm.working_hours = JSON.parse(workHours)
            this.jobForm.working_hours = workHours
            this.workingHoursData = JSON.parse(workHours)
          }
          this.jobForm.salary_min = res.message.salary_min
          this.jobForm.salary_max = res.message.salary_max

          this.jobForm.sex = res.message.sex
          this.jobForm.is_cpr = res.message.is_cpr
          this.jobForm.is_first_aide = res.message.is_first_aide
          this.jobForm.is_teaching_license = res.message.is_teaching_license
          this.jobForm.is_native = res.message.is_native
          this.jobForm.is_mom_language = res.message.is_mom_language
          this.jobForm.is_equal = res.message.is_equal

          this.jobForm.is_interview = res.message.is_interview
          this.jobForm.interview_name = res.message.interview_name
          this.jobForm.interview_imgurl = res.message.interview_imgurl
          this.jobForm.interview_nationlity = res.message.interview_nationlity

          this.jobForm.entry_date = res.message.entry_date
          this.jobForm.payment_period = res.message.payment_period
          this.jobForm.currency = res.message.currency
          this.jobForm.teaching_times = res.message.teaching_times
          this.jobForm.education = res.message.education
          this.jobForm.age = res.message.age
          this.jobForm.business_name = res.message.business_name
          this.jobForm.business_id = res.message.business_id

          this.jobForm.age_min = res.message.age_min
          this.jobForm.age_max = res.message.age_max

          if (res.message.address) {
            self.mapInfo.address = res.message.address
          }
          if (res.message.lat) {
            self.mapInfo.lat = res.message.lat
          }
          if (res.message.lng) {
            self.mapInfo.lng = res.message.lng
          }
          if (res.message.lat && res.message.lng) {
            self.mapInfo.lnglat = [res.message.lng, res.message.lat]
          }

          if (res.message.province > 0) {
            this.jobForm.province = res.message.province
            this.jobForm.province_name = res.message.provinces.Pinyin
          }
          if (res.message.city > 0) {
            this.jobForm.city = res.message.city
            this.jobForm.city_name = res.message.citys.Pinyin
          }
          if (res.message.district > 0) {
            this.jobForm.district = res.message.district
            this.jobForm.district_name = res.message.districts.Pinyin
          }

          const ageToTeach = res.message.age_to_teach
          const ageToTeach_arr = []
          if (typeof ageToTeach !== 'undefined') {
            ageToTeach.forEach(item => {
              if (item.object_id === 0) {
                ageToTeach_arr.push(item.object_en)
              } else {
                ageToTeach_arr.push(item.object_id)
              }
            })
          }
          this.studentsAge = ageToTeach_arr

          const subject = res.message.subject
          const subject_arr = []
          if (typeof subject !== 'undefined') {
            subject.forEach(item => {
              if (item.object_id === 0) {
                subject_arr.push(item.object_en)
              } else {
                subject_arr.push(item.object_id)
              }
            })
          }
          this.subject = subject_arr

          const benefit = res.message.benefits
          const benefit_arr = []
          if (typeof benefit !== 'undefined') {
            benefit.forEach(item => {
              if (item.object_id === 0) {
                benefit_arr.push(item.object_en)
              } else {
                benefit_arr.push(item.object_id)
              }
            })
          }
          this.benefits = benefit_arr

          const certificate = res.message.Teaching_certificate
          const certificate_arr = []
          if (typeof certificate !== 'undefined') {
            certificate.forEach(item => {
              if (item.object_id === 0) {
                certificate_arr.push(item.object_en)
              } else {
                certificate_arr.push(item.object_id)
              }
            })
          }
          this.certifications = certificate_arr

          const languages = res.message.languages
          const languages_arr = []
          if (typeof languages !== 'undefined') {
            languages.forEach(item => {
              if (item.object_id === 0) {
                languages_arr.push(item.object_en)
              } else {
                languages_arr.push(item.object_id)
              }
            })
          }
          this.languages = languages_arr

          const interviewImg = res.message.interview_imgurl
          if (interviewImg !== '') {
            this.photoFileList = [{name: '', url: interviewImg}]
          } else {
            this.photoFileList = undefined
          }

          if (res.message.third_com_logo !== '') {
            this.thirdLogoFileList = [{name: '', url: res.message.third_com_logo}]
          } else {
            this.thirdLogoFileList = undefined
          }

          if (res.message.third_com_bg !== '') {
            this.thirdHeaderPhotoFileList = [{name: '', url: res.message.third_com_bg}]
          } else {
            this.thirdHeaderPhotoFileList = undefined
          }
          this.jobForm.third_com_logo = res.message.third_com_logo
          this.jobForm.third_com_bg = res.message.third_com_bg
          this.jobForm.third_com_name = res.message.third_com_name
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    photoSuccess(response) {
      if (response.code === 200) {
        this.photoFileList = [{name: '', url: response.data[0].file_url}]
        this.jobForm.interview_imgurl = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    uploadThirdLogoSuccess(response, file, fileList) {
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.thirdLogoFileList = [{name: '', url: response.data[0].file_url}]
        this.jobForm.third_com_logo = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    },
    uploadThirdHeaderPhotoSuccess(response, file, fileList) {
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.thirdHeaderPhotoFileList = [{name: '', url: response.data[0].file_url}]
        this.jobForm.third_com_bg = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    },
    getUserInfo(uid) {
      const params = {
        id: uid
      }
      userInfo(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.businessUserInfo = res.message.business_info
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    interviewChange(e) {
      // console.log(e)
      if (e == 1) {
        this.jobForm.interview_name = this.businessUserInfo.first_name + ' ' + this.businessUserInfo.last_name
        this.jobForm.interview_nationlity = this.businessUserInfo.nationality
        this.jobForm.interview_imgurl = this.businessUserInfo.profile_photo
        if (this.jobForm.interview_imgurl !== '') {
          this.photoFileList = [{name: '', url: this.jobForm.interview_imgurl}]
        } else {
          this.photoFileList = undefined
        }
      } else {
        this.jobForm.interview_name = undefined
        this.jobForm.interview_nationlity = undefined
        this.jobForm.interview_imgurl = undefined
      }
    }

  }
}
</script>

<style scoped>
.container {
  padding: 10px;
}

.container-item {
  margin-top: 10px;
  border: 1px solid #eeeeee;
  padding: 20px;
  border-radius: 20px;
}

.title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  padding: 20px;
}
.working-hours-item{
  border: 1px solid #eeeeee;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 10px;
  position: relative;
}
.working-hours-week{
  margin-left: 10px;
}
.working-hours-hours{
  margin-left: 20px;
}
.working-hours-remove{
  position: absolute;
  right: 10px;
  top: 10px;

}
</style>

