<template>
  <div
    class="welcome-wrapper">
    <div class="top-nav">
      <img
        src="./logo_white.png"
        alt="">
    </div>
    <div class="container">

      <div class="welcome-main-content">
        <div class="welcome__title">
          <i class="el-icon-success"/>恭喜您，已成功安装OpenCRM
        </div>

        <div class="welcome__des">您已成功安装OpenCRM，您可以尽情享用OpenCRM开源版所有功能及服务。在使用OpenCRM前，
        您需要完成您的账户验证，以及初始化管理员的登录密码。</div>



      </div>
    </div>
  </div>
</template>

<script>
import LoginByWelcome from './component/LoginByWelcome'

export default {
  name: 'Login',
  components: {
    LoginByWelcome
  },
  data() {
    return {}
  },
  watch: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import 'index';

.welcome-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('~@/assets/login/welcome_bg.png') center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .top-nav {
    width: 100%;
    padding: 23px 2.8% 0;
    display: flex;
    img {
      width: 164px;
      height: 50px;
    }
  }

  .container {
    width: 100%;
    flex: 1;
    text-align: center;
  }

  .welcome-main-content {
    position: relative;
    width: 700px;
    border-radius: 6px;
    overflow: hidden;
    display: inline-block;

    .welcome {
      &__title {
        font-weight: bold;
        font-size: 30px;
        color: white;
        margin: 15px 0 20px;
        .el-icon-success {
          font-size: 30px;
          color: #20b559;
          background-color: white;
          border-radius: 15px;
          margin-right: 24px;
        }
      }

      &__des {
        color: white;
        line-height: 2;
        padding: 10px 0;
      }

      &__main {
        padding: 0 40px;
        margin-bottom: 100px;
      }

      &__tips {
        background-color: white;
        line-height: 2;
        margin: 20px 0;
        padding: 20px 40px;
        border-radius: 6px;
        overflow: hidden;

        a {
          color: $xr-color-primary;
        }
      }
    }
  }
}
</style>
