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
    trigger()
  }
  return { toggle, active, trigger }
}
