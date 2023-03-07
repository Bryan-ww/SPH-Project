import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID= ()=>{
    // 先判断本地存储李有不有uuid
    let uuid_token= localStorage.getItem('UUID_TOKEN')
    // 如果没有
    if(!uuid_token){
        //  生成一个uuid_topken
        uuid_token=uuidv4()
        localStorage.setItem('UUID_TOKEN',uuid_token)
    }

    // 千万注意函数一定要有返回值.没有返回值就是undefined
    return uuid_token;

}