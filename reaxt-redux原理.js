/**
 * Created by bawuzhan on 2019/3/13.
 */
import React from 'react';
import PropTypes from 'prop-types'
/*
 * provider 当前项目的根组件
 * 1.接收通过属性传进来的store，把store挂载到上下文当中，当前项目中任何一个组建中，想要使用redux的store，直接通过上下文获取即可
 * 2.在组件的render中，把传递给provider的子元素渲染
 * */
class Provider extends React.Component {
    //设置上下文信息类型
    static childContextTypes={
        store:PropTypes.object,
    }
    //设置上下文信息
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



//connect() :高阶 组件（基于高阶组件：柯理化函数） 撞见的组件就是高阶函数

//参数：mapStateToProps,mapDispatchToProps

function mapStateToProps(state){//回调函数，把redux中的部分状态信息挂载到指定的属性上
    return {}//return啥就把store中的那些state挂载到属性上
}
function mapDispatchToProps(dispatch){//回调函数，把一些需要派发的任务也挂载到组件的属性上
    return {
        init(){
            dispatch(action)
        }
    }
}
//返回一个函数，返回的函数执行，返回一个新的组件Proxy
//把mapStateToProps,mapDispatchToProps执行的结果都当做属性挂载到新的组件上

function connect(mapStateToProps,mapDispatchToProps){
    return function (Component){
        return class Proxy entends React.Component{
            //获取上下文的store
            static contextTypes={
                store:PropTypes.object;
        }
        constructor(props,context){
            super(props,context);

            this.state=this.queryProps()//把所有返回值赋值给组件的 状态 用于传递给组件
        }
        conponentDidMount(){//组件渲染结束后，当状态改变，重新获取最新的状态信息，重新把component渲染，把新的状态信息通过属性传递给component
            this.context.store.subscribe(()=>{
                this.setState(this.queryProps());
            })
        }
        render(){
            return <Component {...this.state}></Component>
        }
        //执行mapStateToProps,mapDispatchToProps，拿到所有返回值，合并成一个新对象
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