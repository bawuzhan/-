/**
 * Created by bawuzhan on 2019/2/18.
 */
webpack的了解
/*

 webpack可以看做是模块打包机，它做的事情是，分析你的项目结构，找到js模块以及他的一些浏览器不能直接运行的拓展语言（less vue ts等），并将其打包为合格的格式以供浏览器使用
 构建就是把源码 转换成发布到线上的可执行的js css html代码
 代码转化：ts转成js  less转成css
 文件优化：压缩js html css 压缩合并图片等
 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
 模块合并：把各个模块合并成一个文件
 自动刷新：监听本地代码变化，自动重新构建、刷新服务器
 代码校验：在代码被提交到仓库前需要校验是否符合规范
 自动发布：更新代码后 自动构建并传输给发布系统

 */
gulp和webpack的区别？(模块与流，CommonChunks抽出公共模块)
/*
 * 都可以压缩合并文件、转化代码、实现代理服务等功能
 *
 * gulp：强调的是前端开发的流程，通过配置一系列的task，定义task处理的事物（例如文件压缩合并、雪碧图、启动server、 版本控制等），然后定义执行顺序，来让gulp执行task，从而构建前端项目的流程。
 * gulp基于流，适用于小的项目（没有模块的概念）
 *
 *
 * webpack：是一个前端模块化方案，侧重模块打包，把开发中的所有资源（图片、js文件、css文件等）都看成模块，通过loader（加载器）和plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。
 * webpack基于模块，适用于中大型项目
 *
 *
 * */

webpack底层实现原理
/*

 基于node、文件读写、代码编译ejs

 *
 *简单实现
 * let entry='./a.js';//入口文件
 let output='./main.js'//出口
 let fs=require('fs');
 let ejs=require('ejs');

 let script=fs.readFileSync(entry,'utf8');

 let template=`//模板来自于打包的main.js删除部分代码
 (function(modules) { // webpackBootstrap
     var installedModules = {};
     function require(moduleId) {//moduleId代表的就是文件名
         var module = installedModules[moduleId] = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports,require);
        return module.exports;
     }
     return require("<%-entry%>");
 })({
     "<%-entry%>":
     (function(module, exports, require) {
        eval(\`<%-script%>\`);
     })
 });`
 let result = ejs.render(template,{
     entry,
     script
 })
 //result为最终打包结果 输出到output文件中
 fs.writeFileSync(output,result)
 console.log('success')
 * */


如何配置多入口文件
/*
 * 1.多入口单出口
 * entry:['a.js','b.js']
 * output:{
 *   filename:'build.[hash:8].js',
 *   path:path.resolve('./build'),
 *   publicPath:'http://people.com.cn/'   //公共路径
 * }
 * 2.多入口多出口
 * entry:['a.js','b.js']
 * output:{
 *   filename:'[name].[hash:8].js',
 *   path:path.resolve('./build'),
 * }
 * 3.多入口多出口并引入到不同的html
 * entry:['a.js','b.js']
 * output:{
 *   filename:'[name].[hash:8].js',
 *   path:path.resolve('./build'),
 * }
 * 并配置两个new HtmlWebpackPlugin并单独配置
 * plugins:[
 *  new HtmlWebpackPlugin({
 *      template:'./index.html',
 *      filename:'a.html',
 *      chunks:['a']
 *  })
 * ]
 * plugins:[
 *  new HtmlWebpackPlugin({
 *      template:'./index.html',
 *      filename:'b.html',
 *      chunks:['b']
 *  })
 * ]
 * */

webpack的构建流程是什么
/*
 1. 解析webpack配置参数，合并从shell传入和webpack.config.js文件里配置的参数，生产最后的配置结果。
 2. 注册所有配置的插件，好让插件监听webpack构建生命周期的事件节点，以做出对应的反应。
 3. 从配置的entry入口文件开始解析文件构建AST语法树，找出每个文件所依赖的文件，递归下去。
 4. 在解析文件递归的过程中根据文件类型和loader配置找出合适的loader用来对文件进行转换。
 5. 递归完后得到每个文件的最终结果，根据entry配置生成代码块chunk。
 6. 输出所有chunk到文件系统。
 * */

