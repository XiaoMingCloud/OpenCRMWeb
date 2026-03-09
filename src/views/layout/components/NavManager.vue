<template>
  <transition
    name="el-drawer-fade">
    <div
      v-loading="loading"
      :style="{ 'z-index': zIndex, 'left': containerLeft }"
      class="nav-manager">

      <div class="nav-manager__content">

        <div class="nav-section">
          <div class="nav-section__title" title="123123">全部应用</div>
          <flexbox
            class="nav-section__content"
            wrap="wrap">
            <div
              v-for="(item, index) in allList"
              :key="index"
              :class="{'is-future': item.future}"
              class="nav-section-item"
              @click="selectClick(item)">
              <div class="nav-section-item__icon">
                <i :class="item.icon" />
              </div>
              <div class="nav-section-item__label">{{ item.title }}</div>
              <i v-if="isEdit && topList.length < 8 && !item.future && !isHasSelect(item.module)" class="el-icon-circle-plus is-handle" @click.stop="moduleTopClick(item, index)" />
              <span v-if="item.future" class="span-future">{{ item.futureLabel }}</span>
            </div>
          </flexbox>
        </div>

        <div class="nav-section">
          <div class="nav-section__title">置顶应用<span class="nav-section__tips">（最多可设置8个置顶应用，可通过拖拽进行排列）</span>
            <el-button v-if="isEdit" type="primary" @click="saveClick">保存</el-button>
            <el-button v-else @click="isEdit = !isEdit">编辑</el-button>
          </div>
          <draggable
            v-model="topList"
            :options="{ dragClass: 'sortable-drag', forceFallback: false, disabled:!isEdit }"
            style="flex-wrap: wrap;"
            class="vux-flexbox nav-section__content">
            <div
              v-for="(item, index) in topList"
              :key="index"
              class="nav-section-item"
              @click="selectClick(item)">
              <div class="nav-section-item__icon">
                <i :class="item.icon" />
              </div>
              <div class="nav-section-item__label">{{ item.title }}</div>
              <i v-if="isEdit" class="el-icon-remove is-handle" @click.stop="topModuleDelete(item, index)" />
            </div>
          </draggable>

        </div>

      </div>
    </div>
  </transition>
</template>

<script>
import { configSetHeaderModelSortAPI } from '@/api/config'

import { mapGetters, mapState } from 'vuex'
import { getMaxIndex } from '@/utils/index'
import Draggable from 'vuedraggable'

