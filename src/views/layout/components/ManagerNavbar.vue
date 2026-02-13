<template>
  <div class="navbar">
    <img
      v-src="logo"
      :key="logo"
      class="logo"
      @click="enterMainPage" >

    <div class="nav-title">
      系统设置
    </div>

    <div class="nav-actions">
      <div class="back-home" @click="enterHome">
        返回首页
      </div>

      <div class="go-out" @click="enterLogin">
        退出系统
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  components: {},
  props: {
    navIndex: String
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['logo', 'crm'])
  },
  mounted() {},
  methods: {
    enterHome() {
      this.$router.replace({
        path: '/'
      })
    },
    enterLogin() {
      this.$confirm('退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var loading = Loading.service({
            target: document.getElementById('#app')
          })
          this.$store
            .dispatch('LogOut')
            .then(() => {
              loading.close()
              location.reload()
            })
            .catch(() => {
              loading.close()
              location.reload()
            })
        })
        .catch(() => {})
    },

    /**
     * 有客户权限点击logo 进入仪表盘
     */
    enterMainPage() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>

.navbar {
  height: 64px;
  min-height: 64px;

  display: flex;
  align-items: center;
  padding: 0 40px;

  /* 🍎 iOS 毛玻璃 */
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  border-bottom: 1px solid rgba(0,0,0,0.06);

  box-shadow:
    0 8px 30px rgba(0,0,0,0.06),
    0 2px 6px rgba(0,0,0,0.04);

  position: sticky;
  top: 0;
  z-index: 100;
}

/* ===== LOGO ===== */

.logo {
  width: 150px;
  height: 40px;
  flex-shrink: 0;
  margin-right: 50px;
  cursor: pointer;
  transition: transform .2s ease;
}

.logo:hover {
  transform: scale(1.03);
}

/* ===== 标题 ===== */

.nav-title {
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  color: #1d1d1f;
  letter-spacing: .5px;
}

/* ===== 按钮区域 ===== */

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ===== 通用按钮风格 ===== */

.back-home,
.go-out {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all .2s ease;
  user-select: none;
}

/* 返回首页 - iOS 蓝 */

.back-home {
  background: linear-gradient(135deg,#0A84FF,#4DA3FF);
  color: #fff;

  box-shadow: 0 6px 18px rgba(10,132,255,0.35);
}

.back-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(10,132,255,0.45);
}

/* 退出系统 - 柔灰 */

.go-out {
  background: rgba(142,142,147,0.18);
  color: #3a3a3c;
}

.go-out:hover {
  background: rgba(142,142,147,0.28);
  transform: translateY(-2px);
}

/* ===== 按压效果 ===== */

.back-home:active,
.go-out:active {
  transform: scale(0.96);
}

</style>