webpack路由懒加载(底层是import语法)
/*
 * 1.  结合 Vue 的异步组件和 Webpack 的代码分割功能，实现路由组件的懒加载
 routes: [
         {
             path: '/list/blog',
             component: () => import('./my-async-component'),//这个 `import` 函数会返回一个 `Promise` 对象。
             name: 'blog'
         }
     ]

 2.  webpack特有的require.ensure()
 const list = r => require.ensure([], () => r(require('../components/list/list')), 'list');
 routes: [
     {
         path: '/list/blog',
         component: list,
         name: 'blog'
     }
 ]
 可以配置webpack实现模块的提取（单独打包）output:{chunkFilename:'js/[chunkhash:8].chunk.js'}
 chunkFilename用来打包require.ensure方法中引入的模块,如果该方法中没有引入任何模块则不会生成任何chunk块文件
 *
 * */



Webpack 常用的插件及功能？
/*
 * ExtractTextPlugin、mini-css-extract-plugin 提取css用的
 * SplitChunksPlugin、RuntimeChunkPlugin是CommonsChunkPlugin的替代品，用于提取一些公共模块
 * HotModuleReplacementPlugin 热更新替换
 * html-webpack-plugin 把编译后的文件（css/js）插入到入口文件中，可以只指定某些文件插入，可以对html进行压缩等
 * uglifyjs-webpack-plugins 代码压缩,默认会使用 optimization.minimizer
 * copy-webpack-plugin({from:'./doc',to:'./dist'}) 文件拷贝
 * CleanWebpackPlugin('./dist')清理相同js插件
 * */



Webpack4 怎么提取公共模块（多页应用）
/*
 合理使用代码分割
 a. 基础类库 chunk-libs : 比如 vue + vuex + vue-router + axios 这类的全家桶，一旦立项升级频率不高，但是每个文件基本都需要依赖
 b. UI组件库 chunk-common : 比如 element-ui 升级频率也不会高，单独打包原因是体积比较大
 c. 低频组件 ： 比如一些特定页面需要使用的第三方库文件--富文本编辑器等
 d. 公用业务代码 : 比如vue的路由懒加载 component: () => import('./xxx.vue') webpack默认会将其打包成一个独立的bundle
 * */
/*
 optimization:{
     splitChunks: {
         chunks: "all",
         cacheGroups: {
             libs: {
                 name: "chunk-libs",
                 test: /[\/]node_modules[\/]/,
                 priority: 10,
                 chunks: "initial" // 只打包初始时依赖的第三方
             },
             elementUI: {
                 name: "chunk-elementUI", // 单独将 elementUI 拆包
                 priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                 test: /[\/]node_modules[\/]element-ui[\/]/
             },
             commons: {
                 name: "chunk-comomns",
                 test: resolve("src/components"), // 可自定义拓展你的规则
                 minChunks: 2, // 最小共用次数
                 priority: 5,
                 reuseExistingChunk: true
             }
         }
     };
 },
 mode: 'development',
 * */

webpack用过哪些loader？
/*
 css的 style-loader css-loader less-loader  postcss-loader
 图片的url-loader
 js的babel-loader
 文件的file-loader
 json的json-loader
 vue的vue-loader
 */

webpack中babel的实现
/*
 npm install babel-loader babel-core babel-preset-env

 rules：{
     test:/\.(js|jsx)$/,
     use:['babel-loader'],
     exclude:/node_modules/
 }


 .babelrc文件>

 {
 "presets": ["env"]
 }

 * */



webpack，里面的webpack.config.js怎么配置
/*eg

 entry:'./src/index.js',//入口
 output:{
     filename:'build.[hash:8].js',
     path:path.resolve('./build'),
 },//出口
 devServer:{
     contentBase:'./build', //开启代理服务的 静态文件的根目录（localhost以build文件夹为根目录起的服务）
     port:3000,
     compress:true,//开启服务器压缩
     open:true//开启打包结束后，自动打开浏览器
 },//开发服务器
 module:{},//模块配置
 plugins:[
     new HtmlWebpackPlugin({//把项目中的html模板打包，并自动引入打包后的js文件
     template: './src/index.html',//
     hash:true,//引入打包后的js文件名加哈希值
 }),
 new CleanWebpackPlugin(['./build']),//清除./build文件夹下相同的文件
 ],//插件的配置
 mode:'development',//可以更改模式
 resolve:{}//配置解析
 */

