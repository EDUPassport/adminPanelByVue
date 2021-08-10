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

        <!--        <el-form-item label="Detail Address">-->
        <!--          <el-input v-model="dealsTempData.location" class="filter-item" placeholder="Please select" />-->
        <!--        </el-form-item>-->
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
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="uploadFileSuccess"
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
import Pagination from '@/components/Pagination'
import {format} from 'date-fns' // secondary package based on el-pagination
import {getAreas} from '@/api/location'
import {AMapManager} from 'vue-amap'

const amapManager = new AMapManager()
export default {
  name: 'Index',
  components: {Pagination},
  directives: {waves},
  filters: {},
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
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      dealsType: [{label: 'Deal', value: 1}, {label: 'Discount', value: 2}],
      dealsTwo: [{label: 'All Locations', value: 1}, {label: 'Limited', value: 0}],
      dealsThree: [{label: '1 year', value: 1}, {label: '2 year', value: 2}],
      dealsFour: [{label: 'Shanghai', value: 1}, {label: 'Other', value: 0}],
      allowedDogOptions: [{label: 'Yes', value: 1}, {label: 'No', value: 0}],
      userListData: [],
      popuCityList: [],

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
        lat: undefined

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
    this.initMapByInput()
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
          if(detailData.lat){
            this.mapInfo.lat = detailData.lat
          }
          if(detailData.lng){
            this.mapInfo.lng = detailData.lng
          }
          if(detailData.lat && detailData.lng){
            this.mapInfo.lnglat = [detailData.lng, detailData.lat]
          }
          if(detailData.location){
            this.mapInfo.address = detailData.location
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
    chooseDistrict(e, value) {
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
    uploadFileSuccess(response, file, fileList) {
      if (response.code == 200) {
        this.dealsTempData.file = response.data[0].file_url
        this.dealsTempData.file_name = file.name
      } else {
        console.log(response.msg)
      }
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dealsTempData.lat = this.mapInfo.lat
          this.dealsTempData.lng = this.mapInfo.lng
          this.dealsTempData.location = this.mapInfo.address

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
