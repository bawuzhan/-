/**
 * Created by bawuzhan on 2019/3/1.
 */
function myAxios(options={}){
    myAxios.createDef = myAxios.createDef || {};
    myAxios._default = {
        method: 'GET',
        url: '',
        baseURL: '',
        cache: false,
        data: null,
        params: null,
        headers: {},
        dataType: 'JSON',
    };
    let {method,url,baseURL,cache,data,params,headers,dataType}={...myAxios._default, ...myAxios.createDef,...options};
//get post delete put head options patch
if(/(get|delete|head|options)/i.test(method)){//get系方法 拼接参数params 和cache随机字符串
    if(params){
        url+=/\?/.test(url)?'&'+myAxios.paramsSerializer(params):'?'+myAxios.paramsSerializer(params);
    }
    if(cache==false){
        url+==/\?/.test(url)?'&'+new Date().getTime():'?'+new Date().getTime()
    }
}else{//post系列的方法
    //没啥可处理的
}

return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(methods,`${baseURL}${url}`);
    if(headers&&typeof headers == 'object'){//设置头信息
        for(let key in headers){
            if (!headers.hasOwnProperty(attr)) {
                let val = /[\u4e00-\u9fa5]/.test(headers[attr]) ? encodeURIComponent(headers[attr]) : headers[attr];
                ajax.setRequestHeader(key, val);
            }
        }
    }
    xhr.onreadystatechange= function () {
        if(xhr.readyStatus==4&&xhr.status==200){//说明成功
            let data=ajax.responseText;
            if(dataType=='JSON'&&typeof data=='string'){
                data=JSON.parse(data);
            }
            resolve(data);
        }else{
            reject('error');
        }
    }
    xhr.send(data);
})
}

myAxios.paramsSerializer=function(data){
    if(typeof data=='string'){
        return data;
    }else if(typeof data=='object'&&data!==null){
        let str='';
        for(let key in data){
            str+=`${key}=${data[key]}&`;
        }
        str=str.substring(0,str.length-1);
        return str;
    }else{
        return null;
    }
}

myAxios.all= function (arr) {
    return Promise.all(arr);
}

//spread的方法会返回一个回调函数，回调函数的参数是一个数组
myAxios.spread= function (cb) {
    return function () {
        cb.apply(null,arguments);
    }
}

    ['get','delete','head','options'].forEach(function (item) {
        myAxios[item] = function (url,options={}) {
            options = {
                ...options,
                url:url,
                methods:item.toUpperCase();
        }
        return myAxios(options)
    }
})
myAxios.create = function (options) {
    if (options && typeof options == 'object') {
        myAxios.createDef = options;
    }
};

['post', 'put', 'patch'].forEach(item => {
    myAxios[item] = function (url, data = {}, options = {}) {
        options = {
            ...options,
            url: url,
            method: item.toUpperCase(),
            data: data,
        };
        return myAxios(options);
    }
});



Promise.all= function (promises) {
    return new Promise(function (resolve, reject) {
        let arr=[],i=0;
        promises.forEach(function (curPromise,index) {
            if(typeof curPromise == 'object'&&typeof curPromise.then=='function'){
                curPromise.then(function (data) {
                    arr[index]=data;
                    i++;
                    if(i==promises.length){
                        resolve(arr);
                    }
                })
            }else{
                arr[index]=curPromise;
                i++;
                if(i==promises.length){
                    resolve(arr);
                }
            }

        })
    })
}
myAxios.all(arr)

































(function(){
    function axios(options){
        _createDef=axios._createDef||{};
        let default={
            method:'get',
            dataType:'json',
            url:'',
            cache:false,
            data:'',
        }
        let {method,url,baseURL,cache,params,data,dataType,headers}= {...default,..._createDef,...options};
        if(/[get|delete|options|head]/.test(options.method)){//get系的方法
            if(params){
                url+=/\?/.test(url)?'&'+paramsSerializer(params):'?'+paramsSerializer(params);
            }
            if(cache==false){
                url+=/\?/.test(url)?'&'+new Date().getTime():'?'+new Date().getTime()
            }
        }else{
            if(data){
                data = myAxios.paramsSerializer(data);
            }
        }
        return new Promise(function (resolve,reject) {
            let xhr=new XMLHttpRequest();
            xhr.open(method,`${baseURL}${url}`);
            xhr.onreadystatechange= function () {
                if(xhr.readyState==4&&/2\d{2}/.test(xhr.status)){
                    let data;
                    if(dataType=='json'){
                        data=JSON.parse(xhr.responseText);
                    }esle if(dataType=='xml'){
                        data=JSON.parse(xhr.responseXML);
                    }else{
                        data=JSON.parse(xhr.responseText);
                    }
                    resolve(data);
                }else{
                    reject('error')
                }
            }
            xhr.send()
        })

    }
    axios.paramsSerializer(params){
        let arr=[];
        for(let key in params){
            arr.push(`${key}=${params[key]}`);
        }
        return arr.join('&');
    }
    axios.create = function (options) {
        if(options&&typeof options == 'object'){
            axios._createDef=options;
        }
    }
    axios.all= function (axiosList) {
        return Promise.all(axiosList);
    }
    axios.spread= function (cb) {
        return function (arg) {
            cb(...arg)
        }
    }
    ['get','delete','options','head'].forEach(function(method){
            axios[method]= function (url,options) {
                return axios({
                        ...options,
                        url,
                        method
                    })
            }
    })
    ['post','put','patch'].forEach(function(method){
        axios[method]= function (url,data,options) {
            return axios({
                    ...options,
                    url,
                    method,
                    data,
                })
        }
    })
})()




























