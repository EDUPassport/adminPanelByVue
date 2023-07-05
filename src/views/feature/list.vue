<template>
    <div class="app-container">
      <div class="filter-container">
        <el-select v-model="listQuery.feature" placeholder="Feature" clearable class="filter-item">
          <el-option v-for="item in isFeatureList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
          Search
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
          Add
        </el-button>
      </div>
      <div>
        <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;"
          size="mini">
          <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
            <template v-slot="{ row }">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Feature Type" align="center">
            <template v-slot="{ row }">
              <span>{{ capitalizeFirstCharacter(row.feature_type) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Listing" align="center">
            <template v-slot="{ row }">
              <span v-if="row.feature_type == 'job'">{{ row.featureable.job_title }}</span>
              <span v-else-if="row.feature_type == 'deal'">{{ row.featureable.title }}</span>
              <span v-else-if="row.feature_type == 'event'">{{ row.featureable.name }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="Featureable Type" align="center">
            <template v-slot="{ row }">
              <span>{{ row.featureable_type }}</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="Featureable Id" align="center">
            <template v-slot="{ row }">
              <span>{{ row.featureable_id }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="Start Date" align="center">
            <template v-slot="{ row }">
              <span>{{ row.start_date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="End Date" align="center">
            <template v-slot="{ row }">
              <span>{{ row.end_date }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Actions" align="center" class-name="small-padding fixed-width">
            <template v-slot="{ row, $index }">
              <el-button type="primary" size="mini" @click="handleUpdate(row)">
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
        @pagination="getList" />
  
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top">
  
          <el-form-item label="Feature Type" prop="feature_type">
            <el-select v-model="temp.feature_type" class="filter-item" placeholder="Please select"
              @change="handleFeatureTypeChange">
              <el-option v-for="item in isFeatureList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
  
          <el-form-item :label="dynamic_title" prop="featureable_id">
            <el-select v-model="temp.featureable_id" class="filter-item" placeholder="Please select"
              @change="handleFeatureTypeChange">
              <el-option v-for="item in deals" :key="item.id"
                :label="item.title ? item.title : (item.job_title ? item.job_title : item.name)" :value="item.id" />
            </el-select>
          </el-form-item>
  
          <el-form-item label="Start Date">
            <el-date-picker v-model="temp.start_date" type="date" placeholder="Pick a day" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
  
          <el-form-item label="End Date">
            <el-date-picker v-model="temp.end_date" type="date" placeholder="Pick a day" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
  
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
            Confirm
          </el-button>
        </div>
      </el-dialog>
  
    </div>
  </template>
  
  <script>
  import { add, adList, exportExcel, dealLists, update } from '@/api/feature'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import permission from '@/directive/permission/permission'
  import Tinymce from '@/components/Tinymce'
  
  export default {
    name: 'Index',
    components: { Pagination, Tinymce },
    directives: { waves, permission },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        feature_job_related_data: false,
        uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          feature: undefined,
          identity: 0,
          page: 1,
          limit: 50
        },
        listContactUser: {
          identity: 0,
          page: 1,
          limit: 50
        },
        listConfigJob: {
          identity: 0,
          page: 1,
          limit: 50
        },
        listConfigDeal: {
          identity: 0,
          page: 1,
          limit: 50
        },
        listConfigEvent: {
          identity: 0,
          page: 1,
          limit: 50
        },
        importanceOptions: [1, 2, 3],
        isFeatureList: [
          { label: 'Job', value: "job" },
          { label: 'Deal', value: "deal" },
          { label: 'Event', value: "event" }
        ],
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          feature_type: "job",
          featureable_id: null,
          featureable_type: null,
          title: undefined,
          page: null,
          is_featured: null,
          jobslist: null,
          feature_category: null,
          start_date: null,
          end_date: null,
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
        },
        downloadLoading: false,
        fileUrl: undefined,
        fileList: undefined,
        categoryData: [],
        adsCategoryValue: undefined,
        adsBannerFileList: [],
        adsBannerFileUrl: undefined,
        deals: [],
        dynamic_title: null,
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
    },
    methods: {
      capitalizeFirstCharacter(value) {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
  
      handleFeatureTypeChange() {
        if (this.temp.feature_type === "job") {
          this.dynamic_title = "Feature Job";
          this.deals = [];
          this.temp.feature_category = null;
          this.temp.feature_type = "job";
          this.temp.featureable_type = "App\\Http\\Models\\JobsModel";
          this.listConfigJob = {
            ...this.listConfigJob,
            type: 'job'
          };
          this.getJobs();
        }
        if (this.temp.feature_type === "deal") {
          this.dynamic_title = "Feature Deals";
          this.deals = [];
          this.temp.feature_category = null;
          this.temp.feature_type = "deal";
          this.temp.featureable_type = "App\\Http\\Models\\DealsModel";
          this.listConfigJob = {
            ...this.listConfigJob,
            type: 'deal'
          };
          this.getJobs();
        }
        if (this.temp.feature_type === "event") {
          this.dynamic_title = "Feature Events";
          this.deals = [];
          this.temp.feature_category = null;
          this.temp.feature_type = "event";
          this.temp.featureable_type = "App\\Http\\Models\\EventsModel";
          this.listConfigJob = {
            ...this.listConfigJob,
            type: 'event'
          };
          this.getJobs();
        }
      },
      async getJobs() {
        console.log(this.listConfigJob);
        await dealLists(this.listConfigJob).then(response => {
          response.data.filter(item => {
            this.deals.push(item);
          })
        })
      },
      getList() {
        this.listLoading = true
        adList(this.listQuery).then(response => {
          this.list = response.data.filter(item => item)
          this.total = response.total
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1000)
        })
      },
      resetTemp() {
        this.temp = {
          feature_type: "job",
          featureable_id: null,
          featureable_type: null,
          start_date: null,
          end_date: null,
        }
      },
      async handleCreate() {
  
        // first load default 
        this.dynamic_title = "Feature Job";
        this.deals = [];
        this.temp.feature_category = null;
        this.temp.feature_type = "job";
        this.temp.featureable_type = "App\\Http\\Models\\JobsModel";
        this.listConfigJob = {
          ...this.listConfigJob,
          type: 'job'
        };
        this.getJobs();
  
        this.resetTemp()
        this.fileUrl = '';
        this.fileList = [];
        this.adsBannerFileUrl = undefined;
        this.adsBannerFileList = [];
        this.adsCategoryValue = undefined
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async downloadExcel(row) {
        exportExcel(row).then((res) => {
          var fileURL = window.URL.createObjectURL(new Blob([res]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'file.zip');
          document.body.appendChild(fileLink);
          fileLink.click();
          this.$notify({
            title: 'Success',
            message: 'Download Successfully',
            type: 'success',
            duration: 2000
          })
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            add(this.temp).then((res) => {
              console.log(res)
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      async handleUpdate(row) {
        // console.log(row)
        this.temp = Object.assign({}, row) // copy obj
  
  
        if (row.feature_type == "job") {
          this.deals = [];
          this.temp.feature_category = null;
          this.temp.feature_type = "job";
          this.temp.featureable_type = "App\\Http\\Models\\JobsModel";
          this.listConfigJob = {
            ...this.listConfigJob,
            type: 'job'
          };
          this.getJobs();
        }
        if (row.feature_type == "deal") {
          this.deals = [];
          this.temp.feature_category = null;
          this.temp.feature_type = "deal";
          this.temp.featureable_type = "App\\Http\\Models\\DealsModel";
          this.listConfigJob = {
            ...this.listConfigJob,
            type: 'deal'
          };
          this.getJobs();
        }
  
        if (row.feature_type == "event") {
          this.deals = [];
          this.temp.feature_category = null;
          this.temp.feature_type = "event";
          this.temp.featureable_type = "App\\Http\\Models\\EventsModel";
          this.listConfigJob = {
            ...this.listConfigJob,
            type: 'event'
          };
          this.getJobs();
        }
  
        this.dialogStatus = 'update'
  
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
  
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp);
            update(tempData).then((res) => {
              if (res.code == 200) {
                this.dialogFormVisible = false
                this.$notify({
                  title: 'Success',
                  message: 'Update Successfully',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
                this.fileUrl = ''
              }
            })
          }
        })
      },
    }
  }
  </script>
  