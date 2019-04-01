/**
 * Created by bawuzhan on 2019/2/18.
 */
1.什么是mvvm
//MVVM是Model-View-ViewModel的缩写。
//View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。
//Vue是以数据为驱动的，Vue自身将DOM和数据进行绑定，一旦创建绑定，DOM和数据将保持同步，每当数据发生变化，DOM会跟着变化。

2.vue的特点
//简洁：页面由HTML模板+Json数据+Vue实例组成
//数据驱动：自动计算属性和追踪依赖的模板表达式
//组件化：用可复用、解耦的组件来构造页面
//轻量：代码量小，不依赖其他库
//快速：精确有效批量DOM更新
//模板友好：可通过npm，bower等多种方式安装，很容易融入

3.vue生命周期的理解
//总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后。
//beforeCreate           可以用来显示loading
//created  初始化data     可以异步加载数据
//beforeMount
//mounted  挂载到dom上     可以获取dom  也可以用nextTick(()=>{getDOM}) 微任务
//beforeUpdate
//updated  数据更新
//beforeDestroy
//destoryed  销毁解除数据与dom的绑定

4.组件之间的传值（7种方式 ）
//父传子    自定义属性传递  props接收


//子传父     $emit事件发射机制(子组件emit自定义事件，父组件执行自定义事件)


//兄弟组件之间  事件车  let bus=new Vue()  通过bus.$emit触发事件，bus.$on监听触发的事件


//$attrs和$listeners 用在父组件传递数据给子组件或者孙组件（跨组件）
/*$attrs 用于拿到父组件上的所有属性（除了prop传递的属性、class 和 style ）    子组件可以单独使用$attrs
eg：<child1 :title='123' :msg='456'></child1>  子组件props:['msg']   通过{{$attrs.title}}能拿到123,不能拿msg的值， 因为被props占用了
inheritAttrs：默认值true,继承所有的父组件属性（除props的特定绑定）作为普通的HTML特性应用在子组件的根元素上，如果你不希望组件的根元素继承特性设置inheritAttrs: false,但是class属性会继承
$listeners-属性，它是一个对象，里面包含了作用在这个组件上的所有监听器，你就可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。

<child2 v-bind="$attrs" v-on="$listeners"></child2> //$attrs: {title:123}

<div class="child-2">
    <p>in child2:</p>
    <p>props: {{title}}</p> //123
    <p>$attrs: {{$attrs}}</p>//{{空的}}  可以执行爷爷组件上的方法
<hr>
</div>*/


//provide和inject 父组件 provide:{a:123}, 子组件 inject:['a'] 拿到父组件传的数据  （并不是可响应的：如果你传入了一个可监听的对象，那么其对象的属性还是可响应的）


//this.$parent 获取父组件修改父组件数据  和this.$children[0]获取子组件修改子组件中的数据   不好


//vuex处理组件之间的数据交互  数据统一管理  最常用



5.路由之间跳转方式
//声明式（标签跳转） <router-link to="url" tag="a"></router-link>
//编程式（ js跳转）  this.$router.go()可以前进和返回任意历史纪录/this.$router.push()增加一个历史记录/this.$router.replace()上一个路由被替换，历史记录里没有上一个纪录了

6.组件的使用和自己创建公用组件？
//第一步：在components目录新建你的组件文件（indexPage.vue），script一定要export default {}
//第二步：在需要用的页面（组件）中导入：import indexPage from '@/components/indexPage.vue'
//第三步：注入到vue的子组件的components属性上面,components:{indexPage}
//第四步：在template视图view中使用，
//问题有indexPage命名，使用的时候则index-page。

7.按需加载，配合webpack配置
//webpack中提供了require.ensure()来实现按需加载。以前引入路由是通过import 这样的方式引入，改为const定义的方式进行引入。
//不进行页面按需加载引入方式：import home from '../../common/home.vue'
//进行页面按需加载的引入方式：const home = r => require.ensure( [], () => r (require('../../common/home.vue')))


