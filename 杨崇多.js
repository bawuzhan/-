/**
 * Created by bawuzhan on 2019/3/28.
 */
#### ������Щ�Ż�����

- js css ����localstorage
- dll �����ļ�Ҳ���Է���localstorage
- webp
- cdn
- ����ͼ��
- ���߰� ��rn Ҳ��һ�ַ���
- http2 ��·����   �ײ�ѹ��   ����������   ������


#### pm2 �ײ㻹��socket

#### ����һ�� �ӽ��� ������ ֮���һЩ����  ���� �ļ��������ȵ�

- ������������

####  �ڴ滺��

- node����������̣���һ�����󻺴����ڴ��У�����ÿ���������ݶ��Ƕ����ģ���Ϊ���������ǱȽϿ��
- ��4������������һ�������ˣ��������ﵽ���������ϣ��ڴ滹��û�еġ�

#### ������

- ��һ���µ��ӽ��̣�������egg �е�agent��Ȼ����µ���������
- һ����д�ڱ��أ�Ȼ��ÿ�����̶�ȡ
- redis ����Ҳ�ǿ��Ե�

#### react

- 1��setState ������ʲô p���� ����ʵ������ô���� ��
- 2���ĸ����������ǿ��� setState  �ĸ������� setState ��

#### webpack

- dll �����ʵ�ֵģ�ԭ����ʲô ��
- webpack ���������δ���ģ�������ʲô���⣬Ϊʲô����������̾ͺ� ��


#### vue

- diff �㷨 ��ν����� ʱ�临�Ӷ� ����֮ǰ�� ��vue�����м��أ� ��

#### fastClick

- ���մ���ķ�����  touch

#### Ϊʲôcss ����js ����Ҫ��

- ��Ϊcss �� render��  js ��Ҫʹ��js ���� ����js Ȼ��

#### dishMemory �� cashMemory ʲô���� ��


/**
 * ����ƽ̨��
 * ��������
 * ������� 7~8 ���������
 */

/**
 * react  ��---> ��ͨ�� props
 *        ��---> �� ��������д��ݺ��� ������е��ú��������������������
 * setState ���첽�� �������첽��δ��� �� promise �ǲ��ǿ�����
 * �߽����  ��״̬���
 */

/**
 * vue ���ͨ�� vue �ǵ���������
 * https://www.cnblogs.com/tiedaweishao/p/8933153.html
 * �е�event bus
 * 1��emit
 * 2��vuex
 *
 */

// node eventʱ��ѭ���м������� ��Լ7 8��
/**
 * pormise.then
 * setTimeout(() => {

 }, timeout);
 setImmediate
 process.nextTick()
 */
// ��˼�ǻص����������¼����еĶ�β
// ���̺߳��¼����еĺ���ִ�����֮������ִ�ж�ʱ���Ļص������������ʱ���Ķ�ʱ����ͬ�ģ��Ͱ���ʱ���ص��������Ⱥ�˳����ִ�С�
// setTimeout(() => {
//     console.log('setTimeout');
// }, 0);
// setImmediate(() => {
//     console.log('setImmediate');
// })
// for (let index = 0; index < 10; index++) {
//     setTimeout(() => {
//         console.log('setTimeout');
//     }, 0);
//     setImmediate(() => {
//         console.log('setImmediate');
//     })
// }

// setImmediate()�ǽ��¼����뵽�¼�����β�������̺߳��¼����еĺ���ִ�����֮������ִ��setImmediateָ���Ļص���������setTimeout(fn,0)��Ч����࣬���ǵ�����ͬʱ��ͬһ���¼�ѭ����ʱ��ִ��˳���ǲ����ġ�����setTimeout��setImmediateҲ��һ�������𣨻���̽��...��

// ���ӽ���ͨѶ
// on message �¼���Ϊ node events ��Ϊ
// �ֵܽ���ͨ�� ͨ�� redis ���͵����ݿ�

// react ��vue ���ǵ����������ģ�vue �����ʵ����ͼ���� data ���µģ�
// angular ��˫���

/**
 * ts�о�̬�����
 * vue�еĴ���̬�������ʲô��ͬ��
 */

/**
 * es6 module
 * require ��ͬ������ģ�� �Ƕ�����ʵ���첽����ģ��
 * import {  } from "module"; ��webpack�е�shak �����Ƿ���ͬ
 * ��������ڴ���type="module"��<script>�������첽����
 * ���Node ��import�������첽���أ���һ����������Ĵ�������ͬ
 * İİ��˵�� ��ͬ��
 */

/**
 * koa2 ��promise.resolveǶ�ף���koa1������ generator
 *
 */

/**
 * csrf ��վʽ ����ι�����
 * xss  �Լ���һЩ�ű����������ݿ����� ����Ҳ�ܿ�����Ӱ�����
 */

/**
 * ��ͨ��ajax �� http ʲô����
 * �����http �� �������ʲô����
 *
 /**
 * �������
 * https://segmentfault.com/a/1190000008677697
 * async await co�ĸ���
 * �� generator ʲô��ͬ��next
 * await �����ǲ��ɸ������� ���������͵Ķ���Ҳ�ǿ��Եģ�number string�ȵ�
 * co yield ֻ�ܸ�thunk ���� �� promise
 *
 */


