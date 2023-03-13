// 暴露一个本地存储函数
export const setToken= (token)=>{
    localStorage.setItem('TOKEN',token)
}
// 获取token
export const getToken= ()=>{
    // 这里千万记得return
    return localStorage.getItem('TOKEN')
}
// 暴露一个清楚token的函数
export const removeToken= ()=>{
    localStorage.removeItem('TOKEN')
}