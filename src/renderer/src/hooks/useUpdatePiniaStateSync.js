import useBaseConfigStore from "../store/baseConfigStore"

/**
 * 调用onListenerPiniaStateUpdate监听pinia状态更新并且更新本窗口的状态
 */
function useUpdatePiniaStateSync(){
    ElectronAPI.onListenerPiniaStateUpdate(getUpdatedPiniaState)
}

function getUpdatedPiniaState(_,func,args){
    const baseConfigStore = useBaseConfigStore()
    baseConfigStore[func](...JSON.parse(args))
}

export default useUpdatePiniaStateSync
