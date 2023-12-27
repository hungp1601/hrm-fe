<script lang="ts" setup></script>

<template>
  <div class="w-screen h-screen"></div>
</template>

<style lang="scss">
.login-page {
  gap: 200px;

  .login-form {
    width: 360px;

    &__input {
      .el-input__wrapper {
        border-radius: 8px;
        height: 56px;
        background: #eef4ff;
      }
    }

    &__submit {
      height: 56px;
      border-radius: 8px;
    }
  }
}
</style>
