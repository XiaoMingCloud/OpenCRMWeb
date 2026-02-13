<template>
  <div v-loading="loading" class="ios-container">
    <div class="ios-card">
      <div class="ios-header">
        <h3>系统欢迎语</h3>
        <el-button
          type="primary"
          class="save-btn"
          size="medium"
          @click="save">保存</el-button>
      </div>

      <div class="ios-body">
        <reminder class="reminder" content="以下内容为系统默认欢迎语，在日志随机展示，可自定义更改欢迎语。"/>

        <div
          v-for="(item, index) in list"
          :key="index"
          class="ios-input-item">
          <div class="ios-input-wrapper">
            <el-input
              v-model="item.value"
              :maxlength="100"
              class="ios-input"/>
            <i
              class="el-icon-remove ios-remove-btn"
              @click="deleteItem(item, index)"/>
          </div>
        </div>

        <el-button
          type="text"
          class="add-btn"
          @click="addItem">+ 添加欢迎语</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  sysSetLogWelcomeAPI,
  sysGetLogWelcomeListAPI
} from '@/api/admin/other'

import Reminder from '@/components/Reminder'

export default {
  name: 'LogWelcome',

  components: {
    Reminder
  },

  data() {
    return {
      loading: false,
      list: []
    }
  },

  created() {
    this.getDetail()
  },

  methods: {
    getDetail() {
      this.loading = true
      sysGetLogWelcomeListAPI()
        .then(res => {
          this.loading = false
          this.list = res.data || []
        })
        .catch(() => {
          this.loading = false
        })
    },

    addItem() {
      this.list.push({ value: '' })
    },

    deleteItem(item, index) {
      this.list.splice(index, 1)
    },

    save() {
      const value = []
      for (let index = 0; index < this.list.length; index++) {
        const element = this.list[index]
        if (element.value) {
          value.push(element.value)
        }
      }

      if (value.length == 0) {
        this.$message.error('请输入欢迎语')
        return
      }
      this.loading = true
      sysSetLogWelcomeAPI(value)
        .then(res => {
          this.loading = false
          this.getDetail()
          this.$message.success('操作成功')
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ios-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.ios-card {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 600px;
  margin: 0 auto;
}

.ios-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.4);

  h3 {
    margin: 0;
    color: #1d1d1d;
    font-size: 18px;
    font-weight: 600;
  }
}

.save-btn {
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 14px;
  background: linear-gradient(135deg, #007aff 0%, #00a6ff 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4);
  }
}

.ios-body {
  padding: 24px 30px;
  color: #333;
  font-size: 14px;
}

.reminder {
  margin-bottom: 16px;
  font-size: 13px;
  color: #666;
}

.ios-input-item {
  margin-bottom: 12px;
}

.ios-input-wrapper {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
}

.ios-input {
  /deep/ .el-input__inner {
    border: none !important;
    background: transparent !important;
    border-radius: 12px !important;
    padding: 12px 16px !important;
    font-size: 14px !important;
    color: #333 !important;
    box-shadow: none !important;

    &::placeholder {
      color: #aaa !important;
    }

    &:focus {
      border-color: #007aff !important;
      box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2) !important;
    }
  }
}

.ios-remove-btn {
  color: #ff3b30;
  cursor: pointer;
  font-size: 18px;
  margin-left: 8px;
  opacity: 0;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 50%;
  background: rgba(255, 59, 48, 0.1);

  &:hover {
    background: rgba(255, 59, 48, 0.2);
    transform: scale(1.1);
  }
}

.ios-input-wrapper:hover .ios-remove-btn {
  opacity: 1;
}

.add-btn {
  color: #007aff;
  font-size: 14px;
  padding: 12px 0;
  border-radius: 12px;
  transition: all 0.2s ease;
  background: rgba(0, 122, 255, 0.1);
  margin-top: 8px;
  width: 100%;

  &:hover {
    background: rgba(0, 122, 255, 0.15);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.1);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .ios-container {
    padding: 10px;
  }

  .ios-card {
    border-radius: 12px;
  }

  .ios-header {
    padding: 16px;

    h3 {
      font-size: 16px;
    }
  }

  .save-btn {
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 13px;
  }

  .ios-body {
    padding: 20px;
  }

  .ios-input-wrapper {
    border-radius: 10px;
    padding: 2px;
  }

  .add-btn {
    border-radius: 10px;
    font-size: 13px;
  }
}
</style>
