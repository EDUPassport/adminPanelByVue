<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.work_email"
        placeholder="Work Email"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.vendor_name"
        placeholder="Vendor Name"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.country"
        placeholder="Country"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.province"
        placeholder="Province"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.city"
        placeholder="City"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.phone"
        placeholder="Phone"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>
    </div>

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
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-form-item label="Nickname">
              <span>{{ props.row.nickname }}</span>
            </el-form-item>
            <el-form-item label="Business Reg Number">
              <span>{{ props.row.busin_reg_num }}</span>
            </el-form-item>
            <el-form-item label="Province">
              <span>{{ props.row.province }}</span>
            </el-form-item>
            <el-form-item label="City">
              <span>{{ props.row.city }}</span>
            </el-form-item>
            <el-form-item label="District">
              <span>{{ props.row.district }}</span>
            </el-form-item>
            <el-form-item
              v-if="props.row.address !=''"
              label="Address"
            >
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="First Language">
              <span>{{ props.row.first_language }}</span>
            </el-form-item>
            <el-form-item label="Dog Friendly">
              <span v-if="props.row.is_dog_friendly==1">Yes</span>
              <span v-if="props.row.is_dog_friendly==0">Unknown</span>
            </el-form-item>
            <el-form-item label="Event">
              <span v-if="props.row.is_events==1">Yes</span>
              <span v-if="props.row.is_events==0">Unknown</span>
            </el-form-item>
            <el-form-item label="Job Title">
              <span>{{ props.row.job_title }}</span>
            </el-form-item>
            <el-form-item label="Nationality">
              <span>{{ props.row.nationality }}</span>
            </el-form-item>
            <el-form-item label="Vendor Bio">
              <span>{{ props.row.vendor_bio }}</span>
            </el-form-item>
            <el-form-item label="Legal Company Name">
              <span>{{ props.row.legal_company_name }}</span>
            </el-form-item>
            <el-form-item label="Company Name(EN)">
              <span>{{ props.row.vendor_name_en }}</span>
            </el-form-item>
            <el-form-item label="Category">
              <span>{{ props.row.vendor_type_name }}</span>
            </el-form-item>

            <el-form-item label="Email">
              <span>{{ props.row.work_email }}</span>
            </el-form-item>
            <el-form-item label="Website">
              <span>{{ props.row.website }}</span>
            </el-form-item>
            <el-form-item label="Company Wechat">
              <span>{{ props.row.wechat_public_name }}</span>
            </el-form-item>
            <el-form-item
              v-if="props.row.busin_reg_img !='' "
              label="Business Reg img"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.busin_reg_img"
                :preview-src-list="[props.row.busin_reg_img]"
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.profile_photo != '' "
              label="Profile Photo"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.profile_photo"
                :preview-src-list="[props.row.profile_photo]"
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.header_photo != '' "
              label="Header Photo"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.header_photo"
                :preview-src-list="[props.row.header_photo]"
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.logo != '' "
              label="Logo"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.logo"
                :preview-src-list="[props.row.logo]"
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.wechat_public_qrcode !='' "
              label="Wechat Qrcode"
            >
              <el-image
                style="width: 100px;height: 100px;"
                :src="props.row.wechat_public_qrcode"
                :preview-src-list="[props.row.wechat_public_qrcode]"
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.video_url != '' "
              label="Video"
            >
              <video
                width="200"
                :src="props.row.video_url"
                controls
              />
            </el-form-item>
            <el-form-item
              v-if="props.row.proposed_deal != '' "
              label="Proposed Deal"
            >
              <span>{{ props.row.proposed_deal }}</span>
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
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="User Id"
        prop="user_id"
        width="110"
      >
        <template slot-scope="{row}">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="First&&Last Name"
        width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.first_name }} {{ scope.row.last_name }}
        </template>
      </el-table-column>
      <el-table-column
        label="Company Name(EN)"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.vendor_name_en }}
        </template>
      </el-table-column>
      <el-table-column
        label="Wechat Id"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.wx_id }}
        </template>
      </el-table-column>
      <el-table-column
        label="Phone"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Membership Level"
        width="110"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.level == 1">Basic </span>
          <span v-if="scope.row.level == 2">Pro </span>
          <span v-if="scope.row.level == 3">Plus </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Deals(Count/Number)"
        align="center"
        width="100"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.deals_count }}
          </el-tag>
          /
          <el-tag type="info">
            {{ row.deals_num }}
          </el-tag>
          <el-button
            type="primary"
            size="mini"
            @click="handleAddDeals(row)"
          >
            Add
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Events(Count/Number)"
        align="center"
        width="100"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.event_count }}
          </el-tag>
          /
          <el-tag type="info">
            {{ row.events_num }}
          </el-tag>
          <el-button
            type="primary"
            size="mini"
            @click="handleAddEvents(row)"
          >
            Add
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
        align="center"
        width="280"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row,$index}">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleMemberLevel(row,$index)"
          >
            Upgrade
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormDealsVisible"
    >
      <el-form
        ref="dataForm"
        :model="dealsTempData"
        label-position="top"
        label-width="200px"
      >
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
        <!--          <el-input v-model="dealsTempData.location" class="filter-item" placeholder="Please input" />-->
        <!--        </el-form-item>-->
        <el-form-item label="Deal/Discount Duration">
          <el-select
            v-model="dealsTempData.due_contract"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in dealsThree"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              Drag the file here, or <em>click to upload</em>
            </div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormDealsVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="createDeals"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <!--events-->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormEventsVisible"
    >
      <el-form
        ref="dataForm"
        :model="eventsTempData"
        label-position="top"
        label-width="200px"
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
          <div class="amap-page-container">
            <!--使用element UI作为输入框-->
            <el-input
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

        <!--        <el-form-item label="Event Detail Address">-->
        <!--          <el-input v-model="eventsTempData.location" class="filter-item" placeholder="Please input "/>-->
        <!--        </el-form-item>-->

        <el-form-item label="Event Date">
          <!--          <el-input v-model="temp.birthday" />-->
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
            <div class="el-upload__text">
              Drag the file here, or <em>click to upload</em>
            </div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
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
            <div class="el-upload__text">
              Drag the file here, or <em>click to upload</em>
            </div>
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
            <div class="el-upload__text">
              Drag the file here, or <em>click to upload</em>
            </div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>

        <el-form-item label="Event Company Name">
          <el-input
            v-model="eventsTempData.third_com_name"
            class="filter-item"
            placeholder="Please input "
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormEventsVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="createEvents"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormUpgrade"
    >
      <!--      :rules="rules"-->
      <el-form
        ref="dataForm"
        :model="tempUpgrade"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          label="Identity"
          prop="identity"
        >
          <el-select
            v-model="tempUpgrade.identity"
            class="filter-item"
            placeholder="Choose Identity"
            @change="changeIdentity"
          >
            <el-option
              v-for="item in identityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Level"
          prop="levelId"
        >
          <el-select
            v-model="tempUpgrade.levelId"
            class="filter-item"
            placeholder="Choose Level"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.id"
              :label="item.level_en"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormUpgrade = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="upgradeLevel()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {
  deleteUser,
  vipList,
  changeVipLevel,
  userObjectList,
  vendorList,
  addVendorBasic
} from '@/api/member'
import waves from '@/directive/waves' // waves directive
import {parseTime} from '@/utils'
import Pagination from '@/components/Pagination'
import {addDeals} from '@/api/deals' // secondary package based on el-pagination
import {addEvent} from '@/api/events'
import {format} from 'date-fns'
import {getAreas} from '@/api/location'
import {AMapManager} from 'vue-amap'

