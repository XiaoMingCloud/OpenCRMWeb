
<template>
  <div class="wb-item">
    <div class="wb-item__label">{{ label }}</div>
    <div class="wb-item__value">
      <span :class="{'can-visit--underline': !disabled}" @click="valueClick">{{ value }}</span>
      <span class="wb-item__unit">{{ unit }}</span>
    </div>
  </div>
</template>

<script>

export default {
  // 事项
  name: 'WbItem',
  components: {},
  props: {
    label: String,
    value: [String, Number],
    index: [String, Number],
    disabled: Boolean,
    unit: {
      type: String,
      default: '人'
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
    valueClick() {
      if (!this.disabled) {
        this.$emit('select', this.index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wb-item {
  // text-align: center;
  &__label {
    font-size: 12px;
    color: #666;
  }
  &__value {
    font-size: 18px;
    margin-top: 10px;
    font-weight: bold;
  }
  &__unit {
    font-size: 13px;
  }
}
</style>
