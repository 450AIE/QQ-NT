<script setup>
import AppOperate from '@renderer/components/AppOperate/index.vue'
import tinymce from 'tinymce';
import { ref } from 'vue';

//控制标题输入的输入框的显示
const titleInpFlag = ref(false)
const titleValue = ref('无标题')
tinymce.init({
    selector:'textarea#tiny-mce',
    height:500,
    plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
})

</script>

<template>
    <AppOperate class="app-operate"/>
    <div class="container">
        <div class="title" v-if="!titleInpFlag" @dblclick="()=>titleInpFlag=true">{{ titleValue || '无标题' }}</div>
        <el-input v-model="titleValue" v-else   class="title-inp" @blur="()=>titleInpFlag=false"/>
        <div class="drag-region"/>
        <div class="editor">
            <textarea id="tiny-mce"></textarea>
        </div>
   </div>
</template>


<style scoped lang="scss">
.app-operate {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
}
.drag-region {
    -webkit-app-region: drag;
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    width: 40%;
    z-index: 3;
}
.container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    .title-inp {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 5px;
        left:50%;
        transform: translateX(-50%);
        width: 300px;
        z-index: 10;
        :deep() {
            .el-input__wrapper {
                .el-input__inner {
                    text-align: center;
                }
            }
        }
    }
    .title {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translateX(-50%);
    }
    .tiny-mce {

    }
}

</style>
