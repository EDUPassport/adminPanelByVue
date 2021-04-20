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
            <el-form-item label="Deal Description">
              <pre>{{ props.row.desc }}</pre>
            </el-form-item>
            <el-form-item label="Multiple Locations or 1">
              <span v-if="props.row.is_all==1">All Locations</span>
              <span v-if="props.row.is_all==0">Limited</span>
            </el-form-item>
            <el-form-item label="Deal/Discount">
              <span v-if="props.row.type==1">Deal</span>
              <span v-if="props.row.type==2">Discount</span>
            </el-form-item>
            <el-form-item v-if="props.row.provinces != null && props.row.citys != null && props.row.districts != null" label="Location">
              <span>{{ props.row.districts.Pinyin }}, {{ props.row.citys.Pinyin }}, {{ props.row.provinces.Pinyin }}</span>
              <span>{{ props.row.districts.ShortName }}, {{ props.row.citys.ShortName }}, {{ props.row.provinces.ShortName }}</span>
            </el-form-item>
            <el-form-item label="Company Name (EN)">
              <span> {{ props.row.user_info.vendor_name_en }}</span>
            </el-form-item>
            <el-form-item label="Legal Company Name">
              <span> {{ props.row.user_info.legal_company_name }}</span>
            </el-form-item>
            <el-form-item label="Vendor Type Name">
              <span> {{ props.row.user_info.vendor_type_name }}</span>
            </el-form-item>
            <el-form-item label="Work Email">
              <span> {{ props.row.user_info.work_email }}</span>
            </el-form-item>
            <el-form-item label="Wechat Id">
              <span> {{ props.row.user_info.wx_id }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="User Id" prop="user_id" width="80">
        <template slot-scope="{row}">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="First&&Last Name" width="150">
        <template v-if="row.user_info" slot-scope="{row}">
          {{ row.user_info.first_name }} {{ row.user_info.last_name }}
        </template>
      </el-table-column>
      <el-table-column label="Deal/Discount Name" width="200px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.title">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Participating Locations" width="150px" align="center">
        <template slot-scope="{row}">
          <a :href="row.file">{{ row.file_name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="City" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.city>0 && row.citys != null ">{{ row.citys.Pinyin }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Detail address" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.location">{{ row.location }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Reason" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reason }}</span>
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
          <el-button type="primary" size="mini" @click="handleEdit(row)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!--    deals-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormDealsVisible">
      <el-form ref="dataForm" :model="dealsTempData" label-position="top" label-width="240px">
        <el-form-item label="Deal Ranking Time">
          <el-date-picker
            v-model="dealsTempData.deal_ranking_time"
            type="datetime"
            placeholder="Please pick a date"
            @change="dealRankingDueDateChange"
          />
        </el-form-item>
        <el-form-item label="Deal or Discount">
          <el-select v-model="dealsTempData.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in dealsType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Deal/Discount Name">
          <el-input v-model="dealsTempData.title" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Deal/Discount Desc">
          <el-input v-model="dealsTempData.desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Multiple Locations or 1">
          <el-select v-model="dealsTempData.is_all" class="filter-item" placeholder="Please select">
            <el-option v-for="item in dealsTwo" :key="item.value" :label="item.label" :value="item.value" />
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

        <el-form-item label="Detail Address">
          <el-input v-model="dealsTempData.location" class="filter-item" placeholder="Please select" />
        </el-form-item>
        <el-form-item label="Deal/Discount Duration">
          <el-select v-model="dealsTempData.due_contract" class="filter-item" placeholder="Please select">
            <el-option v-for="item in dealsThree" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Dog Friendly">
          <el-select v-model="dealsTempData.allowed_dog" class="filter-item" placeholder="Please select">
            <el-option v-for="item in allowedDogOptions" :key="item.value" :label="item.label" :value="item.value" />
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
            <i class="el-icon-upload" />
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormDealsVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="editData()">
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
import { dealsList, approveDeal, addDeals } from '@/api/deals'
import { userObjectList } from '@/api/member'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import { format } from 'date-fns' // secondary package based on el-pagination
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
      dealsType: [{ label: 'Deal', value: 1 }, { label: 'Discount', value: 2 }],
      dealsTwo: [{ label: 'All Locations', value: 1 }, { label: 'Limited', value: 0 }],
      dealsThree: [{ label: '1 year', value: 1 }, { label: '2 year', value: 2 }],
      dealsFour: [{ label: 'Shanghai', value: 1 }, { label: 'Other', value: 0 }],
      allowedDogOptions: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }],
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
        deal_ranking_time: undefined

      },
      fileUrl: undefined,
      fileList: undefined,

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
      statusOptions: [{ label: 'Pending', value: 0 }, { label: 'passed', value: 1 }, { label: 'refuse', value: 2 }],
      temp: {
        deal_id: undefined,
        reason: '',
        status: undefined
      },
      dialogFormVisible: false,
      dialogFormDealsVisible: false,
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
    this.getList()
    this.getAreas()
    // this.getUserList()
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
      userObjectList({ pid: 71 }).then(res => {
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
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      dealsList(this.listQuery).then(response => {
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
    handleEdit(row) {
      this.dealsTempData = Object.assign({}, row) // copy obj
      this.dealsTempData.deal_id = row.id
      if (row.deal_ranking_time === '0000-00-00 00:00:00') {
        this.dealsTempData.deal_ranking_time = undefined
      }
      if (row.province > 0 && row.provinces != null) {
        this.dealsTempData.province_name = row.provinces.Pinyin
      }
      if (row.city > 0 && row.citys != null) {
        this.dealsTempData.city_name = row.citys.Pinyin
      }
      if (row.district > 0 && row.districts != null) {
        this.dealsTempData.district_name = row.districts.Pinyin
      }
      this.dialogStatus = 'update'
      this.dialogFormDealsVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.dealsTempData)

          addDeals(tempData).then(() => {
            this.getList()
            this.dialogFormDealsVisible = false
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
    handleReview(row) {
      // this.temp = Object.assign({}, row)
      this.temp.deal_id = row.id
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
          approveDeal(tempData).then((res) => {
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
