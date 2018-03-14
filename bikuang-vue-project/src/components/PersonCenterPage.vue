<template>
  <div class="person-center">

    <div class="banner">
      <img src="../assets/person-banner.png"/>
    </div>

    <div class="container">
      <div class="info">
        <el-row :gutter="20">
          <el-col :span="2">
            <div class="num">{{user.extra.followings_count}}</div>
            <div class="label">关 注</div>
          </el-col>
          <el-col :span="2" :offset="4">
            <div class="num">{{user.extra.followers_count}}</div>
            <div class="label">粉 丝</div>
          </el-col>
          <el-col :span="3" :offset="7">
            <div class="num">{{user.extra.feeds_count}}</div>
            <div class="label">总发文数</div>
          </el-col>
          <el-col :span="3" :offset="3">
            <div class="num">{{user.extra.likes_count}}</div>
            <div class="label">总点赞数</div>
          </el-col>
        </el-row>
      </div>
      <div class="avatar">
        <img :src="user.avatar || require('../assets/unknown.png')"/>
      </div>
      <div class="name">
        {{user.name}}
      </div>
      <div class="bio">
        {{user.bio}}
      </div>
      <div class="attention" v-if="showAttention">
        <el-button @click="() => toggleAttention(payAttentioned)">
          <span v-show="!payAttentioned"><span class="add">+</span>关注</span>
          <span v-show="payAttentioned">已关注</span>
        </el-button>
      </div>
      
      <div class="comments" v-loading="feedsLoading">
        <div class="comment" :key="index" v-for="(feed, index) of feeds">
          <el-card class="box-card">
            <div class="content">
              <a class="left"><img :src="user.avatar || require('../assets/unknown.png')" width="50" height="50" alt="" /></a>
              <dl class="right">
                  <dt class="name">
                      <span class="nameText">{{feed.user.name}}</span>
                      <div class="publishTime" @mouseover="() => hover(index)" @mouseleave="() => leave(index)"> 
                        <span v-show="!feed.showDetail">{{feed.created_at}}</span>
                        <span @click="() => viewDetail(feed.id, feed.user)" v-show="feed.showDetail">查看详情</span>
                      </div>
                      
                  </dt>
                  <dt class="info">
                      {{feed.feed_content}}
                      <!-- <vueImages :imgs="images"
                            :showclosebutton="true"
                            :imagecountseparator="'/'"
                            :showcaption="false"
                            :showimagecount="true"
                            :showthumbnails="true">
                      </vueImages> -->
                      <!-- <div>
                        <vueImages :images="images"></vueImages>
                      </div> -->
                      <div>
                        <img width="140" height="140"v-for="image of feed.images" :src="$http.defaults.baseURL + 'api/v2/files/' +image.file"/>
                      </div>
                  </dt>
                  <!-- <dt class="follow">
                      <img src="../assets/people-1.png"/>
                      <img src="../assets/people-1.png"/>
                      <img src="../assets/people-1.png"/>
                      <img src="../assets/people-1.png"/>
                      <img src="../assets/people-1.png"/>
                      <img src="../assets/people-1.png"/>
                      共<span style="color:red">6</span>位跟随
                  </dt> -->
                  <dt class="icon">
                      <div :class="feed.likeClass" @click="() => toggleLike(feed)"></div><span class="like-number">{{feed.like_count}}</span>
                      <div @click="() => () => toggoleComment(feed)" class="chat"></div><span class="chat-number">{{feed.feed_comment_count}}</span>
                      <div :class="feed.collectClass" @click="() => toggleCollect(feed)"></div>
                  </dt>
              </dl>
              <div class="clear-both"></div>
            </div>
          </el-card>
        </div>
      </div>
      
    </div>

  </div>
</template>

