/**
 * Created by bawuzhan on 2019/3/1.
 */


//基于commonjs
//编译过程：读入口=>找依赖=>编译=>导出出口

//插件的编写应该放在bin文件中 并用npm init -y初始化，修改入口
//用npm link 链接npm与模块
//在模块中加上#! /usr/bin/env node env  告诉操作系统执行这个脚本 设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
//然后开始编写逻辑代码


let entry='./b.js';//入口文件
let output='./main.js'//出口
let fs=require('fs');
let ejs=require('ejs');
let path=require('fs');
let script=fs.readFileSync(entry,'utf8');
let modules=[];

let styleLoader=function(source){//负责将结果进行更改 更改后继续走
    //source代表的就是样式文件中的内容
    console.log(source)
    return `let style=document.createElement('style');
            style.innerText=${JSON.stringify(source).replace(/\\r\\n/g,'')};
            document.head.appendChild(style);
            `;
}

//处理依赖关系
script.replace(/require\(['"](.+?)['"]\)/g,function(){
    let name=arguments[1];//拿到a.js中 require的名字
    let content=fs.readFileSync(name,'utf8');
    if(/\.css$/.test(name)){
        content=styleLoader(content);
    }
    modules.push({name,content})
    return `require('${name}')`
});


let template=`//模板来自于打包的main.js删除部分代码
(function(modules) { // webpackBootstrap
 	var installedModules = {};
 	function require(moduleId) {//moduleId代表的就是文件名
 		var module = installedModules[moduleId] = {
 			exports: {}
 		};
 		modules[moduleId].call(module.exports, module, module.exports,require);
 		return module.exports;
 	}
 	return require("<%-entry%>");
 })({
  "<%-entry%>":
      (function(module, exports, require) {
          eval(\`<%-script%>\`);
    })
    <%for(let i=0;i<modules.length;i++){//循环引入模块
        let module = modules[i]%>,
        "<%-module.name%>":
        (function(module, exports, require) {
          eval(\`<%-module.content%>\`);
        })
    <%}%>
 });`
let result = ejs.render(template,{
    entry,
    script,
    modules
})
//result为最终打包结果 输出到output文件中
fs.writeFileSync(output,result)
console.log('success')
