/**
 * Created by bawuzhan on 2019/2/18.
 */
1.ʲô��mvvm
//MVVM��Model-View-ViewModel����д��
//View �� Model ֮�䲢û��ֱ�ӵ���ϵ������ͨ��ViewModel���н�����Model �� ViewModel ֮��Ľ�����˫��ģ� ���View ���ݵı仯��ͬ����Model�У���Model ���ݵı仯Ҳ��������Ӧ��View �ϡ�
//Vue��������Ϊ�����ģ�Vue����DOM�����ݽ��а󶨣�һ�������󶨣�DOM�����ݽ�����ͬ����ÿ�����ݷ����仯��DOM����ű仯��

2.vue���ص�
//��ࣺҳ����HTMLģ��+Json����+Vueʵ�����
//�����������Զ��������Ժ�׷��������ģ����ʽ
//��������ÿɸ��á���������������ҳ��
//������������С��������������
//���٣���ȷ��Ч����DOM����
//ģ���Ѻã���ͨ��npm��bower�ȶ��ַ�ʽ��װ������������

3.vue�������ڵ����
//�ܹ���Ϊ8���׶δ���ǰ/������ǰ/�󣬸���ǰ/������ǰ/��
//beforeCreate           ����������ʾloading
//created  ��ʼ��data     �����첽��������
//beforeMount
//mounted  ���ص�dom��     ���Ի�ȡdom  Ҳ������nextTick(()=>{getDOM}) ΢����
//beforeUpdate
//updated  ���ݸ���
//beforeDestroy
//destoryed  ���ٽ��������dom�İ�

4.���֮��Ĵ�ֵ��7�ַ�ʽ ��
//������    �Զ������Դ���  props����


//�Ӵ���     $emit�¼��������(�����emit�Զ����¼��������ִ���Զ����¼�)


//�ֵ����֮��  �¼���  let bus=new Vue()  ͨ��bus.$emit�����¼���bus.$on�����������¼�


//$attrs��$listeners ���ڸ�����������ݸ������������������������
/*$attrs �����õ�������ϵ��������ԣ�����prop���ݵ����ԡ�class �� style ��    ��������Ե���ʹ��$attrs
eg��<child1 :title='123' :msg='456'></child1>  �����props:['msg']   ͨ��{{$attrs.title}}���õ�123,������msg��ֵ�� ��Ϊ��propsռ����
inheritAttrs��Ĭ��ֵtrue,�̳����еĸ�������ԣ���props���ض��󶨣���Ϊ��ͨ��HTML����Ӧ����������ĸ�Ԫ���ϣ�����㲻ϣ������ĸ�Ԫ�ؼ̳���������inheritAttrs: false,����class���Ի�̳�
$listeners-���ԣ�����һ����������������������������ϵ����м���������Ϳ������ v-on="$listeners" �����е��¼�������ָ����������ĳ���ض�����Ԫ�ء�

<child2 v-bind="$attrs" v-on="$listeners"></child2> //$attrs: {title:123}

<div class="child-2">
    <p>in child2:</p>
    <p>props: {{title}}</p> //123
    <p>$attrs: {{$attrs}}</p>//{{�յ�}}  ����ִ��үү����ϵķ���
<hr>
</div>*/


//provide��inject ����� provide:{a:123}, ����� inject:['a'] �õ��������������  �������ǿ���Ӧ�ģ�����㴫����һ���ɼ����Ķ�����ô���������Ի��ǿ���Ӧ�ģ�


//this.$parent ��ȡ������޸ĸ��������  ��this.$children[0]��ȡ������޸�������е�����   ����


//vuex�������֮������ݽ���  ����ͳһ����  ���



5.·��֮����ת��ʽ
//����ʽ����ǩ��ת�� <router-link to="url" tag="a"></router-link>
//���ʽ�� js��ת��  this.$router.go()����ǰ���ͷ���������ʷ��¼/this.$router.push()����һ����ʷ��¼/this.$router.replace()��һ��·�ɱ��滻����ʷ��¼��û����һ����¼��

6.�����ʹ�ú��Լ��������������
//��һ������componentsĿ¼�½��������ļ���indexPage.vue����scriptһ��Ҫexport default {}
//�ڶ���������Ҫ�õ�ҳ�棨������е��룺import indexPage from '@/components/indexPage.vue'
//��������ע�뵽vue���������components��������,components:{indexPage}
//���Ĳ�����template��ͼview��ʹ�ã�
//������indexPage������ʹ�õ�ʱ����index-page��

