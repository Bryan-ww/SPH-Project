// search模块小仓库

import { reqGetSearchInfo } from "@/api";

// 配置store
const state = {
    searchList:{}
};
 
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList= searchList
   }
}
 
const actions={
    async getSearchList({commit},params={}){
        //当前这个regGetsearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数(空对象)
        //params形参:是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
      let result= await reqGetSearchInfo(params)
    //   console.log(result);
      if(result.code===200) { 
        commit('GETSEARCHLIST',result.data)
      }
    }
}
 //计算属性，在项目当中，为了简化数据而生。在这里可以吧将来在组件中要使用的数据简化下
const getters = {
    // 这里的形参是当前仓库的state
    goodsList(state){
        // 下面这样写可能为undefined，空对象
        //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
       //假如网络不给力|没有网state.searchList.goodsList应该返回的是undefined
       //计算新的属性的属性值至少给人家来一个数组
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }
}
 

export default {
    state,
    mutations,
    actions,
    getters

}