<template>
  <div class="h-full w-full bg-primary overflow-hidden pointer-event-auto">
    <div
      class="absolute top-[40px] left-[30px] inline-flex flex w-[1860px] h-[960px]"
      ref="bgPattern"
    >
      <img ref="bgL" class="" src="@/assets/imgs/bg-pattern-l.png" alt="" />
      <img ref="bgR" class="" src="@/assets/imgs/bg-pattern-r.png" alt="" />
    </div>
    <div class="relative flex flex-col items-center [&>img]:block">
      <div class="flex flex-col items-center w-[469px] relative mt-[50px]">
        <!-- <img class="opacity-0" ref="building" src="@/assets/imgs/building.png" alt="" /> -->
        <video
          ref="building"
          src="@/assets/building.webm"
          muted
          loop
          playsinline
          class="h-[497px] w-auto opacity-0"
        ></video>
        <div
          class="absolute bottom-[48px] h-[2px] bg-[#ffffff] origin-center scale-x-0 w-full"
          ref="orangeLine"
        ></div>

        <div class="flex justify-between w-[604px] absolute bottom-[200px]">
          <img class="opacity-0" ref="textCharming" src="@/assets/imgs/text-charming.svg" alt="" />
          <img
            class="opacity-0"
            ref="textCityscape"
            src="@/assets/imgs/text-cityscape.svg"
            alt=""
          />
        </div>
      </div>

      <img class="mt-2 opacity-0" ref="mainTitle" src="@/assets/imgs/maintitle.svg" alt="" />
      <img class="mt-6 opacity-0" ref="subTitle" src="@/assets/imgs/subtitle.svg" alt="" />
      <img class="mt-6 opacity-0" ref="mainLabel" src="@/assets/imgs/main-label.svg" alt="" />
      <img class="mt-20 opacity-0" ref="intro1" src="@/assets/imgs/intro-1.svg" alt="" />
      <img class="mt-4 opacity-0" ref="intro2" src="@/assets/imgs/intro-2.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

// refs
const bgPattern = ref(null)
const bgL = ref(null)
const bgR = ref(null)
const building = ref(null)
const orangeLine = ref(null)
const textCharming = ref(null)
const textCityscape = ref(null)
const mainTitle = ref(null)
const subTitle = ref(null)
const mainLabel = ref(null)
const intro1 = ref(null)
const intro2 = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    repeat: -1, // loop indefinitely
    repeatDelay: 10, // wait 10s before each restart
  })

  tl.to(bgPattern.value, { opacity: 1, duration: 1 })
    // 其他依序淡入
    .to(mainTitle.value, { opacity: 1, duration: 0.6 })
    .fromTo(subTitle.value, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
    .fromTo(mainLabel.value, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
    .to(intro1.value, { opacity: 1, duration: 0.6 })
    .to(intro2.value, { opacity: 1, duration: 0.6 })

    // 左右文字滑入
    .fromTo(textCharming.value, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '>')
    .fromTo(textCityscape.value, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '<')

    .to(bgR.value, { x: '50%', duration: 2 }, '>-.5')
    .to(bgL.value, { x: '-50%', duration: 2 }, '<')

    // 建築物 + 橘線 scale 展開
    .to(
      building.value,
      {
        opacity: 1,
        duration: 3,
        onStart: () => {
          building.value.currentTime = 0
          building.value.play()
        },
      },
      '-=.8',
    )
    .to(
      orangeLine.value,
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power2.out',
      },
      '<-.2',
    )
})
</script>
