/**
 * Created by bawuzhan on 2019/3/13.
 */
//接收一个reducer函数
//产出 一个store对象  store:{ getState, dispatch, subscribe }
function createStore(reducer){
    let state,listenAry=[];//state存储需要管理的状态信息 及 listenAry存放subscribe()发布的事件的事件池
    //state不用设置初始值，因为第一次dispach执行reducer，state没有纸，走的是reducer中赋值的默认信息，我们会在创建容器的时候就把dispatch执行一次

    //基于dispach实现任务派发
    dispatch()//创建容器的时候执行一次dispatch，目的是把reducer中的默认信息赋值给redux容器的状态
    function dispatch(action){
        //1.执行reducer修改容器中的状态信息(接收reducer中的返回值，替换原有的返回值，所以要求reducer中修改状态之前，要把原始的状态信息克隆一份，再进行单个属性修改)
        state=reducer(state,action);
        //2.容器中状态信息经过reducer修改后 通知事件池中的方法执行
        for(let i=0;i<listenAry.length;i++){
            let item = listenAry[i];
            if(typeof item === 'function'){
                item()
            }
        }
    }
    //获取store中的状态信息
    function getState(){
        //我们需要保证返回的状态信息不能和容器中的state是同一个堆内存（否则外边获取状态信息后，直接就可以修改容器中的状态了，不符合dispatch=》reducer修改状态的规范）
        //深克隆
        return JSON.parse(JSON.stringify(state));
    }
    //subscribe往事件池中添加方法
    function subscribe(fn){
        let isExit=listenAry.includes(fn)
        !isExit?listenAry.push(fn):null
    }
    return store={getState, dispatch, subscribe};
}




let reducer=(state={},action)=>{
    //state原有的状态信息
    //action派发任务时候传递的行为对象
    switch(action.type){//根据type执行不同的修改操作
        case TYPE.XXX:
            state={...state,n:100}
    }
    return state;//返回的state会替换原有的state
}
let store=createStore(reducer)//create的时候把reducer传递进来，但是此时reducer并没有执行，只有dispatch的时候才执行，通过reducer修改容器中的状态


//combineReducers redux中提供合并Reducer的函数
//传入一个对象 对象中包含了每一个板块对象的reducer  reducers={vote:function voteReducer(){},person:function personReducer(){}}
//返回值是一个合并后的reducer函数
//特殊处理 合并reducer后 redux容器中的state也变为以对应对象管理的模式
function combineReducers(reducers){

    return function reducer(state={},action){
        //我们所谓的reducer合并，其实就是dispatch派发的时候，把每一个模块的reducer都单独的执行一遍，把每个模块返回的状态汇总在一起，替换容器中的状态信息
        let newState={}
        for(let attr in reducers){
            if(!reducers.hasOwnProperty(key)) break;
            //state[attr]：当前模块在redux容器中存储的状态信息
            newState[attr]=reducers[attr](state[attr],action);
        }
        return newState;//{vote:{},person:{}}形式的
    }
}