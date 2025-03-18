<template>
  <div
    class="w-full flex flex-col items-center transition-all"
    :class="active ? 'translate-y-0' : 'translate-y-[100%]'"
  >
    <div class="text-white cursor-pointer -mt-[50px]" @click="toggle">
      <span v-if="!active">up</span>
      <span v-else>down</span>
    </div>
    <div>
      <Menu @update="onUpdate"></Menu>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import Menu from '@/components/SliderMenu.vue'
const { toggle: _toggle, active } = inject('menu')
const emit = defineEmits(['open', 'close'])
const toggle = () => {
  _toggle()
  emit(active.value ? 'open' : 'close')
}

const intro = inject('intro')
const onUpdate = (idx) => {
  toggle()
  intro.jump(idx)
}
</script>
