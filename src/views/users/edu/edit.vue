<template>
  <div class="container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="ruleForm">
      <div class="business-info">
        <div class="title">Basic Info</div>
        <el-form-item label="First Name" prop="first_name">
          <el-input v-model="ruleForm.first_name" />
        </el-form-item>
        <el-form-item label="Last Name" prop="last_name">
          <el-input v-model="ruleForm.last_name" />
        </el-form-item>
        <el-form-item label="Nickname" prop="nickname">
          <el-input v-model="ruleForm.nickname" />
        </el-form-item>
        <el-form-item label="Wechat Id" prop="wx_id">
          <el-input v-model="ruleForm.wx_id" />
        </el-form-item>
        <el-form-item label="Contact No." prop="application_contact">
          <el-input v-model="ruleForm.application_contact" />
        </el-form-item>
        <el-form-item label="Gender" prop="gender">
          <el-select v-model="ruleForm.gender">
            <el-option label="Male" :value="1" />
            <el-option label="FeMale" :value="2" />
            <el-option label="Undisclosed" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="Nationality" prop="nationality">
          <el-select v-model="ruleForm.nationality">
            <el-option v-for="item in nationalityList" :key="item.code" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="Category (Multi)">
          <el-select
            v-model="eduCategory"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Please select"
            @change="eduTypeChange"
          >
            <el-option
              v-for="item in subCateData"
              :key="item.id"
              :label="item.identity_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Location">
          <el-select
            v-model="ruleForm.province"
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
            v-model="ruleForm.city"
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
            v-model="ruleForm.district"
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
        <el-form-item label="Job Seeking" prop="is_seeking">
          <el-switch
            v-model="ruleForm.is_seeking"
            :active-value="1"
            :inactive-value="0"
            @change="seekingSwitchChange"
          />
        </el-form-item>
        <el-form-item label="Public Profile" prop="is_public">
          <el-switch
            v-model="ruleForm.is_public"
            :active-value="1"
            :inactive-value="0"
            @change="publicProfileSwitchChange"
          />
        </el-form-item>

      </div>
      <div class="basic-info-container">
        <div class="title">Interest</div>
        <el-form-item label="Bio" prop="bio">
          <el-input v-model="ruleForm.bio" type="textarea" />
        </el-form-item>
        <el-form-item label="Hobbies" prop="hobbies">
          <el-input v-model="ruleForm.hobbies" />
        </el-form-item>
      </div>

      <div class="media-container">
        <div class="title">Media</div>
        <el-form-item label="Profile Photo">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="profilePhotoSuccess"
            :file-list="profilePhotoFileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Header Photo">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="headerPhotoSuccess"
            :file-list="headerPhotoFileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
          </el-upload>
        </el-form-item>

      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Update</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>

    </el-form>

    <div style="margin-top: 20px;">
      <div class="title">Certifications</div>
      <div class="select-container">
        <el-select
          v-model="certifications"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Certifications"
        >
          <el-option
            v-for="item in certificationsOptions"
            :key="item.id"
            :label="item.object_en"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="certificationConfirm">Update</el-button>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div class="title">Places Traveled</div>
      <div class="select-container">
        <el-select
          v-model="placesTraveled"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Places Traveled"
        >
          <el-option
            v-for="item in placesTraveledOptions"
            :key="item.id"
            :label="item.object_en"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="placesTraveledConfirm">Update</el-button>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div class="title">Places Lived</div>
      <div class="select-container">
        <el-select
          v-model="placesLived"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Places Lived"
        >
          <el-option
            v-for="item in placesLivedOptions"
            :key="item.id"
            :label="item.object_en"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="placesLivedConfirm">Update</el-button>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div class="title">Preferred Subject to Teach</div>
      <div class="select-container">
        <el-select
          v-model="subject"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Preferred Subject to Teach"
        >
          <el-option
            v-for="item in subjectOptions"
            :key="item.id"
            :label="item.object_en"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="subjectConfirm">Update</el-button>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div class="title">Location</div>
      <div class="select-container">
        <el-select
          v-model="preferredLocation"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="location"
        >
          <el-option
            v-for="item in preferredLocationOptions"
            :key="item.id"
            :label="item.object_en"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="preferredLocationConfirm">Update</el-button>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div class="title">Preferred Job Type</div>
      <div class="select-container">
        <el-select
          v-model="jobType"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Preferred Job Type"
        >
          <el-option
            v-for="item in jobTypeOptions"
            :key="item.id"
            :label="item.object_en"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="jobTypeConfirm">Update</el-button>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div class="title">Preferred Age To Teach</div>
      <div class="select-container">
        <el-select
          v-model="ageToTeach"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Preferred Age To Teach"
        >
          <el-option
            v-for="item in ageToTeachOptions"
            :key="item.id"
            :label="item.object_en"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="ageToTeachConfirm">Update</el-button>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div class="title">Preferred Benefits</div>
      <div class="select-container">
        <el-select
          v-model="benefits"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Preferred Benefits"
        >
          <el-option
            v-for="item in benefitsOptions"
            :key="item.id"
            :label="item.object_en"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="benefitsConfirm">Update</el-button>
      </div>
    </div>

    <div style="margin-top: 20px">
      <div class="title">Work Experience</div>
      <div class="work-exp-button">
        <el-button type="primary" @click="createWorkExp">Add+</el-button>
      </div>
      <div v-if="workExpStatus===false">
        <div v-for="(item,index) in workExpList" :key="index" class="work-exp">
          <div class="work-exp-item">Company Name(English): {{ item.company_name }}</div>
          <div class="work-exp-item">Job Title: {{ item.title }}</div>
          <div class="work-exp-item">Work Location: {{ item.location }}</div>
          <div class="work-exp-item">Responsibilities: {{ item.teaching_experience }}</div>
          <div class="work-exp-item">Teaching Experience: {{ item.teaching_times }}</div>
          <div class="work-exp-item">Work Date: {{ item.work_time_from | parseTime('{d}/{m}/{y}') }} - {{ item.work_time_to | parseTime('{d}/{m}/{y}') }}</div>
          <div class="work-exp-item">
            <el-button type="primary" @click="handleUpdateWorkExp(item)">Edit</el-button>
          </div>
        </div>
      </div>
      <div />

      <el-form v-if="workExpStatus" ref="workExpForm" class="work-exp-form" :model="workExpForm" :rules="rules" label-width="240px">
        <el-form-item label="Company Name(English)" prop="company_name" label-width="240px">
          <el-input v-model="workExpForm.company_name" />
        </el-form-item>
        <el-form-item label="Job Title" prop="title" label-width="240px">
          <el-input v-model="workExpForm.title" />
        </el-form-item>
        <el-form-item label="Work Location" prop="location">
          <el-input v-model="workExpForm.location" />
        </el-form-item>
        <el-form-item label="Responsibilities" prop="teaching_experience">
          <el-input v-model="workExpForm.teaching_experience" type="textarea" />
        </el-form-item>
        <el-form-item label="Teaching Experience" prop="teaching_times">
          <el-input v-model="workExpForm.teaching_times" type="number" />
        </el-form-item>
        <el-form-item label="Work Date">
          <el-date-picker
            v-model="workDate"
            type="daterange"
            range-separator="-"
            start-placeholder="Start Date"
            value-format="timestamp"
            format="dd/MM/yyyy"
            end-placeholder="End Date"
            @change="workDateChange"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitWorkExpForm('workExpForm')">Update</el-button>
          <el-button @click="resetForm('workExpForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="margin-top: 20px;">
      <div class="title">Education</div>
      <div class="work-exp-button">
        <el-button type="primary" @click="createEducation">Add+</el-button>
      </div>
      <div v-if="educationStatus===false">
        <div v-for="(item,index) in educationList" :key="index" class="work-exp">
          <div class="work-exp-item">School: {{ item.school_name }}</div>
          <div class="work-exp-item">Degree: {{ item.degree }}</div>
          <div class="work-exp-item">Field of Study: {{ item.field_of_study }}</div>
          <div class="work-exp-item">Duration of Study: {{ item.start_time | parseTime('{m}/{y}') }} {{ item.end_time | parseTime('{m}/{y}') }}</div>
          <div class="work-exp-item">
            <el-button type="primary" @click="handleUpdateEducation(item)">Edit</el-button>
          </div>
        </div>
      </div>

      <el-form v-if="educationStatus" ref="educationForm" class="work-exp-form" :model="educationForm" :rules="rules" label-width="240px">
        <el-form-item label="School" prop="school_name" label-width="240px">
          <el-input v-model="educationForm.school_name" />
        </el-form-item>
        <el-form-item label="Degree" prop="degree" label-width="240px">
          <el-input v-model="educationForm.degree" />
        </el-form-item>
        <el-form-item label="Field of Study" prop="field_of_study">
          <el-input v-model="educationForm.field_of_study" />
        </el-form-item>
        <el-form-item label="Duration of Study">
          <el-date-picker
            v-model="durationStudy"
            type="monthrange"
            range-separator="-"
            start-placeholder="Start Time"
            value-format="timestamp"
            format="MM/yyyy"
            end-placeholder="End Time"
            @change="durationStudyChange"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitEducationForm('educationForm')">Update</el-button>
          <el-button @click="resetForm('educationForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { addEduBasic, userInfo, userObjectList, addProfile, addUserEducation, addUserWork, subCateLists } from '@/api/member'
