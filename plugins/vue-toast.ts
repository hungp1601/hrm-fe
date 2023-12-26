import { useToast } from 'vue-toast-notification'
const toast = useToast({
  // One of the options
  position: 'top',
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('toast', toast)
})
