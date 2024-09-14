export function isHasTheWindow(windowStack,windowName){
    for(let i = 0;i<windowStack.length;++i){
        if(windowStack[i].$windowName === windowName){
            return true
        }
    }
    return false
}

export function pushThisWindow(windowStack,windowName,window){
    windowStack.push({
        $windowName:windowName,
        window
    })
}

export function popThisWindow(windowStack,windowName){
    for(let i = 0 ; i<windowStack.length;++i){
        if(windowStack[i].$windowName === windowName){
            windowStack.splice(i,1)
            return
        }
    }
}

export function getWindow(windowStack,windowName){
    for(let i = 0;i<windowStack.length;++i){
        if(windowStack[i].$windowName === windowName){
            return windowStack[i].window
        }
    }
    return false
}
