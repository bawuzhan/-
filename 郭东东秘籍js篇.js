//ԭ�� / ���캯�� / ʵ��
    //ÿ��ʵ��������һ��__proto__���ԣ�ָ���������ԭ�ͣ�ԭ��������ͨ��__proto__����ʵ��
    //ÿ������������һ��prototype���ԣ�ָ���Լ���ԭ�ͣ�ԭ������һ��constructor������ָ��������

//ԭ������
   //���һ��ƣ�ͨ��__proto__���ϲ���  ����˽�����ԣ����ҹ������ԣ���û�о�ͨ�� __proto__�򸸼�һ��һ����ң���û�о���undefined

//�����ļ̳�
    //ʹ�� ES6 ���﷨�� class / extends


//�������� �鼶������  let const �հ�


//script ���뷽ʽ����̬��ǩ ��̬����

//����Ŀ��� 4�ַ�ʽ
    // Object.assign()
    // ���ԭ�� �ݹ��ж�
    // JSON.parse(JSON.stringify(Obj)); �������
    //{...obj}; //ǳ����

//new�������ִ�й���
    //����һ���¶���ʵ����
    //���ӵ�ԭ��obj.__proto__ = Con.prototype
    //�����а�this ָ��ʵ��
    //�����¶���(������캯�����Լ� retrun ʱ���򷵻ظ�ֵ)



//js�������л���event-loop
    //���߳� ͬ��  �첽�������������setTimeout ajax �¼�����   ΢����promise��async/await
    //��ִ�����߳�  ִ�к� �������  ��������е�������ӵ����߳��� ��ִ��΢���� ȫ��ִ�н����� ִ���첽�������ظ�ѭ��ÿһ���첽�еĴ���


//�������͵��ж�
    ({}) instanceof  Object;  //�ж��ǲ���������,�����жϻ����������� ����ʵ���� ԭ�Ͷ����� ���ҵ��ù��캯����prototype������ָ��� ԭ�Ͷ��󣬾ͷ���true
    typeof [] == 'object'; //�����ַ������͵�ֵ
    ([]).constructor === Array// ÿһ������ʵ��������ͨ�� constrcutor ����������Ĺ��캯��
    Object.prototype.toString.call([])=='[object Array]'//ע���ߵ������õĲ�������ĸ��д
    Array.isArray([])//�ж�����

//����ʵ�ִ���ĸ���
    //������װ
    //�̳�
    //����extend
    //����mixin
    //����apply/call

//ģ�黯
    //es6: import / export
    //commonjs: require / module.exports / exports
    //amd: require / defined

//require��import������
    //require֧�� ��̬���룬import��֧�֣������᰸ (babel �¿�֧��)
    //require�� ͬ�� ���룬import���� �첽 ����
    //require�� ֵ����������ֵ�仯����Ӱ�쵼��ֵ��importָ�� �ڴ��ַ������ֵ���浼��ֵ���仯

//���������(��Ƶ�����Ż���ʽ) ���������ִ�еĹ���  ÿ�� 100~500 msִ��һ�μ���
function debounce(fn, wait, immediate) {
    let timer = null
    return function() {
        let args = arguments
        let context = this
        if (immediate && !timer) {
            fn.apply(context, args)
        }
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
                fn.apply(context, args)
        }, wait)
    }
}

function throttle(fn, wait, immediate) {
    let timer = null
    let callNow = immediate

    return function() {
        let context = this,
            args = arguments

        if (callNow) {
            fn.apply(context, args)
            callNow = false
        }

        if (!timer) {
            timer = setTimeout(() => {
                    fn.apply(context, args)
                    timer = null
            }, wait)
        }
    }
}
//this���� �ı�this��ָ��call apply bind

//es6��api
    //let const
    //�⹹��ֵ
    //class/extend super
    //set/map
    //Promise��ʹ����ʵ��
    //generator
    //await / async: ��generator���﷨�ǣ� babel���ǻ���promiseʵ��

//�����﷨�� AST
//����������ĸ������ ��״���� ����ʽ����������֮���ת���������﷨��飬�������飬�����ʽ����������������������ʾ�������Զ���ȫ�ȵȵĻ�����


//babel����ԭ��
    //babylon �� ES6/ES7 ��������� AST
    //babel-traverse �� AST ���б���ת�룬�õ��µ� AST
    //�� AST ͨ�� babel-generator ת���� ES5

//�������ﻯ����Ϻ���
function currying(fn){
    let args=[].slice.call(arguments,1);
    return function () {
        let _args=[].slice.call(arguments,0);
        fn.apply(null,args.concat(_args))
    }
}

function add(a,b){
    console.log(a+b)
    return a+b;
}
currying(add, 1)(2);
function compose(){
    let fnList=[].slice.call(arguments,0);
    let last=fnList.pop();
    fnList.reverse();
    return function () {
        let arg=[].slice.call(arguments);
        fnList.reduce(function (prev,next) {
            return next(prev);
        },last.apply(null,arg))
    }
}

