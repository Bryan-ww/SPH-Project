import { reqRequestCode,reqUserLogin,reqUserRegister,reqUserInfo, reqUserLogout } from "@/api";
import { setToken,getToken,removeToken } from "@/utils/token";
// 配置store

const state={
    code:'',
    // 那本地存好的token
    token: getToken(),
    userInfo:{},
}
const mutations={
    REQUESTCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.code='';
        state.userInfo = {};
        removeToken();
    }

}
const actions={
    async requestCode({commit},phone){
        //获取验证码的这个接口:把验证码返回，但是正常情况，后台把验证码发到用户手机上[省钱]
        let result = await reqRequestCode(phone)
        // console.log(result);
        if(result.code==200){
          commit('REQUESTCODE',result.data)
        } else {
           return Promise.reject(new Error('faile'))
          
        }
    },
    // 用户注册
    async userRegister({commit},data){
        let result = await reqUserRegister(data)
        // console.log(result);
        if(result.code==200){
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登录
    async UserLogin({commit},data){
        let result = await reqUserLogin(data)
        // //服务器下发token，用户唯一标识符(uuid)
       //将来经常通过带token找服务器要用户信息进行展示
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            // 持久化存储到本地
            setToken(result.data.token)
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // TOKEN校验,获取用户信息
    async getUserInfo({commit}){
        let result= await reqUserInfo();
        // console.log(result); 
        if(result.code==200){
            // 提交用户信息
            commit('GETUSERINFO',result.data)
            return'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        let result= await reqUserLogout(); 
        if(result.code==200){
            // 如果成功，提交mutations清楚数据
            commit('CLEAR');
        } else {
            return Promise.reject(new Error('faile'))
         }
    }






}
const getters={}

export default{
    state,
    mutations,
    actions,
    getters

}