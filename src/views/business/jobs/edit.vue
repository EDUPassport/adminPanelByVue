<template>
  <div class="bg">
    <div class="post-container">

      <div class="post-r-container">
        <div class="post-r-container-bg">

          <div class="account-profile-t">

            <div class="account-profile-t-l">New job post</div>
            <div class="account-profile-t-r">

              <!--              <el-button class="account-profile-draft-btn" plain round>-->
              <!--                SAVE AS DRAFT-->
              <!--              </el-button>-->
              <el-button class="account-profile-save-btn" type="primary" round
                         :loading="submitLoadingValue"
                         @click="submitJob('jobForms',3)">
                SUBMIT
              </el-button>
            </div>

          </div>

          <div class="job-form-container">
            <el-form
              ref="jobForms"
              :model="jobForm"
              :rules="jobRules"
              label-width="120px"
              label-position="top"
              class="demo-ruleForm"
            >

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  1. <span v-if="identity==2">Recruiter</span><span v-if="identity==3">School</span><span v-if="identity==4">Other</span> information
                </div>
                <div class="account-profile-item-c">
                  <el-row :gutter="50">
                    <el-col :span="6">

                      <template v-if="identity == 2">
                        <el-form-item label="Recruiter name" >
                          <div class="job-company-name">{{jobForm.company_name}}</div>
                        </el-form-item>
                      </template>
                      <template v-if="identity == 3">
                        <el-form-item label="School name" >
                          <div class="job-company-name">{{jobForm.company_name}}</div>
                        </el-form-item>
                      </template>
                      <template v-if="identity == 4">
                        <el-form-item label="Other name" >
                          <div class="job-company-name">{{jobForm.company_name}}</div>
                        </el-form-item>
                      </template>

                    </el-col>

                    <el-col :span="6">
                      <el-form-item  label="Job Location">

                        <div class="job-current-location" v-if="jobForm.job_location">
                          {{jobForm.job_location}}
                        </div>

                        <div class="job-location-container">

                          <div class="job-location-tabs">
                            <div class="job-location-tab-l"
                                 :class="jobFromChina ? 'job-location-tab-active' : ''"
                                 @click="handleJobFromChina()">
                              China
                            </div>
                            <div class="job-location-tab-r"
                                 :class="jobFromInternational ? 'job-location-tab-active' : '' "
                                 @click="handleJobFromInternational()">
                              International
                            </div>
                          </div>

                          <div class="job-location-content" v-if="jobFromChina">

                            <template v-if="envName==='developmentCN' || envName==='productionCN' ">
                              <el-select v-model="countryObj"
                                         class="job-location-select"
                                         @change="countryChange"
                                         value-key="id"
                                         filterable
                                         placeholder="Select Country">
                                <el-option v-for="(item,i) in countryOptions" :key="i" :label="item.name"
                                           :value="item"></el-option>
                              </el-select>

                              <template v-if="provinceOptions.length>0">
                                <el-select v-model="provinceObj"
                                           class="job-location-select"
                                           value-key="id"
                                           filterable
                                           @change="provinceChange"
                                           placeholder="Select Province">
                                  <el-option v-for="(item,i) in provinceOptions" :key="i" :label="item.name"
                                             :value="item"></el-option>
                                </el-select>
                              </template>
                              <template v-if="cityOptions.length>0">
                                <el-select v-model="cityObj"
                                           class="job-location-select"
                                           value-key="id"
                                           filterable
                                           @change="cityChange"
                                           placeholder="Select City">
                                  <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.name"
                                             :value="item"></el-option>
                                </el-select>
                              </template>
                            </template>
                            <template v-if="envName==='development' || envName==='production' ">
                              <h5>
                                Oops.. sorry, due to data laws, to post a job on the
                                Chinese
                                platform, you first need
                                to redirect to and post a job there
                              </h5>
                              <div class="job-detail-china-btn-container">
                                <el-button round type="primary" @click="letGo()">
                                  OK, let's go
                                </el-button>
                              </div>
                              <div class="job-detail-china-tips">
                                Not clear? Need help setting up?
                              </div>
                              <div class="job-detail-china-tips-2">
                                <el-link
                                  href="https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4">
                                  Account Management
                                </el-link>
                                is here !
                              </div>
                            </template>

                          </div>

                          <div class="job-location-content" v-if="jobFromInternational">

                            <el-select v-model="countryObj"
                                       class="job-location-select"
                                       @change="countryChange"
                                       value-key="id"
                                       filterable
                                       placeholder="Select Country">
                              <el-option v-for="(item,i) in countryOptions" :key="i" :label="item.name"
                                         :value="item"></el-option>
                            </el-select>

                            <template v-if="provinceOptions.length>0">
                              <el-select v-model="provinceObj"
                                         class="job-location-select"
                                         value-key="id"
                                         filterable
                                         @change="provinceChange"
                                         placeholder="Select Province">
                                <el-option v-for="(item,i) in provinceOptions" :key="i" :label="item.name"
                                           :value="item"></el-option>
                              </el-select>
                            </template>
                            <template v-if="cityOptions.length>0">
                              <el-select v-model="cityObj"
                                         class="job-location-select"
                                         value-key="id"
                                         filterable
                                         @change="cityChange"
                                         placeholder="Select City">
                                <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.name"
                                           :value="item"></el-option>
                              </el-select>
                            </template>
                          </div>


                        </div>

                      </el-form-item>

                    </el-col>
                    <el-col :span="12">
                      <el-form-item  label="Add Location Pin">
                        <div class="map-container">
                          <div id="mapContainer" class="basemap"></div>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </div>
              </div>


              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  2.Job details
                </div>
                <div class="account-profile-item-c">

                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="Job Title" required prop="job_title">

                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text" v-model="jobForm.job_title"
                                      placeholder="Your job title"></el-input>
                          </div>
                        </div>

                        <div class="object-tags-container">
                          <div class="object-tags">
                            <div class="object-tags-item"
                                 :class="item.object_en == jobForm.job_title ? 'tags-active' : '' "
                                 v-for="(item,index) in jobTitleList" :key="index"
                                 @click="selectJobTitle(item)">
                              {{ item.object_en }}
                            </div>
                          </div>
                        </div>

                      </el-form-item>

                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Start Date">

                        <div class="object-tags-add">
                          <div class="object-tags-item-add" >
                            <el-input type="text" v-model="jobForm.entry_date"
                                      placeholder="Specific date, if applicable"></el-input>
                          </div>
                        </div>

                        <div class="object-tags-container">
                          <div class="object-tags">
                            <div class="object-tags-item"
                                 :class=" item.object_en == jobForm.entry_date ? 'tags-active' : '' "
                                 v-for="(item,index) in startDateList" :key="index"
                                 @click="selectStartDate(item)">
                              {{ item.object_en }}
                            </div>
                          </div>
                        </div>
                      </el-form-item>

                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Application Deadline">
                        <el-date-picker
                          v-model="jobForm.apply_due_date"
                          type="date"
                          placeholder="Select date, if applicable"
                          format="yyyy-MM-DD"
                          value-format="yyyy-MM-DD"
                        >
                        </el-date-picker>
                      </el-form-item>

                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Employment Type">

                        <el-select
                          v-model="selectEmploymentTypeList"
                          multiple
                          collapse-tags
                          collapse-tags-tooltip
                          filterable
                          allow-create
                          placeholder="Select employment type"
                          value-key="id"
                        >
                          <el-option
                            v-for="(item,i) in employmentTypeList"
                            :key="i"
                            :label="item.object_en"
                            :value="item"
                          />
                        </el-select>

                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="50">
                    <el-col :span="24">
                      <el-form-item label="Job description">
                        <!--                        <el-input v-model="jobForm.desc" type="textarea"-->
                        <!--                                  :rows="4"-->
                        <!--                                  placeholder="Be as detailed as possible about responsibilities."></el-input>-->

                        <Tinymce v-model="jobForm.desc" width="100%" :height="300"></Tinymce>

                      </el-form-item>

                    </el-col>
                  </el-row>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  3. Compensation
                </div>
                <div class="account-profile-item-c">

                  <el-row :gutter="50">
                    <el-col :span="12">
                      <el-form-item label="Salary" >

                        <div class="xll-salary-container">
                          <el-select
                            v-model="jobForm.currency"
                            class="xll-currency-select"
                            value-key="object_en"
                            placeholder="Select" >
                            <el-option
                              v-for="(item,index) in currencyList"
                              :key="index"
                              :label="item.object_en"
                              :value="item.object_en"
                            >
                            </el-option>
                          </el-select>
                          <el-input class="xll-min-salary" v-model="jobForm.salary_min" placeholder="min"></el-input>
                          <div class="xll-salary-line">-</div>
                          <el-input class="xll-max-salary" v-model="jobForm.salary_max" placeholder="max"></el-input>
                          <el-select class="xll-payment-select"
                                     v-model="jobForm.payment_period"
                                     filterable
                                     value-key="id"
                                     placeholder="Choose Payment Period">
                            <el-option v-for="(item,i) in paymentPeriodList"
                                       :key="i"
                                       :label="item.object_en"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </div>

                      </el-form-item>

                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Benefits">

                        <el-select
                          v-model="selectBenefitsList"
                          multiple
                          collapse-tags
                          collapse-tags-tooltip
                          placeholder="Select benefits"
                          filterable
                          allow-create
                          value-key="id"
                        >
                          <el-option
                            v-for="(item,index) in benefitsList"
                            :key="index"
                            :label="item.object_en"
                            :value="item"
                          />

                        </el-select>

                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="Number of Vacancies">
                        <el-input v-model="jobForm.numbers" type="number" placeholder="Number of Vacancies"></el-input>
                      </el-form-item>
                    </el-col>

                  </el-row>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  4. Class details
                </div>
                <div class="account-profile-item-c">

                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="Subjects">

                        <el-select
                          v-model="selectSubjectList"
                          multiple
                          collapse-tags
                          collapse-tags-tooltip
                          placeholder="Select subjects"
                          filterable
                          allow-create
                          value-key="id"
                        >
                          <el-option
                            v-for="(item,index) in subjectList"
                            :key="index"
                            :label="item.object_en"
                            :value="item"
                          />

                        </el-select>

                      </el-form-item>

                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Class Size">
                        <el-input v-model="jobForm.class_size" placeholder="Number of students per class"></el-input>
                      </el-form-item>

                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Student Ages">

                        <el-select
                          v-model="selectAgeToTeachList"
                          multiple
                          collapse-tags
                          collapse-tags-tooltip
                          placeholder="Select student ages"
                          filterable
                          allow-create
                          value-key="id"
                        >
                          <el-option
                            v-for="(item,index) in ageToTeachList"
                            :key="index"
                            :label="item.object_en"
                            :value="item"
                          />

                        </el-select>

                      </el-form-item>

                    </el-col>

                  </el-row>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  5. Requirements
                </div>
                <div class="account-profile-item-c">

                  <el-row :gutter="50">

                    <el-col :span="6">

                      <div class="nationality-container">
                        <div>
                          <el-form-item label="Preferred nationality">

                            <el-select
                              v-model="selectPnationalityList"
                              multiple
                              collapse-tags
                              collapse-tags-tooltip
                              placeholder="Select"
                              filterable
                              allow-create
                              value-key="id"
                            >
                              <el-option
                                v-for="(item,index) in pNationalityList"
                                :key="index"
                                :label="item.object_en"
                                :value="item"
                              />

                            </el-select>

                          </el-form-item>

                        </div>
                        <div>
                          <el-form-item label="Acceptable nationality">

                            <el-select
                              v-model="selectAnationalityList"
                              multiple
                              collapse-tags
                              collapse-tags-tooltip
                              placeholder="Select"
                              filterable
                              allow-create
                              value-key="id"
                            >
                              <el-option
                                v-for="(item,index) in aNationalityList"
                                :key="index"
                                :label="item.object_en"
                                :value="item"
                              />

                            </el-select>

                          </el-form-item>

                        </div>



                      </div>


                    </el-col>


                    <el-col :span="6">
                      <el-form-item label="Teaching license and certificates">

                        <el-select
                          v-model="selectTeachingCertificateList"
                          multiple
                          collapse-tags
                          collapse-tags-tooltip
                          placeholder="Select certificate"
                          filterable
                          allow-create
                          value-key="id"
                        >
                          <el-option
                            v-for="(item,index) in teachingCertificateList"
                            :key="index"
                            :label="item.object_en"
                            :value="item"
                          />

                        </el-select>

                      </el-form-item>

                    </el-col>
                    <el-col :span="6">

                      <el-form-item label="Minimum degree">
                        <el-select v-model="jobForm.education" placeholder="Minimum degree">
                          <el-option v-for="(item,i) in educationList" :key="i" :label="item.object_en"
                                     :value="item.id"></el-option>
                        </el-select>
                      </el-form-item>

                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="Languages">

                        <el-select
                          v-model="selectLanguagesList"
                          multiple
                          collapse-tags
                          collapse-tags-tooltip
                          placeholder="Select languages"
                          filterable
                          allow-create
                          value-key="id"
                        >
                          <el-option
                            v-for="(item,index) in languagesList"
                            :key="index"
                            :label="item.object_en"
                            :value="item"
                          />

                        </el-select>


                      </el-form-item>
                      <div>
                        <el-checkbox v-model="jobForm.is_mom_language"
                                     :true-label="1"
                                     :false-label="0"
                                     label="Native Speaker">
                        </el-checkbox>
                      </div>

                    </el-col>

                  </el-row>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  6. Other requirements
                </div>
                <div class="account-profile-item-c">

                  <el-row :gutter="50">

                    <el-col :span="6">
                      <el-form-item label="Gender">
                        <el-select v-model="jobForm.sex"
                                   :popper-append-to-body="false"
                                   placeholder="Select your gender">
                          <el-option v-for="(item,i) in sexOptions" :key="i" :label="item.object_en"
                                     :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="Work schedule">

                        <el-select
                          v-model="selectWorkTypeList"
                          multiple
                          collapse-tags
                          collapse-tags-tooltip
                          placeholder="Select work type"
                          filterable
                          allow-create
                          value-key="id"
                        >
                          <el-option
                            v-for="(item,index) in workTypeList"
                            :key="index"
                            :label="item.object_en"
                            :value="item"
                          />

                        </el-select>

                      </el-form-item>

                    </el-col>


                  </el-row>

                  <el-row :gutter="50">

                    <el-col :span="12">
                      <el-form-item label="Applicant's age">
                        <el-slider v-model="ageValue" range show-stops :max="100"></el-slider>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="Years of Experience Required">
                        <el-slider v-model="yearOfExpValue" range show-stops :max="40"></el-slider>
                      </el-form-item>
                    </el-col>


                  </el-row>

                  <el-row :gutter="50">



                    <el-col :span="12">
                      <el-form-item label="Working Hours">
                        <div class="working-hours-show-container" v-if="workingHoursData.length>0">

                          <div class="working-hours-show-item" v-for="(item,index) in workingHoursData" :key="index">
                            <div class="week-show-item" v-for="(week,i) in item.week" :key="i">
                              <span v-if="week==1 ">M</span>
                              <span v-if="week==2 ">T</span>
                              <span v-if="week==3 ">W</span>
                              <span v-if="week==4 ">Th</span>
                              <span v-if="week==5 ">F</span>
                              <span v-if="week==6 ">Sa</span>
                              <span v-if="week==7 ">Su</span>
                            </div>
                            <div class="hours-show-container">{{ item.hours }}</div>
                            <div class="hours-show-delete">
                              <el-button link @click="workingHourDelete(index)">DELETE</el-button>
                            </div>

                          </div>


                        </div>

                        <div class="working-hours-add" >
                          <el-button type="primary" round @click="addWorkingHours">ADD+</el-button>
                        </div>

                        <div class="working-hours-container" v-if="workingHoursContainerStatus">
                          <div class="week-container">
                            <div class="week-item" v-for="(item,index) in weekList" :key="index"
                                 @click="selectWeekItem(item.id)"
                                 :class="selectWeekItemData.indexOf(item.id) == -1 ? '' : 'week-item-active'">
                              <span>{{ item.name_en }}</span>
                            </div>
                          </div>
                          <div class="hours-container">
                            <el-time-select
                              v-model="workStartTime"
                              placeholder="Start time"
                              start="00:00"
                              step="00:15"
                              end="24:00"
                            >
                            </el-time-select>
                            <el-time-select
                              v-model="workEndTime"
                              :min-time="workStartTime"
                              placeholder="End time"
                              start="00:00"
                              step="00:15"
                              end="24:00"
                            >
                            </el-time-select>
                          </div>
                          <div class="working-hours-button">
                            <el-button type="primary" @click="addWorkingHoursConfirm">Confirm</el-button>
                          </div>
                        </div>

                      </el-form-item>

                    </el-col>


                    <el-col :span="12">
                      <el-checkbox
                        v-model="jobForm.is_equal"
                        :true-label="1"
                        :false-label="0"
                        label="I will accept applicants of different races and skin color"
                      >
                      </el-checkbox>
                    </el-col>


                  </el-row>

                </div>
              </div>

            </el-form>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import {
  USER_OBJECT_LIST, ADD_JOB,JOB_DETAIL,
  JOB_ADD_PROFILE, GET_COUNTRY_LIST
} from '@/api/api';


