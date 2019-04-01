/**
 * Created by bawuzhan on 2019/3/1.
 */
//ʵ��require.js����
let factorys={}
function define(moduleName,dependenties,fn){
    factorys[moduleName]=fn;
    fn.dependenties=dependenties;//���������ص���ǰҪִ�еĺ�����
}
function require(deps,callback){
    let res=deps.map((dep)=>{//moduleName
        let result;
        let fn=factorys[dep]
        if(fn.dependenties.length>0){//���������
            require(fn.dependenties,function(){//�ݹ�
                result = fn.apply(null,arguments)
            })
        }else{
            result=fn();
        }
        return result
    })
    callback.apply(null,res)
}