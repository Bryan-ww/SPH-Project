5)路由组件的搭建
vue-router
在上面分析的时候，路由组件应该有四个: Home、Search、Login、Registercomponents文件夹: 经常放置的非路由组件(共用全局组件)
pages|views文件夹:I经常放置路由组件
5.1配置路由
项目当中配置的路由一般放置在router文件夹中
5.2总结
路由组件与非路由组件的区别?1:路由组件一般放置在pages|views文件夹，非路由组件一般放置components文件夹中2:路由组件一般需要在router文件夹中进行注册(使用的即为组件的名字)，非路由组件在使用的时候，一般都是以标签的形式使用
3: 注册完路由，不管路由路由组件、还是非路由组件身上都有$route、$router属性
$route:一般获取路由信息[路径、query、params等等]
$router:一般进行编程式导航进行路由跳转[push|replace)

编程式导航:声明式导航能做的，编程式导航都能在，
但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑

6)Footer组件显示与隐藏
显示或者隐藏组件: v-iflv-show
Footer组件:在Home、Search显示Footer组件
Footer组件:在登录、注册时候隐藏的
6.1我们可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏。6.2配置的路由的时候，可以给路由添加路由元信息[meta]，路由需要配置对象，它的key不能瞎写、胡写、乱写

//面试题1:路由传递参数(对象写法) path是否可以结合params参数一起使用?
//答: 路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数
//面试题2:如何指定params参数可传可不传?
比如:配置路由的时候，占位了 (params参数)，但是路由跳转的时候就不传递路径会出现问题。可以在params参数后加？表示可传可不传
//面试题3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决?
/使用undefined解决: params参数可以传递、不传递 (空的字符串)
this.$router.push(fname:'search' ,params: {keyword: ''||undefined },query:(k:this.keyword
