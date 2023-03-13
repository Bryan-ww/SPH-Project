//配置路由
// 引入Vue
import Vue from 'vue'
// 引入Vue-router
import VueRouter from 'vue-router'
// 引入store
import store from '@/store'
// 使用插件
Vue.use(VueRouter)
// 引入配置路由的文件
import routes from './routes'

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.push
// 重写replace||push方法
//第一个参数: 告诉原来push方法，你往哪里跳转(传递哪些参数)
//第二个参数: 成功回调//第三个参数:失败的回调//call apply区别
//相同点，都可以调用函数一次，都可以篡改函数的上下文一次
//不痛点: ca11与apply传递参数: cal1传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)


    } else {
        originPush.call(this, location, () => { }, () => { })

    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)


    } else {
        originReplace.call(this, location, () => { }, () => { })

    }
}
// 创建并暴露路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置 y =0代码滚动到最上方
        return { y: 0 }
    }
});

// 通过路由守卫设定条件，让路由有条件跳转,全局守卫：前置
router.beforeEach(async (to, from, next) => {
    //to:可以获取到你要跳转到那个路由信息
    //from:可以获取到你从哪个路由而来的信息
    //next:放行函数next()放行//next('/login')
    //next:放行函数next()放行 next(path)放行到指令路由 next(false);
    // console.log(store);
    let token = store.state.user.token;
    //    通过store拿到token数据,userinfo可能是空对象，所以需要用对象里的属性来判断
    let name = store.state.user.userInfo.name;
    // console.log(token,name);
    //    判断用户是否登录
    if(token) {
        // 如果已经登录无法再次进入登录页面
        if (to.path == '/login') {
            next('/home')
        } else {
            // 只要不是去login，去其他页面需要带着用户信息重新发请求，，在路由跳转前需要判断用户信息是否存在
            if(name) {
                next();
            } else {
                try {
                    // 如果没有用户信息，需要发请求获取用户信息之后再跳转，这样保证页面刷新用户信息不会丢失
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // 如果token失效的话 一直没有拿到，需要重新登录并清楚token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }

        }
    } else {
        // 如果没登录，未登录访问 ，不能取交易相关(trade)、支付相关(pay、paysurcess)、用户中心(center)相关跳转到登录页面
        let toPath= to.path  //为路径名
        // 判断去哪里,如果去这些路由，必须返回登录页并带着当前页的query参数跳转
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            //把未登录的时候想去而没有去成的信息，存储于地址栏(路由query参数中)
            next(`/login?redirect=${toPath}`)

        } else {
            // console.log(toPath);
            next();
        }

    }
})
export default router
