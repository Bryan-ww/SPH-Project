<template>
  <div>
    <!-- 直接使用全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- v-for遍历，props父给子传数据 -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :floor="floor"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
  name:'',
  components:{ListContainer,Recommend,Rank,Brand,Like,Floor},
  mounted(){
    this.$store.dispatch('getFloorList')
  },
  computed:{
    ...mapState({floorList:(state)=>state.home.floorList})
  }

}
</script>

<style>

</style>