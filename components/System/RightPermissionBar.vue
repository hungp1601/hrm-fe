<template>
  <div class="flex flex-row gap-3">
    <el-input
      v-model="search"
      style="width: 240px"
      placeholder="Tìm kiếm nhanh"
      :prefix-icon="ElIconSearch"
      @change="$emit('searchUser', search)"
    />
    <el-button type="primary" :icon="ElIconPlus" @click="$emit('addUser')">
      Thêm mới
    </el-button>
  </div>
</template>

<script lang="ts" setup>
const search = ref('')
</script>

<style lang="scss" scoped></style>
