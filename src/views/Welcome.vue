<template>
  <div class="relative w-full h-full bg-primary">
    <div class="absolute inset-0 p-[30px]">
      <img ref="bg" class="w-full" src="@/assets/imgs/bg-pattern.png" alt="" />
    </div>
    <div
      class="absolute right-[168px] top-[95px] w-[148px] h-[150px] z-40"
      @click="$router.push({ name: 'welcome' })"
    >
      <img src="@/assets/imgs/logo-s.svg" alt="" />
    </div>
    <RotationMenu
      @clic="(id) => $router.push({ name: 'main', params: { id: id } })"
      :rows="chapters"
      :radius="650"
      :img-width="300"
      :img-height="180"
    />
  </div>
</template>

<script setup>
import RotationMenu from '@/components/RotationMenu.vue'
import { inject } from 'vue'
const chapters = inject('chapters')
</script>