import { getAreas } from '@/api/location'
import nationality from '@/views/users/nationality'

export default {
  filters: {

  },
  data() {
    return {
      provinceList: [],
      cityList: [],
      districtList: [],
      nationalityList: [],
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      profilePhotoFileList: undefined,
      headerPhotoFileList: undefined,
      businessLogoFileList: undefined,
      ruleForm: {
        application_contact: undefined,
        gender: undefined,
        address: undefined,
        bio: undefined,
        city: undefined,
        country: undefined,
        province: undefined,
        district: undefined,
        email: undefined,
        first_name: undefined,
        last_name: undefined,
        nickname: undefined,
        header_photo: undefined,
        hobbies: undefined,
        nationality: undefined,
        phone: undefined,
        profile_photo: undefined,
        sub_identity: undefined,
        user_images: undefined,
        video_url: undefined,
        wx_id: undefined,
        is_seeking: undefined,
        is_public: undefined

      },
      certifications: undefined,
      certificationsOptions: undefined,
      placesTraveled: undefined,
      placesTraveledOptions: undefined,
      placesLived: undefined,
      placesLivedOptions: undefined,
      subject: undefined,
      subjectOptions: undefined,
      preferredLocation: undefined,
      preferredLocationOptions: undefined,
      jobType: undefined,
      jobTypeOptions: undefined,
      ageToTeach: undefined,
      ageToTeachOptions: undefined,
      benefits: undefined,
      benefitsOptions: undefined,

      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      workExpForm: {
        company_name: undefined,
        title: undefined,
        location: undefined,
        work_time_from: undefined,
        work_time_to: undefined,
        teaching_experience: undefined,
        teaching_times: undefined,
        work_id: undefined,
        user_id: undefined
      },
      workExpList: undefined,
      workExpStatus: false,
      workDate: undefined,
      educationForm: {
        school_name: undefined,
        degree: undefined,
        field_of_study: undefined,
        start_time: undefined,
        end_time: undefined,
        grade: undefined,
        education_id: undefined,
        user_id: undefined
      },
      educationList: undefined,
      educationStatus: false,
      durationStudy: undefined,
      subCateData: [],
      eduCategory: []

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
    const uid = this.$route.query.uid
    this.getUserObjList()
    this.getUserInfo(uid)
    this.getAreas()
    this.getSubCateLists()

    nationality.forEach(item => {
      this.nationalityList = this.nationalityList.concat(item.data)
    })
  },
  methods: {
    eduTypeChange(e) {
      this.ruleForm.sub_identity = e.join(',')
    },
    getSubCateLists() {
      const params = {
        pid: 1,
        tree: 1
      }
      subCateLists(params).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.subCateData = res.message
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    durationStudyChange(e) {
      // console.log(e)
      this.educationForm.start_time = Math.floor(e[0] / 1000)
      this.educationForm.end_time = Math.floor(e[1] / 1000)
    },
    workDateChange(e) {
      this.workExpForm.work_time_from = Math.floor(e[0] / 1000)
      this.workExpForm.work_time_to = Math.floor(e[1] / 1000)
    },
    handleUpdateEducation(item) {
      const uid = this.$route.query.uid
      this.educationForm = Object.assign({}, item)
      this.educationForm.user_id = uid
      this.educationForm.education_id = item.id
      this.educationStatus = true
    },
    createEducation() {
      const uid = this.$route.query.uid
      this.educationStatus = true
      this.educationForm = {
        school_name: undefined,
        degree: undefined,
        field_of_study: undefined,
        start_time: undefined,
        end_time: undefined,
        grade: undefined,
        education_id: undefined,
        user_id: uid
      }
    },
    handleUpdateWorkExp(item) {
      const uid = this.$route.query.uid
      this.workExpForm = Object.assign({}, item)
      this.workExpForm.user_id = uid
      this.workExpForm.work_id = item.id
      this.workExpStatus = true
    },
    createWorkExp() {
      const uid = this.$route.query.uid
      this.workExpStatus = true
      this.workExpForm = {
        company_name: undefined,
        title: undefined,
        location: undefined,
        work_time_from: undefined,
        work_time_to: undefined,
        teaching_experience: undefined,
        teaching_times: undefined,
        work_id: undefined,
        user_id: uid
      }
    },
    certificationConfirm() {
      const options = this.certificationsOptions
      const e = this.certifications
      const uid = this.$route.query.uid
      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function(item) {
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
        identity: 1
      }

      addProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$message.success('success')
          this.getUserInfo(uid)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    placesTraveledConfirm() {
      const options = this.placesTraveledOptions
      const e = this.placesTraveled
      const uid = this.$route.query.uid
      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function(item) {
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
        object_pid: 8,
        expand: expand,
        user_id: uid,
        identity: 1
      }

      addProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$message.success('success')
          this.getUserInfo(uid)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    placesLivedConfirm() {
      const options = this.placesLivedOptions
      const e = this.placesLived
      const uid = this.$route.query.uid
      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function(item) {
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
        object_pid: 9,
        expand: expand,
        user_id: uid,
        identity: 1
      }

      addProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$message.success('success')
          this.getUserInfo(uid)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    subjectConfirm() {
      const options = this.subjectOptions
      const e = this.subject
      const uid = this.$route.query.uid
      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function(item) {
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
        identity: 1
      }

      addProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$message.success('success')
          this.getUserInfo(uid)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    preferredLocationConfirm() {
      const options = this.preferredLocationOptions
      const e = this.preferredLocation
      const uid = this.$route.query.uid
      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function(item) {
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
        object_pid: 71,
        expand: expand,
        user_id: uid,
        identity: 1
      }

      addProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$message.success('success')
          this.getUserInfo(uid)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    jobTypeConfirm() {
      const options = this.jobTypeOptions
      const e = this.jobType
      const uid = this.$route.query.uid
      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function(item) {
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
        object_pid: 3,
        expand: expand,
        user_id: uid,
        identity: 1
      }

      addProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$message.success('success')
          this.getUserInfo(uid)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    ageToTeachConfirm() {
      const options = this.ageToTeachOptions
      const e = this.ageToTeach
      const uid = this.$route.query.uid
      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function(item) {
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
        identity: 1
      }

      addProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$message.success('success')
          this.getUserInfo(uid)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    benefitsConfirm() {
      const options = this.benefitsOptions
      const e = this.benefits
      const uid = this.$route.query.uid
      const expand = []
      const object_id = []
      e.forEach(value => {
        const index = options.findIndex(function(item) {
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
        identity: 1
      }

      addProfile(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$message.success('success')
          this.getUserInfo(uid)
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
          this.certificationsOptions = res.message.filter(item => item.pid === 7)
          this.placesTraveledOptions = res.message.filter(item => item.pid === 8)
          this.placesLivedOptions = res.message.filter(item => item.pid === 9)
          this.subjectOptions = res.message.filter(item => item.pid === 1)
          this.preferredLocationOptions = res.message.filter(item => item.pid === 71)
          this.jobTypeOptions = res.message.filter(item => item.pid === 3)
          this.ageToTeachOptions = res.message.filter(item => item.pid === 4)
          this.benefitsOptions = res.message.filter(item => item.pid === 6)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getUserInfo(uid) {
      const data = {
        id: uid
      }
      userInfo(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          const educatorInfo = res.message.educator_info
          console.log(educatorInfo)
          this.ruleForm = educatorInfo
          const profilePhoto = educatorInfo.profile_photo
          const headerPhoto = educatorInfo.header_photo

          if (profilePhoto !== '') {
            this.profilePhotoFileList = [{ name: '', url: profilePhoto }]
          } else {
            this.profilePhotoFileList = undefined
          }
          if (headerPhoto !== '') {
            this.headerPhotoFileList = [{ name: '', url: headerPhoto }]
          } else {
            this.headerPhotoFileList = undefined
          }
          // teaching certificate
          const teachingCertificate = educatorInfo.Teaching_certificate
          const certificate_arr = []
          if (typeof teachingCertificate !== 'undefined') {
            teachingCertificate.forEach(item => {
              if (item.object_id === 0) {
                certificate_arr.push(item.object_en)
              } else {
                certificate_arr.push(item.object_id)
              }
            })
          }
          this.certifications = certificate_arr
          // places traveled
          const placesTraveled = educatorInfo.places_traveled
          const placesTraveled_arr = []
          if (typeof placesTraveled !== 'undefined') {
            placesTraveled.forEach(item => {
              if (item.object_id === 0) {
                placesTraveled_arr.push(item.object_en)
              } else {
                placesTraveled_arr.push(item.object_id)
              }
            })
          }
          this.placesTraveled = placesTraveled_arr
          // places lived
          const placesLived = educatorInfo.places_lived
          const placesLived_arr = []
          if (typeof placesLived !== 'undefined') {
            placesLived.forEach(item => {
              if (item.object_id === 0) {
                placesLived_arr.push(item.object_en)
              } else {
                placesLived_arr.push(item.object_id)
              }
            })
          }
          this.placesLived = placesLived_arr

          // subject
          const subject = educatorInfo.subject
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

          // location
          const location = educatorInfo.Location
          const location_arr = []
          if (typeof location !== 'undefined') {
            location.forEach(item => {
              if (item.object_id === 0) {
                location_arr.push(item.object_en)
              } else {
                location_arr.push(item.object_id)
              }
            })
          }
          this.preferredLocation = location_arr

          // job type
          const jobType = educatorInfo.job_type
          const jobType_arr = []
          if (typeof jobType !== 'undefined') {
            jobType.forEach(item => {
              if (item.object_id === 0) {
                jobType_arr.push(item.object_en)
              } else {
                jobType_arr.push(item.object_id)
              }
            })
          }
          this.jobType = jobType_arr

          // age to teach
          const ageToTeach = educatorInfo.age_to_teach
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
          this.ageToTeach = ageToTeach_arr

          // benefits
          const benefits = educatorInfo.benefits
          const benefits_arr = []
          if (typeof benefits !== 'undefined') {
            benefits.forEach(item => {
              if (item.object_id === 0) {
                benefits_arr.push(item.object_en)
              } else {
                benefits_arr.push(item.object_id)
              }
            })
          }
          this.benefits = benefits_arr
          // work experience
          this.workExpList = educatorInfo.work_info
          // education
          this.educationList = educatorInfo.education_info
          // sub identity
          const identityData = educatorInfo.sub_identity_id
          if (identityData !== '') {
            // console.log(identityData.split(',').map(Number))
            this.eduCategory = identityData.split(',').map(function(params) {
              return parseInt(params, 10)
            })
            console.log(this.eduCategory)
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    seekingSwitchChange(e) {
      // console.log(e)
      this.ruleForm.is_seeking = e
    },
    publicProfileSwitchChange(e) {
      this.ruleForm.is_public = e
    },
    getAreas() {
      const params = {}
      getAreas(params).then(res => {
        // console.log(res)
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
      // console.log(e)
      this.ruleForm.province = e.name
      this.ruleForm.city = undefined
      this.ruleForm.district = undefined
      const params = {
        pid: e.id
      }
      getAreas(params).then(res => {
        // console.log(res)
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
      this.ruleForm.city = e.name
      this.ruleForm.district = undefined
      const params = {
        pid: e.id
      }
      getAreas(params).then(res => {
        // console.log(res)
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
      this.ruleForm.district = e.name
      console.log(this.ruleForm)
    },
    profilePhotoSuccess(response) {
      if (response.code === 200) {
        this.profilePhotoFileList = [{ name: '', url: response.data[0].file_url }]
        this.ruleForm.profile_photo = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    headerPhotoSuccess(response) {
      if (response.code === 200) {
        this.headerPhotoFileList = [{ name: '', url: response.data[0].file_url }]
        this.ruleForm.header_photo = response.data[0].file_url
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addEduBasic(this.ruleForm).then(res => {
            console.log(res)
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitWorkExpForm(formName) {
      const uid = this.$route.query.uid
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUserWork(this.workExpForm).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.workExpStatus = false
              this.getUserInfo(uid)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitEducationForm(formName) {
      const uid = this.$route.query.uid
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUserEducation(this.educationForm).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.educationStatus = false
              this.getUserInfo(uid)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: 20px auto;
  background-color: #ffffff;
  padding: 20px;
}

.business-info, .school-container, .basic-info-container {
  border-bottom: 2px solid #0a76a4;
  margin-bottom: 10px;
}

.title {
  line-height: 80px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.select-container {
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

/deep/ .select-container .el-select {
  width: 400px !important;
}

.work-exp {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #eeeeee;
  margin-top: 20px;
}

.work-exp-item {
  padding: 10px;
  word-break: break-all;
}

.work-exp-button {
  margin-top: 20px;
}

.work-exp-form {
  margin-top: 20px;
}

</style>
