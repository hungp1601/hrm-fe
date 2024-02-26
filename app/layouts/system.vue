<template>
  <div class="overflow-x-hidden">
    <app-header>
      <span class="flex gap-3 items-center ml-7">
        <app-icon name="system" :size="36" />
        <span class="head-line-20">Hệ thống</span>
      </span>
    </app-header>

    <div class="page-system">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.page-system {
  height: calc(100vh - 56px);
}
</style>
