<template>
  <div
    :class="`is-${formType}`"
    class="Xiaomingcloud-field-view"
  >
    <template v-if="ignoreFields.includes(props.field)">
      <slot :data="$props" />
    </template>
    <span v-else-if="isCommonType">{{ getCommonShowValue() }}</span>
    <el-switch
      v-else-if="formType == 'boolean_value'"
      :value="value"
      disabled
      active-value="1"
      inactive-value="0"
    />
    <Xiaomingcloud-signature-image
      v-else-if="formType == 'handwriting_sign'"
      :src="value"
      :height="config.signatureHeight"
    />
    <Xiaomingcloud-desc-text
      v-else-if="formType == 'desc_text'"
      :key="Date.now().toString()"
      :value="value"
    />
    <span
      v-else-if="formType == 'location'"
      :class="{'can-check':objectHasValue(value, 'address')}"
      @click.stop="mapViewShow=true"
    >{{ objectHasValue(value, 'address') ? value.address : '' }}</span>
    <span
      v-else-if="formType == 'website'"
      :class="{'can-check': !isEmpty}"
      @click.stop="openUrl(value)"
    >{{ value }}</span>
    <file-list-view
      v-else-if="formType == 'file'"
      :list="value || []"
    />
    <Xiaomingcloud-detail-table-view
      v-else-if="formType == 'detail_table'"
      :show-type="props.precisions === 2 ? 'table' : 'default'"
      :title="props.name"
      :add-field-list="props.fieldExtendList"
      :field-form="value"
      :field-list="props.fieldList"
    >
      <template slot-scope="{ data }">
        <slot :data="data" />
      </template>
    </Xiaomingcloud-detail-table-view>
    <template v-else>
      <slot :data="$props" />
    </template>

    <map-view
      v-if="mapViewShow"
      :title="value.address"
      :lat="value.lat"
      :lng="value.lng"
      @hidden="mapViewShow=false"
    />
  </div>
</template>

<script>
import XiaomingcloudSignatureImage from '@/components/NewCom/XiaomingcloudSignaturePad/Image'
import XiaomingcloudDescText from '@/components/NewCom/XiaomingcloudDescText'
import MapView from '@/components/MapView' // 地图详情
import FileListView from '@/components/FileListView' // 附件
import XiaomingcloudDetailTableView from '@/components/NewCom/XiaomingcloudDetailTable/View'

import merge from '@/utils/merge'
import { isObject, isEmpty } from '@/utils/types'
import { getFormFieldShowName } from './utils'

const DefaultXiaomingcloudFieldView = {
  signatureHeight: '26px'
}

export default {
  // 特殊字段展示
  name: 'XiaomingcloudFieldView',

  components: {
    XiaomingcloudSignatureImage,
    XiaomingcloudDescText,
    MapView,
    FileListView,
    XiaomingcloudDetailTableView
  },

  props: {
    props: Object, // 自定义字段参数信息
    formType: String,
    value: [String, Object, Array, Number],
    // 忽略的字段直接输出
    ignoreFields: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data() {
    return {
      // 控制展示地图详情
      mapViewShow: false
    }
  },

  computed: {
    config() {
      return merge({ ...DefaultXiaomingcloudFieldView }, this.props || {})
    },
    isEmpty() {
      return isEmpty(this.value)
    },
    isCommonType() {
      return [
        'text',
        'textarea',
        'website',
        'select',
        'checkbox',
        'number',
        'floatnumber',
        'percent',
        'mobile',
        'email',
        'date',
        'datetime',
        'date_interval',
        'user',
        'structure',
        'position'
      ].includes(this.formType)
    }
  },

  watch: {},

  created() {},

  mounted() {},

  beforeDestroy() {},

  methods: {
    /**
		 * 判断对象是否值
		 */
    objectHasValue(obj, key) {
      if (isObject(obj)) {
        return !isEmpty(obj[key])
      }
      return false
    },

    openUrl(url) {
      if (!url.match(/^https?:\/\//i)) {
        url = 'http://' + url
      }
      window.open(url)
    },

    /**
     * 获取类型的展示值
     */
    getCommonShowValue() {
      return getFormFieldShowName(this.formType, this.value, '', this.props)
    }
  }
}
</script>

<style lang="scss" scoped>
.Xiaomingcloud-field-view {
  overflow: hidden;
  text-overflow: ellipsis;
	.can-check {
		color: $xr-color-primary;
		cursor: pointer;
	}

	&.is-website {
		display: inline;
	}

  &.is-file {
    line-height: 1;
  }
}
</style>
