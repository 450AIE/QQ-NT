//这个是FriendSession用的，根据鼠标移动调整了下方的高度，因为会话窗口是圣杯布局，会自动调整
export function dragVertical(resizeRef,bottomRef,minHeight,maxHeight){
    resizeRef.value.onmousedown = e=>{
        let startY = e.clientY
        console.log(startY)
        let offsetHeight = bottomRef.value.offsetHeight
        let height = undefined
        document.onmousemove = e=>{
            let endY = e.clientY
            //注意，高度是从上往下算
            let moveLen = startY - endY
            height = offsetHeight + moveLen
            if(height <= minHeight){
                height = minHeight
            }else if(height >= maxHeight){
                height = maxHeight
            }
            bottomRef.value.style.height = height + 'px'
        }
        document.onmouseup = ()=>{
            document.onmousemove = null
            document.onmouseup = null
        }
        return
    }
}

//依旧是圣杯布局
export function dragHorizontal(resizeRef,leftRef,minWidth,maxWidth){
    resizeRef.value.onmousedown = e=>{
        //距离视口左侧的距离
        let startX = e.clientX
        //获取左边元素的宽度，包含padding和margin,每次拖动都应该重新获取
        let offsetWidth = leftRef.value.offsetWidth
        let moveLen = undefined
        document.onmousemove = e=>{
            let endX = e.clientX
            moveLen = endX - startX
            let width = offsetWidth + moveLen
            if(width <= minWidth){
                width = minWidth
            }else if(width >= maxWidth){
                width = maxWidth
            }
            leftRef.value.style.width = width + 'px'
        }
        //松开后解绑事件
        document.onmouseup = ()=>{
            document.onmousemove = null
            document.onmouseup = null
        }
        return
    }
}
