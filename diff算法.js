/**
 * Created by bawuzhan on 2019/3/6.
 */
//虚拟dom vnode
//通过Object对象模拟的节点，然后通过render再渲染成真实的节点
function createElement(){}//jsx被babel编译成的函数，将参数的内容转化成虚拟DOM，就是一个object对象
function render(){}//将虚拟dom转化成真实的DOM插入到页面中

//babel将jsx语法转化的过程
/*
 ReactDom.render(<ul className="list">
 <li className="item">a</li>
 <li className="item">b</li>
 <li className="item">c</li>
 </ul>,root)

let vertualDom=createElement('ul',{class:'list'},[
    createElement('li',{class:'item'},['a']),
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['b']),
]);
vertualDom <==>
{
type:'ul',
props:{class:'list'},
children:[
    {
        type:'ul',
        props:{class:'item'},
        children:['a']
    },
    {
        type:'ul',
        props:{class:'item'},
        children:['b']
    },
    {
        type:'ul',
        props:{class:'item'},
        children:['c']
    }
]
}


  */
//封装createElement
class Element {
    constructor(type,props,children){
        this.type=type;
        this.props=props;
        this.children=children;
    }
};
//返回object的
function createElement(type,props,children){
    return new Element(type,props,children);
};


let vertualDom=createElement('ul',{className:'list'},[
    createElement('li',{class:'item'},['a']),
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['b']),
]);
console.log(vertualDom);//返回object


//给DOM设置属性
function setAttr(node,key,value){
    switch(key){
        case 'value'://node是一个input或者textarea
            if(node.TagName.toUpperCase=='INPUT'||node.TagName.toUpperCase=='TEXTAREA'){
                node.value=value;
            }else{
                node.setAttribute(key,value);
            }
            break;
        case 'style':
            for(let key in values){
                node.style[key]=values[key];
            }
            break;
        case 'className':
            node.className=value;
            break;
        default:
            node.setAttribute(key,value);
            break;
    }
}
//将虚拟dom转化成真实DOM
function render(eleObj){
    let el=document.createElement(eleObj.type);
    for(let key in eleObj.props){
        //设置属性的方法
        setAttr(el,key,eleObj.props[key])
    }
    //遍历儿子 如果是虚拟DOM 就继续渲染，如果不是就代表是文本节点
    eleObj.children.forEach((child)=>{
        console.log(child)
        if(child instanceof Element){
            child=render(child);
        }else{
            child=document.createTextNode(child)
        }
        el.appendChild(child)
    })
    return el;
}
let vertual=render(vertualDom)
console.log()

//将虚拟DOM转化成的真实DOM 绑定到页面上
function renderDom(el,target){
    target.appendChild(el)
}
renderDom(vertual,document.querySelector('#app'))

/*--------------------------------------------------------------------------------------------------*/
//diff算法  先序深度优先遍历

//dom diff则是通过js层面上的计算 返回一个patch对象，即补丁对象，在通过特定的操作解析patch对象，完成页面的重新渲染
//差异计算
//先序深度优先遍历
//1.用js对象模拟DOM
//2.把此虚拟DOM转成真实的DOM
//3.如果有事件发生改变了 虚拟DOM比较两棵DOM树的差异，得到差异对象
//4.把差异对象应用到真实的DOM树上

//两棵虚拟DOM树
let vertualDom1=createElement('ul',{className:'list'},[
    createElement('li',{class:'item'},['a']),
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['b']),
]);

let vertualDom2=createElement('ul',{className:'list-group'},[
    createElement('li',{class:'item'},['1']),
    createElement('li',{class:'aa'},['b']),
]);

// ---*补丁规则*---
/*
1.比较属性是否相同 {type:'ATTRS',attrs:{class:'aa'}}
2.新的DOM节点不存在{type:'REMOVE',index:3}
3.节点类型不相同 直接采用替换的模式{type:'REPLACE',newNode:newNode}
4.文本的变化{type:'TEXT',text:1}
*/
const ATTRS='ATTRS';
const TEXT='TEXT';
const REMOVE='REMOVE';
const REPLACE='REPLACE';
let Index=0;
function diff(oldTree,newTree){
    let patches={};
    let index=0;
    //递归树，比较后的结果放到补丁包中
    walk(oldTree,newTree,index,patches)

    return patches
}
function walk(oldTree,newTree,index,patches){
    let currentPatch=[];
    if(!newTree){//新节点被删除
        currentPatch.push({type:'REMOVE',index:index})
    }else if((typeof oldTree == 'string')&& (typeof newTree == 'string')){//新节点是文本
        if(oldTree !== newTree){//判断文本是不是发生变化了
            currentPatch.push({type:'TEXT',text:newTree})
        }
    }else if(oldTree.type==newTree.type){//如果节点相同就比属性
            //比较属性是否有更改
            let attrs=diffAttr(oldTree.props,newTree.props)
            if(Object.keys(attrs).length>0){//说明属性有变化
                currentPatch.push({type:ATTRS,attrs:attrs})
            }
            //如果有儿子节点 遍历儿子节点
            diffChildren(oldTree.children,newTree.children,index,patches);
    }else{//节点不同
        currentPatch.push({type:'REPLACE',newNode:newTree})
    }
    if(currentPatch.length>0){//当前元素确实有补丁
        //将元素和补丁对应起来 放到大补丁中
        patches[index]=currentPatch
    }
}

function diffAttr(oldAttrs,newAttrs){
    let patch={};
    for(let key in oldAttrs){
        //老节点的属性发生变化
        if(oldAttrs[key]!==newAttrs[key]){
            patch[key]=newAttrs[key]//有可能是undefined
        }
    }
    for(let key in newAttrs){
        //老节点没有新节点的属性
        if(!oldAttrs.hasOwnProperty(key)){
            patch[key]=newAttrs[key]
        }
    }
    return patch
}
function diffChildren(oldChildren,newChildren,index,patches){
    //比较老的第一个和新的第一个
    oldChildren.forEach((child,idx)=>{
        console.log(++index,204)
        walk(child,newChildren[idx],++Index,patches)
    })
}

let patches=diff(vertualDom1,vertualDom2)//得到两棵DOM树的补丁包
console.log(patches)
/*--------------------------------------------------------------------------------------------------*/
//给dom打补丁,重新更新视图
let index=0;//默认哪个需要打补丁

function patch(node , patches){
    console.log(node)
    //给某个元素打补丁
    console.log(patches)
    walkpat(node,patches)
}
function walkpat(node,patches){
    console.log(patches)
    let currentPatch=patches[index++];
    let childNodes=node.childNodes;
    childNodes.forEach((child)=>{
        walkpat(child,patches);
    })
    if(currentPatch&&currentPatch.length>0){
        doPach(node,currentPatch)
    }
}
function doPach(node,patches){
    patches.forEach(patch=>{
        switch(patch.type){
            case 'ATTRS':
                for(let key in patch.attrs){
                    let value=patch.attrs[key]
                    if(value){
                        setAttr(node,key,value);
                    }else{
                        node.removeAttribute(key);
                    }
                }
                patch.attrs
                break;
            case 'TEXT':
                node.textContent=patch.text;
                break;
            case 'PEPLACE':
                let newNode=patch.newNode instanceof Element?render(patches.newNode):document.createTextNode(patch.newNode)
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node)
                break;
            default:
                break;
        }
    })
}

patch(vertual,patches)


//封装的缺陷
/*1.如果凭借元素有互换，那么会导致重新渲染
2.新增节点不会更新*/






