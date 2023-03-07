// 这个文件统一注册路由信息
// 引入一级组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
export default [{
    path: '/home',
    component: Home,
    // 配置footer是否需要展示
    meta: { showFooter: true }
},
{
    path: '/login',
    component: Login,
    meta: { showFooter: false }

},
{
    path: '/search/:keyword?',
    name: 'search',
    component: Search,
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
    component: Register,
    meta: { showFooter: false }
},
{
    path: '/detail/:skuid',
    component: Detail,
    meta: { showFooter: true }
},
{
    path: '/addcartsuccess',
    name:'addcartsuccess',
    component: AddCartSuccess,
    meta: { showFooter: true }
},
{
    path: '/shopcart',
    name:'shopcart',
    component: ShopCart,
    meta: { showFooter: true }
},
// // 重定向 在项目跑起来的时候，访问/,立马让他定向到首页
{
    path: '*',
    redirect: '/home'
}
]