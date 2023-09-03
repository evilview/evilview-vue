<template>
  <div class="viewer_layout-main">
    <div class="viewer_side-content">
      <div class="viewer_side-content-item">
        <q-img src="/src/assets/images/vite.svg" class="viewer_logo"></q-img>
        <q-btn flat round icon="home"></q-btn>
        <q-btn flat round icon="search"></q-btn>
        <q-btn flat round icon="favorite"></q-btn>
        <q-btn flat round icon="folder"></q-btn>
        <q-btn flat round icon="settings"></q-btn>
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
import { ref } from 'vue'



</script>
<style lang="scss" src="@/assets/css/layout.scss"></style>