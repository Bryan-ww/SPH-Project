<template>
  <div class="pagination">
    <!-- disabled，无法点击 -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <!-- 动态绑定类名 -->
    <button v-if="startNumandendNum.start > 1" @click="$emit('getPageNo',1)" :class="{'active':pageNo==1}"> 1 </button>
    <button v-if="startNumandendNum.start>2">···</button>

    <!-- 中间连续页区域 V-for遍历实现，根据end的数字确认遍历多少次 -->
 
    <button v-for="(page,index) in startNumandendNum.end" :key="index" v-show="page>=startNumandendNum.start" @click="$emit('getPageNo',page)" :class="{'active':pageNo==page}"> {{page}}</button>
 


    <button v-if="startNumandendNum.end<totalPage-1">···</button>
    <button v-if="startNumandendNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{'active':pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)"> 下一页</button>
    
    <button style="margin-left: 30px">共 {{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:["pageNo","pageSize", "total","continues"],
    computed:{
        // 计算出一共多少页
        totalPage(){   
            // 向上取整
          return Math.ceil(this.total/this.pageSize)
        },
        // 计算出连续分页的起始数据和结束数据
        startNumandendNum(){
          const {pageNo,continues,totalPage} = this
            let start= 0;
            let end = 0;
            // 不正常页数，总页数不够连续页码数
            if(continues > totalPage){
                start = 1;
                end = totalPage;
            } else {
                start = pageNo - parseInt(continues/2)
                end = pageNo + parseInt(continues/2)
                //  出现不正常的情况：start为负数或者o,需要纠正
                if(start < 1) {
                    start = 1;
                    end = continues;
                };
                // end出现的不正常情况:比如是最后一页时
                if(end >totalPage){
                    end = totalPage;
                    start = end - continues + 1;
                } 
            };
            return {start,end}  
        }

    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>