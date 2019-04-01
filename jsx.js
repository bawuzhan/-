/**
 * Created by bawuzhan on 2019/3/11.
 */
function createElement(type,props,childs){
    let ref=null,key=null
    if(key in props){
        props['key']=undefined;
        key=props['key']
    }else{
        key=null
    }
    if(ref in props){
        props['ref']=undefined;
        ref=props['ref']
    }else{
        ref=null
    }
    let obj={
        type,
        props:{
            ...props,
            children:childs.length<=1?childs[0]||'':childs
        },
        key,
        ref
    }
    return obj
}


function render(jsxObj,container){
    let {type,props}=jsxObj
    node=document.createElement(type);
    for(let attr in props){
        let value=props[attr]
        switch(attr.toUpperCase()){
            case 'CLASSNAME':
                node.className=value
                break;
            case 'STYLE':
                for(let sty in value){
                    node.style[sty]=value[sty];
                }
            case 'CHILDREN':
                if(!attr instenceof Array){
                    value=[value]
                }
                value.forEach((item,key)=>{
                    if(typeof item == 'string'){
                        node.appendChild(document.createTextNode(item))
                    }else{
                        render(item,container);//µÝ¹éµ÷ÓÃ
                    }
                })

            default:
                node.setAttribute(attr,value)
        }
    }

    container.appendChild(node)
}


