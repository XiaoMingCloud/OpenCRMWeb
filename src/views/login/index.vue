<template>
  <div class="login-wrapper">
    <div class="container">
      <div class="left">
        <img
          src=""
          alt=""
          class="main-pic"
        >
      </div>
      <div class="right">
        <div class="login-main-content">
          <div class="logo-box">
            {{ titleMap[activeCom] }}
          </div>
          <component :is="activeCom" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginByPwd from './component/LoginByPwd'

export default {
  name: 'Login',
  components: {
    LoginByPwd
  },
  data() {
    return {
      activeCom: 'LoginByPwd',
      titleMap: {
        LoginByPwd: '欢迎登录'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import 'index';

/* =========================
   整体背景（增强层次）
========================= */
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('~@/assets/login/bg.png') center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  overflow: auto;

  /* 背景遮罩层 */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
        120deg,
        rgba(0, 0, 0, 0.28),
        rgba(0, 0, 0, 0.08)
    );
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  .container {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -42px;

    /* =========================
       左侧展示区
    ========================= */
    .left {
      .main-pic {
        width: 560px;
        margin: 50px 0 20px -20px;
        opacity: 0.96;
        filter: drop-shadow(0 14px 30px rgba(0, 0, 0, 0.25));

        @media screen and (max-width: 1550px) {
          width: 500px;
        }
      }
    }

    /* =========================
       右侧登录区（重点）
    ========================= */
    .right {
      width: 480px;
      margin-left: 80px;
      padding-top: 10px;

      .login-main-content {
        position: relative;
        width: 100%;
        height: 500px;

        /* 毛玻璃核心 */
        background: rgba(255, 255, 255, 0.78);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);

        border-radius: 16px;
        overflow: hidden;

        /* 高级阴影 */
        box-shadow:
          0 18px 40px rgba(0, 0, 0, 0.18),
          0 4px 10px rgba(0, 0, 0, 0.08);

        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-4px);
          box-shadow:
            0 26px 60px rgba(0, 0, 0, 0.22),
            0 8px 18px rgba(0, 0, 0, 0.12);
        }

        /* =========================
           标题栏
        ========================= */
        .logo-box {
          position: relative;
          width: 100%;
          font-size: 20px;
          font-weight: 600;
          color: #2b2b2b;
          letter-spacing: 1px;
          padding: 0 40px;
          margin: 22px 0 26px;

          &:before {
            content: '';
            position: absolute;
            left: 24px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 18px;
            background: linear-gradient(
                180deg,
                #3e6bea,
                #6a8dff
            );
            border-radius: 3px;
          }
        }

        /* =========================
           底部提示
        ========================= */
        .use-tip {
          position: absolute;
          left: 0;
          bottom: 18px;
          width: 100%;
          text-align: center;
          color: #999;
          font-size: 12px;

          div + div {
            margin-top: 3px;
          }

          .icon {
            width: 15px;
            vertical-align: middle;
          }

          .text {
            vertical-align: middle;
          }
        }
      }
    }

    @media screen and (max-width: 1550px) {
      margin-top: -20px;
    }
  }
}

/* =========================
   下载弹窗（原样保留）
========================= */
.download-popover {
  .popover-box {
    width: 126px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .qrcode {
      width: 126px;
      height: 126px;
    }

    .down-text {
      width: 126px;
      font-size: 12px;
      text-align: center;
      color: #666;
      margin-top: 5px;
    }
  }
}
</style>
