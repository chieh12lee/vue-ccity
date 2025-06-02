import { ref, reactive, onMounted, computed } from 'vue'
export default (pauses) => {
  if (!pauses) {
    console.log('沒有資料')
  }
  // 參考影片播放器
  const videoPlayer = ref(null)

  // 定義章節與暫停點資料
  // const chapters = reactive([
  //   {
  //     id: 1,
  //     start: 0,
  //     end: 60,
  //     pauses: [
  //       { time: 8, type: 'doubleClick', message: '請雙擊畫面繼續' },
  //       { time: 14, type: 'swipe', message: '請向左滑動繼續' },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     start: 60,
  //     end: 120,
  //     pauses: [{ time: 90, type: 'doubleClick', message: '請雙擊畫面繼續' }],
  //   },

  //   {
  //     id: 3,
  //     start: 90,
  //     end: 150,
  //     pauses: [{ time: 115, type: 'doubleClick', message: '請雙擊畫面繼續' }],
  //   },
  // ])

  // 當前章節、暫停點與互動元件顯示狀態
  // const currentChapter = ref(null)

  // const currentChapter = computed(() => {
  //   return chapters.find(
  //     (chapter) => currentTime.value >= chapter.start && currentTime.value < chapter.end,
  //   )
  // })

  const currentPause = ref(null)
  const showActionComponent = ref(false)

  const currentTime = ref(0)

  // 每次影片時間更新時進行檢查
  function onTimeUpdate() {
    if (!videoPlayer.value) return
    currentTime.value = videoPlayer.value.currentTime
    if (videoPlayer.value && pauses) {
      const pausePoint = pauses.find((p) => {
        // 加入小範圍判斷避免漏掉暫停點
        return Math.abs(videoPlayer.value.currentTime - p.time) < 0.1
      })

      if (pausePoint && !currentPause.value) {
        pause()
        currentPause.value = pausePoint
        showActionComponent.value = true
      }
    }
  }

  // 當互動動作完成後，關閉互動元件並繼續播放
  function onActionCompleted() {
    showActionComponent.value = false
    currentPause.value = null
    if (videoPlayer.value) {
      play()
    }
  }

  const play = () => {
    if (currentPause.value) return
    videoPlayer.value.play()
  }

  const replay = () => {
    videoPlayer.value.currentTime = 0
    videoPlayer.value.play()
  }
  const pause = () => {
    videoPlayer.value.pause()
  }

  return {
    videoPlayer,
    onTimeUpdate,
    onActionCompleted,
    // chapters,
    // currentChapter,
    currentPause,
    showActionComponent,
    play,
    pause,
    replay,
  }
}
