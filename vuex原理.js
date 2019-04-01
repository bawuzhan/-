/**
 * Created by bawuzhan on 2019/3/6.
 */

//vuex��һ��ר��ΪvueӦ�ó���״̬����ģʽ
ʹ�÷���
/*
��װ
npm install vuex;
����
import Vue from 'vue';
import Vuex from 'vuex';
use
Vue.use(vuex)
��ʼ��
let store=new Vuex.Store({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{}//ģ��ֲ� �ݹ�ʵ��
})
*/
//���ص��������
new Vue({
    store,
    render(h=>h());
})


//vuex����ڲ�vuex.js
//vue�ļ���˳���ȼ��ظ�������ټ��������������

//Store��һ����
class Store{
    constructor(options){
        let state=options.state;
        //ʲô�������Կ���ʵ��˫���  Object.defineProperty()
        //vuex�ĺ��ľ��ǽ�����vue��ʵ�� ��Ϊvue��ʵ�������ݱ仯����������Ⱦ��ͼ����vuex��state�仯Ҳ�������ͼ��
        this._vm=new Vue({
            data:{
                state,
            }
        })

        this.getters=options.getters;//{getters1:fn}���ص�storeʵ���� this.$store.getters.getters1(state)���õ���fnִ�еĽ��
        forEach(this.getters,(getterName,getterFn)=>{//ѭ�����е�getters�����û���ȡĳһ��getter��ʱ�� ���ض�Ӧ�ĺ����ķ���ֵ��������״̬��computed��ʵ��ԭ��
            Object.defineProperty(this.getters,getterName,{
                get(){
                    return getterFn(state);
                }
            })
        });
        this.mutations=options.mutations;//this.mutations.change=()=>{change(state)}
        forEach(this.mutations,(mutationName,mutationFn)=>{
            this.mutations[mutationName]=()=>{
                mutationFn.call(this,state);
            }
        });
        this.actions=options.actions;
        forEach(this.actions,(actionName,actionFn)=>{
            this.actions[actionName]=()=>{
                actionFn.call(this,this);
            }
        });
        let {commit,dispatch} = this;
        this.commit= (type) =>{
            commit.call(this,type);
        }
        this.dispatch= (type) =>{
            dispatch.call(this,type);
        }
    }

    get state(){//ֻҪ�Ǵ�store��ȡstate���ݣ��ͷ��ؾ���vue˫�����state
        return this._vm.state;
    }
    commit(type){//commitִ��mutation
        this.mutations[type]()
    }
    dispatch(type){//dispatch�ɷ�action
        this.actions[type]()
    }

}
function forEach(obj,callback){
    Object.keys(obj).forEach((item,index)=>{
        callback(item,obj[item])
    })
}
//use����ִ�л���ò����install����,����vue���ഫ��ȥ
let install=(_Vue)=>{
    Vue=_Vue;//����vue�Ĺ��캯��
    Vue.mixin({//����--ȫ��mixin
        beforeCreate(){
            //����Ҫ�Ѹ�����е�storeʵ�� ��ÿ�����������һ����$store������,�����е�����ж���ʹ��$store
            //�Ƿ��Ǹ����
            if(this.$options&&this.$options.store){//��ʾ�Ǹ����
                this.$store=this.$options.store;
            }else{//����� ������� ��--��--��  vue�����صĹ����ж�ȡ���ĸ����ϵ�$store���Լ�
                this.$store=this.$parent&&this.$parent.$store
            }
        }
    })
}
export default {
    store,
    install,
}