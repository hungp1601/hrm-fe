<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },

  color: {
    type: String,
  },

  size: {
    type: Number,
    default: 16,
  },
})

const type = computed(() => {
  if (props.name.startsWith('bi')) {
    return 'bootstrap'
  }

  if (props.name.startsWith('el-icon')) {
    return 'element'
  }

  if (props.name.startsWith('img')) {
    return 'image'
  }
  // this.$log
  return 'svg'
})
</script>

<template>
  <BootstrapIcon v-if="type === 'bootstrap'" :name="name.replace('bi-', '')" />
  <!-- <i v-else-if="type === 'element'" :class="name"></i> -->
  <svg-icon v-else-if="type === 'svg'" :name="name" />
</template>
