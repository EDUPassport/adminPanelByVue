<template>
  <div class="app-container">
    <div class="events-container">
      <el-form
        ref="dataForm"
        :model="eventsTempData"
        label-position="top"
        label-width="240px"
      >
        <el-form-item label="Event Type">
          <el-select
            v-model="eventsTempData.is_all"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in eventsOne"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Event Name">
          <el-input
            v-model="eventsTempData.name"
            class="filter-item"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="Deal/Discount For ESL Passport Members">
          <el-input
            v-model="eventsTempData.type_desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="Event Description">
          <el-input
            v-model="eventsTempData.desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>

        <el-form-item label="Event Price">
          <el-input
            v-model="eventsTempData.pay_money"
            type="number"
            class="filter-item"
            placeholder="Please select"
          />
        </el-form-item>
        <el-form-item label="Place/Shop">
          <el-input
            v-model="eventsTempData.event_place"
            class="filter-item"
            placeholder="Please select"
          />
        </el-form-item>
        <el-form-item label="Online">
          <el-select
            v-model="eventsTempData.is_online"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in onlineOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Event Link">
          <el-input
            v-model="eventsTempData.online_url"
            class="filter-item"
            placeholder="Please select"
          />
        </el-form-item>
        <el-form-item label="Location">
          <el-select
            v-model="eventsTempData.province_name"
            placeholder="Province"
            @change="chooseProvince($event,2)"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.Pinyin"
              :value="{id:item.id,name:item.Pinyin}"
            />
          </el-select>
          <el-select
            v-model="eventsTempData.city_name"
            placeholder="City"
            @change="chooseCity($event,2)"
          >
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.Pinyin"
              :value="{id:item.id,name:item.Pinyin}"
            />
          </el-select>
          <el-select
            v-model="eventsTempData.district_name"
            placeholder="District"
            @change="chooseDistrict($event,2)"
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
          <div id="map" style="width:90%;height:400px;"></div>
        </el-form-item>

        <el-form-item label="Event Date">
          <el-date-picker
            v-model="eventsTempData.date"
            type="date"
            placeholder="Please picker a date"
            @change="eventsTempDateChange"
          />
        </el-form-item>
        <el-form-item label="Start Time & End Time">
          <el-time-select
            v-model="eventsTempData.start_time"
            placeholder="Start Time"
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '24:00'
            }"
            @change="eventStartTimeChange"
          />
          <el-time-select
            v-model="eventsTempData.end_time"
            placeholder="End Time"
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '24:00',
              minTime: eventsTempData.start_time
            }"
            @change="eventEndTimeChange"
          />
        </el-form-item>

        <el-form-item label="Event Flyer">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            action=""
            multiple
            list-type="picture"
            :limit="1"
            :http-request="flyerHttpRequest"
            :file-list="eventsFileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              Drag the file here, or <em>click to upload</em>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="Event Logo ( Only for Non-ESL Passport Users)">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            action=""
            multiple
            list-type="picture"
            :limit="1"
            :http-request="logoHttpRequest"
            :file-list="eventsLogoFileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              Drag the file here, or <em>click to upload</em>
            </div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>

        <el-form-item label="Event Header Photo ( Only for Non-ESL Passport Users)">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            action=""
            multiple
            list-type="picture"
            :limit="1"
            :http-request="headerPhotoHttpRequest"
            :file-list="eventsHeaderPhotoFileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              Drag the file here, or <em>click to upload</em>
            </div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>

        <el-form-item label="Event Company Name ( Only for Non-ESL Passport Users)">
          <el-input
            v-model="eventsTempData.third_com_name"
            class="filter-item"
            placeholder="Please input "
          />
        </el-form-item>
      </el-form>

      <div>
        <el-button type="primary" @click="updateData">Confirm</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import {  addEvent,eventDetail } from '@/api/events'
import waves from '@/directive/waves' // waves directive
import { userObjectList } from '@/api/member' // secondary package based on el-pagination
import { format } from 'date-fns'
import { getAreas } from '@/api/location'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import 'mapbox-gl/dist/mapbox-gl.css';
import {uploadByAliOSS, uploadByService} from '@/api/upload.js'
import ImageCompressor from 'compressorjs'


