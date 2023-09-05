<template>
  <div class="viewer-main">
    {{ sayMsg }}: {{ mode }}
    <br />
    <q-icon name="o_home"></q-icon>
    {{ t('Hello') }}
  </div>
</template>

<script lang="ts" setup>
import useLocale from '@/hook/useLocale'
import {onMounted, ref} from "vue"

const {i18n: {t}} = useLocale()

const ipc = window.electronAPI
let mode = ref<string>('')

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