8.vue-router有哪几种导航钩子(),及用法？
（beforeEach、beforeResolve、afterEach）  （beforeEnter）  （beforeRouteEnter没有this/beforeRouteUpdate/beforeRouteLeave）注意next
//全局的(beforeEach,beforeResolve,afterEach), 单个路由独享的(beforeEnter), 或者组件内使用的(beforeRouteEnter,beforeRouteUpdate,beforeRouteLeave)
//1).全局前置守卫:beforeEach
//参数或查询的改变并不会触发进入/离开的导航守卫
//可以通过观察 $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫
//
//    const router = new VueRouter({ ... })
//    router.beforeEach((to, from, next) => {
//        // ...
//        next()//向下执行，否则卡在这里
//    })
//
//2).全局解析守卫:beforeResolve
//在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
//router.beforeResolve((to, from, next) => {
//    // ...
//    next()//向下执行，否则卡在这里
//})
//3).全局后置钩子:afterEach
//不会接受 next 函数也不会改变导航本身
//router.afterEach((to,from)=>{
//    //导航结束后调用
//})
//4).路由独享的守卫:beforeEnter
//配置在单个路由上的，进入这个路由时调用
//const router = new VueRouter({
//    routes: [
//        {
//            path: '/foo',
//            component: Foo,
//            beforeEnter: (to, from, next) => {
//            // ...
//            }
//        }
//    ]
//})
//5).组件内的守卫:beforeRouteEnter/beforeRouteUpdate/beforeRouteLeave
//const Foo = {
//    template: `...`,
//    beforeRouteEnter (to, from, next) {
//        // 在渲染该组件的对应路由被 confirm 前调用
//        // 不！能！获取组件实例 `this`
//        // 因为当守卫执行前，组件实例还没被创建
//    },
//    beforeRouteUpdate (to, from, next) {
//        // 在当前路由改变，但是该组件被复用时调用
//        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
//        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
//        // 可以访问组件实例 `this`
//    },
//    beforeRouteLeave (to, from) {
//        // 导航离开该组件的对应路由时调用
//        // 可以访问组件实例 `this`
//    }
//}

9.mint-ui是什么？怎么使用？说出至少三个组件使用方法？
//基于vue的前端组件库。npm安装，然后import样式和js，vue.use（mintUi）全局引入。在单个组件局部引入：import {Toast} from ‘mint-ui’。组件一：Toast(‘登录成功’)；组件二：mint-header；组件三：mint-swiper

10.v-model实现双向绑定 Object.defineProperty(obj,val,{get(){},set(){}})
//var obj={data:10};
//inp.value=obj.data;
//let  temp={};
//Object.defineProperty(obj,'data',{
//    get(){
//        return temp.data;
//    },
//    set(val){
//        temp.data=val;
//        inp.value=val;
//    }
//})
//
//inp.onChange= function () {
//    obj.data=this.value;
//}

11.computed和watch的区别
// computed
// 1. 支持缓存，只有依赖数据发生改变，才会重新进行计算
// 2. 不支持异步
// 3. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一；一般用computed；
// watch :
// 1. 不支持缓存，数据变，直接会触发相应的操作；
// 2. watch支持异步；
// 3. 当一个属性发生变化时，需要执行对应的操作；一对多；

12.自定义指令和自定义过滤器（一般单独写出文件，挂载到全局）
//Vue.directive('focus',{
//    bind: function (el, value) {
//        //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
//    },
//    inserted: function (el, value) {
//        //被绑定元素插入父节点时调用
//    },
//    update:function(el,value){//所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
//        if(value.value){
//            el.focus();
//        }
//    },
//    componentUpdated:function(el,value){//指令所在组件的 VNode 及其子 VNode 全部更新后调用。
//
//    },
//    unbind:function(el,value){
//        //只调用一次，指令与元素解绑时调用。
//    },
//
//})
周期：bind、inserted、update、componentUpdated、unbind
//vue.filters('fixed', function (data,n) {
//    return data.toFixed(n);
//})
常用的过滤器 fixed  首字母大写等
自定义指令  focus 拖拽

13.单项数据流
//只能父组件数据改变子组件数据，不能子组件数据改变子组件数据

14.数据双向传递 sync语法糖
//父组件<Parent :msg.sync="msg1"></Parent>

//子组件 this.$emit('update:msg', 'newMsg');
//props:['show']

15.请说下封装 vue 组件的过程
//使用Vue.extend方法创建一个组件，
//然后使用Vue.component方法注册组件。子组件需要数据，
//可以在props中接受定义。而子组件修改好数据后，
//想把数据传递给父组件。
//可以采用emit方法。

16.vue-loader是什么？使用它的用途有哪些？
//vue-loader是webpack下loader插件
//vue-loader会解析.vue文件中的每个语言块，然后传输到其它的loaders，最终输出到module.exports是vue组件的配置对象的CommonJS模块。

17.对Vue.js的template编译的理解？
/*
* 先转化为AST树，在得到的render函数中返回VNode（vue的虚拟DOM节点）
*
*首先，通过compile编译器把template编译成AST语法树（abstract syntax tree 即 源代码的抽象语法结构的树状表现形式），compile是createCompiler的返回值，createCompiler是用以创建编译器的。另外compile还负责合并option。

 然后，AST会经过generate（将AST语法树转化成render funtion字符串的过程）得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，里面有（标签名、子节点、文本等等）
*
* */

