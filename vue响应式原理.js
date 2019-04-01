/**
 * Created by bawuzhan on 2019/2/20.
 */
//响应式原理是由  数据劫持+发布订阅  实现的

//基础知识 数据劫持
//Object.defineProperty()
//可以为对象设置get和set，从而进行数据劫持
const obj={};
let val='val';
Object.defineProperty(obj,'data',{
    get(){
        console.log('劫持取值操作')
        return val;
    },
    set(newVal){
        console.log('劫持赋值操作')
        val=newVal
    },
})
console.log(obj.data);
obj.name = 'cwc';
console.log(obj.name);
//vue通过对数据重新赋值，触发DOM的响应式变化


//发布订阅模式
//两个角色：发布者和订阅者，多个订阅者可以向同一发布者订阅一个事件，当事件发生的时候，发布者通知所有订阅事件的订阅者
class Dep{
    constructor(){
        this.subs=[];
    }
    //增加订阅者
    addSub(sub){
        if(this.subs.indexOf(sub)<0){
            this.subs.push(sub)
        }
    }
    //通知订阅者
    notify(){
        this.subs.forEach((sub)=>{
            sub.updata();
        })
    }
}

const sub={//第一个订阅者
    updata(){
        console.log('1---发布者事件触发，通知订阅者触发他们的更新函数');
    }
}
const sub1={//第二个订阅者
    updata(){
        console.log('2---发布者事件触发，通知订阅者触发他们的更新函数');
    }
}
const dep=new Dep();
dep.addSub(sub)
dep.addSub(sub1)
dep.notify();

function EmitEvent(){};
EmitEvent.prototype.on=function(type,fn){
    if(!this[type]){
        this[type]=[fn];
    }
    var arr=this[type];
    if(arr.length){
        for(var i=0;i<arr.length;i++){
            if(fn==arr[i]){
                return;
            }else{
                arr.push(fn);
            }
        }
    }
}
EmitEvent.prototype.emit=function(type){
    var arr=this[type];
    if(arr.length){
        for(var i=0;i<arr.length;i++){
            arr[i].updata();
        }
    }
}
const em=new EmitEvent();
em.on('aa',sub)
em.on('aa',sub1)
em.emit('aa');



//响应式原理实现过程
//1.需要observe的数据对象进行递归遍历，给data所有属性，包括子属性对象的属性，利用Object.defineProperty()给所有属性都加上 setter和getter
//这样的话，data对象的某个值改变，就会触发setter，那么就能监听到了数据变化

//2.compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

//3.Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
//  1、在自身实例化时往属性订阅器(dep)里面添加自己
//  2、自身必须有一个update()方法
//  3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调


//├── compile.js	渲染DOM，解析指令
//├── dep.js	收集依赖
//├── directive.js	所有支持到的指令
//├── mvue.js	入口函数
//├── observer.js	数据劫持
//├── patch.js	根据具体的指令来修改渲染的内容
//└── watcher.js	观察者。订阅Dep，发布消息


//入口文件MVVM
class MVVM {
    constructor(options){
        this.$el=options.el;
        this.$data=options.data;
        if(this.$el){
            new Observer(this.$data);
            new Compile(this,this.$el)
        }

    }

}

//compile模板编译 (解析dom中的指令)
/*class Compile{
 constructor(vm,node){
 this.$data=vm.data;
 this.vm=vm;
 this.$el=this.isElement(node)?node:document.querySelector(node);
 //1.导出节点到fragment
 let fragment=this.node2fragment(this.$el)
 //2.编译
 this.compile(vm,this.$data,fragment);
 //3.将fragment插入回去
 this.$el.appendChild(fragment);
 }
 isElement(el) {
 return el.nodeType == 1;
 }
 isDirective(attrName){
 return attrName.startsWith('v-');
 }
 node2fragment(node){
 let fragment=document.createDocumentFragment();
 let firstChild;
 while(firstChild=node.firstChild){
 fragment.appendChild(firstChild);
 }
 return fragment;
 }
 compile(vm,data,fragment){
 let childNodes=fragment.childNodes;
 childNodes.forEach((childNode)=>{
 if(childNode.nodeType==1){//说明是元素节点
 this.compileElement(this.$data,childNode);
 this.compile(vm,data,childNode)//递归判断他的子元素
 }else{//说明是文本节点
 this.compileText(this.$data,childNode);
 }
 })
 }
 compileElement(data,node){
 let attrs=node.attributes;
 console.log(Array.from(attrs))
 Array.from(attrs).forEach((attr)=>{
 let attrName=attr.name;
 if(this.isDirective(attrName)){//说明这个属性是指令
 let [,type]=attrName.split('-');
 let expr=attr.value;
 console.log(this.vm)
 compileUtil[type](node,this.vm,expr)
 }
 })
 }
 compileText(data,node){
 let expr=node.textContent;
 let reg=/\{\{([^}]+)\}\}/g
 if(reg.test(expr)){//说明有{{}}指令

 compileUtil['text'](node,this.vm,expr)
 }
 }
 }*/

