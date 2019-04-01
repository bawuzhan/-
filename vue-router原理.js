/**
 * Created by bawuzhan on 2019/3/1.
 */
/*
* ����˼·
* 1.hashģʽ��historyģʽ�ֱ���
* �жϼ��ݣ������֧��history��Ĭ����hashģʽ
* �ж�mode  �ֱ���hashģʽ��historyģʽ�� push replace go����
*
* 2.��·���б��У�ƥ�����ǰ��·�� ִ�����еĹ��Ӻ�����  �ѵ�ǰ·���ϵ��������Դ��� this.history.current
 *
* 3.����ԭ�����¼���������  ִ�ж�Ӧrouter�Ĺ��Ӻ������õ���ǰ��·��
*
* 4.observe����ǰ�ĵ�����Ӽ���������������κ����Է����仯���ͻ�������ȾDOM
* */
class HistoryRoute{
    constructor(){
        this.current=null;
    }
}
class VueRouter{
    constructor(options){
        this.mode=options.mode||'hash';
        this.routes=options.routes||[];
        //�㴫�ݵ�·�ɱ��Ϊһ������[{'/home':Home},{'/about':About}]
        this.routesMap=this.createMap(this.routes);
        //·������Ҫ��ŵ�ǰ��·�� ��Ҫ״̬
        this.history=new HistoryRoute()
        this.init()//��ʼ��ʼ������
    }
    createMap(routes){
        return routes.reduce((memo,current)=>{//
            memo[current.path]=current.component;
            return memo;
        },{})
    }
    init(){
        if(this.mode=='hash'){
            //���ж��û���ʱ��û��hash û�о�����#/
            location.hash?'':location.hash='#/';
            window.addEventListener('load',()=>{
                this.history.current=location.hash.slice(1)
            })
            window.addEventListener('hashchange',()=>{
                this.history.current=location.hash.slice(1)
            })

        }else{
            //���ж��û���ʱ��û��hash û�о�����#/
            location.pathname?'':location.pathname='/';
            window.addEventListener('load',()=>{
                this.history.current=location.pathname
            })
            window.addEventListener('popstate',()=>{
                this.history.current=location.pathname
            })
        }
    }
    go(){
        if(this.mode=='hash'){

        }else{

        }
    }
    replace(){
        if(this.mode=='hash'){

        }else{

        }
    }
    push(){
        if(this.mode=='hash'){

        }else{

        }

    }
}

//ʹ��vue.use�ͻ����install����
VueRouter.install=function(Vue){

    Vue.mixin({//��Ϸ����������е�����ӹ��������Է�����
        beforeCreate(){
            console.log(Vue,'install')
            //ÿ���������this,$router / this.$route����
            //����������л�ȡͬһ��·�ɵ�ʵ��
            console.log(this.name)
            if(this.$options&&this.$options.router){//˵���Ǹ�ʵ��

                this._root=this;//�ѵ�ǰʵ��������_root��
                this._router=this.$options.router;//��routerʵ��������_router��
                //observe�ķ���defineReactive
                //ruguo history�е�current�仯Ҳ��ˢ����ͼ
                Vue.util.defineReactive(this,'',this._router.history)
            }else{
                //vue�������Ⱦ˳�� ��-->��-->����
                this._root=this.$parent._root;//������ȡΨһ��·��ʵ��
            }
            Object.defineProperty(this,'$router',{//Router�� ʵ��
                get(){
                    return this._root._router;
                }
            });
            Object.defineProperty(this,'$route',{//$route����
                get(){
                    //��ǰ·�����ڵ�״̬
                    return this._root._router.history.current;
                }
            })
        }
    })
    Vue.component('router-link',{
        props:{
            to:String,
            tag:String,
        },
        render(){//jsx�﷨
            let mode=this._self._root._router.mode;
            //let tag=this.tag;
            return <a href={mode==='hash'?`#${this.to}`:this.to}>{this.$slots.default}</a>
        },
    })

    Vue.component('router-view',{
        render(h){ //���ݵ�ǰ��״̬ current ·�ɱ��õ����
            //��ν�current��ɶ�̬�� current�仯(defineReactive)
            //�������this��һ������
            let current=this._self._root._router.history.current;
            let routesMap=this._self._root._router.routesMap
            return h(routesMap[current])
        }
    })
}
export default VueRouter;

