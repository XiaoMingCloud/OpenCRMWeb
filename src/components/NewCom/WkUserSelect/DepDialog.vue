
<template>
  <el-dialog
    :visible="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :title="title"
    :show-close="false"
    width="700px">
    <wk-dep-user-view
      :props="props"
      :dep-value="deps"
      :user-value="users"
      @change="selectChange"
    />
    <span
      slot="footer"
      class="dialog-footer">
      <el-button @click.native="close">取消</el-button>
      <el-button
        v-debounce="handleConfirm"
        type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import WkDepUserView from './Dep'

import { objDeepCopy } from '@/utils'

export default {
  // 弹窗选择员工
  name: 'WkDepUserViewDialog',
  components: {
    WkDepUserView
  },
  mixins: [],
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    // 取值字段
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    closeOnEmptyValue: {
      type: Boolean,
      default: true
    },
    depValue: {
      type: Array,
      default: () => {
        return []
      }
    },
    userValue: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      title: '选择员工',
      users: [],
      deps: []
    }
  },
  computed: {
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.users = objDeepCopy(this.userValue)
          this.deps = objDeepCopy(this.depValue)
        }
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('update:visible', false)
    },

    selectChange(users, deps) {
      this.users = users
      this.deps = deps
    },

    /**
     * 点击确定
     */
    handleConfirm() {
      this.$emit('change', this.users, this.deps)
      if (this.closeOnEmptyValue) {
        if (this.users.length !== 0 || this.deps.length !== 0) {
          this.close()
        }
      } else {
        this.close()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dialog__wrapper {
  /deep/ .el-dialog__body {
    border-top: 1px solid $xr-border-color-base;
  }
}
</style>
