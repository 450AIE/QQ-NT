import { ipcRenderer } from "electron"

const fs = {
    /**
     *
     * @param {string} fileData 传递的时候要自己JSON.stringfy()
     * @param {*} path
     * @returns
     */
    writeBaseConfigStoreFiles:(fileData,path)=>ipcRenderer.send('write-baseConfigStore-files',fileData,path),
    /**
     *
     * @returns {string}返回读取的文件，要注意JSON.parse()反序列化
     */
    readBaseConfigStoreFiles:()=>ipcRenderer.invoke('read-baseConfigStore-files')
}


export default fs
