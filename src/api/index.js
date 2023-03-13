// 当前这个模块：api进行统一管理
import requests from './request'
import mockRequest from './mockRequest'

// 分别暴露

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

// 注册界面获取验证码

export  const reqRequestCode= (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'GET'})

// 注册完成接口

export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'POST'})


// 登录接口

export const reqUserLogin= (data)=>requests({url:'/user/passport/login',data,method:'POST'})

// 获取用户信息展示到页面（需要带着用户的token来要服务器要用户的信息）
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'GET'})

// 退出登录接口

export const reqUserLogout=()=>requests({url:'/user/passport/logout',method:'GET'})

// 获取用户地址信息

export const reqUserAddress=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'GET'})

// 获取商品清单/order/auth/trade
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'GET'})

// 提交订单接口

export const reqOrdersubmit=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'POST'})

// 获取支付信息

export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'GET'})

// 获取支付状态，是否支付成功

export const reqPaymentStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'GET'})

// 获取个人中心订单列表

export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'GET'})