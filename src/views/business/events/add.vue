<template>
  <div class="bg">
    <div class="profile-container">

      <div class="profile-r-container">

        <div class="profile-r-bg-container">

          <div class="new-deal-t">
            <div class="new-deal-t-l">New event</div>
            <div class="new-deal-t-r">
              <el-button class="new-deal-btn"
                         type="primary"
                         round
                         :loading="submitLoadingValue"
                         @click="submitForm('basicForm')">
                PUBLISH
              </el-button>
            </div>
          </div>

          <div class="basic-form">

            <el-form
              ref="basicForm"
              :model="basicForm"
              :rules="basicRules"
              label-width="120px"
              label-position="top"
              class="demo-ruleForm"
            >

              <div class="event-item-container">
                <div class="event-item-label">
                  1. Basic information
                </div>
                <div class="event-item-c">
                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="Event Type">

                        <div class="event-type-container">
                          <div class="event-type"
                               :class="dealLocationTypeValue === 1 ? 'event-type-active' : '' "
                               @click="dealLocationTypeChange(1)"
                          >
                            ONLINE
                          </div>
                          <div class="event-type"
                               :class="dealLocationTypeValue === 2 ? 'event-type-active' : '' "
                               @click="dealLocationTypeChange(2)"
                          >
                            OFFLINE
                          </div>
                          <div class="event-type"
                               :class="dealLocationTypeValue === 3 ? 'event-type-active' : '' "
                               @click="dealLocationTypeChange(3)"
                          >
                            BOTH
                          </div>

                        </div>
                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <template v-if="dealLocationTypeValue === 2 || dealLocationTypeValue === 3">
                        <el-form-item label="Venue" prop="event_place">
                          <el-input v-model="basicForm.event_place" type="text"
                                    placeholder="eg. Mercedes-Benz Arena"
                          ></el-input>
                        </el-form-item>
                      </template>
                      <template v-if="dealLocationTypeValue === 1 || dealLocationTypeValue === 3">
                        <el-form-item label="Event Link">
                          <el-input v-model="basicForm.online_url" placeholder="eg. eventlink.com"></el-input>
                        </el-form-item>
                      </template>
                    </el-col>


                    <el-col :span="6" v-if="dealLocationTypeValue === 2 || dealLocationTypeValue === 3">

                      <el-form-item label="Location">
                        <div class="deals-location-select-container">
                          <el-select v-model="countryObj"
                                     @change="countryChange"
                                     value-key="id"
                                     filterable
                                     placeholder="Select country">
                            <el-option v-for="(item,i) in countryOptions" :key="i" :label="item.name"
                                       :value="item"></el-option>
                          </el-select>

                          <template v-if="provinceOptions.length>0">
                            <el-select v-model="provinceObj"
                                       value-key="id"
                                       filterable
                                       @change="provinceChange"
                                       placeholder="Select state/province">
                              <el-option v-for="(item,i) in provinceOptions" :key="i" :label="item.name"
                                         :value="item"></el-option>
                            </el-select>
                          </template>
                          <template v-if="cityOptions.length>0">
                            <el-select v-model="cityObj"
                                       value-key="id"
                                       filterable
                                       @change="cityChange"
                                       placeholder="Select city">
                              <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.name"
                                         :value="item">
                              </el-option>
                            </el-select>
                          </template>

                        </div>

                        <div class="map-container"
                             v-loading="mapLoading">
                          <div id="mapContainer" class="basemap"></div>
                        </div>

                      </el-form-item>

                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Category" prop="category_id">
                        <el-select v-model="basicForm.category_id"
                                   placeholder="Select category"
                        >
                          <el-option
                            v-for="item in categoryData"
                            :key="item.id"
                            :label="item.name_en"
                            :value="item.id"
                          />
                        </el-select>
                      </el-form-item>


                    </el-col>

                  </el-row>
                </div>
              </div>

              <div class="event-item-container">
                <div class="event-item-label">
                  2. About your event
                </div>
                <div class="event-item-c">
                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="Event name" prop="name">
                        <el-input v-model="basicForm.name" placeholder="Name of the event"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="Event description" prop="desc">
                        <el-input v-model="basicForm.desc"
                                  type="textarea"
                                  placeholder="Provide a paragraph or two about the event">
                        </el-input>

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">

                      <el-form-item label="Event Date" prop="date">
                        <div class="event-date-container">

                          <div class="event-date">
                            <el-date-picker
                              v-model="basicForm.date"
                              @change="eventDateChange"
                              type="date"
                              :disabledDate="eventDisabledDate"
                              placeholder="Day"
                              value-format="yyyy-MM-dd"
                            ></el-date-picker>
                          </div>
                          <div class="event-time">
                            <div class="event-time-item">
                              <el-time-select
                                @change="startTimeChange"
                                v-model="startTime"
                                :max-time="endTime"
                                placeholder="Start time"
                                :picker-options="{
                                  start: '00:00',
                                  step: '00:01',
                                  end: '23:59'
                                }"

                              />
                            </div>
                            <div class="event-time-item">
                              <el-time-select
                                @change="endTimeChange"
                                v-model="endTime"
                                :min-time="startTime"
                                placeholder="End time"
                                :picker-options="{
                                  start: '00:00',
                                  step: '00:01',
                                  end: '23:59'
                                }"

                              />

                            </div>

                          </div>
                        </div>

                        <div>
                          <div>Current</div>
                          <div>
                            Start Time: {{basicForm.start_time}}
                          </div>
                          <div>
                            End Time: {{ basicForm.end_time}}
                          </div>

                        </div>

                      </el-form-item>

                    </el-col>

                  </el-row>

                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="ESL Passport Members Get" prop="type_desc">
                        <el-input v-model="basicForm.type_desc" type="textarea"
                                  placeholder="Enter the deal/discount you will offer our members."></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">

                      <el-form-item label="Price" prop="pay_money">
                        <el-row :gutter="10">
                          <el-col :span="8">
                            <el-select v-model="basicForm.currency"
                                       placeholder="currency"
                            >
                              <el-option
                                v-for="(item,index) in currencyList"
                                :key="index"
                                :label="item.object_en"
                                :value="item.object_en"
                              />
                            </el-select>
                          </el-col>
                          <el-col :span="16">
                            <el-input v-model="basicForm.pay_money"
                                      placeholder="amount per ticket">
                            </el-input>
                          </el-col>
                        </el-row>

                      </el-form-item>

                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Company name" prop="third_company_name">
                        <el-input v-model="basicForm.third_company_name" type="text"
                                  placeholder="Company name"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Tags">

                        <el-select
                          v-model="selectTagsValue"
                          multiple
                          collapse-tags
                          collapse-tags-tooltip
                          placeholder="Select"
                          filterable
                          allow-create
                          value-key="id"
                        >
                          <el-option
                            v-for="(item,index) in tagsData"
                            :key="index"
                            :label="item.name_en"
                            :value="item"
                          />

                        </el-select>

                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="50">

                    <el-col :span="6">
                      <el-form-item label="Poster(2:3 ratio)" prop="file">
                        <el-upload
                          class="profile-uploader"
                          action=""
                          :headers="uploadHeaders"
                          :show-file-list="false"
                          :http-request="flyerHttpRequest"
                          :before-upload="beforeFlyerPhotoUpload"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>

                        <div class="account-xll-images" >
                          <div class="account-xll-image">
                            <div v-if="flyerPhotoUrl">
                              <el-image
                                style="width:100%;"
                                :src="flyerPhotoUrl">
                              </el-image>
                            </div>
                          </div>
                        </div>

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Company Logo" prop="third_company_logo">
                        <el-upload
                          class="profile-uploader"
                          action=""
                          :headers="uploadHeaders"
                          :show-file-list="false"
                          :http-request="companyLogoHttpRequest"
                          :before-upload="beforeCompanyLogoPhotoUpload"
                        >
                           <i class="el-icon-plus"></i>
                        </el-upload>

                        <div class="account-xll-images" >
                          <div class="account-xll-image">
                            <div v-if="companyLogoPhotoUrl">
                              <el-image
                                style="width:100%;"
                                :src="companyLogoPhotoUrl">
                              </el-image>
                            </div>

                          </div>
                        </div>

                      </el-form-item>
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

