<template>
  <div
    @touchstart="clickEffect"
    class="flex relative w-[1920px] h-[1080px] overflow-hidden bg-black"
  >
    <RouterView />
  </div>
</template>

<script setup>
import { useRouter, RouterView } from 'vue-router'
import { useInactivityRedirect } from '@/hooks/useInactivityRedirect'
const router = useRouter()
const onTimeout = () => {
  router.push({ name: 'welcome' })
}
const { startTimer, stopTimer, resetTimer } = useInactivityRedirect(180000, onTimeout)
startTimer()

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
<style lang="scss">
.clickEffect {
  position: fixed;
  background: #fff;
  border-radius: 50%;
  border: 0;
  z-index: 99999;
  width: 80px;
  height: 80px;
  pointer-events: none; // 防止阻擋用戶操作
  animation: clickEffect 3s ease-out; // 縮短動畫時間
  transform: translateX(-50%) translateY(-50%) scale(0); // 初始狀態為最小
  opacity: 1; // 初始狀態為不透明
}

@keyframes clickEffect {
  0% {
    opacity: 0.5;

    transform: translateX(-50%) translateY(-50%) scale(0); // 初始狀態為最小
  }
  100% {
    opacity: 0;

    transform: translateX(-50%) translateY(-50%) scale(2); // 初始狀態為最小
  }
}
</style>
