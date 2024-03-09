<template>
  <div class="flex flex-row gap-2 items-center">
    <app-icon :name="status ? 'active-dot' : 'inactive-dot'"></app-icon>
    <div>{{ status ? 'đang hoạt động' : 'đã khóa' }}</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  status: boolean
}>()
</script>

<style lang="scss" scoped></style>
