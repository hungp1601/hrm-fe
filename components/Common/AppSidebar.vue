<template>
  <div
    class="h-full sidebar"
    :class="{
      open: isOpen,
      close: !isOpen,
    }"
  >
    <div
      v-for="item in items"
      :key="item?.title"
      class="sidebar-item"
      :class="{
        active: selected === item?.name,
      }"
      @click="handleClick(item)"
    >
      <el-tooltip class="box-item" :content="item?.title" placement="right">
        <app-icon v-if="!isOpen" :name="item?.icon" :size="24"></app-icon>
      </el-tooltip>

      <app-icon v-if="isOpen" :name="item?.icon" :size="24"></app-icon>
      <div v-if="isOpen" class="ml-4">{{ item?.title }}</div>
    </div>
  </div>
  <slot></slot>
</template>

<script setup lang="ts">
const router = useRouter()
const { isDesktop } = useAwesomeScreen() || { isDesktop: false }

const isOpen = reactive(isDesktop)

const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },

  selected: {
    type: String,
    required: true,
  },
})

const handleClick = (item: any) => {
  if (item?.name === props.selected) return
  if (item?.name) {
    router.push({ name: item?.name })
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 36px 8px;
  border-right: 1px solid #e5e5e5;
  transition: width 0.3s ease-in-out;

  &.open {
    width: 256px;
  }

  &.close {
    width: 64px;
  }

  &-item {
    border: 1px solid transparent;
    border-radius: 4px;
    padding-left: 8px;
    display: flex;
    align-items: center;
    height: 48px;
    flex-direction: row;
    cursor: pointer;

    &.active {
      background-color: #d1e5ff !important;
    }

    &:hover {
      background-color: #d1e5ff5c;
    }
  }
}
</style>
