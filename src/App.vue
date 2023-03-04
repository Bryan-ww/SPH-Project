<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- footer的显示与隐藏 -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
  
</template>

<script>
    import Header from './components/Header'
    import Footer from './components/Footer'
    export default {
        name:'App',
        components:{
          Header,Footer
        },
        mounted(){
              //  通知Vuex发送请求，获取数据，存储数据到仓库
        this.$store.dispatch("categoryList");
        }
 
    }
</script>

<style>

</style>
