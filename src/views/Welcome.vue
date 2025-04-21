<template>
  <div class="w-full h-full">
    <RotationMenu :rows="rows" :radius="700" :item-width="240" :item-height="135" />
  </div>
</template>

<script setup>
import RotationMenu from '@/components/RotationMenu.vue'
import { ref } from 'vue'

import MenuData from '@/components/MenuData.js'
const rows = ref([...MenuData])
</script>
