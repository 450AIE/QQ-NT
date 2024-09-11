import { ipcRenderer } from "electron"

const fs = {
    /**
     *
     * @param {*} fileData 会自动序列化
     * @param {*} path
     * @returns
     */
    writeBaseConfigStoreFiles:(fileData,path)=>ipcRenderer.send('write-baseConfigStore-files',fileData,path),
    readBaseConfigStoreFiles:()=>ipcRenderer.invoke('read-baseConfigStore-files')
}


export default fs
