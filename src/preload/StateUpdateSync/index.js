const { ipcRenderer } = require("electron");

const stateUpdateSync = {
    notifyAllWindowUpdatePiniaState:(func,args)=>ipcRenderer.send('notify-others-update-pinia-state',func,args),
    // cb函数内接收函数名和args,args注意要手动JSON.parse()
    onListenerPiniaStateUpdate:(cb)=>ipcRenderer.on('update-pinia-state',cb)
}

export default stateUpdateSync
