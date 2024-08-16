<script setup>
import { normalIconList,normalIconListWithFold } from './iconList';
//0普通，1带折叠
const props = defineProps({
    type:{
        required:false,
        type:Number,
        default:0
    }
})
let len = 0
let operateIconList = undefined
if(props.type === 0){
    operateIconList = normalIconList
}else if(props.type === 1){
    operateIconList = normalIconListWithFold
}
len = operateIconList.length

function appOperate(type){
    if(type === '#icon-zuixiaohua'){
        ElectronAPI.minimize()
    }else if(type === '#icon-zuidahua'){
        ElectronAPI.maximize()
    }else if(type === '#icon-guanbi'){
        ElectronAPI.closeWindow()
    }
}

</script>


<template>
    <div class="container" :style="{width:(len*40) + 'px!important'}">
        <svg class="icon" aria-hidden="true" v-for="(item,index) in operateIconList" :key="index"
            :style="{right:(len - 1 - index)*40 + 'px'}"
            @click="appOperate(item)"
        >
            <use :xlink:href="item"></use>
        </svg>
    </div>
</template>


<style scoped lang="scss">
.container {
    display: flex;
    align-items: center;
    position:relative;
    height: 25px!important;
    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        position:absolute;
        width: 40px;
        height: 25px;
        padding:5px;
    }
    .icon:hover {
        background-color: #eaeaea;
    }
    .icon:last-child:hover {
        background-color: #c42b1c;
        fill: #fff;
    }
}
</style>
