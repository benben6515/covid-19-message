import { reactive } from 'vue'
import data from '/data.json'

interface IData {
  id: number
  name: string
  content: string
}

// remove lod key
const LAST_STORAGE_KEY = 'st-message-data'
window.localStorage.removeItem(LAST_STORAGE_KEY)

const STORAGE_KEY = 'st-message-record'

const getLocalStorage = window.localStorage.getItem(STORAGE_KEY)
  ? JSON.parse(window.localStorage.getItem(STORAGE_KEY) as string)
  : ''

const save = (data: any) => window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

const localStorage = reactive({
  data: getLocalStorage || data as IData,
  save,
})

export { localStorage }
