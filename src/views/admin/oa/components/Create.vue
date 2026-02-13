<template>
  <transition name="opacity-fade">
    <div class="business-approve-flow-create">
      <Xiaomingcloud-backgroud-tabs
        :options="tabs"
        v-model="tabIndex"
      >
        <template slot="right">
          <el-button type="primary" @click="sendClick">发布</el-button>
          <i
            class="el-icon-close create-close"
            @click="closeClick" />
        </template>
      </Xiaomingcloud-backgroud-tabs>
      <base-info-set
        v-show="tabIndex === 'base'"
        ref="baseInfoSet"
        :fields="fields"
        :fields-form="fieldsForm"
        :fields-rules="fieldsRules"
        :validate-on-rule-change="false"
        @change="formChange"
      >
        <template slot-scope="{ data }">
          <xh-icon-select
            v-if="data && data.formType == 'icon'"
            :value="fieldsForm[data.field]"
            @value-change="oldChange($event, data)"
          />
        </template>
      </base-info-set>
      <Xiaomingcloud-approve-flow
        v-show="tabIndex === 'flow'"
        ref="XiaomingcloudApproveFlow"
        :props="approveFlowConfig"
        :list="flowList"
        :send-node="sendNode" />
    </div>
  </transition>
</template>

<script type="text/javascript">
import {
  examinesQueryFieldAPI,
  examinesAddAPI,
  examinesQueryExamineFlowAPI
} from '@/api/examine'

import XiaomingcloudBackgroudTabs from '../../examine/components/XiaomingcloudBackgroudTabs'
import BaseInfoSet from '../../examine/components/BaseInfoSet'
import { XiaomingcloudApproveFlow } from '@/components/ApprovalFlow'
import XhIconSelect from './XhIconSelect'

import { getMaxIndex } from '@/utils'
import { examineModel } from '@/components/ApprovalFlow'
import { objDeepCopy } from '@/utils'
import GenerateRulesMixin from '@/components/NewCom/XiaomingcloudForm/GenerateRules'
import ExamineInfoMinxin from '../../examine/mixins/ExamineInfo'

