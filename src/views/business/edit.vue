<template>
  <div class="container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="ruleForm">

      <div class="account-info-container" v-if="businessInfoData.vip_due_time">
        <div class="title">Account Info</div>
        <div class="account-item">
          <div class="account-item-label">Membership:</div>
          <div class="account-item-time">
            <span v-if="businessInfoData.level == 1">Basic</span>
            <span v-if="businessInfoData.level == 2">Pro</span>
            <span v-if="businessInfoData.level == 3">Plus</span>
            <span v-if="businessInfoData.level == 4">Lifetime</span>
          </div>
        </div>

        <div class="account-item">
          <div class="account-item-label">Expires on:</div>

          <template v-if="businessInfoData.level == 4">
            <div class="account-item-time" >
              -
            </div>
          </template>
          <template v-else>
            <div class="account-item-time">
              {{businessInfoData.vip_due_time}}
            </div>
            <div class="account-item-action">
              <el-button type="primary" @click="vipDialogVisible=true">Update</el-button>
            </div>
          </template>

        </div>
      </div>

      <div class="section-one-container">
        <div class="business-info">
          <div class="title">Business Information</div>
          <el-form-item label="Business Name" prop="business_name">
            <el-input v-model="ruleForm.business_name" />
          </el-form-item>
          <el-form-item label="Business Bio" prop="business_bio">
            <el-input v-model="ruleForm.business_bio" type="textarea" />
          </el-form-item>
          <el-form-item label="Year Founded" prop="year_founded">
            <el-input v-model="ruleForm.year_founded" />
          </el-form-item>
          <el-form-item label="Business Location">
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
          <el-form-item label="Website" prop="website">
            <el-input v-model="ruleForm.website" />
          </el-form-item>
          <el-form-item label="Business Phone" prop="business_phone">
            <el-input v-model="ruleForm.business_phone" />
          </el-form-item>
          <el-form-item label="Currently Hiring" prop="is_currently_hiring">
            <el-switch
              v-model="ruleForm.is_currently_hiring"
              :active-value="1"
              :inactive-value="0"
              @change="hiringSwitchChange"
            />
          </el-form-item>
        </div>
        <div class="school-container">
          <div class="title">About Your School</div>
          <el-form-item label="Curriculum" prop="curriculum">
            <el-input v-model="ruleForm.curriculum" type="textarea" />
          </el-form-item>
          <el-form-item label="Technology Available" prop="technology_available">
            <el-input v-model="ruleForm.technology_available" type="textarea" />
          </el-form-item>
          <el-form-item label="Average class size" prop="staff_student_ratio">
            <el-input v-model="ruleForm.staff_student_ratio" />
          </el-form-item>
          <el-form-item label="Fields Trips" prop="felds_trips">
            <el-input v-model="ruleForm.felds_trips" />
          </el-form-item>
          <el-form-item label="Is Events" prop="is_events">
            <el-switch
              v-model="ruleForm.is_events"
              :active-value="1"
              :inactive-value="0"
              @change="eventsSwitchChange"
            />
          </el-form-item>
          <el-form-item label="Special Needs" prop="is_special_needs">
            <el-switch
              v-model="ruleForm.is_special_needs"
              :active-value="1"
              :inactive-value="0"
              @change="specialNeedsSwitchChange"
            />
          </el-form-item>
        </div>
        <div class="basic-info-container">
          <div class="title">Your Basic Info</div>
          <el-form-item label="First Name" prop="first_name">
            <el-input v-model="ruleForm.first_name" />
          </el-form-item>
          <el-form-item label="Last Name" prop="last_name">
            <el-input v-model="ruleForm.last_name" />
          </el-form-item>
          <el-form-item label="Nickname" prop="nickname">
            <el-input v-model="ruleForm.nickname" />
          </el-form-item>
          <el-form-item label="Contact No." prop="contact_phone">
            <el-input v-model="ruleForm.contact_phone" />
          </el-form-item>
          <el-form-item label="Wechat Id" prop="wx_id">
            <el-input v-model="ruleForm.wx_id" />
          </el-form-item>
          <el-form-item label="Nationality" prop="nationality">
            <el-select v-model="ruleForm.nationality">
              <el-option v-for="item in nationalityList" :key="item.code" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="Job Title" prop="job_title">
            <el-input v-model="ruleForm.job_title" />
          </el-form-item>
          <el-form-item label="Work Email" prop="work_email">
            <el-input v-model="ruleForm.work_email" />
          </el-form-item>
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
              action=""
              multiple
              list-type="picture"
              :limit="1"
              :http-request="profilePhotoHttpRequest"
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
              action=""
              multiple
              list-type="picture"
              :limit="1"
              :http-request="headerPhotoHttpRequest"
              :file-list="headerPhotoFileList"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="Business Logo">
            <el-upload
              class="upload-demo"
              drag
              :headers="uploadHeaders"
              action=""
              multiple
              list-type="picture"
              :limit="1"
              :http-request="logoHttpRequest"
              :file-list="businessLogoFileList"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="Edu-Business Category (Choose 1)">
            <el-select
              v-model="ruleForm.business_type_id"
              filterable
              allow-create
              default-first-option
              placeholder="Please select"
              @change="businessTypeChange"
            >
              <el-option
                v-for="item in subCateData"
                :key="item.id"
                :label="item.identity_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">Update</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>

      </div>

    </el-form>
    <div style="margin-top: 20px;">
      <div class="title">Images (6 max)</div>
      <div class="images6max-container">
        <el-upload
          class="upload-images6max"
          drag
          :headers="uploadHeaders"
          name="file[]"
          action=""
          list-type="picture"
          :limit="6"
          :on-remove="removeImages6max"
          :http-request="accountImagesHttpRequest"
          :file-list="images6maxFileList"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
        </el-upload>

        <el-button type="primary" @click="updateImages6max()">Update</el-button>
      </div>
    </div>

    <div style="margin-top: 20px;">
      <div class="title">Our Students Age</div>
      <div class="select-container">
        <el-select
          v-model="studentsAge"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Our Students Age"
        >
          <el-option
            v-for="item in studentsAgeOptions"
            :key="item.id"
            :label="item.object_en"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="studentsAgeConfirm">Update</el-button>
      </div>
    </div>

    <div style="margin-top: 20px;">
      <div class="title">Subjects We Teach</div>
      <div class="select-container">
        <el-select
          v-model="subject"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Subjects We Teach"
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
      <div class="title">Employment Benefits</div>
      <div class="select-container">
        <el-select
          v-model="benefits"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Employment Benefits"
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

    <el-dialog
      title="Update Vip Expired Time"
      :visible.sync="vipDialogVisible"
      width="40%">
      <div>
        <el-date-picker
          v-model="vipDueTime"
          type="datetime"
          placeholder="select datetime"
          default-time="12:00:00"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="vipDueTimeChange"
        >
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="vipDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="vipConfirm()">Confirm</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import {
  userInfo,
  addBusinessBasic,
  addProfile,
  userObjectList,
  subCateLists,
  addUserImg
} from '@/api/member'
import { getAreas } from '@/api/location'
import nationality from '@/utils/nationality'
import {uploadByAliOSS, uploadByService} from '@/api/upload.js'
import ImageCompressor from 'compressorjs'


