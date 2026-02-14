<template>
  <div class="main">
    <xr-header
      icon-class="xiaomingcloud open-record"
      icon-color="#2362FB"
      label="登录日志" />
    <div class="main-body">
      <!-- 搜索栏 -->
      <flexbox class="main-table-header-ios">
        <el-date-picker
          v-model="dateTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"/>
        <Xiaomingcloud-user-select
          :radio="false"
          v-model="userList"
          placeholder="选择人员" />
        <el-button
          type="primary"
          class="btn-ios"
          @click="refreshList">查询</el-button>
        <el-button
          class="btn-ios secondary"
          @click="exportClick">导出</el-button>
      </flexbox>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="list"
        :height="tableHeight"
        :cell-class-name="cellClassName"
        class="main-table-ios"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          v-for="(item, index) in fieldList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip/>
      </el-table>

      <!-- 分页 -->
      <div class="p-container-ios">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size.sync="pageSize"
          :total="total"
          class="p-bar-ios"
          background
          layout="prev, pager, next, sizes, total, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryLoginLogListAPI,
  loginLogExportAPI
} from '@/api/admin/log'

import XrHeader from '@/components/XrHeader'
import XiaomingcloudUserSelect from '@/components/NewCom/XiaomingcloudUserSelect'
import { Loading } from 'element-ui'

import { downloadExcelWithResData } from '@/utils'

export default {
  // 登录日志
  name: 'LoginLog',
  components: {
    XrHeader,
    XiaomingcloudUserSelect
  },
  mixins: [],
  data() {
    return {
      loading: false, // 加载动画
      tableHeight: document.documentElement.clientHeight - 240, // 表的高度
      dateTime: [],
      userList: [],
      list: [],
      fieldList: [
        {
          prop: 'realname',
          label: '用户',
          width: 100
        },
        {
          prop: 'loginTime',
          label: '登录时间',
          width: 150
        },
        {
          prop: 'ipAddress',
          label: 'IP地址',
          width: 100
        },
        {
          prop: 'loginAddress',
          label: '登录地点',
          width: 150
        },
        {
          prop: 'deviceType',
          label: '设备类型',
          width: 150
        },
        {
          prop: 'core',
          label: '终端内核',
          width: 150
        },
        {
          prop: 'platform',
          label: '平台',
          width: 100
        },
        {
          prop: 'authResult',
          label: '认证结果',
          width: 100
        }
      ],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      total: 0,

      postParams: {}
    }
  },
  computed: {},
  mounted() {
    // 控制table的高度
    window.onresize = () => {
      self.tableHeight = document.documentElement.clientHeight - 240
    }

    this.getList()
  },
  methods: {
    refreshList() {
      this.currentPage = 1
      this.getList()
    },

    /** 获取列表数据 */
    getList() {
      this.loading = true
      const params = {
        page: this.currentPage,
        limit: this.pageSize
      }
      if (this.userList && this.userList.length) {
        params.userIds = this.userList
      }

      if (this.dateTime && this.dateTime.length) {
        params.startTime = this.dateTime[0]
        params.endTime = this.dateTime[1]
      }

      this.postParams = params
      queryLoginLogListAPI(params)
        .then(res => {
          const list = res.data.list || []
          list.forEach(item => {
            item.authResult = {
              1: '成功',
              2: '失败'
            }[item.authResult]
          })
          this.list = list
          this.total = res.data.totalRow
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * 通过回调控制class
     */
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (column.property === 'name') {
        return 'can-visit--underline'
      } else {
        return ''
      }
    },
    /**
     *  添加审批流
     */
    exportClick() {
      const loading = Loading.service({ fullscreen: true, text: '导出中...' })
      loginLogExportAPI(this.postParams)
        .then(res => {
          downloadExcelWithResData(res)
          loading.close()
        })
        .catch(() => {
          loading.close()
        })
    },
    // 更改每页展示数量
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    // 更改当前页数
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  padding: 15px;

  /deep/ .xr-header {
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    padding: 15px 30px;
  }
}

.main-body {
  padding: 20px;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
}

/* 搜索栏 iOS 风格 */
.main-table-header-ios {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
  background: rgba(255,255,255,0.35);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 12px;
  padding: 8px 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);

  .el-date-editor--daterange {
    border-radius: 10px;
    background: rgba(255,255,255,0.5);
  }

  .Xiaomingcloud-user-select {
    flex: 1;
    border-radius: 10px;
    background: rgba(255,255,255,0.5);
  }

  .btn-ios {
    border-radius: 999px;
    padding: 8px 20px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.25s ease;
    &.secondary {
      background: rgba(0, 122, 255, 0.15);
      color: #007aff;
    }
  }
}

/* 表格 iOS 毛玻璃风格 */
.main-table-ios {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);

  .el-table__header {
    background: rgba(255,255,255,0.35);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  th {
    background: rgba(255,255,255,0.25) !important;
    color: #333;
    font-weight: 600;
  }

  td {
    border-bottom: 1px solid rgba(0,0,0,0.06);
    color: #444;
    font-size: 14px;
  }

  .el-table__row:hover > td {
    background: rgba(0,122,255,0.06) !important;
    transition: all 0.25s ease;
  }

  .el-table__row.current-row > td {
    background: rgba(0,122,255,0.12) !important;
  }

  .el-table::before {
    display: none;
  }
}

/* 分页 iOS 风格 */
.p-container-ios {
  margin-top: 12px;
  .p-bar-ios {
    border-radius: 12px;
    background: rgba(255,255,255,0.35);
    padding: 4px 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  }
}
</style>
