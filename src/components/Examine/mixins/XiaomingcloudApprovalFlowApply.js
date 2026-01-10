import {
  examinesPreviewFiledNameAPI,
  examinesPreviewExamineFlowAPI
} from '@/api/examine'
import { isEmpty } from '@/utils/types'
import { debounce } from 'throttle-debounce'

/**
 * debouncedGetXiaomingcloudFlowList
 * initXiaomingcloudFlowData
 * validateXiaomingcloudFlowData
 */
export default {
  data() {
    /**
     * _XiaomingcloudFlowResolve 返回审批流结果
     * {
     *   list 审批未空 无审批流
     * }
     */
    return {
      // 审批信息
      _XiaomingcloudFlowSetFields: null, // 有值有审批流
      _XiaomingcloudFlowSetFieldNames: [],
      _XiaomingcloudFlowParams: {},
      _XiaomingcloudFlowListParams: {},
      _XiaomingcloudFlowResolve: null,
      _XiaomingcloudFieldForm: {} // 自定字段值
    }
  },

  created() {
    this.debouncedGetXiaomingcloudFlowList = debounce(500, this._getXiaomingcloudFlowList)
  },

  methods: {
    /**
     * 初始化审批流
     * data 包含 params 参数
     * fieldForm 自定义字段值
     */
    initXiaomingcloudFlowData(data, resultFun) {
      if (data.params) {
        this._XiaomingcloudFlowParams = data.params
      }
      if (data.fieldForm) {
        this._XiaomingcloudFieldForm = data.fieldForm
      }
      this._XiaomingcloudFlowResolve = resultFun
      this._getXiaomingcloudFlowSetFields()
    },

    /**
     * 获取可设置字段
     */
    _getXiaomingcloudFlowSetFields() {
      examinesPreviewFiledNameAPI(this._XiaomingcloudFlowParams).then(res => {
        this._XiaomingcloudFlowSetFields = res.data
        if (this._XiaomingcloudFlowSetFields) {
          this._XiaomingcloudFlowSetFieldNames = this._XiaomingcloudFlowSetFields.map(item => item.fieldName)
          this._getXiaomingcloudFlowList(null, this._XiaomingcloudFieldForm)
        } else {
          if (this._XiaomingcloudFlowResolve) {
            this._XiaomingcloudFlowResolve({
              list: null
            })
          }
        }
      }).catch(() => {})
    },

    /**
     * 获取审批流展示字段
     */
    _getXiaomingcloudFlowList(field, fieldForm) {
      // 不存在 不监测
      if (!this._XiaomingcloudFlowSetFields) {
        return
      }
      if (this._XiaomingcloudFlowSetFieldNames.includes(field) || !field) {
        const params = {}
        this._XiaomingcloudFlowSetFieldNames.forEach(key => {
          const value = fieldForm ? fieldForm[key] : ''
          if (Array.isArray(value)) {
            params[key] = value.join(',')
          } else {
            params[key] = isEmpty(value) ? '' : value
          }
        })
        this._XiaomingcloudFlowListParams = {
          ...this._XiaomingcloudFlowParams,
          dataMap: params
        }
        examinesPreviewExamineFlowAPI(this._XiaomingcloudFlowListParams).then(res => {
          const resData = res.data || {}

          const XiaomingcloudFlowList = resData.examineFlowList || []
          XiaomingcloudFlowList.forEach(item => {
            item.values = []
          })
          if (this._XiaomingcloudFlowResolve) {
            this._XiaomingcloudFlowResolve({
              list: XiaomingcloudFlowList,
              resData: resData
            })
          }
        }).catch(() => {})
      }
    },

    /**
     * 验证数据是否完整，并反馈结果
     */
    validateXiaomingcloudFlowData(flowList) {
      let pass = true
      const list = []

      if (!flowList) {
        return {
          pass,
          data: null
        }
      }
      flowList.forEach(item => {
        if (item.examineType === 4) {
          if (item.values.length > 0) {
            list.push({
              flowId: item.flowId,
              userList: item.values.map(item => item.userId)
            })
          } else {
            pass = false
          }
        }
      })

      return {
        pass,
        data: {
          ...this._XiaomingcloudFlowListParams,
          optionalList: list
        }
      }
    }
  }
}
