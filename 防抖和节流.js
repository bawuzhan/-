/**
 * Created by bawuzhan on 2019/3/26.
 */
解决的问题
/*防抖和节流是针对响应跟不上触发频率这类问题的两种解决方案。 在给DOM绑定事件时，有些事件我们是无法控制触发频率的。 如鼠标移动事件onmousemove, 滚动滚动条事件onscroll，窗口大小改变事件onresize，瞬间的操作都会导致这些事件会被高频触发。 如果事件的回调函数较为复杂，就会导致响应跟不上触发，出现页面卡顿，假死现象。*/

//防抖 特点是当事件快速连续不断触发时，动作只会执行一次。
function debounce(fn, wait) {
    var timeout = null;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}
// 处理函数
function handle() {
    console.log(Math.random());
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));





//节流 特点是当事件快速连续不断触发时  每一秒执行一次
var throttle = function(func, delay) {
    var timer = null;
    var startTime = Date.now();
    return function() {
        var curTime = Date.now();
        var context = this;
        var args = arguments;
        if (curTime - startTime >= delay) {
            func.apply(context, args);
            startTime = Date.now();
        }
    }
}
function handle() {
    console.log(Math.random());
}
window.addEventListener('scroll', throttle(handle, 1000));