18.vuex是什么
//一个专为 Vue.js 应用程序开发的状态管理模式（管理数据流，多页面共享一个data库）
//State、Actions、Mutations、Getters、Modules

19.vue-router的使用方法

/*
import Router from 'vue-router';
let router=vue.use(Router);
let routes=[]//路由配置文件
export default new Router({routes});

const app = new Vue({
    router
}).$mount('#app')
*/


20.Vue的双向数据绑定原理是什么
//Object.defineProperty(obj,key,{set(){},get(){}})

//简易实现
/*
let obj={data:''},temp={data:''}
input.value=obj.data;
input.onchange=function(){
    obj.data=this.value;
}
Object.defineProperty(obj,'data',{
    set(newVal){
        obj['data']=newVal;
        temp['data']=newVal
    },
    get(){
        return temp.data;
    },
})
*/

21.vue响应式原理
//第一步：需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter
//这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化
//
//第二步：compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
//
//第三步：Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
//  1、在自身实例化时往属性订阅器(dep)里面添加自己
//  2、自身必须有一个update()方法
//  3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
//
//第四步：MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

22.vue-router实现原理
    /*function install(_vue){
        _vue.mixin({
            beforeCreate(){
                //给每个组件注入实例router对象
                //Object.defineProperty()监听路由对象的变化，获取当前的路由对象current
            }
        })
        //注册全局的router-link和router-view组件
    }
    VueRouter类
    判断mode 获取配置对象映射，
    分别利用原生的history的popstate 和 hash的hashChange来监听路由变化
    初始当前路由，给router实例添加go replace push 等实例的公有方法
    匹配出当前的路由 执行所有的钩子函数
    更新current对象
    从映射对象中拿到需要渲染的组件current.component
    监听路由对象变化，重新渲染页面*/

23.vuejs与react的区别
对比react
    使用 Virtual DOM（js对象）
    提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。
    将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。
react
    jsx
    mvc
    渲染方式--从底层组件检查更新
    注重逻辑
    实现原理 数据脏检查 监听属性变化 对比虚拟DOM 从根组件更新
    props与State
    redux react-redux
vue
    template
    mvvm
    响应式-哪里监听到变化就更新哪里
    注重视图
    实现原理Object.defineProperty()监听数据变化+订阅发布模式
    指令
    声明周期
    事件处理器+修饰符
    计算属性
    路由
    数据传递
    vuex

24.vue源码结构

vue new的时候都做了什么 或者 声明周期的理解

创建一个vue的实例   执行init方法
在init中初始化了所有的options对象 把所有的options都挂载到了$options上，还初始化了事件对象
初始化了一些渲染属性$slots和$createElement
挂钩子beforeCreate 从options上拿到钩子名然后 $emit 当前的钩子
初始化了options上的所有的属性 get他们添加get set属性
挂载了created钩子函数  属性已经绑定， 但还未生成真实dom
进行元素的挂载： $el / vm.$mount()

beforeMount: 模板编译/挂载之前
执行render function，生成真实的dom，并替换到dom tree中
的完整版渲染过程 html字符串 → render函数 → vnode → 真实dom节点
而运行时渲染即所谓的去掉编译器的过程：render函数 → vnode → 真实dom节点。
mounted: 组件已挂载

update:执行diff算法，比对改变是否需要触发UI更新
watcher.before: 触发beforeUpdate钩子	- watcher.run(): 执行watcher中的 notify，通知所有依赖项更新UI
触发updated钩子: 组件已更新

beforeDestroy: 销毁开始
销毁自身且递归销毁子组件以及事件监听
remove(): 删除节点
watcher.teardown(): 清空依赖
vm.$off(): 解绑监听
destroyed: 完成后触发钩子







dom diff算法







$mount 内部实现
流程：el->template->compileToFunctions->render->vm._render->vnode->vm._update->vm.$el

el->template
代码首先判断option里面有没有render函数，没有的话，进一步判断有没有template，没有的话就用dom元素的outerHTML。


template->render
    将template解析成ast语法树对象。（ 使用正则）
    compileToFunctions通过ast语法树生成render函数。
    render函数:
    eg:render: function (createElement) {
        return createElement('h1', '标题')
    }
第一步是将 模板字符串 转换成 element ASTs（解析器）
第二步是对 AST 进行静态节点标记，主要用来做虚拟DOM的渲染优化（优化器）
第三步是 使用 element ASTs 生成 render 函数代码字符串（代码生成器）





