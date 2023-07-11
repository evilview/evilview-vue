<script setup lang="ts">
import { ref } from 'vue';
const msg = ref<string>('Hello World')
</script>

<template>
  <div class="evilview-app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style lang="scss">
.evilview-app {
  display: block;
}
</style>
