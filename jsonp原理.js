/**
 * Created by bawuzhan on 2019/3/1.
 */
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
        console.log(script.src);
        document.body.appendChild(script);
        //ִ�� cb
        window[cb]=function(data){
            resolve(data);
            document.body.removeChild(script);
        }
    })
}
jsonp('aaa',{b:123},'cb')