利用webpack如何优化前端性能(optimization对象)
/*
 * 1.html压缩 new HtmlWebpackPlugin();
 *
 * 2.css压缩 new ExtractTextPlugin
 *
 * css补齐前缀postCss 预处理器 + autoprefixer
 * 自动消除冗余的css代码 Purifycss + glob
 *
 * 3.js压缩 new webpack.optimize.UglifyJsPlugin
 *
 * 4.提取公共代码 optimization.splitChunks
 *
 * 5.路由懒加载 webpack特有的require.ensure
 *
 * 6.模块热加载 devServer{hot:true}  new webpack.HotModuleReplacementPlugin(),//模块热更新HMR的插件
 * if(module.hot){//热更新的配置 ,只要依赖的模块有修改，就会执行热更新，不刷新页面
 module.hot.accept();
 }
 *
 * 7.图片转化base64  url-loader
 *
 * 8.清理由于hash打包产生的多个同一文件 new CleanWebpackPlugin(['./dist']),
 *
 * */
html-Wbpack-Plugin插件(将打包后的js自动引入到html模板)
/*new HtmlWebpackPlugin({
     template:'./src/index.html',//模板
     filename:'index.html',//文件名
     minify:{//压缩
         removeAttrbuiteQutes:true,//去除html中的引号
         collaspWhitespace:true//去除html中的空格
     },
     hash:true,//打包后引入的js后边带hash后缀，防止缓存
     chunk:['home']//用于多页面打包模板，此index.html盛放的是home打包的js
 })*/
loader的用法

/*多个loader需要[];
 loader的顺序 默认是从右往左 从下到上执行
 loader可以写成对象形式，方便配置
 module:{
     rules:[
         {
             test:/\.less$/,
             use: [
                 {//对象写法
                     loader:'style-loader',
                     options:{
                     insertAt:'top'//写在head的上方，避免覆盖html文件中的style样式
                 }
             },
             'css-loader',//直接写loader名字
             'less-loader'
            ]
        }
    ]
 }*/
mini-css-extract-plugin 插件抽离css

/*new MiniCssExtractPlugin({
    filename:'css/main.css',//抽离出来的文件名叫main.css放到css文件夹下
 })

 module:{
     rules:[
         {
             test:/\.less$/,
                 use: [
                     MiniCssExtractPlugin.loader,//抽离到main.css
                     'css-loader',//直接写loader名字
                     'less-loader'
                 ]
             },
         {
         test:/\.css$/,
             use: [
                 MiniCssExtractPlugin.loader,//抽离到main.css
                 'css-loader',//直接写loader名字
             ]
         }
     ]
 }*/
给css样式自动添加前缀 使用postcss-loader autoprefixed
/*module:{
    rules:[
        {
         test:/\.css$/,
             use: [
                 MiniCssExtractPlugin.loader,//抽离到main.css
                 'css-loader',//直接写loader名字
                 'postcss-loader',
             ]
         }
     ]
 }
 需要添加postcss.config.js配置文件
 module.exports={
    plugins:[require('autoprefixed')]
 }*/
css js 压缩(uglifyjs-webpack-plugin,optimize-css-assets-webpack-plugin)

/*const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
 module.exports = {
     optimization: {//优化项
         minimizer: [//js压缩
             new UglifyJsPlugin({
                 cache: true,//是否缓存
                 parallel: true,//是否并发 打包
                 sourceMap: true//源码映射
             }),
             new OptimizeCSSAssetsPlugin({})//css压缩
         ]
     },
     plugins: [
         new MiniCssExtractPlugin({
             filename: "[name].css",
             chunkFilename: "[id].css"
         })
     ],
     module: {
         rules: [
             {
                 test: /\.css$/,
                 use: [
                     MiniCssExtractPlugin.loader,
                     "css-loader"
                 ]
             }
         ]
     }
 }*/
babel转化es6(babel-loader, @babel/core, @babel/preset-env)
/*module: {
     rules: [
         {
             test: /\.js$/,
             exclude: /(node_modules|bower_components)/,
             use: {
                 loader: 'babel-loader',
                 options: {//预设
                 presets: ['@babel/preset-env']
                }
            }
        }
     ]
 }*/

expose-loader暴露全局的loader

