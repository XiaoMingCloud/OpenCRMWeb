<template>
  <div v-loading="loading">
    <div class="content-title">
      <span>商机组设置</span>
      <el-button
        type="primary"
        class="rt"
        size="medium"
        @click="addBusiness">添加商机组</el-button>
    </div>
    <div class="business-table">
      <el-table
        :data="businessData"
        :height="tableHeight"
        :header-cell-style="headerCellStyle"
        style="width: 100%"
        stripe>
        <el-table-column
          v-for="(item, index) in businessList"
          :key="index"
          :prop="item.field"
          :label="item.label"
          :formatter="fieldFormatter"
          show-overflow-tooltip/>
        <el-table-column
          fixed="right"
          label="操作"
          width="140">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.status != 1"
              type="text"
              size="small"
              @click="businessEdit(scope.row)">编 辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="businessDelect(scope)">删 除</el-button>
            <el-button
              type="text"
              size="small"
              @click="businessStatus(scope)">{{ scope.row['status'] === 0 ? '启用' : '停用' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="p-contianer">
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
    <business-dialog
      :info-data="businessObj"
      :business-dialog-visible="businessDialogVisible"
      :business-title="businessTitle"
      @businessClose="businessClose"
      @businessSubmit="businessSubmit"/>
  </div>
</template>

<script>
import BusinessDialog from '@/views/admin/components/BusinessDialog'
import {
  businessGroupListAPI,
  businessGroupReadAPI,
  businessGroupDeleteAPI,
  businessGroupUpdateStatusAPI
} from '@/api/admin/crm'

export default {
  name: 'BusinessGroupSet',

  components: {
    BusinessDialog
  },

  data() {
    return {
      loading: false, // 展示加载中效果
      tableHeight: document.documentElement.clientHeight - 320, // 表的高度

      // 商机组设置
      /** 商机组每行的信息 */
      businessObj: { name: '', businessDep: [], settingList: '' },
      businessData: [],
      businessList: [
        { label: '商机组名称', field: 'name' },
        { label: '应用部门', field: 'deptName' },
        { label: '创建时间', field: 'createTime' },
        { label: '创建人', field: 'createName' },
        { label: '状态', field: 'status' }
      ],
      // 添加商机组
      businessDialogVisible: false,
      businessTitle: '添加商机组',
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      total: 0
    }
  },
  created() {
    /** 控制table的高度 */
    window.onresize = () => {
      this.tableHeight = document.documentElement.clientHeight - 320
    }
    this.getBusinessGroupList()
  },
  methods: {
    /**
     * 商机组列表头样式
     */
    headerCellStyle(val, index) {
      return { background: '#F2F2F2' }
    },

    /**
     * 更改每页展示数量
     */
    handleSizeChange(val) {
      this.pageSize = val
      this.getBusinessGroupList()
    },

    /**
     * 更改当前页数
     */
    handleCurrentChange(val) {
      this.currentPage = val
      this.getBusinessGroupList()
    },

    /**
     * 商机组列表
     */
    getBusinessGroupList() {
      this.loading = true
      businessGroupListAPI({
        page: this.currentPage,
        limit: this.pageSize
      })
        .then(res => {
          this.loading = false
          this.businessData = res.data.list
          this.total = res.data.totalRow
        })
        .catch(() => {
          this.loading = false
        })
    },

    /**
     * 商机列表格式化
     */
    fieldFormatter(row, column) {
      // 如果需要格式化
      if (column.property == 'deptName') {
        // 格式部门
        const structures = row.deptList || []
        const strName = structures
          .map(item => {
            return item.name
          })
          .join('、')
        return strName || '全公司'
      } else if (column.property === 'status') {
        if (row[column.property] == 1) {
          return '启用'
        }
        return '停用'
      }
      return row[column.property]
    },

    /**
     * 商机组编辑
     */
    businessEdit(data) {
      businessGroupReadAPI({
        id: data.typeId
      })
        .then(res => {
          var settingList = res.data.statusList || []
          this.businessObj = {
            typeId: res.data.typeId,
            name: res.data.name,
            businessDep: res.data.deptList || [],
            settingList: settingList
          }
          this.businessDialogVisible = true
          this.businessTitle = '编辑商机组'
        })
        .catch(() => {})
    },

    /**
     * 商机组删除
     */
    businessDelect(scope) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          businessGroupDeleteAPI({
            id: scope.row.typeId
          })
            .then(res => {
              this.businessData.splice(scope.$index, 1)
              this.$message.success('删除成功')
            })
            .catch(() => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    businessStatus(scope) {
      console.log(scope)
      // 启用停用
      this.$confirm(
        '您确定要' +
            (scope.row.status === 0 ? '启用' : '停用') +
            '该商机组?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          businessGroupUpdateStatusAPI({
            typeId: scope.row.typeId,
            status: scope.row.status === 0 ? 1 : 0
          })
            .then(res => {
              scope.row['status'] = scope.row['status'] === 0 ? 1 : 0
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
    },

    /**
     * 商机组添加
     */
    addBusiness() {
      this.businessObj = { name: '', businessDep: [], settingList: '' }
      this.businessDialogVisible = true
      this.businessTitle = '添加商机组'
    },

    /**
     * 商机组添加 -- 关闭
     */
    businessClose() {
      this.businessDialogVisible = false
    },

    /**
     * 商机组添加成功
     */
    businessSubmit() {
      this.getBusinessGroupList()
      this.businessClose()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  margin: 4px 8px 0;
  border-radius: 14px;
  background: linear-gradient(135deg, #f7f9ff 0%, #fdfdff 40%, #f3f6ff 100%);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
}

.content-title > span {
  display: inline-flex;
  align-items: center;
  height: 32px;
  line-height: 32px;
  margin-left: 6px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #1f2933;
}

.content-title > span::before {
  content: '';
  width: 4px;
  height: 16px;
  border-radius: 999px;
  margin-right: 8px;
  background: linear-gradient(180deg, #4f8dff 0%, #00c2ff 100%);
}

.content-title .el-button {
  border-radius: 999px;
  padding: 8px 18px;
  font-weight: 500;
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.25);
  border: none;
}

.content-title .el-button span {
  letter-spacing: 0.04em;
}

/* 商机组设置主卡片 */
.business-table {
  margin: 14px 8px 0;
  padding: 12px 14px 4px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.06);
  flex: 1;
  overflow: auto;
  box-sizing: border-box;

  /deep/ .el-table {
    background-color: transparent;
  }

  /deep/ .el-table__header-wrapper th {
    background-color: transparent;
    font-weight: 500;
    color: #4b5563;
    border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  }

  /deep/ .el-table__body tr {
    transition: background-color 0.2s ease, transform 0.12s ease;
  }

  /deep/ .el-table__body tr:hover > td {
    background-color: rgba(59, 130, 246, 0.06);
  }

  /deep/ .el-table__body td {
    border-bottom: 1px solid rgba(241, 245, 249, 0.9);
  }

  /deep/ .el-button--text {
    padding: 0 6px;
    border-radius: 999px;
    color: #2563eb;
    font-weight: 500;
    transition: color 0.2s ease, background-color 0.2s ease, transform 0.12s ease;
  }

  /deep/ .el-button--text:hover {
    color: #1d4ed8;
    background-color: rgba(191, 219, 254, 0.4);
    transform: translateY(-1px);
  }
}

.p-contianer {
  position: relative;
  background-color: transparent;
  padding-top: 6px;
  height: 44px;

  .p-bar {
    float: right;
    margin: 4px 8px 0 0;
    font-size: 13px !important;
  }
}
</style>
