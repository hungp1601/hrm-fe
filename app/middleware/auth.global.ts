export default defineNuxtRouteMiddleware((to, from) => {
  const token: any = useCookie('authorization')

  if (!token._value) {
    if (to.path === '/') {
      return navigateTo('/auth/login')
    } else if (!to.path.startsWith('/auth')) {
      throw createError({ statusMessage: 'Unauthorized', statusCode: 401 })
    }
  }
})
