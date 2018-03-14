<template>
  <div class="right-view">
    <div class="kline">
      <img src="../assets/banner.jpg" width="100%"/>
    </div>
    <div class="tag">
      <el-card class="box-card" :body-style="{padding: '10px 0'}" >
        <div slot="header" class="clearfix">
          <span class="title">热门标签</span>
        </div>
        <div>
          <div class="el-tag"v-for="(tag,idx) of tags":key="idx":class="" @click="(event) => searchFeeds(tag, event)">{{tag}}</div>
        </div>
      </el-card>
    </div>

    <!-- <div class="link">
      <span class="link-title">友情链接: </span>
      <a v-for="link of links" :href="link.url" target="_blank">
        <span v-bind:class="{ active: true}" @click='toggle'>{{link.name}}</span>
      </a>
     
    </div>
    <p class="contactus">
      联系我们 © 2018</p> 链区网
    </p> -->
    
  </div>
</template>

<script>
export default {
  name: 'right-view',
  created() {
    this.getTags();
    //this.getLinks();
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive;
    },
    getTags () {
      this.$http.get('api/v2/tags/hot')
        .then(res => {
          this.tags = res.data;
      })
        .catch(err => {
          this.$message({
            message: '热门标签获取失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
     getLinks () {
      this.$http.get('api/v2/friend-link')
        .then(res => {
          this.links = res.data;
      })
        .catch(err => {
          this.$message({
            message: '友情链接获取失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    searchFeeds (tag, event) {
      debugger;
      //var children = event.target.parentElement.parentElement.children;
        var children = event.target.parentElement.children;
      for (var i = 0; i < children.length; i++) {
        children[i].style.color = '#7e7e80';
        children[i].style.backgroundColor = 'white';
      }
      event.target.style.backgroundColor = '#F56C6C';
      event.target.style.color = '#fff';
      this.eventBus.$emit('searchFeeds', tag);
    }
  },
  data () {
    return {
      tags:[],
      links:[],
      isActive:false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .link {
    margin-top: 20px;
    color: #7e7e80;
    font-size: 14px;
  }
  .link a {
    cursor: pointer;
    line-height: 30px;
    padding: 0 7px;
  }
   .link a:hover {
    color:#333;
    text-decoration: underline;
  }
  .contactus {
    color:  #7e7e80;
  }
  .link .link-title {
    color: #303133;
  }
  .title {
    font-weight: 800;
  }
  .tag {
    margin-top: 10px;
  }
  .tag .tagItem {
    margin: 10px 0 0 10px;
  }
  .tag .tagItem:last-child {
    margin-bottom: 10px;
  }
  .tag .el-tag {
    margin: 10px 0 0 10px;
    background-color: white;
    color: black;
    height: auto;
    line-height: normal;
    border-color: #e4e6e9;
    color: #7e7e80;
    cursor: pointer;
    padding: 10px;
  }
  .tag .el-tag:focus, .tag .el-tag:hover{
    box-shadow: 0px 0px 20px #e4e6e9;
  }
</style>
