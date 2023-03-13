// 该文件为入口文件
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 把三级联动组件注册为全局组件
// 引入组件
import TypeNav from'@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 注册全局组件(第一个参数为全局组件名，第二个参数是指哪一个组件)
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// 注册
import store from '@/store'
// 引入Mockserverjs=mock数据
import  '@/mock/mockServe'
// 引入swiper样式
import 'swiper/swiper-bundle.css';
//  统一引入API
import * as API from '@/api';
// 按需引入UI button
import {Button,MessageBox} from 'element-ui';
// 使用插件
Vue.component(Button.name, Button);
// 使用msgbox
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入 lazyload
import VueLazyload from 'vue-lazyload'
// 引入默认的图片
import atm from '@/assets/images/1.gif'
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: atm 
})
// 
import '@/plugins/validate';

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
})

Vue.config.productionTip = false

new Vue({ 
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由信息: 当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  //注册仓库:组件实例的身上会多个一个属性$store属性
  store
}).$mount('#app')
