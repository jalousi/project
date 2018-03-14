<template>
  <div class="person-left-view">
    <div class="person-info" v-if="data">
      <el-card class="person-info-card">
        <div class="avatar">
          <img :src="img || require('../assets/unknown.png')"/>
        </div>
        <div class="name">
          {{data.name}}
        </div>
        <div class="info" v-if="data.location || data.bio">
          <span>
            {{data.location}}
          </span>
            
          <span>
            {{data.bio}}
          </span>
        </div>
        <div class="point-fans">
          <div class="point">
            <div>
              {{(data.extra && data.extra.feeds_count) || 0}}
            </div>
              
            <div>
              观点
            </div>
          </div>
          <div class="fans">
            <div>
              {{(data.extra && data.extra.followers_count) || 0}}
            </div>
              
            <div>
              粉丝
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="person-menu">
      <el-card class="person-menu-card" :body-style="{padding: '20px'}">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :active-text-color ="'#E5000B'"
          :router="true"
          >
          <el-menu-item index="/person/setting">
            <span slot="title">设置</span>
          </el-menu-item>
          <el-menu-item index="/person/forecast">
            <span slot="title">我的预测</span>
          </el-menu-item>
          <el-menu-item index="/person/opnion">
            <span slot="title">我的观点</span>
          </el-menu-item>
          <el-menu-item index="/person/fans">
            <span slot="title">我的粉丝</span>
          </el-menu-item>
          <el-menu-item index="/person/attention">
            <span slot="title">我的关注</span>
          </el-menu-item>
          <el-menu-item index="/person/collection">
            <span slot="title">我的收藏</span>
          </el-menu-item>
        </el-menu>
      </el-card>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  name: 'PersonLeftView',
  data () {
    return {
      auth: auth,
      data: null,
      img:''
    }
  },
  mounted() {
    this.eventBus.$on('img', (img) => {
      console.log(img)
      })
    this.getPersonInfo();
  },
  methods: {
    getPersonInfo() {
      this.$http.get('api/v2/user', {
        headers: this.auth.getAuthHeader()
      })
        .then(res => {
          this.data = res.data;
          this.img=this.data.avatar;
           localStorage.access_avatar=this.img;
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
  .person-info-card {
    text-align: center;
    
  }
  .person-info-card>div {
    padding: 20px;
  }
  .person-menu {
    margin-top: 10px;
  }
  .person-info-card .info span:not(:last-child){
    padding-right: 5px;
    border-right: 1px solid #DFE4ED;
  }
  .person-info-card .info span:last-child{
    padding-left: 7px;
  }
  .person-info-card .point span:not(:last-child){
    padding-right: 10px;
    border-right: 1px solid #DFE4ED;
  }
  .person-info-card .point{
    padding-right: 20px;
    border-right: 1px solid #EDF2FC;
  }
  .person-info-card .fans{
    padding-left: 15px;
  }
  .person-info-card .point span:last-child{
    padding-left: 12px;
  }
  .person-info-card .info {
    margin-top: 10px;
    color: #878D99;
    font-size: 14px;
  }
  .person-info-card .point,.fans{
    display: inline-block;
    text-align: center;
  }
  .person-info-card .point-fans{
    margin-top: 10px;
  }
  .person-info-card .point-fans .point div:first{
    color: #2D2F33;
    font-weight: 600;
    margin-top: 10px;
  }
  .person-info-card .point-fans .fans div:first{
    color: #2D2F33;
    font-weight: 600;
    margin-top: 10px;
  }
  .person-info-card .point-fans .point div:last-child{
    margin-top: 5px;
    color: #878D99;
    font-size: 14px;
  }
  .person-info-card .point-fans .fans div:last-child{
    margin-top: 5px;
    color: #878D99;
    font-size: 14px;
  }
  .avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .name {
    color: #2D2F33;
    font-weight: 600;
    margin-top: 10px;
  }
  .el-menu {
    border-right: none;
  }
  .el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: white;
  }
  .el-menu-item {
    height: 45px;
    line-height: 45px;
  }

</style>
