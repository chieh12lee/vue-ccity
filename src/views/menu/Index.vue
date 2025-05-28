<template>
  <div
    class="w-full flex flex-col transition-all h-[380px]"
    :class="active ? 'translate-y-0' : 'translate-y-[100%]'"
  >
    <img class="absolute bottom-0 left-0 w-full" src="@/assets/imgs/menu-bg.svg" alt="" />
    <div
      class="cursor-pointer absolute left-[50%] ml-[-19px] top-[70px] flex flex-col items-center z-10"
      @click="toggle"
      :class="!active ? '-mt-[140px]' : 'mt-[0px]'"
    >
      <span v-if="!active">
        <img src="@/assets/imgs/icon-arrowup.svg" alt="" />
      </span>
      <span v-else>
        <img class="scale-[-1]" src="@/assets/imgs/icon-arrowup.svg" alt="" />
      </span>
    </div>
    <div class="w-full">
      <Menu @update="onUpdate"></Menu>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import Menu from '@/components/SliderMenu.vue'
import { useRouter } from 'vue-router'
const { toggle: _toggle, active } = inject('menu')
const emit = defineEmits(['open', 'close'])
const router = useRouter()

const toggle = () => {
  _toggle()
  emit(active.value ? 'open' : 'close')
}

// const intro = inject('info')
const onUpdate = (id) => {
  console.log(id)
  toggle()
  router.push({ name: 'main', params: { id } })

  // info.jump(idx)
}
</script>
