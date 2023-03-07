
## 3)把首页当中轮播图拆分为一个共用全局组件。 

切记:以后在开发项目的时候，如果看到某一个组件在很多地方都使用，你把它变成全局组件注册一次，可以在任意地方使用，共用的组件|非路由组件放到components文件夹中

4)search模块开发?
1:先静态页面 + 静态组件拆分出来
2:发请求 (API)
3) vuex(三连环)
4)组件获取仓库数据，动态展示数据g

// 在组建挂载之前（也就是发请求之前）把参数整理下
    beforeMounted(){
      this.searchParams= Object.assign(this.searchParams,this.$route.params,this.$route.query)
    },
    // search页面不止发一次请求，这里组件挂载完毕发请求，只能发送一次,封装为函数后调用一次
    mounted(){
      // 在发请求前让参数发生变化并带给服务
      this.getData()
    },
    computed:{
      ...mapGetters(['goodsList'])
    }, 
    methods:{
        //将search发送请求封装为一个函数，根据参数的不同发送不同的请求
      getData(){
        this.$store.dispatch('getSearchList',this.searchParams)
      }
    }