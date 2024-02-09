<template>
  <div class="dashboard-page w-screen h-screen">
    <div class="w-full h-full dashboard-layer">
      <div class="dashboard-header flex flex-row justify-between items-center">
        <div class="dashboard-header__left">
          <nuxt-link to="/">
            <app-icon name="hrm-icon" :size="80" />
          </nuxt-link>
        </div>

        <div class="dashboard-header__right">
          <avatar></avatar>
        </div>
      </div>

      <div class="dashboard-content flex flex-row"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ROUTER_NAMES } from '../config/router.name'

const pageCard = ref([
  {
    title: 'Hệ thống',
    icon: 'system',
    name: ROUTER_NAMES.SYSTEM,
  },
  {
    title: 'Nhân sự',
    icon: 'employee',
    link: ROUTER_NAMES.EMPLOYEE,
  },
  {
    title: 'Attendance',
    icon: 'attendance-icon',
    link: '/attendance',
  },
])
</script>

<style lang="scss" scoped>
.dashboard-page {
  background-color: #b3d4ff;
  .dashboard-layer {
    background: url('../../assets//images/dashboard-bg.png') no-repeat center
      center;
  }
  .dashboard-header {
    height: 85px;
    padding: 0 36px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .dashboard-content {
    height: calc(100% - 85px);
    width: 100%;
  }
}
</style>
