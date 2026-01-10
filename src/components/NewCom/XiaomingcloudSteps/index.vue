
<template>
  <flexbox class="Xiaomingcloud-steps" align="stretch">
    <slot />
  </flexbox>
</template>

<script>

export default {
  // 步骤说明
  name: 'XiaomingcloudSteps',
  components: {},
  props: {},
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
.Xiaomingcloud-steps {
  position: relative;
  text-align: center;
}
</style>
