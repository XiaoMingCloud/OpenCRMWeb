
<template>
  <div
    v-loading="loading"
    class="rc-cont">
    <flexbox
      v-for="(item, index) in list"
      :key="index"
      class="ha-cont"
      align="stretch"
      justify="flex-start">
      <div class="ha-week">
        <div>{{ getYMDFormaterTime(item.createTime) }}</div>
        <div>{{ getWeekFormaterTime(item.createTime) }}</div>
      </div>
      <div class="ha-circle"/>
      <div class="ha-time">{{ getTimeFormaterTime(item.createTime) }}</div>
      <div class="ha-name">{{ item.realname }}</div>
      <div class="ha-content">
        <p
          v-for="(info, infoIndex) in item.content"
          :key="infoIndex">{{ info }}</p>
      </div>
      <div class="ha-line"/>
    </flexbox>
  </div>
</template>

<script type="text/javascript">
import { hrmActionRecordQueryAPI } from '@/api/hrm/actionRecord'

import { timeToFormatTime } from '@/utils'

export default {
  name: 'PerformanceHistory', // 相关操作
  components: {},
  props: {
    id: [String, Number]
  },
  data() {
    return {
      loading: false,
      list: []
    }
  },
  computed: {},
  watch: {
    id: function(val) {
      this.list = []
      this.getDetail()
    }
  },
  mounted() {
    this.getDetail()
  },
  activated: function() {
    console.log(3)
  },
  deactivated: function() {
    console.log(4)
  },
  methods: {
    getDetail() {
      this.loading = true
      hrmActionRecordQueryAPI({
        type: 4, // 操作类型 1 员工 2 招聘管理 3 候选人 4 绩效管理
        typeId: this.id
      })
        .then(res => {
          this.loading = false
          const list = res.data || []
          list.forEach(item => {
            item.content = item.content ? JSON.parse(item.content) : []
          })
          this.list = list
        })
        .catch(() => {
          this.loading = false
        })
    },

    getYMDFormaterTime(time) {
      return timeToFormatTime(time)
    },

    getWeekFormaterTime(time) {
      return timeToFormatTime(time, 'dddd')
    },

    getTimeFormaterTime(time) {
      return timeToFormatTime(time, 'H:mm')
    }
  }
}
</script>
<style lang="scss" scoped>
.rc-cont {
  position: relative;
  padding: 10px;
  overflow-y: auto;
  height: 100%;
}

.ha-cont {
  font-size: 12px;
  position: relative;
  line-height: 20px;
  min-height: 40px;
  padding-top: 20px;
  .ha-week {
    margin: 0 17px 0 10px;
    flex-shrink: 0;
    color: #333;
    width: 80px;
    font-weight: bold;
    text-align: center;
  }
  .ha-time {
    padding: 0 10px 0 24px;
    flex-shrink: 0;
    font-size: 13px;
    color: #999;
  }
  .ha-circle {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    z-index: 2;
    border-radius: 9px;
    background-color: white;
    border: 5px solid $xr-color-primary;
  }
  .ha-img {
    flex-shrink: 0;
    margin: -3px 10px 0 10px;
    display: block;
  }
  .ha-name {
    padding: 0 10px;
    flex-shrink: 0;
    color: #333;
    font-size: 14px;
  }
  .ha-content {
    padding: 0px 10px 10px 10px;
    font-size: 14px;
    flex: 1;
    color: #333;
  }
  .ha-line {
    position: absolute;
    z-index: 1;
    width: 1px;
    top: 3px;
    bottom: -3px;
    left: 115px;
    background-color: #e6e6e6;
  }
}
</style>
