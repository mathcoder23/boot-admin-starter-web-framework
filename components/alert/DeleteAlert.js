import {MessageBox} from 'element-ui';

export const DeleteAlert = (vue,name,alert)=>{
    if(name){
        name = `【${name}】`
    }else{
        name = ""
    }
    const h = vue.$createElement;
    let hint = `确认要【删除】${name}信息吗？`
    let list = [
        h('p', {style:'font-size:15px;'}, [h('i',{class:'el-icon-warning'}),h('span',{style:'margin-left:10px'},hint)]),
        h('p', {style: 'color: red;font-size:15px;'}, '*【删除】后数据不可恢复，请谨慎操作！')
    ]
    if(alert && alert.length>0){
        for(let p of alert){
            list.push(h('p', {style: 'color: red;font-size:10px;'}, p))
        }
    }
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