<script>
import auth from '../auth'
export default {
  name: 'PersonCenterPage',
  data () {
    return {
      payAttentioned: false,
      feedsLoading: false,
      feeds: [],
      auth: auth,
      show: [],
      user: {extra: {}},
      showAttention: false
    }
  },
  created () {
    debugger;
    if(this.$router.currentRoute.query.id){
      this.user.id=JSON.parse(this.$router.currentRoute.query.id);
    }else{
      var user=JSON.parse(this.$router.currentRoute.query.user);
       this.user.id=user.id;
    }
 
    if (this.auth.user.uid != this.user.id) {
      this.showAttention = true;
      this.getUser();
    }
    
  },
  mounted() {
    this.getMyFeeds();
  },
  methods: {
    viewDetail (feedId, user) {
      this.$router.push({
        name: 'DetailFeedPage',
        query: {
          feedId: feedId,
          user: JSON.stringify(user)
        }
      });
    },
    toggleLike (feed) {
      if (!feed.has_like) {
        this.$http.post('api/v2/feeds/'+ feed.id + '/like', {
        }, {
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            feed.has_like = true;
            feed.like_count ++ ;
            feed.likeClass = 'is-liked';
        })
          .catch(err => {

        });
      } else {
        this.$http.delete('api/v2/feeds/'+ feed.id + '/unlike', {
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            feed.has_like = false;
            feed.like_count -- ;
            feed.likeClass = 'like';
        })
          .catch(err => {

        });
      }
      
    },
    toggleCollect (feed) {
      debugger;
      if ( !feed.has_collect ) {
        this.$http.post('api/v2/feeds/'+ feed.id + '/collections', {
        }, {
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            feed.collectClass = 'is-collected' 
            feed.has_collect = true;
        })
          .catch(err => {

        });
      } else {
        this.$http.delete('api/v2/feeds/'+ feed.id + '/uncollect', {
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            feed.collectClass = 'dispatch'
            feed.has_collect = false;
        })
          .catch(err => {

        });
      }
    },
    toggleAttention (payAttentioned) {
      if (!payAttentioned) {
        this.$http.put('api/v2/user/followings/' + this.user.id, {

        },{
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            this.payAttentioned = !this.payAttentioned
        })
          .catch(err => {
            // this.loadingAttentions = false;
        });
      } else {
        this.$http.delete('api/v2/user/followings/' + this.user.id, {
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            this.payAttentioned = !this.payAttentioned
        })
          .catch(err => {
            // this.loadingAttentions = false;
        });
      }
    },
    getUser () {
      this.$http.get('api/v2/users/' + this.user.id, {
        headers: auth.getAuthHeader()
      })
        .then(res => {
          debugger;
          this.payAttentioned = res.data.follower;
          this.user=res.data;               
          })
        .catch(err => {
          this.$message({
            message: '获取动态信息失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    hover: function(index) {
      this.feeds[index].showDetail = true;
    },
    leave: function(index) {
      this.feeds[index].showDetail = false;
    },
    getMyFeeds() {
      debugger;
      var that = this;
      that.feedsLoading = true;
      //var id = that.$router.currentRoute.query.user.id;
      var id=this.user.id;
      this.$http.get('api/v2/feeds', {
        params: {
          user: this.user.id,
          type: 'users'
        },
        headers: auth.getAuthHeader()
      })
        .then(res => {
          res.data.feeds.map((feed, index) => {
            feed.showDetail = false;
            feed.comments.show = false;
            if (feed.has_like) {
              feed.likeClass = 'is-liked';
            } else {
              feed.likeClass = 'like';
            }
            if (feed.has_collect) {
              feed.collectClass = 'is-collected';
            } else {
              feed.collectClass = 'dispatch';
            }
          });
          this.feeds = res.data.feeds;
          that.feedsLoading = false;
      })
        .catch(err => {
          debugger;
          this.$message({
            message: '获取动态信息失败！',
            type: 'error',
            duration: 1000
          });
      });
    }
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
  .person-center .banner img {
    width: 100%;
    height: 260px;
  }
  .person-center .container {
    width: 876px;
    text-align: center;
    margin: 0 auto;
    position: relative;
    transform: translateY(-70px);
  }
   .attention .add{
    color: red;
    margin-right: 5px;
    font-weight: 600;
  }
  .attention .el-button {
    padding: 6px 10px;
  }
  .person-center .container .info .label {
    font-size: 14px;
    color: white;
    margin-top: 5px;
  }
  .person-center .container .info .num {
    font-size: 24px;
    color: white;
  }
  .person-center .container .avatar {
    transform: translateY(-24px);
    margin-bottom: -24px;
  }
  .person-center .container .avatar img {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    border: 2px solid #fff;
  }
  .person-center .container .name {
    color: #2D2F33;
    font-weight: 600;
    margin-top: 10px;
  }
  .person-center .container .bio {
    margin-top: 10px;
    color: #878D99;
    font-size: 14px;
  }
  .person-center .container .attention {
    margin-top: 10px;
  }

  .person-center .container .comments {
    margin-top: 30px;
    width: 100%;
  }

  .person-center {
    width: 100%;
    margin: 0;
  }

  .comment {
    margin-top: 30px;
    text-align: left;
  }
  .person-center .content .right .nameText {
    font-weight: 600;
  }
  .person-center .content .right .publishTime {
    float: right;
    color: #838383;
    font-size: 12px;
    cursor: pointer;
  }
  .person-center .content .right .viewinfo {
    float: right;
    color: #838383;
    font-size: 12px;
  }
  .person-center .content .right .follow img {
    height: 25px;
    width: 25px;
    top: 7px;
    position: relative;
    border-radius: 50%;
  }
  
  .person-center .title{
    margin: 15px 0;
  }
  .person-center .title span {
    color: #999;
    font-size: 16px;
    cursor: pointer;
  }
  .person-center .title span:hover {
    color: #333 !important;
  }
  .person-center .title span.selected {
    color: #333 !important;
  }
  .person-center .new {
    padding-left: 10px;
    margin-right: 20px;
  }
  .el-dropdown {
    float: right;
  }
  .content {
    padding: 10px 0;
  }
  .content .el-button {
    float: right;
    padding: 6px 10px;
  }
  .content a.left { 
    float:left;
  }
  .content a.left img{ 
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
  .content>.right .name .add{
    color: red;
    margin-right: 5px;
    font-weight: 600;
  }
  .content>.right .info{
    margin-top: 5px;
    font-size: 14px;
    color: #838383;
    line-height: 1.67;
    white-space: normal;
  }
  .content>.right .follow{
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
    background-color: #F5F6F8;
    padding-left: 20px;
    font-size: 14px;
    color: #838383;
  }
  .content>.right .icon{
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
  }
  .content>.right .icon .like{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -120px no-repeat;
    cursor: pointer;
  }
  .content>.right .icon .is-liked{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -40px no-repeat;
    cursor: pointer;
  }
  .content>.right .icon .like-number{
    margin-right: 10px;
    font-size: 14px;
    color: #838383;
  }
  .content>.right .icon .chat{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -77px no-repeat;
    cursor: pointer;
  }
  .content>.right .icon .chat-number{
    margin-right: 10px;
    font-size: 14px;
    color: #C5C7CA;
  }
  .content>.right .icon .dispatch{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 5px no-repeat;
    cursor: pointer;
  }
  .content>.right .icon .is-collected{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -443px no-repeat;
  }
  .content>.right .icon .dispatch-number{
    font-size: 14px;
    color: #C5C7CA;
  }
</style>
