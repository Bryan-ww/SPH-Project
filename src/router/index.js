//配置路由
// 引入Vue
import Vue from 'vue'
// 引入Vue-router
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入配置路由的文件
import routes from './routes'

// 先把VueRouter原型对象的push，先保存一份
let originPush=VueRouter.prototype.push
let originReplace= VueRouter.prototype.push
// 重写replace||push方法
//第一个参数: 告诉原来push方法，你往哪里跳转(传递哪些参数)
//第二个参数: 成功回调//第三个参数:失败的回调//call apply区别
//相同点，都可以调用函数一次，都可以篡改函数的上下文一次
//不痛点: ca11与apply传递参数: cal1传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push= function(location,resolve,reject ){
    if(resolve&&reject ) {
        originPush.call(this,location,resolve,reject)
        
        
    } else {
        originPush.call(this,location,()=>{},()=>{})
         
    }
}
VueRouter.prototype.replace= function(location,resolve,reject ){
    if(resolve&&reject ) {
        originReplace.call(this,location,resolve,reject)
        
        
    } else {
        originReplace.call(this,location,()=>{},()=>{})
         
    }
}
// 创建并暴露路由
export default new VueRouter ({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置 y =0代码滚动到最上方
    return {y:0}
  }
})
