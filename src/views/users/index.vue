<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.nickname"
        placeholder="Nickname"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.phone"
        placeholder="Phone"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.is_seeking"
        placeholder="Is Seeking"
        clearable
        style="width: 110px;"
      >
        <el-option
          v-for="(item,index) in seekingOptions"
          :key="index"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
      <el-select
        v-model="listQuery.sex"
        placeholder="Gender"
        clearable
        style="width: 110px;"
      >
        <el-option
          v-for="(item,index) in sexOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-waves
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>

      <el-button
        v-waves
        type="primary"
        @click="showUserAccountModal()"
      >
        Create Account
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
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-form-item label="Country">
              <span>{{ props.row.country }}</span>
            </el-form-item>
            <el-form-item label="Province">
              <span>{{ props.row.province }}</span>
            </el-form-item>
            <el-form-item label="City">
              <span>{{ props.row.city }}</span>
            </el-form-item>
            <el-form-item label="Language">
              <span>{{ props.row.language }}</span>
            </el-form-item>
            <el-form-item label="Birthday">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-collapse accordion>
              <el-collapse-item v-if="props.row.educator">
                <template slot="title">
                  <b style="font-size:28px;color: #99a9bf;"> Educator Info</b>
                </template>
                <div class="xll-container">
                  <div class="xll-item">
                    <div class="xll-item-l">
                      First name & Last name:
                    </div>
                    <div class="xll-item-r">
                      {{props.row.educator.first_name }}{{ props.row.educator.last_name }}
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Location:</div>
                    <div class="xll-item-r">
                      {{ props.row.educator.country }}, {{ props.row.educator.province }},
                      {{ props.row.educator.city }}, {{ props.row.educator.district }}, {{ props.row.educator.address }}
                    </div>
                  </div>
                  <div class="xll-item" >
                    <div class="xll-item-l">Sub Identity Name:</div>
                    <div class="xll-item-r">{{ props.row.educator.sub_identity_name }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Bio:</div>
                    <div class="xll-item-r">{{ props.row.educator.bio }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Hobbies:</div>
                    <div class="xll-item-r">{{ props.row.educator.hobbies }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Nationality:</div>
                    <div class="xll-item-r">{{ props.row.educator.nationality }}</div>
                  </div>

                  <div class="image-container" v-if="props.row.educator.profile_photo">
                    <span>Profile photo:</span>
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="props.row.educator.profile_photo"
                      :preview-src-list="[props.row.educator.profile_photo]"
                    />
                  </div>

                  <div class="image-container" v-if="props.row.educator.header_photo">
                    <span>Header photo:</span>
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="props.row.educator.header_photo"
                      :preview-src-list="[props.row.educator.header_photo]"
                    />
                  </div>

                  <div class="image-container" v-if="props.row.educator.video_url">
                    <span>Video:</span>
                    <video
                      width="120"
                      :src="props.row.educator.video_url"
                      controls
                    />
                  </div>

                </div>

              </el-collapse-item>
              <el-collapse-item v-if="props.row.business">
                <template slot="title">
                  <b style="font-size:28px;color: #99a9bf;"> Business Info</b>
                </template>

                <div class="xll-container">
                  <div class="xll-item">
                    <div class="xll-item-l">First name & Last name:</div>
                    <div class="xll-item-r">
                      {{props.row.business.first_name }}{{ props.row.business.last_name }}
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Location:</div>
                    <div class="xll-item-r">
                      {{ props.row.business.country }}, {{ props.row.business.province }},
                      {{ props.row.business.city }}, {{ props.row.business.district }}, {{ props.row.business.address }}
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Sub Identity Name:</div>
                    <div class="xll-item-r">{{ props.row.business.sub_identity_name }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Bio:</div>
                    <div class="xll-item-r">{{ props.row.business.bio }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Business Bio:</div>
                    <div class="xll-item-r">{{ props.row.business.business_bio }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Business name:</div>
                    <div class="xll-item-r">{{ props.row.business.business_name }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Business phone:</div>
                    <div class="xll-item-r">{{ props.row.business.business_phone }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Business type name:</div>
                    <div class="xll-item-r">{{ props.row.business.business_type_name }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Contact Name:</div>
                    <div class="xll-item-r">{{ props.row.business.contact_name }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Contact Phone:</div>
                    <div class="xll-item-r">{{ props.row.business.contact_phone }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Curriculum:</div>
                    <div class="xll-item-r">{{ props.row.business.curriculum }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Fields Trips:</div>
                    <div class="xll-item-r">
                      <span v-if="props.row.business.felds_trips==1">Yes</span>
                      <span v-if="props.row.business.felds_trips==0">Unknown</span>
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">is_currently_hiring:</div>
                    <div class="xll-item-r">
                      <span v-if="props.row.business.is_currently_hiring==1">Yes</span>
                      <span v-if="props.row.business.is_currently_hiring==0">Unknown</span>
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Is Events:</div>
                    <div class="xll-item-r">
                      <span v-if="props.row.business.is_events==1">Yes</span>
                      <span v-if="props.row.business.is_events==0">Unknown</span>
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Special Needs: </div>
                    <div class="xll-item-r">
                      <span v-if="props.row.business.is_special_needs==1">Yes</span>
                      <span v-if="props.row.business.is_special_needs==0">Unknown</span>
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Job Title:</div>
                    <div class="xll-item-r">
                      {{ props.row.business.job_title }}
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Staff student ratio:</div>
                    <div class="xll-item-r">
                      {{ props.row.business.staff_student_ratio }}
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Technology Available:</div>
                    <div class="xll-item-r">
                      {{ props.row.business.technology_available }}
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Website:</div>
                    <div class="xll-item-r">{{ props.row.business.website }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Work Email:</div>
                    <div class="xll-item-r">{{ props.row.business.work_email }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Year Founded:</div>
                    <div class="xll-item-r"></div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">{{ props.row.business.year_founded }}</div>
                    <div class="xll-item-r"></div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Hobbies:</div>
                    <div class="xll-item-r">{{ props.row.business.hobbies }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Nationality:</div>
                    <div class="xll-item-r">{{ props.row.business.nationality }}</div>
                  </div>


                  <div class="image-container" v-if="props.row.business.profile_photo">
                    <span>Profile photo:</span>
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="props.row.business.profile_photo"
                      :preview-src-list="[props.row.business.profile_photo]"
                    />
                  </div>
                  <div class="image-container" v-if="props.row.business.logo">
                    <span>logo:</span>
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="props.row.business.logo"
                      :preview-src-list="[props.row.business.logo]"
                    />
                  </div>
                  <div class="image-container" v-if="props.row.business.header_photo">
                    <span>Header photo:</span>
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="props.row.business.header_photo"
                      :preview-src-list="[props.row.business.header_photo]"
                    />
                  </div>
                  <div class="image-container" v-if="props.row.business.video_url">
                    <span>Video:</span>
                    <video
                      width="120"
                      controls
                      :src="props.row.business.video_url"
                    />
                  </div>

                </div>

              </el-collapse-item>
              <el-collapse-item v-if="props.row.vendor">
                <template slot="title">
                  <b style="font-size:28px;color: #99a9bf;"> Vendor Info</b>
                </template>

                <div class="xll-container">
                  <div class="xll-item">
                    <div class="xll-item-l">First name & Last name:</div>
                    <div class="xll-item-r">
                      {{ props.row.vendor.first_name }}{{props.row.vendor.last_name }}
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Wechat Id:</div>
                    <div class="xll-item-r">{{ props.row.vendor.wx_id }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Location:</div>
                    <div class="xll-item-r">
                      {{ props.row.vendor.country }}{{props.row.vendor.province }}{{ props.row.vendor.city }}{{ props.row.vendor.address }}
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Business reg img:</div>
                    <div class="xll-item-r">{{ props.row.vendor.busin_reg_img }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Business reg number:</div>
                    <div class="xll-item-r">{{ props.row.vendor.busin_reg_num }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Vendor Bio:</div>
                    <div class="xll-item-r">{{ props.row.vendor.vendor_bio }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Vendor name:</div>
                    <div class="xll-item-r">{{ props.row.vendor.vendor_name }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Vendor name en:</div>
                    <div class="xll-item-r">{{ props.row.vendor.vendor_name_en }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Vendor type name:</div>
                    <div class="xll-item-r">{{ props.row.vendor.vendor_type_name }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Is Dog Friendly:</div>
                    <div class="xll-item-r">
                      <span v-if="props.row.vendor.is_dog_friendly==1">Yes</span>
                      <span v-if="props.row.vendor.is_dog_friendly==0">Unknown</span>
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Is Events:</div>
                    <div class="xll-item-r">
                      <span v-if="props.row.vendor.is_events==1">Yes</span>
                      <span v-if="props.row.vendor.is_events==0">Unknown</span>
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Job Title:</div>
                    <div class="xll-item-r">
                      {{ props.row.vendor.job_title }}
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Legal Company Name:</div>
                    <div class="xll-item-r">{{ props.row.vendor.legal_company_name }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Phone:</div>
                    <div class="xll-item-r">{{ props.row.vendor.phone }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Website:</div>
                    <div class="xll-item-r">{{ props.row.vendor.website }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Work Email:</div>
                    <div class="xll-item-r">{{ props.row.vendor.work_email }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Wechat Public Name:</div>
                    <div class="xll-item-r">{{ props.row.vendor.wechat_public_name }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Wechat Public Qrcode:</div>
                    <div class="xll-item-r">{{ props.row.vendor.wechat_public_qrcode }}</div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l">Nationality:</div>
                    <div class="xll-item-r">
                      {{ props.row.vendor.nationality }}
                    </div>
                  </div>
                  <div class="xll-item">
                    <div class="xll-item-l"></div>
                    <div class="xll-item-r"></div>
                  </div>

                  <div class="image-container" v-if="props.row.vendor.profile_photo">
                    <span>Profile photo:</span>
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="props.row.vendor.profile_photo"
                      :preview-src-list="[props.row.vendor.profile_photo]"
                    />
                  </div>
                  <div class="image-container" v-if="props.row.vendor.logo">
                    <span>logo:</span>
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="props.row.vendor.logo"
                      :preview-src-list="[props.row.vendor.logo]"
                    />
                  </div>
                  <div class="image-container" v-if="props.row.vendor.header_photo">
                    <span>Header photo:</span>
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="props.row.vendor.header_photo"
                      :preview-src-list="[props.row.vendor.header_photo]"
                    />
                  </div>
                  <div class="image-container" v-if="props.row.vendor.video_url">
                    <span>Video:</span>
                    <video
                      width="120"
                      controls
                      :src="props.row.vendor.video_url"
                    />
                  </div>

                </div>

              </el-collapse-item>
            </el-collapse>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="User Id"
        prop="id"
        align="center"
        width="80"
      >
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Parent Id"
        prop="pid"
        align="center"
        width="120"
      >
        <template v-slot="{row}">
          <span>{{ row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Source"
        width="180"
      >
        <template v-slot="scope">
          {{ scope.row.source }}
        </template>
      </el-table-column>

      <el-table-column
        label="Create Time"
        width="180"
      >
        <template v-slot="scope">
          {{ scope.row.c_time }}
        </template>
      </el-table-column>

      <el-table-column
        label="Email"
        width="180"
      >
        <template v-slot="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column
        label="Phone"
        width="110"
        align="center"
      >
        <template v-slot="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Gender"
        width="110"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="scope.row.sex === 1">Male</span>
          <span v-if="scope.row.sex === 2">Female</span>
          <span v-if="scope.row.sex === 0">Unc</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Identity"
        width="110"
        align="center"
      >
        <template v-slot="scope">
          <el-tag
            v-if="scope.row.identity ===0"
            effect="dark"
            color="#005956"
          >
            Other
          </el-tag>
          <el-tag
            v-if="scope.row.identity ===1"
            effect="dark"
            color="#0aa0a8"
          >
            Educator
          </el-tag>
          <el-tag
            v-if="scope.row.identity ===2"
            effect="dark"
            color="#b1c452"
          >
            Business
          </el-tag>
          <el-tag
            v-if="scope.row.identity ===3"
            effect="dark"
            color="#00b3d2"
          >
            Vendor
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="Actions"
        align="center"
        width="680"
        class-name="small-padding fixed-width"
      >
        <template v-slot="{row,$index}">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row,$index)"
          >
            Delete
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleMemberLevel(row,$index)"
          >
            Upgrade
          </el-button>
          <el-button
            v-if="row.pid==0"
            size="mini"
            type="primary"
            @click="handleSubAccount(row)"
          >
            Sub Account
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleUserPhone(row)"
          >
            Update User Phone
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleUnBindAccount(row)"
          >
            Unbind Account
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
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          label="username"
          prop="username"
        >
          <el-input v-model="temp.username"/>
        </el-form-item>
        <el-form-item
          label="nickname"
          prop="nickname"
        >
          <el-input v-model="temp.nickname"/>
        </el-form-item>
        <el-form-item
          label="truename"
          prop="truename"
        >
          <el-input v-model="temp.truename"/>
        </el-form-item>
        <el-form-item
          label="sex"
          prop="sex"
        >
          <el-select
            v-model="temp.sex"
            class="filter-item"
            placeholder="Please select gender"
          >
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="phone"
          prop="phone"
        >
          <el-input v-model="temp.phone"/>
        </el-form-item>
        <el-form-item
          label="email"
          prop="email"
        >
          <el-input v-model="temp.email"/>
        </el-form-item>
        <el-form-item
          label="birthday"
          prop="birthday"
        >
          <!--          <el-input v-model="temp.birthday" />-->
          <el-date-picker
            v-model="temp.birthday"
            type="date"
            placeholder="Please picker a date"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
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
            @change="selectLevelChange"
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
        <el-form-item v-if="showMonthNumStatus" label="Duration" prop="month_num">
          <el-input v-model="tempUpgrade.month_num" type="text"
                    :show-word-limit="true" placeholder="Duration">
            <template #append>
              (months)
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormUpgrade = false">Cancel</el-button>
        <el-button type="primary" @click="upgradeLevel()">Confirm</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Sub Account" :visible.sync="subAccountDialogVisible">
      <!--      :rules="rules"-->
      <el-form ref="dataForm" :model="subAccountForm" label-position="left" label-width="90px"
               style="width: 400px; margin-left:50px;">

        <el-form-item label="Phone" prop="phone">
          <el-input type="number" v-model="subAccountForm.phone" ></el-input>
        </el-form-item>
        <el-form-item label="Username" prop="username">
          <el-input type="text" v-model="subAccountForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="text" v-model="subAccountForm.password"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subAccountDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addSubAccount()">Confirm</el-button>
      </div>

    </el-dialog>

    <el-dialog title="Change Bind Phone" :visible.sync="changeBindPhoneDialogVisible">
      <!--      :rules="rules"-->
      <el-form ref="dataForm" :model="changeBindPhoneForm" label-position="left" label-width="90px"
               style="width: 400px; margin-left:50px;">

        <el-form-item label="Phone" prop="phone">
          <el-input type="number" v-model="changeBindPhoneForm.phone" ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeBindPhoneDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateBindPhone()">Confirm</el-button>
      </div>

    </el-dialog>

    <el-dialog
      title="Create Account"
      :visible.sync="userAccountDialogFormVisible"
    >
      <el-form
        ref="userAccountForm"
        :rules="userAccountRules"
        :model="userAccountForm"
        label-position="left"
        label-width="160px"
      >
        <el-form-item
          label="Email"
          prop="email"
        >
          <el-input v-model="userAccountForm.email"/>
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password"
        >
          <el-input v-model="userAccountForm.password"/>
        </el-form-item>
        <el-form-item
          label="Confirm Password"
          prop="c_password"
        >
          <el-input v-model="userAccountForm.c_password"/>
        </el-form-item>
        <el-form-item
          label="Phone"
          prop="phone"
        >
          <el-input v-model="userAccountForm.phone"/>
        </el-form-item>
<!--        <el-form-item-->
<!--          label="Code"-->
<!--          prop="code"-->
<!--        >-->
<!--          <el-input v-model="userAccountForm.code"/>-->
<!--        </el-form-item>-->
        <el-form-item
          label="First Name"
          prop="first_name"
        >
          <el-input v-model="userAccountForm.first_name"/>
        </el-form-item>
        <el-form-item
          label="Last Name"
          prop="last_name"
        >
          <el-input v-model="userAccountForm.last_name"/>
        </el-form-item>
        <el-form-item
          label="Company Name"
          prop="company_name"
        >
          <el-input v-model="userAccountForm.company_name"/>
        </el-form-item>

        <el-form-item
          label="Identity"
          prop="identity"
        >
          <el-select
            v-model="userAccountForm.identity"
            class="filter-item"
            placeholder="Please select identity"
          >
            <el-option
              v-for="item in identityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="userAccountDialogFormVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="addUserAccountByAdmin()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>

import {userList, editUserInfo, deleteUser, vipList, changeVipLevel,
  userObjectList,assignAccount,changeBindPhone,unbindAccount} from '@/api/member'
import {createUserAccount} from '@/api/admin'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'

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
      userAccountDialogFormVisible:false,
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
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

      seekingOptions: [{label: 'no', value: 0}, {label: 'Yes', value: 1}],
      sexOptions: [{label: 'unco', value: 0}, {label: 'Male', value: 1}, {label: 'Female', value: 2}],
      identityOptions: [{label: 'Educator', value: 1}, {label: 'Business', value: 2}, {label: 'Vendor', value: 3}],
      levelOptions: [],
      vipList: [],

      temp: {
        user_id: undefined,
        username: undefined,
        nickname: undefined,
        truename: undefined,
        sex: undefined,
        phone: undefined,
        email: undefined,
        birthday: ''
      },
      tempUpgrade: {
        identity: undefined,
        levelId: undefined,
        month_num:undefined
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
      rules: {
        username: [{required: true, message: 'username is required', trigger: 'change'}],
        birthday: [{type: 'date', required: true, message: 'birthday is required', trigger: 'change'}],
        nickname: [{required: true, message: 'nickname is required', trigger: 'blur'}]
      },
      downloadLoading: false,
      dialogUserDetailVisible: false,
      userDetailData: [],

      userAccountForm:{
        email:undefined,
        password:undefined,
        c_password:undefined,
        phone:undefined,
        code:undefined,
        first_name:undefined,
        last_name:undefined,
        company_name:undefined,
        identity:undefined
      },
      userAccountRules: {

      },

      subAccountDialogVisible: false,
      subAccountForm: {
        pid: undefined,
        phone: undefined,
        username: undefined,
        password: undefined
      },
      changeBindPhoneDialogVisible:false,
      changeBindPhoneForm:{
        user_id:undefined,
        phone:undefined
      },
      showMonthNumStatus:true

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
    this.getVipList()
  },
  methods: {
    showUserAccountModal(){
      this.userAccountDialogFormVisible = true;
    },
    addUserAccountByAdmin(){
      let params = Object.assign({},this.userAccountForm)
      createUserAccount(params).then(res=>{
        // console.log(res)
        if(res.code == 200){
          this.userAccountDialogFormVisible = false
          this.getList()
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    handleUserPhone(row){
        this.changeBindPhoneDialogVisible = true;
        this.changeBindPhoneForm.user_id = row.id;
    },
    updateBindPhone(){
      let data = Object.assign({},this.changeBindPhoneForm);
      changeBindPhone(data).then(res=>{
        if(res.code==200){
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }
        this.changeBindPhoneDialogVisible = false;
        this.getList();
      }).catch(err=>{
        console.log(err)
      })
    },
    handleUnBindAccount(row){
       let data = {
         user_id:row.id
       }
      unbindAccount(data).then(res=>{
        if(res.code==200){
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }
        this.getList();
      }).catch(err=>{
        console.log(err)
      })
    },
    handleSubAccount(row) {
      this.subAccountForm.pid = row.id;
      this.subAccountDialogVisible = true;
    },
    addSubAccount(){
      let data = Object.assign({},this.subAccountForm)
      assignAccount(data).then(res=>{
        if(res.code==200){
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }
        this.subAccountDialogVisible = false;
      }).catch(err=>{
        console.log(err)
      })
    },
    getUserObjList() {
      userObjectList({pid: 71}).then(res => {
        console.log(res)
        this.popuCityList = res.message
      })
    },
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      userList(this.listQuery).then(response => {
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
      // console.log(this.levelOptions)
    },
    getVipList() {
      vipList().then(response => {
        // console.log(response)
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.user_id = row.id
      // console.log(this.temp.birthday)
      if (this.temp.birthday == '0000-00-00') {
        this.temp.birthday = new Date()
      } else {
        this.temp.birthday = new Date(this.temp.birthday)
      }
      // console.log(this.temp.birthday)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(this.temp)
          const tempData = Object.assign({}, this.temp)
          const tempObj = {}
          tempObj.username = this.temp.username
          tempObj.nickname = this.temp.nickname
          tempObj.truename = this.temp.truename
          tempObj.sex = this.temp.sex
          tempObj.phone = this.temp.phone
          tempObj.email = this.temp.email
          tempObj.user_id = this.temp.user_id

          // console.log(tempData.birthday.getFullYear())
          const year = tempData.birthday.getFullYear()
          const month = tempData.birthday.getMonth() + 1
          const day = tempData.birthday.getDate()
          const birthdayStr = year + '-' + month + '-' + day
          tempObj.birthday = birthdayStr
          tempData.birthday = birthdayStr // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // console.log(tempData)
          editUserInfo(tempObj).then((res) => {
            console.log(res)
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
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
          })
        }
      })
    },
    handleDelete(row) {
      // this.list.splice(index, 1)
      deleteUser({
        user_id: row.id
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
    handleMemberLevel(row) {
      // this.tempUpgrade = Object.assign({}, row) // copy obj
      this.tempUpgrade.user_id = row.id
      // console.log(row)
      this.dialogStatus = 'Upgrade'
      this.dialogFormUpgrade = true
      this.tempUpgrade.levelId = undefined
      this.tempUpgrade.identity = undefined
      this.tempUpgrade.month_num = undefined

      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    upgradeLevel() {
      let that = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(this.tempUpgrade)
          const tempData = Object.assign({}, this.tempUpgrade)
          // const tempObj = {}
          // tempObj.username = this.temp.username
          // tempObj.nickname = this.temp.nickname
          const data = {
            user_id: tempData.user_id,
            identity: tempData.identity,
            level_id: tempData.levelId,
            month_num:tempData.month_num
          }
          changeVipLevel(data).then(response => {
            // console.log(response)
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
    handleRecover(row) {
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
    handleAddCustomUser() {

    },
    selectLevelChange(e){
      // console.log(e)
      // console.log(this.levelOptions)
      let levelOptionsData = this.levelOptions

      let filterData = levelOptionsData.filter(item=>item.id === e)
      // console.log(filterData)
      if(filterData.length>0){
        if(filterData[0]['level'] == 4){
          this.showMonthNumStatus = false
        }else{
          this.showMonthNumStatus = true
        }
      }

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

.xll-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.xll-item{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  background-color: #eeeeee;
  //padding: 10px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
}

.xll-item-l{
  background-color: #f0dacf;
  padding: 10px;
}

.xll-item-r{
  background-color: #00b3d2;
  color: #FFFFFF;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
}

.image-container{
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
