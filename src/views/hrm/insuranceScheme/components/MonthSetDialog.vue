
<template>
  <el-dialog
    ref="wkDialog"
    :visible="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :title="title"
    :show-close="false"
    width="500px">
    <div class="form-add-dialog-body">
      <el-form ref="monthForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="起始月份" prop="socialSecurityStartMonth">
          <el-date-picker
            v-model="form.socialSecurityStartMonth"
            clearable
            style="width: 100%;"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            placeholder="选择日期"/>
        </el-form-item>
      </el-form>
    </div>
    <span
      slot="footer"
      class="dialog-footer">
      <el-button @click.native="handleCancel">取消</el-button>
      <el-button
        v-debounce="handleConfirm"
        type="primary">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  hrmSalaryConfigSaveInItConfigAPI
} from '@/api/hrm/salaryConfig'

import ElDialogLoadingMixin from '@/mixins/ElDialogLoading'

export default {
  // 设置社保月份
  name: 'MonthSetDialog',
  components: {
  },
  mixins: [ElDialogLoadingMixin],
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      title: '设置社保起始月份',
      rules: {
        socialSecurityStartMonth: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      },
      form: {}
    }
  },
  computed: {
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.form = { socialSecurityStartMonth: '' }
        }
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {

    /**
     * 取消选择
     */
    handleCancel() {
      this.$router.go(-1)
      this.close()
    },

    close() {
      this.$emit('update:visible', false)
    },

    /**
     * 点击确定
     */
    handleConfirm() {
      this.$refs.monthForm.validate(valid => {
        if (valid) {
          this.loading = true
          hrmSalaryConfigSaveInItConfigAPI(this.form)
            .then(res => {
              this.$message.success('操作成功')
              const times = this.form.socialSecurityStartMonth.split('-')
              this.$emit('change', times[0], times[1])
              this.close()
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.form-add-dialog-body {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 55vh;
}
</style>