/*compileUtil={
 getVal(vm,expr){
 expr=expr.split('.');
 console.log(expr,vm.$data,190)
 return  expr.reduce((prev,next)=>{
 return prev[next]
 },vm.$data);
 },
 getTextVal(vm,expr){
 let reg=/\{\{([^}]+)\}\}/g;
 return expr.replace(reg,(...arg)=>{
 return this.getVal(vm,arg[1])
 })
 },
 text(node,vm,expr){
 let updateFn=this.updater['textUpdater'];
 if(updateFn){
 updateFn(node,this.getTextVal(vm,expr))
 }
 },
 model(node,vm,expr){
 let updateFn=this.updater['modelUpdater'];
 if(updateFn){
 updateFn(node,this.getVal(vm,expr))
 }
 },
 updater:{
 modelUpdater(node,val){
 node.value=val
 },
 textUpdater(node,val){
 console.log(val)
 if('innerText' in document){
 node.innerText = val;
 }else{
 node.textContent=val
 }

 }
 }
 }*/




//observe数据劫持
/*class Observe{
 constructor(data){
 // 如果不是对象，则返回
 if (!data || typeof data !== 'object') {
 return;
 }
 this.data=data;
 this.walk(data);
 }
 walk (data) {
 for (let key in data) {
 this.defineReactive(data, key, data[key]);
 this.walk(data[key]);
 }
 }
 defineReactive(obj,key,val){
 Object.defineProperty(obj, key, {
 get: function(){
 return val;
 },
 set: function(newVal){
 if (val === newVal) {
 return;
 }
 val = newVal;
 new Observer(newVal);//递归判断
 }
 })
 }
 }*/
//观察者
/*class Watcher{
 constructor(vm,expr,cb){
 this.vm=vm;
 this.expr=expr;
 this.cb=cb;
 this.value=this.get(this.vm,this.expr);
 }
 getVal(vm,expr){
 let expr=expr.split('.');
 return expr.reduce((prev,next)=>{
 return prev[next];
 },vm.$data);
 }
 get(vm,expr){
 return this.getVal(vm,expr)
 }
 updata(){
 let newVal=this.getVal(vm,expr);
 let oldVal=this.value;
 if(newVal!==oldVal){
 cb(oldVal,newVal);
 }
 }
 }*/
//发布者,将依赖该属性的watcher都加入subs数组，当该属性改变的时候，则调用所有依赖该属性的watcher的更新函数，触发更新。
/*class Dep {
 constructor() {
 this.subs = [];
 }
 addSub(sub) {
 if (this.subs.indexOf(sub) < 0) {
 this.subs.push(sub);
 }
 }
 notify() {
 this.subs.forEach((sub) => {
 sub.update();
 })
 }
 }*/

//最后
//使用订阅发布来实现数据监听

