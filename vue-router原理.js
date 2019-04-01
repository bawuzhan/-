/**
 * Created by bawuzhan on 2019/3/1.
 */
/*
* 基础思路
* 1.hash模式和history模式分别处理
* 判断兼容，如果不支持history就默认用hash模式
* 判断mode  分别处理hash模式和history模式的 push replace go方法
*
* 2.在路由列表中，匹配出当前的路由 执行所有的钩子函数后  把当前路由上的所有属性传给 this.history.current
 *
* 3.调用原生的事件监听导航  执行对应router的钩子函数，拿到当前的路由
*
* 4.observe给当前的导航添加监听，如果导航的任何属性发生变化，就会重新渲染DOM
* */
class HistoryRoute{
    constructor(){
        this.current=null;
    }
}
class VueRouter{
    constructor(options){
        this.mode=options.mode||'hash';
        this.routes=options.routes||[];
        //你传递的路由表变为一个数组[{'/home':Home},{'/about':About}]
        this.routesMap=this.createMap(this.routes);
        //路由中需要存放当前的路径 需要状态
        this.history=new HistoryRoute()
        this.init()//开始初始化操作
    }
    createMap(routes){
        return routes.reduce((memo,current)=>{//
            memo[current.path]=current.component;
            return memo;
        },{})
    }
    init(){
        if(this.mode=='hash'){
            //先判断用户打开时有没有hash 没有就跳到#/
            location.hash?'':location.hash='#/';
            window.addEventListener('load',()=>{
                this.history.current=location.hash.slice(1)
            })
            window.addEventListener('hashchange',()=>{
                this.history.current=location.hash.slice(1)
            })

        }else{
            //先判断用户打开时有没有hash 没有就跳到#/
            location.pathname?'':location.pathname='/';
            window.addEventListener('load',()=>{
                this.history.current=location.pathname
            })
            window.addEventListener('popstate',()=>{
                this.history.current=location.pathname
            })
        }
    }
    go(){
        if(this.mode=='hash'){

        }else{

        }
    }
    replace(){
        if(this.mode=='hash'){

        }else{

        }
    }
    push(){
        if(this.mode=='hash'){

        }else{

        }

    }
}

//使用vue.use就会调用install方法
VueRouter.install=function(Vue){

    Vue.mixin({//混合方法，给所有的组件加公共的属性方法等
        beforeCreate(){
            console.log(Vue,'install')
            //每个组件都有this,$router / this.$route属性
            //在所有组件中获取同一个路由的实例
            console.log(this.name)
            if(this.$options&&this.$options.router){//说明是根实例

                this._root=this;//把当前实例挂载在_root上
                this._router=this.$options.router;//把router实例挂载在_router上
                //observe的方法defineReactive
                //ruguo history中的current变化也会刷新视图
                Vue.util.defineReactive(this,'',this._router.history)
            }else{
                //vue组件的渲染顺序 父-->子-->孙子
                this._root=this.$parent._root;//如果想获取唯一的路由实例
            }
            Object.defineProperty(this,'$router',{//Router的 实例
                get(){
                    return this._root._router;
                }
            });
            Object.defineProperty(this,'$route',{//$route对象
                get(){
                    //当前路由所在的状态
                    return this._root._router.history.current;
                }
            })
        }
    })
    Vue.component('router-link',{
        props:{
            to:String,
            tag:String,
        },
        render(){//jsx语法
            let mode=this._self._root._router.mode;
            //let tag=this.tag;
            return <a href={mode==='hash'?`#${this.to}`:this.to}>{this.$slots.default}</a>
        },
    })

    Vue.component('router-view',{
        render(h){ //根据当前的状态 current 路由表拿到组件
            //如何将current变成动态的 current变化(defineReactive)
            //这里面的this是一个代理
            let current=this._self._root._router.history.current;
            let routesMap=this._self._root._router.routesMap
            return h(routesMap[current])
        }
    })
}
export default VueRouter;