webpack打包图片

/*file-loader默认会在内部生成一张图片 到build目录下
 rules:[
    {test:/\.(png|jpg|gif)$/,use:'file-loader'}
 ]

url-loader可以生成图片并转成base64
 rules:[
     {
        text:/\.(png|jpg|gif)$/,
         use:{
            loader:'url-loader',
             options:{
                 limit:200,//如果图片小于200k就转为base64
                 outputPath:img//把所有的图片打包到outputPath文件夹下
             }
         }
     }
 ]*/

devtool:source-map 增加映射文件 帮助调试源代码

/*
 devtool:source-map 源码映射，会单独生成一个sourcemap文件，如果文件报错，会标识当前报错的位置（大而全，慢）
 devtool:eval-source-map 不会产生单独的文件，但是可以显示报错的位置
 devtool:cleap-module-source-map 会产生单独的文件，但是不会显示报错位置
 devtool:cleap-module-eval-source-map不会产生文件，集成在打包后的文件中，不会显示报错位置（性能好，能够找到报错是第几行）
 */

webpack跨域配置

/*
devServer:{
    proxy:{
        '/api':'http//localhost:3000', //配置一个代理 要是接口以/api开头的去请求 http//localhost:3000
        '/api':{// 如果接口中没有任何标识 pathRewrite 把/api替换为'' 就看可以了
            target:'http//localhost:3000',
            pathRewrite:{'/api':''}
        }
    }
}
resolve解析第三方包jq bootstrap等 (起别名)
*/
/*resolve:{
    modules:[path.resolve('node_modules')],
    alias:{//别名
        bootstrap:'bootstrap/dist/css/bootstrap.css'//这样页面中就不需要引用长路径了，只需要import 'bootstrap'
    }
}*/

定义环境变量 new Webpack.DefinePlugin();
/*new Webpack.DefinePlugin({
    DEV:JSON.stringify('dev'),//给index入口文件中定义一个变量变量名是DEV 值是'dev'
})*/
区分环境变量
/*
webpack.base.js基础配置/webpack.prod.js生产环境配置/webpack.dev.js开发环境配置

webpack.prod.js//生产环境
let {smart} = require('webpack-merge');
let base=require('./webpack.base.js');
module.exports=smart(base,{
    mode:'production',
    optimization:{//优化项
        minimizer:{

        }
    }
})

webpack.prod.js//开发环境
let {smart} = require('webpack-merge');
let base=require('./webpack.base.js');
module.exports=smart(base,{
    mode:'development',

})*/
webpack优化

/*module.exports={
    mode:'development'
    entry:'./index.js',
    output:{
        filename:'',
        path:'',
    },
    devServer:{//服务
        port:3000,
        open:true,
        contentBase:'./dist'//以dist为根目录
    },
    module: {
        noParse:/jquery/,  //不去解析jquery中的依赖库
        rule: {
            test: /\.(js|jsx)$/,
            exclude:/node_modules/, //忽略node_modules中的文件
            use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ]
                    }
                }
        }
    },
    plugins:[
        new webpack.IgnorePlugin(/\.\/locale/,/moment/) //忽略打包moment模块下的对locale文件依赖
        new HtmlWebpackPlugin({
            template:'',
            filename:'',
        })
    ],
}*/
热更新 3步
/*new Wbpack.HotModuleReplacementPlugin() //热更新插件
devServer:{
    hot:true,//开启热更新
    port:3000,
    open:true,
    contentBase:'./dist'
}
//入口文件中
if(module.hot){
    module.hot.accept()
}*/
Webpack的核心原理
/*
1. 一切皆模块
正如js文件可以是一个“模块（module）”一样，其他的（如css、image或html）文件也可视作模 块。因此，你可以require('myJSfile.js')亦可以require('myCSSfile.css')。这意味着我们可以将事物（业务）分割成更小的易于管理的片段，从而达到重复利用等的目的。

2. 按需加载
传统的模块打包工具（module bundlers）最终将所有的模块编译生成一个庞大的bundle.js文件。但是在真实的app里边，“bundle.js”文件可能有10M到15M之大可能会导致应用一直处于加载中状态。因此Webpack使用许多特性来分割代码然后生成多个“bundle”文件，而且异步加载部分代码以实现按需加载。
*/




































