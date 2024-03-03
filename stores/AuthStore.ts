import { defineStore } from 'pinia'
import { getService, SERVICE_NAMES } from '@/api'
import { ROUTER_NAMES } from '~/app/config/router.name'

export const AuthStore = defineStore('auth-store', () => {
  const TOKEN_REF = ref(useCookie('authorization'))
  const USER_INFO = ref({}) as any
  const PERMISSIONS = ref([]) as any
  const ROLES = ref([]) as any
  const REFRESH_TOKEN_REF = ref(useCookie('refreshToken'))
  const REFRESH_TOKEN_GETTER = computed(() => REFRESH_TOKEN_REF.value)
  const TOKEN_GETTER = computed(() => TOKEN_REF.value || '')
  const USER_INFO_GETTER = computed(() => USER_INFO.value)

  function FN_SET_TOKEN(token: string) {
    TOKEN_REF.value = token
  }

  function FN_SET_REFRESH_TOKEN(refreshToken: string) {
    REFRESH_TOKEN_REF.value = refreshToken
  }

  function FN_LOGOUT() {
    TOKEN_REF.value = null
    REFRESH_TOKEN_REF.value = null
    USER_INFO.value = {}
    PERMISSIONS.value = []
    ROLES.value = []

    const { $toast } = useNuxtApp()
    const router = useRouter()

    $toast.success('Đăng xuất thành công')

    router.push({ name: ROUTER_NAMES.LOGIN })
  }

  function havePermission(permission: string | string[]) {
    if (Array.isArray(permission)) {
      return permission.every((p) => PERMISSIONS.value.includes(p))
    }
    return PERMISSIONS.value.includes(permission)
  }

  function haveRole(role: string | string[]) {
    if (Array.isArray(role)) {
      return role.every((p) => ROLES.value.includes(p))
    }
    return PERMISSIONS.value.includes(role)
  }

  function FN_REMOVE_TOKEN() {
    const authorization = useCookie('authorization')
    authorization.value = null
    const router = useRouter()
    router.push({ name: ROUTER_NAMES.LOGIN })
  }

  async function FN_GET_USER_INFO() {
    if (!TOKEN_GETTER.value) return

    const { data } = await getService(SERVICE_NAMES.Auth).getUserInfo({})
    USER_INFO.value = data
    PERMISSIONS.value = data.permissions
    ROLES.value = data.roles
  }

  return {
    TOKEN_GETTER,
    FN_SET_TOKEN,
    FN_LOGOUT,
    FN_REMOVE_TOKEN,
    REFRESH_TOKEN_GETTER,
    FN_SET_REFRESH_TOKEN,
    USER_INFO_GETTER,
    FN_GET_USER_INFO,
    havePermission,
    haveRole,
  }
})