function fn1(data){
    console.log(data+1);
}
function fn2(data){
    console.log(data+1);
    return data+1
}
function fn3(a,ba,c){
    console.log(a+ba+c);
    return a+ba+c
}
compose(fn1,fn2,fn3)(1,2,3);
//����
//forEach: �޷�break��������try/catch��throw new Error��ֹͣ
//[1,[2,3]] --> [1, 2, 3]
Array.prototype.flat= function () {
    return new Array([1,[2,3]].toString());
}
Array.prototype.flat = function() {
    return this.toString().split(',').map(item => +item )
}

//����
    //jsonp
    //cors��վ��Դ����
    //postmessage
    //window.domain
    //proxy����
    //websocket




/*-------------------------------------------�����----------------------------------------------------------------*/




//��������¼�ѭ��(Event Loop)
    //�¼�ѭ����ָ: ִ��һ��������Ȼ��ִ�����΢�����б�ѭ����ִ�к���������΢�����б�
    //΢���� microtask(jobs): promise / async / await / nextTick
    //������ macrotask(task): setTimout / script / IO / UI Rendering

//������ url ��չʾ�Ĺ���
    //DNS ����  ͨ����ַ������ip
    //TCP ��������
    //�������󣬷��� url������������(ͷ������)
    //����������������ļ� (html)
    //�������Ⱦ���������̣� DOM Tree==�� Style Tree==�� Render Tree==��layout
        //HTML parser --> DOM Tree
        //��ǻ��㷨������Ԫ��״̬�ı��
        //dom ������
        //CSS parser --> Style Tree
        //���� css ���룬������ʽ��
        //attachment --> Render Tree
        //��� dom�� �� style����������Ⱦ��
        //layout: ����
        //GPU painting: ���ػ���ҳ��

//�ػ������
    //�ػ�(repaint): ��Ԫ����ʽ�ĸı䲻Ӱ�첼��ʱ���������ʹ���ػ��Ԫ�ؽ��и��£���ʱ����ֻ��ҪUI������������ػ��ƣ���� ��Ľ���
    //����(reflow): ��Ԫ�صĳߴ硢�ṹ�򴥷�ĳЩ����ʱ���������������Ⱦҳ�棬��Ϊ��������ʱ���������Ҫ���¾������㣬�������Ҫ����ҳ�沼�֣�����ǽ��صĲ�����

//�����Ż�  documentFragment�ĵ���Ƭ
    //������Ч��Ӧ�õ�position����Ϊabsolute��fixed��Ԫ����
    //����Ƶ��������ʽ���ɻ��ܺ�ͳһ һ���޸�
    //����ʹ��class������ʽ�޸�
    //����dom����ɾ��������ʹ�� �ַ��� ���� documentFragment һ���Բ���

//�洢  �����Դ洢 �� �־��Դ��档
    //cookie: ͨ�����ڴ洢�û���ݣ���¼״̬��
    //http ���Զ�Я���� �������Ϊ 4K�� ���������ù���ʱ��
    // Expires�������ʱ�䣬����ָ����Դ���ڵ�ʱ�䣬�Ƿ������˵ľ����ʱ���  �ܱ���ʱ��Ӱ��
    //  Cache-control:max-age=3600 ָ��һ��ʱ�䳤�ȣ������ʱ����ڻ�������Ч�ģ���λ��s
    //localStorage / sessionStorage: ���ô���/���ڹر�ɾ���� �������Ϊ 4~5M

//V8�������ջ���
    //���ڴ��в���ʹ�õ����ݽ��������ͷų��ڴ�ռ䡣V8 ���ڴ�ֳ� �������ռ� �� �������ռ䡣
    //�������ڴ�ռ���Ҫ������Ŵ��ʱ��϶̵Ķ����������ڴ�ռ���Ҫ������Ŵ��ʱ��ϳ��Ķ��󡣶����������գ����������������и��Բ�ͬ�Ĳ���


//�ڴ�й¶(���ղ���)
    //�����ȫ�ֱ���: �޷�������
    //��ʱ��: δ����ȷ�رգ����������õ��ⲿ�����޷����ͷ�
    //�¼�����: û����ȷ���� (�Ͱ汾��������ܳ���)
    //�հ�: �ᵼ�¸����еı����޷����ͷ�
    //dom ����: dom Ԫ�ر�ɾ��ʱ���ڴ��е�����δ����ȷ���




/*----------------------------------------------�����������------------------------------------------------------------*/
//http/https Э��

//http
    // ��״̬Э�飺�޷��������ӣ���ɼ��Ͽ�,һ��ֻ�ܽ���һ��http����
    //�˿�80
//http2.0
    //��·����
    //�����Ʒ�֡��: Ӧ�ò�ʹ����֮��
    //�ײ�ѹ��
    //���������
