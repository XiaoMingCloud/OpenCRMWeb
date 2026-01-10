
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
      <Xiaomingcloud-custom-base-detail-section
        :list="mainItem.list"
      >
        <template slot="data" slot-scope="{ data }">
          <slot :data="data" name="data" />
        </template>
      </Xiaomingcloud-custom-base-detail-section>
      <div slot="header" class="Xiaomingcloud-base-detail__more">
        <slot name="more"/>
      </div>
      <slot />
    </create-sections>
  </div>
</template>

<script>
import CreateSections from '@/components/CreateSections'
import XiaomingcloudCustomBaseDetailSection from './XiaomingcloudCustomBaseDetailSection.vue'

export default {
  // 基本详情
  name: 'XiaomingcloudCustomBaseDetail',
  components: {
    CreateSections,
    XiaomingcloudCustomBaseDetailSection: XiaomingcloudCustomBaseDetailSection
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
