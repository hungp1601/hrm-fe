<template>
  <div>
    <app-header>
      <nuxt-link to="/" class="flex gap-3 items-center ml-7">
        <app-icon name="employee" :size="36" />
        <span class="headline-20">Nhân sự</span>
      </nuxt-link>
    </app-header>

    <div class="page-employee flex flex-row">
      <app-sidebar :items="items" :selected="currentRouteName"></app-sidebar>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ROUTER_NAMES } from '../config/router.name'

const router = useRouter()

const currentRouteName = computed(() => {
  return router?.currentRoute?.value?.name
})

const items = reactive([
  {
    title: 'Hồ sơ',
    icon: 'profile',
    name: ROUTER_NAMES.EMPLOYEE,
  },
  {
    title: 'Hợp đồng',
    icon: 'contract',
    name: ROUTER_NAMES.EMPLOYEE_CONTRACT,
  },
  {
    title: 'Báo cáo',
    icon: 'report',
    name: ROUTER_NAMES.EMPLOYEE_REPORT,
  },
])
</script>

<style lang="scss" scoped>
.page-employee {
  height: calc(100vh - 56px);
}
</style>
