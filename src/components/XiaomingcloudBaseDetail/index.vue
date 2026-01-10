
<template>
  <div class="Xiaomingcloud-base-detail">
    <create-sections
      v-for="(mainItem, mainIndex) in list"
      :key="mainIndex"
      :title="mainItem.name"
      :dropdown-items="dropdownItems"
      class="Xiaomingcloud-base-detail__section"
      content-height="auto"
      @command-select="sectionCommandSelect">
      <Xiaomingcloud-base-detail-section
        :list="mainItem.list"
      />
      <div slot="header" class="Xiaomingcloud-base-detail__more">
        <slot name="more"/>
      </div>
      <slot />
    </create-sections>
  </div>
</template>

<script>
import CreateSections from '@/components/CreateSections'
import XiaomingcloudBaseDetailSection from './XiaomingcloudBaseDetailSection.vue'

export default {
  // 基本详情
  name: 'XiaomingcloudBaseDetail',
  components: {
    CreateSections,
    XiaomingcloudBaseDetailSection: XiaomingcloudBaseDetailSection
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
.Xiaomingcloud-base-detail {
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
