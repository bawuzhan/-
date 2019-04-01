/**
 * Created by bawuzhan on 2019/3/25.
 */
//遇到过兼容性问题吗，怎么处理的
//优雅降级和渐进增强

//xhr，fetch，axios 的区别

//xhr原生ajax 不支持promise
//fetch原生 基于promise开发
//axios插件 基于axios的ajax库

//用 promise 实现一个请求超时功能

function delayAjax(url,method,data,delay){
    return new Promise(function(resolve,reject){
        let xhr=new XMLHttpRequest();
        xhr.open(method,url);
        xhr.onreadystatechange= function () {
            if(xhr.readyState==4&&/^2\d{2}/.test(xhr.status)){
                resolve()
            }
        }
        xhr.send(data);
        setTimeout(()=>{
            reject('请求超时');
        },delay)
    })
}

//防抖和节流 (防止事件重复执行频率太快)
function bounce(fn,delay){
    let timer;
    return function () {
        if(timer){
            clearTimeout(timer);
        }
        timer=setTimeout(function () {
            fn();
        },delay)
    }
}
function fn(){

}
window.addEventListener('scroll', debounce(fn, 1000));


function jl(fn,delay){
    let time=new Date().getTime();
    return function () {
        let cur=new Date().getTime();
        if(delay<cur-time){
            fn();
            time=new Date().getTime()
        }
    }
}
function fn(){

}
window.addEventListener('scroll', jl(handle, 1000));




//实现一个类可以完成事件 on, once, trigger, off
function myEvent(){
    this.ary=[];
}
myEvent.prototype.on= function (cb) {
    if(!this.ary.some((item)=>{item==cb})){
        this.ary.push(cb)
    }
}
myEvent.prototype.once= function (cb) {
    let wrapFanc = (...args) => {
        cb.apply(this.args)
        this.off(wrapFanc)
    }
    this.on(wrapFanc)
}
myEvent.prototype.trigger= function () {
    this.ary.forEach((item)=>{
        item();
    })
}
myEvent.prototype.off= function (cb) {
    for(let i=0;i<ary.length;i++){
        if(ary[i]==cb){
            ary.splice(i,1);
            i--;
        }
    }
}

//输入：12345，输出：12,234；输入：2345.6789，输出：2,345.6789
function format(num) {
    let [str,sm] = num.toString().split('.');
    console.log(str)
    str=str.split("").reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev;
    })
    return str+'.'+sm;
}
console.log(format(12345678.1234));

//http 缓存 状态  请求方式
//304原理


//diff 原理

//flex 布局



//webpack 打包优化



//跨域的
jsonp
    cors
        domain+iframe
            postMessage+onMessage
                proxy代理
                    websocket






//你觉得 vue 有哪些特点
    vue是渐进性框架   轻量化
    模块化（单文件组件） 、模块化（webpack一切皆模块）。 灵活（组件复用）  低耦合
    MVVM框架 双向绑定  专注视图  数据响应式变化  不会重复渲染dom  性能高



//用过 git 是吧（ 项目中没用过，自己维护个人 github 用过 ），在项目怎么用 git 知道吗（ 就是分支，合并，合并的时候出现冲突怎么办，没答上来 ）



//假设有这么一张表，学生姓名，课程，成绩，怎么查出每个学生成绩最高的那门课程的成绩
let arr=[{name:'xxx','yw':99,'sx':100},{name:'xxx','yw':99,'sx':94}];
let arr2=[];
for(let i=0;i<arr.length;i++){
    let cur=arr[i]
    let obj={};
    obj.name=cur.name;
    let zg=0;
    for(let key in cur){
        if(typeof cur[key]=='number'){
            if(cur[key]>zg){
                zg=cur[key];
            };
        }
    }
    obj.zg=zg
    arr.push(obj)
}


//因为说了 tcp 是可靠传输，所以他问为什么是可靠传输传输，其实就是三次握手



//数组去重
[...new Set(arr)]
//写一个函数判断是否存在循环引用（没答上来）
function fn(a,b){
    for(let key in a){
        if(a[key]==b){
            for(let key in b){
                if(b[key]==a){
                   return true;
                }
            }
        }
    }
}
//深拷贝
let obj={a:{b:{c:1}}};
let obj1=Object.assign([],obj);
console.log(obj1)
function deep(obj){
    if(typeof obj !=='object'&&!obj){
        return;
    }
    let obj1={};
    function clone(obj1,obj){
        Object.keys(obj).forEach((item)=>{
            obj1[item]=obj[item];
            if(typeof obj[item] =='object'&&obj){
                clone(obj1[item],obj[item])
            }
        })
    }
    clone(obj1,obj);
    return obj1;
}
deep(obj)
//继承，原型链继承怎么实现
子.prototype=new Parent();//子组件的原型链到 父组件的实例上
子.prototype=Object.create(父.prototype);

