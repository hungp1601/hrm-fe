<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ROUTER_NAMES } from '../../../config/router.name'
import { getService, SERVICE_NAMES, type ResetPasswordParams } from '@/api'

const { $toast, $log4nuxt }: any = useNuxtApp()

const resetPwd = ref<FormInstance>()
const { validateForm } = useFormHandler()
const form = reactive({
  password: '',
  rePassword: '',
})
const router = useRouter()
const rules = reactive<FormRules>({
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự', trigger: 'blur' },
    {
      validator(rule, value, callback) {
        if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
          callback(
            new Error('Mật khẩu phải có ít nhất một chữ hoa và một chữ thường'),
          )
        }
        callback()
      },
    },
  ],
  rePassword: [
    { required: true, message: 'Vui lòng nhập lại mật khẩu', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === form.password) {
          callback()
        }
        callback(new Error('Mật khẩu không khớp'))
      },
    },
  ],
})

const onSubmit = async () => {
  try {
    const valid = await validateForm(resetPwd.value)
    if (!valid) return
    const { token } = router.currentRoute.value.params
    const params: ResetPasswordParams = {
      token,
      password: form.password,
    }

    const response = await getService(SERVICE_NAMES.Auth).resetPassword(params)
    if (response) {
      $toast.success('Đổi mật khẩu thành công')
      router.push({ name: ROUTER_NAMES.LOGIN })
    }
  } catch (error) {
    $log4nuxt.error('reset password', error)
  }
}

const onBack = () => {
  router.push({ name: ROUTER_NAMES.LOGIN })
}
</script>

<template>
  <div class="flex items-center flex-col w-screen h-screen reset-password-page">
    <div to="/auth/login" class="page-header flex">
      <nuxt-link to="/auth/login">
        <app-icon :size="80" name="hrm-icon" />
      </nuxt-link>
    </div>

    <div class="h-full w-full reset-pwd flex justify-center items-center">
      <el-form
        ref="resetPwd"
        :model="form"
        :rules="rules"
        label-position="top"
        class="reset-pwd__form flex-col justify-center items-center flex"
        size="large"
        @keydown.enter="onSubmit"
      >
        <div class="reset-pwd__title mb-6">Thiết lập mật khẩu</div>

        <div class="reset-pwd__description w-full mb-6">
          <div class="description__item">
            <app-icon :size="20" name="mark-done" />
            Ít nhất một kí tự viết thường
          </div>
          <div class="description__item">
            <app-icon :size="20" name="mark-done" />
            Ít nhất một kí tự viết hoa
          </div>
          <div class="description__item">
            <app-icon :size="20" name="mark-done" />
            Từ 8 kí tự trở lên
          </div>
        </div>

        <el-form-item label="Mật khẩu mới" class="w-full" prop="password">
          <el-input
            v-model="form.password"
            class="reset-pwd__input"
            placeholder="Nhập mật khẩu mới"
            type="password"
          />
        </el-form-item>
        <el-form-item
          label="Nhập lại mật khẩu mới"
          class="w-full"
          prop="rePassword"
        >
          <el-input
            v-model="form.rePassword"
            class="reset-pwd__input"
            placeholder="Nhập lại mật khẩu mới"
            type="password"
          />
        </el-form-item>

        <el-form-item class="flex flex-row gap-2">
          <el-button class="reset-pwd__submit" type="primary" @click="onSubmit">
            Xác nhận
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.reset-password-page {
  .page-header {
    height: 85px;
    width: 100%;
    padding-left: 10%;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
  }

  .reset-pwd {
    height: calc(100vh - 85px);

    &__form {
      max-width: 480px;
      width: 100%;
      padding: 32px 56px;
      border-radius: 8px;
      border: 1px solid #d5d5d5;
      background: #fff;

      .description__item {
        display: flex;
        flex-direction: row;
        gap: 8px;
      }
    }
    &__submit {
      padding-left: 48px;
      padding-right: 48px;
      border-radius: 8px;
    }

    &__title {
      color: #000;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
}
</style>
