<template>
  <div class="w-full h-full">
    <div
      class="absolute right-[100px] top-[95px] w-[300px] z-50 flex flex-col items-center"
      :class="sketchitActive ? 'pointer-events-none' : ''"
    >
      <div class="cursor-pointer" @click="$router.push({ name: 'welcome' })">
        <img class="w-[154px]" src="@/assets/imgs/logo-s.svg" alt="" />
      </div>
      <div
        class="mt-[43px] py-[5px] px-3 border-y-2 border-[#c79f62] text-white text-[1.24rem] font-bold text-center"
        @click="replay"
      >
        {{ chapter.title }}
      </div>
    </div>

    <div class="">
      <video
        ref="videoPlayer"
        autoplay
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
    <Sketchit v-if="!menuActive" />
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import Menu from './menu/Index.vue'
import useMenu from './menu/useMenu'
import useIntro from './useIntro'

import useSketchit from '@/components/sketchit/useSketchit.js'
import Sketchit from '@/components/sketchit/Index.vue'
import { provide, inject } from 'vue'
import { useRoute } from 'vue-router'
import GestureAction from './_Action.vue'

const route = useRoute()
const state = inject('state')

const chapters = inject('chapters')
const chapter = chapters.find((x) => x.id == route.params.id)

const menu = useMenu()
provide('menu', menu)
const { active: menuActive } = menu

const sketchit = useSketchit({ domId: '#ex3' })
provide('sketchit', sketchit)
const { active: sketchitActive } = sketchit

const intro = useIntro(chapter.pauses)
const {
  videoPlayer,
  onTimeUpdate,
  currentPause,
  showActionComponent,
  onActionCompleted,
  play,
  pause,
  replay,
} = intro

provide('intro', intro)

const onClose = () => {
  play()
}
const onOpen = () => {
  pause()
}
</script>
