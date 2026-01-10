<template>
  <transition name="opacity-fade">
    <div
      :style="{ 'z-index': zIndex }"
      class="Xiaomingcloud-steps-explain-view">
      <div class="label">{{ title }}</div>
      <Xiaomingcloud-steps>
        <Xiaomingcloud-step
          v-for="(step, index) in steps"
          :key="index"
          :icon="step.icon"
          :label="step.label"
          :des-left="step.desLeft"
          :des-center="step.desCenter"
          :des-right="step.desRight"
          :button="step.button"
          @step-click="stepClick($event, index, step)"
        />
      </Xiaomingcloud-steps>
    </div>
  </transition>
</template>

<script>
import XiaomingcloudSteps from '@/components/NewCom/XiaomingcloudSteps'
import XiaomingcloudStep from '@/components/NewCom/XiaomingcloudSteps/XiaomingcloudStep'

import { getMaxIndex } from '@/utils'

export default {
  // 步骤说明视图
  name: 'XiaomingcloudStepsExplainView',
  components: {
    XiaomingcloudSteps,
    XiaomingcloudStep
  },
  props: {
    title: String,
    steps: Array
  },
  data() {
    return {
      zIndex: getMaxIndex()
    }
  },
  computed: {},
  watch: {},
  mounted() {},

  beforeDestroy() {},
  methods: {
    stepClick(type, index, step) {
      this.$emit('step-click', type, index, step)
    }
  }
}
</script>

<style lang="scss" scoped>
.opacity-fade-enter-active,
.opacity-fade-leave-active {
  transition: all 0.2s;
}
.opacity-fade-enter,
.opacity-fade-leave-to {
  opacity: 0;
}
.Xiaomingcloud-steps-explain-view {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: white;

  .label {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-top: 10%;
  }

  .Xiaomingcloud-steps {
    margin-top: 10%;
  }
}
</style>
