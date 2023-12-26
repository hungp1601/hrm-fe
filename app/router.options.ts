import type { RouterConfig } from '@nuxt/schema'
import { ROUTER_NAMES } from './config/router.name'

function localImport(page: String) {
  return import(`./pages/${page}`).then((r) => r.default || r)
}

export default <RouterConfig>{
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: ROUTER_NAMES.HOME,
      path: '/',
      component: localImport('index'),
    },
    {
      name: ROUTER_NAMES.LOGIN,
      path: '/login',
      component: localImport('login'),
    },
    {
      name: ROUTER_NAMES.FORGOT_PASSWORD,
      path: '/forgot-password',
      component: localImport('login'),
    },
  ],
}
