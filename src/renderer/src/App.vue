<script setup>
import useBaseConfigStore from './store/baseConfigStore';

const baseConfigStore = useBaseConfigStore()
</script>

<template>
  <div class="app"  :class="{'light-theme':!baseConfigStore.isDarkTheme,'dark-theme':baseConfigStore.isDarkTheme}">
    <router-view class="router"

    ></router-view>
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
