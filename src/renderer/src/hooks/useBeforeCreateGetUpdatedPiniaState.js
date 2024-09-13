import useBaseConfigStore from "../store/baseConfigStore"

/**
 * 当窗口创建时，使用这个钩子，会自动获取最新的pinia状态来更新,
 */
function useBeforeCreateGetUpdatedPiniaState(){
    ElectronAPI.notifyAllWindowsNewWindowCreated()
    ElectronAPI.onceListenerToGetUpdatedPiniaState(getUpdatedPiniaState)
}
/**
 * 调用该store内的所有set方法修改数据，这里暂时都是baseConfigStore
 * @param {json} jsonStore
 */
function getUpdatedPiniaState(_,jsonStore){
    const baseConfigStore = useBaseConfigStore()
    const store = JSON.parse(jsonStore)
    console.log('之前',baseConfigStore)
    for(let key in baseConfigStore){
        if(baseConfigStore.hasOwnProperty(key)){
            // 调用set函数修改state
            if(key.startsWith('set') && typeof baseConfigStore[key] === 'function'){
                // 获取变量名，没有首字母
                const dataNameWithoutFirstChar = key.slice(4)
                // 获取首字母
                const dataNameFirstChar = key.slice(3,4).toLowerCase()
                const dataName = dataNameFirstChar + dataNameWithoutFirstChar
                console.log('变量名为:',dataName)
                console.log('变量为:',baseConfigStore[dataName])
                console.log('函数为:',key)
                baseConfigStore[key](store[dataName])
            }
        }
    }
    console.log('之后',baseConfigStore)
}

export default useBeforeCreateGetUpdatedPiniaState
