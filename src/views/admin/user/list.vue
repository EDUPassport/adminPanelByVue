<template>
  <div>
    <div class="filter-container">
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        @click="handleAddCustomUser()"
      >
        Add User
      </el-button>
    </div>

    <div class="content-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          label="ID"
          prop="id"
          align="center"
          width="80"
        >
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Account"
          prop="account"
          align="center"
          width="180"
        >
          <template slot-scope="{row}">
            <span>{{ row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Email"
          prop="email"
          align="center"
          width="180"
        >
          <template slot-scope="{row}">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Real Name"
          prop="realname"
          align="center"
          width="180"
        >
          <template slot-scope="{row}">
            <span>{{ row.realname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Create Time"
          prop="c_time"
          align="center"
          width="180"
        >
          <template slot-scope="{row}">
            <span>{{ row.c_time }}</span>
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
              type="danger"
              @click="handleDelete(row,$index)"
            >
              Delete
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
    </div>

    <div>
      <el-dialog title="Add" :visible.sync="customUserDialogFormVisible">
        <el-form :model="customUserForm">
          <el-form-item label="Account">
            <el-input v-model="customUserForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="customUserForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="customUserForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Real name">
            <el-input v-model="customUserForm.realname" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="customUserDialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleCreate()">Confirm</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {addAdminUser, getAdminList} from "@/api/admin";
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'

export default {
  name: "list",
  components: {Pagination},
  directives: {waves},
  data() {
    return {
      customUserDialogFormVisible: false,
      customUserForm: {
        is_delete: 0,
        admin_id: undefined,
        account: undefined,
        password: undefined,
        realname: undefined,

      },
      list: [],
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleAddCustomUser() {
      this.customUserDialogFormVisible = true;
    },
    getList() {
      this.listLoading = true
      getAdminList(this.listQuery).then(response => {
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
    handleCreate() {
      let data = Object.assign({}, this.customUserForm);
      addAdminUser(data).then(res => {
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
    },
    handleUpdate(row) {
      this.customUserForm = Object.assign({}, row);
      this.customUserForm.admin_id = row.id;
      this.customUserDialogFormVisible = true;
    },
    handleDelete(row) {
      this.customUserForm.admin_id = row.id;
      this.customUserForm.is_delete = 1;
      let data = Object.assign({}, this.customUserForm);
      this.$confirm('Are you sure?', 'Tips', {
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        addAdminUser(data).then(res => {
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
          message: '已取消删除'
        });
      });


    }

  }
}
</script>

<style scoped>
.filter-container {
  margin-top: 20px;
  padding: 20px;
}

.content-container {
  padding: 20px;
}
</style>
