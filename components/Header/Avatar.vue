<template>
  <div class="avatar">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <app-avatar :size="36" :text="user.username" :src="user.avatar" />
      </span>
      <template #dropdown>
        <el-dropdown-menu
          class="py-5"
          style="
            width: 252px;
            padding-top: 20px !important;
            padding-bottom: 20px !important;
          "
        >
          <div class="flex flex-col justify-center items-center gap-2">
            <app-avatar :size="64" :text="user.username" :src="user.avatar" />
            <div class="body-medium-16 text-neutral-900 text-center">
              {{ user.username }}
              <div class="text-grey-300 body-regular-12">{{ user.email }}</div>
            </div>
          </div>
          <el-divider style="margin-top: 16px; margin-bottom: 0px" />
          <el-dropdown-item
            class="avatar-dropdown-item text-neutral-700 body-regular-14"
            @click="handleProfile"
          >
            <app-icon class="mr-2" name="profile-black" :size="24"></app-icon>
            Xem thông tin cá nhân
          </el-dropdown-item>

          <el-dropdown-item
            class="avatar-dropdown-item text-neutral-700 body-regular-14"
            @click="handleChangePassword"
          >
            <app-icon class="mr-2" name="change-password" :size="24"></app-icon>
            Đổi mật khẩu
          </el-dropdown-item>

          <el-dropdown-item
            class="avatar-dropdown-item text-neutral-700 body-regular-14"
            @click="handleLogout"
          >
            <app-icon class="mr-2" name="logout" :size="24"></app-icon>
            Đăng xuất
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { AuthStore } from '@/stores'
import { ROUTER_NAMES } from '~/app/config/router.name'

const user = computed(() => AuthStore().USER_INFO_GETTER)

const handleLogout = () => {
  AuthStore().FN_LOGOUT()
}

const handleChangePassword = () => {
  navigateTo({ name: '' })
}

const handleProfile = () => {
  navigateTo({ name: ROUTER_NAMES.PROFILE })
}
</script>

<style lang="scss">
.avatar {
  &-dropdown-item {
    height: 40px !important;
    padding: 10px 16px;
    color: #374151;
  }
}
</style>
