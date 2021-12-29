<template>
  <div class="container">
    <el-table
      :data="myAdsData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="mini"
      max-height="850">
      <el-table-column
        fixed
        prop="id"
        label="ID"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column
        prop="ad_category_id"
        label="Category Name"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.ad_category.name_en }}
        </template>
      </el-table-column>
      <el-table-column
        prop="user_id"
        label="UserId"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.user_id }}
        </template>
      </el-table-column>
      <el-table-column
        prop="user_buy_identity"
        label="User Identity"
        width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.user_buy_identity === 0">Guest</span>
          <span v-if="scope.row.user_buy_identity === 1">Educator</span>
          <span v-if="scope.row.user_buy_identity === 2">Business</span>
          <span v-if="scope.row.user_buy_identity === 3">Vendor</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="First & Last Name"
        width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.user_buy_identity == 0">Guest</span>
          <span
            v-if="scope.row.user_buy_identity == 1 && scope.row.educator">{{ scope.row.educator.first_name }} {{ scope.row.educator.last_name }}</span>
          <span
            v-if="scope.row.user_buy_identity == 2 && scope.row.business ">{{ scope.row.business.first_name }} {{ scope.row.business.last_name }}</span>
          <span
            v-if="scope.row.user_buy_identity == 3 && scope.row.vendor">{{ scope.row.vendor.first_name }} {{ scope.row.vendor.last_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_design"
        label="Design?"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.is_design }}
        </template>
      </el-table-column>

      <el-table-column
        prop="pay_time"
        label="Pay Time"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.pay_time }}
        </template>
      </el-table-column>

      <el-table-column
        label="Action"
        fixed="right"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="redeem(scope.row)"
            type="primary"
            size="mini">
            Redeem
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
          <el-form-item label="Image">
            <el-upload
              class="upload-demo"
              drag
              :headers="uploadHeaders"
              name="file[]"
              :action="uploadRequestUrl"
              multiple
              list-type="picture"
              :limit="1"
              :on-success="uploadImageSuccess"
              :file-list="imageFileList"
            >
              <i class="el-icon-upload"/>
              <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="Type" :label-width="formLabelWidth">
            <el-select v-model="form.type" placeholder="Please Select">
              <el-option v-for="(option,index) in typeOptionsData" :key="index" :label="option.label"
                         :value="option.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="TypeId" :label-width="formLabelWidth">
            <el-input v-model="form.type_id" type="number"/>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="redeemDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import {myAds, setUserAds} from "@/api/ads";
import Pagination from '@/components/Pagination'

export default {
  name: "list",
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
        image_url: '',
        type: 0,
        type_id: 0,
        ad_category_id: 0,
        user_id: 0,
        my_ads_id: 0
      },
      formLabelWidth: '120px',
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      imageFileList: [],
      typeOptionsData: [
        {
          label: "Educator Profile",
          value: 1
        },
        {
          label: "Business Profile",
          value: 2
        },
        {
          label: "Vendor Profile",
          value: 3
        },
        {
          label: "Jobs",
          value: 4
        },
        {
          label: "Deals",
          value: 5
        },
        {
          label: "Vendor Events",
          value: 6
        },
        {
          label: "Business Events",
          value: 7
        },

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

      myAds(this.listQuery).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.myAdsData = res.message.data;
          this.total = res.message.total
        }
      }).catch(err => {
        console.log(err)
      })
    },
    redeem(row) {
      console.log(row)
      this.redeemDialogFormVisible = true;
      this.form.ad_category_id = row.ad_category_id;
      this.form.user_id = row.user_id;
      this.form.my_ads_id = row.id;

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
      setUserAds(this.form).then(res => {
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
        image_url: '',
        type: 0,
        type_id: 0,
        ad_category_id: 0,
        user_id: 0,
        my_ads_id: 0
      }
    }

  }
}
</script>

<style scoped>
.container {
  width: 94%;
  margin: 40px auto 0;

}

</style>
