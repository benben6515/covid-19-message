<script setup lang="ts">
import { reactive } from 'vue'
import platform from 'platform'
import data from '/data.json'

const state = reactive({
  searchString: '',
  filterData: data,
  data,
})

const os = platform.os.toString()

const sendMessage = (content) => {
  if (os.match(/Android/i))
    window.location.replace(`sms:1922?body=${content}`)
  if (os.match(/iOS/i))
    window.location.replace(`sms:1922&body=${content}`)
  console.error('Error: not legal OS')
}

const setFilterData = () => {
  state.filterData = data.filter(e => e.name.includes(state.searchString))
}

</script>

<template>
  <div
    class="title m-4"
    font="sans bold"
    text="2xl shadow-md"
  >
    Message to 1922
  </div>

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
      @click="state.setFilterData"
    >
      Go
    </button>
  </div>

  <div
    class="flex flex-col gap-2 max-w-20rem mx-auto"
  >
    <div
      v-for="chunk in state.filterData"
      :key="chunk.id"
      class="flex justify-between bg-zinc-300"
      dark="bg-zinc-700"
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

<style lang="scss" scoped>
.title {
  background: -webkit-linear-gradient(315deg, #4d9 25% ,#67f);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
