<template>
  <flexbox align="flex-start" class="person-center-ios">
    <!-- 左侧导航 -->
    <div class="left-ios">
      <flexbox class="user-box-ios">
        <xr-avatar
          :name="userInfo.realname"
          :size="50"
          :src="userInfo.img"
          class="user-img-ios"/>
        <span class="username-ios">
          {{ userInfo.realname }}
        </span>
      </flexbox>
      <ul class="nav-list-ios">
        <li
          v-for="(item, index) in navList"
          :key="index"
          :class="['nav-list-item-ios', { active: selectedIndex === index }]"
          @click="selectedIndex = index">
          <span :class="item.icon" class="Xiaomingcloud icon" />
          <span class="text">
            {{ item.label }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 右侧内容 -->
    <div class="right-ios">
      <edit-user-info
        v-if="selectedIndex === 0"
        @change="getDetail"/>
      <edit-pwd v-if="selectedIndex === 1"/>
    </div>
  </flexbox>
</template>

<script>
import { mapGetters } from 'vuex'
import EditUserInfo from './components/EditUserInfo'
import EditPwd from './components/EditPwd'

export default {
  name: 'PersonCenterIOS',
  components: { EditUserInfo, EditPwd },
  data() {
    return { selectedIndex: 0 } // 0:个人信息 1:账号密码
  },
  computed: {
    ...mapGetters(['userInfo']),
    navList() {
      return [
        { label: '个人信息', icon: 'Xiaomingcloud-user' },
        { label: '账号密码', icon: 'Xiaomingcloud-circle-password' }
      ]
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.loading = true
      this.$store.dispatch('GetUserInfo')
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.person-center-ios {
  width: 1180px;
  margin: 0 auto;
  display: flex;

  .left-ios {
    width: 300px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 16px;
    padding-bottom: 50px;
    margin-right: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    .user-box-ios {
      width: 100%;
      padding: 15px 20px;
      display: flex;
      align-items: center;

      .user-img-ios {
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, 0.1);
        margin-right: 15px;
      }

      .username-ios {
        font-size: 16px;
        font-weight: 500;
        color: #1c1c1e;
      }
    }

    .nav-list-ios {
      width: 100%;
      padding: 10px 0;
      list-style: none; // 去掉默认圆点
      margin: 0;

      .nav-list-item-ios {
        display: flex;
        align-items: center; // 垂直居中
        height: 60px; // 增加上下间距
        padding: 0 20px;
        border-radius: 12px;
        cursor: pointer;
        color: #666;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.2s ease;

        .icon {
          margin-right: 12px;
          font-size: 20px;
          display: flex;
          align-items: center; // 图标垂直居中
        }

        .text {
          line-height: 60px; // 文字垂直居中
        }

        &:hover, &.active {
          color: #1c1c1e;
          background: rgba(255, 255, 255, 0.4);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
      }
    }
  }

  .right-ios {
    flex: 1;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 20px;
    overflow: hidden;

    /* iOS 风格输入框和按钮全局样式 */
    input, textarea, select, button {
      border-radius: 12px;
      transition: all 0.3s ease;
    }
  }
}
</style>
