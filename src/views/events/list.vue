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
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="Deal/Discount For ESL Passport Members">
              <span>{{ props.row.type_desc }}</span>
            </el-form-item>
            <el-form-item label="Event Desc">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.province>0 && props.row.provinces != null" label="Event Province">
              <span>{{ props.row.provinces.Pinyin }}</span>
              <span>{{ props.row.provinces.ShortName }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.city>0 && props.row.citys != null" label="Event City">
              <span>{{ props.row.citys.Pinyin }}</span>
              <span>{{ props.row.citys.ShortName }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.district>0 && props.row.districts != null" label="Event District">
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
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Event Name" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Event Flyer" width="150px" align="center">
        <template slot-scope="{row}">
          <a :href="row.file">{{ row.file_name }}</a>
          <!--          <span>{{ row.file}}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="Event Type" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.is_all == 1">Social</span>
          <span v-if="row.is_all == 2">Professional</span>
        </template>
      </el-table-column>
      <el-table-column label="Reason" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reason }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Event Price" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pay_money }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Status" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag v-if="row.status === 0" :type="row.status | statusFilter">
            Pending
          </el-tag>
          <el-tag v-if="row.status === 1" :type="row.status | statusFilter">
            Passed
          </el-tag>
          <el-tag v-if="row.status === 2" :type="row.status | statusFilter">
            Refuse
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleReview(row)">
            Review
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--    events-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormEventsVisible">
      <el-form ref="dataForm" :model="eventsTempData" label-position="top" label-width="240px">
        <el-form-item label="Event Type">
          <el-select v-model="eventsTempData.is_all" class="filter-item" placeholder="Please select">
            <el-option v-for="item in eventsOne" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Event Name">
          <el-input v-model="eventsTempData.name" class="filter-item" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Deal/Discount For ESL Passport Members">
          <el-input v-model="eventsTempData.type_desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Event Description">
          <el-input v-model="eventsTempData.desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>

        <el-form-item label="Event Price">
          <el-input v-model="eventsTempData.pay_money" type="number" class="filter-item" placeholder="Please select" />
        </el-form-item>
        <el-form-item label="Place/Shop">
          <el-input v-model="eventsTempData.event_place" class="filter-item" placeholder="Please select" />
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

        <el-form-item label="Event Detail Address">
          <el-input v-model="eventsTempData.location" class="filter-item" placeholder="Please select" />
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
            name="file[]"
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="uploadEventsFileSuccess"
            :file-list="eventsFileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
          </el-upload>
        </el-form-item>

        <el-form-item label="Event Logo">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="uploadEventsLogoSuccess"
            :file-list="eventsLogoFileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>

        <el-form-item label="Event Header Photo">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action="uploadRequestUrl"
            multiple
            list-type="picture"
            :limit="1"
            :on-success="uploadEventsHeaderPhotoSuccess"
            :file-list="eventsHeaderPhotoFileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>

        <el-form-item label="Event Company Name">
          <el-input v-model="eventsTempData.third_com_name" class="filter-item" placeholder="Please input " />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEventsVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="updateData">
          Confirm
        </el-button>
      </div>
    </el-dialog>
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

  </div>
</template>

<script>
import { eventsList, approveEvent, addEvent } from '@/api/events'
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
        2: 'danger'
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
        third_com_bg: undefined
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
    this.getList()
    this.getAreas()
    this.getUserObjList()
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
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      eventsList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.message.data
        this.total = response.message.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
    handleUpdate(row) {
      console.log(row)
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
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
