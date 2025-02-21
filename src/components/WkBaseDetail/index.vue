
<template>
  <div class="wk-base-detail">
    <create-sections
      v-for="(mainItem, mainIndex) in list"
      :key="mainIndex"
      :title="mainItem.name"
      :dropdown-items="dropdownItems"
      class="wk-base-detail__section"
      content-height="auto"
      @command-select="sectionCommandSelect">
      <wk-base-detail-section
        :list="mainItem.list"
      />
      <div slot="header" class="wk-base-detail__more">
        <slot name="more"/>
      </div>
      <slot />
    </create-sections>
  </div>
</template>

<script>
import CreateSections from '@/components/CreateSections'
import WkBaseDetailSection from './WkBaseDetailSection'

export default {
  // 基本详情
  name: 'WkBaseDetail',
  components: {
    CreateSections,
    WkBaseDetailSection
  },
  props: {
    list: Array,
    dropdownItems: Array
  },
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  mounted() {},

  beforeDestroy() {},
  methods: {
    sectionCommandSelect(type) {
      this.$emit('top-command-select', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.wk-base-detail {
  &__section {
    margin-top: 25px;
  }
  /deep/ .create-sections-content {
    padding: 0 20px;
  }

  &__more {
    position: absolute;
    right: 15px;
  }
}
</style>
