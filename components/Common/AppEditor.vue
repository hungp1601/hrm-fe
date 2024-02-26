<template>
  <ClientOnly>
    <quill-editor
      ref="quillEditor"
      :theme="theme"
      :toolbar="toolbar"
      :content="content"
      :options="options"
      :content-type="contentType"
      :read-only="readonly"
      @update:content="onEditorChange($event)"
    />
  </ClientOnly>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.core.css' // import styles
import '@vueup/vue-quill/dist/vue-quill.bubble.css' // for bubble theme

const props = defineProps({
  content: {
    type: String,
    required: true,
  },

  options: {
    type: Object,
  },

  toolbar: {
    type: String,
    default: 'full',
  },

  readonly: {
    type: Boolean,
    default: false,
  },

  theme: {
    type: String,
    default: 'snow',
  },

  contentType: {
    type: String,
    default: 'html',
  },

  placeholder: {
    type: String,
    placeholder: 'Viết gì đó...',
  },
})

const emit = defineEmits(['update'])
const firstEmit = ref(true)

const onEditorChange = (content) => {
  if (firstEmit.value && content) {
    firstEmit.value = false
    return
  }

  emit('update', content)
}
</script>

<style lang="scss" scoped></style>
