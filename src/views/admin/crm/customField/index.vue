<template>
  <div class="system-customer">
    <xr-header
      icon-class="xiaomingcloud open-double-gear"
      icon-color="#1CBAF5"
      label="自定义字段设置" />
    <div class="customer-content">
      <el-table
        v-loading="loading"
        :data="tableList"
        :height="tableHeight"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="name"
          label="模块"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <img
              :src="getCustomFieldIcon( scope.row.label)"
              class="table-item-icon" >
            <span class="table-item-label">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="更新时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="table-item-time">{{ scope.row.updateTime == 0 ? '暂无' : scope.row.updateTime }}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleCustomField('edit', scope.row, scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { customFieldIndexAPI } from '@/api/admin/crm'

import XrHeader from '@/components/XrHeader'

export default {
  name: 'CustomField',

  components: {
    XrHeader
  },

  data() {
    return {
      loading: false,
      tableHeight: document.documentElement.clientHeight - 140, // 表的高度
      // 自定义字段设置
      tableList: []
    }
  },

  created() {
    // 控制table的高度
    window.onresize = () => {
      self.tableHeight = document.documentElement.clientHeight - 140
    }

    this.getDetail()
  },

  methods: {
    /**
     * 详情
     */
    getDetail() {
      this.loading = true
      customFieldIndexAPI()
        .then(res => {
          this.tableList = res.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    /**
     * 列表的编辑和预览
     */
    handleCustomField(type, item, index) {
      if (type === 'edit') {
        this.$router.push({
          name: 'customField',
          params: {
            type: {
              1: 'crm_leads',
              2: 'crm_customer',
              3: 'crm_contacts',
              4: 'crm_product',
              5: 'crm_business',
              6: 'crm_contract',
              7: 'crm_receivables',
              8: 'crm_receivables_plan',
              17: 'crm_visit',
              18: 'crm_invoice'
            }[item.label],
            id: 'none',
            label: item.label
          }
        })
      }
    },

    /**
     * 根据自定义字段types 获取展示icon
     */
    getCustomFieldIcon(label) {
      if (label === 1) {
        return require('@/assets/img/crm/leads.png')
      } else if (label === 2) {
        return require('@/assets/img/crm/customer.png')
      } else if (label === 3) {
        return require('@/assets/img/crm/contacts.png')
      } else if (label === 5) {
        return require('@/assets/img/crm/business.png')
      } else if (label === 6) {
        return require('@/assets/img/crm/contract.png')
      } else if (label === 4) {
        return require('@/assets/img/crm/product.png')
      } else if (label === 7) {
        return require('@/assets/img/crm/receivables.png')
      } else if (label === 8) {
        return require('@/assets/img/crm/receivablesPlan.png')
      } else if (label === 17) {
        return require('@/assets/img/crm/visit.png')
      } else if (label === 18) {
        return require('@/assets/img/crm/invoice.png')
      }
      return require('@/assets/img/crm/product.png')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.system-customer {
  height: 100%;
  padding: 18px 24px 22px;
  background: linear-gradient(135deg, #f5f7ff 0%, #f9fbff 40%, #eef3ff 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;

  /deep/ .xr-header {
    max-width: 1120px;
    margin: 0 auto;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow: 0 8px 22px rgba(15, 23, 42, 0.08);
    padding: 14px 26px;
  }
}

.customer-content {
  margin-top: 14px;
  padding: 16px 18px 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 14px 32px rgba(36, 92, 196, 0.12);
  border: 1px solid rgba(226, 232, 240, 0.9);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  transition: box-shadow 0.25s ease, transform 0.25s ease, background-color 0.25s ease;
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
}

.customer-content:hover {
  box-shadow: 0 20px 40px rgba(36, 92, 196, 0.18);
  transform: translateY(-2px);
}

.table-item-label {
  vertical-align: middle;
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.table-item-icon {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  vertical-align: middle;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.18);
}

.table-item-time {
  color: #9ca3af;
  font-size: 13px;
}

.el-table {
  background-color: transparent;

  /deep/ .el-table__header-wrapper th {
    background-color: transparent;
    font-weight: 500;
    color: #4b5563;
    border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  }

  /deep/ .el-table__body tr {
    transition: background-color 0.2s ease, transform 0.15s ease;
  }

  /deep/ .el-table__body tr:hover > td {
    background-color: rgba(59, 130, 246, 0.06);
  }

  /deep/ .el-table__body td {
    height: 60px;
    border-bottom: 1px solid rgba(241, 245, 249, 0.9);
  }

  /deep/ .el-button--text {
    color: #2563eb;
    font-weight: 500;
    padding: 0 6px;
    border-radius: 999px;
    transition: color 0.2s ease, background-color 0.2s ease, transform 0.15s ease;
  }

  /deep/ .el-button--text:hover {
    color: #1d4ed8;
    background-color: rgba(191, 219, 254, 0.45);
    transform: translateY(-1px);
  }
}
</style>
