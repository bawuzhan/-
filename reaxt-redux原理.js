/**
 * Created by bawuzhan on 2019/3/13.
 */
import React from 'react';
import PropTypes from 'prop-types'
/*
 * provider ��ǰ��Ŀ�ĸ����
 * 1.����ͨ�����Դ�������store����store���ص������ĵ��У���ǰ��Ŀ���κ�һ���齨�У���Ҫʹ��redux��store��ֱ��ͨ�������Ļ�ȡ����
 * 2.�������render�У��Ѵ��ݸ�provider����Ԫ����Ⱦ
 * */
class Provider extends React.Component {
    //������������Ϣ����
    static childContextTypes={
        store:PropTypes.object,
    }
    //������������Ϣ
    getChildContext(){
        return this.props.store;
    }

    constructor(props,context){
        super(props,context);
    }
    render(){
        return this.props.children;
    }
}



//connect() :�߽� ��������ڸ߽���������������� ײ����������Ǹ߽׺���

//������mapStateToProps,mapDispatchToProps

function mapStateToProps(state){//�ص���������redux�еĲ���״̬��Ϣ���ص�ָ����������
    return {}//returnɶ�Ͱ�store�е���Щstate���ص�������
}
function mapDispatchToProps(dispatch){//�ص���������һЩ��Ҫ�ɷ�������Ҳ���ص������������
    return {
        init(){
            dispatch(action)
        }
    }
}
//����һ�����������صĺ���ִ�У�����һ���µ����Proxy
//��mapStateToProps,mapDispatchToPropsִ�еĽ�����������Թ��ص��µ������

function connect(mapStateToProps,mapDispatchToProps){
    return function (Component){
        return class Proxy entends React.Component{
            //��ȡ�����ĵ�store
            static contextTypes={
                store:PropTypes.object;
        }
        constructor(props,context){
            super(props,context);

            this.state=this.queryProps()//�����з���ֵ��ֵ������� ״̬ ���ڴ��ݸ����
        }
        conponentDidMount(){//�����Ⱦ�����󣬵�״̬�ı䣬���»�ȡ���µ�״̬��Ϣ�����°�component��Ⱦ�����µ�״̬��Ϣͨ�����Դ��ݸ�component
            this.context.store.subscribe(()=>{
                this.setState(this.queryProps());
            })
        }
        render(){
            return <Component {...this.state}></Component>
        }
        //ִ��mapStateToProps,mapDispatchToProps���õ����з���ֵ���ϲ���һ���¶���
        queryProps(){
            let store=this.context.store;
            let mapState=typeof mapStateToProps == 'function'?mapStateToProps(store.getState()):{};
            let mapDispatch=typeof mapDispatchToProps == 'function'?mapDispatchToProps(store.dispatch):null;
            return {...mapState,...mapDispatch}
        }
    }
}
}
export {Provider,connect}