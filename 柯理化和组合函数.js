//����
//����ǰѽ��ܶ�������ĺ����任�ɽ���һ����һ��������������ĵ�һ���������ĺ��������ҷ��ؽ������µĲ������ҷ��ؽ�����º����ļ�����
//��ͨ����
function add(n1, n2) {
    return n1 + n2
}
add(1, 2)


//��������
function add(n1) {
    return function (n2) {
        return n1 + n2
    }
}
add(1)(2);

//����һ����������
function currying(fun) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var _args = args.concat(Array.prototype.slice.call(arguments));
        return fun.apply(null, _args);
    }
}
//���ÿ�����������һ������
function add(...vals){
    return vals.reduce((pre, val) = > {
            return pre + val;
    });
}

var newAdd = currying(add, 1, 2, 3);
console.log(newAdd(4, 5, 6)); // 21
//���Զ��ִ�еĿ�������
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
//��ÿ�κ������õĲ������洢������������޲���ʽ���ã�˵����¼��������Ҫ�����ռ��㡣

//Ϊʲôʹ�ÿ�������
//������������ģ�黯˼�봦���κ�����ͨ����Ϻ�������ÿ������������������Ӷ���ߴ���Ŀ��Ķ��Լ���ά���ԡ�







//��Ϻ���
//��������������ִ�У�������������������һ������������������һ�����������������һ����һ��������ʼִ�У��ͻ������ŵ����һ���Ƶ�ִ���ˡ�
//�ص�
// compose�Ĳ����Ǻ��������ص�Ҳ��һ������
//��Ϊ���˵�һ�������Ľ��ܲ��������������Ľ��ܲ���������һ�������ķ���ֵ
//compsoe�������Խ�������Ĳ��������еĲ������Ǻ�������ִ�з�������������ģ���ʼ����һ���ŵ�������������

var greeting = (firstName, lastName) =>'hello,  ' + firstName + '  ' + lastName + '   ';
var toUpper = str =>str.toUpperCase();
var fn = compose(toUpper, greeting);
console.log(fn('jack', 'smith'))// ��HELLO��JACK SMITH��

//��ʹ�õ�reduceʵ�ֵ� ��������ִ�еĺ���
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


//lodash��ʵ�� ��������ִ�еĺ���
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


//����ʽ��̺��������ʽ��̶Ա�
//��������̵�
//    �ŵ�
//        ������ӱ��ڷ�������ơ����
//        ������չ�ģ����ڼ̳С���װ����̬�����ԣ���Ȼ��Ƴ����ھۡ�����ϵ�ϵͳ�ṹ��ʹ��ϵͳ������������չ�����ҳɱ��ϵ�
//    ȱ��
//        Ϊ��д�����õĴ���������˺ܶ����õĴ��룬���´�������
//
//����ʽ��̵�
//    �ŵ�
//        ����ɶ��Ը�ǿ��
//        ʵ��ͬ���Ĺ��ܺ���ʽ�������Ҫ�Ĵ�������������Ҫ�ٺܶ࣬������Ӽ������
//        �����ٶȿ�
//    ȱ��
//        ���еı����ڳ��������ڼ䶼��һֱ���ڵģ��ǳ�ռ��������Դ











