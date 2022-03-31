let numberFormat = (n,len=4)=>{
    let nlen = (n+"").length
    if(nlen>= len){
        return ""+n
    }
    let s = ""

    for(let i = 0;i<len-nlen;i++){
        s+="0"
    }
    return s+n

}
let urlParam = function (data) {
    let dataStr = '';
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
    });
    return dataStr
};
let minutesFormat = (minutes)=>{
    if(minutes<60){
        return '00:'+numberFormat(minutes,2)
    }else if(minutes < 24*60){
        let min = minutes % 60
        let hour = parseInt(minutes/60)
        return numberFormat(hour,2)+":"+numberFormat(min,2)
    }
}
export const FormatUtils = {
    numberFormat:numberFormat,
    minutesFormat:minutesFormat,
    urlParam:urlParam
}