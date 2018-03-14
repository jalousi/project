<template>
  <div class="left-view">
    <div class="attendtion">
      <el-card class="box-card" :body-style="{'padding': '0 20px'}">
        <div slot="header" class="clearfix">
          <span class="title">推荐关注</span>
          <span class="arrows">
            <span class="arrow" @click="nextRecommends">
              <i class="el-icon-arrow-left"></i>
            </span>
            <span class="arrow" @click="preRecommends">
              <i class="el-icon-arrow-right"></i>
            </span>
          </span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">全部</el-button> -->
        </div>
        <div class="contents" v-loading="loadingAttentions">
          <div class="content" v-for="item of recommends">
            <a class="left" @click="() => $router.push({
                name: 'PersonCenterPage',
                query: {
                  user: JSON.stringify(item)
                }
              })"><img :src="item.avatar || require('../assets/unknown.png')" width="50" height="50" :alt="item.name" /></a>
            <dl class="right">
                <dt class="name">
                    <span>{{item.name}}</span>
                    <el-button @click="() => toggleAttention(item)">
                      <span v-show="!item.follower"><span class="add">+</span>关注</span>
                      <span v-show="item.follower">已关注</span>
                    </el-button>
                </dt>
                <dt class="info" :title="item.bio || '这个家伙很懒，什么也没有留下'">
                    {{item.bio || '这个家伙很懒，什么也没有留下'}}
                </dt>
            </dl>
            <div class="clear-both"></div>
          </div>
        </div>

        <!-- <div class="content">
          <a class="left" href="" target="_blank"><img src="../assets/people-2.png" width="50" height="50" alt="" /></a>
          <dl class="right">
              <dt class="name">
                  <span>比特头条</span>
                  <el-button><span class="add">+</span>关注</el-button>
              </dt>
              <dt class="info" title="知名财经博主 头条文章作者">
                  知名财经博主 头条文章作者
              </dt>
          </dl>
          <div class="clear-both"></div>
        </div>
        <div class="content">
          <a class="left" href="" target="_blank"><img src="../assets/people-2.png" width="50" height="50" alt="" /></a>
          <dl class="right">
              <dt class="name">
                  <span>优雅博士</span>
                  <el-button><span class="add">+</span>关注</el-button>
              </dt>
              <dt class="info" title="知名财经博主 头条文章作者">
                  湖南卫视主持人 代表作品
              </dt>
          </dl>
          <div class="clear-both"></div>
        </div>
        <div class="content">
          <a class="left" href="" target="_blank"><img src="../assets/people-3.png" width="50" height="50" alt="" /></a>
          <dl class="right">
              <dt class="name">
                  <span>晴霞</span>
                  <el-button><span class="add">+</span>关注</el-button>
              </dt>
              <dt class="info" title="知名财经博主 头条文章作者">
                  知名财经博主 头条文章作者
              </dt>
          </dl>
          <div class="clear-both"></div>
        </div> -->
      </el-card>
    </div>
    <!-- <div class="trade">
      <el-card class="box-card" :body-style="{'padding': '0 20px'}">
        <div slot="header" class="clearfix">
          <span class="title">交易动态</span>
          
        </div>
        <div class="content" v-for="trade of trades">
          <a class="left" @click="() => $router.push({
                name: 'PersonCenterPage',
                query: {
                  user: JSON.stringify(trade.user)
                }
              })"><img :src="trade.user.avatar || require('../assets/unknown.png')" width="50" height="50" alt="" /></a>
          <dl class="right">
              <dt class="name">
                  <span>{{trade.user.name}}</span>
              </dt>
              <dt class="info" :title="trade.message">
                  {{trade.message}}
              </dt>
          </dl>
          <div class="clear-both"></div>
        </div>
      </el-card>
    </div> -->
  </div>
</template>

<script>
import auth from '../auth'
export default {
  name: 'left-view',
  data () {
    return {
      loadingAttentions: false,
      recommends: [],
      offset: 1,
      auth: auth,
      trades: []
    }
  },
  methods: {
    getTrade () {
      this.$http.get('api/v2/trade/current', {
      })
        .then(res => {
          debugger;
          this.trades = res.data;
      })
        .catch(err => {
          
      });
    },
    toggleAttention (item) {
      if (!item.follower) {
        this.$http.put('api/v2/user/followings/' + item.id, {

        },{
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            item.follower = !item.follower
        })
          .catch(err => {
            // this.loadingAttentions = false;
        });
      } else {
        this.$http.delete('api/v2/user/followings/' + item.id, {
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            item.follower = !item.follower
        })
          .catch(err => {
            // this.loadingAttentions = false;
        });
      }
      
    },
    
    getRecommends (offset) {
      this.loadingAttentions = true;
      this.$http.get('api/v2/user/recommends', {
        params: {
          limit: 3,
          offset: this.offset
        },
        headers: auth.getAuthHeader()
      })
        .then(res => {
         //debugger;
          this.recommends = res.data;
          this.loadingAttentions = false;
      })
        .catch(err => {
          this.loadingAttentions = false;
      });
    },
    nextRecommends () {
      this.offset += 3;
      this.getRecommends();
    },
    preRecommends () {
      this.offset -= 3;
      this.getRecommends();
    }
  },
  mounted() {
    this.getRecommends();
    //this.getTrade();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-button:focus, .el-button:hover{
    box-shadow: 0px 0px 4px #dcdfe6;
    color:#333;
    border-color:#fff;
    background-color: #fff;
}
.el-input__inner:hover,.el-input__inner:focus{
  border-color:#dcdfe6;
}
    
  .attendtion .arrow {
    border: 1px solid #c7c7c7;
    border-radius: 4px;
    cursor: pointer;
  }
  .attendtion .arrow:hover {
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .attendtion .arrows {
    float: right;
  }
  .content:not(:last-child) {
    border-bottom: solid 1px #e6e6e6;
  }
  .content {
    padding: 18px 0;
  }
  .content .el-button {
    float: right;
    padding: 6px 10px;
  }
  .content a.left { 
    float:left;
  }
  .content img {
    border-radius: 50%;
  }
  .content>.right {
    margin:0 0 0 70px;
  }
  .content>.right .name{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
  }
    .content>.right .name>span{
      width:80px;
      height: 30px;
      text-overflow:ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
  }
  .content>.right .name .add{
    color: red;
    margin-right: 5px;
    font-weight: 600;
  }
  .content>.right .info{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #C5C7CA;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .left-view {
    
    margin-bottom: 20px;
  }
  .el-button--text {
    color: #C8C9CC;
  }

  .trade {
    margin-top: 10px;
  }

  .title {
    font-size: 16;
  }
  img {
    cursor: pointer;
  }
  
</style>
