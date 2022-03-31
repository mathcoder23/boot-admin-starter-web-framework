let validateIP = (rule, value, callback) => {
    if(value && "..." === value){
        callback(new Error('请输入IP地址'))
    }if (value && !(/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/).test(value)) {
        callback(new Error('IP地址不规范'))
    } else {
        callback()
    }
}
let validateInteger = (rule, value, callback) =>{
    if (value && !(/^[1-9]\d*$/).test(value)) {
        callback(new Error('只能填写正整数'))
    } else {
        callback()
    }
}
let  validateIDCard = (rule, value, callback) =>{
    if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
        callback(new Error('身份证号码不规范'))
    } else {
        callback()
    }
}
let validateEmail = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请正确填写邮箱'));
    } else {
        if (value !== '') {
            var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(!reg.test(value)){
                callback(new Error('请输入有效的邮箱'));
            }
        }
        callback();
    }
}
let validateMobilePhone = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('手机号不可为空'));
    } else {
        if (value !== '') {
            var reg=/^1[3456789]\d{9}$/;
            if(!reg.test(value)){
                callback(new Error('请输入有效的手机号码'));
            }
        }
        callback();
    }
}
export const ValidatorUtils = {
    validateEmail:validateEmail,
    validateIDCard:validateIDCard,
    validateMobilePhone:validateMobilePhone,
    validateIP:validateIP
}