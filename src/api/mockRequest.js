// axios的二次封装
import axios from 'axios'
// 引入进度条 // start:开始， done结束
import nprogress from 'nprogress'
// 需要引入进度条的样式才能响应
import  'nprogress/nprogress.css'

// 创建axios实例对象
const requests = axios.create({
    baseURL: '/mock',
    timeout:5000
})
// 设置请求拦截器
requests.interceptors.request.use((config)=>{
    // config配置对象，里面的headers请求头很重要
    // 请求时，进度条开始动
    nprogress.start()
    return config;
})
// 设置响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数:服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    // 响应成功后，进度条结束
    nprogress.done()
    return res.data
}, (error)=>{
    // console.log(error.message);
    return error.message
   }
)
// 对外暴露
export default requests