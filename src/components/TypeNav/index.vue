><template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- <div @mouseleave="leaveIndex" @mouseover="handleMouseOver"> -->
      <div @mouseleave="leaveIndex" @mouseenter="entershow">
        <h2 class="all">全部商品 分类</h2>
        <!-- 动画过度包裹transition -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- <h3 :index="index" > -->
                  <!-- 给所有的a标签添加自定义属性，来区分所有的a标签 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// // 这里是引入lodash的全部方法
// import _ from 'lodash'
// 按需引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  // 存储用户鼠标的index位置
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  // 当组件挂载完毕，可以向服务器发送请求
  mounted() {
    // 组件挂载完毕,当组件为search时，让 show的属性变为false,
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    // ...mapState({categoryList: (state)=>{
    //   return state.home.categoryList
    //   }
    // })
    ...mapState({categoryList:(state)=>state.home.categoryList}),
  },
  methods: {
    // changeIndex(index) {
    //   this.currentIndex = index;
    //   console.log('进入了',index);
    // },
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    leaveIndex() {
      this.currentIndex = -1;
      // 当组件是search才会执行
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // handleMouseOver(e){
    //   if(e.target.nodeName === 'H3'){
    //      this.currentIndex = +e.target.getAttribute("index")
    //   }else if(e.target.nodeName === 'H2'){
    //      this.currentIndex = 0
    //   }
    // }
    entershow() {
      this.show = true;
    },
    goSearch(event) {
      //最好的解决方案:编程式导航 + 事件委派
      //存在一些问题:事件委派，是把全部的子节点[h3、dt、d1、em] 的事件委派给父亲节点
      //点击a标签的时候，才会进行路由跳转[怎么能确定点击的一定是a标签]
      //存在另外一个问题: 即使你能确定点击的是a标签， 如何区分是一级、二级、三级分类的标签。
      //第一个问题:把子节点当中a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
      //获取到当前出发这个事件的节点[h3、a、dt、d1] ，需要带有data-categoryname这样节点[一定是a标签]
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let node = event.target;
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      if (categoryname) {
        // 整理路由的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 整理完参数
        if (this.$route.params){
          location.params=this.$route.params
          location.query = query;
        // 路由跳转
          this.$router.push(location);
        }
        

      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              // display: block;
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过度动画进入状态
    .sort-enter{
       height: 0px;
    }
    过度动画结束状态
    .sort-leave{
      height: 461px;
    }
    // 定义动画的时间速率
    .sort-enter-active{
      transition: all 0.5s linear;
    }
  }
}
</style>