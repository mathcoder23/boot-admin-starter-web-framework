import {MessageBox} from 'element-ui';

export const OptionAlert = (vue,hint)=>{

    const h = vue.$createElement;
    let list = [
        h('p', {style:'font-size:15px;'}, [h('i',{class:'el-icon-warning'}),h('span',{style:'margin-left:10px'},hint)]),
    ]

    return new Promise((resolve,reject)=> {

        vue.$msgbox({
            title:"信息提示",
            message: h('div',{style:'height:150px;display:flex;justify-content: center;align-items: center;'},[
                h('div', {style:'text-align:center;'}, list)]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(action => {
            console.log(action)
            if('confirm' === action){
                resolve()
            }else{
                reject()
            }
        });

    })

}
