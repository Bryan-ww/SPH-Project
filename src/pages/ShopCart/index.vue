<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(sku, index) in cartInfoList"
          :key="sku.id"
        >
          <li class="cart-list-con1">
            <!-- 动态绑定复选框是否选中 -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="sku.isChecked == 1"
              @change="updateChecked(sku, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="sku.imgUrl" />
            <div class="item-msg">{{ sku.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ sku.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus', -1, sku)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="sku.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, sku)"
            />
            <a class="plus" @click="handler('add', 1, sku)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ sku.skuPrice * sku.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteShopCart(sku)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 全选狂保证数组长度>0 -->
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0"  @click="updateAllCartChecked($event)"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 按需引入
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  // 页面可能发多次请求，所以封装为一个method
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getCarList");
    },
    // 运用节流防止用户点击过快导致服务器响应不及时
    handler: throttle(async function (type, disNum, sku) {
      //type:为了区分这三个元素
      //disNum形参:+ 变化量 (1)-变化量 (-1)
      //cart哪个产品[身上有id] input最终的个数 (并不是变化量)
      switch (type) {
        // 减法
        case "minus":
          // 传给服务器变化的量,大于1正常减1，如果为1就保持不便，变化量为0
          disNum = sku.skuNum > 1 ? -1 : 0;
          break;
        // 加法
        case "add":
          disNum = 1;
          break;
        case "change":
          // 先判断输入的格式是否非法,如果带有字符串，变化值为0，返回元数据，如果变化值《1也就是可能变化负数或者0-0.9，也应该返回原数据
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            // 如果变化值至少大于1，可能包括小数，变化量等于小数取整减去原数据
            // /属于正常情况(小数:取整)，带给服务器变化的量 用户输入进来的 - 产品的起始个数
            disNum = parseInt(disNum) - sku.skuNum;
          }
      }
      // 派发action
      try {
        // 这里是代表修改数据成功
        await this.$store.dispatch("getShopcartInfo", {
          skuId: sku.skuId,
          skuNum: disNum,
        });
        // 修改数据成功后，再次发送请求
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 500),
    async deleteShopCart(sku) {
      try {
        await this.$store.dispatch("deleteShopCart", sku.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    async updateChecked(sku, event) {
      try {
        let isChecked = event.target.checked? '1' : '0'
        await this.$store.dispatch("updateChecked", {skuId:sku.skuId,isChecked});
        // e.target.checked为布尔值
        // console.log(e.target.checked);
        this.getData();
      } catch (error) {
      }
    },
    // 删除所有选中产品
    async deleteAllCheckCart(){
      //context:小仓库,commit[提交mutations修改state getters[计算属性]  dispatch[派发action] state[当前仓库数据]
       try {
        await this.$store.dispatch('deleteAllCheckCart')
        this.getData();
       } catch (error) {
        alert(error.message)
       }
    },
    // 修改全部产品的勾选状态
    async updateAllCartChecked(event){
      try {
        let isChecked = event.target.checked?'1' : '0'
        // 派发actions
        await this.$store.dispatch('updatedAllChecked',isChecked)
        // 重新发请求
        this.getData()
      } catch (error) {
        alert(error.message)
      }

    }
  },
  computed: {
    ...mapGetters(["cartInfo"]),

    cartInfoList() {
      // 数据没回来可能为空
      return this.cartInfo.cartInfoList||[];
    },
    // 计算总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        sum+=item.skuPrice * item.skuNum;
      });
      return sum;
    },
    // 判断复选框是否全选，通过every遍历,只要全部选了为真
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            cursor: pointer;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            cursor: pointer;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>