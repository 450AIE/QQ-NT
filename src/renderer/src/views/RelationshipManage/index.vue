<script setup>
import LeftSubOptions from '@renderer/components/LeftSubOptions/index.vue'
import { Plus , Search } from '@element-plus/icons-vue';
import { onMounted , ref , onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import InfoBlock from '@renderer/components/InfoBlock/index.vue'
import { menuFriendArr,menuGroupArr } from './menuList';
import { dragHorizontal } from '../../utils/dragFunc';

const scrollHeight = ref(window.innerHeight - 60)
window.addEventListener('resize',()=>{
    scrollHeight.value = window.innerHeight -60
})
//标记选择的模式，0位好友，1为群聊
const chooseRelationship = ref(0)
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
            <el-scrollbar :max-height="scrollHeight" class="scroll">
                <div class="friend-manage w">好友管理器</div>
                <div class="informs w">
                    <div class="friend-inform">好友通知</div>
                    <div class="group-inform">群通知</div>
                </div>
                <div class="seg-div">
                    <el-segmented :options="['好友','群聊']" class="seg"
                    @change="()=>chooseRelationship = chooseRelationship === 1 ? 0 : 1"
                    ></el-segmented>
                </div>
                <div class="el-collapse-div">
                    <el-collapse class="el-collapse">
                        <div v-if="chooseRelationship === 0">
                            <el-collapse-item :title="item" class="item" v-for="(item,index) in menuFriendArr" :key="index">
                                <InfoBlock v-for="item in 2" class="info-block"></InfoBlock>
                            </el-collapse-item>
                        </div>
                        <div v-else>
                            <el-collapse-item :title="item" class="item" v-for="(item,index) in menuGroupArr" :key="index">
                                <InfoBlock v-for="item in 2" class="info-block"></InfoBlock>
                            </el-collapse-item>
                        </div>
                    </el-collapse>
                </div>
            </el-scrollbar>
        </div>
        <div class="resize" ref="resize"></div>
        <div class="right-view" ref="right">
            <router-view></router-view>
        </div>
    </div>
</template>


<style scoped lang="scss">
.container {
    display: flex;
    width: 100%;
    height: 100vh;
    .right-view {
        height: 100vh;
        flex:1;
        background-color: #f2f2f2;
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
    .left-view {
        float: left;
        .friend-manage {
            display: flex;
            align-items: center;
            justify-content: center;
            border:1px solid #ebebeb;
            margin:10px;
            padding:3px 0;
            font-size: 14px;
            border-radius: 4px;
        }
        .scroll {
            .informs {
                border-bottom: 1px solid #ebebeb;
                .friend-inform ,
                 .group-inform {
                    margin-bottom:10px;
                }
            }
            .seg-div {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top:10px;
                .seg {
                    width: 100%;
                    margin:0 20px;
                }
            }
            .el-collapse-div {
                .el-collapse {
                    border:0;
                    .item {
                        :deep(){
                            .el-collapse-item__header {
                                border:0;
                                padding-left:10px;
                            }
                            .el-collapse-item__wrap {
                                border:0;
                                .el-collapse-item__content {
                                    padding:0;
                                }
                            }
                        }
                    }
                    .info-block:hover {
                        background-color: #f5f5f5;
                    }
                }

            }
        }
    }
    .resize {
        width: 2px;
        height: 100vh;
        float: left;
        cursor: ew-resize;
        background-color: #ededed;
    }
    .right-view {
        float: left;
    }
}
</style>
