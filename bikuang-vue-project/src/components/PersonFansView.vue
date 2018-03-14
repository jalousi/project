<template>
  <div class="fans-view">
    <el-card class="person-fans-card" :body-style="{padding: '0 0 20px 0'}">
      <el-menu :default-active="'1'" mode="horizontal" >
        <el-menu-item index="1">我的粉丝 {{fans.length}}</el-menu-item>
      </el-menu>
      <div class="content" v-for="fan of fans">
        <a class="left" href="" target="_blank"><img :src="fan.avatar || require('../assets/unknown.png')" width="50" height="50" alt="" /></a>
        <dl class="right">
            <dt class="name">
                <span>{{fan.name}}</span>
                <el-button @click="() => toggleAttention(fan)">
                      <span v-show="!fan.follower"><span class="add">+</span>关注</span>
                      <span v-show="fan.follower">已关注</span>
                    </el-button>
            </dt>
            <dt class="info" :title="fan.bio">
                {{fan.bio}}
            </dt>
            <dt class="calc">
                <span class="attention"><span class="des">关注</span><span class="number">{{fan.extra.followings_count}}</span></span>
                <span class="fans"><span class="des">粉丝</span><span class="number">{{fan.extra.followers_count}}</span></span>
                <span class="point"><span class="des">观点</span><span class="number">{{fan.extra.feeds_count}}</span></span>
            </dt>
        </dl>
        <div class="clear-both"></div>
      </div>
    </el-card>
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :page-count="4"
      :prev-text="'<上一页'"
      :next-text="'下一页>'">
    </el-pagination> -->
  </div>
</template>

<script>
import auth from '../auth'
export default {
  methods: {
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
    getFollows() {
      this.$http.get('api/v2/user/followers', {
        headers: this.auth.getAuthHeader()
      })
        .then(res => {
          this.fans = res.data;
      })
        .catch(err => {
          this.$message({
            message: '获取信息失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
  },
  mounted() {
    this.getFollows();
  },
  name: 'PersonFansView',
  data () {
    return {
      auth,
      fans: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fans-view .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #FA5555;
    padding: 0;
    margin-left: 40px;
  }
  .content:not(:last-child) {
    border-bottom: solid 1px #e6e6e6;
  }
  .content {
    padding: 30px 0;
    padding-left: 40px;
    padding-right: 40px;
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
  .content>.right .name .el-button:last-child{
    margin-right: 10px;
  }
  .content>.right .info{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #C5C7CA;
    white-space: nowrap;
  }
  .content>.right .calc{
    font-size: 13px;
  }
  .content>.right .calc .des{
    color: #7E7E80;
    margin-right: 5px;
  }
  .content>.right .calc .number{
    color: #E5000B;
  }
  .content>.right .calc .attention{
    margin-right: 20px;
  }
  .content>.right .calc .fans{
    margin-right: 20px;
  }
  .el-pagination {
    margin-top: 20px;
    float: right;
  }

</style>
<style>
  .el-pager li.active {
    color: #fff;
    background-color: #E5000B;
    cursor: default;
  }
</style>
