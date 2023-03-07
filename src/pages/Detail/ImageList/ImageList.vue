<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImage,index) in skuImageList" :key="skuImage.id">
        <img :src="skuImage.imgUrl" :class="{active:currentIndex==index}" @click="changeCurrentIndex(index)"> 
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination} from 'swiper';
Swiper.use([Pagination, Navigation])
  export default {
    name: "ImageList",
    // 响应式数据
    data(){
      return {
        currentIndex: 0
      }
    },
    props:['skuImageList'],
    watch:{
      skuImageList:{
        // 不管数据是否回来先监听一次
        immeida:true,
        handler(val) {
          this.$nextTick(()=>{
            var mySwiper = new Swiper(".swiper-container",{
              // direction: 'vertical'
              loop:true,
              // 如果需要分页器
              // Pagination{
              //   el: '.swiper-pagination'
              // }
                 // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              // 代表一排展示几页
              slidesPerView: 3,
              // 网格布局
              grid: {
                // 横向排列还是竖向排列
                fill: 'row',
                // 需要几行
                rows: 1,
                }
            })
          })
        }
      }

    },
    methods:{
      changeCurrentIndex(index) {
        // 修改响应式数据
        this.currentIndex = index;
        // 全局事件总线触发事件:通知兄弟组件index值
        this.$bus.$emit('changeIndex',this.currentIndex)
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>