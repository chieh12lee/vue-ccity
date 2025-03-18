import { ref } from 'vue'
export default () => {
  const active = ref(false)
  const toggle = () => {
    active.value = !active.value
  }
  return { toggle, active }
}
