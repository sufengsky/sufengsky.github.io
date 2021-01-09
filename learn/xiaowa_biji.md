
 # 2020.12.12 20:00-22:00 promise规范及应用
 https://live.vhall.com/room/watch/442640570
 ## 为什么需要promise
    javascript单线程语言  
    异常处理的需要
 ## 1、promises/A+规范详解
    promise基础   
    如何把异步函数封装为promise

 ## 2、实现一个简易版本的promise函数

 ## 3、ES6/ESNext中的generator/async await简介

 # 2020.12.13 20:00-22:00 JS模块化详解
 ## 1、CommonJS模块化规范及发展

 ## 2、AMD、CMD、SystemJS模块化规范介绍及使用
    运行环境层面实现的
 ## 3、ESModule规范及与其他规范的区别  
    语法层面
 ## 4、模块化打包工具工程化使用简介   
    browserify/rollup/webpack 打包工具主要解决模块化规范之间的差异 
    babel主要是解决语法降价以达到语法兼容的问题
    CommonJS与ESModule这两个规范是重点

 # 2020.12.19 20:0-22:00 浏览器内置JS对象详解、浏览器事件模型详解、浏览器请求相关内容详解
 ## 1、浏览器内置JS对象详解
 ### 常见浏览器JS对象常见API及用法
 ## 2、浏览器事件模型详解
 ### 2.1详解浏览器事件捕获，冒泡以及浏览器不同规范间区别
 ### 2.2绑定事件的应用，以及封装一个多浏览器的绑定事件函数
 ## 3、浏览器请求相关内容详解
 ### 3.1ajax及fetch API详解
 ### 3.2常见的浏览器请求、响应头、错误码解析
 ### 3.3发送请求的示例，以及封装一个多浏览器兼容的请求函数

 # 2020.12.20 20:00-22:00 面向对象编程/原型及原型链
 ## 1、JS面向对象编程
 ## 2、原型及原型链
    JavaScript深入之从原型到原型链(讲的不错)    https://www.ltonus.com/JavaScript/__proto__.html    

 ## 3、继承（原型继承、构造函数继承、组合继承）
 ## ------自学内容 this指针/闭包/作用域
 ## 1、this指针详解
 ## 2、闭包的概念及应用场景
 ## 3、作用域(全局作用域、函数作用域)

# 2020-12-26 20:00-22:00 前端工程化的发展及工具详解-止水
## 上节课的作业      
    可以使用 async-poll 或 Plimt 这样库来实现    建议看下这两个库的源码
## 前端工程化
## npm包管理                                  
    npm install   
    npm publish  
## bower管理工具   
    例如：bower install jquery   
    配置文件 .bowerrc   rc(runtime config)
## npm管理工具
    配置文件 package.json   
## yarn管理工具

## 前端代码格式化与风格检查    
    eslint   
    prettier  

## js编译   
    babel    
    需要安装两个模块   
    can i use 网站配置babel的编译设置 
    @babel/core @babel/cli         
    @babel/preset-env   通过target控制编译结果           
    @babel/pollyfill  处理方法不存在的问题  给对象增加了方法以避免运行时错误      

# js打包工具    
    browserfy commonjs模块化开发的代码转换成可以在浏览器端使用的代码    
    roolup  要使用es-module方式进行模块化规范编码      

## js压缩工具    
    uglify    

## 流式处理工具     
    grunt    
    gulp     

## 通用处理工具     
    fis3    百度出品      
    webpack    
## 作业：     
    如果只想兼容chrome 87   如何配置  "@babel/preset-env"
    重点跑下 babel的这个例子

 # 2020-12-27 20:00-22:00 ES6 & ESNext 常见 API 及 babel 编译-止水
https://live.vhall.com/room/watch/358850593
 ## 1、ECMAScript规范发展简介    
 ## 2、ES6新增API解析
    2.1 推荐看阮一峰的书(ECMAScript6 入门)    
    2.2 let/const/async/await/yeild    
        let与const的区别(面试题)     
    2.3 解构
        console.log(...[1,2,3])
        const list=[1,2,3]; const [a,...rest]=list;
        避免与ESModule模块化的混淆
    2.4 Promise.allSettled  解决 Promise.all要加catch才能一定进入then函数
    2.5 for in 与 for of 的区别
        for of与async(await) 实现对promise数组的顺序执行
    2.6 async await   
    2.7 iterator 迭代器
    2.8 proxy与reflector(用的比较少)
    2.9 decorator(不太稳定的语法)
 ## 3、ESNext规范中的API解析
 ## 4、babel编译工具链的使用
    4.1 三个步骤 解析=>转换=>生成 (编译的本质是字符串到字符串的转换)
        estree规范
    4.2 涉及的工具
        @babel/parser
        @babel/traverse
        @babel/types
        @babel/generator
    4.3 课后作业
    https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md

 # 2020.12.27 20:00-22:00 ES6项目实战
 ## 1、使用node.js express框架书写简单API
 ## 2、项目实战：使用ES6完成今日头条

 # 2021.1.2 20:00-22:00 vue.js基础(录播)
 ## 1.vue.js简介
 ## 2.vue.js模板及指令
 ## 3.vue.js事件/数据绑定
 ## 4.vue.js组件化

 # 2021.1.3 20:00-22:00 vue.js高级用法
 ## 1.mixin复用
 ## 2.vue.js动画特效 & 常用组件库介绍
 ## 3.插槽 插件 过滤器
 ## 4.深入vue原理

 # 2021.1.8 20:00-22:00 vue-cli详解(录播)
 ## 1.vue-cli原理及用法完全掌握
 ## 2.vue-cli源码解析
 
 # 2021.1.9 20:00-22:00 vue.js前端路由及异步组件
 ## 1.前端路由router原理及表现
 ## 2.vue.js router使用详解 
 ## 3.异步组件
 ## 4、作业  将vue-router选项扁平化处理(将vue-router嵌套的树扁平化处理，BFS, DFS)
 可以参考vue-router源码 https://github.com/vuejs/vue-router/blob/dev/src/create-route-map.js
