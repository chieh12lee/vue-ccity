import { useTimeoutFn } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'

export default (count = 3 * 60 * 1000, onTimeout = () => {}) => {
  const isActive = ref(false) // 用於標記計時器是否啟動

  // 預設的超時回調（如果未提供則導向 `/home`）
  const timeoutCallback = () => {
    stopTimer()
    onTimeout()
  }

  // 計時器控制
  const { start, stop } = useTimeoutFn(timeoutCallback, count, { immediate: false })

  // 重置計時器
  const resetTimer = (e) => {
    if (e.target.closest('#welcome-btn')) {
      return // 不做任何事
    }
    setTimeout(() => {
      isActive.value = true
      stop()
      start()
    }, 500)
  }

  // 手動啟動計時器
  const startTimer = () => {
    isReset = true
    if (!isActive.value) {
      start()
      isActive.value = true
    }
  }

  // 手動停止計時器
  const stopTimer = () => {
    stop()
    isActive.value = false
  }
  const trigger = () => {
    stopTimer()
  }

  // 監聽觸控事件
  onMounted(() => {
    window.addEventListener('touchstart', resetTimer)
    window.addEventListener('click', resetTimer)
    timeoutCallback()
  })

  // 移除事件監聽
  onUnmounted(() => {
    window.removeEventListener('touchstart', resetTimer)
    stopTimer()
  })

  return { startTimer, stopTimer, resetTimer, isActive, trigger }
}
