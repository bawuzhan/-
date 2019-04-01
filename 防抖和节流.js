/**
 * Created by bawuzhan on 2019/3/26.
 */
���������
/*�����ͽ����������Ӧ�����ϴ���Ƶ��������������ֽ�������� �ڸ�DOM���¼�ʱ����Щ�¼��������޷����ƴ���Ƶ�ʵġ� ������ƶ��¼�onmousemove, �����������¼�onscroll�����ڴ�С�ı��¼�onresize��˲��Ĳ������ᵼ����Щ�¼��ᱻ��Ƶ������ ����¼��Ļص�������Ϊ���ӣ��ͻᵼ����Ӧ�����ϴ���������ҳ�濨�٣���������*/

//���� �ص��ǵ��¼������������ϴ���ʱ������ֻ��ִ��һ�Ρ�
function debounce(fn, wait) {
    var timeout = null;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}
// ������
function handle() {
    console.log(Math.random());
}
// �����¼�
window.addEventListener('scroll', debounce(handle, 1000));





//���� �ص��ǵ��¼������������ϴ���ʱ  ÿһ��ִ��һ��
var throttle = function(func, delay) {
    var timer = null;
    var startTime = Date.now();
    return function() {
        var curTime = Date.now();
        var context = this;
        var args = arguments;
        if (curTime - startTime >= delay) {
            func.apply(context, args);
            startTime = Date.now();
        }
    }
}
function handle() {
    console.log(Math.random());
}
window.addEventListener('scroll', throttle(handle, 1000));





