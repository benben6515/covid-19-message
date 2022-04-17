<script setup lang="ts">
import { reactive } from 'vue'
import platform from 'platform'
// import data from '/data.json'
import { localStorage } from '~/composables'

const data: any = localStorage.data
// console.log(data)

const state = reactive({
  searchString: '',
  filterData: data,
  data,
})

const os = platform?.os?.toString()

const sendMessage = (content: any) => {
  if (os && os.match(/Android/i))
    window.location.replace(`sms:1922?body=${content}`)
  if (os && os.match(/iOS/i))
    window.location.replace(`sms:1922&body=${content}`)
  console.error('Error: not legal OS')
}

const setFilterData = () => {
  state.filterData = data
    .filter((e: { name: string | string[] }) => e.name.includes(state.searchString))
    .sort((a: { visitedTime: number }, b: { visitedTime: number }) => a.visitedTime - b.visitedTime)
    .filter((e: any, i: number) => i <= 10)
}

</script>

<template>
  <MessageTitle />

  <input
    id="input"
    v-model="state.searchString"
    placeholder="Search data"
    type="text"
    autocomplete="false"
    p="x-4 y-2"
    w="250px"
    text="center"
    bg="transparent"
    border="~ rounded gray-200 dark:gray-700"
    outline="none active:none"
    @keydown.enter="setFilterData"
  >

  <div>
    <button
      class="m-3 text-sm btn"
      :disabled="!state.searchString"
      @click="setFilterData"
    >
      Search
    </button>
  </div>

  <div
    class="flex flex-col gap-2 max-w-20rem mx-auto"
  >
    <div
      v-for="chunk in state.filterData"
      :key="chunk.id"
      class="flex justify-between bg-zinc-100"
      dark="bg-zinc-800"
    >
      <div class="px-2">
        {{ chunk.name }}
      </div>
      <button
        class="bg-green-500 px-1 rounded-md"
        dark="bg-green-800"
        @click="sendMessage(chunk.message)"
      >
        發送
      </button>
    </div>
  </div>
</template>
