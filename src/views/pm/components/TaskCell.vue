<template>
  <div
    ref="taskRow"
    :style="{'border-left-color': getPriorityColor(data.priority).color }"
    class="list"
    @click="rowFun(data)">
    <div
      ref="listLeft"
      class="list-left">
      <div
        :class="data.checked ? 'title title-active' : 'title'"
        @click.stop>
        <el-checkbox
          :disabled="disabled"
          v-model="data.checked"
          @change="taskOverClick(data)"/>
      </div>
      <el-tooltip
        placement="bottom"
        effect="light"
        popper-class="task-tooltip tooltip-change-border">
        <div slot="content">
          <span>{{ data.name }}</span>
        </div>
        <span
          ref="itemSpan"
          :class="data.checked ? 'item-name-active' : 'item-name'">
          {{ data.name }}
        </span>
      </el-tooltip>
    </div>
    <div class="list-right">
      <div
        v-if="data.labelList"
        class="tag-box">
        <template v-if="data.labelList.length <= 2">
          <div
            v-for="(k, j) in data.labelList"
            :key="j"
            class="item-label">
            <span
              :style="{'background': k.color}"
              class="k-name">{{ k.labelName }}</span>
          </div>
        </template>
        <template v-else>
          <span
            :style="{'background': data.labelList[0].color}"
            class="k-name">{{ data.labelList[0].labelName }}</span>
          <span
            :style="{'background': data.labelList[1].color}"
            class="k-name">{{ data.labelList[1].labelName }}</span>
          <el-tooltip
            placement="top"
            effect="light"
            popper-class="tooltip-change-border task-tooltip">
            <div
              slot="content"
              class="tooltip-content"
              style="margin: 10px 10px 10px 0;">
              <div
                v-for="(k, j) in data.labelList"
                :key="j"
                class="item-label"
                style="display: inline-block; margin-right: 10px;">
                <span
                  v-if="j >= 2"
                  :style="{'background': k.color ? k.color: '#ccc'}"
                  class="k-name"
                  style="border-radius: 3px; color: #FFF; padding: 3px 10px;">{{ k.labelName }}</span>
              </div>
            </div>
            <span class="color-label-more">
              <i>...</i>
            </span>
          </el-tooltip>
        </template>
      </div>
      <div class="img-group">
        <div
          v-if="data.relationCount"
          class="img-box">
          <i class="liujiaming liujiaming-relevance"/>
          <span>{{ data.relationCount }}</span>
        </div>
        <div
          v-if="data.childAllCount > 0"
          class="img-box">
          <i class="liujiaming liujiaming-sub-task"/>
          <span>{{ data.childWCCount }}/{{ data.childAllCount }}</span>
        </div>
        <div
          v-if="data.fileCount"
          class="img-box">
          <i class="liujiaming liujiaming-file"/>
          <span>{{ data.fileCount }}</span>
        </div>
        <div
          v-if="data.commentCount"
          class="img-box">
          <i class="liujiaming liujiaming-comment-task"/>
          <span>{{ data.commentCount }}</span>
        </div>
        <div
          v-if="data.stopTime"
          class="img-box">
          <i
            :style="{'color': data.isEnd == 1 && !data.checked ? 'red': '#999'}"
            class="liujiaming liujiaming-time-task"/>
          <span :style="{'color': data.isEnd == 1 && !data.checked ? 'red': '#999'}">{{ data.stopTime | moment("MM-DD") }} 截止</span>
        </div>
      </div>
      <div class="item-own-box">
        <el-tooltip
          v-if="data.mainUser && data.mainUser.id"
          placement="bottom"
          effect="light"
          popper-class="tooltip-change-border">
          <div slot="content">
            <span>{{ data.mainUser.realname }}</span>
          </div>
          <xr-avatar
            :name="data.mainUser.realname"
            :size="24"
            :src="data.mainUser.img"
            class="user-img" />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { workTaskStatusSetAPI } from '@/api/pm/projectTask'

import TaskMixin from '@/views/taskExamine/task/mixins/TaskMixin'

export default {
  name: 'TaskCell', // 任务cell

  components: {},

  mixins: [TaskMixin],

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    data: Object,
    dataIndex: Number,
    dataSection: Number
  },

  data() {
    return {}
  },

  mounted() {},

  methods: {
    /**
     * 列表标记任务
     */
    taskOverClick(val) {
      workTaskStatusSetAPI({
        taskId: val.taskId,
        status: val.checked ? 5 : 1
      })
        .then(res => {})
        .catch(() => {
          val.checked = false
        })
    },

    /**
     * 点击显示详情
     */
    rowFun(val) {
      this.$emit('on-handle', {
        type: 'view',
        data: { item: this.data, index: this.dataIndex, section: this.dataSection }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  background-color: white;
  padding: 0 10px;
  cursor: pointer;
  border-bottom: 1px solid #e6e6e6;
  border-left: 2px solid transparent;
  border-radius: $xr-border-radius-base;
  height: 51px;
  line-height: 51px;
  display: flex;
  .header {
    margin-bottom: 15px;
    img {
      width: 32px;
      margin-right: 14px;
      vertical-align: middle;
    }
    .name-time {
      display: inline-block;
      vertical-align: middle;
      .time {
        color: #999;
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
  .title {
    cursor: pointer;
    color: #333;
    display: inline-block;
    .el-checkbox {
      padding-right: 7px;
    }
  }
  .title-active {
    color: #666;
    text-decoration: line-through;
    text-decoration-color: #aaa;
  }
  .img-group {
    color: #999;
    font-size: 12px;
    vertical-align: middle;
    display: inline-block;
    .img-box {
      display: inline-block;
      margin-right: 6px;
      img {
        vertical-align: middle;
        width: 16px;
        height: 16px;
      }
      span {
        vertical-align: middle;
      }
      .priority-btn {
        width: 68px;
        font-size: 12px;
        display: inline-block;
        text-align: center;
        border-radius: 10px;
        color: #fff;
        height: 16px;
        line-height: 16px;
      }
    }
  }
  .item-name-active {
    color: #8f8f8f;
    text-decoration: line-through;
  }
  .list-left,
  .list-right {
    display: inline-block;
  }
  .list-left {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 10px;
  }
  .list-right {
    float: right;
    .item-own-box {
      display: inline-block;
      vertical-align: middle;
      .user-img {
        vertical-align: middle;
        margin-left: 12px;
      }
    }
    .tag-box {
      display: inline-block;
      .item-label {
        display: inline-block;
      }
      .k-name {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        padding: 0 10px;
        border-radius: 3px;
        color: #fff;
        margin-right: 6px;
        font-size: 12px;
      }
    }
    .tag-box /deep/ .color-label-more {
      background: #eee;
      width: 34px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      display: inline-block;
      font-size: inherit;
      font-weight: 700;
      border-radius: 3px;
      vertical-align: middle;
      position: relative;
      i {
        position: absolute;
        left: 50%;
        line-height: 36px;
        top: 0%;
        height: 20px;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.list:hover {
  background: #fafafa;
}
.liujiaming {
  font-size: 14px;
}
</style>
