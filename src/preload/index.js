import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
// const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld('electron', electronAPI)
//     contextBridge.exposeInMainWorld('api', api)
//   } catch (error) {
//     console.error(error)
//   }
// } else {
//   window.electron = electronAPI
//   window.api = api
// }
contextBridge.exposeInMainWorld('ElectronAPI', {
    showManageLeftSubWindow:()=>ipcRenderer.send('create-sub-manage-window'),
    // startFriendSessionWindow:(uid)=>ipcRenderer.send('start-friend-session-window',uid)
    minimize:()=>ipcRenderer.send('minimize'),
    maximize:()=>ipcRenderer.send('maximize'),
    closeWindow:()=>ipcRenderer.send('closeWindow'),
    closeSubManageWindow:()=>ipcRenderer.send('close-sub-manage-window'),
    createSettingGlobalWindow:()=>ipcRenderer.send('create-setting-global-window')
})
