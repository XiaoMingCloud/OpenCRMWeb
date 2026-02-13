<template>
  <div v-loading="loading" class="ios-page">
    <div class="ios-header">
      <h2>日志规则设置</h2>
      <el-tooltip
        content="您可以配置日志规则，在日志模块可以根据日志规则来统计日志完成情况"
        effect="dark"
        placement="top">
        <i class="xiaomingcloud open-help Xiaomingcloud-help-tips"/>
      </el-tooltip>
      <el-button
        type="primary"
        class="save-btn"
        size="medium"
        @click="save">保存</el-button>
    </div>

    <div class="ios-content">
      <!-- 日报规则 -->
      <div class="ios-card">
        <div class="section-header">
          <h3>日报规则</h3>
          <div :class="{ 'is-inactive': dayForm.status == 0 }" class="rule-set">
            <el-switch
              v-model="dayForm.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#007AFF"/>
            <span class="label">已启用规则</span>
          </div>
        </div>

        <el-form ref="dayForm" :model="dayForm" label-width="120px" class="ios-form">
          <el-form-item>
            <template slot="label">
              <span>谁需要提交</span>
              <el-tooltip
                content="默认全部员工"
                effect="dark"
                placement="top">
                <i class="xiaomingcloud open-help Xiaomingcloud-help-tips"/>
              </el-tooltip>
            </template>
            <Xiaomingcloud-user-select
              v-model="dayForm.memberUserId"
              :radio="false"
              style="width: 100%;"/>
          </el-form-item>

          <el-form-item label="需要统计的日志">
            <el-checkbox-group v-model="dayForm.effectiveDay" class="ios-checkbox-group">
              <el-checkbox
                v-for="item in weekDaysOptions"
                :key="item.value"
                :label="item.value"
                class="ios-checkbox">
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="开始提交时间">
            <el-select v-model="dayForm.startTime" class="ios-select">
              <el-option
                v-for="item in dayTimeOptions"
                :key="item"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>

          <el-form-item label="结束提交时间">
            <el-select v-model="dayForm.endTime" class="ios-select">
              <el-option
                v-for="item in dayTimeOptions"
                :key="item"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <!-- 周报规则 -->
      <div class="ios-card">
        <div class="section-header">
          <h3>周报规则</h3>
          <div :class="{ 'is-inactive': weekForm.status == 0 }" class="rule-set">
            <el-switch
              v-model="weekForm.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#007AFF"/>
            <span class="label">已启用规则</span>
          </div>
        </div>

        <el-form ref="weekForm" :model="weekForm" label-width="120px" class="ios-form">
          <el-form-item>
            <template slot="label">
              <span>谁需要提交</span>
              <el-tooltip
                content="默认全部员工"
                effect="dark"
                placement="top">
                <i class="xiaomingcloud open-help Xiaomingcloud-help-tips"/>
              </el-tooltip>
            </template>
            <Xiaomingcloud-user-select
              v-model="weekForm.memberUserId"
              :radio="false"
              style="width: 100%;"/>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              <span>开始提交时间</span>
              <el-tooltip
                content="开始时间为选择时间的00:00"
                effect="dark"
                placement="top">
                <i class="xiaomingcloud open-help Xiaomingcloud-help-tips"/>
              </el-tooltip>
            </template>
            <el-select v-model="weekForm.startDay" class="ios-select">
              <el-option
                v-for="item in weekDaysOptions"
                :key="item.value"
                :label="`每${item.label}`"
                :value="parseInt(item.value)"/>
            </el-select>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              <span>结束提交时间</span>
              <el-tooltip
                content="截止时间为选择时间的24:00"
                effect="dark"
                placement="top">
                <i class="xiaomingcloud open-help Xiaomingcloud-help-tips"/>
              </el-tooltip>
            </template>
            <el-select v-model="weekForm.endDay" class="ios-select">
              <el-option
                v-for="item in weekDaysOptions"
                :key="item.value"
                :label="`每${item.label}`"
                :value="parseInt(item.value)"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <!-- 月报规则 -->
      <div class="ios-card">
        <div class="section-header">
          <h3>月报规则</h3>
          <div :class="{ 'is-inactive': monthForm.status == 0 }" class="rule-set">
            <el-switch
              v-model="monthForm.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#007AFF"/>
            <span class="label">已启用规则</span>
          </div>
        </div>

        <el-form ref="monthForm" :model="monthForm" label-width="120px" class="ios-form">
          <el-form-item>
            <template slot="label">
              <span>谁需要提交</span>
              <el-tooltip
                content="默认全部员工"
                effect="dark"
                placement="top">
                <i class="xiaomingcloud open-help Xiaomingcloud-help-tips"/>
              </el-tooltip>
            </template>
            <Xiaomingcloud-user-select
              v-model="monthForm.memberUserId"
              :radio="false"
              style="width: 100%;"/>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              <span>开始提交时间</span>
              <el-tooltip
                content="开始时间为选择时间的00:00"
                effect="dark"
                placement="top">
                <i class="xiaomingcloud open-help Xiaomingcloud-help-tips"/>
              </el-tooltip>
            </template>
            <el-select v-model="monthForm.startDay" class="ios-select">
              <el-option
                v-for="item in monthTimeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              <span>结束提交时间</span>
              <el-tooltip
                content="截止时间为选择时间的24:00"
                effect="dark"
                placement="top">
                <i class="xiaomingcloud open-help Xiaomingcloud-help-tips"/>
              </el-tooltip>
            </template>
            <el-select v-model="monthForm.endDay" class="ios-select">
              <el-option
                v-for="item in monthTimeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  oaLogRuleSetAPI,
  oaLogRuleQueryAPI
} from '@/api/admin/other'

