<template>
  <div class="w-full h-full">
    <div
      class="absolute right-[140px] top-[80px] w-[200px] h-[150px] z-50"
      @click="$router.push({ name: 'welcome' })"
    ></div>
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
        <source id="source" :src="chapter.video" type="video/mp4" />
      </video>
    </div>

    <!-- 這個只管動態 -->
    <GestureAction
      v-if="showActionComponent"
      :type="currentPause?.type"
      :message="currentPause?.message"
      @completed="onActionCompleted"
    />

    <Menu class="absolute bottom-0 left-0 w-full" @close="onClose" @open="onOpen"></Menu>
  </div>
</template>

<script setup>
import Menu from './menu/Index.vue'
import useMenu from './menu/useMenu'
import useIntro from './useIntro'
import { provide, inject } from 'vue'
import { useRoute } from 'vue-router'
import GestureAction from './_Action.vue'
const route = useRoute()
const isActive = inject('isActive')

const chapters = inject('chapters')
const chapter = chapters.find((x) => x.id == route.query.id)

const menu = useMenu()
provide('menu', menu)

const intro = useIntro(chapter.pauses)
const {
  videoPlayer,
  onTimeUpdate,
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
