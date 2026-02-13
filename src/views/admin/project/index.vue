<template>
  <div class="main">
    <xr-header
      icon-class="xiaomingcloud open-project"
      icon-color="#33D08F"
      label="自定义项目权限" />
    <div class="main-body">
      <div class="main-table-header">
        <reminder
          class="project-reminder"
          content="为不同场景下的项目成员所需的权限设置匹配的项目、任务列表、任务的操作权限"/>
        <el-button
          class="main-table-header-button xr-btn--orange"
          type="primary"
          icon="el-icon-plus"
          @click="addJurisdiction">新建权限</el-button>
      </div>
      <el-table
        v-loading="loading"
        id="examine-table"
        :data="list"
        :height="tableHeight"
        class="main-table"
        highlight-current-row
        style="width: 100%"
        @row-click="handleRowClick">
        <el-table-column
          show-overflow-tooltip
          prop="roleName"
          width="150"
          label="项目权限"/>
        <el-table-column
          show-overflow-tooltip
          prop="remark"
          label="项目描述"/>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <div class="action-cell">
              <el-button
                :disabled="scope.row.label == 2"
                type="text"
                size="small"
                @click="handleClick('edit', scope)">
                编辑
              </el-button>

              <el-button
                :disabled="scope.row.roleType == 5"
                type="text"
                size="small"
                @click="handleClick('delete', scope)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <jurisdiction-create
      :show.sync="jurisdictionCreateShow"
      :action="createAction"
      @submite="getList"/>
  </div>
</template>

<script>
import {
  systemRoleQueryProjectRoleListAPI,
  systemRoleDeleteWorkRoleAPI
} from '@/api/admin/project'

import JurisdictionCreate from './components/JurisdictionCreate'
import Reminder from '@/components/Reminder'
import XrHeader from '@/components/XrHeader'

export default {
  /** 系统管理 的 项目管理 */
  name: 'SystemProject',
  components: {
    JurisdictionCreate,
    Reminder,
    XrHeader
  },
  mixins: [],
  data() {
    return {
      loading: false, // 加载动画
      tableHeight: document.documentElement.clientHeight - 196, // 表的高度
      list: [],
      createAction: {
        type: 'save'
      },
      jurisdictionCreateShow: false
    }
  },
  computed: {},
  mounted() {
    var self = this
    /** 控制table的高度 */
    window.onresize = function() {
      self.tableHeight = document.documentElement.clientHeight - 196
    }

    this.getList()
  },
  methods: {
    /**
     * 获取列表数据
     */
    getList() {
      this.loading = true
      systemRoleQueryProjectRoleListAPI()
        .then(res => {
          this.list = res.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    /**
     *  添加权限
     */
    addJurisdiction() {
      this.createAction = {
        type: 'save'
      }
      this.jurisdictionCreateShow = true
    },

    /** 列表操作 */
    /**
     * 当某一行被点击时会触发该事件
     */
    handleRowClick(row, column, event) {},

    /**
     * 编辑删除
     */
    handleClick(type, scope) {
      if (type === 'edit') {
        this.createAction = {
          type: 'update',
          data: scope.row
        }
        this.jurisdictionCreateShow = true
      } else if (type === 'delete') {
        // 启用停用
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            systemRoleDeleteWorkRoleAPI({
              roleId: scope.row.roleId
            })
              .then(res => {
                this.list.splice(scope.$index, 1)
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
              })
              .catch(() => {})
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.main {
  height: 100%;
  display: flex;
  flex-direction: column;

  /* 顶部 Header 毛玻璃 */
  ::v-deep .xr-header {
    padding: 18px 30px;

    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    background: rgba(255,255,255,0.65);
    border-bottom: 1px solid rgba(0,0,0,0.05);

    box-shadow: 0 4px 18px rgba(0,0,0,0.04);
  }
}

/* ===== 页面主体 ===== */

.main-body {
  flex: 1;
  margin: 20px;
  padding: 0;
  padding: 10px 10px 20px;
  border-radius: 24px;

  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);

  box-shadow:
    0 20px 50px rgba(0,0,0,0.08),
    0 2px 6px rgba(0,0,0,0.04);

  overflow: hidden;
}

/* ===== 表头区域 ===== */

.main-table-header {
  height: 60px;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid rgba(0,0,0,0.05);

  background: rgba(255,255,255,0.4);
}

/* 新建按钮 iOS 蓝 */
.main-table-header-button {
  border-radius: 20px !important;
  padding: 8px 22px !important;

  background: linear-gradient(135deg,#0A84FF,#4DA3FF) !important;
  border: none !important;

  box-shadow: 0 6px 18px rgba(10,132,255,0.35);
  transition: all .2s ease;
}

.main-table-header-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(10,132,255,0.45);
}

/* ===== 提醒文字 ===== */

.project-reminder {
  font-size: 14px;
  color: #6e6e73;
}

/* ===== 表格整体 ===== */

.main-table {
  padding: 0px;
}

/* 表格毛玻璃（⚠ 移除 overflow: hidden 解决 fixed 错位） */
::v-deep .el-table {
  border-radius: 18px;
  background: rgba(255,255,255,0.6);
}

/* 移除默认底部线 */
::v-deep .el-table::before {
  display: none;
}

/* ===== 修复 fixed 右侧列错位 ===== */

/* 让 fixed 列高度跟随主表 */
::v-deep .el-table__fixed-right {
  bottom: 0 !important;
}

::v-deep .el-table__fixed {
  bottom: 0 !important;
}

::v-deep .el-table__fixed-right-patch {
  background: transparent !important;
}

/* ===== 表头 ===== */

::v-deep .el-table th {
  background: rgba(245,245,247,0.85);
  font-weight: 500;
  color: #1d1d1f;
}

/* ===== 行 hover 同步主表 + fixed ===== */

::v-deep .el-table__body tr:hover > td,
::v-deep .el-table__fixed-right .el-table__body tr:hover > td {
  background: rgba(10,132,255,0.08) !important;
}

/* ===== 选中行同步 ===== */

::v-deep .el-table__body tr.current-row > td,
::v-deep .el-table__fixed-right .el-table__body tr.current-row > td {
  background: rgba(10,132,255,0.12) !important;
}

/* 单元格 */
::v-deep .el-table td {
  border-bottom: 1px solid rgba(0,0,0,0.04);
}

/* ===== 操作按钮 ===== */

::v-deep .el-button--text {
  border-radius: 12px;
  padding: 4px 10px;
  transition: all .2s;
}

::v-deep .el-button--text:hover {
  background: rgba(10,132,255,0.1);
}

/* 删除按钮偏红 */
::v-deep .el-button--text:nth-child(2) {
  color: #ff3b30;
}

::v-deep .el-button--text:nth-child(2):hover {
  background: rgba(255,59,48,0.1);
}

/* ===== 加载动画柔化 ===== */

::v-deep .el-loading-mask {
  backdrop-filter: blur(6px);
  background: rgba(255,255,255,0.6);
}

/* ===== 弹窗统一圆角 ===== */

::v-deep .el-dialog {
  border-radius: 26px;
  overflow: hidden;
}

::v-deep .el-dialog__header {
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

/* ===== 滚动条 iOS 细化 ===== */

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.15);
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}
/* 操作列强制居中对齐 */
::v-deep .action-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 100%;
}

/* 修复 fixed 和主表单元格高度不同步 */
::v-deep .el-table__fixed-right td {
  vertical-align: middle;
}

</style>