export default {
  name: 'Index',
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info',
        2: 'danger'
      }
      return statusMap[status]
    }

  },
  data() {
    return {

      onlineOptions: [{label: 'online', value: 1}, {label: 'offline', value: 2},{label: 'both', value: 3}],
      provinceList: [],
      cityList: [],
      districtList: [],
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        pay_money: undefined,
        status: undefined
      },
      statusOptions: [{ label: 'Pending', value: 0 }, { label: 'Successful', value: 1 }, { label: 'Rejected', value: 2 }],
      temp: {
        event_id: undefined,
        reason: '',
        status: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'status is required', trigger: 'change' }]
      },
      downloadLoading: false,
      eventsFileUrl: undefined,
      eventsFileList: undefined,
      eventsLogoFileList: undefined,
      eventsHeaderPhotoFileList: undefined,
      dialogFormEventsVisible: false,
      eventsTempData: {
        user_id: 1,
        identity:2,
        name: undefined,
        desc: undefined,
        is_all: undefined,
        type_desc: undefined,
        pay_money: undefined,
        date: undefined,
        start_time: undefined,
        end_time: undefined,
        file: undefined,
        event_place: undefined,
        is_online:undefined,
        online_url:undefined,
        location: undefined,
        province: undefined,
        province_name: undefined,
        city: undefined,
        city_name: undefined,
        district: undefined,
        district_name: undefined,
        is_unregister: 0,
        file_name: undefined,
        third_com_name: undefined,
        third_com_logo: undefined,
        third_com_bg: undefined,
        lng: undefined,
        lat: undefined
      },
      eventStartTime: undefined,
      eventEndTime: undefined,
      eventsOne: [{ label: 'Social', value: 1 }, { label: 'Professional', value: 2 }],
      popuCityList: []

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
    this.getAreas()
    this.getUserObjList()
  },
  mounted() {
    // this.initMap(121.472644, 31.231706)
    const uid = this.$route.query.uid
    const eventId = this.$route.query.event_id
    if(uid){
      this.eventsTempData.user_id = uid;
    }
    if(eventId){
      this.getEventDetail(eventId)
    }

  },
  methods: {
    getEventDetail(eventId){
      const params = {
        event_id:eventId
      }
      eventDetail(params).then(res=>{
        if(res.code == 200){
          let row = res.message;

          if (res.message.location) {
            this.eventsTempData.location = res.message.location
          }
          if (res.message.lat) {
            this.eventsTempData.lat = res.message.lat
          }
          if (res.message.lng) {
            this.eventsTempData.lng = res.message.lng
          }
          if(res.message.lng && res.message.lat ){
            this.initMap(res.message.lng,res.message.lat)
          }else{
            this.initMap(121.472644, 31.231706)
          }

          this.eventsTempData = Object.assign({}, row) // copy obj
          this.eventsTempData.event_id = row.id
          if (row.date === '0000-00-00') {
            this.eventsTempData.date = undefined
          }
          if (row.start_time === '0000-00-00 00:00:00') {
            this.eventsTempData.start_time = undefined
          }
          if (row.end_time === '0000-00-00 00:00:00') {
            this.eventsTempData.end_time = undefined
          }

          if (row.province > 0 && row.provinces != null) {
            this.eventsTempData.province_name = row.provinces.Pinyin
          }
          if (row.city > 0 && row.citys != null) {
            this.eventsTempData.city_name = row.citys.Pinyin
          }
          if (row.district > 0 && row.districts != null) {
            this.eventsTempData.district_name = row.districts.Pinyin
          }
          this.dialogStatus = 'update'
          this.dialogFormEventsVisible = true
          if (row.file !== '') {
            this.eventsFileList = [{ name: '', url: row.file }]
          }
          if (row.third_com_logo !== '') {
            this.eventsLogoFileList = [{ name: '', url: row.third_com_logo }]
          }
          if (row.third_com_bg !== '') {
            this.eventsHeaderPhotoFileList = [{ name: '', url: row.third_com_bg }]
          }

        }else{
          this.$message.error(res.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    initMap(lng,lat){
      let _this = this;
      mapboxgl.accessToken = 'pk.eyJ1Ijoic3JrbGluZ2UiLCJhIjoiY2t2NnR4anI2OWU5NDJ3bWE1dHd3c3h1aSJ9.O0JfjqiyBBkFuf4G-DQ-DQ';
      const map = new mapboxgl.Map({

        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng,lat],
        zoom: 13
      });
      map.addControl(new mapboxgl.FullscreenControl());

      const geocoder = new  MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
          color: 'orange'
        },
        mapboxgl: mapboxgl
      });

      map.addControl(geocoder);

      const marker = new mapboxgl.Marker()

      marker.setLngLat([lng,lat]).addTo(map)

      geocoder.on('result', (e) => {
        console.log(e)
        marker.setLngLat(e.result.center).addTo(map)
        _this.eventsTempData.location = e.result.place_name
        _this.eventsTempData.lng = e.result.center[0]
        _this.eventsTempData.lat = e.result.center[1]

      })

      geocoder.on('clear', (e) => {
        console.log(e)
        _this.eventsTempData.location = ''
        _this.eventsTempData.lng = ''
        _this.eventsTempData.lat = ''
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
    chooseProvince(e, value) {
      console.log(e)
      if (value === 2) {
        this.eventsTempData.province = e.id
        this.eventsTempData.province_name = e.name
        this.eventsTempData.city = undefined
        this.eventsTempData.city_name = undefined
        this.eventsTempData.district = undefined
        this.eventsTempData.district_name = undefined
      }

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
    chooseCity(e, value) {
      if (value === 2) {
        this.eventsTempData.city = e.id
        this.eventsTempData.city_name = e.name
        this.eventsTempData.district_name = undefined
        this.eventsTempData.district = undefined
      }

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
    chooseDistrict(e, value) {
      // console.log(e)

      if (value === 2) {
        this.eventsTempData.district = e.id
        this.eventsTempData.district_name = e.name
      }

      this.$forceUpdate()
    },
    getUserObjList() {
      userObjectList({ pid: 71 }).then(res => {
        console.log(res)
        this.popuCityList = res.message
      })
    },
    eventsTempDateChange(e) {
      this.eventsTempData.date = format(e, 'yyyy-MM-dd')
    },
    eventStartTimeChange(e) {
      console.log(e)
      this.eventStartTime = this.eventsTempData.date + ' ' + e + ':00'
    },
    eventEndTimeChange(e) {
      console.log(e)
      this.eventEndTime = this.eventsTempData.date + ' ' + e + ':00'
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {

          if (this.eventStartTime != undefined) {
            this.eventsTempData.start_time = this.eventStartTime
          }
          if (this.eventEndTime != undefined) {
            this.eventsTempData.end_time = this.eventEndTime
          }
          const tempData = Object.assign({}, this.eventsTempData)
          // console.log(tempData)
          // return;
          this.$confirm('Sure you want to perform the operation?', 'Tips', {
            confirmButtonText: 'Sure',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true
          }).then(() => {
            addEvent(tempData).then(() => {
              this.$message({
                type: 'success',
                message: 'Successfully!'
              });
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Canceled Successfully'
            });
          });

        }
      })
    },
    flyerHttpRequest(options) {
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
                self.eventsFileUrl = myFileUrl
                self.eventsTempData.file = myFileUrl
                self.eventsTempData.file_name = myFileName
                self.eventsFileList = [{name: myFileName, url: myFileUrl}]
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
                self.eventsFileUrl = myFileUrl
                self.eventsTempData.file = myFileUrl
                self.eventsTempData.file_name = myFileName
                self.eventsFileList = [{name: myFileName, url: myFileUrl}]
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

                self.eventsTempData.third_com_logo = myFileUrl
                self.eventsLogoFileList = [{name: myFileName, url: myFileUrl}]

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

                self.eventsTempData.third_com_logo = myFileUrl
                self.eventsLogoFileList = [{name: myFileName, url: myFileUrl}]
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

                self.eventsTempData.third_com_bg = myFileUrl
                self.eventsHeaderPhotoFileList = [{name: myFileName, url: myFileUrl}]
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

                self.eventsTempData.third_com_bg = myFileUrl
                self.eventsHeaderPhotoFileList = [{name: myFileName, url: myFileUrl}]
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

    }


  }
}
</script>
<style>
.events-container{
  width: 96%;
  margin: 0 auto;
}
</style>
