## 组件高级通信

组件通信方式:我们已经学习过的组件通信方式6种了

## 第一种: props

适用于的场景:父子组件通信
注意事项:
如果父组件给子组件传递数据(函数):本质其实是子组件给父组件传递数据
如果父组件给子组件传递的数据(非函数):本质就是父组件给子组件传递数据书写方式:3种
['todos'], {type:Array} , {type:Array , default:[]}
小提示:路由的props
书写形式:布尔值，对象、函数形式

## 第二种:自定义事件

适用于场景:子组件给父组件传递数据$on与$emit

## 第三种:全局事件总线$bus

适用于场景:万能
Vue.prototype.$bus = this;

## 第四种: pubsub-js,在React框架中使用比较多。 (发布与订阅)

适用于场景:万能

## 第五种:Vuex

适用于场景:万能

## 第六种:插槽

适用于场景:父子组件通信---- (一般结构)默认插槽具名插槽作用域插槽
插槽:可以实现父子组件通信 (通信的结构)
默认插槽
具名插槽
作用域插槽:子组件的数据来源于父组件，子组件是决定不了自身结构与外观

父组件：
<template slot-scope="todo"
 <span>{{todo.text}}</span>
</temnlate>

子组件  

<slot :todo="item" :$index="index"></slot>




## 事件注意事项

事件:系统事件 click、双击、鼠标系列等等自定义事件
事件源、事件类型、事件回调

1:原生DOM--button可以绑定系统事件---click单机事件等等

2:组件标签---event1可以绑定系统事件 (不起作用:因为属于自定义事件)----.-.native(可以把自定义事件变为原生DOM事件)

3.原生DOM当中是有oninput事件，它经常结合表单元素一起使用，当表单元素文本内容发生变化的时候就会发出发一次回调Vue

4:可以通过value与input事件实现v-model功能

<input type="text:value="msg” @input="msg = $event.target.value"/><span>!lmsgl1</span>
<!-- 深入学习v-mode:实现父子组件数据同步 (实现父子组件通信)-->

<!-- :value到底是什么?这可是props，父子组件通信@input到底是什么?并非原生DOM的input事件，属于自定义事件 -->
<CustomInput :value="msg" @input-"msg = $event"/>
<CustomInput v-model="msg"/>


## 第7种 v-model[组件通信方式一种]v-model它是vue框架中指令，它主要结合表单元素一起使用(文本框、复选、单选等等)它主要的作用是收集表单数据

v-model实现原理: value与input事件实现的，而且还需要注意可以通过v-model实现父子组件数据同步


## 第8种 属性修饰符sync[组件通信方式一种]可以实现父子组件数据同步。

<div>
小明的爸爸现在有{{money}}元
<h2>不使用sync修改符</h2>
<!--
:money 父组件给子组件传递props
@update:money 给子组件绑定的自定义事件只不过名字叫做update:money目前现在这种操作，起始和v-model很相似，可以实现父子组件数据同步 -->
<Child :money="money @update:money="money = $event"/><h2>使用sync修改符</h2>
<!--:money.sync:第一，父组件给字符串传递props money,第二，给当前子组件绑定了一个自定义事件，而且事件名称即为update:money -->
<Child2 :money.sync="money"/> // 需要子组件接受props并$emit触发自定义事件
<hr>
</div>


## 第9种 ：$attrs与Slisteners

// $attrs属于组件的一个属性，可以获取到父组件传递过来的props数据
1.对于子组件而言，父组件给的数据可以利用props接受，但是需要注意，如果子组件通过props接受的属性，在$attrs属性当中是获取不到的

// $listeners 它也是组件实例自身的一个属性，它可以获取到父组件给子组件传递自定义事件

<!-- 可以巧妙利用a标签实现按钮带有提示功能 -->
<a :title="title">
<!-- 下面这种写法，v-bind不能用: v-on 不能用@代替
<el-button v-bind="$attrs” v-on="$listeners"> </el-button>
/a>


## $children与$parent 

1.$children

ref可以获取到某一个组件，子组件. <!-- ref可以获取真实DOM节点，当然也可以获取子组件标签(操作子组件的数据与方法) -->
$children组件实例的属性，可以获取到当前组件的全部子组件[返回的是一个数组]

2.$parent 
this .$parent.money+=money;
// 需要在子组件内部，获取到父组件，让父组件的数据加上50
// 可以通过$parent属性获取到某一个组件父组件，可以操作父组件的数据与方法

## mixin 混入，主要针对js,共用的方法或者逻辑，都可以封装成一个mixins

export default{
    methods:{
        getMoney(){
            this.money-=money ;
            this.$parent.money+=money
        }
    }
}

使用时在组件中引入该模块 import myMixin from 'xxx',
接受mixins
mixins:[myMixin]

## 作用域插槽scope-slot

<!-- 子组件决定不了结构与外观,通过父组件给儿子传结构
父组件：
<template slot-scope="todo"
 <span>{{todo.text}}</span>
</temnlate>

子组件  

<slot :todo="item" :$index="index"></slot>