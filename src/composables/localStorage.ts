import { reactive } from 'vue'
import * as defaultData from '/data.json'

interface IData {
  id: number
  name: string
  content: string
}

const STORAGE_KEY = 'st-message-data'

const getLocalStorage = window.localStorage.getItem(STORAGE_KEY)
  ? JSON.parse(window.localStorage.getItem(STORAGE_KEY) as string)
  : ''

console.log(getLocalStorage)

// TODO
const save = (data: any) => window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

const localStorage = reactive({
  data: getLocalStorage || defaultData as IData,
  save,
})

export { localStorage }
