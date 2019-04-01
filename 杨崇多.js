/**
 * Created by bawuzhan on 2019/3/28.
 */
#### 都有哪些优化方案

- js css 放在localstorage
- dll 这种文件也可以放在localstorage
- webp
- cdn
- 字体图标
- 离线包 在rn 也是一种方案
- http2 多路复用   首部压缩   服务器推送   二进制


#### pm2 底层还是socket

#### 介绍一下 子进程 主进程 之间的一些事情  比如 文件描述符等等

- 整个启动流程

####  内存缓存

- node启动多个进程，将一个对象缓存在内存中，但是每个进程内容都是独立的，因为缓存内容是比较快的
- 在4个进程有其中一个缓存了，如果请求达到其他进程上，内存还是没有的。

#### 处理方案

- 起一个新的子进程，类似于egg 中的agent，然后更新到其他进程
- 一次性写在本地，然后每个进程读取
- redis 这样也是可以的

#### react

- 1、setState 做了做什么 p处理 具体实现是怎么样的 ？
- 2、哪个生命周期是可以 setState  哪个不可以 setState ？

#### webpack

- dll 是如何实现的，原理是什么 ？
- webpack 多进程是如何处理的，处理了什么问题，为什么开启多个进程就好 ？


#### vue

- diff 算法 如何降低了 时间复杂度 比起之前的 （vue官网有记载） ？

#### fastClick

- 最终处理的方案是  touch

#### 为什么css 比起js 动画要好

- 因为css 是 render树  js 需要使用js 引擎 解析js 然后

#### dishMemory 和 cashMemory 什么区别 ？


/**
 * 技术平台部
 * ☆☆☆☆☆☆☆
 * 任务队列 7~8 个任务队列
 */

/**
 * react  父---> 子通过 props
 *        子---> 父 往子组件中传递函数 子组件中调用函数，将参数传到父组件
 * setState 是异步的 如果多个异步如何处理 ？ promise 是不是可以呢
 * 高阶组件  无状态组件
 */

/**
 * vue 如何通信 vue 是单向数据流
 * https://www.cnblogs.com/tiedaweishao/p/8933153.html
 * 中的event bus
 * 1、emit
 * 2、vuex
 *
 */

// node event时间循环有几个队列 大约7 8个
/**
 * pormise.then
 * setTimeout(() => {

 }, timeout);
 setImmediate
 process.nextTick()
 */
// 意思是回调函数加入事件队列的队尾
// 主线程和事件队列的函数执行完成之后立即执行定时器的回调函数，如果定时器的定时是相同的，就按定时器回调函数的先后顺序来执行。
// setTimeout(() => {
//     console.log('setTimeout');
// }, 0);
// setImmediate(() => {
//     console.log('setImmediate');
// })
// for (let index = 0; index < 10; index++) {
//     setTimeout(() => {
//         console.log('setTimeout');
//     }, 0);
//     setImmediate(() => {
//         console.log('setImmediate');
//     })
// }

// setImmediate()是将事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行setImmediate指定的回调函数，和setTimeout(fn,0)的效果差不多，但是当他们同时在同一个事件循环中时，执行顺序是不定的。另外setTimeout和setImmediate也有一定的区别（还在探索...）

// 父子进程通讯
// on message 事件行为 node events 行为
// 兄弟进程通信 通过 redis 类型的数据库

// react 和vue 都是单项数据流的，vue 是如何实现视图更新 data 更新的？
// angular 是双向的

/**
 * ts中静态检查器
 * vue中的纯静态检查器有什么不同？
 */

/**
 * es6 module
 * require 是同步加载模块 是都可以实现异步加载模块
 * import {  } from "module"; 和webpack中的shak 抖动是否相同
 * 浏览器对于带有type="module"的<script>，都是异步加载
 * 最后，Node 的import命令是异步加载，这一点与浏览器的处理方法相同
 * 陌陌的说是 不同的
 */

/**
 * koa2 （promise.resolve嵌套）和koa1的区别 generator
 *
 */

/**
 * csrf 跨站式 是如何攻击的
 * xss  自己填一些脚本，放在数据库中让 别人也能看到，影响别人
 */

/**
 * 普通的ajax 和 http 什么区别？
 * 跨域的http 和 不跨域的什么区别？
 *
 /**
 * ☆☆☆☆☆☆
 * https://segmentfault.com/a/1190000008677697
 * async await co的概念
 * 和 generator 什么不同？next
 * await 后面是不可跟函数的 ，其他类型的东西也是可以的，number string等等
 * co yield 只能更thunk 函数 和 promise
 *
 */