render->vnode
vnode的本质 new VNode();
vnode = render.call(vm._renderProxy, vm.$createElement);
render函数的执行，调用了createElement方法，其内部通过传入的相关参数，根据不同类型，一步步解析出了VNode。

vm._render函数返回一个vnode作为 vm._update的第一个参数
updateComponent = () => {//组件更新 就是重新
    vm._update(vm._render(), hydrating)
}
watcher监听vm变化触发组件更新 new Watcher(vm, updateComponent, noop, null, true)


vnode->vm.$el
实现过程主要是通过vm.$el = vm.__patch__(prevVnode, vnode);








25.开发过程中遇到的问题
//history模式,后台配置
//watch不能监听object 因为需要 watch:{data:{handler:(val,oldVal)=>{},deep:true}}
//子路由默认组件配置 配置空的子路由即可
//导航守卫beforeRouteEnter中this指向
//element弹框的据屏幕右侧8px间距
//DOM操作没用#nextTick
//vue中使用箭头函数   this指向不对
//keep-alive 组件缓存
//transition-group使用时，key值坑  不能使用index需要设置固定不变的key值
//多级菜单 不确定层级的解决方式    递归组件

//。。。
26.axios的使用
/*基本使用
    axios({method:'',url: '/user/12345', data: {})
    axios.get(url,{params})/axios.post(url,data)/delete/head/options/put/patch
提出请求的可用配置选项
    url
    method
    baseURL
    data
    params
    headers
    timeout
    responseType
    withCredentials:false跨域
    paramsSerializer 格式化参数

    transformRequest转换请求数据
    transformResponse转换响应数据

默认配置
    全局默认配置
    axios.defaults.baseURL = 'https://api.example.com';
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    创建实例时设置默认配置axios.create
    var instance = axios.create({
        baseURL: 'https://api.example.com'
    });

并发基于promise.all()
    axios.all(iterable)
    axios.spread(callback)*/

26.axios的特点有哪些

/*
一、Axios 是一个基于 promise 的 HTTP 库，支持promise所有的API
二、它可以拦截请求和响应
三、它可以转换请求数据和响应数据，并对响应回来的内容自动转换成 JSON类型的数据
四、安全性更高，客户端支持防御 XSRF
*/

26.axios的拦截 interceptors
/*
 1. 请求拦截（配置发送请求的信息）
 axios.interceptors.request.use(function (config){
     // 处理请求之前的配置
     config.headers={
         'Content-Type':'application/x-form-urlencoded'
     };
     return config;
 ?}, function (error){
     ?// 请求失败的处理
     ?return Promise.reject(error);
 ?});

 2. 响应拦截（配置请求回来的信息）
 axios.interceptors.response.use(function (response){
   // 处理响应数据
   return response;
 }, function (error){
   // 处理响应失败
   return Promise.reject(error);
 });

* */

27.axios的跨域
/*
主要需要配置代理vue.config.js
devServer: {
    "proxy": {
        "/api":{
            "target":"http://10.3.36.208"
        },
     }
},
 axios的配置
 axios.defaults.baseURL = '/api';
 axios.get('avertisingAction.action',{params});
 原理是
 proxyTable中拦截了/api,并把/api及其前面的所有替换成了target中的内容，
 因此loaclhost:8080/api/avertisingAction.action实际访问Url是http://10.3.36.208/avertisingAction.action。

*/

28.keep-alive缓存的几种方式
/*
* 1.利用路由元字符 meta:{needAlive:true}
* <keep-alive>
*     <router-view v-if="$route.meta.keepAlive"></router-view>
* </keep-alive>
* <router-view v-if="!$route.meta.keepAlive"></router-view>
*
* 2.利用keep-alive的include
* include 和 exclude 属性允许组件有条件地缓存。
* <keep-alive :include="keepAliveRouter">
*     <router-view></router-view>
* </keep-alive>
* keepAliveRouter可以用逗号分隔字符串、正则表达式或一个数组表示组件的名称
* 如果需要缓存的组件视情况而定可以:  keepAliveRouter是一个数组，包含需要缓存的组件的 name ，需要缓存哪些组件操作数组就可以了
*
* */

29.路由元字符mate
/*
1.设置改变页面名称
meta: {
    title: '首页'
}
$route.meta.title获取
2.判断进入此路由用户是否需要登录
meta: {
    isLogin: true
}
3.判断当前路由是否需要缓存
meta: {
    isKeep: true
}
等等。。。。，meta可以存放很多数据的
*/
29.vuex的实现原理















































