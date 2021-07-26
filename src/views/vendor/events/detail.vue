<template>
  <div class="app-container">
    <div class="detail-container">
      <div class="detail-item">
        <div class="title">Header Photo</div>
        <div class="content">
          <el-image :src="detailData.userInfo.header_photo"></el-image>
        </div>
      </div>
      <div class="detail-item">
        <div class="title">Profile Photo</div>
        <div class="content">
          <el-image :src="detailData.userInfo.profile_photo"></el-image>
        </div>
      </div>
      <div class="detail-item">
        <div class="title">Event Name</div>
        <div class="content"><span>{{detailData.name}}</span></div>
      </div>
      <div class="detail-item">
        <div class="title">Vendor Name</div>
        <div class="content"><span>{{detailData.userInfo.vendor_name_en}}</span></div>
      </div>
      <div class="detail-item">
        <div class="title">Event Place</div>
        <div class="content"><span>{{detailData.event_place}}</span></div>
      </div>
      <div class="detail-item">
        <div class="title">Event Type</div>
        <div class="content"><span>{{detailData.is_all}}</span></div>
      </div>
      <div class="detail-item">
        <div class="title">Event Desc</div>
        <div class="content"><span>{{detailData.desc}}</span></div>
      </div>
      <div class="detail-item">
        <div class="title">Event Date</div>
        <div class="content"><span>{{detailData.date}}</span></div>
      </div>
      <div class="detail-item">
        <div class="title">Event Start Time</div>
        <div class="content"><span>{{detailData.start_time}}</span></div>
      </div>
      <div class="detail-item">
        <div class="title">Event End Time</div>
        <div class="content"><span>{{detailData.end_time}}</span></div>
      </div>
      <div class="detail-item">
        <div class="title">Event Flyer</div>
        <div class="content">
          <el-image :src="detailData.file"></el-image>
        </div>
      </div>
      <div class="detail-item">
        <div class="title">Ticket Price</div>
        <div class="content"><span>{{detailData.pay_money}}</span></div>
      </div>
      <div class="detail-item">
        <div class="title">Deal/Discount For Esl Passport Members</div>
        <div class="content"><span>{{detailData.type_desc}}</span></div>
      </div>
      <div class="detail-item">
        <div class="title">Location</div>
        <div class="content" v-if="detailData.districts.Pinyin && detailData.citys.Pinyin && detailData.provinces.Pinyin">
          <span>{{detailData.districts.Pinyin}}, {{detailData.citys.Pinyin}}, {{detailData.provinces.Pinyin}}</span>
        </div>
      </div>
      <div class="detail-item">
        <div class="title">Address</div>
        <div class="content"><span>{{detailData.location}}</span></div>
      </div>
      <div class="detail-item">
        <div class="title">Third Company Background</div>
        <div class="content">
          <el-image :src="detailData.third_com_bg"></el-image>
        </div>
      </div>
      <div class="detail-item">
        <div class="title">Third Company logo</div>
        <div class="content">
          <el-image :src="detailData.third_com_logo"></el-image>
        </div>
      </div>
      <div class="detail-item">
        <div class="title">Third Company Name</div>
        <div class="content"><span>{{detailData.third_com_name}}</span></div>
      </div>


    </div>
  </div>
</template>

<script>
import { eventDetail } from '@/api/events'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import { userObjectList } from '@/api/member' // secondary package based on el-pagination
import { format } from 'date-fns'
import { getAreas } from '@/api/location'
import {AMapManager} from 'vue-amap'

const amapManager = new AMapManager()
export default {
  name: 'Index',
  components: { Pagination },
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
      detailData:''

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
    this.initMapByInput()
    const eventId = this.$route.query.event_id
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
          this.detailData = res.message;
        }else{
          this.$message.error(res.msg)
        }
      }).catch(err=>{
        console.log(err)
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
          this.eventsTempData.lat = this.mapInfo.lat
          this.eventsTempData.lng = this.mapInfo.lng
          this.eventsTempData.location = this.mapInfo.address

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
    uploadEventsFileSuccess(response, file, eventsFileList) {
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.eventsFileUrl = response.data[0].file_url
        this.eventsTempData.file = response.data[0].file_url
        this.eventsTempData.file_name = file.name
        // const file_name = response.data[0].file_name
      } else {
        console.log(response.msg)
      }
    },
    uploadEventsLogoSuccess(response, file, fileList) {
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.eventsLogoFileList = [{ name: '', url: response.data[0].file_url }]
        this.eventsTempData.third_com_logo = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    },
    uploadEventsHeaderPhotoSuccess(response, file, fileList) {
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.eventsHeaderPhotoFileList = [{ name: '', url: response.data[0].file_url }]
        this.eventsTempData.third_com_bg = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    }

  }
}
</script>
<style scoped>
  .detail-container{
    width: 96%;
    margin: 0 auto;
    padding: 0 20px;
  }
  .detail-item{
    margin-top: 10px;
    padding: 10px;
  }
  .title{
    font-weight: bold;
    font-size: 18px;
    padding: 10px 0;
    border-bottom: 1px dashed #808080;
  }
  .content{
    margin-top: 10px;
    padding-left: 20px;
  }

  .content span{
    color: #2b2f3a;
  }

</style>
