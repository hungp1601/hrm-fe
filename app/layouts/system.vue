<template>
  <div class="layout-system">
    <app-header>
      <nuxt-link to="/" class="flex gap-3 items-center ml-7">
        <app-icon name="system" :size="36" />
        <span class="headline-20">Hệ thống</span>
      </nuxt-link>
    </app-header>

    <div class="page-system flex flex-row">
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
    title: 'Phân quyền',
    icon: 'permission',
    name: ROUTER_NAMES.SYSTEM,
  },
  {
    title: 'Tài liệu',
    icon: 'document',
    name: ROUTER_NAMES.SYSTEM_DOCUMENT,
  },
  {
    title: 'Cài đặt',
    icon: 'setting',
    name: ROUTER_NAMES.SYSTEM_SETTING,
  },
  {
    title: 'Lịch sử truy cập',
    icon: 'history',
    name: ROUTER_NAMES.SYSTEM_HISTORY,
  },
])
</script>

<style lang="scss" scoped>
.page-system {
  height: calc(100vh - 56px);
}
</style>
