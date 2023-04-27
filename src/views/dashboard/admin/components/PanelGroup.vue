<template>
<div>
  <el-row >
    <el-col style="text-align: end;">
  <el-select v-model="value"  placeholder="Select" @change="getIndexCount()">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</el-col>
  </el-row>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('userCount')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Number of new sign up's {{value}}
          </div>
          <count-to :start-val="0" :end-val="newUsers" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('userCount')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            All Users
          </div>
          <count-to :start-val="0" :end-val="userCount" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('userCount')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            No of Job applications
          </div>
          <count-to :start-val="0" :end-val="applyUserCount" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('userCount')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Rate of Successful Applications
          </div>
          <count-to :start-val="0" :end-val="interestedCount" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('deal')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Deal
          </div>
          <count-to :start-val="0" :end-val="dealCount" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('event')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Event
          </div>
          <count-to :start-val="0" :end-val="eventCount" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('job')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Job
          </div>
          <count-to :start-val="0" :end-val="jobCount" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('job')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Applied Job
          </div>
          <count-to :start-val="0" :end-val="jobAppliedCount" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { indexCount } from '@/api/admin'
import {ADMIN_COUNT_INDEX} from "@/api/api";

export default {
  components: {
    CountTo
  },
  data() {
    return {
      dealCount: 0,
      eventCount: 0,
      jobCount: 0,
      newUsers: 0,
      userCount: 0,
      applyUserCount:0,
      interestedCount:0,

      educatorCount:0,
      businessCount:0,
      vendorCount:0,
      jobAppliedCount:0,
       value :'today',
 options : [
  {
    value: 'past_hour',
    label: 'Past Hour',
  },
  {
    value: 'past_24_hour',
    label: 'Past 24 Hour',
  },
  {
    value: 'past_7_day',
    label: 'Past 7 Day',
  },
  {
    value: 'past_30_day',
    label: 'Past 30 Day',
  },
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'yesterday',
    label: 'Yesterday',
  },
  {
    value: 'this_week',
    label: 'This Week',
  },
  {
    value: 'this_month',
    label: 'This Month',
  },
  {
    value: 'last_month',
    label: 'Last Month',
  },
  {
    value: 'this_year',
    label: 'This Year',
  },
]

    }
  },
  mounted() {
    this.getIndexCount()
    // this.getAdminCountIndex()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getIndexCount() {
       let params={
      'time':this.value
       }
      indexCount(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.dealCount = res.message.deal_count
          this.eventCount = res.message.event_count
          this.jobCount = res.message.job_count
          this.jobAppliedCount = res.message.applied_job_count
          this.newUsers = res.message.new_users
          this.userCount = res.message.all_user
          this.applyUserCount = res.message.apply_user
          this.interestedCount = res.message.happy_user          
          // this.newUsers = res.message.new_users
          // this.userCount = res.message.user_count
          // this.educatorCount = res.message.educator_count
          // this.businessCount = res.message.business_count
          // this.vendorCount = res.message.vendor_count
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getAdminCountIndex(){
      ADMIN_COUNT_INDEX().then(res=>{
        console.log(res)
        if(res.code === 200){
          this.newUsers = res.message.one_week_user
          this.userCount = res.message.all_user
          this.applyUserCount = res.message.one_week_apply_user
          this.interestedCount = res.message.happy_user
        }

      }).catch(err=>{
        console.log(err)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    min-height: 100px;
    border-radius: 14px;
    cursor: pointer;
    font-size: 12px;

    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 4px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 24px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 14px;

      .card-panel-text {
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
        margin-bottom: 14px;
        min-height: 20px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
