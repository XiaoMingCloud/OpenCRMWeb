<template>
  <div v-if="ignoreFields.includes(item.field)">
    <slot :data="item" :index="index" />
  </div>
  <el-input
    v-else-if="item.formType == 'text'"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    :maxlength="100"
    :placeholder="item.placeholder"
    :type="item.formType"
    @input="commonChange(item, index, $event)"/>
  <el-input
    v-else-if="isTrimInput(item.formType, item.disabled || disabled)"
    v-model.trim="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    :prefix-icon="getInputIcon(item.formType)"
    :maxlength="getInputMaxlength(item.formType)"
    :placeholder="item.placeholder"
    type="text"
    @input="commonChange(item, index, $event)"/>
  <el-input-number
    v-else-if="item.formType == 'number'"
    v-model="fieldFrom[item.field]"
    :placeholder="item.placeholder"
    :disabled="item.disabled || disabled"
    :controls="false"
    @change="commonChange(item, index, $event)" />
  <el-input-number
    v-else-if="item.formType == 'floatnumber'"
    v-model="fieldFrom[item.field]"
    :placeholder="item.placeholder"
    :disabled="item.disabled || disabled"
    :controls="false"
    @change="commonChange(item, index, $event)" />
  <Xiaomingcloud-percent-input
    v-else-if="item.formType == 'percent'"
    v-model="fieldFrom[item.field]"
    :placeholder="item.placeholder"
    :disabled="item.disabled || disabled"
    :controls="false"
    @change="commonChange(item, index, $event)" />
  <el-input
    v-else-if="item.formType == 'textarea'"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    :rows="3"
    :autosize="{ minRows: 3}"
    :maxlength="item.maxlength || 800"
    :placeholder="item.placeholder"
    :type="item.formType"
    resize="none"
    @input="commonChange(item, index, $event)" />
  <Xiaomingcloud-select
    v-else-if="['select'].includes(item.formType)"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    :clearable="item.clearable"
    :placeholder="item.placeholder"
    :options="item.setting"
    :show-type="item.precisions === 1 ? 'tiled' : 'default'"
    :other-show-input="item.hasOwnProperty('optionsData')"
    @change="commonChange(item, index, $event)"/>
  <Xiaomingcloud-checkbox
    v-else-if="['checkbox'].includes(item.formType)"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    :clearable="item.clearable"
    :placeholder="item.placeholder"
    :options="item.setting"
    :show-type="item.precisions === 1 ? 'tiled' : 'default'"
    :other-show-input="item.hasOwnProperty('optionsData')"
    @change="commonChange(item, index, $event)"/>
  <!-- <el-select
        v-else-if="['checkbox', 'select'].includes(item.formType)"
        v-model="fieldFrom[item.field]"
        :disabled="item.disabled || disabled"
        :clearable="item.clearable"
        :placeholder="item.placeholder"
        :multiple="item.formType === 'checkbox'"
        style="width: 100%;"
        @change="commonChange(item, index, $event)">
        <el-option
          v-for="(item, index) in item.setting"
          :key="index"
          :label="!isEmptyValue(item.value) ? item.label || item.name : item "
          :value="!isEmptyValue(item.value) ? item.value : item"/>
      </el-select> -->
  <!-- <el-select
        v-else-if="item.formType == 'checkbox'"
        v-model="fieldFrom[item.field]"
        :disabled="item.disabled || disabled"
        :clearable="item.clearable"
        :placeholder="item.placeholder"
        multiple
        style="width: 100%;"
        @change="commonChange(item, index, $event)">
        <el-option
          v-for="(item, index) in item.setting"
          :key="index"
          :label="!isEmptyValue(item.value) ? item.label || item.name : item "
          :value="!isEmptyValue(item.value) ? item.value : item"/>
      </el-select> -->
  <el-date-picker
    v-else-if="item.formType == 'date'"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    clearable
    style="width: 100%;"
    type="date"
    value-format="yyyy-MM-dd"
    placeholder="选择日期"
    @change="commonChange(item, index, $event)"/>
  <el-date-picker
    v-else-if="item.formType == 'dateRange'"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    :type="item.dateType || 'daterange'"
    :value-format="item.dateValueFormat || 'yyyy-MM-dd'"
    clearable
    style="width: 100%;vertical-align: middle;"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="commonChange(item, index, $event)"/>
  <el-date-picker
    v-else-if="item.formType == 'datetime'"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    clearable
    style="width: 100%;"
    type="datetime"
    value-format="yyyy-MM-dd HH:mm:ss"
    placeholder="选择日期"
    @change="commonChange(item, index, $event)"/>
  <Xiaomingcloud-dep-select
    v-else-if="item.formType == 'structure'"
    v-model="fieldFrom[item.field]"
    :request="item.request"
    :props="item.props"
    :params="item.params"
    :disabled="item.disabled || disabled"
    :radio="!isEmptyValue(item.radio) ? item.radio : true"
    style="width: 100%;"
    @change="depOrUserChange(item, index, arguments[0], arguments[1])"
  />
  <Xiaomingcloud-user-select
    v-else-if="['single_user', 'user'].includes(item.formType)"
    v-model="fieldFrom[item.field]"
    :request="item.request"
    :props="item.props"
    :params="item.params"
    :disabled="item.disabled || disabled"
    :radio="!isEmptyValue(item.radio) ? item.radio : true"
    style="width: 100%;"
    @change="depOrUserChange(item, index, arguments[0], arguments[1])"
  />
  <el-radio-group
    v-else-if="item.formType == 'radio'"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    :placeholder="item.placeholder"
    @change="commonChange(item, index, $event)">
    <el-radio
      v-for="(item, index) in item.setting"
      :key="index"
      :label="!isEmptyValue(item.value) ? item.value : item">
      {{ !isEmptyValue(item.value) ? item.label || item.name : item }}
    </el-radio>
  </el-radio-group>
  <el-switch
    v-else-if="item.formType == 'boolean_value'"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    active-value="1"
    inactive-value="0"
    @change="commonChange(item, index, $event)"/>
  <Xiaomingcloud-position
    v-else-if="item.formType == 'position'"
    :hide-area="item.hideArea"
    :only-province="item.onlyProvince"
    :show-detail="item.showDetail"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    @change="commonChange(item, index, $event)"/>
  <Xiaomingcloud-location
    v-else-if="item.formType == 'location'"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    @change="commonChange(item, index, $event)"/>
  <Xiaomingcloud-signature-pad
    v-else-if="item.formType == 'handwriting_sign'"
    v-model="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"/>
  <Xiaomingcloud-desc-text
    v-else-if="item.formType == 'desc_text'"
    :value="fieldFrom[item.field]"/>
  <el-date-picker
    v-else-if="item.formType === 'date_interval'"
    v-model="fieldFrom[item.field]"
    :type="item.dateType || 'daterange'"
    :value-format="item.dateValueFormat || 'yyyy-MM-dd'"
    :disabled="item.disabled || disabled"
    style="width: 100%;vertical-align: middle;"
    clearable
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="commonChange(item, index, $event)"/>
  <v-distpicker
    v-else-if="item.formType == 'address'"
    :province="fieldFrom[item.field].province"
    :city="fieldFrom[item.field].city"
    :area="fieldFrom[item.field].area"
    @province="selectProvince($event, item, index)"
    @city="selectCity($event, item, index)"
    @area="selectArea($event, item, index)"/>
  <xh-files
    v-else-if="item.formType == 'file'"
    :value="fieldFrom[item.field]"
    :disabled="item.disabled || disabled"
    @value-change="oldChange($event, item, index)"
  />
  <Xiaomingcloud-detail-table
    v-else-if="item.formType == 'detail_table'"
    :show-type="item.precisions === 2 ? 'table' : 'default'"
    :title="item.name"
    :prop-prefix="item.field"
    :btn-name="item.remark"
    :add-field-list="item.fieldExtendList"
    :add-field-form="item.fieldForm"
    :field-form="fieldFrom[item.field]"
    :field-list="item.fieldList"
    :disabled="item.disabled || disabled"/>
  <div v-else>
    <slot :data="item" :index="index" />
  </div>
