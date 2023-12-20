<script lang="ts" setup>
import { FETCH_AUTH } from '@/api'
import { AuthStore } from '@/stores'

definePageMeta({
  middleware: ['auth'],
})

const { $swal } = useNuxtApp()

const user = ref({
  username: '',
  password: '',
})

async function login() {
  try {
    const { accessToken, refreshToken } = await FETCH_AUTH.login(user.value)

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
</script>

<template>
  <div>123</div>
</template>
