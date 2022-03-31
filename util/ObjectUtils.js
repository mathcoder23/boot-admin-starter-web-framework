
let arrayByObjKey = (array,key,value)=>{
    if(array){
        for(let index in array){
            if(array[index][key] === value){
                return array[index]
            }
        }
    }
    return null
}
let arrayInsertByValueAfter = (array,key,value,list)=>{
    if(Array.isArray(array) && Array.isArray(list)){
        let location = -1
        for(let i = 0;i<array.length;i++){
            if(array[i][key] === value){
                location = i+1
            }
        }
        if(-1 !== location){
            for(let i = 0;i<list.length;i++){
                array.splice(location+i,0,list[i])
            }

        }
    }
}
let arrayDeleteByValue = (array,key,value)=>{
    if(Array.isArray(array)){
        let location =[]
        for(let i = 0;i<array.length;i++){
            if(Array.isArray(array[i][key])){
                for(let v of array[i][key]){
                    if(value === v){
                        location.push(i)
                    }
                }
            }else{
                if(array[i][key] === value){
                    location.push(i)
                }
            }

        }
       if(location.length>0){
           let index = 0
           for(let i of location){
               array.splice(i-index,1)
               index++
           }
       }
    }
}
let formatInteger = (num, length) =>{
    return (num / Math.pow(10, length)).toFixed(length).substr(2);
}
export const ObjectUtils = {
    formatInteger:formatInteger,
    arrayByObjKey:arrayByObjKey
    ,arrayInsertByValueAfter:arrayInsertByValueAfter
    ,arrayDeleteByValue:arrayDeleteByValue
}