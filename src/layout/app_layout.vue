<template>
  <div class="viewer_layout-main">
    <div class="viewer_side-content">
      <div class="viewer_side-content-item">
        <q-img src="/src/assets/images/vite.svg" class="viewer_logo"></q-img>
        <q-btn :color="activeRoute === item.name ? 'primary' : ''" v-for="item in appMenuItem" :key="item.name"
          :icon="item.meta.icon" flat round @click="goto(item.name as string, {})">
          <q-tooltip anchor="center right" class="bg-indigo text-body2" self="center left" :offset="[10, 10]"
            :delay="1000">
            {{ t(item.meta.title!) }}
          </q-tooltip>
        </q-btn>
      </div>
      <div class="viewer_side-content-item">
        <q-btn flat round :icon="darkMode ? 'o_wb_sunny' : 'o_bedtime'" @click="toggleDarkMode()"></q-btn>
        <q-btn v-for="item in settingsMenuItem" :key="item.name" :icon="item.meta.icon" flat round
          @click="goto(item.name as string, {})">
          <q-tooltip anchor="center right" class="bg-indigo text-body2" self="center left" :offset="[10, 10]"
            :delay="1000">
            {{ t(item.meta.title!) }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="flex-1">
      <div class="viewer_header-content flex-1">
        <div class="header_search">
          <q-input standout="bg-grey-10" dense color="teal" v-model="searchText" :placeholder="searchLabel">
            <template v-slot:append>
              <kbd class="doc-search__kbd q-ma-none">Ctrl+K</kbd>
            </template>
          </q-input>
        </div>
        <div class="header_action">
          <q-btn flat round icon="o_remove" size="small" @click="minimize"></q-btn>
          <q-btn flat round icon="o_crop_5_4" size="small" @click="toggleFullscreen"></q-btn>
          <q-btn flat round icon="o_clear" size="small" @click="closeWindow"></q-btn>
        </div>
      </div>
      <div class="viewer_layout-content flex-1">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { RouteParamsRaw, useRouter } from 'vue-router'
import useLocale from '@/hook/useLocale'
import { useQuasar } from 'quasar'

const { i18n: { t } } = useLocale()
const router = useRouter()
const $q = useQuasar()
const ipc = window.electronAPI
let searchText = ref<string>('')
let searchLabel = ref<string>('从 D: 中检索')

let darkMode = ref<boolean>(false)

const appMenuItem = computed(() => {
  return router.getRoutes().filter((x) => x.meta.layout && !x.meta.hidden)
})
const settingsMenuItem = computed(() => {
  return router.getRoutes().filter((x) => !x.meta.layout && !x.meta.hidden)
})

const activeRoute = computed(() => {
  return router.currentRoute.value.name
})

async function goto(name: string, params: RouteParamsRaw | undefined) {
  try {

    // Avoided redundant navigation

    const isActiveRoute = router.currentRoute.value.name === name

    if (isActiveRoute) {
      return
    }

    const res = await router.push({ name: name, params })
    if (res) {
      throw res.stack
    }
  } catch (err: any) {
    throw err
  }
}

async function toggleDarkMode() {
  try {
    const isDark = await ipc.getShouldDarkMode()
    await ipc.darkModeToggle(isDark ? 'light' : 'dark')
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
  darkMode.value = await ipc.getShouldDarkMode()
}

function minimize() {
  ipc.windowMinimize()
}

function toggleFullscreen() {
  ipc.windowToggleFullscreen()
}

function closeWindow() {
  ipc.closeWindow()
}

onMounted(() => {
  getMode()
})

</script>
<style lang="scss" src="@/assets/css/layout.scss"></style>