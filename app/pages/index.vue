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

      <div
        class="dashboard-content flex flex-row gap-5 items-center justify-center flex-wrap"
      >
        <div
          class="dashboard flex flex-row gap-5 items-center justify-start flex-wrap"
        >
          <dash-board-item :items="pageCards" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ROUTER_NAMES } from '../config/router.name'
import { getService, SERVICE_NAMES } from '@/api'

const pageCards = ref([
  {
    title: 'Hệ thống',
    icon: 'system',
    name: ROUTER_NAMES.SYSTEM,
  },
  {
    title: 'Nhân sự',
    icon: 'employee',
    name: ROUTER_NAMES.EMPLOYEE,
  },
  {
    title: 'Chấm công',
    icon: 'attendance',
    name: ROUTER_NAMES.ATTENDANCE,
  },
  {
    title: 'Tiền lương',
    icon: 'salary',
    name: ROUTER_NAMES.SALARY,
  },
  {
    title: 'Quản lí dự án',
    icon: 'project',
    name: ROUTER_NAMES.PROJECT,
  },
  {
    title: 'Công việc',
    icon: 'task',
    name: ROUTER_NAMES.TASK,
  },

  {
    title: 'Cá nhân',
    icon: 'profile',
    name: ROUTER_NAMES.PROFILE,
  },
])

const uploadFile = () => {
  const input = document.createElement('input')
  input.type = 'file'

  input.click()
  input.onchange = async (e: any) => {
    const file = e?.target?.files[0]

    if (file) {
      const res = await getService(SERVICE_NAMES.Upload).upload(file)
    }
  }
}
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
    .dashboard {
      width: 100%;
      max-width: 572px;
    }
  }
}
</style>
