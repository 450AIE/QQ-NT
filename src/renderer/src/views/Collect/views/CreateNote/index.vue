<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { DomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { shallowRef } from 'vue';
import AppOperate from '@renderer/components/AppOperate/index.vue'
import { ref } from 'vue';
import { onBeforeUnmount } from 'vue';

//控制标题输入的输入框的显示
const titleInpFlag = ref(false)
const titleValue = ref('无标题')
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('<p>hello</p>')
const toolbarConfig = {
    excludeKeys:[
        'header1',
        'header2',
        'header3',
        'through',
        'color',
        'clearStyle',
        'bgColor',
        'undo',
        'redo',
        'fullScreen'
    ]
}
const editorConfig = {
    MENU_CONF:{
        uploadImage:{
            customInsert(res,insertFn){

            }
        }
    }
 }
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

</script>


<template>
    <AppOperate class="app-operate"/>
    <div class="container">
            <div class="title" v-if="!titleInpFlag" @dblclick="()=>titleInpFlag=true">{{ titleValue || '无标题' }}</div>
            <el-input v-model="titleValue" v-else   class="title-inp" @blur="()=>titleInpFlag=false"/>
        <div class="drag-region"/>
        <Toolbar
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            mode="simple"
            class="tool-bar"
          />
          <Editor
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            mode="simple"
            @onCreated="handleCreated"
            class="editor"
          />
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
    .editor {
        flex:1;
        width: 100%;
    }
    .tool-bar {
        width: 100%;
        padding-bottom:10px;
        margin-top:45px;
        border-bottom: 1px solid #ccc
    }
}

</style>
