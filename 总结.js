/**
 * Created by bawuzhan on 2019/3/25.
 */
//��������������������ô�����
//���Ž����ͽ�����ǿ

//xhr��fetch��axios ������

//xhrԭ��ajax ��֧��promise
//fetchԭ�� ����promise����
//axios��� ����axios��ajax��

//�� promise ʵ��һ������ʱ����

function delayAjax(url,method,data,delay){
    return new Promise(function(resolve,reject){
        let xhr=new XMLHttpRequest();
        xhr.open(method,url);
        xhr.onreadystatechange= function () {
            if(xhr.readyState==4&&/^2\d{2}/.test(xhr.status)){
                resolve()
            }
        }
        xhr.send(data);
        setTimeout(()=>{
            reject('����ʱ');
        },delay)
    })
}

//�����ͽ��� (��ֹ�¼��ظ�ִ��Ƶ��̫��)
function bounce(fn,delay){
    let timer;
    return function () {
        if(timer){
            clearTimeout(timer);
        }
        timer=setTimeout(function () {
            fn();
        },delay)
    }
}
function fn(){

}
window.addEventListener('scroll', debounce(fn, 1000));


function jl(fn,delay){
    let time=new Date().getTime();
    return function () {
        let cur=new Date().getTime();
        if(delay<cur-time){
            fn();
            time=new Date().getTime()
        }
    }
}
function fn(){

}
window.addEventListener('scroll', jl(handle, 1000));




//ʵ��һ�����������¼� on, once, trigger, off
function myEvent(){
    this.ary=[];
}
myEvent.prototype.on= function (cb) {
    if(!this.ary.some((item)=>{item==cb})){
        this.ary.push(cb)
    }
}
myEvent.prototype.once= function (cb) {
    let wrapFanc = (...args) => {
        cb.apply(this.args)
        this.off(wrapFanc)
    }
    this.on(wrapFanc)
}
myEvent.prototype.trigger= function () {
    this.ary.forEach((item)=>{
        item();
    })
}
myEvent.prototype.off= function (cb) {
    for(let i=0;i<ary.length;i++){
        if(ary[i]==cb){
            ary.splice(i,1);
            i--;
        }
    }
}

//���룺12345�������12,234�����룺2345.6789�������2,345.6789
function format(num) {
    let [str,sm] = num.toString().split('.');
    console.log(str)
    str=str.split("").reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev;
    })
    return str+'.'+sm;
}
console.log(format(12345678.1234));

//http ���� ״̬  ����ʽ
//304ԭ��


//diff ԭ��

//flex ����



//webpack ����Ż�



//�����
jsonp
    cors
        domain+iframe
            postMessage+onMessage
                proxy����
                    websocket






//����� vue ����Щ�ص�
    vue�ǽ����Կ��   ������
    ģ�黯�����ļ������ ��ģ�黯��webpackһ�н�ģ�飩�� ��������ã�  �����
    MVVM��� ˫���  רע��ͼ  ������Ӧʽ�仯  �����ظ���Ⱦdom  ���ܸ�



//�ù� git �ǰɣ� ��Ŀ��û�ù����Լ�ά������ github �ù� ��������Ŀ��ô�� git ֪���� ���Ƿ�֧���ϲ����ϲ���ʱ����ֳ�ͻ��ô�죬û������ ��



//��������ôһ�ű�ѧ���������γ̣��ɼ�����ô���ÿ��ѧ���ɼ���ߵ����ſγ̵ĳɼ�
let arr=[{name:'xxx','yw':99,'sx':100},{name:'xxx','yw':99,'sx':94}];
let arr2=[];
for(let i=0;i<arr.length;i++){
    let cur=arr[i]
    let obj={};
    obj.name=cur.name;
    let zg=0;
    for(let key in cur){
        if(typeof cur[key]=='number'){
            if(cur[key]>zg){
                zg=cur[key];
            };
        }
    }
    obj.zg=zg
    arr.push(obj)
}


//��Ϊ˵�� tcp �ǿɿ����䣬��������Ϊʲô�ǿɿ����䴫�䣬��ʵ������������



