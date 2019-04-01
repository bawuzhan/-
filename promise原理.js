/**
 * Created by bawuzhan on 2019/3/1.
 */

function Promise(executor){
    let self=this;
    self.status='pending'//给promise设置初始状态pending；
    self.onfulfilledList=[];//用来订阅then中成功的回调onfulfilled
    self.onrejectedList=[];//用来订阅then中失败的回调onrejected
    try{
        executor(resolve,reject);//执行传入promise的这个回调函数executor,
        //并传入resolve,reject这两个函数作为实参。
    }catch(err){
        reject(err);//如果执行executor抛出错误，那就进入失败状态。
    }

    //定义resolve reject这两个函数
    function resolve(value){//接受一个参数value
        if(self.status=='pending'){
            //只有当promise的状态是pending时调用resolve才会进行状态的改变
            self.status='fulfilled';//调用resolve表示成功，状态变为fulfilled
            self.value=value//将值挂载到promise上，用于then的onfulfilled中拿到value；
            self.onfulfilledList.forEach(function(fn){//逐个执行成功态then中添加的回调
                fn();
            })
        }
    }
    function reject(reason){
        if(self.status=='pending'){
            self.status='rejected'//调用reject表示失败，状态变为rejected
            self.reason=reason//把失败的原因挂载到promise上，方便then的onrejected拿到reason
            self.onfulfilledList.forEach(function(fn){//逐个执行失败态then中添加的回调
                fn();
            })
        }
    }
}

Promise.prototype.then=function(onfulfilled,onrejected){
    let self=this;
    let promise2=new Promise(function(resolve,reject){//返回这个promise对象
        //这个新的对象需要做的有判断当前的状态
        //判断then的onfulfilled的参数类型，onrejeced中拿到的参数的类型
        //如果then中的参数不是一个函数的话，那么promise中的value或reason就继续向下一个then传递
        //如果then的回调中返回的是一个普通对象那么就继续向下一个then传递
        //如果返回的是一个promise对象那么这个promise对象就作为下一个then的promise使用覆盖promise2;
        if(typeof onfulfilled !=='function'){//如果不是函数就将value向下传递数据
            onfulfilled=function(value){
                return value;
            }
        }
        if(typeof onrejected!=='function'){//如果不是函数就将reason向下传递数据
            onrejected=function(reason){
                return reason;
            }
        }

        if(self.status=='fulfilled'){//成功状态
            setTimeout(function(){//计时器异步的另一个作用是能让promise2对象能在promise2中正确引用
                try{
                    let x=onfulfilled(self.value);//拿到onfulfilled的返回值
                    resolvePromise(promise2,x,resolve,reject);//这个函数用来判断以上then的返回值，以处理then向下传递的状态走resolve函数还是reject函数
                }catch(e){
                    //抛出错误就返回错误
                    reject(e);
                }

            },0);
        }
        if(self.status=='rejected'){//失败状态
            setTimeout(function(){
                try{
                    let x=onrejected(self.reason);//拿到onrejected的返回值
                    resolvePromise(promise2,x,resolve,reject);
                }catch(e){
                    //抛出错误就返回错误
                    reject(e);
                }
            },0)
        }
        if(self.status=='pending'){//等待状态
            self.onfulfilledList.push(function(){
                setTimeout(function(){//计时器异步的另一个作用是能让promise2对象能在promise2中正确引用
                    try{
                        let x = onfulfilled(self.value);//拿到onfulfilled的返回值
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e)
                    }
                },0)
            })
            self.onrejectedList.push(function(){
                setTimeout(function(){
                    try{
                        let x = onrejected(self.reason);//拿到onrejected的返回值

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

//处理then回调中x返回值的状态
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){//如果then回调中返回的x和promise2是一个就会陷入死循环
        return reject(new Error('死循环'))
    }
    let changeFlag;//用来做状态标识，如果状态改变后，就不再改变
    if((x!=null)&&(typeof x=='object'||typeof x=='function')){//判断x的类型函数或对象
        try{
            let then = x.then;
            //之所以用then取值而不使用x.then的原因是：避免多次取值造成不必要的错误(代码更加严谨)
            //Object.definedProperty(x,then,{get(){处理取值结果，改变不同的值}})；
            if(typeof then == 'function'){//说明x有then方法
                console.log(120)
                then.call(x,function(y){
                    console.log(y,121)
                    //resolve(value)不是应该向下传递应该继续判断下一个then的返回值类型
                    if(!changeFlag){changeFlag=true}else{return}
                    resolvePromise(x,y,resolve,reject)//递归判断
                    //避免返回的promise中依然返回的是promise，把所有嵌套的promise都执行，直到返回普通值
                },function(reason){
                    if(!changeFlag){changeFlag=true}else{return}
                    reject(reason);
                })
            }else{//不是一个promise，是个普通的对象，数据向下传递
                resolve(x)
            }
        }catch(e){
            if(!changeFlag){changeFlag=true}else{return}
            reject(e)
        }
    }else{//说明返回的是普通值，向下传递
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
                if (i == promiseList.length) {//数组执行结束
                    resolve(arr)
                }
            } else {
                index++;
                ary.index = curPro;
                if (i == promiseList.length) {//数组执行结束
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

