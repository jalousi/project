<template>
  <div class="main-view">
    <!-- <div class="banner">
      <img src="../assets/banner.png" width="100%">
    </div> -->
    <div class="main">
      <div class="title">
      	<div class="ld_header">
        <span class="new" :class="{'selected': isNew}" @click="getFeeds(true)">
          动态
        </span><span class="popular" :class="{'selected': !isNew}" @click="getFeeds(false)">
          用户
        </span>
        </div>
      </div>
        <div class="comments" v-show="!isNew"v-infinite-scroll="loadMore" infinite-scroll-disabled="loading1"> 
          <div class="attendtion">
      <el-card class="box-card" :body-style="{'padding': '0 20px'}">
        <div class="contents">
          <div class="contentss" v-for="item of recommends">
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
                      <span v-show="!item.extra.followers_count"><span class="add">+</span>关注TA</span>
                      <span v-show="item.extra.followers_count">已关注</span>
                    </el-button>
                </dt>
                <dt class="info" :title="item.bio || '这个家伙很懒，什么也没有留下'">
                    {{item.bio || '这个家伙很懒，什么也没有留下'}}
                </dt>
                 <dt class="infos">
                    <span>关注<span class="red">{{item.extra.followings_count}}</span></span>
                    <span>粉丝<span class="red">{{item.extra.followers_count}}</span></span>
                    <span>观点<span class="red">{{item.extra.feeds_count}}</span></span>
                </dt>
            </dl>
            <div class="clear-both"></div>
          </div>
        </div>
      </el-card>
    </div>
     </div>

      <div class="comments" v-show="isNew"v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"> 
        <div  class="comment"   v-for="(feed, index) of feeds">
          <el-card class="box-card" :body-style="{padding: '10px 20px 0 20px'}">
            <div class="content">
              <dl class="right">
                  <dt class="name">
                      <span class="nameText"><img :src="(feed.user && feed.user.avatar) || require('../assets/unknown.png')" /></span>
                 <!--      <div class="publishTime" @mouseover="() => hover(index)" @mouseleave="() => leave(index)"> 
                        <span v-show="!feed.showDetail">{{feed.created_at}}</span>
                        <span @click="() => viewDetail(feed.id, feed.user)" v-show="feed.showDetail">查看详情</span>
                      </div> -->
                      
                  </dt>
                  <dt class="info">
                      <p class="text" >
                  <!--   {{feed.feed_content}} -->
              <!--     <p class="card-text" v-html="feed.feed_content.replace(this.search, `<span style="color: red;">${search}</span>`)"></p> -->
              <span class="card-text" v-html="change(feed.feed_content)"></span>
                <!--      {{change(feed.feed_content)}} -->
                     <span @click="() => viewDetail(feed.id, feed.user)" v-show="feed.feed_content.length>100" class="quanbu">阅读全文 ></span>	
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
          <div class="feedList" v-show="feed.feed_comment_count!=0">
            <div class="feed" v-for="comment of feed.comments">
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
                      <p>
                        {{comment.body}}
                      </p>
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
      searchxia:'',
      recommends: [],
      isNew: true,
      loading:false,
      loading1:true,
      myFeed: '',
      search:'',
      dialogVisible: false,
      dialogImageUrl: '',
      uploadedImage: [],
      images: [],
      uploadFileList: [],
      uploadShow: false,
      auth: auth,
      lastId: 0,
      maxLen : 100
    }
  },
  components: {
    vueImages: vueImages
  },
  methods: {
  	 handleFold(fold) {
      //this.maxLen = fold ? maxLen : this.haystack.length;
    },
     toggleAttention (item) {
      if (!item.extra.followers_count) {
        this.$http.put('api/v2/user/followings/' + item.id, {

        },{
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            item.extra.followers_count = !item.extra.followers_count
        })
          .catch(err => {
            // this.loadingAttentions = false;
        });
      } else {
        this.$http.delete('api/v2/user/followings/' + item.id, {
          headers: this.auth.getAuthHeader()
        })
          .then(res => {
            item.extra.followers_count = !item.extra.followers_count
        })
          .catch(err => {
            // this.loadingAttentions = false;
        });
      }
      
    },
  	change(haystack){
  		var search=document.querySelector('.one_input').value;
  		var arr=haystack.slice(0, this.maxLen);
  		console.log(arr.length)
  		var maxLen=this.maxLen;
  		var haystack1=arr.replace(search, `<span style="color: #e5000b;">${search}</span>`)
  		if(haystack1.length!=arr.length){
  			maxLen=maxLen+37;
  		}
       	return haystack.length > maxLen
        	? haystack1.slice(0, maxLen) + "......"
         	: haystack1;
  	},
    loadMore () {  
    debugger  	
    if(this.searchxia){
    	var search=this.searchxia;
    }else{
    	if(document.querySelector('.one_input')){
    		var search=document.querySelector('.one_input').value;
    	}   	
    }
      this.getFeeds(this.isNew, search, true);
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
      this.$http.post('api/v2/search/' + feed.id +'/comments', {
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
          this.$http.get('api/v2/search/' + feed.id +'/comments')
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
      // if (feed.feed_comment_count!=0) {
      //   feed.comments.show = true;
      // } else {
      //   feed.comments.show = false;
      // }
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
    getFeeds: function(isNew, search, offset) {
      this.isNew = isNew;
      this.loading=true; 
      this.loading1=true;   
      this.feedsLoading = true;
      var that = this;
      var maxLen = that.maxLen;
      debugger;  
       var params = {
        query:search,
      };
      if (!this.searchxia) {
      	if(document.querySelector('.el-input__inner')){
      	 var search1=document.querySelector('.el-input__inner').value;
      	}
        params['query'] =search1;
      }else{
      	 params['query'] =this.searchxia;
      }
      
      if (typeof offset != 'undefined') {
        params['page'] = this.lastId;
      }
      // if (this.lastId <= 0 && offset) {
      //   return;
      // }
     
      this.$http.get('api/v2/search', {
        params: params,
        headers: auth.getAuthHeader(),
      })
        .then(res => {
        if(that.isNew){
           res.data.feeds.data.map((feed, index) => {
            //that.images[index] = [];
            // feed.showDetail = false;
            // feed.comments.show = false;
            // feed.userComment = '';
            // if (feed.feed_comment_count!=0) {
            // 	feed.comments.show = true;
            // }else{
            // 	feed.comments.show = false;
            // }
          
             if (feed.has_like) {
              feed.likeClass = 'is-liked';
            } else {
              feed.likeClass = 'like';
            }
            if (feed.feed_collect_count!=0) {
              feed.collectClass = 'is-collected';
            } else {
              feed.collectClass = 'dispatch';
            }                     
          });
     	}
     	 if(!that.isNew){
       if(res.data.users.current_page){       
          res.data.users.data.map((feed, index) => {
          	//console.log(feed)                   
          });
     	}
      }      
          if ( offset ) {
            this.feeds =[...this.feeds, ...res.data.feeds.data];
            this.recommends =[...this.recommends, ...res.data.users.data];
          } else {
            this.feeds = res.data.feeds.data;
            this.recommends =res.data.users.data;
          }
          	that.$nextTick(function(){
          		  that.feedsLoading = false;
                 if(isNew){
                  this.loading=false;
                  if(res.data.feeds.current_page){
                     if(res.data.feeds.last_page==res.data.feeds.current_page){
                        that.loading=true;
                        that.feedsLoading = false;
                        return;    
                    }else{
                     that.lastId = res.data.feeds.current_page+1;
                    }
                  }
                 }else{
                      this.loading1=false;
                       if(res.data.users.current_page){
                         if(res.data.users.last_page==res.data.users.current_page){
                          that.loading1=true;
                          that.feedsLoading = false;
                          return;    
                    }else{
                     that.lastId =res.data.feeds.current_page+1;
                    }
                }
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
      this.$http.post('api/v2/search', {
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
    	// console.log(this.loading)
    	// if(this.loading){
    	// 	return;
    	// }
      this.eventBus.$on('search111', (search) => {
      	debugger
      	this.searchxia=search;
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
  	debugger
  this.$root.subheader=false;
   this.searchxia=this.$root.search||localStorage.getItem('search');
    //this.getFeeds(true,search);
    this.listenSearchFeeds();

   
  },
  beforeDestroy () {
    this.eventBus.$off('search111')
    this.$root.subheader=true;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .contentss:not(:last-child) {
    border-bottom: solid 1px #e6e6e6;
  }
  .pages{
    padding-top:0px;
  }
  .contentss{
    padding: 18px 0;
  }
  .contentss .el-button {
    float: right;
    padding: 6px 10px;
  }
  .contentss a.left { 
    float:left;
  }
  .contentss img {
    border-radius: 50%;
  }
  .contentss>.right {
    margin:0 0 0 70px;
  }
  .contentss>.right .name{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
  }
    .contentss>.right .name>span{
      width:80px;
      height: 30px;
  }
  .contentss>.right .name .add{
    color: red;
    margin-right: 5px;
    font-weight: 600;
  }
  .contentss>.right .info{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #C5C7CA;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .contentss>.right .infos{
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #7e7e80;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
    .contentss>.right .infos .red{
    color: #e5000b;
    margin:0 4px;

  }
  
  .main{
  	width:875px;
  	margin:0 auto;
  }
  .pages{
  	margin-top: 0px;
  }
  img {
    cursor: pointer;
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
  .main .content .right .nameText img{
 width:50px;
 height: 50px;
 border-radius: 50%;  }
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
  .main .title{
    margin: 34px 0;
  }
  .main .title .ld_header{
    margin: 0 auto;
    width:344px;
    height: 40px;
    border:1px solid rgb(229,0,11);;
  }
  .main .title span {
  	text-align: center;
    color: rgb(229,0,11);
    width:172px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: inline-block;
    cursor: pointer;
    background: #fff;
  }
  .main .title span.selected {
    color: #fff !important;
    background: rgb(229,0,11);
  }
  .el-dropdown {
    float: right;
  }
  .content {
    padding: 0 0 0 10px;
  }
  .content .el-button {
    float: right;
    padding: 6px 10px;
  }
  .content>.right .name{
    height: 50px;
  
    font-size: 14px;
  margin-bottom: 10px;
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
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .content>.right .info .text .quanbu{
   color:#7b9bc4;
   cursor: pointer;
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
</style>