//observe数据劫持
class Observer{
    constructor(data){
        // 如果不是对象，则返回
        if (!data || typeof data !== 'object') {
            return;
        }
        this.data=data;
        this.walk(data);
    }
    walk (data) {
        if(!data || typeof data!=='object'){
            return;
        }
        Object.keys(data).forEach((key)=>{
            console.log(key,data[key])
            this.defineReactive(data, key, data[key]);
            this.walk(data[key]);
        })
    }
    defineReactive (obj,key,val) {
        var dep = new Dep();
        var that=this;
        Object.defineProperty(obj, key, {
            get: function(){
                /*--------------------------add-------------------------------------------*/
                if(Dep.target){
                    dep.addSub(Dep.target);
                }
                /*--------------------------add-------------------------------------------*/
                return val;
            },
            set: function(newVal){
                if (val === newVal) {
                    return;
                }
                val = newVal;
                that.walk(newVal);//递归判断
                /*--------------------------add-------------------------------------------*/
                dep.notify();
                /*--------------------------add-------------------------------------------*/
            }
        })
    }
}
//compile模板编译 (解析dom中的指令)
class Compile{
    constructor(vm,node){
        this.$data=vm.data;
        this.vm=vm;
        this.$el=this.isElement(node)?node:document.querySelector(node);
        //1.导出节点到fragment
        let fragment=this.node2fragment(this.$el)
        //2.编译
        this.compile(vm,this.$data,fragment);
        //3.将fragment插入回去
        this.$el.appendChild(fragment);
    }
    isElement(el) {
        return el.nodeType == 1;
    }
    isDirective(attrName){
        return attrName.startsWith('v-');
    }
    node2fragment(node){
        let fragment=document.createDocumentFragment();
        let firstChild;
        while(firstChild=node.firstChild){
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    compile(vm,data,fragment){
        let childNodes=fragment.childNodes;
        childNodes.forEach((childNode)=>{
            if(childNode.nodeType==1){//说明是元素节点
                this.compileElement(this.$data,childNode);
                this.compile(vm,data,childNode)//递归判断他的子元素
            }else{//说明是文本节点
                this.compileText(this.$data,childNode);
            }
        })
    }
    compileElement(data,node){
        let attrs=node.attributes;
        console.log(Array.from(attrs))
        Array.from(attrs).forEach((attr)=>{
            let attrName=attr.name;
            if(this.isDirective(attrName)){//说明这个属性是指令
                let [,type]=attrName.split('-');
                let expr=attr.value;
                console.log(this.vm)
                compileUtil[type](node,this.vm,expr)
            }
        })
    }
    compileText(data,node){
        let expr=node.textContent;
        let reg=/\{\{([^}]+)\}\}/g
        if(reg.test(expr)){//说明有{{}}指令

            compileUtil['text'](node,this.vm,expr)
        }
    }
}

compileUtil={
    getVal(vm,expr){
        expr=expr.split('.');
        console.log(expr,vm.$data,190)
        return  expr.reduce((prev,next)=>{
            return prev[next]
        },vm.$data);
    },
    getTextVal(vm,expr){
        let reg=/\{\{([^}]+)\}\}/g;
        return expr.replace(reg,(...arg)=>{
            return this.getVal(vm,arg[1])
        })
    },
    text(node,vm,expr){
        let updateFn=this.updater['textUpdater'];
        /*--------------------------add-------------------------------------------*/
        expr.replace(/\{\{([^}]+)\}\}/g,(...arg)=>{
            new Watcher(vm,arg[1],(newValue)=>{
                //如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
                updateFn&&updateFn(node,this.getTextVal(vm,expr));
            })
        })
        /*--------------------------add-------------------------------------------*/
        updateFn&&updateFn(node,this.getTextVal(vm,expr))
    },
    model(node,vm,expr){
        let updateFn=this.updater['modelUpdater'];
        /*--------------------------add-------------------------------------------*/
        new Watcher(vm,expr,(newValue)=>{
            //如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
            updateFn&&updateFn(node,this.getTextVal(vm,expr));
        })
        /*--------------------------add-------------------------------------------*/
        updateFn&&updateFn(node,this.getVal(vm,expr))

    },
    updater:{
        modelUpdater(node,val){
            node.value=val
        },
        textUpdater(node,val){
            console.log(val)
            if('innerText' in document){
                node.innerText = val;
            }else{
                node.textContent=val
            }
        }
    }
}

//观察者
class Watcher{
    constructor(vm,expr,cb){
        this.vm=vm;
        this.expr=expr;
        this.cb=cb;
        this.value=this.get(this.vm,this.expr);
    }
    getVal(vm,expr){
        expr=expr.split('.');
        return expr.reduce((prev,next)=>{
            return prev[next];
        },vm.$data);
    }
    get(vm,expr){
        /*--------------------------add-------------------------------------------*/
        Dep.target=this;
        return this.getVal(vm,expr);
        Dep.target=null;
        /*--------------------------add-------------------------------------------*/
    }
    updata(){
        let newVal=this.getVal(this.vm,this.expr);
        let oldVal=this.value;
        if(newVal!==oldVal){
            this.cb(oldVal,newVal);
        }
    }
}

























