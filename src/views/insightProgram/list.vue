<template>
  <div class="app-container">
    <div class="filter-container">

      <el-input v-model="listQuery.full_name" placeholder="Full name" style="width: 200px;"
        @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.email" placeholder="email" style="width: 200px;" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.phone_no" placeholder="Phone #" style="width: 200px;"
        @keyup.enter.native="handleFilter" />


      <el-select v-model="listQuery.type_of_user" reserve-keyword placeholder="Type Of User">
        <el-option v-for="item in typeUsers" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>


      <el-select v-model="listQuery.participate_in_program" reserve-keyword placeholder="Participate In Program">
        <el-option v-for="item in participateProgram" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-select v-model="listQuery.detail_feedback" reserve-keyword placeholder="Detail FeedBack">
        <el-option v-for="item in DetailFeedBack" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button  style="margin-left: 10px;" type="primary"  @click="clearFilters">
        Clear Filters
      </el-button>
      <el-button  style="margin-left: 10px;" type="primary"  @click="downloadExcel">
        Export
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
        <el-table-column label="Full Name" width="190px" align="center">
          <template v-slot="{ row }">
            <span>{{ capitalizeFirstCharacter(row.full_name) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Email" width="190px" align="center">
          <template v-slot="{ row }">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Phone No" width="190px" align="center">
          <template v-slot="{ row }">
            <span>{{ row.phone_no }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Location" width="190px" align="center">
          <template v-slot="{ row }">
            <span>{{ row.location }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Type Of User" width="190px" align="center">
          <template v-slot="{ row }">
            <span v-if="row.type_of_user == 1">Educator</span>
            <span v-else-if="row.type_of_user == 2">EDU Business</span>
            <span v-else-if="row.type_of_user == 5">Vendor</span>
            <span v-else>Other</span> </template>
        </el-table-column>
        <el-table-column label="Participate In Program" width="190px" align="center">
          <template v-slot="{ row }">
            <span v-if="row.participate_in_program == 1">Yes</span>
            <span v-else="row.participate_in_program == 0">No</span>
          </template>
        </el-table-column>
        <el-table-column label="Detail Feedback" width="190px" align="center">
          <template v-slot="{ row }">
            <span v-if="row.detail_feedback == 1">Yes</span>
            <span v-else="row.detail_feedback == 0">No</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="280" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              Edit
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="getList" />


      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top">

        <el-form-item label="Full Name">
          <el-input v-model="temp.full_name" />
        </el-form-item>

        <el-form-item label="Email">
          <el-input v-model="temp.email" />
        </el-form-item>

        <el-form-item label="Phone No">
          <el-input v-model="temp.phone_no" />
        </el-form-item>

        <el-form-item label="Location">
          <el-input v-model="temp.location" />
        </el-form-item>


        <el-form-item label="Type of User" prop="type_of_user">
          <el-select v-model="temp.type_of_user" reserve-keyword placeholder="Please Select">
            <el-option v-for="item in typeUsers" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="Participate in Program" prop="participate_in_program">
          <el-radio-group v-model="temp.participate_in_program">
            <el-radio :label="1" class="box-radio box-radio-term-condition">Yes</el-radio>
            <el-radio :label="0" class="box-radio box-radio-term-condition">No</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Detail_Feedback" prop="detail_feedback">
          <el-radio-group v-model="temp.detail_feedback">
            <el-radio :label="1" class="box-radio box-radio-term-condition">Yes</el-radio>
            <el-radio :label="0" class="box-radio box-radio-term-condition">No</el-radio>
          </el-radio-group>
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
import { Listing, delRecord, update,excelExport } from '@/api/insightProgram'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'Index',
  components: { Pagination, Tinymce },
  directives: { waves, permission },
  data() {
    return {
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      customUserForm: {
      },
      rules: {
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      participateProgram: [
        {
          label: 'Yes',
          value: 1,
        },
        {
          label: 'No',
          value: 0,
        },
      ],
      DetailFeedBack: [
        {
          label: 'Yes',
          value: 1,
        },
        {
          label: 'No',
          value: 0,
        },
      ],
      temp: {
        full_name: null,
        email: null,
        location: null,
        type_of_user: null,
        phone_no: null,
        participate_in_program: false,
        detail_feedback: false,
      },
      typeUsers: [
        {
          label: 'Educator',
          value: 1
        },
        {
          label: 'EDU Busniess',
          value: 2
        },
        {
          label: 'Other',
          value: 4
        },
        {
          label: 'Vendor',
          value: 5
        },
      ],
      listQuery: {
        page: 1,
        limit: 50,
        full_name: undefined,
        email: undefined,
        phone_no: undefined,
        type_of_user: undefined,
        participate_in_program: undefined,
        detail_feedback: undefined,
      },
    }
  },
  watch: {
    temp: {
      handler(newVal) {
        if (newVal.type_of_user === "1") {
          this.temp.type_of_user = "Educator";
          // Do something when type_of_user changes to 1
        }
        else if (newVal.type_of_user === "2") {
          this.temp.type_of_user = "EDU Busniess";
        }

        else if (newVal.type_of_user === "4") {
          this.temp.type_of_user = "Other";
        }


        else if (newVal.type_of_user === "5") {
          this.temp.type_of_user = "Vendor";
        }


        else {
          // Handle other cases
        }
      },
      deep: true
    }
  },
  computed: {
    setAccordingToType() {
      if (this.temp.type_of_user === "1") {
        // Set the value according to the condition
        return 'Educator';
      }
      else if (this.temp.type_of_user === "2") {
        return "EDU Busniess";
      }
      else if (this.temp.type_of_user === "4") {
        return "Other";
      }
      else if (this.temp.type_of_user === "5") {
        return "Vendor";
      }
      else {
        return '';
      }
    },
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    clearFilters() {
      this.listQuery.page = 1;
      this.listQuery.full_name = undefined;
      this.listQuery.email = undefined;
      this.listQuery.type_of_user = undefined;
      this.listQuery.phone_no = undefined;
      this.listQuery.participate_in_program = undefined;
      this.listQuery.detail_feedback = undefined;
      this.getList()
    },
    downloadExcel() {
      excelExport(this.list)
        .then(response => {
          var fileURL = window.URL.createObjectURL(new Blob([response]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'insideProgram.xlsx');
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
    capitalizeFirstCharacter(value) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    },

    getList() {
      this.listLoading = true
      Listing(this.listQuery).then(response => {
        this.list = response.message.data.filter(item => item)
        this.total = response.message.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    handleDelete(row) {
      this.customUserForm.insight_id = row.id;
      this.customUserForm.is_delete = 1;
      let data = Object.assign({}, this.customUserForm);
      this.$confirm('Are you sure?', 'Tips', {
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        console.log('data is coming', data)
        delRecord(data).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.getList()
          } else {
            this.$message.warning(res.msg)
          }
          this.customUserDialogFormVisible = false;
        }).catch(err => {
          this.$message.error(err)
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'something went wrong'
        });
      });
    },
    async handleUpdate(row) {
      this.temp = Object.assign({}, row)

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