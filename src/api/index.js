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

// 获取商品品详情数据，需要传递skuid参数

export const reqGoodsInfo = (skuId) => requests({url:`/item/${ skuId }`,method:'GET',})

// 添加到购物车或者修改购物车数据

export const reqAddShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'POST'})

// 获取购物车列表数据

export const reqCarList = ()=>requests({url:'/cart/cartList',method:'GET'})

// 请求删除购物车数据

export const reqDeleteShopCart=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'DELETE'})

// 修改商品的勾选状态
export const reqUpdateChecked=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'GET'})