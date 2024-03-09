<template>
  <div class="flex flex-col gap-3 justify-center items-center h-full">
    <img
      class="w-1/2"
      src="../../assets/images/empty-user-permission.png"
      alt=""
    />
    <div class="headline-20 text-grey-300">
      Chưa có tài khoản nào được thêm vào...
    </div>
    <el-button
      class="w-fit"
      type="primary"
      :icon="ElIconPlus"
      @click="$emit('addUser')"
    >
      Thêm mới
    </el-button>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
