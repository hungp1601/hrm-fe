<template>
  <div>
    <app-editor :content="content" @update="handleUpdateContentDebounce" />
    <app-button icon="bi-plus" type="primary" loading>123</app-button>
    <el-button type="primary" loading>Loading</el-button>
    <app-avatar text="hung" :size="32"></app-avatar>
  </div>
</template>

<script setup>
const content = ref('123')

const handleUpdateContent = (content) => {
  console.log(content)
}

const handleUpdateContentDebounce = debounce(handleUpdateContent, 1000)
</script>

<style lang="scss" scoped></style>
