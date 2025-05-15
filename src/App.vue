<template>
  <div
    @touchstart="clickEffect"
    class="flex relative w-[1920px] h-[1080px] overflow-hidden bg-black"
  >
    <router-view v-slot="{ Component }" v-if="isActive" :key="$route.query">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
    <Saver v-else class="fixed left-0 top-0"></Saver>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import useLock from '@/hooks/useLock'
import Saver from '@/views/_Saver.vue'

import chapters from './chapters.js'
provide('chapters', chapters)

const router = useRouter()
const onTimeout = () => {
  router.push({ name: 'welcome' })
}

const { isActive } = useLock(1000 * 3000, onTimeout, onTimeout)
provide('isActive', isActive)

function clickEffect(e) {
  // 判斷事件類型是滑鼠點擊還是觸控
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
