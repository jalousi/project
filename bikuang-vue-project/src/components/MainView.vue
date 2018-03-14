<template>
  <div class="main-view">
    <!-- <div class="banner">
      <img src="../assets/banner.png" width="100%">
    </div> -->
    <div class="main">
      <div class="myfeed" v-if="auth.getAuthenticatd()">
        
        <el-card class="box-card">
          <div class="content">
            <a class="left" href="" target="_blank"><img :src="(auth.user && auth.user.avatar) || require('../assets/unknown.png')" width="50" height="50" :alt="auth.user.name" /></a>
            <dl class="right">
                <dt class="info">
                    <el-input
                      :maxlength = "255"
                      type="textarea"
                      :autosize="{ minRows: 2}"
                      placeholder="说说你的观点吧......"
                      v-model="myFeed">
                    </el-input>
                    <div class="arrow" />
                </dt>
                <dt class="publish">
                    <span class="picture" @click="triggerUpload">
                      <i class="el-icon-picture" >
                        <span>图片</span>
                      </i>
                    </span>
                    
                    <el-button type="danger" @click="publishFeed">
                      发布
                    </el-button>
                </dt>
                <dt class="uploadimg" v-show="uploadShow">
                    <el-upload
                      :limit="9"
                      :on-exceed="beyondLimitPics"
                      :action="$http.defaults.baseURL + 'api/v2/files'"
                      :headers = "auth.getAuthHeader()"
                      list-type="picture-card"
                      :multiple = "true"
                      :on-preview="handlePictureCardPreview"
                      :on-success="uploadSuccess"
                      :on-remove = "removeUpload"
                      :before-upload="checkfile"
                      :file-list="uploadFileList">
                      <i class="el-icon-plus" ref="addFile"></i>
                    </el-upload>
                    <el-dialog width="30%" :visible.sync="dialogVisible" size="tiny">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </dt>
            </dl>
            <div class="clear-both"></div>
          </div>
        </el-card>
        
      </div>
      <div class="title">
        <span class="new" :class="{'selected': isNew}" @click="getFeeds(true)">
          最新观点
        </span>
        <span class="popular" :class="{'selected': !isNew}" @click="getFeeds(false)">
          最受欢迎
        </span>
        <!-- <el-dropdown>
          <span class="el-dropdown-link">
            全部分类<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>最新观点</el-dropdown-item>
            <el-dropdown-item>最受欢迎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </div>
      <div class="comments" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
        <div  class="comment" :key="index" v-for="(feed, index) of feeds">
          <el-card class="box-card" :body-style="{padding: '10px 20px 0 20px'}">
            <div class="content">
              <a class="left"><img @click="() => $router.push({
                name: 'PersonCenterPage',
                query: {
                  user: JSON.stringify(feed.user)
                }
              })" :src="(feed.user && feed.user.avatar) || require('../assets/unknown.png')" width="50" height="50" alt="" /></a>
              <dl class="right">
                  <dt class="name">
                      <span class="nameText">{{feed.user.name}}</span>
                      <div class="publishTime" @mouseover="() => hover(index)" @mouseleave="() => leave(index)"> 
                        <span v-show="!feed.showDetail">{{feed.created_at}}</span>
                        <span @click="() => viewDetail(feed.id, feed.user)" v-show="feed.showDetail">查看详情</span>
                      </div>
                      
                  </dt>
                  <dt class="info">
                      <p class="text"  @click="() => viewDetail(feed.id, feed.user)" >
                        {{feed.feed_content}}
                      </p>
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
                        <img style="margin:4px 4px 0 0;"width="140" height="140"v-for="image of feed.images" :src="$http.defaults.baseURL + 'api/v2/files/' +image.file"/>
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
                      <div @click="() => toggoleComment(feed)" class="chat"></div><span class="chat-number">{{feed.feed_comment_count}}</span>
                      <div :class="feed.collectClass" @click="() => toggleCollect(feed)"></div><!-- <span class="dispatch-number">{{(feed.has_collect && feed.collection) || 0}}</span> -->
                      <!-- <div class="icons">
                        <Icon name="thumbs-o-up" scale="1.4"/>
                        <span class="num">{{feed.like_count}}</span>
                        <Icon name="commenting-o" scale="1.4"/>
                        <span class="num">{{feed.feed_comment_count}}</span>
                        <Icon name="star-o" scale="1.4"/>
                        <span class="num">0</span>
                      </div> -->
                  </dt>
              </dl>
              <div class="clear-both"></div>
            </div>
          </el-card>
          <div class="feedList" v-show="feed.comments.show">
            <div class="feed" v-for="(comment,index) of feed.comments" v-show="index<3">
              <el-row>
                <el-col :span="3">
                  <div class="avatar">
                    <img :src="(comment.user && comment.user.avatar) || require('../assets/unknown.png')" />
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
                        {{comment.body}}            
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-card class="box-card myfeed">
              <div class="content">
                <a class="left" href="" target="_blank"><img :src="(auth.user && auth.user.avatar) || require('../assets/unknown.png')" width="50" height="50" :alt="auth.user.name" /></a>
                <dl class="right">
                    <dt class="info">
                        <el-input
                          :maxlength = "255"
                          type="textarea"
                          :autosize="{ minRows: 2}"
                          placeholder="说点什么吧"
                          v-model="feed.userComment">
                        </el-input>
                        <div class="arrow" />
                    </dt>
                    <dt class="publish">   
                        <el-button type="danger" @click="() => publishComment(feed)">
                          评论
                        </el-button>
                    </dt>
                </dl>
                <div class="clear-both"></div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div class="loading" v-loading="feedsLoading"></div>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
