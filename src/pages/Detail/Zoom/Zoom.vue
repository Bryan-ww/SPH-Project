<template>
  <div class="spec-preview" ref="box">
    <img :src="imgObj.imgUrl"/>
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask"  ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data(){
      return {
        currentIndex: 0
      }
    },
    props:['skuImageList'],
    computed:{
      imgObj(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    mounted(){
      // this.$bus.$one('事件名,事件回调)
      this.$bus.$on('changeIndex',(index)=>{
        // console.log(123);
        // 通知修改索引值
        this.currentIndex= index
      })
    },
    methods:{
      handler(event) {
        // 获取元素
        let mask = this.$refs.mask;
        let big = this.$refs.big;
        let box = this.$refs.box;
        // 计算mask盒子的left和top值
        let left = event.offsetX - mask.offsetWidth*0.5
        let top = event.offsetY - mask.offsetHeight*0.5  
        let Maxleft = box.offsetWidth-mask.offsetWidth;
        let Maxtop = box.offsetHeight-mask.offsetHeight;
        //  对mask活动范围做限制
        mask.style.left= (left <0? 0:left>Maxleft?Maxleft:left)+'px'
        mask.style.top= (top <0? 0:top>Maxtop?Maxtop:top)+'px'
        // if (left <0) left = 0;
        // if (left >=mask.offsetWidth) left = mask.offsetWidth
        // if (top <0) top = 0;
        // if (top >=mask.offsetHeight) top = mask.offsetHeight
        // mask.style.left= left +'px'
        // mask.style.top= top +'px'

        // 大图的移动
        // big.style.left = - 2 * left +'px'
        // big.style.top = - 2 *  top +'px'
        big.style.left= -2 *(left <0? 0:left>Maxleft?Maxleft:left)+'px'
        big.style.top= -2 * (top <0? 0:top>Maxtop?Maxtop:top)+'px'
 
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>