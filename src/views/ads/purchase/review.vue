<template>
  <div class="container">
    <el-table
      :data="myAdsData"
      style="width: 100%"
      border
      >
      <el-table-column
        fixed
        prop="id"
        label="ID"
        width="150">
        <template v-slot="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column
        prop="ad_category_id"
        label="Category Name"
        width="150">
        <template v-slot="scope" v-if="scope.row.ad_category">
          {{ scope.row.ad_category.name_en }}
        </template>
      </el-table-column>
      <el-table-column
        label="Profile"
        width="150">
        <template v-slot="scope" v-if="scope.row.ad_category">
          {{ scope.row.ad_category.name_key }}
        </template>
      </el-table-column>
      <el-table-column
        prop="user_id"
        label="UserId"
        width="150">
        <template v-slot="scope">
          {{ scope.row.user_id }}
        </template>
      </el-table-column>
      <el-table-column
        prop="image_url"
        label="Image"
        width="150">
        <template v-slot="scope">
          <el-image
            style="width: 100px; height: 60px"
            :src="scope.row.image_url"
            fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="Status"
        width="150">
        <template v-slot="scope">
          <el-tag  type="success" v-if="scope.row.status == 1">Success</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 2">Rejected</el-tag>
          <el-tag type="info" v-if="scope.row.status == 3">Pending</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Action"
        width="120">
        <template v-slot="scope">
          <el-button
            @click.native.prevent="review(scope.row)"
            type="primary"
            size="small">
            Review
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getMyAds"
    />

    <div class="redeem-dialog">

      <el-dialog title="Redeem" :visible.sync="redeemDialogFormVisible">
        <el-form :model="form">
          <el-form-item label="Status" :label-width="formLabelWidth">
            <el-select v-model="form.status" placeholder="Please Select">
              <el-option v-for="(option,index) in reviewOptionsData" :key="index" :label="option.label"
                         :value="option.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Content" :label-width="formLabelWidth">
            <el-input v-model="form.content" type="text"/>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="redeemDialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit()">Confirm</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import {approveAdList, approveAds} from "@/api/ads";
import Pagination from '@/components/Pagination'

export default {
  name: "review",
  components: {Pagination},
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
      },
      total: 0,
      myAdsData: [],
      redeemDialogFormVisible: false,
      form: {
        my_ads_id: 0,
        content:'',
        status:0,
        is_delete:0
      },
      formLabelWidth: '120px',
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      imageFileList: [],
      reviewOptionsData: [
        {
          label: "Success",
          value: 1
        },
        {
          label: "Pending",
          value: 3
        },
        {
          label: "Rejected",
          value: 2
        }
      ]

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
    this.getMyAds()
  },
  methods: {
    getMyAds() {

      approveAdList(this.listQuery).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.myAdsData = res.message.data;
          this.total = res.message.total
        }
      }).catch(err => {
        console.log(err)
      })
    },
    review(row) {
      console.log(row)
      this.redeemDialogFormVisible = true;
      this.form.my_ads_id = row.my_ads_id;

    },
    uploadImageSuccess(response) {
      if (response.code === 200) {
        this.imageFileList = [{name: '', url: response.data[0].file_url}]
        this.form.image_url = response.data[0].file_url
      } else {
        console.log(response.msg)
      }
    },
    submit() {
      console.log(this.form)
      approveAds(this.form).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.redeemDialogFormVisible = false;
          this.resetForm();
        } else {
          this.$message.warning(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    resetForm() {
      this.form = {
        my_ads_id: 0,
        content:'',
        status:0,
        is_delete:0
      }
    }

  }
}
</script>

<style scoped>
.container {
  width: 94%;
  margin: 40px auto 0;
  border: 1px solid #eeeeee;
}

</style>
