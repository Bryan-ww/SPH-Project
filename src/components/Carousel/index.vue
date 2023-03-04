<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in floor"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination} from 'swiper';
Swiper.use([Pagination, Navigation])
export default {
    name:'Carousel',
    props:['floor'],
    watch: {
      floor: {
      //为什么watch监听不到floor:因为这个数据从来没有发生变化(数据是父亲给的，父亲给的时候就是一个对象，对象里面该有的数据都是有的)
      // 所以不管数据是否变化，先执行一次，先监听一次
      immediate:true,
      handler(val) {
        // 由于d数据回来后dom没有更新使用nexttick方法
        this.$nextTick(() => {
          // 轮播图初始化
          var mySwiper = new Swiper(".swiper-container", {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>