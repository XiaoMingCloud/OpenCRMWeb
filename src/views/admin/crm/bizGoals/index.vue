<template>
  <div class="system-customer-ios">
    <xr-header
      icon-class="xiaomingcloud open-customer"
      icon-color="#2362FB"
      label="业绩目标设置" />
    <div class="customer-content-ios">
      <!-- 业绩目标设置 -->
      <div class="system-view-table-ios">
        <task-set-statistics/>
      </div>
    </div>
  </div>
</template>

<script>
import TaskSetStatistics from './components/TaskSetStatistics' // 业绩目标设置
import XrHeader from '@/components/XrHeader'

export default {
  name: 'BizGoalsIOS', // 业绩目标设置

  components: {
    TaskSetStatistics,
    XrHeader
  },

  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.system-customer-ios {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 15px;

  /deep/ .xr-header {
    padding: 18px 30px;
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
  }
}

.customer-content-ios {
  flex: 1;
  position: relative;
  display: flex;
  overflow: hidden;
  padding-top: 12px;
}

.system-view-table-ios {
  flex: 1;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  padding: 16px;
}
</style>