import vueImages from 'vue-images'
import 'vue-awesome/icons/caret-right'
import 'vue-awesome/icons/thumbs-o-up'
import 'vue-awesome/icons/star-o'
import 'vue-awesome/icons/commenting-o'
import 'vue-awesome/icons/thumbs-up'
import 'vue-awesome/icons/star'
import 'vue-awesome/icons/commenting'
import Icon from 'vue-awesome/components/Icon'
export default {
  name: 'main-view',
  components: {
    Icon
  },
  data () {
    return {
      feedsLoading: false,
      feeds: [],
      loading:false,
      isNew: true,
      myFeed: '',
      dialogVisible: false,
      dialogImageUrl: '',
      uploadedImage: [],
      images: [],
      uploadFileList: [],
      uploadShow: false,
      auth: auth,
      lastId: 0
    }
  },
  components: {
    vueImages: vueImages
  },
  methods: {
    loadMore () {
      this.getFeeds(this.isNew, null, true);
    },
    beyondLimitPics (files, fileList) {
      this.uploadShow = false;
      this.$message({
        message: '最多上传9张图片',
        type: 'error',
        duration: 2000
      });
    },
    publishComment (feed) {
      this.$http.post('api/v2/feeds/' + feed.id +'/comments', {
        body: feed.userComment
      }, {
        headers: auth.getAuthHeader()
      })
        .then(res => {
          this.$message({
            message: '发布评论成功！',
            type: 'success',
            duration: 1000
          });
          feed.userComment = '';
          feed.feed_comment_count ++;
          this.$http.get('api/v2/feeds/' + feed.id +'/comments')
            .then(res => {
              feed.comments = res.data.comments;
              feed.comments.show = true;
          })
            .catch(err => {
              this.$message({
                message: '获取用户评论失败！',
                type: 'error',
                duration: 1000
              });
          });
          // this.getComment(this.$router.currentRoute.query.feedId);
          
      })
        .catch(err => {
          this.$message({
            message: '发布评论失败！',
            type: 'error',
            duration: 1000
          });
      });
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
     // debugger;
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
    getFeeds: function(isNew, search, offset) {
      this.isNew = isNew;
      this.feedsLoading = true;
       this.loading=true; 
      var that = this;
     // debugger;
      var params = {
        // offset: offset || 10,
        limit: 10,
        type: this.isNew ? 'new' : 'hot',
      };
      if (search) {
        params['search'] = search;
      }
      if (typeof offset != 'undefined') {
        params['after'] = this.lastId;
      }
      if (this.lastId <= 0 && offset) {
        return;
      }
      this.$http.get('api/v2/feeds', {
        params: params,
        headers: auth.getAuthHeader(),
      })
        .then(res => {
          res.data.feeds.map((feed, index) => {
            that.images[index] = [];
            feed.showDetail = false;
            feed.comments.show = false;
            feed.userComment = '';
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
          if ( offset ) {
            this.feeds =[...this.feeds, ...res.data.feeds];
          } else {
            this.feeds = res.data.feeds;
          }
          that.$nextTick(function(){
          that.feedsLoading = false;
          this.loading=false;
           if(!res.data.feeds.length){
                        that.loading=true;
                        return; }   
                    else{
                     this.lastId = this.feeds[this.feeds.length - 1].id;
                    }
          
            })
         
      })
        .catch(err => {
          that.feedsLoading = false;
      });
    },
    checkfile: function(file) {
      const isJPEG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isGIF = file.type === 'image/gif';
      const isJPG = file.type === 'image/jpg';
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!( isJPEG || isPNG || isGIF || isJPG )) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF/JPEG 格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!');
      }
      return ( isJPEG || isPNG || isGIF || isJPG ) && isLt1M;
    },
    handlePictureCardPreview: function(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    triggerUpload: function() {
      this.uploadShow = true;
      this.$refs.addFile.click();
    },
    uploadSuccess: function(response, file, fileList) {
      this.uploadedImage.push({id: response.id});
      // debugger;
      // this.images.push({imageUrl: file.url});
    },
    publishFeed: function() {
      this.$http.post('api/v2/feeds', {
        feed_content: this.myFeed,
        feed_from: 1,
        feed_mark: this.auth.user.uid + new Date().getTime(),
        images: this.uploadedImage
      }, {
        headers: this.auth.getAuthHeader()
      })
        .then(res => {
          this.myFeed = '';
          this.uploadShow = false;
          this.uploadedImage = [];
          this.uploadFileList = [];
          this.getFeeds(this.isNew);
      })
        .catch(err => {

      });
    },
    listenSearchFeeds () {
      this.eventBus.$on('searchFeeds', (search) => {
        this.getFeeds(this.isNew, search);
      })
    },
    removeUpload: function(file, fileList) {
      this.updateUploadedImage(fileList);
    },
    updateUploadedImage: function(fileList) {
      this.uploadedImage = [];
      var i;
      for (i = 0; i < fileList.length; i++) {
        this.uploadedImage.push({id: fileList[i].response.id});
      }
    },
    hover: function(index) {
      this.feeds[index].showDetail = true;
    },
    leave: function(index) {
      this.feeds[index].showDetail = false;
    }
  },
  created () {
    this.getFeeds(true);
    this.listenSearchFeeds();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .feedList{
    background: #f8f8f8;
  }
  .feed .el-row {
    margin-left: 20px;
    padding-top: 10px;
  }
  .feed:not(:last-child) {
    border-left: 1px solid #DCDFE6;
    /* border-bottom: none; */
    border-right: 1px solid #DCDFE6;
  }
  .myfeed {
    position: relative;
  }
  .loading {
    height: 44px;
    background-color: transparent;
    margin-top: 20px;
  }
  .myfeed .publish .el-button {
    padding: 6px 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .myfeed .uploadimg {
    margin-top: 15px;
  }
  .myfeed .publish .upload {
    display: inline-block;
  }
  .myfeed .publish .picture {
    cursor: pointer;
  }
  .myfeed .publish .el-icon-picture {
    margin-top: 15px;
    color: #666;
    font-size: 20px;
  }
  .myfeed .publish .el-icon-picture span {
    font-size: 12px;
    position: relative;
    margin-left: 10px;
    top: -3px;
  }
  /*.myfeed .el-textarea .el-textarea__inner {
    border: none;
    outline: none;
    background: #f3f6f7;
  }*/
  .myfeed .arrow {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 6px;
    top: 55px;
    left: 85px;
    border-right-color: #f3f6f7;
    border-left-width: 0;
  }
  .comment {
    margin-top: 10px;
  }
  .main .content .right .nameText {
    font-weight: 600;
  }
  .main .content .right .publishTime {
    float: right;
    color: #838383;
    font-size: 12px;
    cursor: pointer;
  }
  .main .content .right .viewinfo {
    float: right;
    color: #838383;
    font-size: 12px;
  }
  .main .content .right .follow img {
    height: 25px;
    width: 25px;
    top: 7px;
    position: relative;
    border-radius: 50%;
  }
  .main-view {
    padding: 0 20px;
  }
  .main .title{
    margin: 15px 0;
  }
  .main .title span {
    color: #999;
    font-size: 14px;
    cursor: pointer;
  }
  .main .title span:hover {
    color: #333 !important;
  }
  .main .title span.selected {
    color: #333 !important;
  }
  .main .new {
    padding-left: 10px;
    margin-right: 20px;
  }
  .el-dropdown {
    float: right;
  }
  .content {
    padding: 0;
  }
  .content .el-button {
    float: right;
    padding: 6px 10px;
  }
  .content a.left { 
    float:left;
    border-radius: 50%;
    border: solid 1px white;
  }
  .content a.left img {
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
  .content>.right .info .text{
    margin: 0;
    cursor: pointer;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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
  .content>.right .icon .is-collected{
    width: 25px;
    height: 30px;
    margin-bottom: -10px;
    display: inline-block;
    background: url("../assets/icon.png") 0 -443px no-repeat;
  }
  /*.content>.right .icon .dispatch-number{
    font-size: 14px;
    color: #C5C7CA;
  }*/
  .main-view {
    margin-bottom: 20px;
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
    font-weight: bold;
    font-size: 14px;
  }
  .feed .time {
    float: right;
    color: #909399;
    font-size: 14px;
    font-weight: 200;
  }
  .feed .info {
    margin-top: 10px;
    font-size: 14px;
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
    height: 45px;
    width: 45px;
    border-radius: 50%;
  }
  .feed {
    padding: 10px 20px 10px 10px;
  }
</style>

<style>
  .myfeed .el-textarea .el-textarea__inner {
    border: none;
    outline: none;
    background: #f3f6f7;
  }
  .myfeed .uploadimg .el-upload--picture-card,.el-upload-list--picture-card .el-upload-list__item {
    width: 60px;
    height: 60px;
  }
  .myfeed .uploadimg .el-upload--picture-card i {
    font-size: 15px;
  }
  .myfeed .uploadimg .el-upload--picture-card {
    line-height: 60px;
  }
</style>
