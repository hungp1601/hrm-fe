export default defineNuxtRouteMiddleware((to, from) => {
  const token: any = useCookie('authorization')

  const unathorizedPages = ['/login', '/forgot-password']
  if (!token._value) {
    if (to.path === '/') {
      return navigateTo('/login')
    } else if (!unathorizedPages.includes(to.path)) {
      throw createError({ statusMessage: 'Unauthorized', statusCode: 401 })
    }
  } else if (unathorizedPages.includes(to.path)) {
    return navigateTo('/')
  }
})