7.������أ����webpack����
//webpack���ṩ��require.ensure()��ʵ�ְ�����ء���ǰ����·����ͨ��import �����ķ�ʽ���룬��Ϊconst����ķ�ʽ�������롣
//������ҳ�水��������뷽ʽ��import home from '../../common/home.vue'
//����ҳ�水����ص����뷽ʽ��const home = r => require.ensure( [], () => r (require('../../common/home.vue')))


8.vue-router���ļ��ֵ�������(),���÷���
��beforeEach��beforeResolve��afterEach��  ��beforeEnter��  ��beforeRouteEnterû��this/beforeRouteUpdate/beforeRouteLeave��ע��next
//ȫ�ֵ�(beforeEach,beforeResolve,afterEach), ����·�ɶ����(beforeEnter), ���������ʹ�õ�(beforeRouteEnter,beforeRouteUpdate,beforeRouteLeave)
//1).ȫ��ǰ������:beforeEach
//�������ѯ�ĸı䲢���ᴥ������/�뿪�ĵ�������
//����ͨ���۲� $route ������Ӧ����Щ�仯����ʹ�� beforeRouteUpdate �����������
//
//    const router = new VueRouter({ ... })
//    router.beforeEach((to, from, next) => {
//        // ...
//        next()//����ִ�У�����������
//    })
//
//2).ȫ�ֽ�������:beforeResolve
//�ڵ�����ȷ��֮ǰ��ͬʱ������������������첽·�����������֮�󣬽��������ͱ�����
//router.beforeResolve((to, from, next) => {
//    // ...
//    next()//����ִ�У�����������
//})
//3).ȫ�ֺ��ù���:afterEach
//������� next ����Ҳ����ı䵼������
//router.afterEach((to,from)=>{
//    //�������������
//})
//4).·�ɶ��������:beforeEnter
//�����ڵ���·���ϵģ��������·��ʱ����
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
//5).����ڵ�����:beforeRouteEnter/beforeRouteUpdate/beforeRouteLeave
//const Foo = {
//    template: `...`,
//    beforeRouteEnter (to, from, next) {
//        // ����Ⱦ������Ķ�Ӧ·�ɱ� confirm ǰ����
//        // �����ܣ���ȡ���ʵ�� `this`
//        // ��Ϊ������ִ��ǰ�����ʵ����û������
//    },
//    beforeRouteUpdate (to, from, next) {
//        // �ڵ�ǰ·�ɸı䣬���Ǹ����������ʱ����
//        // ������˵������һ�����ж�̬������·�� /foo/:id���� /foo/1 �� /foo/2 ֮����ת��ʱ��
//        // ���ڻ���Ⱦͬ���� Foo �����������ʵ���ᱻ���á���������Ӿͻ����������±����á�
//        // ���Է������ʵ�� `this`
//    },
//    beforeRouteLeave (to, from) {
//        // �����뿪������Ķ�Ӧ·��ʱ����
//        // ���Է������ʵ�� `this`
//    }
//}

9.mint-ui��ʲô����ôʹ�ã�˵�������������ʹ�÷�����
//����vue��ǰ������⡣npm��װ��Ȼ��import��ʽ��js��vue.use��mintUi��ȫ�����롣�ڵ�������ֲ����룺import {Toast} from ��mint-ui�������һ��Toast(����¼�ɹ���)���������mint-header���������mint-swiper

10.v-modelʵ��˫��� Object.defineProperty(obj,val,{get(){},set(){}})
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

11.computed��watch������
// computed
// 1. ֧�ֻ��棬ֻ���������ݷ����ı䣬�Ż����½��м���
// 2. ��֧���첽
// 3. ���һ�����������������Լ�������ģ�������������������ԣ���һ�����һ��һ����computed��
// watch :
// 1. ��֧�ֻ��棬���ݱ䣬ֱ�ӻᴥ����Ӧ�Ĳ�����
// 2. watch֧���첽��
// 3. ��һ�����Է����仯ʱ����Ҫִ�ж�Ӧ�Ĳ�����һ�Զࣻ

