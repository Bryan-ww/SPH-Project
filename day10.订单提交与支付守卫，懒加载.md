1.交易页面完成(商品清单)
动态展示数据完成

2.提交订单
1.a静态组件 b配置路由 c路由跳转（需要提交订单信息后再跳转）
2.2点击提交订单的按钮的时候，还需要向服务器发起一次请求[把支付一些信息传递给服务器]
2.3从今天开始项目，老师就不在碰vuex

3.获取支付信息(不在使用vuex)
3.1别再生命周期图数数中async

4.elementUI使用 +按需引入

React (Vue) :antd[pc] antd-mobile[移动端]
Vue:ElementuI[PC] vant[移动端的]

5.二维码生成 qrcode插件使用
6.支付业务
messagebox ELEment UI
7.个人中心



## 个人中心完成
面试的时候:是否封装过组件、分页器、日历个人中心当中:分页器

## 全局守卫

未登录访问 ，不能去交易相关(trade)、支付相关(pay、paysurcess)、用户中心(center)相关页面，应该跳转到登录页面

## 组件独享守卫

只有从购物车界面才能跳转到交易页面创建订单》

只有从交易页面《创建订单》页面才能跳转到支付页面

只有从支付页面才能跳转到支付成功页面

已经登录，不能直接去到payment，trade页面

## 图片懒加载
vue-lazyload插件使用

自定义插件使用

## 表单验证插件vee-validate

第一步:插件安装与引入
cnpm i vee-validate@2 --save 安装的插件安装 2 版本的
import VeeValidate from 'vee-validate"
import zh_CN from 'vee-validate/dist/locale/zh_CN
Vue.use(VeeValidate)
第二步:提示信息
VeeValidate.Validator.localize('zh_CN'，{
    messages:{
    ..zh_CN.messages ,
    is:(field)=>`${field)`必须与密码相同 // 修改内置规则的 message,让确认密码和密码相同
    }
    attributes:{// 给校验的 field 属性名映射中文名称
    phone:"手机号",
    code:"验证码",
    password:"密码",
    password1:"确认密码",
    isCheck:"协议"
    }
})

## 路由懒加载,注意当访问组件会被加载时不要使用懒加载 ：当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

conponent:()=>import("@/pages/search)