export default {
  // 模块管理
  name: 'NavManager',
  components: {
    Draggable
  },
  props: {
    collapse: Boolean,
    topModule: Array
  },
  data() {
    return {
      zIndex: getMaxIndex(),
      loading: false,
      isEdit: false,
      topList: [],
      allList: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'bi',
      'crm',
      'manage',
      'oa',
      'project',
      'hrm',
      'headerModule'
    ]),
    ...mapState({
      moduleAuth: state => state.app.moduleAuth
    }),
    containerLeft() {
      if (this.collapse) {
        return '79px'
      }

      return '215px'
    },

    topModules() {
      return this.topList.map(item => item.module)
    },

    allItemsObj() {
      var tempsItems = {}
      if (this.crm) {
        tempsItems.crm = {
          title: '客户管理',
          type: 1,
          module: 'crm',
          path: '/crm',
          icon: 'xiaomingcloud open-customer',
          fontSize: '17px'
        }
      }

      if (this.oa && this.oa.taskExamine) {
        tempsItems.taskExamine = {
          title: '任务/审批',
          type: 4,
          module: 'taskExamine',
          path: '/taskExamine',
          icon: 'xiaomingcloud open-office',
          fontSize: '16px'
        }
      }

      if (this.oa && this.oa.log) {
        tempsItems.log = {
          title: '日志',
          type: 3,
          module: 'log',
          path: '/workLog',
          icon: 'xiaomingcloud open-log',
          fontSize: '17px'
        }
      }

      if (this.oa && this.oa.book) {
        tempsItems.book = {
          title: '通讯录',
          type: 6,
          module: 'book',
          path: '/addressBook',
          icon: 'xiaomingcloud open-address-book',
          fontSize: '17px'
        }
      }

      if (this.project) {
        tempsItems.project = {
          title: '项目管理',
          type: 2,
          module: 'project',
          path: '/project',
          icon: 'xiaomingcloud open-project',
          fontSize: '15px'
        }
      }

      if (this.bi) {
        tempsItems.bi = {
          title: '商业智能',
          type: 5,
          path: '/bi',
          module: 'bi',
          icon: 'xiaomingcloud open-business-intelligence',
          fontSize: '18px'
        }
      }

      if (this.oa && this.oa.calendar) {
        tempsItems.calendar = {
          title: '日程',
          type: 8,
          module: 'calendar',
          path: '/calendar/index',
          icon: 'xiaomingcloud open-calendar',
          fontSize: '20px'
        }
      }

      if (this.moduleAuth && this.moduleAuth.hrm) {
        tempsItems.hrm = {
          title: '人力资源',
          type: 11,
          module: 'hrm',
          path: '/hrm',
          icon: 'xiaomingcloud open-employees',
          fontSize: '18px'
        }
      }

      return tempsItems
    }
  },
  watch: {},
  created() {
    const allList = []
    for (const key in this.allItemsObj) {
      allList.push(this.allItemsObj[key])
    }
    this.allList = allList

    this.getHeaderModelSortList()
  },
  mounted() {
    // document.body.appendChild(this.$el)
  },

  beforeDestroy() {
    // if (this.appendToBody && this.$el && this.$el.parentNode) {
    //   this.$el.parentNode.removeChild(this.$el)
    // }
  },
  methods: {
    /**
     * 获取置顶应用
     */
    getHeaderModelSortList() {
      if (this.headerModule.length) {
        const allList = []
        for (let index = 0; index < this.headerModule.length; index++) {
          const key = this.headerModule[index]
          const menu = this.allItemsObj[key]
          if (menu && allList.length < 8) {
            allList.push(menu)
          }
        }
        this.topList = allList
      } else {
        const allList = []
        for (const key in this.allItemsObj) {
          if (allList.length < 8) {
            allList.push(this.allItemsObj[key])
          }
        }
        this.topList = allList
      }
    },

    /**
     * 保存
     */
    saveClick() {
      const keys = this.topList.map(item => item.module)
      this.loading = true
      configSetHeaderModelSortAPI(keys).then(res => {
        this.isEdit = false
        this.$store
          .dispatch('XiaomingcloudHeaderModule')
          .then(res => {
            this.$message.success('操作成功')
            this.loading = false
            this.$emit('change')
          })
          .catch(() => {
            this.loading = false
          })
      }).catch(() => {
        this.loading = false
      })
    },

    /**
     * 判断是否有选择
     */
    isHasSelect(module) {
      return this.topModules.includes(module)
    },

    /**
     * 删除
     */
    topModuleDelete(item, index) {
      if (this.topList.length > 1) {
        this.topList.splice(index, 1)
      }
    },

    /**
     * 模块添加
     */
    moduleTopClick(item, index) {
      if (this.topList.length < 8) {
        this.topList.push(item)
      }
    },

    /**
     * 选择模块
     */
    selectClick(item) {
      if (!item.future && !this.isEdit) {
        this.$emit('select', item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-manager {
  position: absolute;
  top: 64px;
  right: 24px;
  z-index: 3000;
  padding: 18px 18px 26px;
  background: rgba(15, 23, 42, 0.05);
  border-radius: 22px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  &__content {
    position: relative;
    min-width: 520px;
    max-width: 640px;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 18px;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.25);
    padding: 20px 20px 26px;
  }

  &__handle {
    position: absolute;
    right: 20px;
    top: -5px;
  }

  .nav-section {
    &__title {
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 14px;
      color: #111827;
    }

    &__tips {
      margin-left: 8px;
      color: #9ca3af;
      font-weight: normal;
      font-size: 12px;
    }

    &__content {
      margin-top: 16px;
    }
  }

  .nav-section + .nav-section {
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid #e5e7eb;

    .nav-section__title {
      margin-top: 0;
    }
  }

  .nav-section-item {
    text-align: center;
    width: 78px;
    height: 78px;
    margin: 10px;
    cursor: pointer;
    position: relative;
    transition: transform 0.16s ease, box-shadow 0.16s ease;

    &__icon {
      width: 44px;
      height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      background-image: linear-gradient(135deg, #4f8dff, #00c2ff);
      box-shadow: 0 8px 18px rgba(37, 99, 235, 0.45);

      i {
        font-size: 20px;
        color: #ffffff;
      }
    }

    &__label {
      font-size: 13px;
      margin-top: 9px;
      color: #111827;
      white-space: nowrap;
    }

    .el-icon-circle-plus,
    .el-icon-remove {
      color: #f97373;
      cursor: pointer;
    }

    .is-handle {
      position: absolute;
      right: 10px;
      top: -6px;
    }

    .span-future {
      position: absolute;
      top: -6px;
      left: 35px;
      font-size: 11px;
      background: #d1d5db;
      display: inline-block;
      color: #111827;
      padding: 2px 5px;
      border-radius: 999px;
      white-space: nowrap;
      transform: scale(0.9);
    }

    &.is-future {
      cursor: default;

      .nav-section-item__icon {
        background-image: linear-gradient(135deg, #e5e7eb, #d1d5db);
        box-shadow: none;

        i {
          color: #6b7280;
        }
      }

      .nav-section-item__label {
        color: #6b7280;
      }
    }
  }
}
</style>
