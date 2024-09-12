import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import fs from 'fs/promises'
import {resolve} from 'path'
//存放各个窗口的栈，第一个肯定是主窗口
const windowsStack = []
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        minHeight: 500,
        minWidth: 400,
        frame:false,
        autoHideMenuBar: true,
        alwaysOnTop: true,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
        }
    })
    windowsStack.push(mainWindow)
    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
        console.log('这个是electron渲染进程所在的URL',process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// // In this file you can include the rest of your app"s specific main process
// // code. You can also put them in separate files and require them here.

//开启某个好友的对话窗口



//展现侧边栏设置窗口
ipcMain.on('create-sub-manage-window', () => {
    const subWin = new BrowserWindow({
        parent:windowsStack[windowsStack.length - 1],
        width:500,
        height:500,
        resizable:false,
        alwaysOnTop:true,
        show: false,
        // modal:true,
        frame:false,
        webPreferences:{
            preload:join(__dirname,'../preload/index.js'),
        }
    })
    if (is.dev && process.env['ELECTRON_RENDERER_URL']){
        subWin.loadURL(process.env['ELECTRON_RENDERER_URL']+'/#/sub_options_manage')
    }else{
        subWin.loadFile(join(__dirname, '../renderer/index.html'),{hash:'sub_options_manage'})
    }
    subWin.on('ready-to-show', () => {
        subWin.show()
    })
    windowsStack.push(subWin)
    subWin.on('closed',()=>{
        windowsStack.pop()
    })
})
//关闭侧边栏设置窗口
ipcMain.on('close-sub-manage-window',()=>windowsStack[windowsStack.length - 1].destroy())

//监听关闭，最小化，最大化
ipcMain.on('minimize',()=>BrowserWindow.getFocusedWindow().minimize())
ipcMain.on('maximize',()=>{
    if(BrowserWindow.getFocusedWindow().isMaximized()){
        BrowserWindow.getFocusedWindow().restore()
    }else{
        BrowserWindow.getFocusedWindow().maximize()
    }
})
//只剩一个页面了会退出app
ipcMain.on('closeWindow',()=>BrowserWindow.getFocusedWindow().close())
//进入设置界面
ipcMain.on('create-setting-global-window',()=>{
    const settingWin = new BrowserWindow({
        parent:windowsStack[windowsStack.length - 1],
        width:700,
        height:800,
        minWidth:700,
        show: false,
        minHeight:800,
        resizable:true,
        alwaysOnTop:true,
        frame:false,
        webPreferences:{
            preload:join(__dirname,'../preload/index.js')
        }
    })
    if (is.dev && process.env['ELECTRON_RENDERER_URL']){
        settingWin.loadURL(process.env['ELECTRON_RENDERER_URL']+'/#/setting_global')
    }else{
        settingWin.loadFile(join(__dirname, '../renderer/index.html'),{hash:'setting_global'})
    }
    settingWin.on('ready-to-show', () => {
        settingWin.show()
    })
    windowsStack.push(settingWin)
    settingWin.on('closed',()=>{
        windowsStack.pop()
    })
})
// 创建收藏页面
ipcMain.on('create-collect-window',()=>{
    const collectWin = new BrowserWindow({
        parent:windowsStack[windowsStack.length - 1],
        width:1000,
        height:800,
        minWidth:700,
        show: false,
        minHeight:800,
        resizable:true,
        alwaysOnTop:true,
        frame:false,
        webPreferences:{
            preload:join(__dirname,'../preload/index.js')
        }
    })
    if (is.dev && process.env['ELECTRON_RENDERER_URL']){
        collectWin.loadURL(process.env['ELECTRON_RENDERER_URL']+'/#/collect')
    }else{
        collectWin.loadFile(join(__dirname, '../renderer/index.html'),{hash:'collect'})
    }
    collectWin.on('ready-to-show', () => {
        collectWin.show()
    })
    windowsStack.push(collectWin)
    collectWin.on('closed',()=>{
        windowsStack.pop()
    })
})

ipcMain.on('create-create-note-window',()=>{
    const createNoteWin = new BrowserWindow({
        parent:windowsStack[windowsStack.length - 1],
        width:1000,
        height:800,
        minWidth:700,
        show: false,
        minHeight:800,
        resizable:true,
        alwaysOnTop:true,
        frame:false,
        webPreferences:{
            preload:join(__dirname,'../preload/index.js')
        }
    })
    if (is.dev && process.env['ELECTRON_RENDERER_URL']){
        createNoteWin.loadURL(process.env['ELECTRON_RENDERER_URL']+'/#/create_note')
    }else{
        createNoteWin.loadFile(join(__dirname, '../renderer/index.html'),{hash:'create_note'})
    }
    createNoteWin.on('ready-to-show', () => {
        createNoteWin.show()
    })
    windowsStack.push(createNoteWin)
    createNoteWin.on('closed',()=>{
        windowsStack.pop()
    })
})
/**
 * func是触发更新的函数，args是形参，相当于把触发pinia状态更新的函数传递了过来
 */
ipcMain.on('notify-others-update-pinia-state',(_,func,args)=>{
    windowsStack.forEach(win=>{
        win.webContents.send('update-pinia-state',func,args)
    })
})
ipcMain.on('write-baseConfigStore-files',(_,fileData,path)=>{
    try {
        // console.log(resolve(__dirname,'./baseConfigStore.json'))
        // console.log(resolve(app.getPath('userData'),'./baseConfigStore.json'))
        return fs.writeFile(resolve(app.getPath('userData'),'./baseConfigStore.json'),fileData,'utf-8')
    } catch (error) {
        console.dir(error)
    }
})
ipcMain.handle('read-baseConfigStore-files',()=>{
    try {
        return fs.readFile(resolve(app.getPath('userData'),'./baseConfigStore.json'),'utf-8')
    } catch (error) {
        console.dir(error)
    }
})
