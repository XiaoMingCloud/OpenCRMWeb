<template>
  <div class="system-customer-ios">
    <xr-header
      icon-class="xiaomingcloud open-s-seas"
      icon-color="#487DFF"
      label="业务参数设置" />
    <div class="customer-content-ios">
      <!-- 客户管理导航 -->
      <div class="system-view-nav-ios">
        <div
          v-for="(item, index) in menuList"
          :key="index"
          :class="{'is-select' : item.key == menuIndex}"
          class="menu-item-ios"
          @click="menuSelect(item.key)">
          {{ item.label }}
        </div>
      </div>
      <keep-alive>
        <component
          :is="componentName"
          :types="types"
          class="system-view-content-ios"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import FollowLogTypeSet from './components/FollowLogTypeSet'
import BusinessGroupSet from './components/BusinessGroupSet'
import ProductCategorySet from './components/ProductCategorySet'
import ContractExpireSet from './components/ContractExpireSet'
import CustomerLimitSet from './components/CustomerLimitSet'
import VisitRemindSet from './components/VisitRemindSet'
import SerialNumberSet from './components/SerialNumberSet'
import XrHeader from '@/components/XrHeader'

export default {
  name: 'BizParamIos',
  components: {
    BusinessGroupSet,
    ProductCategorySet,
    FollowLogTypeSet,
    ContractExpireSet,
    CustomerLimitSet,
    VisitRemindSet,
    SerialNumberSet,
    XrHeader
  },
  data() {
    return {
      menuList: [
        { label: '跟进记录类型设置', key: 'follow-log-type-set' },
        { label: '商机组设置', key: 'business-group-set' },
        { label: '产品类别设置', key: 'product-category-set' },
        { label: '合同到期提醒设置', key: 'contract-expire-set' },
        { label: '拥有客户数限制', key: 'own' },
        { label: '锁定客户数限制', key: 'lock' },
        { label: '客户回访提醒设置', key: 'VisitRemindSet' },
        { label: '编号规则设置', key: 'SerialNumberSet' }
      ],
      menuIndex: 'follow-log-type-set',
      types: ''
    }
  },
  computed: {
    componentName() {
      if (this.menuIndex === 'own' || this.menuIndex === 'lock') {
        return 'customer-limit-set'
      }
      return this.menuIndex
    }
  },
  methods: {
    menuSelect(key) {
      if (key === 'own' || key === 'lock') {
        this.types = { own: 1, lock: 2 }[key]
      }
      this.menuIndex = key
    }
  }
}
</script>

<style lang="scss" scoped>
.system-customer-ios {
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;

  /deep/ .xr-header {
    border-radius: 16px;
    background: rgba(255,255,255,0.65);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    padding: 15px 30px;
  }
}

.customer-content-ios {
  flex: 1;
  display: flex;
  overflow: hidden;
  margin-top: 15px;
}

/* 左侧导航毛玻璃 */
.system-view-nav-ios {
  min-width: 200px;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  margin-right: 12px;
  padding-top: 20px;
}

/* 导航菜单项 */
.menu-item-ios {
  color: #333;
  font-size: 13px;
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0,122,255,0.08);
  }

  &.is-select {
    background: rgba(0,122,255,0.15);
    color: #007aff;
  }

  &.is-select::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 3px;
    background-color: #5383ed;
    border-radius: 2px 0 0 2px;
  }
}

/* 右侧内容区域 */
.system-view-content-ios {
  flex: 1;
  border-radius: 16px;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding: 15px;
}
</style>
