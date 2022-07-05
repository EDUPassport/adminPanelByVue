<template>
  <div class="app-container">

    <div class="deals-container">
      <el-form
        ref="dataForm"
        :model="dealsTempData"
        label-position="top"
        label-width="240px"
      >
        <el-form-item label="Deal Ranking Time">
          <el-date-picker
            v-model="dealsTempData.deal_ranking_time"
            type="datetime"
            placeholder="Please pick a date"
            @change="dealRankingDueDateChange"
          />
        </el-form-item>
        <el-form-item label="Deal or Discount">
          <el-select
            v-model="dealsTempData.type"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in dealsType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Deal/Discount Name">
          <el-input
            v-model="dealsTempData.title"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="Deal/Discount Desc">
          <el-input
            v-model="dealsTempData.desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="Multiple Locations or 1">
          <el-select
            v-model="dealsTempData.is_all"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in dealsTwo"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Online">
          <el-select
            v-model="dealsTempData.is_online"
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
        <el-form-item label="Location">
          <el-select
            v-model="dealsTempData.province_name"
            placeholder="Province"
            @change="chooseProvince($event,1)"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.Pinyin"
              :value="{id:item.id,name:item.Pinyin}"
            />
          </el-select>
          <el-select
            v-model="dealsTempData.city_name"
            placeholder="City"
            @change="chooseCity($event,1)"
          >
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.Pinyin"
              :value="{id:item.id,name:item.Pinyin}"
            />
          </el-select>
          <el-select
            v-model="dealsTempData.district_name"
            placeholder="District"
            @change="chooseDistrict($event,1)"
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

        <el-form-item label="Deal/Discount Duration">
          <el-input
            v-model="dealsTempData.due_contract"
            type="number"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="Dog Friendly">
          <el-select
            v-model="dealsTempData.allowed_dog"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in allowedDogOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Url">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            action=""
            multiple
            list-type="picture"
            :limit="1"
            :http-request="imageHttpRequest"
            :file-list="fileList"
          >
            <i class="el-icon-upload"/>
            <div class="el-upload__text">
              Drag the file here, or <em>click to upload</em>
            </div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
      </el-form>

      <div>
        <el-button type="primary" @click="editData()">Confirm</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import {addDeals, dealsDetail} from '@/api/deals'
import {userObjectList} from '@/api/member'
import waves from '@/directive/waves' // waves directive
import {format} from 'date-fns' // secondary package based on el-pagination
import {getAreas} from '@/api/location'

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import 'mapbox-gl/dist/mapbox-gl.css';
import {uploadByAliOSS, uploadByService} from '@/api/upload.js'
import ImageCompressor from 'compressorjs'

