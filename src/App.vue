<template>
  <div
    @touchstart="clickEffect"
    class="flex relative w-[1920px] h-[1080px] overflow-hidden bg-black"
  >
    <transition name="fade" mode="out-in">
      <router-view v-slot="{ Component }" v-if="isActive">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.params.id" />
        </transition>
      </router-view>
      <Saver v-else class="fixed left-0 top-0" />
    </transition>
    <!-- <div class="fixed top-0 left-0 w-full h-screen opacity-0 pointer-events-none z-50"> -->
    <!--   <img class="h-full w-full" src="./temp/唐鼎-春城麗都工學館-版型20250402-ol_3.svg" alt="" /> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
import { provide, reactive } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import useLock from '@/hooks/useLock'
import Saver from '@/views/_Saver.vue'
import chapters from './chapters.js'

provide('chapters', chapters)

const router = useRouter()

const onTimeout = () => {
  router.push({ name: 'welcome' })
}
const state = reactive({ isFreezing: false, isEffecting: true })
provide('state', state)

const { isActive, trigger: triggerLock } = useLock(1000 * 60 * 3, onTimeout, onTimeout)
provide('isActive', isActive)
provide('triggerLock', triggerLock)

function clickEffect(e) {
  if (!state.isEffecting) return

  const isTouchEvent = e.type.startsWith('touch')
  // 獲取點擊或觸控的位置
  const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX
  const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY

  for (let i = 0; i < 3; i++) {
    const effect = document.createElement('div')
    effect.className = 'clickEffect'
    effect.style.left = clientX + 'px'
    effect.style.top = clientY + 'px'
    // 設定不同的動畫延遲，使得水波紋依序出現
    effect.style.animationDelay = `${i * 0.2}s`

    document.body.appendChild(effect)

    // 動畫結束後移除該物件
    effect.addEventListener('animationend', function () {
      effect.parentElement && effect.parentElement.removeChild(effect)
    })
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.clickEffect {
  position: fixed;
  background: #fff;
  border-radius: 50%;
  border: 0;
  z-index: 99999;
  width: 80px;
  height: 80px;
  pointer-events: none;
  animation: clickEffect 3s ease-out;
  transform: translateX(-50%) translateY(-50%) scale(0);
  opacity: 1;
}

@keyframes clickEffect {
  0% {
    opacity: 0.5;

    transform: translateX(-50%) translateY(-50%) scale(0);
  }
  100% {
    opacity: 0;

    transform: translateX(-50%) translateY(-50%) scale(2);
  }
}
</style>
