/**
 * Created by bawuzhan on 2019/3/6.
 */

//vuex是一个专门为vue应用程序状态管理模式
使用方法
/*
安装
npm install vuex;
引入
import Vue from 'vue';
import Vuex from 'vuex';
use
Vue.use(vuex)
初始化
let store=new Vuex.Store({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{}//模块分层 递归实现
})
*/
//挂载到跟组件中
new Vue({
    store,
    render(h=>h());
})


//vuex插件内部vuex.js
//vue的加载顺序，先加载根组件，再加载子组件。。。

//Store是一个类
class Store{
    constructor(options){
        let state=options.state;
        //什么样的属性可以实现双向绑定  Object.defineProperty()
        //vuex的核心就是借用了vue的实例 因为vue的实例的数据变化，会重新渲染视图，（vuex的state变化也会更新视图）
        this._vm=new Vue({
            data:{
                state,
            }
        })

        this.getters=options.getters;//{getters1:fn}挂载到store实例上 this.$store.getters.getters1(state)就拿到了fn执行的结果
        forEach(this.getters,(getterName,getterFn)=>{//循环所有的getters，当用户获取某一个getter的时候 返回对应的函数的返回值，并传入状态（computed的实现原理）
            Object.defineProperty(this.getters,getterName,{
                get(){
                    return getterFn(state);
                }
            })
        });
        this.mutations=options.mutations;//this.mutations.change=()=>{change(state)}
        forEach(this.mutations,(mutationName,mutationFn)=>{
            this.mutations[mutationName]=()=>{
                mutationFn.call(this,state);
            }
        });
        this.actions=options.actions;
        forEach(this.actions,(actionName,actionFn)=>{
            this.actions[actionName]=()=>{
                actionFn.call(this,this);
            }
        });
        let {commit,dispatch} = this;
        this.commit= (type) =>{
            commit.call(this,type);
        }
        this.dispatch= (type) =>{
            dispatch.call(this,type);
        }
    }

    get state(){//只要是从store获取state数据，就返回经过vue双向处理的state
        return this._vm.state;
    }
    commit(type){//commit执行mutation
        this.mutations[type]()
    }
    dispatch(type){//dispatch派发action
        this.actions[type]()
    }

}
function forEach(obj,callback){
    Object.keys(obj).forEach((item,index)=>{
        callback(item,obj[item])
    })
}
//use方法执行会调用插件的install方法,并把vue的类传进去
let install=(_Vue)=>{
    Vue=_Vue;//保留vue的构造函数
    Vue.mixin({//混入--全局mixin
        beforeCreate(){
            //我需要把根组件中的store实例 给每个组件都增加一个叫$store的属性,让所有的组件中都能使用$store
            //是否是根组件
            if(this.$options&&this.$options.store){//表示是根组件
                this.$store=this.$options.store;
            }else{//子组件 深度优先 父--子--孙  vue逐层加载的过程中都取他的父亲上的$store给自己
                this.$store=this.$parent&&this.$parent.$store
            }
        }
    })
}
export default {
    store,
    install,
}