/**
 * decorate��װ����ģʽ�� ģʽ��ʵ�ֺ�ʹ�ó���
 */

/**
 * 6���첽 1��ִ���� --> 234���� 5 ��6 ����ִ��
 * ��� await  ���� yield�Ϳ����� ����ʵ��
 */

/**
 * webpack ���������һ��ͼƬ webpack loader �Ὣ������ȥ
 * ����Ƕ�̬�������˵������ȥ���Ҹо�Ӧ�û�
 */
/**
 * mongo �﷨��ʹ��
 * redis ����ʹ������
 * sql �﷨��ʹ��
 */

/**
 * ����ж������̺��ӽ��� isMaster
 * �ܹ��Լ�ʵ�� �̳�ά��֮�����Ϊ
 */

/**
 * for of
 * ֻ�ܱ����� �������ӿڵ����ݽṹ�����js ��������ԭ����֧�ֱ������ӿ� ��Iterator �ӿڣ��Ǿ��޷�ʹ��
 * for in������
 * Object.getPrototypeOf ����������
 * û���������
 * */
// ԭ��֧�� �������Ľӿڵ� �� û�ж���
// Array
// Map
// Set
// String
// TypedArray
// ������ arguments ����
// NodeList ����
const obj = {
    [Symbol.iterator]: function () {
    return {
        next: function () {
            return {
                value: 1,
                done: true
            };
        }
    };
}
};
var it = obj[Symbol.iterator]();
// ����һ������������
console.log(it.next());

// ����ʹ�ñ������ӿ� ���бȱ������� obj ��û�б������ӿڵģ�����������һ�� Symbol.iterator  �������ӿ�
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
console.log(iter.next());  // { value: 'a', done: false }
console.log(iter.next()); // { value: 'b', done: false }
console.log(iter.next());// { value: 'c', done: false }
console.log(iter.next());
// ��������� �����������ı������ӿڲ�����Ч����


// ��ԭ���ϵķ��� for in
Object.prototype.method = function () {
    console.log(this);
}
var myObject = {
    a: 1,
    b: 2,
    c: 3
}
for (const key in myObject) {
    if (myObject.hasOwnProperty(key)) {
        const element = myObject[key];
        console.log(element);
    }
}
for (var key in myObject) {
    console.log(key);
}

// for of ������� ԭ���ϵķ��� for in �ǿ��Ա���ԭ���Ͽ�ö�ٵķ���������
// getPrototypeOf ��ȡĳ�����ԭ��
// for of��˽�е����ԣ� ��getPrototypeOf��ԭ���ϵķ��� -----������ö�ٵģ�����ö�ٱ���Ҳ�޷��ȱ�������
// for in ˽�еĺ� ԭ���Ͽ�ö�ٵ�
Array.prototype.method = function () {
    console.log(this.length);
}
var myArray = [1, 2, 4, 5, 6, 7]
myArray.name = "����";
for (var value of myArray) {
    console.log(value);
}

// �ص�
// ����ԭ������ Iterator �ӿڵ����ݽṹ�������Լ�д���������ɺ�����for...ofѭ�����Զ��������ǡ�����֮�⣬�������ݽṹ����Ҫ�Ƕ��󣩵� Iterator �ӿڣ�����Ҫ�Լ���Symbol.iterator�������沿�������Żᱻfor...ofѭ��������


// �������������
/**
 * react�ļ̳к� extend ��ʲô����
 * vue��react�е� minx ������ ������ĳ����������
 */

/**
 * ʵ��һ���̳� extend �Ӽ��ķ������ܸı丸���ķ��� �̳еĶ�������
 * ���� http://www.jb51.net/article/60499.htm
 * */


// setImmediate(function () {
//   console.log(1);
// }, 0);
// setTimeout HTML5�涨setTimeout����С���ʱ����4ms��Ҳ����˵0ʵ����Ҳ���Ĭ������Ϊ��Сֵ4ms
// setTimeout(function () {
//   console.log(2);
// }, 0);
// new Promise(function (resolve) {
//   console.log(3);
//   resolve();
//   console.log(4);
// }).then(function () {
//   console.log(5);
// });
// console.log(6);
// process.nextTick(function () {
//   console.log(7);
// });
// console.log(8);


/**
 * https://segmentfault.com/a/1190000008595101
 * �������
 * ΢����
 * setImmediate���ǽ��¼�ע�ᵽ��һ��Event Loop
 * macro-task: script (�������)��setTimeout, setInterval, setImmediate, I/O, UI rendering.
 * micro-task: process.nextTick, Promise(ԭ��)��Object.observe��MutationObserver
 */
// setTimeout �����4ms �㼴ʹ������0 Ҳ�ǲ���
// var t1 = +new Date();
// setImmediate(function () {
//   console.log('1');
// });
// setTimeout(function () {
//   console.log('2');
// });

// console.log('3');
// var t2 = +new Date();
// console.log('time: ' + (t2 - t1));
//���
// 3
// time: 23
// 1
// 2

setTimeout(function () { console.log(5) }, 0);
setImmediate(() => {
    console.log('6');
})
new Promise(function (resolve) {
    console.log(1)
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve()
    }
    console.log(2)
}).then(function () {
        console.log(5)
    });
process.nextTick(() => {
    console.log('4');
})
console.log(3);























