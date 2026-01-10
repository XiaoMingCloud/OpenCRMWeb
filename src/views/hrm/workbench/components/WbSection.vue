
<template>
  <el-card class="Xiaomingcloud-section">
    <div v-if="headerShow" class="Xiaomingcloud-section__header">
      <i :class="icon" class="Xiaomingcloud-section__icon" />
      <span class="Xiaomingcloud-section__label">{{ label }}</span>
      <span class="Xiaomingcloud-section__des">{{ des }}</span>
    </div>
    <slot />
  </el-card>
</template>

<script>

export default {
  // 块
  name: 'WbSection',
  components: {},
  props: {
    headerShow: {
      type: Boolean,
      default: true
    },
    label: String,
    des: String,
    icon: {
      type: String,
      default: 'xiaomingcloud open-funnel-solid'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},

  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.Xiaomingcloud-section {
  border: none;
  &__header {
    margin-bottom: 20px;
  }
  &__icon {
    color: $xr-color-primary;
  }
  &__label {
    font-weight: bold;
  }
  &__des {
    color: #666;
    font-size: 12px;
  }
}
</style>
