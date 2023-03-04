// 该文件为入口文件
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 把三级联动组件注册为全局组件
// 引入组件
import TypeNav from'@/components/TypeNav'
import Carousel from '@/components/Carousel'
// 注册全局组件(第一个参数为全局组件名，第二个参数是指哪一个组件)
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
// 注册
import store from '@/store'
// 引入Mockserverjs=mock数据
import  '@/mock/mockServe'
// 引入swiper样式
import 'swiper/swiper-bundle.css';
 



Vue.config.productionTip = false

new Vue({ 
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  //注册路由信息: 当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  //注册仓库:组件实例的身上会多个一个属性$store属性
  store
}).$mount('#app')