12.�Զ���ָ����Զ����������һ�㵥��д���ļ������ص�ȫ�֣�
//Vue.directive('focus',{
//    bind: function (el, value) {
//        //ֻ����һ�Σ�ָ���һ�ΰ󶨵�Ԫ��ʱ���á���������Խ���һ���Եĳ�ʼ�����á�
//    },
//    inserted: function (el, value) {
//        //����Ԫ�ز��븸�ڵ�ʱ����
//    },
//    update:function(el,value){//��������� VNode ����ʱ���ã����ǿ��ܷ��������� VNode ����֮ǰ
//        if(value.value){
//            el.focus();
//        }
//    },
//    componentUpdated:function(el,value){//ָ����������� VNode ������ VNode ȫ�����º���á�
//
//    },
//    unbind:function(el,value){
//        //ֻ����һ�Σ�ָ����Ԫ�ؽ��ʱ���á�
//    },
//
//})
���ڣ�bind��inserted��update��componentUpdated��unbind
//vue.filters('fixed', function (data,n) {
//    return data.toFixed(n);
//})
���õĹ����� fixed  ����ĸ��д��
�Զ���ָ��  focus ��ק

13.����������
//ֻ�ܸ�������ݸı���������ݣ�������������ݸı����������

14.����˫�򴫵� sync�﷨��
//�����<Parent :msg.sync="msg1"></Parent>

//����� this.$emit('update:msg', 'newMsg');
//props:['show']

15.��˵�·�װ vue ����Ĺ���
//ʹ��Vue.extend��������һ�������
//Ȼ��ʹ��Vue.component����ע��������������Ҫ���ݣ�
//������props�н��ܶ��塣��������޸ĺ����ݺ�
//������ݴ��ݸ��������
//���Բ���emit������

16.vue-loader��ʲô��ʹ��������;����Щ��
//vue-loader��webpack��loader���
//vue-loader�����.vue�ļ��е�ÿ�����Կ飬Ȼ���䵽������loaders�����������module.exports��vue��������ö����CommonJSģ�顣

17.��Vue.js��template�������⣿
/*
* ��ת��ΪAST�����ڵõ���render�����з���VNode��vue������DOM�ڵ㣩
*
*���ȣ�ͨ��compile��������template�����AST�﷨����abstract syntax tree �� Դ����ĳ����﷨�ṹ����״������ʽ����compile��createCompiler�ķ���ֵ��createCompiler�����Դ����������ġ�����compile������ϲ�option��

 Ȼ��AST�ᾭ��generate����AST�﷨��ת����render funtion�ַ����Ĺ��̣��õ�render������render�ķ���ֵ��VNode��VNode��Vue������DOM�ڵ㣬�����У���ǩ�����ӽڵ㡢�ı��ȵȣ�
*
* */

18.vuex��ʲô
//һ��רΪ Vue.js Ӧ�ó��򿪷���״̬����ģʽ����������������ҳ�湲��һ��data�⣩
//State��Actions��Mutations��Getters��Modules

19.vue-router��ʹ�÷���

/*
import Router from 'vue-router';
let router=vue.use(Router);
let routes=[]//·�������ļ�
export default new Router({routes});

const app = new Vue({
    router
}).$mount('#app')
*/


20.Vue��˫�����ݰ�ԭ����ʲô
//Object.defineProperty(obj,key,{set(){},get(){}})

//����ʵ��
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

21.vue��Ӧʽԭ��
//��һ������Ҫobserve�����ݶ�����еݹ���������������Զ�������ԣ������� setter��getter
//�����Ļ�������������ĳ��ֵ��ֵ���ͻᴥ��setter����ô���ܼ����������ݱ仯
//
//�ڶ�����compile����ģ��ָ���ģ���еı����滻�����ݣ�Ȼ���ʼ����Ⱦҳ����ͼ������ÿ��ָ���Ӧ�Ľڵ�󶨸��º�������Ӽ������ݵĶ����ߣ�һ�������б䶯���յ�֪ͨ��������ͼ
//
//��������Watcher��������Observer��Compile֮��ͨ�ŵ���������Ҫ����������:
//  1��������ʵ����ʱ�����Զ�����(dep)��������Լ�
//  2�����������һ��update()����
//  3�������Ա䶯dep.notice()֪ͨʱ���ܵ��������update()������������Compile�а󶨵Ļص����򹦳����ˡ�
//
//���Ĳ���MVVM��Ϊ���ݰ󶨵���ڣ�����Observer��Compile��Watcher���ߣ�ͨ��Observer�������Լ���model���ݱ仯��ͨ��Compile����������ģ��ָ���������Watcher����Observer��Compile֮���ͨ���������ﵽ���ݱ仯 -> ��ͼ���£���ͼ�����仯(input) -> ����model�����˫���Ч����

