<template>
  <div class="gesture-overlay" ref="overlay">
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Hammer from 'hammerjs'

const props = defineProps({
  type: {
    type: String,
    default: 'click', // 可選 'click' | 'doubleClick' | 'swipe'
  },
  message: {
    type: String,
    default: '請進行互動',
  },
})

const emit = defineEmits(['completed'])
const overlay = ref(null)
let hammerInstance = null
function handleAction() {
  emit('completed')
}

onMounted(() => {
  if (overlay.value) {
    if (props.type === 'click') {
      overlay.value.addEventListener('click', handleAction)
    } else if (props.type === 'doubleClick') {
      overlay.value.addEventListener('dblclick', handleAction)
    } else if (props.type === 'swipe') {
      const hammer = new Hammer(overlay.value)
      hammer.on('swipe', handleAction)
    }
  }
})

onBeforeUnmount(() => {
  if (overlay.value) {
    if (props.type === 'click') {
      overlay.value.removeEventListener('click', handleAction)
    } else if (props.type === 'doubleClick') {
      overlay.value.removeEventListener('dblclick', handleAction)
    }
    if (hammerInstance) {
      hammerInstance.off('swipe', handleAction)
      hammerInstance.destroy()
      hammerInstance = null
    }
  }
})
</script>

<style scoped>
.gesture-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  z-index: 1000;
}
</style>
