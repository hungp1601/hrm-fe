<script setup>
const props = defineProps({
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

function parseSize(value) {
  if (/px$|rem$|em$/.test(value)) {
    return value
  }
  return value + 'px'
}

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
  return 'svg'
})

const _size = computed(() => {
  if (!props.size) return {}
  switch (type.value) {
    case 'bootstrap':
      return {
        fontSize: parseSize(props.size),
      }
    case 'image':
      return {
        width: parseSize(props.size),
        height: parseSize(props.size),
      }
    case 'svg':
      return {
        width: parseSize(props.size),
        height: parseSize(props.size),
      }
    default:
      return {}
  }
})
</script>

<template>
  <BootstrapIcon
    v-if="type === 'bootstrap'"
    :name="name.replace('bi-', '')"
    :style="{
      ..._size,
    }"
    v-on="$listeners"
  />
  <img
    v-if="type === 'image'"
    class="app-icon"
    :src="
      require('../../app/assets/icons/' + name.replace('img-', '') + '.png')
    "
    :style="{
      ..._size,
    }"
    v-on="$listeners"
  />
  <svg-icon
    v-else-if="type === 'svg'"
    :name="name"
    :style="{
      ..._size,
    }"
    v-on="$listeners"
  />
  <component
    :is="name.replace('el-icon-', '')"
    v-else-if="type === 'element'"
    v-on="$listeners"
  />
</template>
