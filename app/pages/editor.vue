<template>
  <div>
    <app-editor :content="content" @update="handleUpdateContentDebounce" />
  </div>
</template>

<script setup>
import { debounce } from '@/utils'
// await navigateTo('/login')

const content = ref('123')

const handleUpdateContent = (content) => {
  console.log(content)
}

const handleUpdateContentDebounce = debounce(handleUpdateContent, 1000)
</script>

<style lang="scss" scoped></style>