//����ȥ��
[...new Set(arr)]
//дһ�������ж��Ƿ����ѭ�����ã�û��������
function fn(a,b){
    for(let key in a){
        if(a[key]==b){
            for(let key in b){
                if(b[key]==a){
                   return true;
                }
            }
        }
    }
}
//���
let obj={a:{b:{c:1}}};
let obj1=Object.assign([],obj);
console.log(obj1)
function deep(obj){
    if(typeof obj !=='object'&&!obj){
        return;
    }
    let obj1={};
    function clone(obj1,obj){
        Object.keys(obj).forEach((item)=>{
            obj1[item]=obj[item];
            if(typeof obj[item] =='object'&&obj){
                clone(obj1[item],obj[item])
            }
        })
    }
    clone(obj1,obj);
    return obj1;
}
deep(obj)
//�̳У�ԭ�����̳���ôʵ��
��.prototype=new Parent();//�������ԭ������ �������ʵ����
��.prototype=Object.create(��.prototype);

//promise
function Promise(execure){
    let self=this;
    this.state='pending';
    this.data='';
    this.reason='';
    this.resolveCallbacks=[];
    this.rejectCallbacks=[];
    function resolve(res){
        if(self.state=='pending'){
            self.state='fuilled';
            self.data=res;
            self.resolveCallbacks.forEach((fn)=>{
                fn(self.data);
            })
        }
    }
    function reject(reason){
        if(self.state=='pending'){
            self.state='reject';
            self.reason=reason;
            self.rejectCallbacks.forEach((fn)=>{
                fn(self.reason);
            })
        }
    }
    try{
        execure(reject,reject);
    }catch(e){
        reject(e)
    }
}
Promise.prototype.then=function(onfuilled,onReject){
    let self=this;
    let promise2=new Promise(function (res,rej) {
        typeof onfuilled == 'function' ? null:onfuilled=function(data){return data};
        typeof onReject == 'function' ? null:onReject=function(res){return res};
        if(self.state=='fuilled'){//�ɹ�̬
            setTimeout(()=>{
                try{
                    let x= onfuilled(self.data)
                    resolvePromise(x,promise2,res,rej)
                }catch(e){
                    rej(e);
                }
            })
        }
        if(self.state=='reject'){//ʧ��̬
            setTimeout(()=>{
                try{
                    let x= onReject(self.reason)
                    resolvePromise(x,promise2,res,rej)
                }catch(e){
                    rej(e);
                }
            })
        }
        if(self.state=='pending'){//ʧ��̬
            self.resolveCallbacks.push(function () {
                setTimeout(function () {
                    try{
                        console.log(1)
                        let x= onfuilled(self.data)
                        resolvePromise(x,promise2,res,rej)
                    }catch(e){
                        rej(e);
                    }
                })

            })
            self.rejectCallbacks.push(function () {
                setTimeout(function () {
                    try{
                        let x= onReject(self.reason);
                        resolvePromise(x,promise2,res,rej)
                    }catch(e){
                        rej(e);
                    }
                })
            })
        }
    })
    return promise2;
}

function resolvePromise(x,promise,resolve,reject){
    if(x==promise){
        return reject(new Error('�ظ�����'));
    }
    let changeFlag;
    if((x!=null && typeof x == 'object')||typeof x == 'function'){
        let then = x.then;
        if(then&&typeof then == 'function'){
            try{
                then(function (y) {
                    if(!changeFlag){changeFlag=true}else{return};
                    resolvePromise(y,x,resolve,reject);
                },function(reason){
                    if(!changeFlag){changeFlag=true}else{return};
                    reject(reason)
                })
            }catch(e){
                if(!changeFlag){changeFlag=true}else{return};
                reject(e);
            }
        }else{
            if(!changeFlag){changeFlag=true}else{return};
            resolve(x);
        }
    }else{
        resolve(x);
    }
}

new Promise(function (resolve,reject){
    setTimeout(function () {
        resolve(123)
    })
}).then(function (data) {
        console.log(data);
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve(new Promise(function (resolve,reject) {
                    reject(456)
                }))
            })
        })
}).then(function (data) {
        console.log(data)
    }, function (reason) {
        console.log(reason)
    })





