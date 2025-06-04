import { ref, nextTick } from 'vue'

export default ({ domId }) => {
  const active = ref(false)

  const trigger = () => {
    nextTick(() => {
      window.$(domId).sketchIt({
        tools: true,
        color: '#d50011',
      })
    })
  }

  const toggle = () => {
    active.value = !active.value
    if (active.value) {
      trigger()
    } else {
      window.$(domId).off()
    }
  }
  return { toggle, active, trigger }
}
