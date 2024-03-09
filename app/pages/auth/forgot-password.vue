<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ROUTER_NAMES } from '../../config/router.name'
import { getService, SERVICE_NAMES, type ForgotPasswordParams } from '@/api'

const { $toast, $log4nuxt }: any = useNuxtApp()
const router = useRouter()
const forgotPwdRef = ref<FormInstance>()
const { validateForm } = useFormHandler()
const form = reactive<ForgotPasswordParams>({
  email: '',
})
const rules = reactive<FormRules<ForgotPasswordParams>>({
  email: [
    {
      required: true,
      message: 'Hãy nhập email',
      trigger: 'blur',
    },
    {
      validator(rule, value, callback) {
        if (
          value &&
          !value.match(
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
          )
        ) {
          callback(new Error('Vui nhập đúng định dạng email'))
        }
        callback()
      },
    },
  ],
})

const onSubmit = async () => {
  try {
    const valid = await validateForm(forgotPwdRef.value)
    if (!valid) return

    const res = await getService(SERVICE_NAMES.Auth).forgotPassword(form)
    if (res) {
      $toast.success('Mật khẩu mới đã được gửi vào email của bạn')
      router.push({ name: ROUTER_NAMES.LOGIN })
    }
  } catch (error) {
    $log4nuxt.error('ForgotPassword', error)
  }
}

const onBack = () => {
  router.push({ name: ROUTER_NAMES.LOGIN })
}
</script>

<template>
  <div
    class="flex justify-center items-center w-screen h-screen forgot-password-page"
  >
    <div
      class="h-full w-full forgot-pwd flex justify-center items-center flex-col"
    >
      <div class="mb-4">
        <app-icon :size="80" name="hrm-icon" class="mb-4"></app-icon>
      </div>

      <el-form
        ref="forgotPwdRef"
        :model="form"
        :rules="rules"
        label-position="top"
        class="forgot-pwd__form w-full justify-center flex-col items-center flex"
        size="large"
        @keydown.enter="onSubmit"
      >
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            class="forgot-pwd__input w-full rounded-lg"
            placeholder="Nhập email để khôi phục mật khẩu"
          >
            <template #prepend>
              <app-icon :size="52" name="envelop" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item class="flex flex-row w-full">
          <el-button
            class="forgot-pwd__submit flex-1"
            type="primary"
            @click="onBack"
          >
            Quay lại
          </el-button>
          <el-button
            class="forgot-pwd__submit flex-1"
            style="margin-left: 44px"
            type="primary"
            @click="onSubmit"
          >
            Xác nhận
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.forgot-password-page {
  .forgot-pwd {
    max-width: 480px;
    max-height: 330px;
    border-radius: 8px;
    border: 1px solid #d5d5d5;
    padding: 48px 56px;

    &__form {
      .el-input-group__prepend {
        padding: 0;
        background: #cdcdcd;
      }
      .el-input__wrapper {
        border-radius: 0px 8px 8px 0px;
      }
    }

    &__submit {
      width: 100%;
      border-radius: 8px;
    }
  }
}
</style>
