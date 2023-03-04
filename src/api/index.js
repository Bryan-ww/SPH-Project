// 当前这个模块：api进行统一管理
import requests from './request'
import mockRequest from './mockRequest'

// 三级联动接口
//  /api/product/getBaseCategoryList get 无参数
export  const reqCategoryList= ()=>requests({url:'/product/getBaseCategoryList',method:'GET'})
    // 发请求,返回的是Promise对象

    // 获取banner轮播图接口
export const reqGetbannerList= ()=>mockRequest.get('/banner')

// 获取floor数据
export const reqFloorList= ()=>mockRequest.get('/floor')
 
 
// 获取搜索板块数据 

export const reqGetSearchInfo= (params)=> requests({url:'/list',method:'POST',data:params})