// 引入接口请求
import { reqGoodsInfo,reqAddShopCart } from "@/api";
// 封装游客身份模块——————》生成一个随机字符串，不能再变了
import {getUUID} from '@/utils/uuid_token'

// 配置 store信息

const state= {
  goodsInfo:{},
  // 游客临时身份      
  uuid_token: getUUID()                                            
}
const mutations= {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
const actions= {
   async getGoodsInfo({commit},skuId){
      let result = await reqGoodsInfo(skuId);
      if(result.code==200){
        commit('GETGOODSINFO',result.data)
      } 
    },
    // 需要传递商品ID以及商品的个数
    //加入购物车返回的解构//加入购物车以后(发请求) ，前台将参数带给服务器
    //服务器写入数据成功， 并没有返回其他的数据，只是返回code=200，代表这次操作成功
    //因为服务器没有返回其余数据，因此咱们不需要三连环存储数据
    async getShopcartInfo({commit},{skuId,skuNum}){
      let result = await reqAddShopCart(skuId,skuNum);
      if (result.code==200){
        return'ok'
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
  
}
const getters= {
  // 简化数据
  categoryView(state){
    // 注意state里面可能为一个空对象或者数组
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state){
    return state.goodsInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
    state,
    mutations,
    actions,
    getters
}