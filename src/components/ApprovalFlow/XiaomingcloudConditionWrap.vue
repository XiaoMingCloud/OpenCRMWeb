<template>
  <div class="Xiaomingcloud-conditon-node">
    <div
      class="Xiaomingcloud-conditon-node-wrap">
      <div class="conditon-wrap-body">
        <el-button class="add-btn" plain @click="addClick">添加条件</el-button>
        <div
          v-for="(item, itemIndex) in node.conditionList"
          :key="itemIndex"
          class="condition">
          <template v-if="itemIndex === 0">
            <div class="cover-line is-top-left"/>
            <div class="cover-line is-bottom-left"/>
          </template>
          <template v-if="itemIndex === node.conditionList.length - 1">
            <div class="cover-line is-top-right"/>
            <div class="cover-line is-bottom-right"/>
          </template>
          <Xiaomingcloud-condition-node
            :index="itemIndex"
            :parent="item.examineDataList"
            :condition-parent="node.conditionList"
            :node="item"
            @delete="conditionDelete(itemIndex)"
            @node-click="nodeClick"
          />
          <template v-if="item.examineDataList && item.examineDataList.length > 0">
            <template
              v-for="(subItem, subIndex) in item.examineDataList">
              <Xiaomingcloud-condition-wrap
                v-if="subItem.examineType === 0"
                :key="subIndex"
                :index="subIndex"
                :node="subItem"
                :parent="item.examineDataList"/>
              <Xiaomingcloud-node
                v-else
                :index="subIndex"
                :key="subIndex"
                :node="subItem"
                :parent="item.examineDataList"
                @node-click="nodeClick"/>
            </template>
          </template>
        </div>
      </div>
      <div class="add-node-btn-wrap">
        <add-node-btn @command="handleCommand" />
      </div>
    </div>
  </div>
</template>

<script>
import AddNodeBtn from './AddNodeBtn'
import XiaomingcloudNode from './XiaomingcloudNode.vue'
import XiaomingcloudConditionNode from './XiaomingcloudConditionNode.vue'

import { conditionModel, examineModel, conditionListModel } from './flowModel'
import { objDeepCopy } from '@/utils'

export default {
  // 条件node
  name: 'XiaomingcloudConditionWrap',

  components: {
    AddNodeBtn,
    XiaomingcloudNode: XiaomingcloudNode,
    XiaomingcloudConditionNode: XiaomingcloudConditionNode
  },

  props: {
    index: Number,
    parent: Array,
    node: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      tree: null
    }
  },

  computed: {},

  watch: {},

  created() {
    if (this.$parent.$options.name === 'XiaomingcloudConditionWrap') {
      this.tree = this.$parent.tree
    } else {
      this.tree = this
    }
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    /**
     * 条件添加
     */
    addClick() {
      this.node.conditionList.push(objDeepCopy(conditionModel))
    },

    /**
     * 条件删除
     */
    conditionDelete(index) {
      if (this.node.conditionList.length > 2) {
        this.node.conditionList.splice(index, 1)
      } else {
        this.parent.splice(this.index, 1)
      }
    },

    /**
     * 添加
     */
    handleCommand(command) {
      if (command === 'approve') {
        this.parent.splice(this.index + 1, 0, objDeepCopy(examineModel))
      } else if (command === 'condition') {
        this.parent.splice(this.index + 1, 0, objDeepCopy(conditionListModel))
      }
    },

    /**
     * 点击
     */
    nodeClick(data) {
      this.tree.$emit('node-click', data)
    }
  }
}
</script>

<style lang="scss">

</style>
