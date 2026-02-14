<template>
  <div
    v-loading="loading"
    class="edit-user-info-ios">
    <div class="head">
      <span class="xiaomingcloud open-user icon" />
      <span class="text">个人信息</span>
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="120px"
      class="form-ios">
      <el-form-item label="头像">
        <div class="user-box">
          <xr-avatar
            :name="userInfo.realname"
            :size="70"
            :src="userInfo.img"
            class="user-img" />
          <div class="change-avatar" @click="handleChangeAvatar">
            更换头像
          </div>
        </div>
      </el-form-item>

      <el-form-item
        v-for="(item, index) in fieldList"
        :key="index"
        :prop="item.field"
        :label="item.label">
        <el-input
          v-if="item.type !== 'select'"
          v-model="form[item.field]"
          :maxlength="30"
          :disabled="item.disabled"
          class="input-ios" />
        <el-select
          v-else
          v-model="form[item.field]"
          class="select-ios">
          <el-option
            v-for="option in item.setting"
            :key="option.value"
            :label="option.label"
            :value="option.value" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="btn-ios" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>

    <input
      id="inputFile"
      type="file"
      accept="image/png, image/jpeg, image/gif, image/jpg"
      style="display: none;"
      @change="uploadFile">

    <edit-image
      :show="showEditImage"
      :file="editFile"
      :image="editImage"
      @save="submitImage"
      @close="showEditImage=false"/>
  </div>
</template>

<script>
import { adminUsersUpdateImgAPI, adminUsersUpdateAPI } from '@/api/user/personCenter'
import { mapGetters } from 'vuex'
import { regexIsCRMMobile, regexIsCRMEmail } from '@/utils'
import EditImage from '@/components/EditImage'

export default {
  name: 'EditUserInfoIOS',
  components: { EditImage },
  data() {
    const sexMap = [
      { label: '请选择', value: 0 },
      { label: '男', value: 1 },
      { label: '女', value: 2 }
    ]
    const validateCRMMobile = (rule, value, callback) => {
      if (!value || value === '' || regexIsCRMMobile(value)) callback()
      else callback(new Error('手机格式有误'))
    }
    const validateCRMEmail = (rule, value, callback) => {
      if (!value || value === '' || regexIsCRMEmail(value)) callback()
      else callback(new Error('邮箱格式有误'))
    }
    return {
      fieldList: [
        { label: '姓名', field: 'realname' },
        { label: '手机号(登录名)', field: 'mobile', disabled: true },
        { label: '直属上级', field: 'parentName', disabled: true },
        { label: '性别', field: 'sex', type: 'select', setting: sexMap },
        { label: '邮箱', field: 'email' },
        { label: '部门', field: 'deptName', disabled: true },
        { label: '岗位', field: 'post' }
      ],
      rules: {
        realname: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        email: [{ validator: validateCRMEmail, trigger: 'change' }],
        username: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
          { validator: validateCRMMobile, trigger: 'change' }
        ]
      },
      form: {},
      loading: false,
      showEditImage: false,
      editFile: null,
      editImage: null
    }
  },
  computed: { ...mapGetters(['userInfo']) },
  watch: {
    userInfo: {
      handler() { this.initData() },
      deep: true,
      immediate: true
    }
  },
  methods: {
    initData() { this.form = { ...this.userInfo } },
    handleChangeAvatar() { document.getElementById('inputFile').click() },
    uploadFile(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        const result = typeof e.target.result === 'object'
          ? window.URL.createObjectURL(new Blob([e.target.result]))
          : e.target.result
        this.editImage = result
        this.editFile = file
        this.showEditImage = true
        e.target.value = ''
      }
      reader.readAsDataURL(file)
    },
    submitImage(data) {
      this.loading = true
      const param = new FormData()
      param.append('userId', this.form.userId)
      param.append('file', data.blob, data.file.name)
      adminUsersUpdateImgAPI(param)
        .then(() => { this.loading = false; this.$emit('change') })
        .catch(() => { this.loading = false })
    },
    handleSave() {
      const params = { realname: this.form.realname, sex: this.form.sex, email: this.form.email, post: this.form.post, username: this.form.username }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          adminUsersUpdateAPI(params)
            .then(() => { this.loading = false; this.$message.success('保存成功'); this.$emit('change') })
            .catch(() => { this.loading = false })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.edit-user-info-ios {
  width: 100%;
  padding: 22px 25px;

  /* iOS 毛玻璃效果 */
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  .head {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .icon {
      font-size: 24px;
      margin-right: 10px;
      color: #548aef;
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

    .input-ios, .select-ios {
      border-radius: 12px !important;
      padding: 10px 14px;
      background: rgba(255,255,255,0.6);
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
      background: #74a2f8;
      color: #fff;
      font-weight: 600;
      font-size: 16px;
      height: 44px;
      box-shadow: 0 4px 10px rgb(134, 156, 218);
    }
  }

  .user-box {
    display: flex;
    align-items: center;
    gap: 15px;

    .user-img {
      border-radius: 50%;
      border: 2px solid rgba(0,0,0,0.1);
    }

    .change-avatar {
      cursor: pointer;
      color: #8ba6f3;
      font-weight: 500;
    }
  }
}
</style>
