<template>
  <flexbox
    class="main-ios"
    direction="column"
    align="stretch">
    <xr-header
      icon-class="xiaomingcloud open-print"
      icon-color="#26d4da"
      label="自定义打印模板" />
    <div class="main-ios__bd">
      <div class="se-table-header-ios">
        <el-button
          class="se-table-header-button xr-btn--orange"
          type="primary"
          icon="el-icon-plus"
          @click="addClick">新建打印模板</el-button>
      </div>
      <el-table
        v-loading="loading"
        id="examine-table"
        :data="list"
        :height="tableHeight"
        :cell-class-name="cellClassName"
        class="main-table-ios"
        stripe
        highlight-current-row
        style="width: 100%"
        @row-click="handleRowClick">
        <el-table-column
          v-for="(item, index) in fieldList"
          :key="index"
          :formatter="fieldFormatter"
          :prop="item.prop"
          :min-width="item.width"
          :label="item.label"
          show-overflow-tooltip/>
        <el-table-column
          fixed="right"
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClick('edit', scope)">编辑名称</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleClick('copy', scope)">复制</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleClick('delete', scope)">删除</el-button>
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
      <template-type-add
        :visible.sync="templateAddShow"
        :detail="editData"
        @save="refreshList"
        @next="createNext"/>
    </div>
  </flexbox>
</template>

<script>
import XrHeader from '@/components/XrHeader'
import TemplateTypeAdd from './components/TemplateTypeAdd'

import {
  printTemplateListAPI,
  printDeleteTemplateAPI,
  printCopyTemplateAPI
} from '@/api/admin/crm'

export default {
  components: {
    XrHeader,
    TemplateTypeAdd
  },
  data() {
    return {
      loading: false,
      tableHeight: document.documentElement.clientHeight - 240,
      list: [],
      fieldList: [
        { prop: 'templateName', label: '模板名称', width: 150 },
        { prop: 'type', label: '关联对象', width: 150 },
        { prop: 'createTime', label: '创建时间', width: 150 },
        { prop: 'createUserName', label: '创建人', width: 150 },
        { prop: 'updateTime', label: '更新时间', width: 150 }
      ],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      total: 0,
      editData: null,
      templateAddShow: false
    }
  },
  mounted() {
    window.onresize = () => {
      this.tableHeight = document.documentElement.clientHeight - 240
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
    refreshList() {
      this.handleCurrentChange(1)
    },
    getList() {
      this.loading = true
      printTemplateListAPI({
        page: this.currentPage,
        limit: this.pageSize
      }).then(res => {
        this.list = res.data.list
        this.total = res.data.totalRow
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    fieldFormatter(row, column) {
      if (column.property === 'type') {
        return { 5: '商机', 6: '合同', 7: '回款' }[row[column.property]]
      }
      return row[column.property]
    },
    cellClassName({ column }) {
      return column.property === 'templateName' ? 'can-visit--underline' : ''
    },
    handleRowClick(row, column) {
      if (column.property === 'templateName') {
        this.$router.push({
          name: 'crmPrintDetail',
          query: {
            handle: 'detail',
            templateName: row.templateName,
            templateId: row.templateId,
            type: row.type
          }
        })
      }
    },
    addClick() {
      this.editData = null
      this.templateAddShow = true
    },
    createNext(data) {
      this.$router.push({
        name: 'crmPrintDetail',
        query: { handle: 'create', ...data }
      })
    },
    handleClick(type, scope) {
      if (type === 'edit') {
        this.editData = scope.row
        this.templateAddShow = true
      } else if (type === 'delete') {
        this.$confirm('确定删除?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
          .then(() => {
            this.loading = true
            printDeleteTemplateAPI({ templateId: scope.row.templateId })
              .then(() => {
                this.getList()
                this.$message({ type: 'success', message: '操作成功' })
                this.loading = false
              })
              .catch(() => { this.loading = false })
          })
      } else if (type === 'copy') {
        this.loading = true
        printCopyTemplateAPI({ templateId: scope.row.templateId })
          .then(() => {
            this.getList()
            this.$message({ type: 'success', message: '操作成功' })
            this.loading = false
          })
          .catch(() => { this.loading = false })
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
    background: rgba(255,255,255,0.65);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    padding: 15px 30px;
  }

  &__bd {
    flex: 1;
    border-radius: 16px;
    background: rgba(255,255,255,0.65);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    margin-top: 12px;
    padding: 15px;
    border-top: 1px solid rgba(0,0,0,0.05);
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
}

.main-table-ios {
  border-radius: 12px;
  background: rgba(255,255,255,0.3) !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.se-table-header-ios {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
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