</template>

<script>
import XiaomingcloudUserSelect from '@/components/NewCom/XiaomingcloudUserSelect'
import XiaomingcloudDepSelect from '@/components/NewCom/XiaomingcloudDepSelect'
import XiaomingcloudPosition from '@/components/NewCom/XiaomingcloudPosition'
import XiaomingcloudLocation from '@/components/NewCom/XiaomingcloudLocation'
import XiaomingcloudSignaturePad from '@/components/NewCom/XiaomingcloudSignaturePad'
import XiaomingcloudDescText from '@/components/NewCom/XiaomingcloudDescText'
import XiaomingcloudPercentInput from '@/components/NewCom/XiaomingcloudPercentInput'
import XiaomingcloudSelect from '@/components/NewCom/XiaomingcloudSelect'
import XiaomingcloudCheckbox from '@/components/NewCom/XiaomingcloudCheckbox'
import XiaomingcloudDetailTable from '@/components/NewCom/XiaomingcloudDetailTable'
import VDistpicker from '@/components/VDistpicker'
import { XhFiles } from '@/components/CreateCom'

import Mixin from './Mixin'

export default {
  // 字段
  name: 'XiaomingcloudField',

  components: {
    XiaomingcloudUserSelect,
    XiaomingcloudDepSelect,
    XiaomingcloudPosition,
    XiaomingcloudLocation,
    XiaomingcloudSignaturePad,
    XiaomingcloudDescText,
    XiaomingcloudPercentInput,
    XiaomingcloudSelect,
    XiaomingcloudCheckbox,
    XiaomingcloudDetailTable,
    VDistpicker,
    XhFiles
  },

  mixins: [Mixin],

  props: {
    item: Object,
    index: Number,
    fieldFrom: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 忽略的字段直接输出
    ignoreFields: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: Boolean
  },

  data() {
    return {

    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  beforeDestroy() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.el-input-number {
  width: 100%;
  /deep/ .el-input__inner {
    text-align: left;
    padding: 0 8px;
  }
}
</style>
