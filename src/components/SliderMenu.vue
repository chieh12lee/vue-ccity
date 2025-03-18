<template>
  <div class="swiper swiper-container" ref="swiperRef">
    <div class="swiper-wrapper">
      <div class="swiper-slide" @click="update(0)"><img src="@/assets/menu-item.png" /></div>
      <div class="swiper-slide" @click="update(1)"><img src="@/assets/menu-item.png" /></div>
      <div class="swiper-slide" @click="update(0)"><img src="@/assets/menu-item.png" /></div>
      <div class="swiper-slide" @click="update(1)"><img src="@/assets/menu-item.png" /></div>
      <div class="swiper-slide" @click="update(0)"><img src="@/assets/menu-item.png" /></div>
      <div class="swiper-slide" @click="update(1)"><img src="@/assets/menu-item.png" /></div>
      <div class="swiper-slide" @click="update(0)"><img src="@/assets/menu-item.png" /></div>
      <div class="swiper-slide" @click="update(1)"><img src="@/assets/menu-item.png" /></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper } from 'swiper'
import 'swiper/css'
import { EffectCoverflow } from 'swiper/modules'

const emit = defineEmits(['update'])
const update = (idx) => {
  emit('update', idx)
}

const swiperRef = ref(null)
let swiper

// ,
onMounted(() => {
  swiper = new Swiper(swiperRef.value, {
    speed: 1000,
    loop: true,
    effect: 'coverflow',
    grabCursor: true,
    slidesPerView: 'auto',
    // loopAdditionalSlides: 8,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 140,
      depth: 200,
      modifier: 0.5,
      slideShadows: false,
    },

    modules: [EffectCoverflow],
  })
})
</script>
<style lang="scss">
.swiper-container {
  @apply w-full;
  background: #000;

  padding-top: 50px;
  padding-bottom: 50px;
  perspective-origin: 50% 113%;
}
.swiper-slide {
  width: 400px;
  height: 200px;
  overflow: hidden;
  img {
    @apply w-full h-full object-cover;
  }
}
</style>
