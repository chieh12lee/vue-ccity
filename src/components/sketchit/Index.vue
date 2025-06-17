<template>
  <div class="">
    <div class="fixed right-0 top-0 z-50 h-full flex flex-col">
      <div class="h-[1010px] h-full w-[85px]">
        <div v-if="active" class="mt-[165px]">
          <img class="absolute inset-0 w-full h-full" src="./imgs/toolbar.png" alt="" />
          <div class="relative h-[200px] w-full flex flex-col items-center justify-between">
            <div v-for="(size, i) in [25, 20, 15, 10, 5]">
              <div
                data-control="#ex3"
                :data-width="size"
                class="bg-white rounded-full"
                :style="{ width: size + 'px', height: size + 'px' }"
              ></div>
            </div>
          </div>
          <div class="relative flex flex-col items-center space-y-6 mt-12">
            <div class="icon opacity-50" data-control="#ex3" data-tool="pen">
              <img src="./imgs/icon_pencil.png" width="25" height="50" />
            </div>
            <div class="icon opacity-50" data-control="#ex3" data-tool="eraser">
              <img src="./imgs/icon_eraser.png" />
            </div>

            <!-- <div data-control="#ex3" data-options="clear"><span><i class="fa fa-trash-o fa-3x"></i></span></div> -->
            <div class="icon" data-control="#ex3" data-options="undo">
              <img src="./imgs/icon_undo.png" width="34" height="34" />
            </div>
            <div class="icon" data-control="#ex3" data-options="redo">
              <img src="./imgs/icon_redo.png" width="34" height="34" />
            </div>
          </div>
          <div class="relative flex flex-col items-center space-y-6 mt-8">
            <div
              v-for="color in ['#d50011', '#f9df00', '#0691d7', '#8aaa1b', '#fdfcf2']"
              data-control="#ex3"
              :data-color="color"
              class="w-[30px] h-[30px] rounded-full"
            >
              <div class="w-full h-full rounded-full" :style="'background-color:' + color"></div>
            </div>
          </div>
        </div>
      </div>
      <div @click="toggle" class="relative">
        <img v-if="!active" src="./imgs/toolbar_open.png" alt="" />
        <img v-else src="./imgs/toolbar_close.png" alt="" />
      </div>
    </div>

    <div v-if="active" id="ex3" class="w-full h-full fixed inset-0"></div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const { toggle: _toggle, active } = inject('sketchit')
const state = inject('state')
const intro = inject('intro')
const toggle = () => {
  state.isEffecting = !state.isEffecting
  _toggle()
  if (active.value) {
    intro.pause()
  } else {
    intro.play()
  }
}
</script>
<style scoped>
@import 'tailwindcss';
.icon {
  @apply rounded-full w-[50px] h-[50px] p-2 aspect-square flex justify-center;
  img {
    @apply h-full;
  }
  &.current {
    @apply outline-offset-[0px];
    @apply opacity-100;
  }
}

.current {
  @apply outline-offset-[6px] outline-solid outline-2 outline-white;
}
</style>
