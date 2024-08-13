<script setup>
import { onMounted, ref } from 'vue';

const scrollHeight = ref(window.innerHeight - 60)
const resizeRef = ref(null)
const bottomRef = ref(null)
const inpMsg = ref('')
onMounted(()=>{
    resizeRef.value.onmousedown = e=>{
        let startY = e.clientY
        console.log(startY)
        let offsetHeight = bottomRef.value.offsetHeight
        let height = undefined
        document.onmousemove = e=>{
            let endY = e.clientY
            console.log(endY)
            //注意，高度是从上往下算
            let moveLen = startY - endY
            height = offsetHeight + moveLen
            if(height <= 120){
                height = 120
            }else if(height >= 400){
                height = 400
            }
            bottomRef.value.style.height = height + 'px'
        }
        document.onmouseup = e=>{
            document.onmousemove = null
            document.onmouseup = null
        }
        return
    }
})
</script>


<template>
    <div class="container">
        <div class="top ww">
            <div class="username">TH</div>
            <div class="icon" v-for="itme in 6"></div>
        </div>
        <div class="session-window">
                <el-scrollbar>

                </el-scrollbar>
            </div>
        <div class="resize" ref="resizeRef"></div>
        <div class="bottom" ref="bottomRef">
            <div class="bottom-operate ww">
                <div class="icon" v-for="item in 6"></div>
            </div>
                <textarea  class="msg-inp ww"></textarea>
            <div class="bottom-btn-div">
                <button class="bottom-btn"></button>
                <span class="arrow">
                    <!--这里需要放一个字体图标向下的箭头，然后用旋转控制-->
                </span>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 100%;
    height: 100vh;
    background-color: #f2f2f2;
    .resize {
        height: 3px;
        width: 100%;
        cursor: s-resize;
        background-color: orange;
    }
    .ww {
        padding: 0 20px;
    }
    .session-window {
        flex:1;
    }
    .bottom {
        position:relative;
        display: flex;
        flex-direction: column;
        min-height: 120px;
        max-height:400px;
        height: 100px;
        border-top:2px solid #ebebeb;
        .bottom-operate {
            display: flex;
            align-items: center;
            top: 0;
            left: 0;
            height: 30px;
            .icon {
                height: 20px;
                width: 20px;
                flex-shrink: 0;
                background-color: #fff;
                border-radius:5px;
                margin-right:15px;
            }
        }
        .bottom-btn-div {
            display: flex;
            position:relative;
            height: 40px;
            align-items: center;
            margin-bottom:5px;
            .bottom-btn {
                position: absolute;
                width: 100px;
                height: 25px;
                right: 20px;
                outline: none;
                border:0;
                border-radius: 4px;
                background-color: #0099ff;
                cursor: pointer;
            }
            .bottom-btn::before {
                content: '发送';
                position: absolute;
                left: 16px;
                top:50%;
                transform: translateY(-50%);
                font-size: 14px;
                color:#fff;
            }
            .bottom-btn::after {
                content:'|';
                position: absolute;
                left: 60px;
                top:50%;
                transform: translateY(-50%);
                font-size: 14px;
                color:#80ccff;
            }
            .arrow {

            }
        }
        .msg-inp {
            outline: none;
            border: 0;
            resize: none;
            width: 100%;
            flex:1;
            font-size: 16px;
            font-family: 'Microsoft YaHei';
            background-color: #f2f2f2;
        }
    }
    .top {
        display: flex;
        height: 60px;
        border-bottom: 2px solid #ebebeb;
        align-items: center;
        justify-content: space-between;
        .username {
            width: 100%;
        }
        .icon {
            height: 20px;
            width: 20px;
            flex-shrink: 0;
            background-color: white;
            border-radius: 5px;
            margin-left: 10px;
        }
    }
}
</style>
