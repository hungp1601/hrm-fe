export default defineNuxtRouteMiddleware((to, from) => {
  const token: any = useCookie('authorization')

  console.log(123, to)

  if (!token._value) {
    if (to.path !== '/login') {
      return navigateTo('/login')
    }
  } else if (to.path === '/login') {
    return navigateTo('/')
  }
})
