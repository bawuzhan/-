//css盒模型

//包含了元素内容（content）、内边距（padding）、边框（border）、外边距（margin）几个要素。
//bug 垂直方向的margin值重叠
//bug 行内元素的上下margin值设置无效
//bug 当父元素没有边框border时，设置第一个子元素的margin-top值的时候，会出现margin-top值加在父元素上的现象
//可以给父元素加border padding overflow:hidden 加伪类等方式处理
//相关属性：box-sizing : content-box | border-box | inherit;

//BFC
//BFC格式化上下文，是Web页面中盒模型布局的CSS渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。
//bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面元素
//形成BFC的条件(脱离文档流)

//根元素
//position: absolute/fixed
//display: inline-block / table
//float 元素
//ovevflow !== visible

//BFC布局规则

//属于同一个 BFC 的两个相邻 Box 垂直排列
//属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
//BFC 中子元素的 margin box 的左边， 与包含块 (BFC) border box的左边相接触
//BFC 的区域不会与 float 的元素区域重叠
//计算 BFC 的高度时，浮动子元素也参与计算
//文字层不会被浮动层覆盖，环绕于周围



//自适应两栏布局（利用BFC 的区域不会与 float 的元素区域重叠 ）
/*body{
    width: 600px;
    position: relative;
}
.mydiv1{//BFC元素
    width: 100px;
    height: 150px;
    float: left;
    background: #f66;
}
.mydiv2{//BFC元素（这个新的BFC不会与浮动的mydiv1重叠。因此会根据包含块的宽度，和mydiv1的宽度，自动适应）
    height: 200px;
    background: #fcc;
    overflow: hidden;
}
<body>
    <div class="mydiv1"></div>
    <div class="mydiv2">mydiv2会随着body的宽度变化</div>
</body>*/


//BFC的应用
//阻止margin的重叠（通过给一个元素包裹一层BFC元素）
//清除内部浮动（两个div都位于同一个 BFC 区域之中）
//自适应两栏布局(上边的例子)
//可以阻止元素被浮动元素覆盖(上边的例子)

//居中布局

//水平居中
    //行内元素: text-align: center
    //块级元素: margin: 0 auto
    //absolute + transform
    //flex + justify-content: center

//垂直居中
    //line-height: height
    //absolute + transform
    //flex + align-items: center
    //table
//水平垂直居中
    //position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;
    //width: 100px;height: 100px;background: lightblue;position: absolute;left: 50%;top:  50%;transform: translate(-50px,-50px);
    //width: 100px;height: 100px;background: lightblue;position: absolute;left: 50%;top:  50%;margin-left:-50px;margin-top:-50px;
    //flex + justify-content + align-items
    //display: flex;justify-content: space-around;竖直排列四周环绕 align-content: space-around;横向排列四周环绕align-items: center;
//flex弹性布局
    //得好好看
//选择器优先级别
    //!important > 行内样式 > #id > .class > tag > * > 继承 > 默认
//清浮动
    //结尾处加空div标签或者伪类 :after{clear:both}
    //创建父级 BFC
    //父级设置高度
//link 与 @import 的区别
    //link功能较多，可以定义 RSS，定义 Rel 等作用，而@import只能用于加载 css
    //当解析到link时，页面会同步加载所引的 css，而@import所引用的 css 会等到页面加载完才被加载
    //link可以使用 js 动态引入，@import不行
//CSS预处理器(Sass/Less/Postcss) 不会重点考察
    //嵌套
    //变量
    //循环语句
    //条件语句
    //自动前缀
    //单位转换
    //mixin复用
//CSS动画
//transition: 过渡动画
    //transition-property: 属性
    //transition-duration: 间隔
    //transition-timing-function: 曲线
    //transition-delay: 延迟
    //常用钩子: transitionend

    //transition:all 1s linear 0.5s;

//animation / @keyframes 帧动画
    //animation-name: 动画名称，对应@keyframes
    //animation-duration: 间隔
    //animation-timing-function: 曲线
    //animation-delay: 延迟
    //animation-iteration-count: 次数
    //infinite: 循环动画
    //animation-direction: 方向
    //alternate: 反向播放
    //animation-fill-mode: 静止模式
    //forwards: 停止时，保留最后一帧
    //backwards: 停止时，回到第一帧
    //both: 同时运用 forwards / backwards
    //常用钩子: animationend

    //animation: hah 1s linear 0.5s infinite;
    //@keyframes hah {
    // 0%{
    // }
    // 100%{
    // }
    //}
//动画属性: 尽量使用动画属性进行动画，能拥有较好的性能表现 transform变形
    //translate
    //scale
    //rotate
    //skew
    //opacity
    //color




