import {reqUserAddress,reqOrderInfo} from '@/api'

const state={
    userAddress:[],
    orderInfo:[]
}
const mutations={
    GETUSERADD(state,userAddress){
        state.userAddress= userAddress
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo= orderInfo
    }
}
const actions={
    async getUserAdd({commit}){
       let result= await reqUserAddress()
    //    console.log(result);
       if(result.code==200) {
         commit('GETUSERADD',result.data)
       }
    },
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        console.log(result);
        if(result.code==200) {
            commit('GETORDERINFO',result.data)
          }
    }
    
}
const getters={}

export default {
    state,
    mutations,
    actions,
    getters,
}