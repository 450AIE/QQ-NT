<script setup>
import { Search , Plus } from '@element-plus/icons-vue';
defineProps({
    withIcon:{
        required:false,
        type:Boolean,
        default:true
    }
})

</script>


<template>
   <div class="search w">
        <el-input placeholder="搜索" class="inp" :prefix-icon="Search" />
        <div class="plus-icon-div" v-if="WithIcon">
            <el-icon class="plus-icon"><Plus /></el-icon>
        </div>
    </div>
</template>


<style scoped lang="scss">
.search {
        background-color: #fff;
        display: flex;
        padding-top:10px;
        align-items: center;
        height: 70px;
        border-bottom:1px solid #ebebeb;
        -webkit-app-region: drag;
        .plus-icon-div {
            display: flex;
            width: 30px;
            height: 30px;
            justify-content: center;
            align-items: center;
            background-color: var(--background-gray2-color);
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
</style>
