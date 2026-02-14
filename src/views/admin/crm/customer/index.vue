<template>
  <div class="main-ios">
    <xr-header
      icon-class="xiaomingcloud open-s-seas"
      icon-color="#487DFF"
      label="客户公海规则设置"/>
    <div class="main-ios__bd">
      <div class="main-table-header-ios">
        <reminder
          :content="`提示：1、系统在每天的24:00~6:00统一将符合规则的客户退回到公海池<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、当一个客户满足多个公海客户规则时会同时掉入多个公海<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、若修改了“自动收回规则”，新的规则将于“次日生效”，在此之前客户公海成员的数据还是会遵循原规则进行划入`"
          class="xr-reminder"/>
        <el-button
          class="main-table-header-button xr-btn--orange"
          icon="el-icon-plus"
          type="primary"
          @click="addClick">新建公海
        </el-button>
      </div>
      <el-table
        v-loading="loading"
        id="examine-table"
        :data="list"
        :height="tableHeight"
        :cell-class-name="cellClassName"
        class="main-table-ios"
        highlight-current-row
        style="width: 100%"
        @row-click="handleRowClick">
        <el-table-column show-overflow-tooltip prop="poolName" width="150" label="公海名称"/>
        <el-table-column :formatter="fieldFormatter" show-overflow-tooltip prop="adminUser" label="公海管理员"/>
        <el-table-column :formatter="fieldFormatter" show-overflow-tooltip prop="memberUser" label="公海成员"/>
        <el-table-column show-overflow-tooltip prop="customerNum" width="100" label="客户数量"/>
        <el-table-column :formatter="fieldFormatter" show-overflow-tooltip prop="status" width="100" label="状态"/>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick('status', scope)">
              {{ scope.row.status === 0 ? '启用' : '停用' }}
            </el-button>
            <el-button type="text" size="small" @click="handleClick('transfer', scope)">转移</el-button>
            <el-button type="text" size="small" @click="handleClick('edit', scope)">编辑</el-button>
            <el-button type="text" size="small" @click="handleClick('delete', scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="p-contianer-ios">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size.sync="pageSize"
          :total="total"
          class="p-bar"
          background
          layout="prev, pager, next, sizes, total, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </div>
    </div>

    <pool-add
      v-if="createShow"
      :action="createAction"
      @hiden-view="createShow=false"
      @save="getList"/>

    <pool-detail
      v-if="detailShow"
      :id="detailId"
      @hide="detailShow = false"/>
    <pool-transfer
      :visible.sync="transferShow"
      :id="detailId"
      @transfer="getList"/>
  </div>
</template>

<script>
import {
  crmCustomerPoolSetListAPI,
  crmCustomerPoolSetDeleteAPI,
  crmCustomerPoolSetChangeStatusAPI
} from '@/api/crm/customer'

import Reminder from '@/components/Reminder'
import XrHeader from '@/components/XrHeader'
import PoolAdd from './components/PoolAdd'
import PoolDetail from './components/PoolDetail'
import PoolTransfer from './components/PoolTransfer'

export default {
  name: 'SystemPool',
  components: { Reminder, XrHeader, PoolAdd, PoolDetail, PoolTransfer },
  data() {
    return {
      loading: false,
      tableHeight: document.documentElement.clientHeight - 284,
      currentPage: 1,
      pageSize: 15,
      pageSizes: [15, 30, 45, 60],
      total: 0,
      list: [],
      createAction: { type: 'save' },
      createShow: false,
      detailId: '',
      detailShow: false,
      transferShow: false
    }
  },
  mounted() {
    window.onresize = () => {
      this.tableHeight = document.documentElement.clientHeight - 284
    }
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    getList() {
      this.loading = true
      crmCustomerPoolSetListAPI({ page: this.currentPage, limit: this.pageSize })
        .then(res => {
          this.list = res.data.list
          this.total = res.data.totalRow
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    fieldFormatter(row, column) {
      if (column.property === 'adminUser') return (row['adminUser'] || []).map(u => u.realname).join('、')
      if (column.property === 'memberUser') {
        const strName = (row['memberDept'] || []).map(d => d.name).join('、')
        const userName = (row['memberUser'] || []).map(u => u.realname).join('、')
        return strName && userName ? strName + '、' + userName : strName + userName
      }
      if (column.property === 'status') return row.status === 0 ? '停用' : '启用'
      return row[column.property]
    },
    cellClassName({ column }) {
      return column.property === 'poolName' ? 'can-visit--underline' : ''
    },
    addClick() {
      this.createAction = { type: 'save' }
      this.createShow = true
    },
    handleRowClick(row, column) {
      if (column.property === 'poolName') {
        this.detailId = row.poolId
        this.detailShow = true
      }
    },
    handleClick(type, scope) {
      if (type === 'edit') {
        this.createAction = { type: 'update', id: scope.row.poolId, data: scope.row }
        this.createShow = true
      } else if (type === 'transfer') {
        this.detailId = scope.row.poolId
        this.transferShow = true
      } else if (type === 'delete') {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            crmCustomerPoolSetDeleteAPI({ poolId: scope.row.poolId }).then(() => {
              this.list.splice(scope.$index, 1)
              this.$message({ type: 'success', message: '操作成功' })
            })
          })
      } else if (type === 'status') {
        this.$confirm(`您确定要${scope.row.status === 0 ? '启用' : '停用'}该公海?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            crmCustomerPoolSetChangeStatusAPI({
              poolId: scope.row.poolId,
              status: scope.row.status === 0 ? 1 : 0
            }).then(() => {
              scope.row.status = scope.row.status === 0 ? 1 : 0
              this.$message({ type: 'success', message: '操作成功' })
            })
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-ios {
  height: 100%;

  /deep/ .xr-header {
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    padding: 15px 30px;
  }

  &__bd {
    flex: 1;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    margin-top: 12px;
    padding: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
}

.main-table-ios {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.3) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.main-table-header-ios {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.xr-reminder {
  padding: 12px 16px;      // 内边距，让毛玻璃内容有呼吸感
  border-radius: 12px;     // 圆角
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(15px);
}

.p-contianer-ios {
  height: 44px;

  .p-bar {
    float: right;
    margin: 5px 0 0 0;
    font-size: 14px !important;
  }
}

.xr-btn--orange {
  border-radius: 999px !important;
  padding: 8px 20px !important;
  background: linear-gradient(135deg, #ff9f0a, #ff7a00);
  border: none;
  box-shadow: 0 4px 12px rgba(255, 122, 0, 0.3);
  transition: all 0.25s ease;
}

.xr-btn--orange:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(255, 122, 0, 0.4);
}

.el-button--text {
  color: #007aff;
  font-weight: 500;
}

.el-button--text:hover {
  color: #005ecb;
}
</style>
