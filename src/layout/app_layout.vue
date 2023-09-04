<template>
  <div class="viewer_layout-main">
    <div class="viewer_side-content">
      <div class="viewer_side-content-item">
        <q-img src="/src/assets/images/vite.svg" class="viewer_logo"></q-img>
        <q-btn v-for="item in appMenuItem" :key="item.name" :icon="item.meta.icon" flat round @click="goto(item.name as string,{})">
          <q-tooltip anchor="center right" class="bg-indigo text-body2" self="center left" :offset="[10, 10]" :delay="1000">
            {{ t(item.meta.title!) }}
          </q-tooltip>
        </q-btn>
      </div>
      <div class="viewer_side-content-item">
        <q-btn v-for="item in settingsMenuItem" :key="item.name" :icon="item.meta.icon" flat round @click="goto(item.name as string,{})">
          <q-tooltip anchor="center right" class="bg-indigo text-body2" self="center left" :offset="[10, 10]" :delay="1000">
            {{ t(item.meta.title!) }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="flex-1">
      <div class="viewer_header-content flex-1">

      </div>
      <div class="viewer_layout-content flex-1">
        <RouterView></RouterView>
      </div>
    </div>

  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { RouteParamsRaw, useRouter } from 'vue-router';
import useLocale from '@/hook/useLocale';

const {i18n: {t}} = useLocale()
const router = useRouter()

const appMenuItem = computed(() => {
  return router.getRoutes().filter((x) => x.meta.layout && !x.meta.hidden)
})
const settingsMenuItem = computed(() => {
  return router.getRoutes().filter((x) => !x.meta.layout && !x.meta.hidden)
})

async function goto(name: string,params: RouteParamsRaw | undefined) {
  try {
    const res = await router.push({name: name,params})
    if (res) {
      throw res.stack
    }
  } catch(err: any) {
    throw err
  }
}

</script>
<style lang="scss" src="@/assets/css/layout.scss"></style>