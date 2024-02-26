<template>
  <div class="overflow-x-hidden">
    <div class="page-header flex flex-row justify-between items-center">
      <div class="page-header__left flex flex-row">
        <nuxt-link class="flex justify-center items-center" to="/">
          <app-icon name="3x3" :size="32" />
        </nuxt-link>
        <slot></slot>
      </div>

      <div class="page-header__right">
        <avatar></avatar>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.page {
  &-header {
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid #e5e5e5;
    height: 56px;
    padding: 0 24px;
  }
}
</style>
