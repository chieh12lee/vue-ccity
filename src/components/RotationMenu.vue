<template>
  <div class="scene">
    <div ref="dragContainer" id="drag-container">
      <!-- 旋轉容器 -->
      <div ref="spinContainer" id="spin-container">
        <img
          v-for="(row, index) in rows"
          @click="$emit('clic', row.id)"
          class="cursor-pointer"
          :key="row.id"
          :src="row.thumbnail"
          alt="carousel image"
          :style="getImgStyle(index)"
        />
      </div>
      <!-- 地面 -->
      <div ref="ground" id="ground"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'

// 定義 props 與預設值
const props = defineProps({
  radius: {
    type: Number,
    default: 1200,
  },
  autoRotate: {
    type: Boolean,
    default: true,
  },
  rotateSpeed: {
    type: Number,
    default: 36000, // 單位：秒/360度
  },
  imgWidth: {
    type: Number,
    default: 300,
  },
  imgHeight: {
    type: Number,
    default: 300 * 0.7,
  },
  rows: {
    type: Array,
    default: () => [],
  },
})

// 內部狀態，部分狀態不需要 props 化
const tX = ref(0)
const tY = ref(0)
const desX = ref(0)
let timer = null

// 取得 DOM 節點
const dragContainer = ref(null)
const spinContainer = ref(null)
const ground = ref(null)

function getImgStyle(index) {
  const total = props.rows.length
  return {
    transform: `rotateY(${index * (360 / total)}deg) translateZ(${props.radius}px)`,
    transition: 'transform 1s',
  }
}

// 根據 tX 與 tY 更新旋轉容器
function applyTransform(obj) {
  if (!obj) return
  if (tY.value > 180) tY.value = 180
  if (tY.value < 0) tY.value = 0
  obj.style.transform = `rotateX(${-tY.value}deg) rotateY(${tX.value}deg)`
}

// 控制動畫暫停或恢復
function playSpin(yes) {
  if (!spinContainer.value) return
  spinContainer.value.style.animationPlayState = yes ? 'running' : 'paused'
}

function handleTouchStart(e) {
  e.preventDefault()
  clearInterval(timer)

  const touch = e.touches[0]
  let sX = touch.clientX
  let sY = touch.clientY
  const startTime = Date.now()

  const onTouchMove = (e) => {
    if (!spinContainer.value) return
    const touch = e.touches[0]
    const nX = touch.clientX
    desX.value = nX - sX
    tX.value += desX.value * 0.1
    applyTransform(spinContainer.value)
    sX = nX
  }

  const onTouchEnd = (e) => {
    const endTime = Date.now()
    const duration = endTime - startTime
    const touch = e.changedTouches[0]
    const moveX = touch.clientX - sX
    const moveY = touch.clientY - sY
    const moved = Math.sqrt(moveX * moveX + moveY * moveY)

    // 🔹 處理輕觸點擊（模擬點擊圖片）
    if (duration < 200 && moved < 10) {
      const tappedEl = document.elementFromPoint(touch.clientX, touch.clientY)
      if (tappedEl && tappedEl.tagName === 'IMG') {
        tappedEl.click()
      }
    }

    // 🔹 慣性旋轉
    timer = setInterval(() => {
      desX.value *= 0.95
      tX.value += desX.value * 0.1
      applyTransform(spinContainer.value)
      playSpin(false)
      if (Math.abs(desX.value) < 0.5) {
        clearInterval(timer)
        playSpin(true)
      }
    }, 17)

    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  }

  window.addEventListener('touchmove', onTouchMove, false)
  window.addEventListener('touchend', onTouchEnd, false)
}

// 處理鼠標滾輪事件，調整半徑後重新初始化圖片排列
function handleMouseWheel(e) {
  e.preventDefault()
  const delta = e.wheelDelta ? e.wheelDelta / 20 : -e.detail
  // 直接修改 props.radius 不可行，所以這邊只更新排列
  // 假如需要改變動態效果，可以改為 emit 事件讓父組件更新
  // 這裡先利用局部變數模擬效果：
  const newRadius = props.radius + delta
  // 更新 ground 大小
  ground.value.style.width = newRadius * 3 + 'px'
  ground.value.style.height = newRadius * 3 + 'px'
  // 重新排列圖片
  setTimeout(() => {
    const ospin = spinContainer.value
    const aImg = ospin.getElementsByTagName('img')
    const total = aImg.length
    for (let i = 0; i < total; i++) {
      aImg[i].style.transform = `rotateY(${i * (360 / total)}deg) translateZ(${newRadius}px)`
    }
  }, 1)
}

onMounted(() => {
  // 設定圖片與地面的尺寸

  const ospin = spinContainer.value
  ospin.style.width = props.imgWidth + 'px'
  ospin.style.height = props.imgHeight + 'px'
  ground.value.style.width = props.radius * 3 + 'px'
  ground.value.style.height = props.radius * 3 + 'px'

  // 初始化圖片排列
  // init(500)

  // 自動旋轉設定：動態加入動畫
  if (props.autoRotate) {
    const animationName = props.rotateSpeed > 0 ? 'spin' : 'spinRevert'
    ospin.style.animation = `${animationName} ${Math.abs(props.rotateSpeed)}s infinite linear`
  }

  // 綁定觸控與滾輪事件（事件作用在 dragContainer 上，但變形應用在 spinContainer）
  dragContainer.value.addEventListener('touchstart', handleTouchStart, false)
  dragContainer.value.addEventListener('mousewheel', handleMouseWheel, false)
  dragContainer.value.addEventListener('DOMMouseScroll', handleMouseWheel, false)
})
</script>

<style scoped>
.scene {
  overflow: hidden;
  display: flex;

  @apply h-full w-full;
  perspective: 1400px;
  perspective-origin: 50% 15%;
  transform-style: preserve-3d;
  padding-bottom: 150px;
}
#drag-container,
#spin-container {
  position: relative;
  display: flex;
  margin: auto;
  transform-style: preserve-3d;
  transform: rotateX(0deg);
  overflow: unset;
}

#drag-container img,
#drag-container video {
  transform-style: preserve-3d;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 200px;
  font-size: 50px;
  text-align: center;
  -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0005);
}

#drag-container img:hover,
#drag-container video:hover {
  box-shadow: 0 0 15px #fffd;
  -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0007);
}

#drag-container p {
  font-family: Serif;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(90deg);
  color: #fff;
}

#ground {
  position: absolute;
  top: 100%;
  left: 50%;
  @apply w-full h-full;
  transform: translate(-50%, -50%) rotateX(90deg);
  background: -webkit-radial-gradient(center center, farthest-side, #9993, transparent);
}

@keyframes spin {
  from {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  to {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}
@-webkit-keyframes spinRevert {
  from {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
  to {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
}
@keyframes spinRevert {
  from {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
  to {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
}
</style>