import CreateSections from '@/components/CreateSections'
import XiaomingcloudUserSelect from '@/components/NewCom/XiaomingcloudUserSelect'
import { objDeepCopy } from '@/utils'

export default {
  name: 'LogRuleSet',

  components: {
    CreateSections,
    XiaomingcloudUserSelect
  },

  data() {
    return {
      loading: false,
      weekDaysOptions: [
        { label: '周一', value: '1' },
        { label: '周二', value: '2' },
        { label: '周三', value: '3' },
        { label: '周四', value: '4' },
        { label: '周五', value: '5' },
        { label: '周六', value: '6' },
        { label: '周日', value: '7' }
      ],
      dayTimeOptions: [],
      monthTimeOptions: [],
      dayForm: { effectiveDay: ['1', '2', '3', '4', '5'], memberUserId: [] },
      weekForm: { memberUserId: [] },
      monthForm: { memberUserId: [] }
    }
  },

  created() {
    for (let i = 7; i <= 23; i++) {
      this.dayTimeOptions.push(i < 10 ? `0${i}:00` : `${i}:00`)
    }
    for (let i = 1; i <= 31; i++) {
      this.monthTimeOptions.push({ label: `每月${i}号`, value: i })
    }
    this.getDetail()
  },

  methods: {
    getDetail() {
      this.loading = true
      oaLogRuleQueryAPI()
        .then(res => {
          this.loading = false
          const dayData = res.data[0] || {}
          this.dayForm = {
            type: dayData.type,
            status: dayData.status,
            ruleId: dayData.ruleId,
            memberUserId: (dayData.memberUser || []).map(item => item.userId),
            effectiveDay: dayData.effectiveDay ? dayData.effectiveDay.split(',') : [],
            startTime: dayData.startTime,
            endTime: dayData.endTime
          }
          const weekData = res.data[1] || {}
          this.weekForm = {
            type: weekData.type,
            status: weekData.status,
            ruleId: weekData.ruleId,
            memberUserId: (weekData.memberUser || []).map(item => item.userId),
            startDay: weekData.startDay,
            endDay: weekData.endDay
          }
          const monthData = res.data[2] || {}
          this.monthForm = {
            type: monthData.type,
            status: monthData.status,
            ruleId: monthData.ruleId,
            memberUserId: (monthData.memberUser || []).map(item => item.userId),
            startDay: monthData.startDay,
            endDay: monthData.endDay
          }
        })
        .catch(() => {
          this.loading = false
        })
    },

    save() {
      if (this.dayForm.status == 1) {
        if (!this.dayForm.effectiveDay || this.dayForm.effectiveDay.length === 0) {
          this.$message.error('请选择需要统计的日志')
          return
        }
        if (!this.dayForm.startTime || !this.dayForm.endTime) {
          this.$message.error('请选择日报规则时间')
          return
        }
      }

      if (this.weekForm.status == 1) {
        if (!this.weekForm.startDay || !this.weekForm.endDay) {
          this.$message.error('请选择周报规则时间')
          return
        }
      }

      if (this.monthForm.status == 1) {
        if (!this.monthForm.startDay || !this.monthForm.endDay) {
          this.$message.error('请选择月报规则时间')
          return
        }
      }

      this.loading = true
      const dayForm = objDeepCopy(this.dayForm)
      dayForm.memberUserId = dayForm.memberUserId.join(',')
      dayForm.effectiveDay = dayForm.effectiveDay.join(',')

      const weekForm = objDeepCopy(this.weekForm)
      weekForm.memberUserId = weekForm.memberUserId.join(',')
      const monthForm = objDeepCopy(this.monthForm)
      monthForm.memberUserId = monthForm.memberUserId.join(',')

      oaLogRuleSetAPI([dayForm, weekForm, monthForm])
        .then(res => {
          this.loading = false
          this.getDetail()
          this.$message.success('操作成功')
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.ios-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6edff 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
}

.ios-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 0 8px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #1d1d1d;
    margin: 0;
  }

  .save-btn {
    background: linear-gradient(135deg, #007aff, #00a6ff);
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4);
    }
  }
}

.ios-content {
  max-width: 720px;
  margin: 0 auto;
}

.ios-card {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.75);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1d1d1d;
      margin: 0;
    }
  }

  .rule-set {
    display: flex;
    align-items: center;

    &.is-inactive {
      opacity: 0.5;
    }

    .label {
      font-size: 13px;
      margin-left: 8px;
      color: #333;
    }
  }

  .ios-form {
    width: 100%;

    ::v-deep .el-form-item__label {
      color: #333;
      font-weight: 500;
    }

    ::v-deep .el-input,
    ::v-deep .el-select {
      .el-input__inner,
      .el-select__input {
        border-radius: 12px !important;
        border: 1px solid rgba(0, 0, 0, 0.1) !important;
        background: rgba(255, 255, 255, 0.8) !important;
        padding: 10px 14px !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
      }
    }

    .ios-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .ios-checkbox ::v-deep .el-checkbox__label {
      font-size: 14px;
    }
  }
}

@media (max-width: 768px) {
  .ios-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .ios-card {
    padding: 16px;
    border-radius: 14px;
  }
}
</style>
