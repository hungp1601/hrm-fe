import Swal from 'sweetalert2'

export default defineNuxtPlugin(() => {
  const swal: any = Swal
  return {
    provide: {
      swal,
    },
  }
})
