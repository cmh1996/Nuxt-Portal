//Unicode转中文汉字
export function decode(str){ 
    str = str.replace(/(\\u)(\w{1,4})/gi,function($0){ 
        return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16))); 
    }); 
    str = str.replace(/(&#x)(\w{1,4});/gi,function($0){ 
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16)); 
    }); 
    str = str.replace(/(&#)(\d{1,6});/gi,function($0){ 
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2"))); 
    }); 
     
    return str; 
}

//转化为00:00时间格式
export function convertTime(seconds){
    return [
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
    ].join(":").replace(/\b(\d)\b/g, "0$1");
}

//进入全屏
export function fullScreen(element){
    //W3C
    if(element.requestFullscreen){
        element.requestFullscreen();
    }
    //FireFox
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
    //Chrome等
    else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
    //IE11
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

export function exitFull(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

export function shuffle(arr){
    for(let i=arr.length-1;i>=0;i--){
        let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = itemAtIndex;
    }
    return arr;
}