22.vue-routerʵ��ԭ��
    /*function install(_vue){
        _vue.mixin({
            beforeCreate(){
                //��ÿ�����ע��ʵ��router����
                //Object.defineProperty()����·�ɶ���ı仯����ȡ��ǰ��·�ɶ���current
            }
        })
        //ע��ȫ�ֵ�router-link��router-view���
    }
    VueRouter��
    �ж�mode ��ȡ���ö���ӳ�䣬
    �ֱ�����ԭ����history��popstate �� hash��hashChange������·�ɱ仯
    ��ʼ��ǰ·�ɣ���routerʵ�����go replace push ��ʵ���Ĺ��з���
    ƥ�����ǰ��·�� ִ�����еĹ��Ӻ���
    ����current����
    ��ӳ��������õ���Ҫ��Ⱦ�����current.component
    ����·�ɶ���仯��������Ⱦҳ��*/

23.vuejs��react������
�Ա�react
    ʹ�� Virtual DOM��js����
    �ṩ����Ӧʽ (Reactive) ������� (Composable) ����ͼ�����
    ��ע�������б����ں��Ŀ⣬��������������·�ɺ�ȫ��״̬��������صĿ⡣
react
    jsx
    mvc
    ��Ⱦ��ʽ--�ӵײ����������
    ע���߼�
    ʵ��ԭ�� �������� �������Ա仯 �Ա�����DOM �Ӹ��������
    props��State
    redux react-redux
vue
    template
    mvvm
    ��Ӧʽ-����������仯�͸�������
    ע����ͼ
    ʵ��ԭ��Object.defineProperty()�������ݱ仯+���ķ���ģʽ
    ָ��
    ��������
    �¼�������+���η�
    ��������
    ·��
    ���ݴ���
    vuex

24.vueԴ��ṹ

vue new��ʱ������ʲô ���� �������ڵ����

����һ��vue��ʵ��   ִ��init����
��init�г�ʼ�������е�options���� �����е�options�����ص���$options�ϣ�����ʼ�����¼�����
��ʼ����һЩ��Ⱦ����$slots��$createElement
�ҹ���beforeCreate ��options���õ�������Ȼ�� $emit ��ǰ�Ĺ���
��ʼ����options�ϵ����е����� get�������get set����
������created���Ӻ���  �����Ѿ��󶨣� ����δ������ʵdom
����Ԫ�صĹ��أ� $el / vm.$mount()

beforeMount: ģ�����/����֮ǰ
ִ��render function��������ʵ��dom�����滻��dom tree��
����������Ⱦ���� html�ַ��� �� render���� �� vnode �� ��ʵdom�ڵ�
������ʱ��Ⱦ����ν��ȥ���������Ĺ��̣�render���� �� vnode �� ��ʵdom�ڵ㡣
mounted: ����ѹ���

update:ִ��diff�㷨���ȶԸı��Ƿ���Ҫ����UI����
watcher.before: ����beforeUpdate����	- watcher.run(): ִ��watcher�е� notify��֪ͨ�������������UI
����updated����: ����Ѹ���

beforeDestroy: ���ٿ�ʼ
���������ҵݹ�����������Լ��¼�����
remove(): ɾ���ڵ�
watcher.teardown(): �������
vm.$off(): ������
destroyed: ��ɺ󴥷�����







dom diff�㷨







$mount �ڲ�ʵ��
���̣�el->template->compileToFunctions->render->vm._render->vnode->vm._update->vm.$el

el->template
���������ж�option������û��render������û�еĻ�����һ���ж���û��template��û�еĻ�����domԪ�ص�outerHTML��


template->render
    ��template������ast�﷨�����󡣣� ʹ������
    compileToFunctionsͨ��ast�﷨������render������
    render����:
    eg:render: function (createElement) {
        return createElement('h1', '����')
    }
��һ���ǽ� ģ���ַ��� ת���� element ASTs����������
�ڶ����Ƕ� AST ���о�̬�ڵ��ǣ���Ҫ����������DOM����Ⱦ�Ż����Ż�����
�������� ʹ�� element ASTs ���� render ���������ַ�����������������





render->vnode
vnode�ı��� new VNode();
vnode = render.call(vm._renderProxy, vm.$createElement);
render������ִ�У�������createElement���������ڲ�ͨ���������ز��������ݲ�ͬ���ͣ�һ������������VNode��

vm._render��������һ��vnode��Ϊ vm._update�ĵ�һ������
updateComponent = () => {//������� ��������
    vm._update(vm._render(), hydrating)
}
watcher����vm�仯����������� new Watcher(vm, updateComponent, noop, null, true)


