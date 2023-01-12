<template>
  <div class="vip-container">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top"
             style=" margin-left:50px;"
    >

      <el-form-item label="Level CN" prop="level_cn">
        <el-input v-model="temp.level_cn" type="text"/>
      </el-form-item>
      <el-form-item label="Level EN" prop="level_en">
        <el-input v-model="temp.level_en" type="text"/>
      </el-form-item>
      <el-form-item label="Description" prop="desc">
        <el-input v-model="temp.desc" type="textarea" :rows="6"/>
<!--        <tinymce v-model="temp.desc" width="100%" :height="300"/>-->
      </el-form-item>
      <el-form-item label="Level" prop="level">
        <el-input v-model="temp.level" type="text"/>
      </el-form-item>
      <el-form-item label="Identity" prop="identity">
        <el-select
          v-model="temp.identity"
          filterable
          default-first-option
          placeholder="Please Select Identity">
          <el-option
            v-for="item in identityOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Deals Num" prop="deals_num">
        <el-input v-model="temp.deals_num" type="text"/>
      </el-form-item>
      <el-form-item label="Events Num" prop="events_num">
        <el-input v-model="temp.events_num" type="text"/>
      </el-form-item>
      <el-form-item label="Amount(Price CNY)" prop="money">
        <el-input v-model="temp.money" type="text"/>
      </el-form-item>
      <el-form-item label="Actual Amount(Price CNY)" prop="original_money">
        <el-input v-model="temp.original_money" type="text"/>
      </el-form-item>
      <el-form-item label="Amount(Price $)" prop="dollar">
        <el-input v-model="temp.dollar" type="text"/>
      </el-form-item>
      <el-form-item label="Actual Amount(Price $)" prop="original_dollar">
        <el-input v-model="temp.original_dollar" type="text"/>
      </el-form-item>

      <el-form-item label="Discount" prop="discount">
        <el-input v-model="temp.discount">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Duration" prop="month_num">
        <el-input v-model="temp.month_num" type="text"/>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :loading="confirmBtnLoading"
          @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
// import Tinymce from '@/components/Tinymce'
import {addVipLevel} from "@/api/admin";
import {decode} from 'js-base64'

export default {
  name: "vipListEdit",
  components: {},
  data() {
    return {
      dialogStatus: '',
      confirmBtnLoading: false,
      identityValue: 1,
      identityOptions: [
        {
          id: 1,
          label: 'Educator'
        },
        {
          id: 2,
          label: 'Business'
        },
        {
          id: 3,
          label: 'Vendor'
        }
      ],
      uploadRequestUrl: process.env.VUE_APP_UPLOAD_API,
      temp: {
        identity: undefined,
        level: undefined,
        level_cn: undefined,
        level_en: undefined,
        desc: undefined,
        deals_num: undefined,
        events_num: undefined,
        money: undefined,
        dollar: undefined,
        discount: undefined,
        month_num: undefined
      },
      rules: {
        level_cn: [{required: true, message: 'level cn is required', trigger: 'change'}],
        level_en: [{required: true, message: 'level en is required', trigger: 'change'}]
      },

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
  mounted() {
    let id = this.$route.query.id

    if (id) {
      let info = this.$route.query.info
      this.temp = Object.assign({}, JSON.parse(decode(info)))
      this.dialogStatus = 'update'
    } else {
      this.dialogStatus = 'create'
    }

  },
  methods: {

    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {

          // this.temp.image_url = this.fileUrl
          addVipLevel(this.temp).then((res) => {
            console.log(res)

            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            this.$router.push({path: '/config/vip/list'})

          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.confirmBtnLoading = true;
          const tempData = Object.assign({}, this.temp)

          addVipLevel(tempData).then((res) => {
            console.log(res)
            if (res.code == 200) {
              this.confirmBtnLoading = false;
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.$router.push({path: '/config/vip/list'})

            }
          }).catch(err => {
            console.log(err)
            this.confirmBtnLoading = false;
          })
        }
      })
    },


  }

}
</script>

<style scoped>
.vip-container {
  padding: 40px;
}
</style>
