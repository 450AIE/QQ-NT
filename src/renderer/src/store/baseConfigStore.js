import { defineStore } from 'pinia'
import { ref } from 'vue'
import {isEqual} from 'lodash'


const useBaseConfigStore = defineStore('baseConfigStore',()=>{
    // 是否暗夜模式
    const isDarkTheme = ref(false)
    const setDarkTheme = (flag)=>{
        if(isDarkTheme.value === flag) return false
        isDarkTheme.value = flag
        return true
    }
    const upperFixedIconList = [
        '#icon-xiazai16',
        '#icon-yonghu',
        '#icon-gerenkongjian',
        '#icon-youxi',
        '#icon-diandiandian'
    ]
    // 最左侧图标
    const upperIconList = ref(upperFixedIconList)
    const bottomIconList = ref([
        '#icon-gengduo',
        '#icon-shoucang',
        '#icon-wenjian',
        '#icon-youxiang'
    ])
    // 管理页面，控制左侧是显示哪些图标
    const subOptionsManageList = ref([
        {
            icon:'#icon-QQyinle3',
            text:'QQ音乐',
            status:false
        },
        {
            icon:'#icon-jiqiren',
            text:'机器人',
            status:false
        },
        {
            icon:'#icon-shangwuzixun',
            text:'咨询客服',
            status:false
        },
        {
            icon:'#icon-QQyouxi',
            text:'QQ游戏',
            status:false
        },
        {
            icon:'#icon-AItengxunwendang-01',
            text:'腾讯文档',
            status:false
        },
        {
            icon:'#icon-touping',
            text:'短视频',
            status:false
        }
    ])
    const setSubOptionsManageList=(newList)=>{
        if(isEqual(newList,subOptionsManageList.value)) return false
        subOptionsManageList.value = [...newList]
        return true
    }
    const setUpperIconList = (newIconList)=>{
        const arr = Array.from(new Set([...upperFixedIconList,...newIconList]))
        if(isEqual(arr,upperIconList.value)) return false
        upperIconList.value = arr
        return true
    }
    return {
        isDarkTheme,
        setDarkTheme,
        upperIconList,
        bottomIconList,
        setUpperIconList,
        subOptionsManageList,
        setSubOptionsManageList
    }
},{
    persist:true
})

export default useBaseConfigStore
