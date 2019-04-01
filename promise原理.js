/**
 * Created by bawuzhan on 2019/3/1.
 */

function Promise(executor){
    let self=this;
    self.status='pending'//��promise���ó�ʼ״̬pending��
    self.onfulfilledList=[];//��������then�гɹ��Ļص�onfulfilled
    self.onrejectedList=[];//��������then��ʧ�ܵĻص�onrejected
    try{
        executor(resolve,reject);//ִ�д���promise������ص�����executor,
        //������resolve,reject������������Ϊʵ�Ρ�
    }catch(err){
        reject(err);//���ִ��executor�׳������Ǿͽ���ʧ��״̬��
    }

    //����resolve reject����������
    function resolve(value){//����һ������value
        if(self.status=='pending'){
            //ֻ�е�promise��״̬��pendingʱ����resolve�Ż����״̬�ĸı�
            self.status='fulfilled';//����resolve��ʾ�ɹ���״̬��Ϊfulfilled
            self.value=value//��ֵ���ص�promise�ϣ�����then��onfulfilled���õ�value��
            self.onfulfilledList.forEach(function(fn){//���ִ�гɹ�̬then����ӵĻص�
                fn();
            })
        }
    }
    function reject(reason){
        if(self.status=='pending'){
            self.status='rejected'//����reject��ʾʧ�ܣ�״̬��Ϊrejected
            self.reason=reason//��ʧ�ܵ�ԭ����ص�promise�ϣ�����then��onrejected�õ�reason
            self.onfulfilledList.forEach(function(fn){//���ִ��ʧ��̬then����ӵĻص�
                fn();
            })
        }
    }
}

Promise.prototype.then=function(onfulfilled,onrejected){
    let self=this;
    let promise2=new Promise(function(resolve,reject){//�������promise����
        //����µĶ�����Ҫ�������жϵ�ǰ��״̬
        //�ж�then��onfulfilled�Ĳ������ͣ�onrejeced���õ��Ĳ���������
        //���then�еĲ�������һ�������Ļ�����ôpromise�е�value��reason�ͼ�������һ��then����
        //���then�Ļص��з��ص���һ����ͨ������ô�ͼ�������һ��then����
        //������ص���һ��promise������ô���promise�������Ϊ��һ��then��promiseʹ�ø���promise2;
        if(typeof onfulfilled !=='function'){//������Ǻ����ͽ�value���´�������
            onfulfilled=function(value){
                return value;
            }
        }
        if(typeof onrejected!=='function'){//������Ǻ����ͽ�reason���´�������
            onrejected=function(reason){
                return reason;
            }
        }

        if(self.status=='fulfilled'){//�ɹ�״̬
            setTimeout(function(){//��ʱ���첽����һ������������promise2��������promise2����ȷ����
                try{
                    let x=onfulfilled(self.value);//�õ�onfulfilled�ķ���ֵ
                    resolvePromise(promise2,x,resolve,reject);//������������ж�����then�ķ���ֵ���Դ���then���´��ݵ�״̬��resolve��������reject����
                }catch(e){
                    //�׳�����ͷ��ش���
                    reject(e);
                }

            },0);
        }
        if(self.status=='rejected'){//ʧ��״̬
            setTimeout(function(){
                try{
                    let x=onrejected(self.reason);//�õ�onrejected�ķ���ֵ
                    resolvePromise(promise2,x,resolve,reject);
                }catch(e){
                    //�׳�����ͷ��ش���
                    reject(e);
                }
            },0)
        }
        if(self.status=='pending'){//�ȴ�״̬
            self.onfulfilledList.push(function(){
                setTimeout(function(){//��ʱ���첽����һ������������promise2��������promise2����ȷ����
                    try{
                        let x = onfulfilled(self.value);//�õ�onfulfilled�ķ���ֵ
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e)
                    }
                },0)
            })
            self.onrejectedList.push(function(){
                setTimeout(function(){
                    try{
                        let x = onrejected(self.reason);//�õ�onrejected�ķ���ֵ

                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                },0)
            })
        }
    })
    return promise2;
}

//����then�ص���x����ֵ��״̬
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){//���then�ص��з��ص�x��promise2��һ���ͻ�������ѭ��
        return reject(new Error('��ѭ��'))
    }
    let changeFlag;//������״̬��ʶ�����״̬�ı�󣬾Ͳ��ٸı�
    if((x!=null)&&(typeof x=='object'||typeof x=='function')){//�ж�x�����ͺ��������
        try{
            let then = x.then;
            //֮������thenȡֵ����ʹ��x.then��ԭ���ǣ�������ȡֵ��ɲ���Ҫ�Ĵ���(��������Ͻ�)
            //Object.definedProperty(x,then,{get(){����ȡֵ������ı䲻ͬ��ֵ}})��
            if(typeof then == 'function'){//˵��x��then����
                console.log(120)
                then.call(x,function(y){
                    console.log(y,121)
                    //resolve(value)����Ӧ�����´���Ӧ�ü����ж���һ��then�ķ���ֵ����
                    if(!changeFlag){changeFlag=true}else{return}
                    resolvePromise(x,y,resolve,reject)//�ݹ��ж�
                    //���ⷵ�ص�promise����Ȼ���ص���promise��������Ƕ�׵�promise��ִ�У�ֱ��������ֵͨ
                },function(reason){
                    if(!changeFlag){changeFlag=true}else{return}
                    reject(reason);
                })
            }else{//����һ��promise���Ǹ���ͨ�Ķ����������´���
                resolve(x)
            }
        }catch(e){
            if(!changeFlag){changeFlag=true}else{return}
            reject(e)
        }
    }else{//˵�����ص�����ֵͨ�����´���
        resolve(x)
    }
};


Promise.prototype.finally= function (callback) {
    this.then(function () {
        callback();
    }, function () {
        callback();
    })
}
Promise.prototype.catch= function (callback) {
    this.then(, function () {
        callback()
    })
}
Promise.resolve= function (data) {
    return new Promise(function (resolve,reject) {
        resolve(data)
    })
}
Promise.reject= function (reason) {
    return new Promise(function (resolve,reject) {
        reject();
    })
}
Promise.all= function (promiseList) {
    return new Promise(function (resolve, reject) {
        let index = 0, arr = [];
        for (let i = 0; i < promiseList.length; i++) {
            let curPro = promiseList[i];

            if (typeof curPro == 'object' && curPro.then) {
                index++;
                curPro.then(function (data) {
                    arr[index] = data;
                })
                if (i == promiseList.length) {//����ִ�н���
                    resolve(arr)
                }
            } else {
                index++;
                ary.index = curPro;
                if (i == promiseList.length) {//����ִ�н���
                    resolve(arr)
                }
            }
        }
    })
}
Promise.race= function (promiseList) {
    return new Promise(function (resolve, reject) {
        for (let i = 0; i < promiseList.length; i++) {
            if(typeof  promiseList[i]=== 'object' &&  promises[i].then){
                promiseList[i].then(resolve,reject);
            }else{
                resolve(promises[i])
            }
        }
    })
}


new Promise(function(resolve,reject){
    setTimeout(function () {
       resolve(123)
    })
}).then((data)=>{
    console.log(data);
    return new Promise((resolve,reject)=>{
        reject(45);
    })
}).then(()=>{},(data)=>{console.log(data)})

