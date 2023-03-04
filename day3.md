复习:
1)商品分类的三级列表由静态变为动态形式[获取服务器数据:解决跨域问题]
2)函数防抖与节流[面试频率很好]
3) 路由跳转:声明式导航(router-link) 、编程式导航
编程式导航解决这个问题:自定义属性

1)开发search模块中的TypeNav商品分类菜单(过渡动画效果)过渡动画:前提组件|元素务必要有v-iflv-show指令才可以进行过渡动画

2)现在咱们的商品分类三级列表可以进行优化?在App根组件当中发请求[根组mounted]执行一次

3)合并params与query参数?

4)开发Home首页当中的Listcontainer组件与Floor组件?
https://docschina.org/
但是这里需要知道一件事情:服务器返回的数据(接口)只有商品分类菜单分类数据，对于ListContainer组件与Floor组件数据服务器没
有提供的。
mock数据(模拟):如果你想mock数据，需要用到一个插件mockjs
使用步骤:mockis使用步骤
1)在项目当中src文件夹中创建mock文件夹
2)第二步准备JSON数据(mock文件夹中创建相应的JSON文件) -----格式化一下，别留有空格(跑不起来的)
3)把mock数据需要的图片放置到public文件夹中[public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹
4)创建mockserve.js通过mockjs插件实现模拟数据
5)mockserve.js文件在入口文件中引入 (至少需要执行一次，才能模拟数据)

5) Listcontainer组件开发重点?

swiper轮播插件的的基本使用 npm install swiper@6
安装Swiper插件: 安装的是swiper@6


import Swiper, { Pagination, Navigation, Autoplay } from 'swiper' // js 模块
import 'swiper/swiper-bundle.css' // css 模块
Swiper.use([Pagination, Navigation, Autoplay])


复习:
1) 完成商品分类的三级列表路由跳转一级路由传参(合并参数)
2)完成search模块中对于typeNav使用 (过渡动画的)
3)对于typeNav请求次数也进行优化
4)swiper插件
swiper插件:经常制作轮播图(移动端|PC端也可以使用)使用步骤:
第一步:引入相应依赖包(swiper.js|swiper.css第二步:页面中的结构务必要有
第三步:初始化swiper实例，给轮播图添加动态效果5)mock数据，通过mockjs模块实现的
1)最完美的解决方案，解决轮播图问题。
watch + nextTick : 数据监听:监听已有数据变化snextTick: 在下次DOM更新 循环结束之后 执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的 DOMsnextTick:可以保证也页面中的解构一定是有的，经常和很多插件一起使用[都需要DOM存在了]

2)开发floor组件
切记:仓库当中的state的数据格式，你别瞎写、胡写、乱写，数据格式取决于服务器返回的数据

2.1: getFloorList这个action在哪里触发，是需要在Home路由组件当中发的，不能在Foor组件内部发actiion因为我们需要v-for遍历floor组件

2.2v-for也可以在自定义标签当中使用

2.3组件通信的方式有哪些? 面试频率极高props:用于父子组件通信
自定义事件:@on @emit 可以实现子给父通信
全局事件总线:$bus 全能
pubsub-js:vue当中几乎不用 
全能插槽
vuex