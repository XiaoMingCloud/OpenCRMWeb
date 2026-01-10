
<template>
  <div class="Xiaomingcloud-file-select" @click="handleClick">
    <slot />
  </div>
</template>

<script>

export default {
  // 用this.$XiaomingcloudFile.select()替代
  name: 'XiaomingcloudFileSelect',
  components: {},
  props: {
    name: {
      type: String,
      default: 'file'
    },
    disabled: Boolean,
    multiple: Boolean,
    accept: {
      type: String,
      default: '*.*' // *.* image/*
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},

  beforeDestroy() {},
  methods: {
    handleChange(ev) {
      const files = ev.target.files

      if (!files) return
      this.$emit('change', files, ev)
    },

    handleClick() {
      if (!this.disabled) {
        this.$XiaomingcloudFile.select({
          name: this.name,
          multiple: this.multiple,
          accept: this.accept
        }).then(ev => {
          this.handleChange(ev)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Xiaomingcloud-file-select {
  &__input {
    display: none;
  }
}
</style>
