<script setup>
import { Search , Plus } from '@element-plus/icons-vue';
import InfoBlock from '@renderer/components/InfoBlock/index.vue'
import { onMounted, ref } from 'vue';
import  { useRouter } from 'vue-router'
//这个不确定是否写成响应式
const frendsList = [
    {
        name:'死于死于安乐死',
        img:'https://s2.loli.net/2024/08/11/TNzyaPnfDLY9utC.jpg',
        latestTime:'',//时间戳
    }
]
//计算好友列表的滚动条出现邻接值
const rightViewWidth = ref(0)
const scrollHeight = ref(window.innerHeight - 60)
window.addEventListener('resize',()=>{
    scrollHeight.value = window.innerHeight -60
    rightViewWidth.value = window.innerWidth - parseInt(left.value.offsetWidth) - 60 -3
    right.value.style.width = rightViewWidth.value + 'px'
})
//要在setup的时候就获取router
const router = useRouter()
//ref元素
const left = ref(null)
const resize  = ref(null)
const right = ref(null)
//水平拖拽函数
onMounted(()=>{
    // function horizontalDrag(){
        resize.value.onmousedown = e=>{
            //距离视口左侧的距离
            let startX = e.clientX
            //获取左边元素的宽度，包含padding和margin,每次拖动都应该重新获取
            let offsetWidth = left.value.offsetWidth
            let moveLen = undefined
            document.onmousemove = e=>{
                let endX = e.clientX
                moveLen = endX - startX
                let width = offsetWidth + moveLen
                if(width <= 220){
                    width = 220
                }else if(width >= 400){
                    width = 400
                }
                left.value.style.width = width + 'px'
                //右侧的宽度 = 窗口总宽度 - 左侧好友列表宽度 - 最左侧固定栏宽度
                rightViewWidth.value = window.innerWidth - parseInt(left.value.style.width) - 60 -3
                right.value.style.width = rightViewWidth.value + 'px'
                // right.value.style.width = '30px'
            }
            //松开后解绑事件
            document.onmouseup = e=>{
                document.onmousemove = null
                document.onmouseup = null
            }
            return
        }
    // }
    // horizontalDrag()
    //DOM渲染完后就立刻给右侧宽度赋值
    rightViewWidth.value = window.innerWidth - left.value.offsetWidth - 60 -3
    right.value.style.width = rightViewWidth.value + 'px'
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
        <div class="right-view" ref="right">
            <router-view></router-view>
        </div>
    </div>
</template>


<style scoped lang="scss">
.container {
    height: 100vh;
    position: relative;
    .left-view {
        position: relative;
        min-width:220px;
        max-width:400px;
        float: left;
    }
    .resize {
        float: left;
        width: 3px;
        height: 100vh;
        background-color: orange;
        cursor: ew-resize;
    }
    .right-view {
        float: left;
        height: 100vh;
        // width: 10px;
        background-color: #f2f2f2;
    }
    .info-block:hover {
        background-color: #f5f5f5;
    }
    .search {
        background-color: #fff;
        display: flex;
        // justify-content: center;
        padding-top:10px;
        align-items: center;
        height: 60px;
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
