<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="height: 900px;" @tab-click="tabClick">
      <el-tab-pane v-for="(item,i) in firstData" :key="i" :name="JSON.stringify(item.id)" :label="item.object_en">
        <el-table
          :data="listData"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column label="Id" prop="id" sortable="custom" align="center" width="80">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Name" width="110">
            <template slot-scope="scope">
              {{ scope.row.object_en }}
            </template>
          </el-table-column>
          <el-table-column label="Name (CN)" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.object_cn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Actions" align="center" width="280" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" @click="handleUpdate(row)">
                Edit
              </el-button>
              <el-button size="mini" type="primary" @click="handleDelete(row,$index)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCategory(item.id)" />
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="Update" :visible.sync="dialogFormUpdate">
      <el-form ref="dataForm" :model="updateObj" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Name (En)" prop="object_en">
          <el-input v-model="updateObj.object_en" />
        </el-form-item>
        <el-form-item label="Name (En)" prop="object_cn">
          <el-input v-model="updateObj.object_cn" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormUpdate = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="updateCategory()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { categoryList, updateObject } from '@/api/admin'
import Pagination from '@/components/Pagination'
export default {
  name: 'List',
  components: { Pagination },
  data() {
    return {
      tabPosition: 'left',
      firstData: undefined,
      listData: undefined,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogFormUpdate: false,
      updateObj: {
        object_id: undefined,
        object_cn: undefined,
        object_en: undefined,
        p_name_cn: undefined,
        p_name_en: undefined,
        is_delete: undefined
      },
      id: undefined
    }
  },
  created() {
    this.getCategoryListFirst()
  },
  methods: {
    tabClick(e) {
      console.log(e)
      const id = JSON.parse(e.name)
      this.id = id
      this.getCategory(id)
    },
    handleUpdate(row) {
      this.updateObj = Object.assign({}, row)
      this.updateObj.object_id = row.id
      this.dialogFormUpdate = true
    },
    handleDelete(row) {
      this.updateObj = Object.assign({}, row)
      this.updateObj.object_id = row.id
      this.updateObj.is_delete = 1
      updateObject(this.updateObj).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getCategory(this.id)
          this.dialogFormUpdate = false
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    updateCategory() {
      updateObject(this.updateObj).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getCategory(this.id)
          this.dialogFormUpdate = false
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCategoryListFirst() {
      const params = {
        pid: 0,
        page: 1,
        limit: 100,
        is_delete: 0
      }
      categoryList(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.firstData = res.message.data
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCategory(id) {
      const params = {
        page: this.listQuery.page,
        pid: id,
        limit: this.listQuery.limit,
        is_delete: 0
      }
      categoryList(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.listData = res.message.data
          this.total = res.message.total
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
