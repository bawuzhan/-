/**
 * Created by bawuzhan on 2019/3/28.
 */
//JavaScript�����л���:

//��1������ͬ�����������߳���ִ�У��γ�һ��ִ��ջ��execution context stack����
//��2�����߳�֮�⣬������"�������"(task queue)��ֻҪ�첽�����������н��������"�������"֮�з���һ���¼���
//��3��һ��"ִ��ջ"�е�����ͬ������ִ����ϣ�ϵͳ�ͻ��ȡ"�������"��������������Щ�¼�����Щ��Ӧ���첽�������ǽ����ȴ�״̬������ִ��ջ����ʼִ�С�
//��4�����̲߳����ظ�����ĵ�����

//����ջ�е�ͬ������ִ����ϣ�ջ�ڱ�����ˣ��ʹ������߳̿����ˣ����ʱ��ͻ�ȥ��������а���˳���ȡһ��������뵽ջ��ִ�С�ÿ��ջ�ڱ���գ�����ȥ��ȡ���������û�������оͶ�ȡִ�У�һֱѭ����ȡ-ִ�еĲ���


//JavaScript���������첽����:


//������: script��������룩, setTimeout, setInterval, setImmediate, I/O, UI rendering
//΢����: process.nextTick��Nodejs��, Promises, Object.observe, MutationObserver async/await;

//�¼�ѭ��(event-loop)��ʲô��

//���̴߳�"�������"�ж�ȡִ���¼������������ѭ�����ϵģ�������Ʊ���Ϊ�¼�ѭ����
//�˻��ƾ�������:���̻߳᲻�ϴ���������а�˳��ȡ����ִ�У�ÿִ����һ�����񶼻���΢��������Ƿ�Ϊ�գ�ִ����һ������ľ����־�Ǻ���ִ��ջΪ�գ��������Ϊ�����һ����ִ��������΢����Ȼ���ٽ�����һ��ѭ��ȥ���������ȡ��һ������ִ�С�


//Ϊʲô����Ҫevent-loop?
//��Ϊ JavaScript �ǵ��̵߳ġ����߳̾���ζ�ţ�����������Ҫ�Ŷӣ�ǰһ������������Ż�ִ�к�һ������
// ���ǰһ�������ʱ�ܳ�����һ������Ͳ��ò�һֱ���š�
// Ϊ��Э���¼���event�����û�������user interaction�����ű���script������Ⱦ��rendering�������磨networking���ȣ��û�����user agent������ʹ���¼�ѭ����event loops����

//event-loopѭ������
//1.��ִ�����߳��ϵ�����ͬ�����룩
//2.����������е��첽����ŵ����߳���
//3.����΢���񣬲�ִ��΢����ֱ������������ִ�����
//4.�ص������� ִ���������ϵ���ӵĶ����еķ��� ѭ�����ϵĲ���






console.log('script start');

setTimeout(function () {
    console.log('setTimeout---0');
}, 0);

setTimeout(function () {
    console.log('setTimeout---200');
    setTimeout(function () {
        console.log('inner-setTimeout---0');
    });
    Promise.resolve().then(function () {
        console.log('promise5');
    });
}, 0);

setTimeout(function () {
    console.log('setTimeout---01');
}, 0);

Promise.resolve().then(function () {
    console.log('promise1');
}).then(function () {
    console.log('promise2');
});
Promise.resolve().then(function () {
    console.log('promise3');
});
console.log('script end');


//start
//end
//promise1
//promise3
//promise2
//console.log('promise2');
//setTimeout---0
//setTimeout---200
//setTimeout---01
//promise5
//inner-setTimeout---0//�ڶ�����ӵ����߳� �������ִ��


//���ϴ���ִ�в���
/*
*����˳��ִ�����������ϵ�ͬ�����񣬵�һ������һ���console.log
 ��������setTimeout 0�������������� 0ms �󽫻ص������ŵ������������(�����������һ�ε��¼�ѭ����ִ��)��
 ��������setTimeout 200�������������� 200ms �󽫻ص������ŵ������������(�������������һ�ε��¼�ѭ����ִ��)��
 ͬ������ִ����֮�����ȼ��΢�������, �� microtask���У����ִ˶��в�Ϊ�գ�ִ�е�һ��promise��then�ص������ 'promise1'��Ȼ��ִ�еڶ���promise��then�ص������'promise3'�����ڵ�һ��promise��.then()�ķ�����Ȼ��promise�����Եڶ���.then()��ŵ�microtask���м���ִ�У���� 'promise2';
 ��ʱmicrotask����Ϊ�գ�������һ���¼�ѭ��, ����������У������� setTimeout�Ļص�����������ִ�лص�������� 'setTimeout---0',���microtask ���У�����Ϊ�գ�������һ���¼�ѭ��.
 ����������У������� setTimeout�Ļص�����, ����ִ�лص��������'setTimeout---200'.
 ��������setTimeout 0�������������� 0ms �󽫻ص������ŵ�����������У����΢������У��� microtask ���У����ִ˶��в�Ϊ�գ�ִ��promise��then�ص������'promise5'��
 ��ʱmicrotask����Ϊ�գ�������һ���¼�ѭ��������������У������� setTimeout �Ļص�����������ִ�лص�������������'inner-setTimeout---0'������ִ�н���.
* */
