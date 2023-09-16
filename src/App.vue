<script setup lang="ts">
import { onMounted } from 'vue';
import { useQuasar } from 'quasar'

const ipc = window.electronAPI
const $q = useQuasar()

onMounted(() => {
  ipc.getShouldDarkMode().then((data: any) => {
    $q.dark.set(data)
  })
})

</script>

<template>
  <div class="evil-view-app">
    <RouterView></RouterView>
  </div>
</template>

<style lang="scss">
.evil-view-app {
  display: initial;
}
</style>