vnode->vm.$el
ʵ�ֹ�����Ҫ��ͨ��vm.$el = vm.__patch__(prevVnode, vnode);








25.��������������������
//historyģʽ,��̨����
//watch���ܼ���object ��Ϊ��Ҫ watch:{data:{handler:(val,oldVal)=>{},deep:true}}
//��·��Ĭ��������� ���ÿյ���·�ɼ���
//��������beforeRouteEnter��thisָ��
//element����ľ���Ļ�Ҳ�8px���
//DOM����û��#nextTick
//vue��ʹ�ü�ͷ����   thisָ�򲻶�
//keep-alive �������
//transition-groupʹ��ʱ��keyֵ��  ����ʹ��index��Ҫ���ù̶������keyֵ
//�༶�˵� ��ȷ���㼶�Ľ����ʽ    �ݹ����

//������
26.axios��ʹ��
/*����ʹ��
    axios({method:'',url: '/user/12345', data: {})
    axios.get(url,{params})/axios.post(url,data)/delete/head/options/put/patch
�������Ŀ�������ѡ��
    url
    method
    baseURL
    data
    params
    headers
    timeout
    responseType
    withCredentials:false����
    paramsSerializer ��ʽ������

    transformRequestת����������
    transformResponseת����Ӧ����

Ĭ������
    ȫ��Ĭ������
    axios.defaults.baseURL = 'https://api.example.com';
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    ����ʵ��ʱ����Ĭ������axios.create
    var instance = axios.create({
        baseURL: 'https://api.example.com'
    });

��������promise.all()
    axios.all(iterable)
    axios.spread(callback)*/

26.axios���ص�����Щ

/*
һ��Axios ��һ������ promise �� HTTP �⣬֧��promise���е�API
���������������������Ӧ
����������ת���������ݺ���Ӧ���ݣ�������Ӧ�����������Զ�ת���� JSON���͵�����
�ġ���ȫ�Ը��ߣ��ͻ���֧�ַ��� XSRF
*/

26.axios������ interceptors
/*
 1. �������أ����÷����������Ϣ��
 axios.interceptors.request.use(function (config){
     // ��������֮ǰ������
     config.headers={
         'Content-Type':'application/x-form-urlencoded'
     };
     return config;
 ?}, function (error){
     ?// ����ʧ�ܵĴ���
     ?return Promise.reject(error);
 ?});

 2. ��Ӧ���أ����������������Ϣ��
 axios.interceptors.response.use(function (response){
   // ������Ӧ����
   return response;
 }, function (error){
   // ������Ӧʧ��
   return Promise.reject(error);
 });

* */

27.axios�Ŀ���
/*
��Ҫ��Ҫ���ô���vue.config.js
devServer: {
    "proxy": {
        "/api":{
            "target":"http://10.3.36.208"
        },
     }
},
 axios������
 axios.defaults.baseURL = '/api';
 axios.get('avertisingAction.action',{params});
 ԭ����
 proxyTable��������/api,����/api����ǰ��������滻����target�е����ݣ�
 ���loaclhost:8080/api/avertisingAction.actionʵ�ʷ���Url��http://10.3.36.208/avertisingAction.action��

*/

28.keep-alive����ļ��ַ�ʽ
/*
* 1.����·��Ԫ�ַ� meta:{needAlive:true}
* <keep-alive>
*     <router-view v-if="$route.meta.keepAlive"></router-view>
* </keep-alive>
* <router-view v-if="!$route.meta.keepAlive"></router-view>
*
* 2.����keep-alive��include
* include �� exclude ������������������ػ��档
* <keep-alive :include="keepAliveRouter">
*     <router-view></router-view>
* </keep-alive>
* keepAliveRouter�����ö��ŷָ��ַ�����������ʽ��һ�������ʾ���������
* �����Ҫ���������������������:  keepAliveRouter��һ�����飬������Ҫ���������� name ����Ҫ������Щ�����������Ϳ�����
*
* */

29.·��Ԫ�ַ�mate
/*
1.���øı�ҳ������
meta: {
    title: '��ҳ'
}
$route.meta.title��ȡ
2.�жϽ����·���û��Ƿ���Ҫ��¼
meta: {
    isLogin: true
}
3.�жϵ�ǰ·���Ƿ���Ҫ����
meta: {
    isKeep: true
}
�ȵȡ���������meta���Դ�źܶ����ݵ�
*/
29.vuex��ʵ��ԭ��















































