<script setup>
import useBaseConfigStore from '@renderer/store/baseConfigStore';
import SettingOptionDetailCard from '@renderer/views/SettingViews/components/SettingOptionDetailCard/index.vue'
import { ref } from 'vue';
//切换白天黑夜
const dayRef = ref(null)
const nightRef = ref(null)
function changeTheme(e){
    if(e.target.dataset.id === '0'){
        dayRef.value.classList.add('active')
        nightRef.value.classList.remove('active')
    }else if(e.target.dataset.id === '1'){
        dayRef.value.classList.remove('active')
        nightRef.value.classList.add('active')
    }
    shiftTheme(e)
}
const baseConfigStore = useBaseConfigStore()
function shiftTheme(e){
    // 白天
    if(e.dataset.id === 0 && baseConfigStore.isDarkTheme){
        baseConfigStore.setDarkTheme(false)
    // 黑夜
    }else if(e.dataset.id === 1 && !baseConfigStore.isDarkTheme){
        baseConfigStore.setDarkTheme(true)
    }
}

</script>


<template>
    <div class="container">
        <div class="title">
            <span class="title-text">通用</span>
        </div>
        <div class="scroll">
            <SettingOptionDetailCard title="外观设置" height="150">
                <template  class="theme-card" @click="changeTheme">
                    <div class="theme active" ref="dayRef">
                        <img src="../../../../assets/dayTheme.png" data-id="0" alt="">
                        <span>白天模式</span>
                    </div>
                    <div class="theme" ref="nightRef">
                        <img src="../../../../assets/nightTheme.png" data-id="1" alt="">
                        <span>夜间模式</span>
                    </div>
                </template>
            </SettingOptionDetailCard>
        </div>
    </div>
</template>


<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    .scroll {
        flex:1;
        padding:20px 20px 0 20px;
        .theme-card {
            padding:0 10px;
            height: 100%;
            flex-shrink: 0;
            display: flex;
            // align-items: center;
            .theme {
                display: flex;
                flex-direction: column;
                // position:relative;
                width: 100px;
                height: 100px;
                margin-right:15px;
                margin-top:10px;
                // overflow: visible;
                img {
                    width: 100px;
                    height: 80px;
                    border-radius: 4px;
                    margin-bottom:6px;
                }
                span {
                    font-size: 12px;
                }
            }
            .theme.active {
                img {
                    border: 2px solid $background-blue-color;
                    border-radius: 6px;
                }
            }
        }
    }
    .title {
        position:relative;
        width:100%;
        height: 70px;
        // background-color: orange;
        border-bottom: 1px solid #ececec;
        .title-text {
            position:absolute;
            left: 20px;
            bottom: 10px;
        }
    }
}
</style>
