<template>
  <div class="opnion-view">
    <el-card class="person-opnion-card" :body-style="{padding: '0'}">
      <el-menu :default-active="'1'" mode="horizontal" >
        <el-menu-item index="1">我的观点</el-menu-item>
      </el-menu>
    </el-card>
    <div class="comments" v-loading="feedsLoading">
      <div class="comment" :key="index" v-for="(feed, index) of feeds">
        <el-card class="box-card">
          <div class="content">
            <a class="left" href="" target="_blank"><img :src="auth.user.avatar || require('../assets/unknown.png')" width="50" height="50" alt="" /></a>
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
                    <div :class="feed.likeClass" @click="toggleLike(feed)"></div><span class="like-number">{{feed.like_count}}</span>
                      <div @click="() => toggoleComment(feed)" class="chat"></div><span class="chat-number">{{feed.feed_comment_count}}</span>
                      <div :class="feed.collectClass" @click="toggleCollect(feed)"></div><!-- <span class="dispatch-number">{{(feed.has_collect && feed.collection) || 0}}</span> -->
                </dt>
            </dl>
            <div class="clear-both"></div>
          </div>
        </el-card>
        <div class="feedList" v-show="feed.comments.show">
            <div class="feed" v-for="comment of feed.comments">
              <el-row>
                <el-col :span="3">
                  <div class="avatar">
                    <img :src="comment.user.avatar || require('../assets/unknown.png')" />
                  </div>
                </el-col>
                <el-col class="right" :span="21">
                  <div class="name">
                    <span>{{comment.user.name}}</span>
                    <span class="time">{{comment.created_at}}</span>
                  </div>
                  <!-- <div class="time">
                    <span>{{comment.created_at}}</span>
                  </div> -->
                  <div class="content">
                    <div class="info">
                      <p>
                        {{comment.body}}
                      </p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  name: 'PersonOpnionView',
  mounted() {
    this.getMyFeeds();
  },
  methods: {
    toggleLike (feed) {
      if (!feed.has_like) {
        this.$http.post('api/v2/feeds/'+ feed.id + '/like', {
        }, {
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            feed.likeClass = 'is-liked';
            feed.has_like = true;
            feed.like_count ++ ;
        })
          .catch(err => {

        });
      } else {
        this.$http.delete('api/v2/feeds/'+ feed.id + '/unlike', {
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            feed.likeClass = 'like';
            feed.has_like = false;
            feed.like_count -- ;
        })
          .catch(err => {

        });
      }
      
    },
    toggleCollect (feed) {
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
    hover: function(index) {
      this.feeds[index].showDetail = true;
    },
    leave: function(index) {
      this.feeds[index].showDetail = false;
    },
    toggoleComment (feed) {
      if (feed.comments.show == false ) {
        feed.comments.show = true;
      } else {
        feed.comments.show = false;
      }
      this.$forceUpdate();
    },
    viewDetail (feedId, user) {
      this.$router.push({
        name: 'DetailFeedPage',
        query: {
          feedId: feedId,
          user: JSON.stringify(user)
        }
      });
    },
    getMyFeeds() {
      var that = this;
      that.feedsLoading = true;
      this.$http.get('api/v2/feeds', {
        params: {
          type: 'users'
        },
        headers: this.auth.getAuthHeader()
      })
        .then(res => {
          res.data.feeds.map((feed, index) => {
            that.images[index] = [];
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
  },
  data () {
    return {
      feedsLoading: false,
      feeds: [],
      isNew: true,
      myFeed: '',
      dialogVisible: false,
      dialogImageUrl: '',
      uploadedImage: [],
      images: [],
      uploadFileList: [],
      uploadShow: false,
      auth: auth,
      show: [],
      addLike: true,
      addCollect: true,
      showComment: []

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    cursor: pointer;
  }
  .feed .comment-summary {
    margin-top: 20px;
    padding-bottom: 15px;
    border-bottom: solid 1px #DCDFE6;
  }
  .feed .push-comment {
    margin-top: 40px;
  }
  .feed .right {
    padding-left: 5px;
  }
  .feed .name {
    color: #303133;
    font-weight: 600;
  }
  .feed .time {
    float: right;
    color: #909399;
    font-size: 14px;
    font-weight: 200;
  }
  .feed .info {
    margin-top: 20px;
  }
  .feed .icons {
    color: #909399;
    margin-top: 50px;
  }
  .feed .icons .num{
    font-size: 12px;
    margin-right: 20px;
  }

  .feed .avatar img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  .feed {
    padding-right: 20px;
  }
  .feed .el-row {
    margin-left: 20px;
  }
  .feed {
    margin-top: 30px;
  }
  .feed:not(:last-child) {
    border-bottom: 1px solid #DCDFE6;
  }
  .opnion-view .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #FA5555;
    padding: 0;
    margin-left: 40px;
  }
  .comment {
    margin-top: 20px;
  }
  .opnion-view .content .right .nameText {
    font-weight: 600;
  }
  .opnion-view .content .right .publishTime {
    float: right;
    color: #838383;
    font-size: 12px;
    cursor: pointer;
  }
  .opnion-view .content .right .viewinfo {
    float: right;
    color: #838383;
    font-size: 12px;
  }
  .opnion-view .content .right .follow img {
    height: 25px;
    width: 25px;
    top: 7px;
    position: relative;
    border-radius: 50%;
  }
  .main-view {
    padding: 0 20px;
  }
  .opnion-view .title{
    margin: 15px 0;
  }
  .opnion-view .title span {
    color: #999;
    font-size: 16px;
    cursor: pointer;
  }
  .opnion-view .title span:hover {
    color: #333 !important;
  }
  .opnion-view .title span.selected {
    color: #333 !important;
  }
  .opnion-view .new {
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
  .content>.right .icon>div{
    cursor: pointer;
  }
  .content>.right .icon .like-number{
    margin-right: 10px;
    font-size: 14px;
    color: #C5C7CA;
  }
  .content>.right .icon .chat{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -77px no-repeat;
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
  }
  .content>.right .icon .dispatch-number{
    font-size: 14px;
    color: #C5C7CA;
  }
  .content>.right .icon .is-liked{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -40px no-repeat;
    cursor: pointer;
  }
  .content>.right .icon .is-collected{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -443px no-repeat;
  }
  .main-view {
    margin-bottom: 20px;
  }

</style>
