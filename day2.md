解决路由原型push方法报错。需要重写push和replace方法
1:编程式路由跳转到当前路由(参数不变)，多次执行会抛出NavigationDuplicated的警告错误?
--路由跳转有两种形式: 声明式导航、编程式导航--声明式导航没有这类问题的，因为vue-router底层已经处理好了
1.1为什么编程式导航进行路由跳转的时候，就有这种警告错误那?"vue-router":“3.5.3": 
最新的vue-router引入promise1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决。

2:Home模块组件拆分
--先把静态页面完成
--拆分出静态组件
--获取服务器的数据进行展示
--动态业务

3:三级联动组件完成
---由于三级联动，在Home、Search、Detail，把三级联动注册为全局组件

好处:只需要注册一次，就可以在项目任意地方使用

4:完成其余静态组件
HTML + CSS +图片资源 

5:POSTMAN测试接口
--刚刚经过postman工具测试，接口是没有问题的
--如果服务器返回的数据code字段200，代表服务器返回数据成功整个项目，接口前缀都有/api字样

6:axios二次封装
XMLHttpRequest、fetch、JO、axios
6.1 为什么需要进行二次封装axios?
请求拦截器、响应拦截器: 请求拦截器，可以在发请求之前可以处理一些业务、响应拦截器，当服务器数据返回以后，可以处
理一些事情
6.2在项目当中经常API文件夹[axios]
接口当中:路径都带有/api
baseURL;"/api"
6.3有的同学axios基础不好，可以参考git]NPM关于axios文档

7:接口统一管理
项目很小:完全可以在组件的生命周期函数中发请求
项目大: axios.get('xxx')
7.1跨域问题
什么是跨域: 协议、域名、端口号不同请求，称之为跨域----前端项目本地服务器http://localhost:8080/#/home
----后台服务器
http://39 .98.123.211

8:nprogress进度条的使用
<!-- npm i nprogress 安装进度条插件 -->

start:进度条开始 在请求拦截器发出时开始
done: 进度条结束 在响应拦截器成功后结束
进度条颜色可以修改的，当然需要修改人家的样式

9.Vuex状态管理库
    9.1vuex是什么? 安装Vuex npm i vuex@3
    vuex是官方提供一个插件，状态管理库，集中式管理项目中组件共用的数据

vuex是官方提供一个插件，状态管理库，集中式管理项目中组件共用的数据。切记，并不是全部项目都需要vuex，如果项目很小，完全不需要vuex，如果项目很大，组件很多、数据很多，数据维护很费劲，Vuex
state
mutations
actions
getters
modules

9.3vuex实现模块式开发
如果项目过大，组件过多，接口也很多，数据也很多,可以让Vuex实现模块式开发模拟state存储数据
home :{} search:{}

10:完成TypeNav三级联动展示数据业务