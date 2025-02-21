
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
      <wk-custom-base-detail-section
        :list="mainItem.list"
      >
        <template slot="data" slot-scope="{ data }">
          <slot :data="data" name="data" />
        </template>
      </wk-custom-base-detail-section>
      <div slot="header" class="wk-base-detail__more">
        <slot name="more"/>
      </div>
      <slot />
    </create-sections>
  </div>
</template>

<script>
import CreateSections from '@/components/CreateSections'
import WkCustomBaseDetailSection from './WkCustomBaseDetailSection'

export default {
  // 基本详情
  name: 'WkCustomBaseDetail',
  components: {
    CreateSections,
    WkCustomBaseDetailSection
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
