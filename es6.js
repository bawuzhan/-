/**
 * Created by bawuzhan on 2019/2/18.
 */
//let
for(let i=0;i<a;i++){
    setTimeout(()=>{
        console.log(i)
    },1000)
}
//转
for(var i=0;i<a;i++){
    (function(){
        setTimeout(()=>{
            console.log(i)
        },1000)
    })()
}
//解构赋值
let arr=[1,2,3]l;
let [a,b,c]=arr;
//转
let a=arr[0];
let b=arr[1];
let c=arr[2];

let obj={name:'aa',age:10}
let {name,age}=obj;
//转
let name=obj.name;
let age=obj.age;

//模板字符串
let name='帅哥';
let tempStr=`haha 我是${name}`
//转
function replace(tempStr){
    return tempStr.replace(/\$\{([^}]+)\}/g,function(){
        return eval(arguments[1])
    })
}

//原理
function desc(strings,...values){
    let result='';
    console.log(strings)
    console.log(values)
    for(let i=0;i<values.length;i++){
        result+=strings[i]+values[i];
    }
    result+=strings[strings.length-1];
    return result;
}

desc`我是${name}
今年${age}`


//默认参数
function ajax(url=new Error('url不能为空'),method='get',dataType='json'){
    console.log(url,method)
}
ajax();
//转
function ajax(url=new Error('url不能为空'),method='get',dataType='json'){
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Error('url不能为空');
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
    var dataType = arguments.length > 2 && arguments[2] !== undefined ? arguments
}
//剩余运算符


function ajax(url,method,...res){
    console.log(res)
    console.log(arguments)
}
ajax('aa','bb','cc')
//转
for (var _len = arguments.length, res = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    res[_key - 1] = arguments[_key];
}

//class类
class Parent{
    constructor(name){
        this.name=name//实例的私有属性
    }
    getName(){//实例的公有属性，也就相当于原型上的属性
        console.log(this.name)
    }
    //静态属性
    static hello(a){
        console.log(a)
    }
}
let p=new Parent('haha')




var _createClass = function () {
    //target目标  props是属性对象数组
    function defineProperties(target, props) {
        //循环每个数组
        for (var i = 0; i < props.length; i++) {
            //取出每个属性描述器
            var descriptor = props[i];
            //可枚举 for in 能循环
            descriptor.enumerable = descriptor.enumerable || false;
            //可配置 可以用delete删除
            descriptor.configurable = true;
            //可修改值
            if ("value" in descriptor) descriptor.writable = true;
            //真正的项Parent类的原型上增加属性
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        //参数是构造函数 原型上的属性 静态属性（类上的属性）
        //如果有原型属性的话 ，把class的公有属性放到构造函数的原型上
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        //如果有静态属性，就放在构造函数上（函数的对象形态）
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
//类的调用检查
function _classCallCheck(instance, Constructor) {
    //如果这个实例不是这个构造函数的实例的话，就报错 不能把一个类当做构造函数来调用
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}


var Parent = function () {
    function Parent(name) {
        _classCallCheck(this, Parent);//为了保证这个类只能new 不能当做普通函数调用
        this.name = name;
    }
    _createClass(Parent, [{
        key: 'getName',
        value: function getName() {
            console.log(this.name);
        }
    }],[{
        key: 'hello',
        value: function hello(a) {
            console.log(a);
        }
    }]));
    return Parent;
}();
var p = new Parent('haha');


//class类的继承
//1. 公有属性继承公有属性，并重置constructor
//2. 私有继承私有
//3. 通过__proto__关联子类 与父类，使子类继承父类的静态方法
class Child extends Parent{
    constructor(name,age){
        super(name)//指的是父类的构造函数
        this.age=age;
    }
    getAge(){
        console.log(this.age)
    }
}
//
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {//子类原型 继承Object.create（父类原型），并修改constructor指向
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;//修改原型链
}

var Child = function (_Parent) {
    _inherits(Child, _Parent);

    function Child(name, age) {
        _classCallCheck(this, Child);//检测

        //指的是父类的构造函数
        var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));

        _this.age = age;
        return _this;
    }

    _createClass(Child, [{//给子类的 原型增加getAge属性
        key: 'getAge',
        value: function getAge() {
            console.log(this.age);
        }
    }]);
    return Child;
}(Parent);

//常问的有 let const，class，箭头函数，promise，async await，module 模块化。






































