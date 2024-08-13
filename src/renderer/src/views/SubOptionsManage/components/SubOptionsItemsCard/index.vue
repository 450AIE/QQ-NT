<script setup>

</script>


<template>
    <div class="container">
        <div class="icon">+</div>
        <!-- 这里放置字体图标 -->
    </div>
</template>


<style scoped lang="scss">
.container {
    position: relative;
    display: flex;
    width: 60px;
    height: 60px;
    background-color: #fff;
    justify-content: center;
    align-content: center;
    border-radius: 6px;
    .icon {
        position: absolute;
        right: 3px;
        top: 3px;
        width: 8px;
        height: 8px;
        background-color: #e5f5ff;
    }
}
</style>
