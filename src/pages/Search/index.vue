<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性面包屑：这是个数组，不能再用v-if了，要用v-for遍历 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[2] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 绑定了自定义事件，实现子父通信 -->
        <SearchSelector
          @getTrademark="getTrademark"
          @getAttrInfo="getAttrInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(true)">
                  <a
                    >综合<span
                      v-show="isOne"
                      :class="[
                        'iconfont',
                        { 'icon-up': isAsc, 'icon-down': isDesc },
                      ]"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(false)">
                  <a
                    >价格<span
                      v-show="isTwo"
                      :class="[
                        'iconfont',
                        { 'icon-up': isAsc, 'icon-down': isDesc },
                      ]"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 点击图片进行路由跳转到详情页，注意跳转的时候需要穿参数，传入商品ID（params）参数 -->
                    <router-link :to="`/detail/${good.id}`"
                      ><img :src="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        // 带给服务器的参数
        // 1级iD
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名称
        categoryName: "",
        // 搜索关键字
        keyword: "",
        // 排序方式:默认综合
        order: "1:desc",
        // 页码默认为1
        pageNo: 1,
        // 每页数量
        pageSize: 3,
        // 商品属性的数组
        props: [],
        // 品牌:
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  // /在发请求之前，把接口需要传递参数，进行整理(在给服务器发请求之前，把参数熬理好，服务器就会返回查询的数据)
  beforeMount() {
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
    // console.log(this.searchParams);
  },
  // search页面不止发一次请求，这里组件挂载完毕发请求，只能发送一次,封装为函数后调用一次
  mounted() {
    // 在发请求前让参数发生变化并带给服务
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf(1) !== -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf(2) !== -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") !== -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
    // 拿到厂库中的总数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    // 将search发送请求封装为一个函数，根据参数的不同发送不同的请求
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeCategoryName() {
      // 当点击清除时应该需要让分类名和分类id清空，只显示默认数据
      //把带给服务器的参数置空了，还需要向服务器发请求
      //带给服务器参数说明可有可无的: 如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是你把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 清空后在此发送请求
      this.getData();
      // 去除参数后，地址栏需要清空参数，可以直接进行路由跳转
      //地址栏也需要需改: 进行路由跳转(现在的路由跳转只是跳转到自己这里)
      //严谨: 本意是删除query，如果路径当中山现params不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      // 清空后在此发送请求
      this.getData();
      // 然后清除header组件input keyword值，兄弟组件通信可以用全局时间总线或者订阅发布
      this.$bus.$emit("clear");
      // 重新跳转路由，需要删除params参数
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    getTrademark(trademark) {
      //1:整理品牌字段的参数 “ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 发送请求数据进行展示
      this.getData();
    },
    removeTrademark() {
      this.searchParams.trademark = undefined;
      // 清空后在此发送请求
      this.getData();
    },
    // 自定义事件
    getAttrInfo(attr, attrValue) {
      // console.log(attr,attrValue );
      // 整理参数 //[”属性ID:属性值:属性名"]
      let props = ` ${attr.attrId}:${attr.attrName}:${attrValue}`;
      // 这里需要数组去重,因为有重复的元素,需要判断
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
      }
      // 发送请求
      this.getData();
    },
    removeAttr(index) {
      // 整理参数
      this.searchParams.props.splice(index, 1);
      // 发送请求
      this.getData();
    },
    changeOrder(flag) {
      let orginOrder = this.searchParams.order;
      let originFlag = orginOrder.split(":")[0];
      let originSort = orginOrder.split(":")[1];
      let nextFlag = flag ? 1 : 2;
      let nextSort = "desc";
      if (nextFlag == originFlag) {
        nextSort = originSort == "desc" ? "asc" : "desc";
      }
      this.searchParams.order = `${nextFlag}:${nextSort}`;
      // 再次发请求
      this.getData();
    },
    // 绑定自定义事件
    getPageNo(pageNo) {
      //  整理参数
      this.searchParams.pageNo = pageNo;
      // 再发请求
      this.getData();
    },
  },
  //数据监听: 监听组件实例身上的属性的属性值变化
  watch: {
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newVal, oldVal) {
      //再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      //  整理完参数后再次发送请求
      // console.log(this.searchParams);
      this.getData();
      //每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3id
      //分类名字与关键字不用清理: 因为每一次路由发生变化的时候，都会给他赋予新的数据
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
.active {
  background: skyblue;
}
</style>