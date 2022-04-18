<template>
  <div
    class="title m-4"
    font="sans bold"
    text="3xl shadow-md"
  >
    1922 Message Recorder
  </div>
</template>

<style lang="scss" scoped>
.title {
  animation: shift-bg 2s infinite alternate ease-in-out;
}

@keyframes shift-bg {
  0% {
    background: #2a4;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  100% {
    background: #29f;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
