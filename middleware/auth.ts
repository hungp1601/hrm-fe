export default defineNuxtRouteMiddleware((to, from) => {
  const token: any = useCookie('authorization')

  if (!token._value) {
    if (to.path !== '/auth/login') {
      return navigateTo('/auth/login')
    }
  } else if (to.path === '/auth/login') {
    return navigateTo('/')
  }
})
