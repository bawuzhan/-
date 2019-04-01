//柯理化
//概念：是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
//普通函数
function add(n1, n2) {
    return n1 + n2
}
add(1, 2)


//柯理化函数
function add(n1) {
    return function (n2) {
        return n1 + n2
    }
}
add(1)(2);

//创建一个柯理化函数
function currying(fun) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var _args = args.concat(Array.prototype.slice.call(arguments));
        return fun.apply(null, _args);
    }
}
//利用柯理化函数改造一个函数
function add(...vals){
    return vals.reduce((pre, val) = > {
            return pre + val;
    });
}

var newAdd = currying(add, 1, 2, 3);
console.log(newAdd(4, 5, 6)); // 21
//可以多次执行的柯理化函数
function currying(fn) {
    var args = [].slice.call(arguments, 1);
    return function () {
        if (arguments.length == 0) {
            return fn.apply(null, args);
        } else {
            args = args.concat([].slice.call(arguments));
        }
    }
}
function add() {
    var vals = Array.prototype.slice.call(arguments);
    return vals.reduce((pre, val) = > {
            return pre + val;
    });
}
var newAdd = currying(add, 1, 2, 3);
newAdd(4, 5);
newAdd(6, 7);
console.log(newAdd());  // 28
//把每次函数调用的参数都存储起来，如果已无参形式调用，说明记录结束，需要做最终计算。

//为什么使用柯理化函数
//柯理化就是利用模块化思想处理多参函数，通过组合函数减少每个函数的入参数量，从而提高代码的可阅读性及可维护性。







//组合函数
//将函数串联起来执行，将多个函数组合起来，一个函数的输出结果是另一个函数的输入参数，一旦第一个函数开始执行，就会像多米诺骨牌一样推导执行了。
//特点
// compose的参数是函数，返回的也是一个函数
//因为除了第一个函数的接受参数，其他函数的接受参数都是上一个函数的返回值
//compsoe函数可以接受任意的参数，所有的参数都是函数，且执行方向是自右向左的，初始函数一定放到参数的最右面

var greeting = (firstName, lastName) =>'hello,  ' + firstName + '  ' + lastName + '   ';
var toUpper = str =>str.toUpperCase();
var fn = compose(toUpper, greeting);
console.log(fn('jack', 'smith'))// ‘HELLO，JACK SMITH’

//我使用的reduce实现的 从右向左执行的函数
function compose() {
    var args = [].slice.call(arguments, 0);
    var length = args.length;
    var index = length;
    while (index--) {
        if (typeof args[index] !== 'function') {
            throw new TypeError('Expected a function');
        }
    }
    var last=args.pop(args);
    args.reverse();
    return function () {
        let _arg = [].slice.call(arguments);
        return args.reduce(function (prev, next) {
            return next(prev);
        },last.apply(null,_arg))
    }
}


var trim = str =>str.replace(/\s+/g, '|');
var newFn = compose(trim, fn);
console.log(newFn('jack', 'smith'));


//lodash的实现 从左向右执行的函数
var flow = function (funcs) {
    var length = funcs.length;
    var index = length
    while (index--) {
        if (typeof funcs[index] !== 'function') {
            throw new TypeError('Expected a function');
        }
    }
    return function (...args){
        var index = 0
        var result = length ? funcs[index].apply(this, args) : args[0]
        while (++index < length) {
            result = funcs[index].call(this, result)
        }
        return result
    }
}
var flowRight = function (funcs) {
    return flow(funcs.reverse())
}


//函数式编程和面向对象式编程对比
//面向对象编程的
//    优点
//        程序更加便于分析、设计、理解
//        是易拓展的，由于继承、封装、多态的特性，自然设计出高内聚、低耦合的系统结构，使得系统更灵活、更容易扩展，而且成本较低
//    缺点
//        为了写可重用的代码而产生了很多无用的代码，导致代码膨胀
//
//函数式编程的
//    优点
//        代码可读性更强。
//        实现同样的功能函数式编程所需要的代码比面向对象编程要少很多，代码更加简洁明晰
//        开发速度快
//    缺点
//        所有的变量在程序运行期间都是一直存在的，非常占用运行资源











