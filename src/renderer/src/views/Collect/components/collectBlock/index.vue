<script setup>
defineProps({
    info:{
        required:false,
        type:Object,
        default:null
    },
    height:{
        required:false,
        type:String,
        default:'100px'
    },
    width:{
        required:false,
        type:String,
        default:'100%'
    }
})
</script>


<template>
   <div class="container" :style="{width:width,height:height}">
        <div class="left">
            <div class="picture">
                <img src="@renderer/assets/user.png" alt="">
            </div>
            <div class="text">

            </div>
        </div>
        <div class="right-info">
            <span class="time">{{ new Date().getTime() }}</span>
            <span class="source">source</span>
        </div>
   </div>
</template>

<style scoped lang="scss">
.container {
    position: relative;
    background-color: var(--background-gray1-color);
    height: 100px;
    .left {
        .picture {
            position: absolute;
            width: 80px;
            height: 80px;
            top: 50%;
            left: 5%;
            transform: translateY(-50%);
            border-radius:5px;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    .right-info {
        position: absolute;
        width: 40%;
        height:100%;
        bottom: 10px;
        right: 20px;
        color: #aaa;
        .time {
            position:absolute;
            right: 0;
            bottom: 20px;
        }
        .source {
            position:absolute;
            right: 0;
            bottom: 5px;
        }
    }
}
</style>
