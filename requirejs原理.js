/**
 * Created by bawuzhan on 2019/3/1.
 */
//实现require.js核心
let factorys={}
function define(moduleName,dependenties,fn){
    factorys[moduleName]=fn;
    fn.dependenties=dependenties;//把依赖挂载到当前要执行的函数上
}
function require(deps,callback){
    let res=deps.map((dep)=>{//moduleName
        let result;
        let fn=factorys[dep]
        if(fn.dependenties.length>0){//如果有依赖
            require(fn.dependenties,function(){//递归
                result = fn.apply(null,arguments)
            })
        }else{
            result=fn();
        }
        return result
    })
    callback.apply(null,res)
}