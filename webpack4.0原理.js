/**
 * Created by bawuzhan on 2019/3/1.
 */


//����commonjs
//������̣������=>������=>����=>��������

//����ı�дӦ�÷���bin�ļ��� ����npm init -y��ʼ�����޸����
//��npm link ����npm��ģ��
//��ģ���м���#! /usr/bin/env node env  ���߲���ϵͳִ������ű� ���������node�İ�װ·�����ٵ��ö�Ӧ·���µĽ�����������ɲ�����
//Ȼ��ʼ��д�߼�����


let entry='./b.js';//����ļ�
let output='./main.js'//����
let fs=require('fs');
let ejs=require('ejs');
let path=require('fs');
let script=fs.readFileSync(entry,'utf8');
let modules=[];

let styleLoader=function(source){//���𽫽�����и��� ���ĺ������
    //source����ľ�����ʽ�ļ��е�����
    console.log(source)
    return `let style=document.createElement('style');
            style.innerText=${JSON.stringify(source).replace(/\\r\\n/g,'')};
            document.head.appendChild(style);
            `;
}

//����������ϵ
script.replace(/require\(['"](.+?)['"]\)/g,function(){
    let name=arguments[1];//�õ�a.js�� require������
    let content=fs.readFileSync(name,'utf8');
    if(/\.css$/.test(name)){
        content=styleLoader(content);
    }
    modules.push({name,content})
    return `require('${name}')`
});


let template=`//ģ�������ڴ����main.jsɾ�����ִ���
(function(modules) { // webpackBootstrap
 	var installedModules = {};
 	function require(moduleId) {//moduleId����ľ����ļ���
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
    <%for(let i=0;i<modules.length;i++){//ѭ������ģ��
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
//resultΪ���մ����� �����output�ļ���
fs.writeFileSync(output,result)
console.log('success')
