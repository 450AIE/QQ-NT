<script setup>
import LeftSubOptions from '@renderer/components/LeftSubOptions/index.vue'
</script>

<template>
  <div class="app">
    <router-view class="router"></router-view>
  </div>

</template>

<!-- 利用flex圣杯布局 -->
<style scoped>
.app {
  display: flex;
  .router {
    flex: 1;
  }
}
</style>
