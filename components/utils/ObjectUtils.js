let arrayIndexByObjKey = (array,key,value)=>{
    if(array){
        for(let index in array){
            if(array[index][key] === value){
                return index
            }
        }
    }
    return -1
}
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
export const ObjectUtils = {
    arrayIndexByObjKey:arrayIndexByObjKey,
    arrayByObjKey:arrayByObjKey
}