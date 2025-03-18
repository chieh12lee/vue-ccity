<template>
  <div class="w-full h-full">
    <div class="">
      <video
        ref="videoPlayer"
        autoplay
        loop
        muted
        disablePictureInPicture
        @timeupdate="onTimeUpdate"
        controlslist="nodownload"
      >
        <source id="source" src="@/assets/main.mp4" type="video/mp4" />
      </video>
    </div>
    <GestureAction
      v-if="showActionComponent"
      :type="currentPause?.type"
      :message="currentPause?.message"
      @completed="onActionCompleted"
    />

    <Menu class="absolute bottom-0 left-0" @close="onClose" @open="onOpen"></Menu>
  </div>
</template>

<script setup>
import Menu from './menu/Index.vue'
import useMenu from './menu/useMenu'
import useIntro from './useIntro'
import { provide } from 'vue'
import GestureAction from './_Action.vue'
const menu = useMenu()
provide('menu', menu)

const intro = useIntro()

const {
  videoPlayer,
  jump,
  onTimeUpdate,
  chapters,
  currentChapter,
  currentPause,
  showActionComponent,
  onActionCompleted,
  play,
  pause,
} = intro

provide('intro', intro)

const onClose = () => {
  play()
}
const onOpen = () => {
  pause()
}
</script>
