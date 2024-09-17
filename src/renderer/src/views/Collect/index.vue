<script setup>
import AppOperator from '@renderer/components/AppOperate/index.vue'
import CollectBlock from './components/collectBlock/index.vue'
import SearchBar from '@renderer/components/SearchBar/index.vue'
import useBeforeCreateGetUpdatedPiniaState from '@renderer/hooks/useBeforeCreateGetUpdatedPiniaState'
import useUpdatePiniaStateSync from '../../hooks/useUpdatePiniaStateSync';

defineOptions({
    // name:'Collect'
})
useUpdatePiniaStateSync()
useBeforeCreateGetUpdatedPiniaState()
function openCreateNotWindow(){
    ElectronAPI.createCreateNoteWindow()
}
// onActivated(()=>{
//     console.log('collect activated')
// })
</script>


<template>
    <AppOperator class="app-operate"/>
   <div class="container">
        <div class="left">
            <keep-alive>
                <SearchBar :withIcon="false" />
            </keep-alive>
            <div class="options-menu">
            </div>
            <div class="create-note" @click="openCreateNotWindow">
                创建笔记
            </div>
        </div>
        <div class="right">
            <div class="upper-title">
                <span>全部收藏</span>
            </div>
            <div class="bottom">
                <CollectBlock v-for="item in 4"/>
            </div>
        </div>
   </div>
</template>


<style scoped lang="scss">
.app-operate {
    position: absolute;
    top: 0;
    right: 0;
}
.container {
    display: flex;
    height: 100vh;
    width: 100vw;
    &:hover {
        background-color: var(--background-gray5-color);
    }
    .left {
        -webkit-app-region: drag;
        width: 300px;
        height: 100vh;
        position:relative;
        background-color: #fff;
        .create-note {
            cursor: pointer;
            position:absolute;
            display: flex;
            width: 80%;
            justify-content: center;
            align-items: center;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            border:1px solid var(--search-bar-border-bottom-color);
            border-radius:2px;
        }
    }
    .right {
        position: relative;
        flex:1;
        height: 100vh;
        background-color: var(--background-gray2-color);
        .upper-title {
            height: 70px;
            width: 100%;
            position: relative;
            border-bottom:1px solid var(--search-bar-border-bottom-color);
            span {
                position: absolute;
                bottom: 10px;
                left: 10px;
            }
        }
    }
}
</style>
