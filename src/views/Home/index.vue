<template>
  <div class="viewer-main">

  </div>
</template>

<script lang="ts" setup>
import useLocale from '@/hook/useLocale';
import {onMounted, ref} from "vue";

const {i18n: {t}} = useLocale()

const win: any = window

const ipc = win.electronAPI
let sayMsg = ref()
const msg = async () => {
  try {
    sayMsg.value = await ipc.say()
  } catch (e) {
    throw e
  }
}

onMounted(() => {
  msg()
})

</script>
<style lang="scss" src="@/assets/css/main.scss">
</style>