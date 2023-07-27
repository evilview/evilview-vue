<template>
  <div>
    {{ t('Hello', ['zhudac']) }}
    <br>
    {{ sayMsg }}
    <box-icon name="rocket"></box-icon>
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