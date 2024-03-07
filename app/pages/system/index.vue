<template>
  <div class="system-page w-full">
    <div
      class="system-page__header flex flex-row justify-between flex-wrap w-full items-center gap-3"
    >
      <div class="system-page__header-left headline-20 text-black">
        Phân quyền
      </div>
      <div class="system-page__header-right">
        <RightPermissionBar />
      </div>
    </div>
    <div class="system-page__content w-full bg-white"></div>
  </div>
</template>

<script lang="ts" setup>
import { ROUTER_NAMES } from '../../config/router.name'
import { getService, SERVICE_NAMES } from '@/api'

definePageMeta({
  layout: 'system',
})
</script>

<style lang="scss" scoped>
.system-page {
  padding: 0 24px 8px 24px;
  background: #f2f4f7;
  &__header {
    min-height: 56px;
  }

  &__content {
    height: calc(100vh - 112px);
  }
}
</style>