//promise
function Promise(execure){
    let self=this;
    this.state='pending';
    this.data='';
    this.reason='';
    this.resolveCallbacks=[];
    this.rejectCallbacks=[];
    function resolve(res){
        if(self.state=='pending'){
            self.state='fuilled';
            self.data=res;
            self.resolveCallbacks.forEach((fn)=>{
                fn(self.data);
            })
        }
    }
    function reject(reason){
        if(self.state=='pending'){
            self.state='reject';
            self.reason=reason;
            self.rejectCallbacks.forEach((fn)=>{
                fn(self.reason);
            })
        }
    }
    try{
        execure(reject,reject);
    }catch(e){
        reject(e)
    }
}
Promise.prototype.then=function(onfuilled,onReject){
    let self=this;
    let promise2=new Promise(function (res,rej) {
        typeof onfuilled == 'function' ? null:onfuilled=function(data){return data};
        typeof onReject == 'function' ? null:onReject=function(res){return res};
        if(self.state=='fuilled'){//成功态
            setTimeout(()=>{
                try{
                    let x= onfuilled(self.data)
                    resolvePromise(x,promise2,res,rej)
                }catch(e){
                    rej(e);
                }
            })
        }
        if(self.state=='reject'){//失败态
            setTimeout(()=>{
                try{
                    let x= onReject(self.reason)
                    resolvePromise(x,promise2,res,rej)
                }catch(e){
                    rej(e);
                }
            })
        }
        if(self.state=='pending'){//失败态
            self.resolveCallbacks.push(function () {
                setTimeout(function () {
                    try{
                        console.log(1)
                        let x= onfuilled(self.data)
                        resolvePromise(x,promise2,res,rej)
                    }catch(e){
                        rej(e);
                    }
                })

            })
            self.rejectCallbacks.push(function () {
                setTimeout(function () {
                    try{
                        let x= onReject(self.reason);
                        resolvePromise(x,promise2,res,rej)
                    }catch(e){
                        rej(e);
                    }
                })
            })
        }
    })
    return promise2;
}

function resolvePromise(x,promise,resolve,reject){
    if(x==promise){
        return reject(new Error('重复引用'));
    }
    let changeFlag;
    if((x!=null && typeof x == 'object')||typeof x == 'function'){
        let then = x.then;
        if(then&&typeof then == 'function'){
            try{
                then(function (y) {
                    if(!changeFlag){changeFlag=true}else{return};
                    resolvePromise(y,x,resolve,reject);
                },function(reason){
                    if(!changeFlag){changeFlag=true}else{return};
                    reject(reason)
                })
            }catch(e){
                if(!changeFlag){changeFlag=true}else{return};
                reject(e);
            }
        }else{
            if(!changeFlag){changeFlag=true}else{return};
            resolve(x);
        }
    }else{
        resolve(x);
    }
}

new Promise(function (resolve,reject){
    setTimeout(function () {
        resolve(123)
    })
}).then(function (data) {
        console.log(data);
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve(new Promise(function (resolve,reject) {
                    reject(456)
                }))
            })
        })
}).then(function (data) {
        console.log(data)
    }, function (reason) {
        console.log(reason)
    })





//async 和 await



//webpack


//网络七层协议
应用层 HTTP FTP TFTP SMTP SNMP DNS
表示层 数据的表示、安全、压缩
会话层 建立、管理、终止会话
传输层 TCP UDP

网络层 网络协议
链路层
物理层





//原型链，proto 和 prototype 的区别





//判断数组的方法

//应该有 5 个吧，都说了，然后让说一下不同，Array.isArray() 没说出来，其他的都说了，顺便说了下 instance 的实现原理（上次被问到不会）

//http 和 https 的区别，说了一下传输过程和对称非对称加密


//常见的布局方式，flex 布局三列等宽，flex：1 的意义


//jsonp 的原理
function jsonp(url,params,cb){
    return new Promise((resolve)=>{
        //创建script
        let script=document.createElement('script');
        //拼接src
        params={...params,cb};
        let arr=[];
        for(key in params){
            arr.push(`${key}=${params[key]}`)
        }
        script.src=`${url}?${arr.join('&')}`;
        document.body.appendChild(script);
        //执行 cb
        window[cb]=function(data){
            resolve(data);
            document.body.removeChild(script);
        }
    })
}
jsonp('aaa',{b:123},'cb')

//xss 攻击了解吗，防御方式有哪些（浏览器自带防御，特殊字符转义，哪些特殊字符，黑白名单，csp）
通过script标签注入

//CSRF 原理及防御
通过骗取cookie

rem

let w=document.documentElement.clientWidth||document.body.clientWidth;
w/750=x/100
document.body.style.fontSize=w/750*100+'px';
html{
    font-size:100px;
}
meta name="viewport"
@media all and (max-width: 300px){//小于300时候执行}

http 超文本传输协议  无状态  应用层协议 请求和响应组成
    应用层
    表示层
    会话层
    传输层

    网络层
    链路层
    物理层




    输入网址
    dns服务器解析，找到服务器ip
    tcp链接
    http请求
    服务器处理请求
    返回数据
    浏览器拿到数据
    断开连接
    渲染数据

    三次握手与四次挥手


    请求首部
    响应首部
    通用首部
        请求地址
        请求方式
        请求状态
        服务器ip和端口

    拓展首部
    实体首部
缓存 expires cache-control max-age
    Expires 服务器的缓存过期时间
    Cache-Control:max-age:0没有缓存
    if-modify-since:请求的时间 服务器如果拿到这个时间 如果在这个时间里数据没有变化就返回304，走你本地的缓存

    Expires/Cache-Control Header是控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据。
Last-Modified/If-Modified-Since是浏览器发送请求到服务器后判断文件是否 已经修改过，如果没有修改过就只发送一个304回给浏览器，告诉浏览器直接从自己本地的缓存取数据；如果修改过那就整个数据重新发给浏览器。
http2
    多路复用
    二进制
    header压缩
    服务器推送

跨域
    jsonp
    jsonp是通过script的src属性去加载跨域资源的，所以jsonp请求都是get请求
    get系有的特点jsonp都有
    所有的jspon接口必须含有一个jsonpCallback，否则不是合法的接口
    所有的jsonp接口必须按照固定的格式返回 functionName(/* jsonData */)

    cros

    document.domain + iframe

    postMessage传输数据 onmessage(e)接收数据 e对象中存在需要的数据

    web sockets

