export default {
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
        first_name: undefined,
        last_name: undefined,
        address: undefined,
        bio: undefined,
        business_bio: undefined,
        business_name: undefined,
        business_phone: undefined,
        city: undefined,
        contact_name: undefined,
        contact_phone: undefined,
        country: undefined,
        curriculum: undefined,
        district: undefined,
        felds_trips: undefined,
        header_photo: undefined,
        hobbies: undefined,
        is_currently_hiring: undefined,
        is_events: undefined,
        is_school: undefined,
        is_special_needs: undefined,
        job_title: undefined,
        logo: undefined,
        nationality: undefined,
        nickname: undefined,
        profile_photo: undefined,
        province: undefined,
        staff_student_ratio: undefined,
        technology_available: undefined,
        website: undefined,
        work_email: undefined,
        wx_id: undefined,
        year_founded: undefined,
        business_type_id: undefined,
        business_type_name: undefined
      },
      studentsAge: undefined,
      studentsAgeOptions: undefined,
      subject: undefined,
      subjectOptions: undefined,
      benefits: undefined,
      benefitsOptions: undefined,
      jobType: undefined,
      jobTypeOptions: undefined,

      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      subCateData: [],
      images6maxFileList:[],
      images6maxData:[],

      businessInfoData:{},
      vipDialogVisible:false,
      vipDueTime:''

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
    nationality.forEach(item => {
      // console.log(item.data)
      this.nationalityList = this.nationalityList.concat(item.data)
    })
    this.getSubCateLists()
  },
  methods: {
    businessTypeChange(e) {
      // console.log(e)
      const data = this.subCateData
      const filterData = data.filter(item => item.id === e)
      this.ruleForm.business_type_name = filterData[0].identity_name
    },
    getSubCateLists() {
      const params = {
        pid: 2,
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
    studentsAgeConfirm() {
      const options = this.studentsAgeOptions
      const e = this.studentsAge
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
        object_pid: 73,
        expand: expand,
        user_id: uid,
        identity: 2
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
        identity: 2
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
        identity: 2
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
        identity: 2
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
          this.studentsAgeOptions = res.message.filter(item => item.pid === 73)
          this.subjectOptions = res.message.filter(item => item.pid === 1)
          this.benefitsOptions = res.message.filter(item => item.pid === 6)
          this.jobTypeOptions = res.message.filter(item => item.pid === 3)
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
          console.log(res.message.business_info)
          const businessInfo = res.message.business_info
          this.businessInfoData = res.message.business_info
          this.vipDueTime = businessInfo.vip_due_time

          this.ruleForm = res.message.business_info
          const profilePhoto = res.message.business_info.profile_photo
          const headerPhoto = res.message.business_info.header_photo
          const logo = res.message.business_info.logo

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
          if (logo !== '') {
            this.businessLogoFileList = [{ name: '', url: logo }]
          } else {
            this.businessLogoFileList = undefined
          }

          let userImages = businessInfo.user_images;
          if(userImages.length>0){
            let imagesData = [];
            let imagesArr = [];
            userImages.forEach(item=>{
              let obj = {
                name:'',
                url:item.url
              }
              imagesData.push(obj)
              imagesArr.push(item.url)
            })
            this.images6maxFileList = imagesData;
            this.images6maxData = imagesArr;
          }

          // students age
          const studentsAge = businessInfo.Student_Age
          const studentsAge_arr = []
          if (typeof studentsAge !== 'undefined') {
            studentsAge.forEach(item => {
              if (item.object_id === 0) {
                studentsAge_arr.push(item.object_en)
              } else {
                studentsAge_arr.push(item.object_id)
              }
            })
          }
          this.studentsAge = studentsAge_arr
          // subject
          const subject = businessInfo.subject
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
          // benefits
          const benefits = businessInfo.benefits
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
          // job type
          const jobType = businessInfo.job_type
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
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    eventsSwitchChange(e) {
      // console.log(e)
      this.ruleForm.is_events = e
    },
    specialNeedsSwitchChange(e) {
      this.ruleForm.is_special_needs = e
    },
    hiringSwitchChange(e) {
      this.ruleForm.is_currently_hiring = e
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
      this.ruleForm.province = e.name
      this.ruleForm.city = undefined
      this.ruleForm.district = undefined
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
      this.ruleForm.city = e.name
      this.ruleForm.district = undefined
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
      this.ruleForm.district = e.name
    },
    profilePhotoHttpRequest(options) {
      let self = this;
      this.$loading({
        text:'uploading...'
      })
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            uploadByAliOSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                self.$loading().close();
                let myFileUrl = res.data[0]['file_url'];
                let myFileName = res.data[0]['file_name']
                self.uploadLoadingStatus = false;

                self.profilePhotoFileList = [{name: myFileName, url: myFileUrl}]
                self.ruleForm.profile_photo =myFileUrl
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            uploadByService(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                let myFileName = res.message.file_name;
                self.$loading().close();
                self.uploadLoadingStatus = false;

                self.profilePhotoFileList = [{name: myFileName, url: myFileUrl}]
                self.ruleForm.profile_photo =myFileUrl
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

        },
        error(err) {
          console.log(err.message)
          self.$loading().close();
        }

      })

    },
    headerPhotoHttpRequest(options) {
      let self = this;
      this.$loading({
        text:'uploading...'
      })
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            uploadByAliOSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                self.$loading().close();
                let myFileUrl = res.data[0]['file_url'];
                let myFileName = res.data[0]['file_name']
                self.uploadLoadingStatus = false;

                self.headerPhotoFileList = [{name: myFileName, url: myFileUrl}]
                self.ruleForm.header_photo =myFileUrl
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            uploadByService(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                let myFileName = res.message.file_name;
                self.$loading().close();
                self.uploadLoadingStatus = false;

                self.headerPhotoFileList = [{name: myFileName, url: myFileUrl}]
                self.ruleForm.header_photo =myFileUrl
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

        },
        error(err) {
          console.log(err.message)
          self.$loading().close();
        }

      })

    },
    logoHttpRequest(options) {
      let self = this;
      this.$loading({
        text:'uploading...'
      })
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            uploadByAliOSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                self.$loading().close();
                let myFileUrl = res.data[0]['file_url'];
                let myFileName = res.data[0]['file_name']
                self.uploadLoadingStatus = false;

                self.businessLogoFileList = [{name: myFileName, url: myFileUrl}]
                self.ruleForm.logo = myFileUrl
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            uploadByService(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                let myFileName = res.message.file_name;
                self.$loading().close();
                self.uploadLoadingStatus = false;

                self.businessLogoFileList = [{name: myFileName, url: myFileUrl}]
                self.ruleForm.logo = myFileUrl
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

        },
        error(err) {
          console.log(err.message)
          self.$loading().close();
        }

      })

    },
    accountImagesHttpRequest(options) {
      let self = this;
      this.$loading({
        text:'uploading...'
      })
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            uploadByAliOSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                self.$loading().close();
                let myFileUrl = res.data[0]['file_url'];
                let myFileName = res.data[0]['file_name']
                self.uploadLoadingStatus = false;

                self.images6maxFileList.push({name: myFileName, url: myFileUrl})
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            uploadByService(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                let myFileName = res.message.file_name;
                self.$loading().close();
                self.uploadLoadingStatus = false;

                self.images6maxFileList.push({name: myFileName, url: myFileUrl})
              }
            }).catch(err => {
              console.log(err)
              self.$loading().close();
            })

          }

        },
        error(err) {
          console.log(err.message)
          self.$loading().close();
        }

      })

    },
    removeImages6max(file,fileList){
      console.log(file)
      // console.log(fileList)
      this.images6maxFileList = fileList
    },
    updateImages6max(){
      let self = this;
      let uid = this.$route.query.uid
      let imgFileList = this.images6maxFileList
      let img6maxData = []
      imgFileList.forEach(item=>{
        img6maxData.push(item.url)
      })

      let data = {
        user_id:this.$route.query.uid,
        identity:2,
        img:img6maxData
      }
      addUserImg(data).then(res=>{
        // console.log(res)
        if(res.code == 200){
          this.$message.success(res.msg)
          setTimeout(function() {
            // window.location.reload()
            self.getUserInfo(uid)
          }, 1000)
        }else{
          this.$message.error(res.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addBusinessBasic(this.ruleForm).then(res => {
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
    vipDueTimeChange(e){
      console.log(e)
      this.vipDueTime = e;
    },
    vipConfirm(){
      let userId = this.$route.query.uid

      let params = {
        user_id:userId,
        vip_due_time:this.vipDueTime
      }

      addBusinessBasic(params).then(res => {
        console.log(res)
        if (res.code === 200) {

          this.$message.success(res.msg)
          this.vipDialogVisible = false
          this.getUserInfo(userId)

        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
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
/deep/ .select-container .el-select{
  width: 400px !important;
}
.images6max-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.section-one-container{
  background-color: #f5f6f7;
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
}
.account-info-container{
  background-color: #f5f6f7;
  border-radius: 20px;
}
.account-item{
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.account-item-label{
  font-size: 14px;
  font-weight: bold;
}
.account-item-time{
  font-size: 14px;
  margin-left: 10px;
  color: #00b3d2;
}

.account-item-action{
  margin-left: 10px;
}
</style>
