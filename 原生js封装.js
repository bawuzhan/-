/**
 * Created by bawuzhan on 2019/3/26.
 */
数组方法
//forEach
Array.prototype.myForEach= function (cb,context) {
    for(let i=0;i<this.length;i++){
        cb.call(context,this[i],i,this);
    }
}

let obj={};
[1,2,3].myForEach(function(item,index){
    console.log(item,index,this)
},obj)

//map
Array.prototype.myMap= function (cb, context) {
    let arr=[].slice.call(this,0);
    for(let i=0;i<this.length;i++){
        arr[i]=cb.call(context,this[i],i,this);
    }
    return arr;
}

let obj={};
let newArr=[1,2,3].myMap(function(item,index){
    console.log(item,index,this)
    return item*=2;
},obj)

//filter
Array.prototype.myFilter= function (cb, context) {
    let arr=[]
    for(let i=0;i<this.length;i++){
        if(cb.call(context,this[i],i,this)){
            arr.push(this[i])
        };
    }
    return arr;
}

let obj={};
let newArr=[1,2,3].myFilter(function(item,index){
    return item>=2;
},obj)

//every
Array.prototype.myEvery= function (cb, context) {
    for(let i=0;i<this.length;i++){
        if(!cb.call(context,this[i],i,this)){
            return false;
        };
    }
    return true;
}
let obj={};
let newArr=[1,2,3].myEvery(function(item,index){
    return item>=2;
},obj)

//some
Array.prototype.mySome= function (cb, context) {
    for(let i=0;i<this.length;i++){
        if(cb.call(context,this[i],i,this)){
            return true;
        };
    }
    return false;
}
let obj={};
let newArr=[1,2,3].mySome(function(item,index){
    return item>=2;
},obj)

//reduce
Array.prototype.myReduce=function(cb,start){
    let arr=this.slice(0);
    if(start!==undefined)arr.unshift(start);
    prev=arr[0];
    for(let i=0;i<arr.length;i++){
        if(arr[i+1]){
            prev=cb(prev,arr[i+1],i,arr);
        }
    }
    return prev
}

let n=[1,2,3].myReduce(function (prev,next,index,input) {
    return prev+next;
});

Array.prototype.myIncludes=function(sub,start){
    if(start){
        if(start<0){
            start=start+this.length<0?0:start+this.length;
        }
    }else{
        start=0;
    }
    for(let i=start;i<this.length;i++){
        if(sub!==sub){//NaN
            if(this[i]!==this[i]){
                return true;
            }
        }
        if(sub==this[i]){
            return true
        }
    }
    return false;
}
let arr=[1,2,3]
arr.myIncludes(1);
//split
String.prototype.mySplit= function (key) {
    let arr=[];
    let reg=/(\w+)(`${key}`)?/g;
    this.replace(reg,function(){
        arr.push(arguments[1])
    })
    return arr
}
'+ahs+djkas+das+d+'.mySplit('+');

//replace
String.prototype.myReplace= function (reg,cb) {
    let res=reg.exec(this);
    let _this=this;
       while(res){
           let v=cb(res);
           let i=this.indexOf(res[0]);
           _this=_this.substring(0,i)+v+_this.substring(res[0].length+i);
           res=reg.exec(this);
       }
    return _this
}
let b='aa'.replace(/a/g,function () {
    return 'b';
})
//match
String.prototype.myMatch= function (reg) {
    let res=reg.exec(this);
    let arr=[];
    while(res){
        arr.push(res[0]);
        res=reg.exec(this);
    }
    return arr;
}
let str='1a2b34c',reg=/\d+/g;
let res=str.myMatch(reg);
console.log(res)
//bind
Function.prototype.myBind = function (context,...arg) {
    let that=this;
    return function () {
        let arr=[].slice.call(arguments,0)
        that.apply(context,arg.concat(arr));
    }
}
let obj={};
fn= function () {
    console.log(this,arguments);
}
let newFn= fn.myBind(obj,1,2,3);
newFn(4,5,6)
//call
Function.prototype.myCall= function (context,...arg) {
    context.fn=this;
    context.fn(...arg);
    delete context.fn;
}
let obj={aA:1};
fn= function () {
    console.log(this,arguments);
}
let newFn= fn.myCall(obj,1,2,3);
//apply
Function.prototype.myApply= function (context,arr) {
    context.fn=this;
    context.fn(...arr);
    delete context.fn;
}
let obj={aA:1};
fn= function () {
    console.log(this,arguments);
}
let newFn= fn.myApply(obj,[1,2,3]);

//Object.assign

function assign(newObj,oldObj){
    function getAttr(newObj,oldObj){
        for(let key in oldObj){
            if(oldObj.hasOwnProperty(key)){
               newObj[key]=oldObj[key];
                if(typeof oldObj[key]=='object'&&oldObj[key]!==null){
                    getAttr(newObj[key],oldObj[key])
                }
            }
        }
    }
    getAttr(newObj,oldObj)
    return newObj
}
let newObj=assign({e:222,a:123},{a:{c:{d:1}}})

//模板字符串
let a='hehe';
let b='kaka';

function temp(arr,...arg){
    console.log(arr,arg)
    let str='';
    for(let i=0;i<arg.length;i++){
        str+=arr[i]+arg[i];
    }
    str+=arr[arr.length-1];
    return str;
}
let tempStr=temp`哈哈${a}哈哈，我${b}`
//基于正则的模板字符串
let a=12;
let b=34;
function temp(temp){
    let reg=/\$\{([^}]+)\}/g;
    let str= temp.replace(reg, function () {
        return eval(arguments[1]);
    })
    return str;
}
temp('哈哈${a}哈哈，我${b}');

//Object.create的实现
function create(prop){
    function Class(){}
    Class.prototype=prop;
    return new Class;
}



