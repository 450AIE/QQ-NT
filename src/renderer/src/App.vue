<script setup>
import LeftSubOptions from '@renderer/components/LeftSubOptions/index.vue'
</script>

<template>
  <div class="app">
    <router-view class="router"></router-view>
  </div>

</template>
<style scoped>
.app {
   display: flex;
   .router {
    flex: 1;
  }
}
</style>
