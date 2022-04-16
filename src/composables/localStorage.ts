import { reactive } from 'vue'
import * as defaultData from '/data.json'

interface IData {
  id: number
  name: string
  content: string
}

const STORAGE_KEY = 'st-message-data'

const getLocalStorage = window.localStorage.get(STORAGE_KEY)

// TODO
// const saveData: void = (data: IData[]) => window.localStorage.set(STORAGE_KEY, data)

const state = reactive({
  data: getLocalStorage || defaultData as IData,
})

export { state }
