// home模块小仓库
import {reqCategoryList,reqGetbannerList,reqFloorList} from "@/api";

// 配置store
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。[根据接口返回值初始化的)
    categoryList:[],
    // 轮播图的数据
    bannerList:[],
    // floor的数据
    floorList:[]

};
 
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList= bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList= floorList
    },
} 
 
const actions={
    // 通过API里面的接口函数调用，向服务器发送请求，获取返回的数据
    async categoryList({commit}){
        // 获取数据
        let result = await reqCategoryList();
        // console.log(result);
        if(result.code===200) {
            commit('CATEGORYLIST',result.data)
        }
    },
    // 获取首页轮播图
    async   getBannerList({commit}){
        let result =  await reqGetbannerList();
        if(result.code===200){
            commit('GETBANNERLIST',result.data)
        }
    },
    // 获取floor数据
    async   getFloorList({commit}){
        let result =  await reqFloorList();
        if(result.code===200){
            // 提交
            commit('GETFLOORLIST',result.data)
        }
    }

    
}
 
const getters = {}
 

export default {
    state,
    mutations,
    actions,
    getters

}