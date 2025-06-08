<template>
  <carousel-3d
    :perspective="0"
    :space="350"
    :display="9"
    :onMainSlideClick="update"
    :start-index="Number($route.params.id) - 1"
  >
    <slide v-for="(slide, i) in chapters" :index="i">
      <div>
        <img :src="slide.thumbnail" alt="" />
      </div>
    </slide>
  </carousel-3d>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { Carousel3d, Slide } from '@nanoandrew4/vue3-carousel-3d'

const chapters = inject('chapters')
const emit = defineEmits(['update'])
const update = (slide) => {
  emit('update', chapters[slide.index]?.id)
}

onMounted(() => {})
</script>
<style>
.carousel-3d-container {
  margin-bottom: -240px !important;
  padding-bottom: 600px;

  perspective-origin: 50% 180%;
  perspective: 2000px;
  .carousel-3d-slide {
    &.current {
      transform: translateY(120px) !important;
    }
    background: transparent;
    /* perspective-origin: 50% 100%; */
    /* perspective: 1800px !important; */
  }
}
</style>
