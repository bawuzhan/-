//��ʵ�����º���������������������,���е� url ��ַ�� urls �����У�ͬʱ����ͨ�� max ������������Ĳ��������������������֮����Ҫִ�� callback �ص���������������ĺ�������ֱ��ʹ�� fetch ����
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
