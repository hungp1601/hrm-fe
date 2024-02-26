<script lang="ts" setup>
const router = useRouter()

const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
})

const onClickDashboard = (name: string) => {
  router.push({ name })
}
</script>

<template>
  <div
    v-for="item in items"
    :key="item.title"
    class="dashboard-item cursor-pointer"
    @click="onClickDashboard(item.name)"
  >
    <app-icon
      class="dashboard-item__title"
      :name="item.icon"
      :size="56"
    ></app-icon>
    <div class="dashboard-item__title">{{ item.title }}</div>
  </div>
</template>

<style lang="scss">
.dashboard-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #fff;
  border-radius: 8px;
  height: 128px;
  width: 128px;

  &:hover {
    box-shadow: 0px 2px 20px 0px #2684ff;
  }

  &__title {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    letter-spacing: 0.5px;
  }
}
</style>
