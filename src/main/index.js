import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

//存放各个窗口的栈，第一个肯定是主窗口
const windowsStack = []
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        minHeight: 500,
        minWidth: 500,
        // frame:false,
        autoHideMenuBar: true,
        alwaysOnTop: true,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            webSecurity: false,
            sandbox: false
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
ipcMain.on('show-manage-left-sub-window', () => {
    const subWin = new BrowserWindow({
        parent:windowsStack[0],
        width:500,
        height:500,
        center:true,
        resizable:false,
        alwaysOnTop:true,
        modal:true,
        frame:false,
        webPreferences:{
            preload:join(__dirname,'../preload/index.js')
        }
    })
    subWin.loadURL(process.env['ELECTRON_RENDERER_URL']+'/#/sub_options_manage')
    windowsStack.push(subWin)
    subWin.on('closed',()=>{
        windowsStack.pop()
    })
})

//监听关闭，最小化，最大化
ipcMain.on('minimize',()=>windowsStack[0].minimize())
ipcMain.on('maximize',()=>windowsStack[0].maximize())
ipcMain.on('closeApp',()=>windowsStack[0].close())
