<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-form-item label="Deal/Discount For ESL Passport Members">
              <span>{{ props.row.type_desc }}</span>
            </el-form-item>
            <el-form-item label="Event Desc">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item
              v-if="props.row.province>0 && props.row.provinces != null"
              label="Event Province"
            >
              <span>{{ props.row.provinces.Pinyin }}</span>
              <span>{{ props.row.provinces.ShortName }}</span>
            </el-form-item>
            <el-form-item
              v-if="props.row.city>0 && props.row.citys != null"
              label="Event City"
            >
              <span>{{ props.row.citys.Pinyin }}</span>
              <span>{{ props.row.citys.ShortName }}</span>
            </el-form-item>
            <el-form-item
              v-if="props.row.district>0 && props.row.districts != null"
              label="Event District"
            >
              <span>{{ props.row.districts.Pinyin }}</span>
              <span>{{ props.row.districts.ShortName }}</span>
            </el-form-item>
            <el-form-item label="Event Detail Address">
              <span>{{ props.row.location }}</span>
            </el-form-item>
            <el-form-item label="Date">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="Start Time">
              <span>{{ props.row.start_time }}</span>
            </el-form-item>
            <el-form-item label="End Time">
              <span>{{ props.row.end_time }}</span>
            </el-form-item>
            <el-form-item label="Company Name">
              <span>{{ props.row.third_com_name }}</span>
            </el-form-item>
            <el-form-item label="Logo">
              <el-image
                style="width: 100px; height: 100px"
                :src="props.row.third_com_logo"
                fit="fill"
              />
            </el-form-item>
            <el-form-item label="Header Photo">
              <el-image
                style="width: 200px; height: 100px"
                :src="props.row.third_com_bg"
                fit="fill"
              />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Event Name"
        width="150px"
        align="center"
      >
        <template v-slot="{row}">
          <span @click="handleDetail(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Event Flyer"
        width="150px"
        align="center"
      >
        <template v-slot="{row}">
          <el-image
            style="width: 180px; height:80px"
            :src="row.file"
            fit="contain"
          />

        </template>
      </el-table-column>
      <el-table-column
        label="Event Type"
        width="150px"
        align="center"
      >
        <template v-slot="{row}">
          <span v-if="row.is_all == 1">Social</span>
          <span v-if="row.is_all == 2">Professional</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Reason"
        width="150px"
        align="center"
      >
        <template v-slot="{row}">
          <span>{{ row.reason }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Event Price"
        width="110px"
        align="center"
      >
        <template v-slot="{row}">
          <span>{{ row.pay_money }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Start Time"
        width="160px"
        align="center"
      >
        <template v-slot="{row}">
          <span>{{ row.start_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="End Time"
        width="160px"
        align="center"
      >
        <template v-slot="{row}">
          <span>{{ row.end_time }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Create Time"
        width="160px"
        align="center"
      >
        <template v-slot="{row}">
          <span>{{ row.c_time }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Status"
        class-name="status-col"
        width="100"
      >
        <template v-slot="{row}">
          <el-tag
            v-if="row.status === 0"
            :type="row.status | statusFilter"
          >
            Pending
          </el-tag>
          <el-tag
            v-if="row.status === 1"
            :type="row.status | statusFilter"
          >
            Passed
          </el-tag>
          <el-tag
            v-if="row.status === 2"
            :type="row.status | statusFilter"
          >
            Rejected
          </el-tag>
          <el-tag
            v-if="row.status === 3"
            :type="row.status | statusFilter"
          >
            Expired
          </el-tag>
          <el-tag
            v-if="row.status === 4"
            :type="row.status | statusFilter"
          >
            Submitted
          </el-tag>
          <el-tag
            v-if="row.status === 5"
            :type="row.status | statusFilter"
          >
            Canceled
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Set Featured"
        align="center"
        width="130"
        class-name="small-padding fixed-width"
      >
        <template v-slot="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="handleEventFeatured(row)"
          >
            Set
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Booking List"
        align="center"
        width="130"
        class-name="small-padding fixed-width"
      >
        <template v-slot="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="handleBookingList(row)"
          >
            View List
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template v-slot="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="handleReview(row)"
          >
            Review
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="paginationEvent"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.reason" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="reviewData">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="Set Featured" :visible.sync="dialogFeaturedVisible">
       <div>
         <el-select v-model="featuredValue" class="filter-item" placeholder="Please select">
           <el-option v-for="item in featuredOptions" :key="item.value" :label="item.label" :value="item.value" />
         </el-select>
       </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFeaturedVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="submitEventFeatured">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="Booking List"
               :visible.sync="bookingDialogVisible">
      <el-table :data="bookingListData"
                :max-height="400"
      >
        <el-table-column property="first_name" label="First Name" width="150"></el-table-column>
        <el-table-column property="last_name" label="Last Name" width="200"></el-table-column>
        <el-table-column property="contact" label="Email"></el-table-column>
        <el-table-column property="bookings" label="Bookings"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import {eventsList, approveEvent, addEvent, addFeaturedEvent} from '@/api/events'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import { userObjectList } from '@/api/member' // secondary package based on el-pagination
import { format } from 'date-fns'
import { getAreas } from '@/api/location'

export default {
  name: 'Index',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info',
        2: 'danger',
        3:'warning',
        4:'warning',
        5:'danger'
      }
      return statusMap[status]
    }

  },
  data() {
    return {
      provinceList: [],
      cityList: [],
      districtList: [],
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        identity:2,
        page: 1,
        limit: 50,
        pay_money: undefined,
        status: undefined
      },
      statusOptions: [
        { label: 'Pending', value: 0 },
        { label: 'Successful', value: 1 },
        { label: 'Rejected', value: 2 },
        { label: 'Expired', value:3 },
        { label: 'Submitted', value:4 },
        { label: 'Canceled', value:4 }
      ],
      featuredOptions:[
        {
          label:'Yes',
          value:1
        },
        {
          label:'No',
          value:0
        }
      ],
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
      popuCityList: [],
      bookingListData:[],
      bookingDialogVisible:false,
      featuredValue:0,
      featuredEventId:0,
      dialogFeaturedVisible:false

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

    let page = this.$route.query.page;
    let limit = this.$route.query.limit;

    if(page){
      this.listQuery.page = Number(page)
    }
    if(limit){
      this.listQuery.limit = Number(limit)
    }

    this.getList()
    this.getAreas()
    this.getUserObjList()
  },
  mounted() {

  },
  methods: {
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
    paginationEvent(e){
      this.$router.push({path:'/business/events/list',query:{page:e.page, limit:e.limit}})
      this.getList()
    },
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      eventsList(this.listQuery).then(res => {
        if(res.code == 200){
          this.list = res.message.data
          this.total = res.message.total
          this.listLoading = false
        }
      }).catch(err=>{
        console.log(err)
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDetail(row){
      this.$router.push({ path: '/business/events/detail', query: { event_id: row.id }})
    },
    handleUpdate(row) {
      this.$router.push({ path: '/business/events/editEvents', query: { event_id: row.id }})
    },
    handleBookingList(row){
      this.bookingListData = row.applicants
      this.bookingDialogVisible = true;
    },
    handleEventFeatured(row){
      // console.log(row)
      this.dialogFeaturedVisible = true
      this.featuredEventId = row.id

    },
    submitEventFeatured(){
      let params = {
        id:this.featuredEventId,
        is_recommend:this.featuredValue
      }

      addFeaturedEvent(params).then(res=>{
        console.log(res)
        if(res.code === 200){
          this.$message.success('Success')
          this.dialogFeaturedVisible = false
        }
      }).catch(err=>{
        console.log(err)
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
          addEvent(tempData).then(() => {
            this.getList()
            this.dialogFormEventsVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    uploadEventsFileSuccess(response, file) {
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
    uploadEventsLogoSuccess(response) {
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
    uploadEventsHeaderPhotoSuccess(response) {
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.eventsHeaderPhotoFileList = [{ name: '', url: response.data[0].file_url }]
        this.eventsTempData.third_com_bg = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    },
    handleReview(row) {
      // this.temp = Object.assign({}, row)
      this.temp.event_id = row.id
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    reviewData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)

          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          approveEvent(tempData).then((res) => {
            // console.log(res)
            if (res.code == 200) {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }
      })
    },

    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