/**
 * decorate（装饰着模式） 模式的实现和使用场景
 */

/**
 * 6个异步 1，执行完 --> 234并发 5 ，6 依次执行
 * 多个 await  或者 yield就可以了 不在实现
 */

/**
 * webpack 如果引用了一张图片 webpack loader 会将其打包过去
 * 如果是动态计算的你说会打包过去吗？我感觉应该会
 */
/**
 * mongo 语法的使用
 * redis 具体使用类型
 * sql 语法的使用
 */

/**
 * 如何判断主进程和子进程 isMaster
 * 能够自己实现 继承维护之类的行为
 */

/**
 * for of
 * 只能遍历有 遍历器接口的数据结构，如果js 数据类型原生不支持遍历器接口 （Iterator 接口）那就无法使用
 * for in的区别
 * Object.getPrototypeOf 三个的区别
 * 没有这个概念
 * */
// 原生支持 遍历器的接口的 是 没有对象
// Array
// Map
// Set
// String
// TypedArray
// 函数的 arguments 对象
// NodeList 对象
const obj = {
    [Symbol.iterator]: function () {
    return {
        next: function () {
            return {
                value: 1,
                done: true
            };
        }
    };
}
};
var it = obj[Symbol.iterator]();
// 返回一个遍历器对象
console.log(it.next());

// 下面使用遍历器接口 进行比遍历数组 obj 是没有遍历器接口的，所以增加了一个 Symbol.iterator  遍历器接口
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
console.log(iter.next());  // { value: 'a', done: false }
console.log(iter.next()); // { value: 'b', done: false }
console.log(iter.next());// { value: 'c', done: false }
console.log(iter.next());
// 类似数组的 对象调用数组的遍历器接口才是有效果的


// 类原型上的方法 for in
Object.prototype.method = function () {
    console.log(this);
}
var myObject = {
    a: 1,
    b: 2,
    c: 3
}
for (const key in myObject) {
    if (myObject.hasOwnProperty(key)) {
        const element = myObject[key];
        console.log(element);
    }
}
for (var key in myObject) {
    console.log(key);
}

// for of 不会遍历 原型上的方法 for in 是可以遍历原型上可枚举的方法和属性
// getPrototypeOf 获取某个类的原型
// for of（私有的属性） 和getPrototypeOf（原型上的方法 -----☆☆☆☆可枚举的，不可枚举本身也无法比遍历☆☆☆☆）
// for in 私有的和 原型上可枚举的
Array.prototype.method = function () {
    console.log(this.length);
}
var myArray = [1, 2, 4, 5, 6, 7]
myArray.name = "数组";
for (var value of myArray) {
    console.log(value);
}

// 重点
// 对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。


// ☆☆☆☆☆☆☆☆☆☆☆☆
/**
 * react的继承和 extend 有什么不好
 * vue和react中的 minx 的作用 单独在某个类上增加
 */

/**
 * 实现一个继承 extend 子集的方法不能改变父级的方法 继承的多种类型
 * 错误 http://www.jb51.net/article/60499.htm
 * */


// setImmediate(function () {
//   console.log(1);
// }, 0);
// setTimeout HTML5规定setTimeout的最小间隔时间是4ms，也就是说0实际上也会别默认设置为最小值4ms
// setTimeout(function () {
//   console.log(2);
// }, 0);
// new Promise(function (resolve) {
//   console.log(3);
//   resolve();
//   console.log(4);
// }).then(function () {
//   console.log(5);
// });
// console.log(6);
// process.nextTick(function () {
//   console.log(7);
// });
// console.log(8);


/**
 * https://segmentfault.com/a/1190000008595101
 * 宏观任务
 * 微任务
 * setImmediate总是将事件注册到下一轮Event Loop
 * macro-task: script (整体代码)，setTimeout, setInterval, setImmediate, I/O, UI rendering.
 * micro-task: process.nextTick, Promise(原生)，Object.observe，MutationObserver
 */
// setTimeout 最低是4ms 你即使设置了0 也是不行
// var t1 = +new Date();
// setImmediate(function () {
//   console.log('1');
// });
// setTimeout(function () {
//   console.log('2');
// });

// console.log('3');
// var t2 = +new Date();
// console.log('time: ' + (t2 - t1));
//输出
// 3
// time: 23
// 1
// 2

setTimeout(function () { console.log(5) }, 0);
setImmediate(() => {
    console.log('6');
})
new Promise(function (resolve) {
    console.log(1)
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve()
    }
    console.log(2)
}).then(function () {
        console.log(5)
    });
process.nextTick(() => {
    console.log('4');
})
console.log(3);























