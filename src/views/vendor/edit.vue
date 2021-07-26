<template>
  <div class="container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="ruleForm">
      <div class="business-info">
        <div class="title">Company Legal Info</div>
        <el-form-item label="Article Banner Duetime">
          <el-date-picker
            v-model="ruleForm.article_banner_duetime"
            type="datetime"
            placeholder="Please pick a date"
            @change="articleBannerDueDateChange"
          />
        </el-form-item>
        <el-form-item label="Company Name" prop="vendor_name_en">
          <el-input v-model="ruleForm.vendor_name_en" />
        </el-form-item>
        <el-form-item label="Legal Company Name" prop="legal_company_name">
          <el-input v-model="ruleForm.legal_company_name" type="textarea" />
        </el-form-item>
        <el-form-item label="Business Registration ID" prop="busin_reg_num">
          <el-input v-model="ruleForm.busin_reg_num" />
        </el-form-item>
        <el-form-item label="Business License">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="businessLicenseSuccess"
            :file-list="businessLicenseFileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
          </el-upload>
        </el-form-item>
      </div>
      <div class="company-general-info">
        <div class="title">Company General Info</div>
        <el-form-item label="Vendor Introduction" prop="vendor_bio">
          <el-input v-model="ruleForm.vendor_bio" type="textarea" />
        </el-form-item>
        <el-form-item label="WeChat Official Account ID" prop="wechat_public_name">
          <el-input v-model="ruleForm.wechat_public_name" type="text" />
        </el-form-item>
        <el-form-item label="Work Email" prop="work_email">
          <el-input v-model="ruleForm.work_email" type="text" />
        </el-form-item>
        <el-form-item label="Website" prop="website">
          <el-input v-model="ruleForm.website" />
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="ruleForm.phone" />
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
        <el-form-item label="Complete Address" prop="address">
          <el-input v-model="ruleForm.address" type="text" />
        </el-form-item>
        <el-form-item label="Dog Friendly" prop="is_dog_friendly">
          <el-switch
            v-model="ruleForm.is_dog_friendly"
            :active-value="1"
            :inactive-value="0"
            @change="dogSwitchChange"
          />
        </el-form-item>
        <el-form-item label="Do you have events？" prop="is_events">
          <el-switch
            v-model="ruleForm.is_events"
            :active-value="1"
            :inactive-value="0"
            @change="eventsSwitchChange"
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
        <el-form-item label="Preferred Language" prop="first_language">
          <el-input v-model="ruleForm.first_language" />
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
        <el-form-item label="Vendor Logo">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="vendorLogoSuccess"
            :file-list="vendorLogoFileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
          </el-upload>
        </el-form-item>

        <el-form-item label="Official Account QR Code">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="qrcodeSuccess"
            :file-list="qrcodeFileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
          </el-upload>
        </el-form-item>

        <el-form-item label="Business Category (Choose 1)">
          <el-select
            v-model="ruleForm.vendor_type_id"
            filterable
            allow-create
            default-first-option
            placeholder="Please select"
            @change="vendorTypeChange"
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

    </el-form>
  </div>
</template>

<script>
import { userInfo, addVendorBasic, subCateLists } from '@/api/member'
import { getAreas } from '@/api/location'
import nationality from '@/utils/nationality'
import { format } from 'date-fns'

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
      vendorLogoFileList: undefined,
      businessLicenseFileList: undefined,
      qrcodeFileList: undefined,

      ruleForm: {
        address: undefined,
        busin_reg_img: undefined,
        busin_reg_num: undefined,
        country: undefined,
        province: undefined,
        city: undefined,
        district: undefined,
        first_contact: undefined,
        first_language: undefined,
        header_photo: undefined,
        is_dog_friendly: undefined,
        is_events: undefined,
        job_title: undefined,
        legal_company_name: undefined,
        logo: undefined,
        nationality: undefined,
        nickname: undefined,
        phone: undefined,
        profile_photo: undefined,
        vendor_bio: undefined,
        vendor_name: undefined,
        vendor_name_en: undefined,
        video_url: undefined,
        website: undefined,
        wechat_public_name: undefined,
        wechat_public_qrcode: undefined,
        work_email: undefined,
        wx_id: undefined,
        vendor_type_id: undefined,
        vendor_type_name: undefined,
        article_banner_duetime: undefined
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      subCateData: []
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
    this.getUserInfo(uid)
    this.getAreas()

    nationality.forEach(item => {
      // console.log(item.data)
      this.nationalityList = this.nationalityList.concat(item.data)
    })
    this.getSubCateLists()
  },
  methods: {
    articleBannerDueDateChange(e) {
      console.log(format(e, 'yyyy-MM-dd HH:mm:ss'))
      this.ruleForm.article_banner_duetime = format(e, 'yyyy-MM-dd HH:mm:ss')
    },
    vendorTypeChange(e) {
      // console.log(e)
      const data = this.subCateData
      const filterData = data.filter(item => item.id === e)
      this.ruleForm.vendor_type_name = filterData[0].identity_name
    },
    getSubCateLists() {
      const params = {
        pid: 3,
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
    getUserInfo(uid) {
      const data = {
        id: uid
      }
      userInfo(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          console.log(res.message.vendor_info)
          this.ruleForm = res.message.vendor_info
          const profilePhoto = res.message.vendor_info.profile_photo
          const headerPhoto = res.message.vendor_info.header_photo
          const logo = res.message.vendor_info.logo
          const license = res.message.vendor_info.busin_reg_img
          const qrcode = res.message.vendor_info.wechat_public_qrcode

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
            this.vendorLogoFileList = [{ name: '', url: logo }]
          } else {
            this.vendorLogoFileList = undefined
          }
          if (license !== '') {
            this.businessLicenseFileList = [{ name: '', url: license }]
          } else {
            this.businessLicenseFileList = undefined
          }
          if (qrcode !== '') {
            this.qrcodeFileList = [{ name: '', url: qrcode }]
          } else {
            this.qrcodeFileList = undefined
          }
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
    dogSwitchChange(e) {
      this.ruleForm.is_dog_friendly = e
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
    profilePhotoSuccess(response) {
      if (response.code === 200) {
        this.profilePhotoFileList = [{ name: '', url: response.data[0].file_url }]
        this.ruleForm.profile_photo = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    },
    headerPhotoSuccess(response) {
      if (response.code === 200) {
        this.headerPhotoFileList = [{ name: '', url: response.data[0].file_url }]
        this.ruleForm.header_photo = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    },
    vendorLogoSuccess(response) {
      if (response.code === 200) {
        this.businessLogoFileList = [{ name: '', url: response.data[0].file_url }]
        this.ruleForm.logo = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    },
    businessLicenseSuccess(response) {
      if (response.code === 200) {
        this.businessLicenseFileList = [{ name: '', url: response.data[0].file_url }]
        this.ruleForm.busin_reg_img = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    },
    qrcodeSuccess(response) {
      if (response.code === 200) {
        this.qrcodeFileList = [{ name: '', url: response.data[0].file_url }]
        this.ruleForm.wechat_public_qrcode = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addVendorBasic(this.ruleForm).then(res => {
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

</style>
