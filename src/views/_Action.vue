<template>
  <div class="gesture-overlay" ref="overlay">
    <Draggable
      v-if="type === 'drag'"
      v-slot="{ x, y }"
      class="fixed select-none cursor-move z-31"
      :initial-value="{ x: 1600, y: 400 }"
      prevent-default
      :onEnd="onEnd"
    >
      asdf
    </Draggable>
    <!-- <p>{{ message }}</p> -->
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from 'vue'
import Hammer from 'hammerjs'
import { UseDraggable as Draggable } from '@vueuse/components'
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
let dragger

function onEnd() {
  emit('completed')
}
let hammerInstance = null
function handleAction(e) {
  emit('completed')
}

onMounted(() => {
  if (overlay.value) {
    if (props.type === 'click') {
      overlay.value.addEventListener('dblclick', handleAction)
    } else if (props.type === 'doubleClick') {
      overlay.value.addEventListener('dblclick', handleAction)
    } else if (props.type.includes('swipe')) {
      const hammer = new Hammer(overlay.value)
      hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
      hammer.on(props.type, handleAction)
    } else if (props.type === 'drag') {
    }

    console.log(props.type)
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
  background: rgba(0, 0, 0, 0.01);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  z-index: 45;
}
</style>
