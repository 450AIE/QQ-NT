<script setup>
import { useRouter } from 'vue-router';
import SettingOptions  from '@renderer/components/SettingOptions/index.vue'
import {  ref } from 'vue';
import useBaseConfigStore from '../../store/baseConfigStore';
import { storeToRefs } from 'pinia';
const baseConfigStore = useBaseConfigStore()
const {bottomIconList,upperIconList} = storeToRefs(baseConfigStore)
const showManageLeftSubWindow = () => {
    ElectronAPI.showManageLeftSubWindow()
}
// 一进入就要读取baseConfigStore的设置
async function readBaseConfigStoreFiles(){
    const res = await ElectronAPI.readBaseConfigStoreFiles()
    console.log(res)
}
readBaseConfigStoreFiles()

// 监听pinia更新
ElectronAPI.onListenerPiniaStateUpdate((_,func,args)=>{
    baseConfigStore[func](...JSON.parse(args))
})
//设置界面的组件
const settingOptionsComponent = ref(null)
const router = useRouter()
//路由跳转
function transRouter(subOptionIndex) {
    let path = undefined
    if(subOptionIndex === 0){
        path = '/'
    }else if(subOptionIndex === 1){
        path = '/relationship_manage'
    }
    router.push(path)
}
//点击底部的操作。最下面是0，从下网上增大
function bottomOperate(index){
    if(index === 0){
        //如果组件打开了再次点击就关闭
        if(settingOptionsComponent.value){
            settingOptionsComponent.value = null
        }else{
            settingOptionsComponent.value = SettingOptions
        }
        // 收藏
    }else if(index === 1){
        ElectronAPI.createCollectWindow()
    }
}
</script>


<template>
    <div class="container">
        <div class="title">
            <img src="../../assets/QQ.png" alt="">
        </div>
        <div class="img">
            <img src="../../assets/user.png" alt="">
        </div>
        <div class="upper-option" v-for="(item, index) in upperIconList" :key="index" @click="transRouter(index)">
            <el-popover placement="right" trigger="hover" width="50" :disabled="(index !== 4)" hide-after="60">
                <template #reference>
                    <svg class="icon bg" aria-hidden="true">
                        <use :xlink:href="item"></use>
                    </svg>
                </template>
                <div class="popover-manage" @click="showManageLeftSubWindow">
                    管理
                </div>
            </el-popover>
        </div>
        <div class="bottom-option" v-for="(item, index) in bottomIconList" :key="index"
            :style="{ bottom: index * 40 + 'px' }" @click="bottomOperate(index)">
            <svg class="icon blue" aria-hidden="true">
                <use :xlink:href="item"></use>
            </svg>
        </div>
        <component :is="settingOptionsComponent" class="setting"></component>
    </div>
</template>


<style scoped lang="scss">
.container {
    position: relative;
    display: flex;
    width: 60px!important;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    height: 100vh;
    -webkit-app-region: drag;
    background-color: var(--background-gray1-color);
    overflow: visible;
    .setting {
        position:absolute;
        left: 60px;
        z-index: 99;
        width: 220px!important;
        // width: 300px!important;
        bottom: 6px;
    }
    .active {
        content: attr(text);
        position: absolute;
        z-index: 10;
        color:pink;
        mask:linear-gradient(to left, red, transparent );
        -webkit-mask:linear-gradient(to left, red, transparent );
        transition:all 0.4s ease;
    }
    .upper-option {
        margin: 5px;
        :deep() {
            min-width: 10px;
        }
        .popover-manage {}
    }

    .bottom-option {
        position: absolute;
        // bottom: 10px;
        margin: 5px;
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        padding: 8px;
    }

    .bg:hover {
        background-color: #e9e9e9;
        border-radius: 10px;
    }

    .blue:hover {
        fill: blue;
    }

    .img {
        margin: 10px 5px;
        width: 35px;
        height: 35px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 35px;
            object-fit: cover;
        }
    }

    .title {
        margin: 6px 10px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
