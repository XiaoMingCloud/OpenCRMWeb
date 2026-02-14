<template>
  <div class="edit-pwd-ios">
    <div class="head">
      <span class="xiaomingcloud open-circle-password icon" />
      <span class="text">账号密码</span>
    </div>
    <el-form
      v-loading="loading"
      ref="form"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="120px"
      class="form-ios">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input
          v-model.trim="form.oldPwd"
          :maxlength="20"
          type="password"
          class="input-ios" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input
          v-model.trim="form.newPwd"
          :maxlength="20"
          type="password"
          class="input-ios" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input
          v-model.trim="form.confirmPwd"
          :maxlength="20"
          type="password"
          class="input-ios" />
      </el-form-item>
      <el-form-item>
        <el-button
          class="btn-ios"
          type="primary"
          @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { adminUsersResetPasswordAPI } from '@/api/user/personCenter'
import { removeAuth } from '@/utils/auth'

export default {
  name: 'EditPwdIOS',
  data() {
    const pwdReg = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/
    return {
      loading: false,
      form: {},
      rules: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { pattern: pwdReg, message: '密码必须由6-20位字母、数字组成', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: pwdReg, message: '密码必须由6-20位字母、数字组成', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: this.validatedConfirmPwd, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    validatedConfirmPwd(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    handleSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {
            id: this.userInfo.userId,
            oldPwd: this.form.oldPwd,
            newPwd: this.form.newPwd
          }
          adminUsersResetPasswordAPI(params).then(() => {
            this.loading = false
            removeAuth().then(() => {
              this.$confirm('修改成功, 请重新登录', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning'
              }).then(() => {
                this.$router.push('/login')
              }).catch(() => {
                this.$router.push('/login')
              })
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.edit-pwd-ios {
  width: 100%;
  min-height: 100%;
  padding: 22px 25px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 18px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  .head {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .icon {
      font-size: 24px;
      margin-right: 10px;
      color: #33D08F;
    }
    .text {
      font-size: 20px;
      font-weight: 600;
      color: #1c1c1e;
    }
  }

  .form-ios {
    .el-form-item {
      margin-bottom: 16px;

      .el-form-item__label {
        color: #1c1c1e;
        font-weight: 500;
      }
    }

    .input-ios {
      border: none !important;
      border-radius: 12px;
      padding: 10px 14px;
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(0,0,0,0.1);
      font-size: 16px;
      color: #1c1c1e;

      &::placeholder {
        color: rgba(28,28,30,0.5);
      }
    }

    .btn-ios {
      width: 100%;
      border-radius: 22px;
      background: #4881ec;
      color: #fff;
      font-weight: 600;
      font-size: 16px;
      height: 44px;
      box-shadow: 0 4px 10px rgb(149, 179, 236);
    }
  }
}
</style>
