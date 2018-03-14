<template>
  <div class="detail-feed">
    <el-row>
        <el-col :span="17">
          <el-card>
            <div class="feed">
              <el-row>
                <el-col :span="3">
                  <div class="avatar">
                    <img :src="feed.user.avatar || require('../assets/unknown.png')" />
                  </div>
                </el-col>
                <el-col class="right" :span="21">
                  <div class="name">
                    <span>{{feed.user.name}}</span>
                  </div>
                  <div class="time">
                    <span>{{feed.created_at}}</span>
                  </div>
                  <div class="content">
                    <div class="images">
                      <img width="140" height="140"v-for="image of feed.images" :src="$http.defaults.baseURL + 'api/v2/files/' +image.file"/>
                    </div>
                    <div class="info">
                      <p>
                        {{feed.feed_content}}
                      </p>
                    </div>
                  </div>
              <!--     <div class="icons">
                    <Icon name="thumbs-o-up" scale="1.4"/>
                    <span class="num">{{feed.like_count}}</span>
                    <Icon name="commenting-o" scale="1.4"/>
                    <span class="num">{{feed.feed_comment_count}}</span>
                    <Icon name="star-o" scale="1.4"/>
                    <span class="num">0</span>
                  </div> -->
                      <div class="icon">
                      <div :class="feed.likeClass" class="like"></div><span class="like-number">{{feed.like_count}}</span>
                      <div class="chat"></div><span class="chat-number">{{feed.feed_comment_count}}</span>
                      <div :class="feed.collectClass" class="dispatch"></div><!-- <span class="dispatch-number">{{(feed.has_collect && feed.collection) || 0}}</span> -->
                      <!-- <div class="icons">
                        <Icon name="thumbs-o-up" scale="1.4"/>
                        <span class="num">{{feed.like_count}}</span>
                        <Icon name="commenting-o" scale="1.4"/>
                        <span class="num">{{feed.feed_comment_count}}</span>
                        <Icon name="star-o" scale="1.4"/>
                        <span class="num">0</span>
                      </div> -->
                  </div>
                  <div class="pay">
                    <el-button @click="() => setRewards()" type="danger">打赏</el-button>
                  </div>
                  <div class="payDetail">
                    <span>
                      共<span class="paynum">{{feed.reward.count}}</span>次打赏
                    </span>
                  </div>
                  <div class="push-comment">
                    <el-input
                      @input="() => commentChanged()"
                      :maxlength = "255"
                      class="comment-input"
                      type="textarea"
                      :autosize="{ minRows: 3}"
                      placeholder="说点什么吧"
                      v-model="comment">
                    </el-input>
                  </div>
                  <div class="publish-comment">
                    可输入<span style="color: #409EFF">{{commentNum}}</span>字 <el-button @click="() => publishComment()" type="danger">评论</el-button>
                  </div>
                  <div class="comment-summary">
                    共<span style="color: #F56C6C; font-size: 20px;"> {{feed.feed_comment_count}} </span>条评论
                  </div>
                  <div class="comment-infos">
                    <div class="comment-info" v-for="comment of comments">
                      <el-row>
                        <el-col :span="3">
                          <div class="avatar">
                            <img :src="comment.user.avatar || require('../assets/unknown.png')" />
                          </div>
                        </el-col>
                        <el-col :span="21">
                          <div class="name">
                            <span>{{comment.user.name}}</span>
                          </div>
                          <div class="time">
                            <span>{{comment.updated_at}}</span>
                          </div>
                          <div class="content">
                            <div class="info">
                              <div>
                                {{comment.body}}
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card class="rightArea" :body-style="{padding: '0'}">
            <div class="banner">
              <img src="../assets/small-banner.jpg" />
            </div>
            <div class="avatar">
              <img :src="feed.user.avatar || require('../assets/unknown.png')" />
            </div>
            <div class="name">
              {{feed.user.name}}
            </div>
            <div class="bio">
              {{feed.user.bio || "这个大佬有点懒，还没有更新"}}
            </div>
            <div class="attention" v-if="showAttention">
              <el-button @click="() => toggleAttention(payAttentioned)">
                <span v-show="!payAttentioned"><span class="add">+</span>关注</span>
                <span v-show="payAttentioned">已关注</span>
              </el-button>
            </div>
            <div class="article-head">
              <span class="article-text">最近文章</span>
            </div>
            <div class="article-list">
              <div class="article" v-for="article of articles"  >
                <el-row>
                  <el-col :span="1">
                    <Icon name="caret-right" style="color: #E4E7ED" />
                  </el-col>
                  <el-col :span="23">
                    <div class="article-title" @click="() => viewDetail(article.id, article.user)">{{article.feed_content}}</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import auth from '../auth'
