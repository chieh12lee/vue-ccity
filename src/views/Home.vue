<template>
  <div class="w-full h-full">
    <RotationMenu :images="rows" :radius="700" :item-width="240" :item-height="135" />
  </div>
</template>

<script setup>
import RotationMenu from '@/components/RotationMenu.vue'
import { ref } from 'vue'
const rows = ref([
  new URL('@/assets/menu-item.png', import.meta.url).href,
  new URL('@/assets/menu-item.png', import.meta.url).href,
  new URL('@/assets/menu-item.png', import.meta.url).href,
  new URL('@/assets/menu-item.png', import.meta.url).href,
  new URL('@/assets/menu-item.png', import.meta.url).href,
  new URL('@/assets/menu-item.png', import.meta.url).href,
  new URL('@/assets/menu-item.png', import.meta.url).href,
  new URL('@/assets/menu-item.png', import.meta.url).href,
])
</script>
