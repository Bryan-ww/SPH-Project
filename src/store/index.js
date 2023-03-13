import Vue from 'vue'
import Vuex from 'vuex'
// 使用插件
Vue.use(Vuex)
// 引入store
 import home from './home'
 import search from './search'
 import detail from './detail'
 import carlist from './carlist'
 import user from './user'
 import trade from './trade'
// 创建并暴露Store实例

export default new Vuex.Store({
    // 实现vuex仓库模块式开发存储数据
    modules:{
        home,
        search,
        detail,
        carlist,
        user,
        trade
    }
})