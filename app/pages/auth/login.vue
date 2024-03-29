<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ROUTER_NAMES } from '../../config/router.name'
import { getService, SERVICE_NAMES, type LoginParams } from '@/api'
import { AuthStore } from '@/stores'

const { $toast, $log4nuxt }: any = useNuxtApp()

const loginRef = ref<FormInstance>()
const { validateForm } = useFormHandler()
const form = reactive<LoginParams>({
  username: '',
  password: '',
})
const rules = reactive<FormRules<LoginParams>>({
  username: [
    {
      required: true,
      message: 'Hãy nhập tài khoản',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Hãy nhập mật khẩu',
      trigger: 'blur',
    },
  ],
})

const handleLogin = async () => {
  const valid = await validateForm(loginRef.value)
  if (!valid) return

  login()
}

const login = async () => {
  try {
    const res = await getService(SERVICE_NAMES.Auth).login(form)
    const accessToken = res.data.access_token
    const refreshToken = res.data.refresh_token

    if (!accessToken) {
      return
    }

    const authorization = useCookie('authorization')
    const refresh_token = useCookie('refreshToken')
    const router = useRouter()

    authorization.value = accessToken
    AuthStore().FN_SET_TOKEN(accessToken)
    refresh_token.value = refreshToken
    AuthStore().FN_SET_REFRESH_TOKEN(refreshToken)

    $toast.success('Đăng nhập thành công')
    router.push({ name: ROUTER_NAMES.HOME })
  } catch (err) {
    $toast.error(err)
    $log4nuxt.error(err)
  }
}
</script>

<template>
  <div
    class="login-page w-screen h-screen flex flex-row justify-center items-center flex-wrap"
  >
    <img
      class="hidden md:block"
      src="@/assets/images/saly.png"
      alt=""
      style="width: 460px; height: 460px"
    />
    <div class="flex flex-col justify-center items-center login-form__wrapper">
      <app-icon :size="80" name="hrm-icon"></app-icon>
      <el-form
        ref="loginRef"
        :model="form"
        :rules="rules"
        label-position="top"
        class="login-form"
        size="large"
        @keydown.enter="handleLogin"
      >
        <el-form-item label="Tài khoản" prop="username">
          <el-input
            v-model="form.username"
            class="login-form__input"
            placeholder="Nhập tên tài khoản"
          />
        </el-form-item>
        <el-form-item label="Mật khẩu" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            class="login-form__input"
            placeholder="Nhập mật khẩu"
            show-password
          />
        </el-form-item>
        <div class="text-right mb-8">
          <NuxtLink
            class="text-l-grey text-sm text-right"
            to="/auth/forgot-password"
          >
            Quên mật khẩu
          </NuxtLink>
        </div>

        <el-form-item>
          <el-button
            class="login-form__submit w-full"
            type="primary"
            @click="handleLogin"
          >
            Đăng nhập
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.login-page {
  gap: 200px;

  .login-form {
    width: 360px;

    &__input {
      .el-input__wrapper {
        border-radius: 8px;
        height: 56px;
        background: #eef4ff;
      }
    }

    &__submit {
      height: 56px;
      border-radius: 8px;
    }
  }
}
</style>
