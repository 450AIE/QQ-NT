<script setup>
import { useRouter } from 'vue-router';
import SettingOptions  from '@renderer/components/SettingOptions/index.vue'
import {  onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import lightQQLogo from '../../assets/light-QQ-logo.png'
import darkQQLogo from '../../assets/dark-QQ-logo.png'
import useBaseConfigStore from '../../store/baseConfigStore';
import { storeToRefs } from 'pinia';
import useUpdatePiniaStateSync from '@renderer/hooks/useUpdatePiniaStateSync'
// import useBeforeCreateGetUpdatedPiniaState from '@renderer/hooks/useBeforeCreateGetUpdatedPiniaState'
// 监听pinia更新
useUpdatePiniaStateSync()
// useBeforeCreateGetUpdatedPiniaState()
const baseConfigStore = useBaseConfigStore()
const {bottomIconList,upperIconList,isDarkTheme} = storeToRefs(baseConfigStore)
const showManageLeftSubWindow = () => {
    ElectronAPI.showManageLeftSubWindow()
}
// 一进入就要读取baseConfigStore的设置，注意，只有第一次才读取，之后切换到这个路由就不读取
// 了，否则会读取旧的状态。或者卸载前就写入配置，这样每次读取就读取新的。
// 当前选择：卸载前写入配置
async function readBaseConfigStoreFiles(){
    let res = await ElectronAPI.readBaseConfigStoreFiles()
    res = JSON.parse(res)
    // console.log('读取到的本地存储的baseConfigStore文件:',res)
    for(let key in baseConfigStore){
        if(baseConfigStore.hasOwnProperty(key)){
            // 调用set函数修改state
            if(key.startsWith('set') && typeof baseConfigStore[key] === 'function'){
                // 获取变量名，没有首字母
                const dataNameWithoutFirstChar = key.slice(4)
                // 获取首字母
                const dataNameFirstChar = key.slice(3,4).toLowerCase()
                const dataName = dataNameFirstChar + dataNameWithoutFirstChar
                baseConfigStore[key](res[dataName])
            }
        }
    }
}
readBaseConfigStoreFiles()
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
// 监听新窗口的创建，将当前的pinia状态传递给该窗口（但是不敢确定该组件内的pinia状态是否最新）
ElectronAPI.onListenerNewWindowCreated(()=>{
    ElectronAPI.sendUpdatedPiniaStateToNewCreatedWindow(JSON.stringify(baseConfigStore))
})
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
// 卸载前清除IPC的监听，避免内存泄漏，并且写入配置
onBeforeUnmount(()=>{
    ElectronAPI.writeBaseConfigStoreFiles(JSON.stringify(baseConfigStore))
    ElectronAPI.removeListenerNewWindowCreated()
    ElectronAPI.removeListenerPiniaStateUpdate()
})
</script>


<template>
    <div class="container">
        <div class="title">
            <img :src="isDarkTheme?darkQQLogo:lightQQLogo" alt="">
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
        fill: var(--icon-fill-color);
        margin: 5px;
        :deep() {
            min-width: 10px;
        }
    }

    .bottom-option {
        fill: var(--icon-fill-color);
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
        background-color: var(--sub-icon-hover-background-color,#e9e9e9);
        border-radius: 10px;
    }

    .blue:hover {
        fill: #0099ff;
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
