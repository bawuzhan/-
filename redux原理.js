/**
 * Created by bawuzhan on 2019/3/13.
 */
//����һ��reducer����
//���� һ��store����  store:{ getState, dispatch, subscribe }
function createStore(reducer){
    let state,listenAry=[];//state�洢��Ҫ�����״̬��Ϣ �� listenAry���subscribe()�������¼����¼���
    //state�������ó�ʼֵ����Ϊ��һ��dispachִ��reducer��stateû��ֽ���ߵ���reducer�и�ֵ��Ĭ����Ϣ�����ǻ��ڴ���������ʱ��Ͱ�dispatchִ��һ��

    //����dispachʵ�������ɷ�
    dispatch()//����������ʱ��ִ��һ��dispatch��Ŀ���ǰ�reducer�е�Ĭ����Ϣ��ֵ��redux������״̬
    function dispatch(action){
        //1.ִ��reducer�޸������е�״̬��Ϣ(����reducer�еķ���ֵ���滻ԭ�еķ���ֵ������Ҫ��reducer���޸�״̬֮ǰ��Ҫ��ԭʼ��״̬��Ϣ��¡һ�ݣ��ٽ��е��������޸�)
        state=reducer(state,action);
        //2.������״̬��Ϣ����reducer�޸ĺ� ֪ͨ�¼����еķ���ִ��
        for(let i=0;i<listenAry.length;i++){
            let item = listenAry[i];
            if(typeof item === 'function'){
                item()
            }
        }
    }
    //��ȡstore�е�״̬��Ϣ
    function getState(){
        //������Ҫ��֤���ص�״̬��Ϣ���ܺ������е�state��ͬһ�����ڴ棨������߻�ȡ״̬��Ϣ��ֱ�ӾͿ����޸������е�״̬�ˣ�������dispatch=��reducer�޸�״̬�Ĺ淶��
        //���¡
        return JSON.parse(JSON.stringify(state));
    }
    //subscribe���¼�������ӷ���
    function subscribe(fn){
        let isExit=listenAry.includes(fn)
        !isExit?listenAry.push(fn):null
    }
    return store={getState, dispatch, subscribe};
}




let reducer=(state={},action)=>{
    //stateԭ�е�״̬��Ϣ
    //action�ɷ�����ʱ�򴫵ݵ���Ϊ����
    switch(action.type){//����typeִ�в�ͬ���޸Ĳ���
        case TYPE.XXX:
            state={...state,n:100}
    }
    return state;//���ص�state���滻ԭ�е�state
}
let store=createStore(reducer)//create��ʱ���reducer���ݽ��������Ǵ�ʱreducer��û��ִ�У�ֻ��dispatch��ʱ���ִ�У�ͨ��reducer�޸������е�״̬


//combineReducers redux���ṩ�ϲ�Reducer�ĺ���
//����һ������ �����а�����ÿһ���������reducer  reducers={vote:function voteReducer(){},person:function personReducer(){}}
//����ֵ��һ���ϲ����reducer����
//���⴦�� �ϲ�reducer�� redux�����е�stateҲ��Ϊ�Զ�Ӧ��������ģʽ
function combineReducers(reducers){

    return function reducer(state={},action){
        //������ν��reducer�ϲ�����ʵ����dispatch�ɷ���ʱ�򣬰�ÿһ��ģ���reducer��������ִ��һ�飬��ÿ��ģ�鷵�ص�״̬������һ���滻�����е�״̬��Ϣ
        let newState={}
        for(let attr in reducers){
            if(!reducers.hasOwnProperty(key)) break;
            //state[attr]����ǰģ����redux�����д洢��״̬��Ϣ
            newState[attr]=reducers[attr](state[attr],action);
        }
        return newState;//{vote:{},person:{}}��ʽ��
    }
}