export default {
  name: "jobEdit",
  components: {
    Tinymce
  },
  data() {
    return {
      envName:process.env.VUE_APP_ENV_NAME,
      goDomain:process.env.VUE_APP_EXCHANGE_DOMAIN,
      jobForm:{
        user_id: this.$route.query.uid,
        identity: this.$route.query.identity,
        company_id: this.$route.query.cid,

        job_title: '',
        job_location: '',
        country_id: '',
        state_id: '',
        town_id: '',

        apply_due_date: '',
        is_online: 0,
        salary_min: '',
        salary_max: '',
        payment_period: '',
        payment_period_str: '',
        desc: '',
        numbers: 1,
        is_equal: 0,
        sex: '',
        sex_name: '',
        is_cpr: 0,
        is_first_aide: 0,
        is_teaching_exp: 0,
        teaching_times: '',
        teaching_times_str: '',
        is_teaching_license: 0,
        education: '',
        education_str: '',
        nationality: '',
        age: '',
        age_min: '',
        age_max: '',
        is_interview: 1,
        interview_name: '',
        interview_nationlity: '',
        interview_imgurl: '',
        entry_date: '',
        company_name: '',
        currency:  "USD",
        is_mom_language: 0,
        employment_type: '',
        class_size: '',
        working_hours: '',
        version_time: '',
        address: '',
        state: '',
        town: '',
        lat: '',
        lng: '',
        international: 1,
        nation_address: '',
        working_nums_start:'',
        working_nums_end:'',
        token: localStorage.getItem('token')
      },
      jobRules: {
        job_title: [
          {
            required: false,
            message: 'Please input',
            trigger: 'change',
          },
        ],
        job_location: [
          {
            required: false,
            message: 'Please input',
            trigger: 'change',
          },
        ],
      },
      descriptionValue:'',
      mapCenterValue:[-99.91028767893485, 32.082955230919616],
      submitLoadingValue:false,
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,

      jobFromChina:false,
      jobFromInternational:true,

      isInternationalName: 'first',

      paymentPeriodList: [],

      employmentTypeList: [],
      selectEmploymentTypeList: [],

      jobTitleList: [],
      addJobTitleStatus: true,
      ownJobTitleValue: '',
      ownJobTitleList: [],
      selectJobTitleList: [],
      selectJobTitleArr: [],

      benefitsList: [],
      selectBenefitsList: [],

      startDateList: [],
      addStartDateStatus: false,
      ownStartDateValue: '',
      ownStartDateList: [],
      selectStartDateList: [],
      selectStartDateArr: [],

      ageToTeachList: [],
      selectAgeToTeachList: [],

      subjectList: [],
      selectSubjectList: [],

      currencyList: [],
      addCurrencyStatus: false,
      ownCurrencyValue: '',
      ownCurrencyList: [],
      selectCurrencyList: [],
      selectCurrencyArr: [],

      teachingCertificateList: [],
      addTeachingCertificateStatus: false,
      ownTeachingCertificateValue: '',
      ownTeachingCertificateList: [],
      selectTeachingCertificateList: [],
      selectTeachingCertificateArr: [],

      languagesList: [],
      selectLanguagesList: [],

      workTypeList: [],
      selectWorkTypeList: [],

      pNationalityList: [],
      selectPnationalityList: [],

      aNationalityList: [],
      selectAnationalityList: [],

      weekList: [{
        id: 1,
        name_en: 'M',
        name_cn: '一'
      },
        {
          id: 2,
          name_en: 'T',
          name_cn: "二"
        },
        {
          id: 3,
          name_en: 'W',
          name_cn: "三"
        },
        {
          id: 4,
          name_en: 'Th',
          name_cn: "四"
        },
        {
          id: 5,
          name_en: 'F',
          name_cn: "五"
        },
        {
          id: 6,
          name_en: 'Sa',
          name_cn: "六"
        },
        {
          id: 7,
          name_en: 'Su',
          name_cn: "日"
        }
      ],
      workingHoursData: [],
      selectWeekItemData: [],
      workingHoursContainerStatus: false,
      workStartTime: '',
      workEndTime: '',

      sexOptions: [
        {
          value: 1,
          object_en: 'Male',
          object_cn: '男'
        },
        {
          value: 2,
          object_en: 'Female',
          object_cn: "女"
        },
        {
          value: 3,
          object_en: 'Non-binary',
          object_cn:'非二元人'
        },
        {
          value: 4,
          object_en: 'Undisclosed',
          object_cn: '未公开'
        }
      ],
      teachingExpList: [],
      educationList: [],
      ageValue: [18, 60],
      yearOfExpValue:[20, 60],

      sLocationType: 1,
      countryObj: {},
      provinceObj: {},
      cityObj: {},
      countryName: '',
      countryNameCn: '',
      provinceName: '',
      provinceNameCn: '',
      cityName: '',
      cityNameCn: '',

      countryOptions: [],
      provinceOptions: [],
      cityOptions: [],

      checkedEmploymentTypeValue:undefined

    }
  },
  computed: {
    identity: {
      get() {
        return this.$store.state.identity
      }
    }
  },
  mounted() {

    this.getAllCountry()

    this.getUserObjectList()

    let uid = this.$route.query.uid;
    let companyId = this.$route.query.cid;
    let identity = this.$route.query.identity;
    let jobId = this.$route.query.job_id;
    console.log(uid)
    console.log(companyId)
    console.log(identity)
    if(jobId){
      this.getJobDetail(jobId)
    }else {
      this.initMap(this.mapCenterValue)
    }


  },
  methods: {
    handleJobFromChina(){
      this.countryName = undefined;
      this.provinceName = undefined;
      this.cityName = undefined;
      this.districtName = undefined;

      this.countryObj = {}
      this.provinceObj = {}
      this.cityObj = {}
      this.districtObj = {}

      this.jobForm.country_id = undefined;
      this.jobForm.state_id = undefined;
      this.jobForm.town_id = undefined;

      let countryObj = {
        "id": 45,
        "name": "China",
        "iso3": "CHN",
        "numeric_code": "156",
        "iso2": "CN",
        "phonecode": "86",
        "capital": "Beijing",
        "currency": "CNY",
        "currency_name": "Chinese yuan",
        "currency_symbol": "¥",
        "tld": ".cn",
        "native": "中国",
        "region": "Asia",
        "subregion": "Eastern Asia",
        "timezones": "[{\"zoneName\":\"Asia/Shanghai\",\"gmtOffset\":28800,\"gmtOffsetName\":\"UTC+08:00\",\"abbreviation\":\"CST\",\"tzName\":\"China Standard Time\"},{\"zoneName\":\"Asia/Urumqi\",\"gmtOffset\":21600,\"gmtOffsetName\":\"UTC+06:00\",\"abbreviation\":\"XJT\",\"tzName\":\"China Standard Time\"}]",
        "translations": "{\"kr\":\"중국\",\"pt-BR\":\"China\",\"pt\":\"China\",\"nl\":\"China\",\"hr\":\"Kina\",\"fa\":\"چین\",\"de\":\"China\",\"es\":\"China\",\"fr\":\"Chine\",\"ja\":\"中国\",\"it\":\"Cina\",\"cn\":\"中国\",\"tr\":\"Çin\"}",
        "latitude": "35.00000000",
        "longitude": "105.00000000",
        "emoji": "🇨🇳",
        "emojiU": "U+1F1E8 U+1F1F3",
        "created_at": "2018-07-21 07:11:03",
        "updated_at": "2022-05-21 21:11:20",
        "flag": 1,
        "wikiDataId": "Q148"
      }

      this.jobForm.state_id = undefined
      this.jobForm.town_id = undefined

      this.provinceOptions = []
      this.cityOptions = []

      this.jobForm.country_id = countryObj.id
      this.countryName = countryObj.name
      this.countryNameCn = countryObj.name
      this.getAllProvinces(countryObj.id)
      this.countryObj = countryObj

      this.jobForm.international = 0;
      this.jobFromChina = true;
      this.jobFromInternational = false;
    },
    handleJobFromInternational(){
      this.countryName = undefined;
      this.provinceName = undefined;
      this.cityName = undefined;
      this.districtName = undefined;

      this.countryObj = {}
      this.provinceObj = {}
      this.cityObj = {}
      this.districtObj = {}

      this.jobForm.country_id = undefined;
      this.jobForm.state_id = undefined;
      this.jobForm.town_id = undefined;

      this.countryObj = {}
      this.jobForm.state_id = undefined
      this.jobForm.town_id = undefined

      this.provinceOptions = []
      this.cityOptions = []

      this.jobForm.international = 1
      this.jobFromChina = false;
      this.jobFromInternational = true;
    },
    discardJobPost(){
      this.$router.go(-1)
    },
    getJobDetail(id) {
      let that = this;
      let params = {
        job_id: id
      }
      JOB_DETAIL(params).then(res => {
        //console.log(res)
        if (res.code == 200) {
          this.detailData = res.message

          const workHours = res.message.working_hours
          if (workHours) {
            // this.jobForm.working_hours = JSON.parse(workHours)
            this.workingHoursData = JSON.parse(workHours)
          }

          let jobMessage = res.message;

          that.jobForm.job_title = jobMessage.job_title;
          that.ownJobTitleValue = jobMessage.job_title;

          that.jobForm.job_location = jobMessage.job_location;
          that.jobForm.age_min = jobMessage.age_min;
          that.jobForm.age_max = jobMessage.age_max;
          that.jobForm.is_online = jobMessage.is_online;
          that.jobForm.salary_min = jobMessage.salary_min.toString();
          that.jobForm.salary_max = jobMessage.salary_max.toString();
          that.jobForm.currency = jobMessage.currency;
          that.jobForm.business_id = jobMessage.business_id;
          that.jobForm.business_name = jobMessage.business_name;

          that.jobForm.employment_type = jobMessage.employment_type;

          that.jobForm.desc = jobMessage.desc;
          that.jobForm.numbers = jobMessage.numbers;
          that.jobForm.is_equal = jobMessage.is_equal;
          that.jobForm.is_cpr = jobMessage.is_cpr;
          that.jobForm.is_first_aide = jobMessage.is_first_aide;
          that.jobForm.is_mom_language = jobMessage.is_mom_language;
          that.jobForm.is_teaching_exp = jobMessage.is_teaching_exp;
          that.jobForm.is_interview = jobMessage.is_interview;
          that.jobForm.interview_name = jobMessage.interview_name;
          that.jobForm.nationality = jobMessage.nationality;
          that.jobForm.interview_nationlity = jobMessage.interview_nationlity;
          that.jobForm.entry_date = jobMessage.entry_date;
          that.jobForm.is_teaching_license = jobMessage.is_teaching_license;
          that.jobForm.version_time = jobMessage.version_time;

          that.jobForm.province = jobMessage.province;
          that.jobForm.city = jobMessage.city;
          that.jobForm.district = jobMessage.district;

          that.jobForm.class_size = jobMessage.class_size;
          that.jobForm.working_hours = jobMessage.working_hours;

          that.jobForm.address = jobMessage.address;

          if(jobMessage.lat && jobMessage.lng){
            that.jobForm.lat = jobMessage.lat;
            that.jobForm.lng = jobMessage.lng;

            let mapCenterValue = [jobMessage.lng , jobMessage.lat]
            this.initMap( mapCenterValue )
          }else{
            this.initMap(this.mapCenterValue)
          }

          that.jobForm.international = jobMessage.international;
          that.jobForm.nation_address = jobMessage.nation_address;

          let ageMin = jobMessage.age_min
          let ageMax = jobMessage.age_max
          this.ageValue = [ageMin, ageMax]

          let yearMin = jobMessage.working_nums_start
          let yearMax = jobMessage.working_nums_end
          this.yearOfExpValue = [yearMin, yearMax]

          // job title
          if (jobMessage.job_title) {
            this.jobForm.job_title = jobMessage.job_title;

            let arr = this.jobTitleList.filter(item => item.object_en == jobMessage.job_title);
            let arrcn = this.jobTitleList.filter(item => item.object_cn == jobMessage.job_title);
            if (arr.length > 0 || arrcn.length > 0) {
              this.selectJobTitleList = arr;
            } else {
              let obj = {
                id: 0,
                object_en: jobMessage.job_title,
                object_pid: 6
              };
              this.selectJobTitleList.push(obj);
            }
          }

          // start date
          if (jobMessage.entry_date) {
            this.jobForm.entry_date = jobMessage.entry_date;

            let arr = this.startDateList.filter(item => item.object_en == jobMessage.entry_date);
            let arrcn = this.startDateList.filter(item => item.object_cn == jobMessage.entry_date);
            if (arr.length > 0 || arrcn.length > 0) {
              this.selectStartDateList = arr;
            } else {
              let obj = {
                id: 0,
                object_en: jobMessage.entry_date,
                object_pid: 108
              };
              this.selectStartDateList.push(obj);
            }
          }
          // currency
          // if (jobMessage.currency) {
          //   let arr = this.currencyList.filter(item => item.object_en == jobMessage.currency);
          //   let arrcn = this.currencyList.filter(item => item.object_cn == jobMessage.currency);
          //   // console.log(arr)
          //   if (arr.length > 0 || arrcn.length > 0) {
          //     this.selectCurrencyList = arr;
          //   } else {
          //     let obj = {
          //       id: 0,
          //       object_en: jobMessage.currency,
          //       object_pid: 117
          //     };
          //     this.ownCurrencyList.push(obj);
          //     this.selectCurrencyList.push(obj);
          //   }
          //
          // }

          if (jobMessage.job_type) {

            let arr = jobMessage.job_type;

            arr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectEmploymentTypeList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectEmploymentTypeList.push(obj)

              }

            })

          }

          if (jobMessage.benefits) {

            let benefitsArr = jobMessage.benefits;

            benefitsArr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectBenefitsList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectBenefitsList.push(obj)

              }

            })

          }

          if (jobMessage.Acceptable) {

            let arr = jobMessage.Acceptable;

            arr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectAnationalityList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectAnationalityList.push(obj)

              }

            })

          }

          if (jobMessage.Prefered_Work_Schedule_Type) {

            let arr = jobMessage.Prefered_Work_Schedule_Type;

            arr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectWorkTypeList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectWorkTypeList.push(obj)

              }

            })

          }

          if (jobMessage.Nationality) {

            let arr = jobMessage.Nationality;

            arr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectPnationalityList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectPnationalityList.push(obj)

              }

            })

          }

          if (jobMessage.age_to_teach) {

            let arr = jobMessage.age_to_teach;

            arr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectAgeToTeachList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectAgeToTeachList.push(obj)

              }

            })

          }

          if (jobMessage.subject) {

            let arr = jobMessage.subject;

            arr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectSubjectList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectSubjectList.push(obj)

              }

            })

          }

          if (jobMessage.Teaching_certificate) {
            let arr = jobMessage.Teaching_certificate;

            arr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectTeachingCertificateList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectTeachingCertificateList.push(obj)

              }

            })

          }

          if (jobMessage.languages) {

            let arr = jobMessage.languages;

            arr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectLanguagesList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectLanguagesList.push(obj)

              }

            })

          }

          if (jobMessage.apply_due_date != '' && jobMessage.apply_due_date != '0000-00-00') {
            that.jobForm.apply_due_date = jobMessage.apply_due_date;
          }

          if (jobMessage.payment_period) {
            that.jobForm.payment_period = jobMessage.payment_period;
            that.jobForm.jobForm = jobMessage.payment_period_en;
          }

          if (jobMessage.street_address) {
            that.jobForm.street_address = jobMessage.street_address;
          }

          if (jobMessage.sex) {
            that.jobForm.sex = jobMessage.sex;
            if (jobMessage.sex == 1) {
              that.jobForm.sex_name = 'Male'
            }
            if (jobMessage.sex == 2) {
              that.jobForm.sex_name = 'Female'
            }
            if (jobMessage.sex == 3) {
              that.jobForm.sex_name = 'Both'
            }
          }

          if (jobMessage.teaching_times) {
            that.jobForm.teaching_times = jobMessage.teaching_times;
            that.jobForm.teaching_times_str = jobMessage.teaching_times_en;
          }

          if (jobMessage.education) {
            that.jobForm.education = jobMessage.education;
            that.jobForm.education_str = jobMessage.education_en;
          }

        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getAllCountry() {
      let params = {}
      GET_COUNTRY_LIST(params).then(res => {
        //console.log(res)
        if (res.code == 200) {
          this.countryOptions = res.message;
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    getAllProvinces(countryId) {
      let params = {
        country_id: countryId
      }
      GET_COUNTRY_LIST(params).then(res => {
        //console.log(res)
        if (res.code == 200) {
          this.provinceOptions = res.message;
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    getAllCitys(countryId, stateId) {
      let params = {
        country_id: countryId,
        state_id: stateId
      }
      GET_COUNTRY_LIST(params).then(res => {
        //console.log(res)
        if (res.code == 200) {
          this.cityOptions = res.message;
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    countryChange(e) {
      console.log(e)
      this.jobForm.state_id = undefined
      this.jobForm.town_id = undefined

      this.provinceOptions = []
      this.cityOptions = []

      this.jobForm.country_id = e.id
      this.countryName = e.name
      this.countryNameCn = e.name
      this.getAllProvinces(e.id)

      this.jobForm.job_location = this.countryName

    },
    provinceChange(e) {
      console.log(e)
      this.jobForm.town_id = undefined
      this.cityOptions = []

      this.jobForm.state_id = e.id
      this.provinceName = e.name
      this.provinceNameCn = e.name

      this.getAllCitys(this.jobForm.country_id, e.id)
      this.jobForm.job_location = this.provinceName + ', ' + this.countryName
    },
    cityChange(e) {
      console.log(e)
      this.jobForm.town_id = e.id
      this.cityName = e.name
      this.cityNameCn = e.name
      this.jobForm.job_location =this.cityName + ', ' + this.provinceName + ', ' + this.countryName
    },
    initMap(mapCenterValue) {
      mapboxgl.accessToken = this.accessToken;

      const map = new mapboxgl.Map({
        container: "mapContainer",
        center:mapCenterValue,
        style: this.mapStyle,
        zoom: 12
      });
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "top-right");

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      });

      map.addControl(geolocate, "top-right")

      const geocoder = new MapboxGeocoder({
        "accessToken": this.accessToken,
        "mapboxgl": mapboxgl
      })

      map.addControl(geocoder, 'top-left')
      const marker = new mapboxgl.Marker()
      // {
      //   draggable:true
      // }
      // marker.on('dragend',(e)=>{
      //   console.log(e)
      // })
      geocoder.on('result', (e) => {
        console.log(e)
        marker.setLngLat(e.result.center).addTo(map)
        this.jobForm.address = e.result.place_name
        this.jobForm.lng = e.result.center[0]
        this.jobForm.lat = e.result.center[1]

      })
      geocoder.on('clear', (e) => {
        console.log(e)
        this.jobForm.address = ''
        this.jobForm.lng = ''
        this.jobForm.lat = ''
      })

    },
    selectJobTitle(value) {
      // console.log(value)
      this.jobForm.job_title = value.object_en;

    },
    selectStartDate(value) {

      this.jobForm.entry_date = value.object_en;

    },
    submitBenefits(jobId) {
      let expand = [];
      let objectArr = [];
      this.selectBenefitsList.forEach(item => {
        if(typeof item === 'string'){
          expand.push(item);
        }else{
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 6,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('benefits--submit--' + res.data);
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    submitAgeToTeach(jobId) {
      let expand = [];
      let objectArr = [];
      this.selectAgeToTeachList.forEach(item => {
        console.log(item);
        if(typeof item === 'string'){
          expand.push(item);
        }else{
          objectArr.push(item.id);
        }

      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 4,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('age to teach--submit--' + res.data);
        } else {
          console.log('age to Teach--submit--error');
          //console.log(res.msg);
        }

      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    submitSubject(jobId) {
      let expand = [];
      let objectArr = [];

      this.selectSubjectList.forEach(item => {

        if(typeof item === 'string'){
          expand.push(item);
        }else{
          objectArr.push(item.id);
        }

      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 1,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('subject--submit--' + res.data);
        } else {
          console.log('subject--submit-error');
          //console.log(res.msg);
        }

      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    submitEmploymentType(jobId) {

      let expand = [];
      let objectArr = [];

      this.selectEmploymentTypeList.forEach(item => {
        // console.log(item);
        if (typeof item === 'string') {
          expand.push(item);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 3,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('employment--submit--' + res.data);
        } else {
          console.log('employment--submit--error');
          //console.log(res.msg)
        }

      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    submitTeachingCertificate(jobId) {
      let expand = [];
      let objectArr = [];
      this.selectTeachingCertificateList.forEach(item => {
        console.log(item);
        if (typeof item === 'string') {
          expand.push(item);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 7,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('teachingcertificate--submit--' + res.data);
        } else {
          console.log('teachingcertificate--submit--error');
          //console.log(res.msg);
        }

      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    submitLanguages(jobId) {
      let expand = [];
      let objectArr = [];
      this.selectLanguagesList.forEach(item => {
        console.log(item);
        if(typeof item === 'string'){
          expand.push(item);
        }else{
          objectArr.push(item.id);
        }

      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 2,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('languages--submit--' + res.data);
        } else {
          console.log('languages--submit--error');
          //console.log(res.msg);
        }

      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    submitWorkType(jobId) {
      let expand = [];
      let objectArr = [];
      this.selectWorkTypeList.forEach(item => {

        if(typeof item === 'string'){
          expand.push(item);
        }else{
          objectArr.push(item.id);
        }

      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 184,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('work type--submit--' + res.data);
        } else {
          console.log('work type --submit--error');
          //console.log(res.msg);
        }

      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    submitPnationality(jobId) {

      let expand = [];
      let objectArr = this.selectPnationalityList;

      this.selectPnationalityList.forEach(item => {

        if(typeof item === 'string'){
          expand.push(item);
        }else{
          objectArr.push(item.id);
        }

      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 203,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('p nationality--submit--' + res.data);
        } else {
          console.log('p nationality --submit--error');
          //console.log(res.msg);
        }

      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    submitAnationality(jobId) {
      let expand = [];
      let objectArr = this.selectAnationalityList;

      this.selectAnationalityList.forEach(item => {

        if (typeof item === 'string') {
          expand.push(item);
        } else {
          objectArr.push(item.id);
        }

      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 239,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('a nationality--submit--' + res.data);
        } else {
          console.log('a nationality --submit--error');
          //console.log(res.msg);
        }

      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    getUserObjectList() {
      let data = {
        token: localStorage.getItem('token')
      }
      USER_OBJECT_LIST(data).then(res => {
        if (res.code == 200) {
          this.benefitsList = res.message.filter(item => item.pid === 6); //benefits
          this.ageToTeachList = res.message.filter(item => item.pid === 4); //age to teach
          this.employmentTypeList = res.message.filter(item => item.pid === 3); //employment type
          this.paymentPeriodList = res.message.filter(item => item.pid === 111); // payment period
          this.currencyList = res.message.filter(item => item.pid === 117); // currency
          // console.log(this.currencyList)
          this.teachingCertificateList = res.message.filter(item => item.pid === 7); //teaching certificate ...
          this.teachingExpList = res.message.filter(item => item.pid === 120); //teaching exp
          this.educationList = res.message.filter(item => item.pid === 125); // education
          this.languagesList = res.message.filter(item => item.pid === 2); // language ..
          this.jobTitleList = res.message.filter(item => item.pid === 103); //job title
          this.startDateList = res.message.filter(item => item.pid === 108); // start date
          this.subjectList = res.message.filter(item => item.pid === 1); //subject
          this.workTypeList = res.message.filter(item => item.pid === 184); //subject
          this.pNationalityList = res.message.filter(item => item.pid === 203); //subject
          this.aNationalityList = res.message.filter(item => item.pid === 239); //subject
          // this.ageList = res.message.filter(item => item.pid === 131); //age list
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    workingHourDelete(index){
      this.workingHoursData.splice(index, 1)
      console.log(this.workingHoursData)
    },
    addWorkingHours() {
      // this.workingHoursData = [];
      this.selectWeekItemData = [];
      this.selectWorkingHours = '';
      this.workingHoursContainerStatus = !this.workingHoursContainerStatus;
    },
    addWorkingHoursConfirm() {

      let workingHours = this.workStartTime + '-' + this.workEndTime;
      let weekData = this.selectWeekItemData;

      let data = this.workingHoursData;
      let obj = {
        week: weekData,
        hours: workingHours,
        show: false
      }
      // console.log(obj)
      if (weekData.length > 0 && workingHours) {
        data.push(obj)
      }

      this.jobForm.working_hours = JSON.stringify(data);
      this.workingHoursContainerStatus = false;
    },
    selectWeekItem(weekId) {
      // console.log(weekId)
      let weekItemData = this.selectWeekItemData;
      let index = weekItemData.indexOf(weekId)
      if (index == -1) {
        this.selectWeekItemData.push(weekId)
      } else {
        this.selectWeekItemData.splice(index, 1)
      }
      // console.log(this.selectWeekItemData)

    },
    submitJob(formName, submitType) {
      let that = this;

      let jobLocationValue = ''
      let countryName = this.countryName
      let provinceName = this.provinceName
      let cityName = this.cityName
      let districtName = this.districtName

      if (countryName) {
        jobLocationValue = countryName
      }
      if (countryName && provinceName) {
        jobLocationValue = provinceName + ', ' + countryName
      }

      if (countryName && provinceName && cityName) {
        jobLocationValue = cityName + ', ' + provinceName + ', ' + countryName
      }

      if (countryName && provinceName && cityName && districtName) {
        jobLocationValue = districtName + ', ' + cityName + ', ' + provinceName + ', ' + countryName
      }

      this.jobForm.job_location = jobLocationValue

      // if (this.selectCurrencyList.length > 0) {
      //   let currency = this.selectCurrencyList;
      //   that.jobForm.currency = currency[0].object_en;
      // } else {
      //   that.jobForm.currency = '';
      // }

      that.jobForm.age_min = this.ageValue[0];
      that.jobForm.age_max = this.ageValue[1];

      that.jobForm.working_nums_start = this.yearOfExpValue[0];
      that.jobForm.working_nums_end = this.yearOfExpValue[1];

      that.jobForm.version_time = this.$route.query.version_time;

      // if (that.isEdit) {
      //   that.form.job_id = this.jobId;
      // }
      // console.log(that.jobForm);
      let jobIdFrom = this.$route.query.job_id

      if(jobIdFrom){
        that.jobForm.job_id = jobIdFrom
      }

      this.$loading({
        text: 'Loading...'
      })

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = Object.assign({}, that.jobForm);
          ADD_JOB(data).then(res => {
            // //console.log(res);
            if (res.code == 200) {

              let jobId = res.data.job_id;
              if (this.selectBenefitsList.length > 0) {
                that.submitBenefits(jobId);
              }

              if (this.selectAgeToTeachList.length > 0) {
                that.submitAgeToTeach(jobId);
              }
              if (this.selectSubjectList.length > 0) {
                that.submitSubject(jobId);
              }

              if(this.selectEmploymentTypeList.length > 0){
                that.submitEmploymentType(jobId)
              }

              if (this.selectTeachingCertificateList.length > 0) {
                that.submitTeachingCertificate(jobId);
              }

              if (this.selectLanguagesList.length > 0) {
                that.submitLanguages(jobId);
              }

              if(this.selectWorkTypeList.length > 0){
                that.submitWorkType(jobId)
              }

              if(this.selectPnationalityList.length > 0){
                that.submitPnationality(jobId)
              }

              if(this.selectAnationalityList.length > 0){
                that.submitAnationality(jobId)
              }

              if (submitType == 3) {
                // this.$router.push('/')
              }
              this.$loading().close()
              this.$router.push('/business/jobs/list')

            }
          }).catch(err => {
            console.log(err)
            this.$loading().close()
            if (err.msg) {
              this.$message.error(err.msg)
            }
            if (err.message) {
              this.$message.error(err.message)
            }
          })

        } else {
          this.$loading().close()
          console.log('error submit!!')
          return false
        }
      })

    },


  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.post-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.post-l-container{

}

.post-r-container{
  width: 100%;
}

.post-r-container-bg{
  padding:30px 50px 0 50px;
}


.account-profile-t{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 110px;
}

.account-profile-t-l{
  color:#262626;

}

.account-profile-t-r{

}

.account-profile-discard-btn{
  font-size:20px;
}

.account-profile-draft-btn{
  background-color: #E7DEFF;
  font-size:20px;
}

.account-profile-save-btn{
  font-size:20px;
}


.job-detail-container {
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: left;
}

.job-detail-label {
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #EEEEEE;
  padding: 10px 0;
}

.is-international-container {
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
}

.job-location-select{
  margin-top: 15px;
}

.map-container {
  width: 100%;
  height: 260px;
}

.basemap {
  width: 100%;
  height: 100%;
}

.position-info-container {
  margin-top: 20px;
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: left;
}

.position-info-label {
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #EEEEEE;
  padding: 10px 0;
}

.compensation-container {
  margin-top: 20px;
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: left;
}

.compensation-label {
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #EEEEEE;
  padding: 10px 0;
}

.applicant-container {
  margin-top: 20px;
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: left;
}

.applicant-label {
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #EEEEEE;
  padding: 10px 0;
}

.object-tags-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}

.object-tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

}

.object-tags-item {
  background-color: #F0F2F5;
  border:1px solid #262626;
  padding: 4px 10px;
  border-radius: 6px;
  margin: 10px;
  cursor: pointer;
}

.object-tags-add {
  width: 100%;
  margin-top: 10px;
}

.object-tags-item-add {
  width: 100%;
  position: relative;
}

.object-tags-item-btn-container{
  position: absolute;
  right: 10px;
  top: 10px;

}

.object-tags-item-btn{
  color:#262626;
  font-size: 20px;
}


.tags-active {
  background-color: #6650B3;
  color: #FFFFFF;
}


.working-hours-add {
  margin-left: 20px;
}

.working-hours-container {
  /* background-color: rgba(0, 180, 210, 0.2); */
  background-color: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}

.week-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.week-item {
  background-color: #F0F2F5;
  color: #000000;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  text-align: center;
  border-radius: 40px;
  cursor: pointer;
}

.hours-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  width: 98%;
}

.working-hours-button {
  margin-top: 20px;
}

.working-hours-button button {
  width: 30%;
  background-color: #6650B3;
  color: #FFFFFF;
  font-size: 14px;
}

.working-hours-show-container {
}

.working-hours-show-item {
  border: 1px solid #EEEEEE;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}

.week-show-item {
  width: 60px;

  background-color: #6650B3;
  color: #FFFFFF;
  font-size: 14px;
  text-align: center;
  border-radius: 60px;
  margin: 10px;
}

.hours-show-container {
  border: 1px solid #EEEEEE;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #FFFFFF;
}

.hours-show-delete{
  margin-left: 10px;
}

.week-item-active {
  background-color: #9173ff;
  color: #FFFFFF;
}

.submit-container {
  margin-top: 20px;
  text-align: center;
}

.job-detail-china-btn-container {
  margin-top: 10px;
}

.job-detail-china-btn {
  font-size: 14px;
}

.job-detail-china-tips {

  margin-top: 10px;
  color: #808080;
}

.job-detail-china-tips-2{

}

.job-detail-china-tips-2 a {
  color: #00b3d2;
  font-weight: bold;
  padding: 0 10px;
}

.job-form-container{

}

.account-profile-item-container{
  padding: 50px;
  border-radius: 38px;
  background-color: #ffffff;
  margin-bottom: 50px;

}


.account-profile-item-label{
  color:#262626;
}

.account-profile-item-c{
  margin-top:15px;
}
.job-company-name{
  color:#262626;
}

.xll-salary-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

}

/deep/ .xll-currency-select .el-input__wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-shadow: unset;
}

/deep/ .xll-currency-select .el-input__inner{
  width: 50px;
  border: 0;
  text-align: center;
}

/deep/ .xll-currency-select .el-input__suffix{
  height: auto;
}
/deep/ .xll-currency-select .el-input__suffix-inner>:first-child{
  margin-left: 0;
}
/deep/ .xll-currency-select .el-select .el-input.is-focus .el-input__wrapper{
  box-shadow: unset;
}

.xll-min-salary{
  margin-left: 5px;
  width: 120px;
}
.xll-salary-line{
  width: 20px;
  text-align: center;
}
.xll-max-salary{
  margin-left: 5px;
  width: 120px;
}
.xll-payment-select{
  margin-left: 5px;
}

.job-current-location{
  width:100%;

}
.job-location-container{

}

.job-location-tabs{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.job-location-tab-l{
  flex:1;
  text-align: center;
  line-height: 40px;

  border-left: 1px solid #262626;
  border-top: 1px solid #262626;
  border-bottom: 1px solid #262626;

  color: #262626;
  cursor: pointer;

  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;

}
.job-location-tab-r{
  flex:1;
  text-align: center;
  line-height: 40px;

  border: 1px solid #262626;

  color: #262626;
  cursor: pointer;

  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;

}

.job-location-tab-active{
  background: #988CF5;
  color: #FFFFFF;
  border: 1px solid #988CF5;
}

.job-location-content{
  margin-top: 10px;

}

@media screen and (min-width: 1200px) {


}

@media screen and (max-width: 768px) {

}


</style>
