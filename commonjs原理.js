/**
 * Created by bawuzhan on 2019/3/1.
 */
let fs=require('fs');
function req(url){
    let content=fs.readFileSync(url,'utf8');//同步
    let module={
        exports:{}
    };
    let fn=new Function('exports','module','__dirname','__filename',content+' \n return module.exports');
    //等价于
    /*let fn=function(exports,module,__dirname,__filename){
        console.log(content)
        eval(content);//module.exports=xxx
        return module.exports;
     }*/
    module.exports=fn(module.exports,module,__dirname,__filename);//拿到引入的文件中的数据并导出
    return module.exports;
}









