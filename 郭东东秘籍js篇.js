//原型 / 构造函数 / 实例
    //每个实例都包含一个__proto__属性，指向所属类的原型，原型链查找通过__proto__属性实现
    //每个函数都包含一个prototype属性，指向自己的原型，原型上有一个constructor的属性指向函数本身，

//原型链：
   //查找机制，通过__proto__向上查找  先找私有属性，再找公有属性，都没有就通过 __proto__向父级一层一层查找，都没有就是undefined

//函数的继承
    //使用 ES6 的语法糖 class / extends


//作用域链 块级作用域  let const 闭包


//script 引入方式：静态标签 动态插入

//对象的拷贝 4种方式
    // Object.assign()
    // 深拷贝原理 递归判断
    // JSON.parse(JSON.stringify(Obj)); 性能最快
    //{...obj}; //浅拷贝

//new运算符的执行过程
    //生成一个新对象（实例）
    //链接到原型obj.__proto__ = Con.prototype
    //函数中绑定this 指向实例
    //返回新对象(如果构造函数有自己 retrun 时，则返回该值)



//js代码运行机制event-loop
    //主线程 同步  异步操作的任务队列setTimeout ajax 事件操作   微任务promise、async/await
    //先执行主线程  执行后 就先清空  把任务队列的任务添加到主线程中 先执行微任务 全部执行结束后 执行异步的任务，重复循环每一个异步中的处理


//数据类型的判断
    ({}) instanceof  Object;  //判断是不是属于类,不能判断基本数据类型 能在实例的 原型对象链 中找到该构造函数的prototype属性所指向的 原型对象，就返回true
    typeof [] == 'object'; //返回字符串类型的值
    ([]).constructor === Array// 每一个对象实例都可以通过 constrcutor 对象访问它的构造函数
    Object.prototype.toString.call([])=='[object Array]'//注意后边的是有用的并且首字母大写
    Array.isArray([])//判断数组

//怎样实现代码的复用
    //函数封装
    //继承
    //复制extend
    //混入mixin
    //借用apply/call

//模块化
    //es6: import / export
    //commonjs: require / module.exports / exports
    //amd: require / defined

//require与import的区别
    //require支持 动态导入，import不支持，正在提案 (babel 下可支持)
    //require是 同步 导入，import属于 异步 导入
    //require是 值拷贝，导出值变化不会影响导入值；import指向 内存地址，导入值会随导出值而变化

//防抖与节流(高频触发优化方式) 添加了立即执行的功能  每隔 100~500 ms执行一次即可
function debounce(fn, wait, immediate) {
    let timer = null
    return function() {
        let args = arguments
        let context = this
        if (immediate && !timer) {
            fn.apply(context, args)
        }
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
                fn.apply(context, args)
        }, wait)
    }
}

function throttle(fn, wait, immediate) {
    let timer = null
    let callNow = immediate

    return function() {
        let context = this,
            args = arguments

        if (callNow) {
            fn.apply(context, args)
            callNow = false
        }

        if (!timer) {
            timer = setTimeout(() => {
                    fn.apply(context, args)
                    timer = null
            }, wait)
        }
    }
}
//this问题 改变this的指向call apply bind

//es6的api
    //let const
    //解构赋值
    //class/extend super
    //set/map
    //Promise的使用与实现
    //generator
    //await / async: 是generator的语法糖， babel中是基于promise实现

//抽象语法树 AST
//将代码逐字母解析成 树状对象 的形式。这是语言之间的转换、代码语法检查，代码风格检查，代码格式化，代码高亮，代码错误提示，代码自动补全等等的基础。


//babel编译原理
    //babylon 将 ES6/ES7 代码解析成 AST
    //babel-traverse 对 AST 进行遍历转译，得到新的 AST
    //新 AST 通过 babel-generator 转换成 ES5

//函数柯里化与组合函数
function currying(fn){
    let args=[].slice.call(arguments,1);
    return function () {
        let _args=[].slice.call(arguments,0);
        fn.apply(null,args.concat(_args))
    }
}

function add(a,b){
    console.log(a+b)
    return a+b;
}
currying(add, 1)(2);
function compose(){
    let fnList=[].slice.call(arguments,0);
    let last=fnList.pop();
    fnList.reverse();
    return function () {
        let arg=[].slice.call(arguments);
        fnList.reduce(function (prev,next) {
            return next(prev);
        },last.apply(null,arg))
    }
}

