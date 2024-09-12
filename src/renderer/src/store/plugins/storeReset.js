import { cloneDeep } from "lodash"

function storeReset({store}){
    const initalState = cloneDeep(store.$state)
    store.$reset = ()=>store.$patch(cloneDeep(initalState))
}

export default storeReset
