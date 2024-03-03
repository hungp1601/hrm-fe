<template>
  <div class="employee-page w-full">
    <div
      class="employee-page__header flex flex-row justify-between flex-wrap w-full items-center"
    >
      <div class="employee-page__header-left headline-20 text-black">
        Phân quyền
      </div>
      <div class="employee-page__header-right"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ROUTER_NAMES } from '../../config/router.name'
import { getService, SERVICE_NAMES } from '@/api'

definePageMeta({
  layout: 'employee',
})
</script>

<style lang="scss" scoped>
.employee-page {
  padding: 0 24px 8px 24px;
  background: #cccccc;

  &__header {
    min-height: 56px;
  }
}
</style>
