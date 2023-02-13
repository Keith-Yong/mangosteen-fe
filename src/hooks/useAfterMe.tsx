import { onMounted } from 'vue'
import { useMeStore } from '../stores/useMeStore'

//自定义useAfterMe钩子
export const useAfterMe = (fn: () => void) => {
  const meStore = useMeStore()
  onMounted(async () => {
    await meStore.mePromise
    fn()
  })
}