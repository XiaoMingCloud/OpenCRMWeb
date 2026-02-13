<template>
  <div class="ios-system-customer">
    <xr-header
      icon-class="xiaomingcloud open-manage"
      icon-color="#2EC2F9"
      label="其他设置" />
    <div class="customer-content">
      <!-- 客户管理导航 -->
      <div class="ios-view-nav">
        <div
          v-for="(item, index) in menuList"
          :key="index"
          :class="{'is-select' : item.key == menuIndex}"
          class="menu-item"
          @click="menuSelect(item.key)">
          {{ item.label }}
        </div>
      </div>
      <keep-alive>
        <component
          :is="menuIndex"
          class="ios-view-content"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import LogWelcome from './components/LogWelcome'
import XrHeader from '@/components/XrHeader'
import CalendarType from './components/CalendarType'
import LogRuleSet from './components/LogRuleSet'

export default {
  name: 'OtherSystem',

  components: {
    LogWelcome,
    CalendarType,
    XrHeader,
    LogRuleSet
  },

  data() {
    return {
      menuList: [
        { label: '系统欢迎语', key: 'LogWelcome' },
        { label: '日志规则设置', key: 'LogRuleSet' },
        { label: '日程类型设置', key: 'CalendarType' }
      ],
      menuIndex: 'LogWelcome',
      types: '' // 区分拥有客户 和 锁定客户
    }
  },

  methods: {
    /**
     * 菜单选择
     */
    menuSelect(i) {
      this.menuIndex = i
    }
  }
}
</script>

<style lang="scss" scoped>
.ios-system-customer {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6edff 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
}

.customer-content {
  flex: 1;
  position: relative;
  display: flex;
  overflow: hidden;
}

// 导航菜单样式
.ios-view-nav {
  min-width: 200px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.75);
  margin-right: 10px;
  padding-top: 20px;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  .menu-item {
    color: #333;
    font-size: 14px;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    position: relative;
    transition: background-color 0.2s ease;

    &.is-select {
      background-color: rgba(0, 122, 255, 0.1);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      background-color: transparent;
      transition: background-color 0.2s ease;
    }

    &:hover::before,
    &.is-select::before {
      background-color: #007AFF;
    }

    &:hover,
    &.is-select {
      background-color: rgba(0, 122, 255, 0.05);
    }
  }
}

// 内容区域样式
.ios-view-content {
  flex: 1;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.75);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 768px) {
  .ios-system-customer {
    padding: 10px;
  }

  .ios-view-nav {
    min-width: 180px;
    border-radius: 14px;
  }

  .ios-view-content {
    border-radius: 14px;
  }
}
</style>
