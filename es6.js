/**
 * Created by bawuzhan on 2019/2/18.
 */
//let
for(let i=0;i<a;i++){
    setTimeout(()=>{
        console.log(i)
    },1000)
}
//ת
for(var i=0;i<a;i++){
    (function(){
        setTimeout(()=>{
            console.log(i)
        },1000)
    })()
}
//�⹹��ֵ
let arr=[1,2,3]l;
let [a,b,c]=arr;
//ת
let a=arr[0];
let b=arr[1];
let c=arr[2];

let obj={name:'aa',age:10}
let {name,age}=obj;
//ת
let name=obj.name;
let age=obj.age;

//ģ���ַ���
let name='˧��';
let tempStr=`haha ����${name}`
//ת
function replace(tempStr){
    return tempStr.replace(/\$\{([^}]+)\}/g,function(){
        return eval(arguments[1])
    })
}

//ԭ��
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

desc`����${name}
����${age}`


//Ĭ�ϲ���
function ajax(url=new Error('url����Ϊ��'),method='get',dataType='json'){
    console.log(url,method)
}
ajax();
//ת
function ajax(url=new Error('url����Ϊ��'),method='get',dataType='json'){
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Error('url����Ϊ��');
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
    var dataType = arguments.length > 2 && arguments[2] !== undefined ? arguments
}
//ʣ�������


function ajax(url,method,...res){
    console.log(res)
    console.log(arguments)
}
ajax('aa','bb','cc')
//ת
for (var _len = arguments.length, res = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    res[_key - 1] = arguments[_key];
}

//class��
class Parent{
    constructor(name){
        this.name=name//ʵ����˽������
    }
    getName(){//ʵ���Ĺ������ԣ�Ҳ���൱��ԭ���ϵ�����
        console.log(this.name)
    }
    //��̬����
    static hello(a){
        console.log(a)
    }
}
let p=new Parent('haha')




var _createClass = function () {
    //targetĿ��  props�����Զ�������
    function defineProperties(target, props) {
        //ѭ��ÿ������
        for (var i = 0; i < props.length; i++) {
            //ȡ��ÿ������������
            var descriptor = props[i];
            //��ö�� for in ��ѭ��
            descriptor.enumerable = descriptor.enumerable || false;
            //������ ������deleteɾ��
            descriptor.configurable = true;
            //���޸�ֵ
            if ("value" in descriptor) descriptor.writable = true;
            //��������Parent���ԭ������������
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        //�����ǹ��캯�� ԭ���ϵ����� ��̬���ԣ����ϵ����ԣ�
        //�����ԭ�����ԵĻ� ����class�Ĺ������Էŵ����캯����ԭ����
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        //����о�̬���ԣ��ͷ��ڹ��캯���ϣ������Ķ�����̬��
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
//��ĵ��ü��
function _classCallCheck(instance, Constructor) {
    //������ʵ������������캯����ʵ���Ļ����ͱ��� ���ܰ�һ���൱�����캯��������
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}


var Parent = function () {
    function Parent(name) {
        _classCallCheck(this, Parent);//Ϊ�˱�֤�����ֻ��new ���ܵ�����ͨ��������
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


//class��ļ̳�
//1. �������Լ̳й������ԣ�������constructor
//2. ˽�м̳�˽��
//3. ͨ��__proto__�������� �븸�࣬ʹ����̳и���ľ�̬����
class Child extends Parent{
    constructor(name,age){
        super(name)//ָ���Ǹ���Ĺ��캯��
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

function _inherits(subClass, superClass) {//����ԭ�� �̳�Object.create������ԭ�ͣ������޸�constructorָ��
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
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;//�޸�ԭ����
}

var Child = function (_Parent) {
    _inherits(Child, _Parent);

    function Child(name, age) {
        _classCallCheck(this, Child);//���

        //ָ���Ǹ���Ĺ��캯��
        var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));

        _this.age = age;
        return _this;
    }

    _createClass(Child, [{//������� ԭ������getAge����
        key: 'getAge',
        value: function getAge() {
            console.log(this.age);
        }
    }]);
    return Child;
}(Parent);

//���ʵ��� let const��class����ͷ������promise��async await��module ģ�黯��






