import 'vue-awesome/icons/caret-right'
import 'vue-awesome/icons/thumbs-o-up'
import 'vue-awesome/icons/star-o'
import 'vue-awesome/icons/commenting-o'
import 'vue-awesome/icons/thumbs-up'
import 'vue-awesome/icons/star'
import 'vue-awesome/icons/commenting'
import Icon from 'vue-awesome/components/Icon'
export default {
  name: 'DetailFeedPage',
  components: {
    Icon
  },
  methods: {
     viewDetail (feedId, user) {
      this.getFeed(feedId)
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
          })
        .catch(err => {
          this.$message({
            message: '获取动态信息失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    publishComment () {
      this.$http.post('api/v2/feeds/' + this.feed.id +'/comments', {
        body: this.comment
      }, {
        headers: auth.getAuthHeader()
      })
        .then(res => {
          this.$message({
            message: '发布评论成功！',
            type: 'success',
            duration: 1000
          });
          this.getComment(this.$router.currentRoute.query.feedId);
          
      })
        .catch(err => {
          this.$message({
            message: '发布评论失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    commentChanged() {
      this.commentNum = 255 - this.comment.length;
    },
    getFeed (feedId) {
      this.$http.get('api/v2/feeds/' + feedId)
        .then(res => {
          debugger;
          this.feed = {...this.feed, ...res.data};
      })
        .catch(err => {
          this.$message({
            message: '获取动态详情失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    getComment (feedId) {
      this.$http.get('api/v2/feeds/' + feedId +'/comments')
        .then(res => {
          debugger;
          this.comments = res.data.comments;
      })
        .catch(err => {
          this.$message({
            message: '获取用户评论失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    getArticle () {
      this.$http.get('api/v2/feeds', {
        params: {
          type: 'users',
          user: this.feed.user.id
        }
      })
        .then(res => {
          debugger;
          this.articles = res.data.feeds;
          
      })
        .catch(err => {
          this.$message({
            message: '获取用户最近文章失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    // viewDetail (feedId, user) {
    //   debugger;
    //   this.$router.refresh({
    //     name: 'DetailFeedPage',
    //     query: {
    //       feedId: feedId,
    //       user: JSON.stringify(user)
    //     }
    //   });
    // },
    setRewards () {
      this.$http.post('api/v2/user/' + this.feed.user.id +'/rewards', {
        amount: 10
      }, {
        headers: auth.getAuthHeader()
      })
        .then(res => {
          debugger;
          
      })
        .catch(err => {
          this.$message({
            message: '获取动态详情失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
  },
  created() {
    var feedId = this.$router.currentRoute.query.feedId;
    this.feed.user = this.user = JSON.parse(this.$router.currentRoute.query.user);
    if (this.auth.user.uid != this.user.id) {
      this.showAttention = true;
      this.getUser();
    }
    this.getFeed(feedId);
    this.getComment(feedId);
    this.getArticle();    
  },
  data () {
    return {
      auth: auth,
      feed: {},
      comment: '',
      payAttentioned: false,
      commentNum: 255,
      comments: [],
      articles: [],
      showAttention: false,
      payAttentioned: false,
      user: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .feed .icon{
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
  }
  .feed .icon .like{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -120px no-repeat;
    cursor: pointer;
  }
  .feed .icon .is-liked{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -40px no-repeat;
    cursor: pointer;
  }
  .feed .icon>div{
    cursor: pointer;
  }
  .feed .icon .like-number{
    margin-right: 10px;
    font-size: 14px;
    color: #C5C7CA;
  }
  .feed .icon .chat{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -77px no-repeat;
  }
  .feed .icon .chat-number{
    margin-right: 10px;
    font-size: 14px;
    color: #C5C7CA;
  }
  .feed .icon .dispatch{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 5px no-repeat;
  }
  .feed .icon .is-collected{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -443px no-repeat;
  }
  .feed .avatar img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  .rightArea .article {
    margin-bottom: 10px;
  }
  .rightArea .article-list {
    text-align: left;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 14px;
    color: #909399;
  }
  .rightArea .article-title {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    cursor: pointer;
  }
  .rightArea .attention {
    padding-bottom: 30px;
    border-bottom: 1px dashed #efefef;
  }
  .rightArea .article-head {
    text-align: left;
    margin: 30px 0 20px 15px;
    padding-left: 5px;
    border-left: 3px solid #409EFF;
    font-size: 16px;
  }
  .rightArea {
    margin-left: 20px;
    width:300px;
    text-align: center;
  }
  .rightArea .avatar {
    text-align: center;
  }
  .rightArea .avatar img {
    height: 72px;
    width: 72px;
    border-radius: 50%;
    margin-top: -36px;
  }
  .rightArea .banner img {
    height: 112px;
    width: 300px;
  }
  .rightArea .bio {
    text-align: center;
    color: #909399;
    padding: 0 20px;
  }
  .rightArea .name {
    color: #303133;
    margin: 10px 0;
  }
  .rightArea .attention {
    margin-top: 30px;
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
    padding-right: 56px;
    transform: translateX(-12px);
  }
  .feed .name {
    color: #303133;
    font-weight: 600;
  }
  .feed .time {
    margin-top: 10px;
    color: #909399;
  }
  .feed .content {
    margin-top: 20px;
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
  .feed .pay{
    text-align: center;
    margin-top: 50px;
  }
  .feed .payDetail{
    margin-top: 15px;
    text-align: center;
    font-size: 12px;
    color: #909399;
  }
  .feed .payDetail .paynum{
    color: #F56C6C;
    margin-bottom: 40px;
  }
  .feed .publish-comment {
    text-align: right;
    margin-top: 20px;
  }
  .feed .comment-info {
    margin-top: 40px;
    padding-bottom: 40px;
  }
  .feed .comment-info:not(:last-child) {
    border-bottom: 1px solid #DCDFE6;
  }
  .feed .publish-comment .el-button {
    margin-left: 10px;
  }
</style>
<style>
  .feed .comment-input .el-textarea__inner{
    background-color: #EBEEF5 !important;
  }
</style>