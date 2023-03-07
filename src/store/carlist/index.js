// 引入API
import {reqCarList,reqDeleteShopCart, reqUpdateChecked} from '@/api'
// 配置小仓库store
const  state= {
    carlist:[]
}
const  mutations= {
    GETCARLIST(state,carlist) {
        state.carlist = carlist;
    }
}
const  actions= {
    // 获取购物车列表
    async getCarList({commit}){
        let result = await reqCarList();
        // console.log(result);
        if(result.code==200){
            commit('GETCARLIST',result.data)
        }
    },
    // 删除购物车某一个产品
    async deleteShopCart({commit},skuId){
        let result = await reqDeleteShopCart(skuId)
        if(result.code==200){
            return 'ok'
        } else {
            Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一个产品的勾选状态
    async updateChecked({commit},{skuId,isChecked}){
        let result = await reqUpdateChecked(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        } else {
            Promise.reject(new Error('faile'))
        }
    },
    // 删除所有勾选的产品
    deleteAllCheckCart({dispatch,getters}){
        let promiseAll= []
        getters.cartInfo.cartInfoList.forEach(item=>{
            // 需要先判断是否已经勾选,三元表达式，promise返回威空就就是
            let promise = item.isChecked==1?dispatch('deleteShopCart',item.skuId):'';
            // 将循坏产生的所有promise放入数组中
            promiseAll.push(promise)
        });
        // 返回promise的最终结果
        return Promise.all(promiseAll)

    },
    // 修改全部产品的勾选状态
    // 这里解构赋值的是context下的dispatch,state,getters,commit
    updatedAllChecked({dispatch,state},isChecked){
        let promiseAll =[]
        state.carlist[0].cartInfoList.forEach(item => {
            let promise =dispatch('updateChecked',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        });
        // 最终返回的结果
        return Promise.all(promiseAll)
    }

}
const  getters= {
    cartInfo(state){
        return state.carlist[0] || {}
    }
}


export default{
    state,
    actions,
    mutations,
    getters
}