//async �� await



//webpack


//�����߲�Э��
Ӧ�ò� HTTP FTP TFTP SMTP SNMP DNS
��ʾ�� ���ݵı�ʾ����ȫ��ѹ��
�Ự�� ������������ֹ�Ự
����� TCP UDP

����� ����Э��
��·��
�����





//ԭ������proto �� prototype ������





//�ж�����ķ���

//Ӧ���� 5 ���ɣ���˵�ˣ�Ȼ����˵һ�²�ͬ��Array.isArray() û˵�����������Ķ�˵�ˣ�˳��˵���� instance ��ʵ��ԭ���ϴα��ʵ����ᣩ

//http �� https ������˵��һ�´�����̺ͶԳƷǶԳƼ���


//�����Ĳ��ַ�ʽ��flex �������еȿ�flex��1 ������


//jsonp ��ԭ��
function jsonp(url,params,cb){
    return new Promise((resolve)=>{
        //����script
        let script=document.createElement('script');
        //ƴ��src
        params={...params,cb};
        let arr=[];
        for(key in params){
            arr.push(`${key}=${params[key]}`)
        }
        script.src=`${url}?${arr.join('&')}`;
        document.body.appendChild(script);
        //ִ�� cb
        window[cb]=function(data){
            resolve(data);
            document.body.removeChild(script);
        }
    })
}
jsonp('aaa',{b:123},'cb')

//xss �����˽��𣬷�����ʽ����Щ��������Դ������������ַ�ת�壬��Щ�����ַ����ڰ�������csp��
ͨ��script��ǩע��

//CSRF ԭ������
ͨ��ƭȡcookie

rem

let w=document.documentElement.clientWidth||document.body.clientWidth;
w/750=x/100
document.body.style.fontSize=w/750*100+'px';
html{
    font-size:100px;
}
meta name="viewport"
@media all and (max-width: 300px){//С��300ʱ��ִ��}

http ���ı�����Э��  ��״̬  Ӧ�ò�Э�� �������Ӧ���
    Ӧ�ò�
    ��ʾ��
    �Ự��
    �����

    �����
    ��·��
    �����




    ������ַ
    dns�������������ҵ�������ip
    tcp����
    http����
    ��������������
    ��������
    ������õ�����
    �Ͽ�����
    ��Ⱦ����

    �����������Ĵλ���


    �����ײ�
    ��Ӧ�ײ�
    ͨ���ײ�
        �����ַ
        ����ʽ
        ����״̬
        ������ip�Ͷ˿�

    ��չ�ײ�
    ʵ���ײ�
���� expires cache-control max-age
    Expires �������Ļ������ʱ��
    Cache-Control:max-age:0û�л���
    if-modify-since:�����ʱ�� ����������õ����ʱ�� ��������ʱ��������û�б仯�ͷ���304�����㱾�صĻ���

    Expires/Cache-Control Header�ǿ���������Ƿ�ֱ�Ӵ����������ȡ���ݻ������·����󵽷�����ȡ���ݡ�
Last-Modified/If-Modified-Since��������������󵽷��������ж��ļ��Ƿ� �Ѿ��޸Ĺ������û���޸Ĺ���ֻ����һ��304�ظ�����������������ֱ�Ӵ��Լ����صĻ���ȡ���ݣ�����޸Ĺ��Ǿ������������·����������
http2
    ��·����
    ������
    headerѹ��
    ����������

����
    jsonp
    jsonp��ͨ��script��src����ȥ���ؿ�����Դ�ģ�����jsonp������get����
    getϵ�е��ص�jsonp����
    ���е�jspon�ӿڱ��뺬��һ��jsonpCallback�������ǺϷ��Ľӿ�
    ���е�jsonp�ӿڱ��밴�չ̶��ĸ�ʽ���� functionName(/* jsonData */)

    cros

    document.domain + iframe

    postMessage�������� onmessage(e)�������� e�����д�����Ҫ������

    web sockets

















