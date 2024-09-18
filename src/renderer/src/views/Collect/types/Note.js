import { imgReg, srcReg } from '@renderer/utils/regs';
class Note {
    // 暂无
    videoUrlArr = []
    pictureUrlArr = []
    time = undefined
    source = ''
    // 暂未实现
    fileUrlArr = []
    content = null
    title = ''
    constructor(htmlStr,title){
        this.title = title
        this.extractImg(htmlStr)
        this.time = new Date().getTime()
    }
    // 提取其中img的src链接
    extractImg(htmlStr){
        let imgArr = htmlStr.match(imgReg);
        for (let i = 0; i < imgArr.length; i++) {
            let src = imgArr[i].match(srcReg);
             this.pictureUrlArr.push(src[1])
        }
    }
}
export default Note
