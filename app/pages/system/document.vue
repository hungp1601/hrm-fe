<template>
  <div class="system-page w-full">
    <div
      class="system-page__header flex flex-row justify-between flex-wrap w-full items-center"
    >
      <div class="system-page__header-left headline-20 text-black">
        Phân quyền
      </div>
      <div class="system-page__header-right"></div>
    </div>
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
  background: #e6edf9;

  &__header {
    min-height: 56px;
  }
}
</style>
