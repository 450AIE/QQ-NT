<script setup>
defineProps({
    title:{
        required:true,
        type:String
    },
    height:{
        required:true,
        type:Number
    }
})
</script>


<template>
    <div class="container" :style="{height:height + 'px'}">
        <div class="title">{{ title }}</div>
        <div class="content">
            <slot>

            </slot>
        </div>
    </div>
</template>


<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    width:100%;
    .title {
        color: var(--setting-font-color);
        font-size: 14px;
        margin-left:10px;
    }
    .content{
        width:100%;
        flex:1;
        color: var(--setting-font-color);
        background-color: var(--sub-options-items-card-background-color);
        margin:10px 10px 5px 0 ;
        border-radius: 3%;
    }
}
</style>
