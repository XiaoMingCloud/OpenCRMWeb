
<template>
  <flexbox
    class="workbench"
    align="stretch">
    <div class="workbench__left">
      <wb-survey />
      <wb-performance />
    </div>

    <div class="workbench__right">
      <wb-calendar :props="calendarProps" />
    </div>
  </flexbox>
</template>

<script>
import {
  hrmDashboardMyNotesStatusAPI,
  hrmDashboardMyNotesByTimeAPI
} from '@/api/hrm/workbench'

import WbPerformance from './components/WbPerformance'
import WbSurvey from './components/WbSurvey'

import WbCalendar from '../components/WbCalendar'

export default {
  // 工作台
  name: 'EmployeeWorkbench',
  components: {
    WbPerformance,
    WbSurvey,

    WbCalendar
  },
  props: {},
  data() {
    return {
      calendarProps: {
        monthRequest: hrmDashboardMyNotesStatusAPI,
        dayRequest: hrmDashboardMyNotesByTimeAPI
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},

  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.workbench {
  padding-bottom: 40px;
  &__left {
    min-width: 700px;
    flex: 1;
    flex-shrink: 0;
  }

  &__right {
    width: 450px;
    margin-left: 15px;
    flex-shrink: 0;
  }

  .el-card + .el-card {
    margin-top: 15px;
  }
}
</style>
