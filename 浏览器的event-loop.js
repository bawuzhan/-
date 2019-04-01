/**
 * Created by bawuzhan on 2019/3/28.
 */
//JavaScript的运行机制:

//（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
//（2）主线程之外，还存在"任务队列"(task queue)。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
//（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
//（4）主线程不断重复上面的第三步

//调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作


//JavaScript中有两种异步任务:


//宏任务: script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering
//微任务: process.nextTick（Nodejs）, Promises, Object.observe, MutationObserver async/await;

//事件循环(event-loop)是什么？

//主线程从"任务队列"中读取执行事件，这个过程是循环不断的，这个机制被称为事件循环。
//此机制具体如下:主线程会不断从任务队列中按顺序取任务执行，每执行完一个任务都会检查微任务队列是否为空（执行完一个任务的具体标志是函数执行栈为空），如果不为空则会一次性执行完所有微任务。然后再进入下一个循环去任务队列中取下一个任务执行。


//为什么会需要event-loop?
//因为 JavaScript 是单线程的。单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。
// 如果前一个任务耗时很长，后一个任务就不得不一直等着。
// 为了协调事件（event），用户交互（user interaction），脚本（script），渲染（rendering），网络（networking）等，用户代理（user agent）必须使用事件循环（event loops）。

//event-loop循环机制
//1.先执行主线程上的任务（同步代码）
//2.把任务队列中的异步代码放到主线程上
//3.查找微任务，并执行微任务，直到所有文任务执行完毕
//4.回到主任务 执行主任务上的添加的队列中的方法 循环以上的步骤






console.log('script start');

setTimeout(function () {
    console.log('setTimeout---0');
}, 0);

setTimeout(function () {
    console.log('setTimeout---200');
    setTimeout(function () {
        console.log('inner-setTimeout---0');
    });
    Promise.resolve().then(function () {
        console.log('promise5');
    });
}, 0);

setTimeout(function () {
    console.log('setTimeout---01');
}, 0);

Promise.resolve().then(function () {
    console.log('promise1');
}).then(function () {
    console.log('promise2');
});
Promise.resolve().then(function () {
    console.log('promise3');
});
console.log('script end');


//start
//end
//promise1
//promise3
//promise2
//console.log('promise2');
//setTimeout---0
//setTimeout---200
//setTimeout---01
//promise5
//inner-setTimeout---0//第二次添加到主线程 所以最后执行


//以上代码执行步骤
/*
*首先顺序执行完主进程上的同步任务，第一句和最后一句的console.log
 接着遇到setTimeout 0，它的作用是在 0ms 后将回调函数放到宏任务队列中(这个任务在下一次的事件循环中执行)。
 接着遇到setTimeout 200，它的作用是在 200ms 后将回调函数放到宏任务队列中(这个任务在再下一次的事件循环中执行)。
 同步任务执行完之后，首先检查微任务队列, 即 microtask队列，发现此队列不为空，执行第一个promise的then回调，输出 'promise1'，然后执行第二个promise的then回调，输出'promise3'，由于第一个promise的.then()的返回依然是promise，所以第二个.then()会放到microtask队列继续执行，输出 'promise2';
 此时microtask队列为空，进入下一个事件循环, 检查宏任务队列，发现有 setTimeout的回调函数，立即执行回调函数输出 'setTimeout---0',检查microtask 队列，队列为空，进入下一次事件循环.
 检查宏任务队列，发现有 setTimeout的回调函数, 立即执行回调函数输出'setTimeout---200'.
 接着遇到setTimeout 0，它的作用是在 0ms 后将回调函数放到宏任务队列中，检查微任务队列，即 microtask 队列，发现此队列不为空，执行promise的then回调，输出'promise5'。
 此时microtask队列为空，进入下一个事件循环，检查宏任务队列，发现有 setTimeout 的回调函数，立即执行回调函数输出，输出'inner-setTimeout---0'。代码执行结束.
* */
