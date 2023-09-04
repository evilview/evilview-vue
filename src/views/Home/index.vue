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
import { useQuasar } from 'quasar'

const $q = useQuasar()

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

async function toggleDarkMode() {
  try {
    const isDark = await ipc.getShouldDarkMode()
    await ipc.darkModeToggle(isDark ? 'light':'dark')
    $q.dark.set(!isDark)
    await getMode()
  } catch (err: any) {
    throw err
  }
}
async function resetSystemMode() {
  try {
    await ipc.darkModeToggle('system')
    $q.dark.set('auto')
    await getMode()
  } catch (err: any) {
    throw err
  }
}

async function getMode() {
  mode.value = await ipc.getCurrentMode()
}

onMounted(() => {
  msg()
  getMode()
})

</script>
<style lang="scss" src="@/assets/css/main.scss">
</style>