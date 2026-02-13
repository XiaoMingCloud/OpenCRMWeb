<template>
  <flexbox
    class="main"
    direction="column"
    align="stretch">
    <xr-header
      icon-class="xiaomingcloud open-all"
      icon-color="#FD964A"
      label="应用管理" />
    <div
      v-loading="loading"
      class="body">
      <div
        v-for="(bigItem, bigIndex) in allList"
        :key="bigIndex"
        class="section">
        <flexbox class="section-header">
          {{ bigItem.name }}
        </flexbox>
        <flexbox
          wrap="wrap"
          class="section-body">
          <flexbox
            v-for="(item, index) in bigItem.sublist"
            :key="index"
            class="section-item">
            <img
              :src="getModuleIcon(item.status, item.module)"
              class="item-icon" >
            <span class="item-name">{{ item.name }}</span>
            <el-dropdown
              v-if="item.canEdit && configSetAuth"
              class="more-menu"
              @command="handleMoreCommand($event, item)">
              <i class="el-icon-more"/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item.status ? 'disable' : 'enable'">{{ item.status ? '停用' : '启用' }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </flexbox>
        </flexbox>
      </div>
    </div>
  </flexbox>
</template>

<script>
import {
  adminConfigsetIndexAPI,
  adminConfigsetUpdateAPI
} from '@/api/admin/application'

import { mapGetters } from 'vuex'

import XrHeader from '@/components/XrHeader'


export default {
  /** 系统管理 的 应用管理 */
  name: 'SystemModule',
  components: {
    XrHeader
  },
  mixins: [],
  data() {
    return {
      loading: false,
      allList: [
        {
          name: '已启用应用',
          type: 1,
          status: 1,
          sublist: []
        },
        {
          name: '已停用应用',
          type: 1,
          status: 0,
          sublist: []
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['manage']),
    configSetAuth() {
      return this.manage && this.manage.configSet && this.manage.configSet.update
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    /**
     * 详情
     */
    getDetail() {
      this.loading = true
      adminConfigsetIndexAPI()
        .then(res => {
          this.loading = false
          res.data.forEach(o => {
            if (o.type == 1) {
              o.canEdit = o.module != 'crm'
            } else {
              o.canEdit = false
            }
          })
          for (let index = 0; index < this.allList.length; index++) {
            const element = this.allList[index]
            element.sublist = res.data.filter(o => {
              if (element.type != o.type) return false
              return element.hasOwnProperty('status') ? element.status == o.status : true
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },

    /**
     * 更多操作
     */
    handleMoreCommand(command, item) {
      this.getConfirmMessage(command, item, () => {
        this.loading = true
        adminConfigsetUpdateAPI({
          settingId: item.settingId,
          status: command == 'disable' ? 0 : 1
        })
          .then(res => {
            this.$message.success('设置成功')
            this.loading = false
            window.location.reload()
          })
          .catch(() => {
            this.loading = false
          })
      })
    },

    /**
     * 操作提示
     */
    getConfirmMessage(command, item, result) {
      if (command == 'enable') {
        result()
      } else {
        this.$confirm(`停用${item.name}后，企业所有员工将无法使用此功能。确定要停用吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            result()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
      }
    },

    getModuleIcon(status, moduleType) {
      if (moduleType == 'call') {
        return require('@/assets/img/system/app/call_enable.png')
      } else {
        const allModule = {
          oa: {
            disable: require('@/assets/img/system/app/oa_disable.png'),
            enable: require('@/assets/img/system/app/oa_enable.png')
          },
          crm: {
            disable: require('@/assets/img/system/app/crm_disable.png'),
            enable: require('@/assets/img/system/app/crm_enable.png')
          },
          project: {
            disable: require('@/assets/img/system/app/project_disable.png'),
            enable: require('@/assets/img/system/app/project_enable.png')
          },
          log: {
            disable: require('@/assets/img/system/app/log_disable.png'),
            enable: require('@/assets/img/system/app/log_enable.png')
          },
          book: {
            disable: require('@/assets/img/system/app/book_disable.png'),
            enable: require('@/assets/img/system/app/book_enable.png')
          },
          taskExamine: {
            disable: require('@/assets/img/system/app/oa_disable.png'),
            enable: require('@/assets/img/system/app/oa_enable.png')
          },
          bi: {
            disable: require('@/assets/img/system/app/bi_disable.png'),
            enable: require('@/assets/img/system/app/bi_enable.png')
          },
          calendar: {
            disable: require('@/assets/img/system/app/ce_disable.png'),
            enable: require('@/assets/img/system/app/ce_enable.png')
          },
          hrm: {
            disable: require('@/assets/img/system/app/hrm_disable.png'),
            enable: require('@/assets/img/system/app/hrm_enable.png')
          }
        }

        if (allModule[moduleType]) {
          return allModule[moduleType][status == 1 ? 'enable' : 'disable']
        } else {
          return {
            disable: require('@/assets/img/system/app/other_disable.png'),
            enable: require('@/assets/img/system/app/other_enable.png')
          }[status == 1 ? 'enable' : 'disable']
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 0 15px;
  height: 100%;
  background-color: #f7f6f2; // iOS背景颜色风格
}

.body {
  flex: 1;
  overflow-y: auto;
  padding-top: 20px;
  background-color: #ffffff;
  border: 1px solid #e5e5ea; // 更柔和的边框颜色
  border-radius: 14px; // 较大的圆角半径
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 添加柔和阴影
}

.section-header {
  padding: 15px 20px;
  font-size: 17px;
  color: #000000;
  font-weight: 600;
}

.section-body {
  padding: 20px;
  .section-item {
    width: 100%; // 宽度调整为100%以适应iOS风格
    min-width: unset;
    position: relative;
    padding: 15px 30px 15px 20px;
    border: 1px solid #e5e5ea; // 更柔和的边框颜色
    border-radius: 14px; // 较大的圆角半径
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 添加柔和阴影
    display: flex;
    align-items: center;
    .item-icon {
      width: 44px;
      height: 44px;
      margin-right: 20px;
    }
    .item-name {
      font-size: 17px;
      color: #000000;
      flex-grow: 1;
    }
  }
}

.el-icon-more {
  color: #cdcdcd;
  transform: rotate(90deg);
  cursor: pointer;
  margin-left: auto; // 对齐图标到右侧
}

.more-menu {
  position: absolute;
  top: 10px;
  right: 10px;
}

.detail-button {
  position: absolute;
  top: 0px;
  right: 8px;
  color: #999;
  font-size: 12px;
}

.more-mark {
  color: #b3884f;
  font-size: 12px;
  background: linear-gradient(to right, #f9f3ed, #f8e1be);
  padding: 5px;
  border-radius: 2px;
  transform: scale(0.8);
  position: absolute;
  top: 6px;
  right: 4px;
}
</style>
