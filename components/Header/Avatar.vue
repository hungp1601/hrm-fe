<template>
  <div class="avatar">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <app-avatar :size="36" :text="user.username" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { AuthStore } from '@/stores'

const user = computed(() => AuthStore().USER_INFO_GETTER)

const handleLogout = () => {
  AuthStore().FN_LOGOUT()
}
</script>

<style scoped></style>
