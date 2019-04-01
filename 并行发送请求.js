//请实现如下函数，可以批量请求数据,所有的 url 地址在 urls 参数中，同时可以通过 max 参数控制请求的并行数，当所有请求结束之后，需要执行 callback 回调函数，发送请求的函数可以直接使用 fetch 即可
function sendRequest(urls, max, callback) {
    let start=0;
    function walk(){
        if(start>=urls.length){
            callback();
            return;
        }
        let curList=urls.slice(start,start+max);
        console.log(curList)
        let curReq=curList.map((item)=>{
            return fetch({url:item,method:'get'});
        })
        Promise.all(curReq).finally(function(){
            setTimeout(function(){
                start+=max;
                walk();
            },2000)

        })
    }
    walk();
}
sendRequest(['q','q1','q2','q3','q4','q5'], 2, function(){
    console.log('end');
})
