<template>
  <div class="w-full h-full">
    <RotationMenu :rows="rows" :radius="700" :item-width="240" :item-height="135" />
  </div>
</template>

<script setup>
import RotationMenu from '@/components/RotationMenu.vue'
import { ref } from 'vue'
const rows = ref([
  {
    id: 1,
    title: 'aaa',
    thumbnail: new URL('@/assets/menu-item.png', import.meta.url).href,
  },

  {
    id: 2,
    title: 'aaa',
    thumbnail: new URL('@/assets/menu-item.png', import.meta.url).href,
  },
  {
    id: 3,
    title: 'aaa',
    thumbnail: new URL('@/assets/menu-item.png', import.meta.url).href,
  },
  {
    id: 4,
    title: 'aaa',
    thumbnail: new URL('@/assets/menu-item.png', import.meta.url).href,
  },
  {
    id: 5,
    title: 'aaa',
    thumbnail: new URL('@/assets/menu-item.png', import.meta.url).href,
  },
  {
    id: 6,
    title: 'aaa',
    thumbnail: new URL('@/assets/menu-item.png', import.meta.url).href,
  },

  {
    id: 7,
    title: 'aaa',
    thumbnail: new URL('@/assets/menu-item.png', import.meta.url).href,
  },
  {
    id: 8,
    title: 'aaa',
    thumbnail: new URL('@/assets/menu-item.png', import.meta.url).href,
  },
])
</script>
