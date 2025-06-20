import { ref, reactive, onMounted, computed } from 'vue'
export default (_pauses) => {
  if (!_pauses) {
    console.log('沒有資料')
  }

  let pauses
  // 參考影片播放器
  const videoPlayer = ref(null)
  const audioPlayer = ref(null)

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

  const onEnd = () => {
    console.log('end')
  }
  const resetPauses = () => {
    pauses = _pauses.map((x) => {
      return {
        ...x,
        active: false,
      }
    })
  }

  const reset = () => {
    showActionComponent.value = false
    currentPause.value = false
    resetPauses()
  }

  const jump = (idx) => {
    if (!videoPlayer.value) return
    videoPlayer.value.currentTime = pauses[idx].time
    pauses.forEach((x, i) => {
      if (i >= idx + 1) {
        x.active = false
      }
    })
    play()
  }

  const play = () => {
    if (!videoPlayer.value || showActionComponent.value) return

    videoPlayer.value.play()
  }

  const replay = () => {
    reset()
    videoPlayer.value.currentTime = 0
    videoPlayer.value.play()
    audio.replay()
  }
  const pause = () => {
    videoPlayer.value.pause()
  }
  const seek = (time) => {
    reset()
    pauses.forEach((x) => {
      if (x.time <= time) {
        x.active = true
      }
    })

    videoPlayer.value.currentTime = time
    play()
  }

  const video = {
    dom: videoPlayer,
    play,
    jump,
    replay,
    pause,
    seek,
  }
  const audio = {
    dom: audioPlayer,
    replay: () => {
      if (!audioPlayer.value) return
      audioPlayer.value.currentTime = 0
      audioPlayer.value.play()
    },
    play: () => {
      if (!audioPlayer.value) return
      audioPlayer.value.play()
    },
    pause: () => {
      if (!audioPlayer.value) return
      audioPlayer.value.pause()
    },
  }

  // 當互動動作完成後，關閉互動元件並繼續播放
  const onActionCompleted = () => {
    showActionComponent.value = false
    if (currentPause.value?.onCompleted) {
      currentPause.value.onCompleted(video, audio, pauses)
    } else {
      play()
    }
    currentPause.value = null
  }

  onMounted(() => {
    replay()
  })

  return {
    videoPlayer,
    audioPlayer,
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
    video,
    audio,
  }
}
