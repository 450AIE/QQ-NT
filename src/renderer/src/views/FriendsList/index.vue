<script setup>
import { Search , Plus } from '@element-plus/icons-vue';
import InfoBlock from '@renderer/components/InfoBlock/index.vue'
import { onMounted, onUnmounted, ref } from 'vue';
import  { useRouter } from 'vue-router'
import { dragHorizontal } from '../../utils/dragFunc';
//这个不确定是否写成响应式
const frendsList = [
    {
        name:'死于死于安乐死',
        img:'https://s2.loli.net/2024/08/11/TNzyaPnfDLY9utC.jpg',
        latestTime:'',//时间戳
    }
]
//计算好友列表的滚动条出现邻接值
const scrollHeight = ref(window.innerHeight - 70)
window.addEventListener('resize',()=>{
    scrollHeight.value = window.innerHeight -70
})
//要在setup的时候就获取router
const router = useRouter()
//ref元素
const left = ref(null)
const resize  = ref(null)
//水平拖拽函数
onMounted(()=>{
    dragHorizontal(resize,left,150,400)
})
//再次清除监听，以防万一，resize上的会自动解绑
onUnmounted(()=>{
    document.onmousemove = null
    document.onmouseup = null
})

//先默认UID为1
function openFriendSession(uid = 1){
    router.push({path:'/friend_session',query:{uid}})
}

</script>


<template>
    <LeftSubOptions></LeftSubOptions>
    <div class="container">
        <div class="left-view" ref="left">
            <div class="search w">
                <el-input placeholder="搜索" class="inp" :prefix-icon="Search" />
                <div class="plus-icon-div">
                    <el-icon class="plus-icon"><Plus /></el-icon>
                </div>
            </div>
            <div class="scroll">
                <el-scrollbar :max-height="scrollHeight">
                    <InfoBlock v-for="(item,index) in 11" :key="index"
                        username="死鱼死于安乐死"
                        :time="new Date().getTime()"
                        class="info-block"
                        @click="openFriendSession(1)"
                    ></InfoBlock>
                </el-scrollbar>
            </div>
        </div>
        <div class="resize" ref="resize"></div>
        <div class="right-view">
            <router-view></router-view>
        </div>
    </div>
</template>


<style scoped lang="scss">
.container {
    display: flex;
    height: 100vh;
    width: 100%;
    position: relative;
    .left-view {
        position: relative;
        min-width:150px;
        max-width:400px;
    }
    .resize {
        width: 2px;
        height: 100vh;
        background-color: #ededed;
        cursor: ew-resize;
    }
    .right-view {
        flex:1;
        height: 100vh;
        background-color: #f2f2f2;
    }
    .info-block:hover {
        background-color: #f5f5f5;
    }
    .search {
        background-color: #fff;
        display: flex;
        padding-top:10px;
        align-items: center;
        height: 70px;
        border-bottom:1px solid #ebebeb;
        .plus-icon-div {
            display: flex;
            width: 30px;
            height: 30px;
            justify-content: center;
            align-items: center;
            background-color: #f5f5f5;
            border-radius: 4px;
            .plus-icon {
                color: #9f9f9f;
            }
        }
        .inp {
            height: 30px;
            flex:1;
            user-select: none;
            margin-right:10px;
            border-radius: 4px;
        }
    }
}
</style>