export default {
  name: 'Index',
  components: {},
  directives: {waves},
  filters: {},
  data() {
    return {
      provinceList: [],
      cityList: [],
      districtList: [],
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      dealsType: [{label: 'Deal', value: 1}, {label: 'Discount', value: 2}],
      dealsTwo: [{label: 'All Locations', value: 1}, {label: 'Limited', value: 0}],
      dealsThree: [{label: '1 year', value: 1}, {label: '2 year', value: 2}],
      dealsFour: [{label: 'Shanghai', value: 1}, {label: 'Other', value: 0}],
      allowedDogOptions: [{label: 'Yes', value: 1}, {label: 'No', value: 0}],
      userListData: [],
      popuCityList: [],
      onlineOptions: [{label: 'online', value: 1}, {label: 'offline', value: 2},{label: 'both', value: 3}],
      dealsTempData: {
        user_id: 1,
        type: undefined,
        is_all: undefined,
        file: undefined,
        due_contract: undefined,
        pay_money: undefined,
        title: undefined,
        desc: undefined,
        deal_id: undefined,
        province: undefined,
        province_name: undefined,
        city: undefined,
        city_name: undefined,
        district: undefined,
        district_name: undefined,
        location: undefined,
        identity: undefined,
        file_name: undefined,
        allowed_dog: undefined,
        deal_ranking_time: undefined,
        lng: undefined,
        lat: undefined,
        is_online:undefined

      },
      fileUrl: undefined,
      fileList: undefined,
      rules: {
        type: [{required: true, message: 'status is required', trigger: 'change'}]
      },
      downloadLoading: false,
      fileName: undefined

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
    const dealId = this.$route.query.deal_id
    if (uid) {
      this.dealsTempData.user_id = uid;
    }
    if(dealId){
      this.getDealsDetail(dealId)
    }
    this.getAreas()
    // this.getUserList()
    this.getUserObjList()
  },
  mounted() {

  },
  methods: {
    getDealsDetail(dealId) {
      const params = {
        deal_id: dealId
      }
      dealsDetail(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          // this.dealDetailData = res.message
          const detailData = res.message

          if (res.message.location) {
            this.dealsTempData.location = res.message.location
          }
          if (res.message.lat) {
            this.dealsTempData.lat = res.message.lat
          }
          if (res.message.lng) {
            this.dealsTempData.lng = res.message.lng
          }
          if(res.message.lng && res.message.lat ){
            this.initMap(res.message.lng,res.message.lat)
          }else{
            this.initMap(121.472644, 31.231706)
          }

          this.dealsTempData = Object.assign({}, detailData) // copy obj
          this.dealsTempData.deal_id = detailData.id
          if (detailData.deal_ranking_time === '0000-00-00 00:00:00') {
            this.dealsTempData.deal_ranking_time = undefined
          }
          if (detailData.province > 0 && detailData.provinces != null) {
            this.dealsTempData.province_name = detailData.provinces.Pinyin
          }
          if (detailData.city > 0 && detailData.citys != null) {
            this.dealsTempData.city_name = detailData.citys.Pinyin
          }
          if (detailData.district > 0 && detailData.districts != null) {
            this.dealsTempData.district_name = detailData.districts.Pinyin
          }
          const file = res.message.file
          if (file !== '') {
            this.fileList = [{name: '', url: file}]
          } else {
            this.fileList = undefined
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
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
        _this.dealsTempData.location = e.result.place_name
        _this.dealsTempData.lng = e.result.center[0]
        _this.dealsTempData.lat = e.result.center[1]

      })

      geocoder.on('clear', (e) => {
        console.log(e)
        _this.dealsTempData.location = ''
        _this.dealsTempData.lng = ''
        _this.dealsTempData.lat = ''
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
      if (value === 1) {
        this.dealsTempData.province = e.id
        this.dealsTempData.province_name = e.name
        this.dealsTempData.city = undefined
        this.dealsTempData.city_name = undefined
        this.dealsTempData.district = undefined
        this.dealsTempData.district_name = undefined
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
      if (value === 1) {
        this.dealsTempData.city = e.id
        this.dealsTempData.city_name = e.name
        this.dealsTempData.district = undefined
        this.dealsTempData.district_name = undefined
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
    chooseDistrict(e) {
      this.dealsTempData.district = e.id
      this.dealsTempData.district_name = e.name
      console.log(this.dealsTempData)
      this.$forceUpdate()
    },
    dealRankingDueDateChange(e) {
      console.log(format(e, 'yyyy-MM-dd HH:mm:ss'))
      this.dealsTempData.deal_ranking_time = format(e, 'yyyy-MM-dd HH:mm:ss')
    },
    getUserObjList() {
      userObjectList({pid: 71}).then(res => {
        this.popuCityList = res.message
      })
    },
    imageHttpRequest(options) {
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
                self.dealsTempData.file = myFileUrl
                self.dealsTempData.file_name = myFileName
                self.fileList = [{name: myFileName, url: myFileUrl}]

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
                self.dealsTempData.file = myFileUrl
                self.dealsTempData.file_name = myFileName
                self.fileList = [{name: myFileName, url: myFileUrl}]
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
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.dealsTempData)
          this.$confirm('Sure you want to perform the operation?', 'Tips', {
            confirmButtonText: 'Sure',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true
          }).then(() => {
            addDeals(tempData).then(() => {
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
    }

  }
}
</script>

<style>
.app-container {
  width: 96%;
  margin: 0 auto;
}
</style>
