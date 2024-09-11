<script setup>
import SubOptionsItemsCard from './components/SubOptionsItemsCard/index.vue'
import {  ref, watch } from 'vue';
import useBaseConfigStore from '../../store/baseConfigStore';
import { storeToRefs } from 'pinia';

const baseConfigStore = useBaseConfigStore()
const {setUpperIconList,setSubOptionsManageList} = baseConfigStore
const {subOptionsManageList,upperIconList} = storeToRefs(baseConfigStore)
const selectedList = ref(subOptionsManageList.value.filter(opt=>opt.status === true))
const unselectedList = ref(subOptionsManageList.value.filter(opt=>opt.status === false))
function exitSubManageWindow(e){
    //确定，将当前的状态保存给subOptionsManageList
    if(e.target.dataset.id === '0'){
        setSubOptionsManageList([...selectedList.value,...unselectedList.value])
        // 用pinia进行传递修改
        // console.log('这是修改后的SubOptionsManageList:',subOptionsManageList.value)
        // console.log('这是要存进去的东西',[...subOptionsManageList.value.map(item=>{
        //     if(item.status) return item.icon
        // })].filter(item=>item!==undefined))

        // 发现了问题所在，upperIconList.value就是问题所在
        setUpperIconList([...selectedList.value.map(item=>item.icon)])
        // console.log('改变后的upperIconList.value:',upperIconList.value)
        //通知左侧项目栏增加图标,改用pinia
        // Bus.emit('changeSubOptions',selectedList.value)
    }
    // ElectronAPI.closeSubManageWindow()
}
//
ElectronAPI.onListenerPiniaStateUpdate((_,func,args)=>{
    // console.log('subManage ipcRender执行,执行的函数是',func,...args)
    baseConfigStore[func](...JSON.parse(args))
})
//监视，数值里status发生变化就放到对应ref数组里
watch(subOptionsManageList,()=>{
    selectedList.value = subOptionsManageList.value.filter(opt=>opt.status === true)
    unselectedList.value = subOptionsManageList.value.filter(opt=>opt.status === false)
},{
    deep:true
})

</script>


<template>
    <div class="container">
        <div class="title ww">侧边栏管理</div>
        <div class="added-items ww">
            <div class="items-title" v-if="selectedList.length > 0">已添加业务</div>
                <div class="items-cards" >
                    <SubOptionsItemsCard  v-for="(item,index) in selectedList"
                    class="card" :key="index" :option="item"   draggable="true"
                    ></SubOptionsItemsCard>
                </div>
            </div>
        <div class="packed-items ww">
            <div class="items-title" v-if="unselectedList.length > 0">已收折业务</div>
            <div class="items-cards">
                <SubOptionsItemsCard  v-for="(item,index) in unselectedList"
                 class="card" :key="index" :option="item" draggable="true"></SubOptionsItemsCard>
            </div>
        </div>
        <div class="btn-div">
            <button class="confirm" data-id="0" @click="exitSubManageWindow">确定</button>
            <button class="cancel" data-id="1" @click="exitSubManageWindow">取消</button>
        </div>
    </div>
</template>


<style scoped lang="scss">
.container {
    position:relative;
    width: 100vw;
    height: 100vh;
    background-color: var(--background-gray1-color);
    .btn-div {
        position:absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 40px;
        .confirm {
            position:absolute;
            width: 65px;
            height: 30px;
            right: 80px;
            bottom: 10px;
            border-radius:3px;
            background-color: $background-blue-color;
            color: #fff;
            outline: none;
            border:1px solid #d0d0d0;
            border:0;
            cursor: pointer;
        }
        .confirm:hover {
            background-color: #008deb;
        }
        .cancel {
            position:absolute;
            width: 65px;
            height: 30px;
            right: 10px;
            bottom: 10px;
            border-radius:3px;
            outline: none;
            border:1px solid #d0d0d0;
            cursor: pointer;
        }
        .cancel {
            background-color: #e9e9e9;
        }
    }
    .ww {
        margin:20px;
        margin-bottom: 0;
    }
    .title {
        font-size: 20px;
        margin-left:40px;
    }
    .added-items,
    .packed-items {
        .items-cards {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            // background-color: orange;
            align-content: center;
            margin-left:20px;
            .card:nth-child(n+6) {
                margin-top:10px;
            }
            .card {
                width: 70px;
                height: 70px;
                flex-shrink: 0;
                background-color: #fff;
                // flex-basis: 20%;
                margin-right:10px;
            }
            .choose-active {
                box-shadow:  0 0 10px 10px #c9c9c9;
            }
        }
    }
    .items-title {
        margin-bottom:10px;
        margin-left:20px;
        font-size:12px;
        color: #b6b6b6;
    }
}
</style>
