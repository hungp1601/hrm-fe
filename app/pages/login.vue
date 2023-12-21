<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { FETCH_AUTH } from '@/api'
import { AuthStore } from '@/stores'

definePageMeta({
  middleware: ['auth'],
})

interface RuleForm {
  username: string
  password: string
}

const { $swal } = useNuxtApp()

async function login() {
  try {
    const { accessToken, refreshToken } = await FETCH_AUTH.login(form)

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

    await $swal.fire({
      icon: 'success',
      iconColor: '#000',
      html: 'login successful',
      timer: 1500,
      showConfirmButton: false,
    })

    router.push('/')
  } catch (err) {
    console.error(err)
  }
}

const loginRef = ref<FormInstance>()
const form = reactive<RuleForm>({
  username: '',
  password: '',
})

const rules = reactive<FormRules<RuleForm>>({
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
  await loginRef?.value?.validate((valid, fields) => {
    if (valid) {
      login()
    }
  })
}
</script>

<template>
  <div class="login-page">
    <app-icon name="bi-plus"></app-icon>
    <el-form
      ref="loginRef"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="Tài khoản" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="Mật khẩu" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
    </el-form>
    <el-form-item>
      <el-button type="primary" @click="handleLogin">Create</el-button>
    </el-form-item>
  </div>
</template>
