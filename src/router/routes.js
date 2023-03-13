// 这个文件统一注册路由信息
// 引入一级组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级组件
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
export default [{
    path: '/home',
    // 路由懒加载引入路由
    component: ()=>import('@/pages/Home'),
    // 配置footer是否需要展示
    meta: { showFooter: true }
},
{
    path: '/login',
    component: ()=>import('@/pages/Login'),
    meta: { showFooter: false }

},
{
    path: '/search/:keyword?',
    name: 'search',
    component: ()=>import('@/pages/Search'),
    meta: { showFooter: true },
    // 路由组件传递props数据1.布尔值写法
    // props:true(只能传递params参数)
    // 2.对象写法
    // props:{a:1,b:2}
    // 3.//函数写法: 可以params参数、query参数，通过props传递给路由组件
    props: ($route) => {
        return { keyword: $route.params.keyword, k: $route.query.k }
    }
},
{
    path: '/register',
    component: ()=>import('@/pages/Register'),
    meta: { showFooter: false }
},
{
    path: '/detail/:skuid',
    component: ()=>import('@/pages/Detail'),
    meta: { showFooter: true }
},
{
    path: '/addcartsuccess',
    name:'addcartsuccess',
    component: ()=>import('@/pages/AddCartSuccess'),
    meta: { showFooter: true }
},
{
    path: '/shopcart',
    name:'shopcart',
    component: ShopCart,
    meta: { showFooter: true }
},
{ 
    path: '/trade',
    name:'trade',
    component: Trade,
    meta: { showFooter: true },
    // 路由独享守卫
    beforeEnter:(to,from,next)=> {
        if(from.path=='/shopcart'){
            // 如果从购物车而来放行
            next()
        } else {
            // 不是的话从哪里来回哪里去
            next(false)
        }
    }
},
{ 
    path: '/pay',
    name:'pay',
    component: Pay,
    meta: { showFooter: true },
    beforeEnter:()=>{
        if(from.path=='/trade'){
            // 如果从交易页而来放行
            next()
        } else {
            // 不是的话从哪里来回哪里去
            next(false)
        }
    }
},
{ 
    path: '/paysuccess',
    name:'paysuccess',
    component: PaySuccess,
    meta: { showFooter: true }
},
{ 
    path: '/center',
    name:'center',
    component: Center,
    meta: { showFooter: true },
    // 注册二级路由
    children:[
        {
        path:'myorder' ,//二级路由路径可以不加/
        component:myOrder

       },
       {
        path:'grouporder' ,//二级路由路径可以不加/
        component:groupOrder
       },
    //    默认路由
       {
        path:'/center',
        redirect:'/center/myorder'
       }

    ]
},
// // 重定向 在项目跑起来的时候，访问/,立马让他定向到首页
{
    path: '*',
    redirect: '/home'
}
]