import {
  EVENTS_ADD_EVENT,
  EVENTS_CATEGORY,
  EVENTS_TAGS,
  UPLOAD_BY_ALI_OSS, UPLOAD_BY_SERVICE, GET_COUNTRY_LIST, USER_OBJECT_LIST, EVENT_DETAIL
} from '@/api/api';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import ImageCompressor from 'compressorjs'
import {decode} from 'js-base64'

export default {
  name: "addEvent",
  components: {

  },
  data() {
    const eventDisabledDate = (date) => {
      let myDate = new Date();
      let year = myDate.getFullYear()
      let month = myDate.getMonth() + 1
      let day = myDate.getDate()
      let mTime = year + '-' + month + '-' + day;
      let mDate = new Date(mTime)
      return date.getTime() < mDate.getTime();
    }

    // const checkEventDate = (rule, value, callback) => {
    //   console.log(value)
    //   if (!value) {
    //     return callback(new Error('Please select date'))
    //   }
    //   if (!this.startTime) {
    //     return callback(new Error('Please select start time'))
    //   }
    //   if (!this.endTime) {
    //     return callback(new Error('Please select end time'))
    //   }
    //   callback()
    // }

    return {
      eventDisabledDate,
      dialogSingleImageVisible:false,
      dialogSingleImageUrl:'',

      currencyList: [],
      addCurrencyStatus: false,
      ownCurrencyValue: '',
      ownCurrencyList: [],
      selectCurrencyList: [],
      selectCurrencyArr: [],

      uploadLoadingStatus: false,
      mapLoading: false,
      map1Loading: false,
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
      flyerPhotoUrl: '',
      companyLogoPhotoUrl: '',
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      dealLocationTypeValue: 1,
      userInfo: {},
      basicUserInfo: {},

      sLocationType: 1, //1 国外 2国内
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

      startTime: '',
      endTime: '',
      eventDate: '',
      basicForm: {

        user_id: this.$route.query.uid,
        identity: this.$route.query.identity,
        company_id: this.$route.query.cid,

        name: undefined,
        desc: undefined,
        third_company_logo: undefined,
        third_company_name: undefined,
        type_desc: undefined,
        pay_money: undefined,
        date: undefined,
        file: undefined,
        file_name: undefined,
        is_all: '1',
        event_place: undefined,
        start_time: undefined,
        end_time: undefined,
        is_online: 1,
        online_url: undefined,
        location: undefined,
        country_id: undefined,
        state_id: undefined,
        town_id: undefined,

        lat: undefined,
        lng: undefined,
        category_id: undefined,
        currency: 'USD',
        tag: [],
        tags_cn: '',
        tags_en: ''
      },
      basicRules: {
        name: [
          {
            required: true,
            message: 'Please input',
            trigger: 'blur',
          }
        ],
        desc: [
          {
            required: true,
            message: 'Please input',
            trigger: 'blur',
          },
        ],

        file: [
          {
            required: true,
            message: 'Please upload',
            trigger: 'blur',
          },
        ],
        third_company_logo: [
          {
            required: false,
            message: 'Please upload',
            trigger: 'blur',
          },
        ],
        third_company_name: [
          {
            required: false,
            message: 'Please input',
            trigger: 'blur',
          },
        ],

      },
      categoryData: [],
      tagsData: [],
      addTagsStatus: false,
      ownTagsValue: '',
      ownTagsList: [],
      selectTagsList: [],
      selectTagsArr: [],
      tagsCnData: [],
      tagsEnData: [],
      submitLoadingValue: false,

      selectTagsValue:[]

    }
  },
  mounted() {

    let str = this.$route.query.str;
    if(str){
      let editStr = JSON.parse(decode(str) )
      // console.log(editStr)
      this.basicForm = Object.assign({},editStr)
      this.basicForm.event_id = editStr.id;
      this.flyerPhotoUrl = editStr.file;
      this.companyLogoPhotoUrl = editStr.third_company_logo;

    }
    this.getAllCountry()
    this.getUserObjectList()
    this.getEventCategories()
    this.getEventsTags()

    let eventId = this.$route.query.event_id

    if(eventId){
      this.getEventDetail(eventId)
    }else{
      // this.initMap()
    }



  },
  methods: {

    getEventDetail(eventId){
      const params = {
        event_id:eventId
      }
      this.basicForm.event_id =  eventId;

      EVENT_DETAIL(params).then(res=>{
        if(res.code == 200){
          let row = res.message;
          this.basicForm = Object.assign({}, res.message)

          this.flyerPhotoUrl = row.file;
          this.companyLogoPhotoUrl = row.third_company_logo;

          if(row.lng && row.lat ){
            this.initMap(row.lng,row.lat)
          }else{
            this.initMap()
          }

        }else{
          this.$message.error(res.msg)
        }

      }).catch(err=>{
        console.log(err)
      })
    },
    companyLogoHttpRequest(options) {
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token', localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.companyLogoPhotoUrl = myFileUrl
                self.basicForm.third_company_logo = myFileUrl

              }
            }).catch(err => {
              console.log(err)
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            UPLOAD_BY_SERVICE(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.companyLogoPhotoUrl = myFileUrl
                self.basicForm.third_company_logo = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

        },
        error(err) {
          console.log(err.message)
        }

      })

    },
    flyerHttpRequest(options) {
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token', localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.flyerPhotoUrl = myFileUrl
                self.basicForm.file = myFileUrl

              }
            }).catch(err => {
              console.log(err)
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            UPLOAD_BY_SERVICE(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.flyerPhotoUrl = myFileUrl
                self.basicForm.file = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

        },
        error(err) {
          console.log(err.message)
        }

      })

    },
    getEventsTags() {
      let params = {
        page: 1,
        limit: 10000,
        type: 2
      }
      EVENTS_TAGS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.tagsData = res.message.data;
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getEventCategories() {
      let params = {
        page: 1,
        limit: 10000
      }
      EVENTS_CATEGORY(params).then(res => {
        this.categoryData = res.message.data;
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    dealLocationTypeChange(e) {

      let self = this

      this.dealLocationTypeValue = e;

      self.basicForm.is_online = e;

      if (e === 2) {
        this.mapLoading = true
        setTimeout(function () {
          self.initMap()
          self.mapLoading = false
        }, 1000)
      }

      if (e === 3) {
        this.map1Loading = true
        setTimeout(function () {
          self.initMap()
          self.map1Loading = false
        }, 1000)

      }
    },
    beforeFlyerPhotoUpload(file) {
      // this.$loading({
      //   text:'Uploading...'
      // })
      this.uploadLoadingStatus = true;
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    beforeCompanyLogoPhotoUpload(file) {
      this.uploadLoadingStatus = true;
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    cancelUpload() {
      this.uploadLoadingStatus = false;
    },
    eventDateChange(e) {
      // console.log(e)
      this.eventDate = e;
    },
    startTimeChange(e) {
      console.log(e)
      this.startTime = e;
      let a = e + ':00'
      console.log(a)
      let startTime = this.eventDate + ' ' + a
      console.log(startTime)
    },
    endTimeChange(e) {
      console.log(e)
      this.endTime = e;
    },
    initMap() {
      mapboxgl.accessToken = this.accessToken;

      const map = new mapboxgl.Map({
        container: "mapContainer",
        center: [121.472644, 31.231706],
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
        this.basicForm.location = e.result.place_name
        this.basicForm.lng = e.result.center[0]
        this.basicForm.lat = e.result.center[1]

      })
      geocoder.on('clear', (e) => {
        console.log(e)
        this.basicForm.location = ''
        this.basicForm.lng = ''
        this.basicForm.lat = ''
      })

    },
    initMap1() {
      mapboxgl.accessToken = this.accessToken;

      const map = new mapboxgl.Map({
        container: "mapContainer1",
        center: [121.472644, 31.231706],
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
        this.basicForm.location = e.result.place_name
        this.basicForm.lng = e.result.center[0]
        this.basicForm.lat = e.result.center[1]

      })
      geocoder.on('clear', (e) => {
        console.log(e)
        this.basicForm.location = ''
        this.basicForm.lng = ''
        this.basicForm.lat = ''
      })

    },
    getAllCountry() {
      let params = {}
      GET_COUNTRY_LIST(params).then(res => {
        console.log(res)
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
        console.log(res)
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
        console.log(res)
        if (res.code == 200) {
          this.cityOptions = res.message;
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    countryChange(e) {
      console.log(e)
      this.basicForm.state_id = undefined
      this.basicForm.town_id = undefined

      this.provinceOptions = []
      this.cityOptions = []

      this.basicForm.country_id = e.id
      this.countryName = e.name
      this.countryNameCn = e.name
      this.getAllProvinces(e.id)

    },
    provinceChange(e) {
      console.log(e)
      this.basicForm.town_id = undefined
      this.cityOptions = []

      this.basicForm.state_id = e.id
      this.provinceName = e.name
      this.provinceNameCn = e.name

      this.getAllCitys(this.basicForm.country_id, e.id)
    },
    cityChange(e) {
      console.log(e)
      this.basicForm.town_id = e.id
      this.cityName = e.name
      this.cityNameCn = e.name
    },
    getUserObjectList() {
      let data = {
        token: localStorage.getItem('token')
      }
      USER_OBJECT_LIST(data).then(res => {
        if (res.code == 200) {
          this.currencyList = res.message.filter(item => item.pid === 117); // currency
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
    discard(){
      this.$router.go(-1)
    },
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {

          let tagsValue = this.selectTagsValue
          let tagsIdData = []
          let tagsNameEn = []
          let tagsNameCn = []

          if(tagsValue.length>0){
            tagsValue.forEach(item=>{

              if(typeof item === 'string'){
                console.log('string')
                tagsNameCn.push(item)
                tagsNameEn.push(item)
              }
              if(typeof item === 'object'){
                console.log('object')
                tagsIdData.push(item.id)
                tagsNameCn.push(item.name_cn)
                tagsNameEn.push(item.name_en)
              }

            })
          }

          // console.log(this.selectCurrencyList)
          this.basicForm.tag = tagsIdData;
          this.basicForm.tags_cn = tagsNameCn.join(',');
          this.basicForm.tags_en = tagsNameEn.join(',');

          if (this.eventDate) {
            this.basicForm.date = this.eventDate
          }

          if (this.eventDate && this.startTime) {
            this.basicForm.start_time = this.eventDate + ' ' + this.startTime + ':00'
          }

          if (this.eventDate && this.endTime) {
            this.basicForm.end_time = this.eventDate + ' ' + this.endTime + ':00'
          }

          let countryObj = {
            country_name_en: this.countryName,
            country_name_cn: this.countryNameCn,
            province_name_en: this.provinceName,
            province_name_cn: this.provinceNameCn,
            city_name_en: this.cityName,
            city_name_cn: this.cityNameCn
          }

          this.basicForm.country_info = JSON.stringify(countryObj)

          this.$loading({
            text: 'Loading...'
          })

          let params = Object.assign({}, this.basicForm);
          EVENTS_ADD_EVENT(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              // this.submitEventForm()
              this.$loading().close()

              this.$router.push('/business/events/list')
            }
          }).catch(err => {
            console.log(err)
            this.$message.error(err.msg)
            this.$loading().close()
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

.bg {
  background-color: #f5f6f7;
}

.profile-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}


.profile-r-container {
  width: 100%;
  padding: 0 50px 50px 50px;
}

.profile-r-bg-container {
  width: 100%;
}

.new-deal-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0 30px 0;
}

.new-deal-t-l {
  color: #262626;
}

.new-deal-t-r {

}

.new-deal-btn {
  font-size: 20px;
}

.basic-form {
  height: calc(100vh - 340px);
}

.event-date-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.event-date {
  width:100%;
}

.event-time {
  width: 100%;

}
.event-time-item{
  margin-top: 15px;
}

.deals-tabs-container {
  border-radius: 10px;
  overflow: hidden;
}

.deals-location-select-container {
  text-align: left;
}

.map-container {
  margin-top: 10px;
  width: 100%;
  height: 300px;
  text-align: center;
}

.basemap {
  width: 100%;
  height: 100%;
}

/deep/ .profile-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

/deep/ .profile-uploader .el-upload:hover {
  border-color: #0AA0A8;
}

/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.profile-avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.deals-tips {
  text-align: left;
  font-size: 12px;
  color: #808080;
}


.xll-submit-container {
  text-align: center;
  margin-top: 20px;
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
  background-color: rgba(0, 179, 210, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  margin: 10px;
  font-size: 14px;
  cursor: pointer;
}

.object-tags-add {
  width: 100%;
  margin-top: 10px;
}

.object-tags-item-add {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}


.tags-active {
  background-color: #00CE47;
  color: #FFFFFF;
}

.event-item-container {
  padding: 50px;
  border-radius: 38px;
  background-color: #ffffff;
  margin-bottom: 50px;
}

.event-item-label {
  color: #262626;
}

.event-item-c {
  margin-top: 15px;
}

.event-type-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.event-type {

  color: #262626;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #262626;
  margin-right: 15px;
  background-color: #F0F2F5;
  cursor: pointer;
}

.event-type-active {
  background-color: #6650B3;
  color: #FFFFFF !important;
}


.account-xll-images{
  width:90%;
}

.account-xll-image{
  position: relative;
  margin-top: 10px;

}

.account-xll-image-mask{
  position: absolute;
  width:100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
  display: none;

}

.account-xll-image:hover .account-xll-image-mask{
  /*display: inline;*/
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.account-xll-image-mask span{
  margin-right: 15px;
  cursor: pointer;
}

.account-xll-image-mask:hover{

}


@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {

}

</style>