function fn1(data){
    console.log(data+1);
}
function fn2(data){
    console.log(data+1);
    return data+1
}
function fn3(a,ba,c){
    console.log(a+ba+c);
    return a+ba+c
}
compose(fn1,fn2,fn3)(1,2,3);
//数组
//forEach: 无法break，可以用try/catch中throw new Error来停止
//[1,[2,3]] --> [1, 2, 3]
Array.prototype.flat= function () {
    return new Array([1,[2,3]].toString());
}
Array.prototype.flat = function() {
    return this.toString().split(',').map(item => +item )
}

//跨域
    //jsonp
    //cors跨站资源共享
    //postmessage
    //window.domain
    //proxy代理
    //websocket




/*-------------------------------------------浏览器----------------------------------------------------------------*/




//浏览器下事件循环(Event Loop)
    //事件循环是指: 执行一个宏任务，然后执行清空微任务列表，循环再执行宏任务，再清微任务列表
    //微任务 microtask(jobs): promise / async / await / nextTick
    //宏任务 macrotask(task): setTimout / script / IO / UI Rendering

//从输入 url 到展示的过程
    //DNS 解析  通过网址解析到ip
    //TCP 三次握手
    //发送请求，分析 url，设置请求报文(头，主体)
    //服务器返回请求的文件 (html)
    //浏览器渲染（解析流程） DOM Tree==》 Style Tree==》 Render Tree==》layout
        //HTML parser --> DOM Tree
        //标记化算法，进行元素状态的标记
        //dom 树构建
        //CSS parser --> Style Tree
        //解析 css 代码，生成样式树
        //attachment --> Render Tree
        //结合 dom树 与 style树，生成渲染树
        //layout: 布局
        //GPU painting: 像素绘制页面

//重绘与回流
    //重绘(repaint): 当元素样式的改变不影响布局时，浏览器将使用重绘对元素进行更新，此时由于只需要UI层面的重新像素绘制，因此 损耗较少
    //回流(reflow): 当元素的尺寸、结构或触发某些属性时，浏览器会重新渲染页面，称为回流。此时，浏览器需要重新经过计算，计算后还需要重新页面布局，因此是较重的操作。

//回流优化  documentFragment文档碎片
    //将动画效果应用到position属性为absolute或fixed的元素上
    //避免频繁操作样式，可汇总后统一 一次修改
    //尽量使用class进行样式修改
    //减少dom的增删次数，可使用 字符串 或者 documentFragment 一次性插入

//存储  短暂性存储 和 持久性储存。
    //cookie: 通常用于存储用户身份，登录状态等
    //http 中自动携带， 体积上限为 4K， 可自行设置过期时间
    // Expires缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点  受本地时间影响
    //  Cache-control:max-age=3600 指定一个时间长度，在这个时间段内缓存是有效的，单位是s
    //localStorage / sessionStorage: 长久储存/窗口关闭删除， 体积限制为 4~5M

//V8垃圾回收机制
    //将内存中不再使用的数据进行清理，释放出内存空间。V8 将内存分成 新生代空间 和 老生代空间。
    //新生代内存空间主要用来存放存活时间较短的对象，老生代内存空间主要用来存放存活时间较长的对象。对于垃圾回收，新生代和老生代有各自不同的策略


//内存泄露(回收不掉)
    //意外的全局变量: 无法被回收
    //定时器: 未被正确关闭，导致所引用的外部变量无法被释放
    //事件监听: 没有正确销毁 (低版本浏览器可能出现)
    //闭包: 会导致父级中的变量无法被释放
    //dom 引用: dom 元素被删除时，内存中的引用未被正确清空




/*----------------------------------------------服务端与网络------------------------------------------------------------*/
//http/https 协议

//http
    // 无状态协议：无法复用链接，完成即断开,一次只能进行一次http事务
    //端口80
//http2.0
    //多路复用
    //二进制分帧层: 应用层和传输层之间
    //首部压缩
    //服务端推送
//https: 较为安全的网络传输协议
    //证书(公钥)
    //SSL 加密
    //端口 443

