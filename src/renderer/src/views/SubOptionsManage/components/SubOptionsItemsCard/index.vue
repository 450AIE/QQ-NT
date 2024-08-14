<script setup>
import { Minus, Plus } from '@element-plus/icons-vue';
const props = defineProps({
    option:{
        required:true,
        type:Object
    }
})
//0为增加该选项到左侧边栏，1为卸载
function operateOption(e){
    console.log('点击')
    //0,增加
    if(e.target.dataset.id === 0){
        e.target.dataset.id = 1
        props.option.status = true
    //卸载
    }else{
        e.target.dataset.id = 0
        props.option.status = false
    }
}
</script>


<template>
    <div class="container" @click="set">
        <div class="icon-plus"  :style="{backgroundColor: option.status === false ? '#e5f5ff' : '#f4e4e1'}"
          @click="operateOption" :data-id=" option.status === false ? 0 : 1">
            <el-icon :color="option.status === false ? '#2cabff' : '#f18f80'">
                <Plus v-if="option.status === false"/>
                <Minus  v-else />
            </el-icon>
        </div>
        <div class="item">
            <div class="icon-item">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="option.icon"></use>
                </svg>
            </div>
            <div class="text">
                {{ option.text }}
            </div>
        </div>
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
    .text {
        position:absolute;
        display: flex;
        justify-content: center;
        width: 100%;
        bottom: 0;
        left: 0;
        font-size: 12px;
        margin-bottom:10px;
        color: #9c9c9c;
    }
    .icon-item {
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        padding:0 20px 23px 20px;
    }
    .icon-plus {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 3px;
        top: 3px;
        width: 14px;
        height: 14px;
        z-index:99;
        border-radius :4px;
    }
}
</style>
