<template>
  <flexbox class="hrm-tips" orient="vertical" align="center" justify="center">
    <p class="title">人力资源-员工端</p>
    <p class="message">您尚未开通员工端，请联系公司管理员将您添加至人力资源-员工管理<span style="color: #666;">(手机号须与此账号一致)</span></p>
    <el-divider>管理员可以按照以下步骤完成设置</el-divider>

    <flexbox class="steps" justify="space-between">
      <div class="step">
        <div class="step-title">1.在“员工管理”点击“从组织架构中选择”</div>
      </div>
      <div class="step">
        <div class="step-title">2.选择要添加的员工</div>
      </div>
      <div class="step">
        <div class="step-title">3.完善员工信息后保存</div>
      </div>
    </flexbox>

    <p class="des-title">开通员工端，体验更多功能</p>
    <flexbox class="des-list" wrap="wrap">
      <flexbox
        v-for="(item, index) in desList"
        :key="index"
        align="stretch"
        class="des-item">
        <div class="des-item__icon">
          <i :class="item.icon" />
        </div>
        <div class="des-item__body">
          <p class="des-item-title">{{ item.title }}</p>
          <p class="des-item-des">{{ item.des }}</p>
        </div>
      </flexbox>
    </flexbox>
  </flexbox>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // 人资提示
  name: 'HrmTips',

  components: {},

  props: {},

  data() {
    return {
      desList: [{
        title: '我的档案',
        des: '云存储个人基本信息，岗位信息等资料，支持自助修改个人信息。',
        icon: 'wk wk-archive'
      }, {
        title: '绩效管理',
        des: '员工填写绩效目标与存档，灵活调整进度；绩效相关跟进人一键确认目标，评定结果。',
        icon: 'wk wk-perform'
      }, {
        title: '我的社保',
        des: 'HR生成每月社保报表，员工端同步更新，各险种缴纳清晰可查。',
        icon: 'wk wk-social'
      }, {
        title: '我的工资条',
        des: '员工可在此查收HR发送的工资条，查看后系统自动返回查看状态。',
        icon: 'wk wk-icon-slip'
      }]
    }
  },

  computed: {
    ...mapGetters(['hrm'])
  },

  watch: {},

  created() {
    if (this.hrm) {
      this.$router.replace('/hrm')
    }
  },

  mounted() {},

  beforeDestroy() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.hrm-tips {
  height: 100%;
  .title {
    font-size: 20px;
    color: $xr-color-primary;
    font-weight: bold;
  }

  .message {
    margin-top: 20px;
  }

  .el-divider {
    width: 450px;
    margin-top: 50px;
    /deep/ .el-divider__text {
      font-size: 12px;
      color: #999;
    }
  }

  .des-title {
    font-size: 20px;
    font-weight: bold;
  }

  .des-list {
    margin-top: 50px;
    width: 800px;
    .des-item {
      flex: 0 0 40%;
      margin-top: 20px;

      &__icon {
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 10px;
        flex-shrink: 0;
        background-color: $xr-color-primary;
        i {
          color: white;
          font-size: 28px;
        }
      }

      &__body {
        margin-left: 15px;
        .des-item-title {
          font-weight: bold;
        }

        .des-item-des {
          margin-top: 8px;
          font-size: 12px;
          color: #999;
          line-height: 1.5;
        }
      }

      &:nth-child(even) {
        margin-left: 20%;
      }
    }
  }

  .steps {
    width: 90%;
    margin-top: 20px;
    margin-bottom: 80px;
    .step {
      width: 33%;
      text-align: center;
      .step-title {
        font-weight: bold;
      }

      img {
        width: 80%;
        margin-top: 20px;
      }
    }
  }
}
</style>
