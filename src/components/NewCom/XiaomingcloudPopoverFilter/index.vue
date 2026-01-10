
<template>
  <el-popover
    v-model="popverShow"
    v-bind="$attrs"
    class="Xiaomingcloud-popover-filter"
    v-on="$listeners"
    @hide="hide">
    <div style="padding: 3px 12px;">
      <Xiaomingcloud-form
        :field-from="from"
        :field-list="fieldList"
        class="Xiaomingcloud-filter-form"
        custom-class=""
      >
        <template slot-scope="{ data }">
          <div
            v-if="data && data.formType == 'range'"
            class="Xiaomingcloud-range-select">
            <flexbox class="Xiaomingcloud-range-select__top">
              <el-input
                v-model="from[data.field][0]"
                type="number"
                maxlength="100"/>
              <span class="range-separator">至</span>
              <el-input
                v-model="from[data.field][1]"
                type="number"
                maxlength="100"/>
            </flexbox>
          </div>
        </template>
      </Xiaomingcloud-form>
      <div>
        <el-button type="primary" @click="sureClick">确定</el-button>
        <el-button @click="resetClick">重置</el-button>
      </div>
    </div>
    <i
      slot="reference"
      :class="{'is-select': hasContent || popverShow}"
      class="xiaomingcloud open-screening"/>
  </el-popover>
</template>

<script>
import XiaomingcloudForm from '@/components/NewCom/XiaomingcloudForm'

import { objDeepCopy } from '@/utils'

export default {
  // Popover 形式的筛选
  name: 'XiaomingcloudPopoverFilter',
  components: {
    XiaomingcloudForm
  },
  inheritAttrs: false,
  props: {
    hasContent: {
      type: Boolean,
      default: false
    },
    fieldFrom: Object,
    fieldList: Array
  },
  data() {
    return {
      popverShow: false,
      from: {}
    }
  },
  computed: {},
  watch: {
    popverShow(val) {
      this.$emit(val ? 'show' : 'hide')
    },
    fieldFrom: {
      handler() {
        const from = objDeepCopy(this.fieldFrom)
        this.fieldList.forEach(item => {
          if (item.formType == 'range') {
            from[item.field] = from[item.field] ? from[item.field] : ['', '']
          }
        })
        this.from = from
      },
      immediate: true
    }
  },
  mounted() {},

  beforeDestroy() {},
  methods: {
    sureClick() {
      this.$emit('update:fieldFrom', this.from)
      this.$emit('sure', objDeepCopy(this.from))
      this.popverShow = false
    },

    resetClick() {
      this.$emit('reset')
    },

    hide() {
      const from = objDeepCopy(this.fieldFrom)
      this.fieldList.forEach(item => {
        if (item.formType == 'range') {
          from[item.field] = from[item.field] ? from[item.field] : ['', '']
        }
      })
      this.from = from
    }
  }
}
</script>

<style lang="scss" scoped>
.Xiaomingcloud-screening {
  cursor: pointer;
  padding: 7px;
  border-radius: 4px;
  background-color: white;
  border: 1px solid $xr-border-color-base;

  &.is-select:hover,
  &.is-select {
    background-color: $xr-color-primary;
    color: white;
  }

  &.is-select:hover {
    color: white !important;
  }

  &:hover {
    background-color: #e9efff;
    border-color: #bdd0fe;
    color: $xr-color-primary;
  }
}

.Xiaomingcloud-popover-filter {
  vertical-align: middle;
}
.Xiaomingcloud-filter-form {
  display: flex;
  flex-wrap: wrap;

  /deep/.el-form-item {
    display: flex;
    flex-shrink: 0;
    margin-right: 30px;
    margin-bottom: 15px;

    .Xiaomingcloud-user-select,
    .Xiaomingcloud-dep-select,
    .el-input {
      width: 150px !important;
    }
  }
}

.Xiaomingcloud-range-select {
  &__top {
    .range-separator {
      margin: 0 10px;
    }
    .range-unit {
      width: 75px;
      flex-shrink: 0;
      margin-left: 10px;
    }
  }
}
</style>