//关于tcp （安全的协议）

    //链接的三次握手
    //断开的四次挥手

//缓存策略: 可分为 强缓存 和 协商缓存
    //强缓存
    //Cache-Control/Expires: 浏览器判断缓存是否过期，未过期时，直接使用强缓存，Cache-Control的 max-age 优先级高于 Expires
    //当缓存已经过期时，使用协商缓存
    //协商缓存
    //唯一标识方案: Etag&if-None-Match  服务器对比标识一致就走缓存
    //最后一次修改时间:Last-Modified(response) & If-Modified-Since 服务器对比时间如果资源没变就返回304

//last-modify的缺点
    //周期性修改，但内容未变时，会导致缓存失效
    //最小粒度只到 s， s 以内的改动无法检测到

//常见状态码
    //1xx: 接受，继续处理
    //200: 成功，并返回数据
    //201: 已创建
    //202: 已接受
    //203: 成为，但未授权
    //204: 成功，无内容
    //205: 成功，重置内容
    //206: 成功，部分内容
    //301: 永久移动，重定向
    //302: 临时移动，可使用原有URI
    //304: 资源未修改，可使用缓存
    //305: 需代理访问
    //400: 请求语法错误
    //401: 要求身份认证
    //403: 拒绝请求
    //404: 资源不存在
    //500: 服务器错误

//get / post对比（get有delete head get options）（post put trace）
//缓存  安全  大小限制  可见



//node的event-loop的六个阶段
    //timer 阶段: 执行到期的setTimeout / setInterval队列回调
    //I/O 阶段: 执行上轮循环残流的callback
    //idle, prepare
    //poll: 等待回调
    //    执行回调
    //    执行定时器
    //    如有到期的setTimeout / setInterval， 则返回 timer 阶段
    //    如有setImmediate，则前往 check 阶段
    //check
    //    执行setImmediate
    //close callbacks


//安全相关
    //XSS攻击: 注入恶意代码
        //cookie 设置 httpOnly
        //转义页面上的输入内容和输出内容
    //CSRF: 跨站请求伪造，防护:
        //get 不修改数据
        //不被第三方网站访问到用户的 cookie
        //设置白名单，不被第三方网站请求
        //请求校验

//vue对生命周期的理解
    //Vue.prototype._init_方法
    //    合并所有的options挂载到vm.$option上
    //    initLifecycle/Event，往vm上挂载各种(生命周期函数、初始化事件)
    //    callHook: beforeCreated: 实例刚创建
    //    initInjection/initState: 初始化注入prop/data/computed/method/watch和 data 响应性
    //    created: 创建完成，属性已经绑定， 但还未生成真实dom
    //    进行元素的挂载： $el / vm.$mount()
    //    是否有template: 解析成render function
    //        *.vue文件: vue-loader会将<template>编译成render function
    //    beforeMount: 模板编译/挂载之前
    //    执行render function，生成真实的dom，并替换到dom tree中
    //    mounted: 组件已挂载
    //update阶段
    //
    //    执行diff算法，比对改变是否需要触发UI更新
    //    flushScheduleQueue
    //        watcher.before: 触发beforeUpdate钩子		- watcher.run(): 执行watcher中的 notify，通知所有依赖项更新UI
    //    触发updated钩子: 组件已更新
    //
    //actived / deactivated(keep-alive): 不销毁，缓存，组件激活与失活
    //destroy阶段
    //    beforeDestroy: 销毁开始
    //    销毁自身且递归销毁子组件以及事件监听
    //        remove(): 删除节点
    //        watcher.teardown(): 清空依赖
    //        vm.$off(): 解绑监听
    //    destroyed: 完成后触发钩子



//数据响应的原理
observe
compiler
watcher
dep



//virtual dom 原理实现
html-template
createElement()
render()






//new Vue的时候vue都做了什么
执行Vue.prototype._init_
创建实例
    合并所有的属性，把所有属性包装到$options上
    初始化钩子函数、事件

属性绑定Created
    初始化数据data 并把data包装成一个函数
    监听data响应式用__ob__作为标识
    初始化所有的属性 如props computed/method/watch等属性
最后把实例挂载到$el上beforeMount  mounted



//Proxy 相比于 defineProperty 的优势
数组



//vue-router的使用



//vuex的使用




//算法


