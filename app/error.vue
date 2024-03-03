<script setup lang="ts">
import { ROUTER_NAMES } from './config/router.name'

const props = defineProps({
  error: Object,
})

const router = useRouter()

const handleBack = () => {
  router.push({ name: ROUTER_NAMES.HOME })
}
</script>

<template>
  <div
    class="bg-[#DBAEFF] h-screen w-screen flex flex-col justify-center items-center gap-12"
  >
    <div class="flex flex-col justify-center items-center gap-2">
      <h2 class="text-6xl black font-bold">{{ error?.statusCode }}</h2>
      <p>{{ error?.statusMessage }}</p>
    </div>
    <img src="@/assets/images/error.png" alt="" srcset="" />
    <button
      class="font-hel text-2xl text-black gap-2 mb-1 flex items-center"
      style="border-bottom: 2px solid black"
      @click="handleBack"
    >
      <app-icon :size="36" name="return-circle"></app-icon>
      <div>Go home</div>
    </button>
  </div>
</template>