export default {
  name: 'OaApproveFlowCreate',
  components: {
    XiaomingcloudBackgroudTabs,
    BaseInfoSet,
    XiaomingcloudApproveFlow,
    XhIconSelect
  },
  filters: {},
  mixins: [GenerateRulesMixin, ExamineInfoMinxin],
  props: {
    detail: Object
  },
  data() {
    return {
      loading: false,
      height: document.documentElement.clientHeight - 100,
      tabs: [{
        label: '1.配置基础信息',
        value: 'base'
      }, {
        label: '2.配置流程',
        value: 'flow'
      }],
      tabIndex: 'base',
      fields: [],
      fieldsForm: {},
      rangeObj: {}, // 范围对象
      fieldsRules: {},
      flowList: [] // 数据源
    }
  },
  computed: {
    approveFlowConfig() {
      return {
        conditionSelectRequest: examinesQueryFieldAPI,
        conditionSelectParams: {
          label: 0,
          categoryId: this.examineId
        }
      }
    },
    sendNode() {
      const { userList, deptList } = this.rangeObj
      const structures = deptList || []
      const strNames = structures.map(item => item.name)

      const users = userList || []
      const userNames = users.map(item => item.realname)

      const name = strNames.concat(userNames).join('、')

      return {
        name: '发起人',
        content: name || '全公司'
      }
    },

    examineId() {
      return this.detail ? this.detail.examineId : null
    }
  },
  created() {
    this.getBaseField()
    if (this.detail) {
      this.rangeObj = {
        userList: this.detail.userList,
        deptList: this.detail.deptList
      }
    }
    if (this.examineId) {
      this.getFlowList(this.examineId)
    } else {
      this.flowList = [objDeepCopy(examineModel)]
    }
  },
  mounted() {
    this.$el.style.zIndex = getMaxIndex()
    document.body.appendChild(this.$el)

    window.onresize = () => {
      this.height = document.documentElement.clientHeight - 100
    }
  },
  destroyed() {
    // remove DOM node after destroy
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    /**
     * 获取流程详情
     */
    getFlowList(examineId) {
      examinesQueryExamineFlowAPI({ examineId }).then(res => {
        const list = res.data || []
        const dataList = []
        this.getListInfo(list, dataList)
        this.flowList = dataList
      }).catch(() => {})
    },

    /**
     * 获取自定义字段
     */
    getBaseField() {
      const field = []

      field.push({
        field: 'examineName',
        formType: 'text',
        isNull: 1,
        name: '审批类型名称',
        setting: [],
        inputTips: '',
        value: this.detail ? this.detail.examineName : ''
      })

      field.push({
        field: 'examineIcon',
        formType: 'icon',
        isNull: 1,
        name: '审批类型图标',
        setting: [],
        inputTips: '',
        value: this.detail ? this.detail.examineIcon || '' : 'xiaomingcloud open-l-record,#3ABCFB'
      })

      field.push({
        field: 'dept',
        formType: 'userDep',
        isNull: 0,
        name: '发起人范围',
        setting: [],
        inputTips: '默认全公司',
        value: {
          userList: this.detail && this.detail.userList ? this.detail.userList.map(item => item.userId) : [],
          deptList: this.detail && this.detail.deptList ? this.detail.deptList.map(item => item.id) : []
        }
      })

      field.push({
        field: 'recheckType',
        formType: 'select',
        isNull: 0,
        name: '审批被拒后重新提交',
        setting: [
          { name: '返回审批流初始层级', value: 1 },
          { name: '跳过审批流已通过的层级，返回拒绝的层级', value: 2 }
        ],
        inputTips: '',
        value: this.detail ? this.detail.recheckType : 1
      })

      field.push({
        field: 'managerList',
        formType: 'user',
        isNull: 1,
        name: '审批流管理员',
        setting: [],
        radio: false,
        tipType: 'tooltip',
        inputTips: '<div>1、可以在"配置流程"设置当审批人为空，审批<br>自动转交给审批流管理员；当管理员也请假/离<br>职，审批将转交给超级管理员。</div><div>2、可指定多个管理员，审批方式为或签。</div>',
        value: this.detail ? this.detail.managerList : []
      })

      field.push({
        field: 'remarks',
        formType: 'textarea',
        isNull: 0,
        name: '审批类型说明',
        maxlength: 200,
        setting: [],
        inputTips: '请填写相关注意事项，方便员工在申请时查阅，限制输入200字',
        value: this.detail ? this.detail.remarks : ''
      })

      this.handleFields(field)
    },

    /**
     * 调整字段
     */
    handleFields(list) {
      const fieldRules = {}
      const fieldForm = {}
      list.forEach(item => {
        if (item.formType === 'userDep') {
          fieldForm.userList = item.value.userList
          fieldForm.deptList = item.value.deptList
        } else {
          fieldRules[item.field] = this.getRules(item)
          fieldForm[item.field] = item.value
        }
      })
      this.fields = objDeepCopy(list)
      this.fieldsForm = fieldForm
      this.fieldsRules = fieldRules
    },

    /**
     * change
     */
    formChange(item, index, value) {
      if (item.formType === 'userDep') {
        this.rangeObj = value
      }
    },

    /**
     * 旧change回调
     */
    oldChange(dataValue, field) {
      this.$set(this.fieldsForm, field.field, dataValue.value)
      this.$refs.baseInfoSet.form.validateField(field.field)
    },

    /**
     * 发布点击
     */
    sendClick() {
      this.$refs.baseInfoSet.validate().then(valid => {
        if (valid) {
          const flowParams = this.$refs.XiaomingcloudApproveFlow.getParams()
          if (flowParams.isError) {
            this.$message.error('请完善信息')
          } else {
            const params = {
              ...this.fieldsForm,
              label: 0, // oa
              dataList: flowParams.list
            }

            if (this.examineId) {
              params.examineId = this.examineId
            }

            this.submiteRequest(params)
          }
        }
      })
    },

    /**
     * 发送请求
     */
    submiteRequest(params) {
      examinesAddAPI(params).then(res => {
        this.$emit('success')
        if (!this.examineId) {
          // 如果是新建 提示去创建表单
          this.$confirm('您将继续完成审批表单的创建', '创建成功', {
            showCancelButton: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            showClose: false,
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
              this.closeClick()
              if (action === 'confirm') {
                this.$router.push({
                  name: 'workbenchHandlefield',
                  params: {
                    type: 'oa_examine',
                    label: '10',
                    id: res.data.examineId
                  }
                })
              }
            }
          })
        } else {
          this.$message.success('创建成功')
          this.closeClick()
        }
      }).catch(() => {})
    },

    /**
     * 关闭
     */
    closeClick() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.opacity-fade-enter-active,
.opacity-fade-leave-active {
  transition: all 0.25s ease;
}
.opacity-fade-enter,
.opacity-fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

/* 整体背景 - iOS 浅灰渐变 */
.business-approve-flow-create {
  position: fixed;
  inset: 0;
  overflow: hidden;

  background: linear-gradient(
      180deg,
      #f2f3f7 0%,
      #e9ecf3 100%
  );

  display: flex;
  flex-direction: column;

  /* 顶部导航区域毛玻璃 */
  .Xiaomingcloud-backgroud-tabs {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    background: rgba(255, 255, 255, 0.6);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);

    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  }

  /* 发布按钮 iOS 风格 */
  ::v-deep .el-button--primary {
    border-radius: 20px;
    padding: 8px 22px;
    font-weight: 500;
    background: linear-gradient(135deg, #0a84ff, #4da3ff);
    border: none;
    box-shadow: 0 6px 18px rgba(10, 132, 255, 0.35);
    transition: all 0.2s ease;
  }

  ::v-deep .el-button--primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(10, 132, 255, 0.45);
  }

  /* 关闭按钮 */
  .create-close {
    font-size: 22px;
    color: #8e8e93;
    padding: 10px;
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .create-close:hover {
    background: rgba(0, 0, 0, 0.06);
    color: #000;
  }

  /* 基础信息卡片 */
  .base-info-set {
    width: 880px;
    margin: 40px auto 0;
    padding: 30px;

    border-radius: 24px;

    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);

    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.05);

    height: calc(100% - 140px);
    overflow-y: auto;
  }

  /* 流程区域 */
  .Xiaomingcloud-approve-flow-wrap {
    margin: 40px auto;
    width: 1000px;

    border-radius: 28px;
    padding: 30px;

    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);

    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.05);
  }

  /* 表单输入框 iOS 圆润风 */
  ::v-deep .el-input__inner,
  ::v-deep .el-textarea__inner {
    border-radius: 16px;
    background: rgba(245, 245, 247, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease;
  }

  ::v-deep .el-input__inner:focus,
  ::v-deep .el-textarea__inner:focus {
    border-color: #0a84ff;
    box-shadow: 0 0 0 3px rgba(10, 132, 255, 0.15);
  }

  /* 下拉框 */
  ::v-deep .el-select .el-input__inner {
    border-radius: 16px;
  }

  /* Tabs 选中样式 iOS 蓝 */
  ::v-deep .is-active {
    color: #0a84ff !important;
  }

}
</style>