const amapManager = new AMapManager()
export default {
  name: 'Index',
  components: {Pagination},
  directives: {waves},
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'info',
        0: 'danger',
        3: 'danger'
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
      dealsLoading: false,
      eventsLoading: false,
      provinceList: [],
      cityList: [],
      districtList: [],

      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      dealsType: [{label: 'Deal', value: 1}, {label: 'Discount', value: 2}],
      dealsTwo: [{label: 'All Locations', value: 1}, {label: 'Limited', value: 0}],
      dealsThree: [{label: '1 year', value: 1}, {label: '2 year', value: 2}],
      dealsFour: [{label: 'Shanghai', value: 1}, {label: 'Other', value: 0}],
      eventsOne: [{label: 'Social', value: 1}, {label: 'Professional', value: 2}],
      allowedDogOptions: [{label: 'Yes', value: 1}, {label: 'No', value: 0}],
      userListData: [],
      popuCityList: [],
      dialogFormDealsVisible: false,

      dealsTempData: {
        user_id: undefined,
        type: undefined,
        is_all: undefined,
        file: undefined,
        due_contract: undefined,
        pay_money: undefined,
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
        lat: undefined,
        lng: undefined
      },
      fileUrl: undefined,
      fileList: undefined,
      eventsFileUrl: undefined,

      logoFileList: undefined,
      wechatQrcodeFileList: undefined,
      eventsFileList: undefined,
      eventsLogoFileList: undefined,
      eventsHeaderPhotoFileList: undefined,
      dialogFormEventsVisible: false,
      eventsTempData: {
        user_id: undefined,
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
        lat: undefined,
        lng: undefined
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        nickname: undefined,
        truename: undefined,
        phone: undefined,
        is_educator: undefined,
        is_business: undefined,
        is_vendor: undefined,
        is_other: undefined,
        is_seeking: undefined,
        sex: undefined
      },
      percentOptions: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      seekingOptions: [{label: 'no', value: 0}, {label: 'Yes', value: 1}],
      sexOptions: [{label: 'unco', value: 0}, {label: 'Male', value: 1}, {label: 'Female', value: 2}],
      identityOptions: [{label: 'Educator', value: 1}, {label: 'Business', value: 2}, {label: 'Vendor', value: 3}],
      levelOptions: [],
      vipList: [],

      importanceOptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        user_id: undefined,
        email: undefined,
        logo: undefined,
        wechat_public_qrcode: undefined,
        wechat_public_name: undefined,
        vendor_name_en: undefined,
        vendor_bio: undefined,
        work_email: undefined
      },
      tempUpgrade: {
        identity: undefined,
        levelId: undefined
      },
      dialogFormVisible: false,
      dialogFormUpgrade: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create',
        upgrade: 'Upgrade'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // username: [{ required: true, message: 'username is required', trigger: 'change' }],
        // birthday: [{ type: 'date', required: true, message: 'birthday is required', trigger: 'change' }],
        // nickname: [{ required: true, message: 'nickname is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogUserDetailVisible: false,
      userDetailData: [],
      eventStartTime: undefined,
      eventEndTime: undefined

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
    this.getVipList()
    this.getUserObjList()
  },
  mounted() {
    this.initMapByInput()
  },
  methods: {
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
      if (value === 1) {
        this.dealsTempData.city = e.id
        this.dealsTempData.city_name = e.name
        this.dealsTempData.district = undefined
        this.dealsTempData.district_name = undefined
      }
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
      if (value === 1) {
        this.dealsTempData.district = e.id
        this.dealsTempData.district_name = e.name
      }
      if (value === 2) {
        this.eventsTempData.district = e.id
        this.eventsTempData.district_name = e.name
      }
    },
    eventsTempDateChange(e) {
      // console.log(e)
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
    getUserObjList() {
      userObjectList({pid: 71}).then(res => {
        console.log(res)
        this.popuCityList = res.message
      })
    },
    handleAddDeals(row) {
      var self = this
      this.dealsTempData.user_id = row.user_id
      this.mapInfo = {
        // 初始值默认为天安门
        address: '北京市东城区东华门街道天安门',
        lng: 116.397451,
        lat: 39.909187,
        lnglat: [116.397451, 39.909187]
      }
      this.listLoading = true
      setTimeout(function() {
        self.listLoading = false
        self.dialogFormDealsVisible = true
      }, 1200)
    },
    createDeals() {
      this.dealsTempData.location = this.mapInfo.address
      this.dealsTempData.lng = this.mapInfo.lng
      this.dealsTempData.lat = this.mapInfo.lat
      addDeals(this.dealsTempData).then(response => {
        console.log(response)
        if (response.code == 200) {
          this.$message({
            message: 'Success',
            type: 'success'
          })
          this.dialogFormDealsVisible = false
          this.getList()
          this.dealsTempData = {
            user_id: undefined,
            type: undefined,
            is_all: undefined,
            file: undefined,
            due_contract: undefined,
            pay_money: undefined,
            desc: undefined,
            deal_id: undefined,
            city: undefined,
            location: undefined,
            identity: undefined,
            file_name: undefined,
            lng: undefined,
            lat: undefined
          }
        }
      })
    },
    handleAddEvents(row) {
      var self = this
      this.mapInfo = {
        // 初始值默认为天安门
        address: '北京市东城区东华门街道天安门',
        lng: 116.397451,
        lat: 39.909187,
        lnglat: [116.397451, 39.909187]
      }
      this.eventsTempData.user_id = row.user_id
      this.listLoading = true
      setTimeout(function() {
        self.dialogFormEventsVisible = true
        self.listLoading = false
      }, 1200)
    },
    createEvents() {
      // console.log(this.eventsTempData)
      // console.log(tempData.birthday.getFullYear())
      if (this.eventStartTime != undefined) {
        this.eventsTempData.start_time = this.eventStartTime
      }
      if (this.eventEndTime != undefined) {
        this.eventsTempData.end_time = this.eventEndTime
      }
      this.eventsTempData.location = this.mapInfo.address
      this.eventsTempData.lat = this.mapInfo.lat
      this.eventsTempData.lng = this.mapInfo.lng
      addEvent(this.eventsTempData).then(response => {
        // console.log(response)
        if (response.code == 200) {
          this.$message({
            message: 'Success',
            type: 'success'
          })
          this.dialogFormEventsVisible = false
          this.getList()
          this.eventsTempData = {
            user_id: undefined,
            name: undefined,
            desc: undefined,
            is_all: undefined,
            type_desc: undefined,
            pay_money: undefined,
            date: undefined,
            start_time: undefined,
            end_time: undefined,
            file: undefined,
            location: undefined,
            province: undefined,
            province_name: undefined,
            city: undefined,
            city_name: undefined,
            district: undefined,
            district_name: undefined,
            third_com_name: undefined,
            third_com_logo: undefined,
            third_com_bg: undefined,
            lng: undefined,
            lat: undefined
          }
        }
      })
    },
    uploadFileSuccess(response, file, fileList) {
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.fileUrl = response.data[0].file_url
        this.dealsTempData.file = response.data[0].file_url
        this.dealsTempData.file_name = file.name
      } else {
        console.log(response.msg)
      }
    },
    uploadEventsFileSuccess(response, file, fileList) {
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.eventsFileUrl = response.data[0].file_url
        this.eventsTempData.file = response.data[0].file_url
        this.eventsTempData.file_name = file.name
      } else {
        console.log(response.msg)
      }
    },
    uploadEventsLogoSuccess(response, file, fileList) {
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200) {
        this.eventsLogoFileList = [{name: '', url: response.data[0].file_url}]
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
        this.eventsHeaderPhotoFileList = [{name: '', url: response.data[0].file_url}]
        this.eventsTempData.third_com_bg = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    },
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      vendorList(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.message.data
        this.total = response.message.total
        console.log(this.list)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    changeIdentity(e) {
      // console.log(e)
      // this.levelOptions = []
      if (e == 1) {
        this.tempUpgrade.levelId = undefined
        this.levelOptions = this.vipList.filter(item => item.identity == 1)
      }
      if (e == 2) {
        this.tempUpgrade.levelId = undefined
        this.levelOptions = this.vipList.filter(item => item.identity == 2)
      }
      if (e == 3) {
        this.tempUpgrade.levelId = undefined
        this.levelOptions = this.vipList.filter(item => item.identity == 3)
      }
      console.log(this.levelOptions)
    },
    getVipList() {
      vipList().then(response => {
        console.log(response)
        this.vipList = response.message
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
      const {prop, order} = data
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
      this.$router.push({path: '/users/editVendor', query: {uid: row.user_id}})
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(this.temp)
          const tempData = Object.assign({}, this.temp)

          addVendorBasic(tempData).then((res) => {
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
      // this.list.splice(index, 1)
      deleteUser({
        user_id: row.id,
        is_delete: 1
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'wrong',
            duration: 2000
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleMemberLevel(row, index) {
      // this.tempUpgrade = Object.assign({}, row) // copy obj
      this.tempUpgrade.user_id = row.user_id
      console.log(row)
      this.dialogStatus = 'Upgrade'
      this.dialogFormUpgrade = true
      this.tempUpgrade.levelId = undefined
      this.tempUpgrade.identity = undefined
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    upgradeLevel() {
      var that = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.tempUpgrade)
          const tempData = Object.assign({}, this.tempUpgrade)
          // const tempObj = {}
          // tempObj.username = this.temp.username
          // tempObj.nickname = this.temp.nickname
          const data = {
            user_id: tempData.user_id,
            identity: tempData.identity,
            level_id: tempData.levelId
          }
          changeVipLevel(data).then(response => {
            console.log(response)
            if (response.code == 200) {
              that.$notify({
                title: 'Success',
                message: 'Upgrade Successfully',
                type: 'success',
                duration: 2000
              })
              that.dialogFormUpgrade = false
            }
          })
          // console.log(tempData)
        }
      })
    },
    handleRecover(row, index) {
      // this.list.splice(index, 1)
      deleteUser({
        user_id: row.id,
        is_delete: 0
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$notify({
            title: 'Success',
            message: 'Recover Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'wrong',
            duration: 2000
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleFetchDetail(detail) {
      this.dialogUserDetailVisible = true
      this.userDetailData.push(detail)
      console.log(detail)
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  /*width: 90px;*/
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 20%;
}
</style>
