/**
 * Created by bawuzhan on 2019/3/1.
 */
function jsonp(url,params,cb){
    return new Promise((resolve)=>{
        //创建script
        let script=document.createElement('script');
        //拼接src
        params={...params,cb};
        let arr=[];
        for(key in params){
            arr.push(`${key}=${params[key]}`)
        }
        script.src=`${url}?${arr.join('&')}`;
        console.log(script.src);
        document.body.appendChild(script);
        //执行 cb
        window[cb]=function(data){
            resolve(data);
            document.body.removeChild(script);
        }
    })
}
jsonp('aaa',{b:123},'cb')

