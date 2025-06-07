import { ref, reactive, onMounted, computed } from 'vue'
export default (_pauses) => {
  if (!_pauses) {
    console.log('沒有資料')
  }

  let pauses
  // 參考影片播放器
  const videoPlayer = ref(null)

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
        return videoPlayer.value.currentTime - p.time >= -0.1 && !p.active
      })

      if (pausePoint && !currentPause.value) {
        pausePoint.active = true
        pause()
        currentPause.value = { ...pausePoint }
        showActionComponent.value = true
      }
    }
  }

  // 當互動動作完成後，關閉互動元件並繼續播放
  function onActionCompleted() {
    console.log('done')
    showActionComponent.value = false
    currentPause.value = null
    if (videoPlayer.value) {
      play()
    }
  }
  const onEnd = () => {
    console.log('end')
  }
  const reset = () => {
    showActionComponent.value = false
    currentPause.value = false
    pauses = _pauses.map((x) => {
      return {
        ...x,
        active: false,
      }
    })
  }

  const play = () => {
    if (!videoPlayer.value) return
    videoPlayer.value.play()
  }

  const replay = () => {
    reset()
    videoPlayer.value.currentTime = 0
    videoPlayer.value.play()
  }
  const pause = () => {
    videoPlayer.value.pause()
  }

  onMounted(() => {
    replay()
  })

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
    onEnd,
  }
}
