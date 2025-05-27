<template>
  <div class="w-full h-full">
    <RotationMenu
      @clic="(id) => $router.push({ name: 'main', params: { id: id } })"
      :rows="chapters"
      :radius="730"
      :item-width="240"
      :item-height="135"
    />
  </div>
</template>

<script setup>
import RotationMenu from '@/components/RotationMenu.vue'
import { inject } from 'vue'
const chapters = inject('chapters')
</script>