//https: ��Ϊ��ȫ�����紫��Э��
    //֤��(��Կ)
    //SSL ����
    //�˿� 443

//����tcp ����ȫ��Э�飩

    //���ӵ���������
    //�Ͽ����Ĵλ���

//�������: �ɷ�Ϊ ǿ���� �� Э�̻���
    //ǿ����
    //Cache-Control/Expires: ������жϻ����Ƿ���ڣ�δ����ʱ��ֱ��ʹ��ǿ���棬Cache-Control�� max-age ���ȼ����� Expires
    //�������Ѿ�����ʱ��ʹ��Э�̻���
    //Э�̻���
    //Ψһ��ʶ����: Etag&if-None-Match  �������Աȱ�ʶһ�¾��߻���
    //���һ���޸�ʱ��:Last-Modified(response) & If-Modified-Since �������Ա�ʱ�������Դû��ͷ���304

//last-modify��ȱ��
    //�������޸ģ�������δ��ʱ���ᵼ�»���ʧЧ
    //��С����ֻ�� s�� s ���ڵĸĶ��޷���⵽

//����״̬��
    //1xx: ���ܣ���������
    //200: �ɹ�������������
    //201: �Ѵ���
    //202: �ѽ���
    //203: ��Ϊ����δ��Ȩ
    //204: �ɹ���������
    //205: �ɹ�����������
    //206: �ɹ�����������
    //301: �����ƶ����ض���
    //302: ��ʱ�ƶ�����ʹ��ԭ��URI
    //304: ��Դδ�޸ģ���ʹ�û���
    //305: ��������
    //400: �����﷨����
    //401: Ҫ�������֤
    //403: �ܾ�����
    //404: ��Դ������
    //500: ����������

//get / post�Աȣ�get��delete head get options����post put trace��
//����  ��ȫ  ��С����  �ɼ�



//node��event-loop�������׶�
    //timer �׶�: ִ�е��ڵ�setTimeout / setInterval���лص�
    //I/O �׶�: ִ������ѭ��������callback
    //idle, prepare
    //poll: �ȴ��ص�
    //    ִ�лص�
    //    ִ�ж�ʱ��
    //    ���е��ڵ�setTimeout / setInterval�� �򷵻� timer �׶�
    //    ����setImmediate����ǰ�� check �׶�
    //check
    //    ִ��setImmediate
    //close callbacks


//��ȫ���
    //XSS����: ע��������
        //cookie ���� httpOnly
        //ת��ҳ���ϵ��������ݺ��������
    //CSRF: ��վ����α�죬����:
        //get ���޸�����
        //������������վ���ʵ��û��� cookie
        //���ð�������������������վ����
        //����У��

//vue���������ڵ����
    //Vue.prototype._init_����
    //    �ϲ����е�options���ص�vm.$option��
    //    initLifecycle/Event����vm�Ϲ��ظ���(�������ں�������ʼ���¼�)
    //    callHook: beforeCreated: ʵ���մ���
    //    initInjection/initState: ��ʼ��ע��prop/data/computed/method/watch�� data ��Ӧ��
    //    created: ������ɣ������Ѿ��󶨣� ����δ������ʵdom
    //    ����Ԫ�صĹ��أ� $el / vm.$mount()
    //    �Ƿ���template: ������render function
    //        *.vue�ļ�: vue-loader�Ὣ<template>�����render function
    //    beforeMount: ģ�����/����֮ǰ
    //    ִ��render function��������ʵ��dom�����滻��dom tree��
    //    mounted: ����ѹ���
    //update�׶�
    //
    //    ִ��diff�㷨���ȶԸı��Ƿ���Ҫ����UI����
    //    flushScheduleQueue
    //        watcher.before: ����beforeUpdate����		- watcher.run(): ִ��watcher�е� notify��֪ͨ�������������UI
    //    ����updated����: ����Ѹ���
    //
    //actived / deactivated(keep-alive): �����٣����棬���������ʧ��
    //destroy�׶�
    //    beforeDestroy: ���ٿ�ʼ
    //    ���������ҵݹ�����������Լ��¼�����
    //        remove(): ɾ���ڵ�
    //        watcher.teardown(): �������
    //        vm.$off(): ������
    //    destroyed: ��ɺ󴥷�����



//������Ӧ��ԭ��
observe
compiler
watcher
dep



//virtual dom ԭ��ʵ��
html-template
createElement()
render()






//new Vue��ʱ��vue������ʲô
ִ��Vue.prototype._init_
����ʵ��
    �ϲ����е����ԣ����������԰�װ��$options��
    ��ʼ�����Ӻ������¼�

���԰�Created
    ��ʼ������data ����data��װ��һ������
    ����data��Ӧʽ��__ob__��Ϊ��ʶ
    ��ʼ�����е����� ��props computed/method/watch������
����ʵ�����ص�$el��beforeMount  mounted



//Proxy ����� defineProperty ������
����



//vue-router��ʹ��



//vuex��ʹ��




//�㷨


