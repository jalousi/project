<template>
  <div class="header-view">
    <el-dialog custom-class="loginModal" :visible.sync="dialogTableVisible" center width="30%">
      <el-menu slot="title" v-show="!completedRegister" @select="(index) => {activeIndexLogin = index}" :default-active="activeIndexLogin" mode="horizontal" >
        <el-menu-item index="1">登录</el-menu-item>
        <el-menu-item index="2">注册</el-menu-item>      
      </el-menu>
      <div v-show="completedRegister" slot="title">
        <h1>
          验证手机
        </h1>
        <h3 style="color:#999">
          请输入你收到的６位数验证码
        </h3>
      </div>
      
      <div class="content">
        <div v-if="activeIndexLogin == 2 && !completedRegister">
          <el-input :class="{ error: checking && phone == '' }" v-model="phone" placeholder="手机号"></el-input>
          <el-input  type="password" :class="{ error: checking && password == '' }" v-model="password" placeholder="密码"></el-input>
          <el-input  :class="{ error: checking && nickname == '' }" v-model="nickname" placeholder="昵称"></el-input>
          <div>
            <span style="color: #999;font-size: 13px;">注册即代表同意</span>《注册协议》
          </div>
        </div>
        <div v-else-if="completedRegister">
          <div style="margin-bottom: 20px;">
            <span>
              {{phone}}
            </span>
          </div>
          <el-input :class="{ error: checking && checkCode == '' }" v-model="checkCode" placeholder="请输入6位短信验证码">
            <el-button :disabled="disableGetCode" @click="getCode" slot="append">{{getCodeText}}</el-button>
          </el-input>
        </div>
        <div v-else>
          <el-input :class="{ error: checking && phone == '' }" v-model="phone" placeholder="手机号"></el-input>
          <el-input  type="password" :class="{ error: checking && password == '' }" v-model="password" placeholder="密码"></el-input>
        </div>
        <div>
          <el-button @click="register" class="login-btn"  :loading="isLoading">{{login_type}}</el-button>
        </div>
      </div>
    </el-dialog>
    <div class="header-view-content">
      <div class="header">
     <!--   <img src="../assets/logo_03.png" class="img">
        <el-menu :select="index => activeIndexHome = index":router="true" :default-active="$route.path" text-color="#3d3e41"class="el-menu-demo" mode="horizontal" >
          <el-menu-item index="/" style="height:60px;line-height:60px;color:#fff;">首页</el-menu-item>
          <el-menu-item style="height:60px;line-height:60px;color:#fff;"index="/forecast" route="/forecast">预测</el-menu-item>
          <el-menu-item index="/quotes" route="/quotes"style="height:60px;line-height:60px;color:#fff;">行情</el-menu-item>
        </el-menu> -->
        <div class="index_hread_one">
      <div class="cont_center">
       
        <img src="../assets/logo_03.png" class="logo_icon">
       
        <div class="nav_box clearfix fl">
          <a :href="host+'home.html'">首页</a>    
          <a :href="host+'digital_currency.html?id=2'"  data-id="2">数字货币</a>      
          <a :href="host+'trading_platform.html?id=3'"  data-id="3">交易平台</a>       
          <a :href="host+'block_chain.html?id=4'"  data-id="4">区块链项目</a>       
          <a :href="host+'information.html?id=5'"  data-id="1">资讯</a>       
          <a :href="host+'index.html#/forecast'" class="forecast">预测 </a>      
        <!--   <a :href="host+'index.html'" class="she">社区</a> -->
        </div>
       
        <div class="nav_box_right fr">
        <div class="loginstatus" style="float: right;padding-left:10px">
        <!--   <div class="nav_hread_img" v-if="auth.getAuthenticatd()">
            <img src="../assets/unknown.png" width="25"height="25">
          </div> -->
           <div class="loginGroup fr" v-if="!auth.getAuthenticatd()">
          <span class="login" @click="openLogin">
            登录
          </span>
          <span @click="openRegister">
            注册
          </span>
        </div>
          <div v-if="auth.getAuthenticatd()" class="loginGroup fr">
          <span class="message">
            <img src="../assets/message.png" />
          </span>
          <span class="avatar">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <img :src="auth.user.avatar || require('../assets/unknown.png')" /><i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="fans">我的粉丝</el-dropdown-item>
                <el-dropdown-item command="collection">我的收藏</el-dropdown-item>
                <el-dropdown-item command="setting">设置</el-dropdown-item>
                <el-dropdown-item command="quit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
        </div>         
          <div class="nav_box_seach">
            <input type="text" class="one_input"  v-model="search"placeholder="输入关键词"@input="handleSelect">
            <a href="###" class="seach_icon"></a>
           
          </div>
            <div v-show="xiala"class="nav__search__result__container">
          <div class="nav__search__result">
            <div class="nav__search__result__list">
              <div class="nav__search__result__list__hd nav__search__control">
                动态
              </div>
              <div class="nav__search__result__list__bd">
                <div @click="openSearch(market.feed_content)" v-for="(market,index) of dong" v-show="index<5"class="nav__search__result__item nav__search__controlf">
                   {{market.feed_content}}
                </div>
              </div>  
            </div>
            <div class="nav__search__result__list">
              <div class="nav__search__result__list__hd nav__search__control">
                用户
              </div>
              <div class="nav__search__result__list__bd">
             
                <div @click="openSearch(market.name)"v-for="(market,index) of yong" v-show="index<5"class="nav__search__result__item nav__search__controlf">
                 <div class="avatar">
                 <img :src="(market && market.avatar) || require('../assets/unknown.png')" />
              </div>
                 <div class="market">{{market.name}}</div>
                </div>
              </div>  
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
       <!--  <div class="nav__search">
        <el-input
          class="search"
          placeholder="搜索"
          v-model="search"
          @input="handleSelect"
          @blur="blur"
          @focus="focus">
          <i slot="suffix" class="el-input__icon el-icon-search" v-on:click="openSearch(0)"></i>
        </el-input>
        <div v-show="xiala"class="nav__search__result__container">
          <div class="nav__search__result">
            <div class="nav__search__result__list">
              <div class="nav__search__result__list__hd nav__search__control">
                动态
              </div>
              <div class="nav__search__result__list__bd">
                <div @click="openSearch(market.feed_content)" v-for="(market,index) of dong" v-show="index<5"class="nav__search__result__item nav__search__controlf">
                   {{market.feed_content}}
                </div>
              </div>  
            </div>
            <div class="nav__search__result__list">
              <div class="nav__search__result__list__hd nav__search__control">
                用户
              </div>
              <div class="nav__search__result__list__bd">
             
                <div @click="openSearch(market.name)"v-for="(market,index) of yong" v-show="index<5"class="nav__search__result__item nav__search__controlf">
                 <div class="avatar">
                 <img :src="(market && market.avatar) || require('../assets/unknown.png')" />
              </div>
                 <div class="market">{{market.name}}</div>
                </div>
              </div>  
            </div>
          </div>
        </div>
        </div> -->
       <!--  <div class="loginGroup" v-if="!auth.getAuthenticatd()">
          <span class="login" @click="openLogin">
            登录
          </span>
          <span @click="openRegister">
            注册
          </span>
        </div> -->
<!-- 
        <div v-else class="loginGroup">
          <span class="message">
            <img src="../assets/message.png" />
          </span>
          <span class="avatar">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <img :src="auth.user.avatar || require('../assets/unknown.png')" /><i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="fans">我的粉丝</el-dropdown-item>
                <el-dropdown-item command="collection">我的收藏</el-dropdown-item>
                <el-dropdown-item command="setting">设置</el-dropdown-item>
                <el-dropdown-item command="quit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div> -->
      </div>
    </div>
    <div class="subheader-view-content" v-if="$root.subheader">
      <div class="subheader" v-loading="marketLoading">
        <span class="item" v-for="market of markets">
          <span class="item-label">{{market.name}}</span> <span :class="market.trend">{{market.price}}<i :class="'el-icon-caret-' + market.trend + ' el-icon--right'"></i></span>
        </span>
        <!-- <span class="item">
          <span class="item-label">BTCUSD</span> <span class="up">$ 7374.68<i class="el-icon-caret-top el-icon--right"></i></span>
        </span>
        <span class="item">
          <span class="item-label">LTCUSD</span>   <span class="down">$ 7374.68<i class="el-icon-caret-bottom el-icon--right"></i></span>
        </span>
        <span class="item">
          <span class="item-label">ETHUSD</span>   <span class="up">$ 7374.68<i class="el-icon-caret-top el-icon--right"></i></span>
        </span>
        <span class="item">
          <span class="item-label">ETCUSD</span>   <span class="up">$ 7374.68<i class="el-icon-caret-top el-icon--right"></i></span>
        </span>
        <span class="item">
          <span class="item-label">BCHUSD</span>   <span class="up">$ 7374.68<i class="el-icon-caret-top el-icon--right"></i></span>
        </span>
        <span class="item">
          <span class="item-label">DASHUSD</span>   <span class="down">$ 7374.68<i class="el-icon-caret-bottom el-icon--right"></i></span>
        </span> -->
      </div>
    </div>
  </div>
</template>

<script>

import auth from '../auth';
import _ from 'lodash';
let sources = [];


export default {
  name: 'header-view',
  data () {
    return {
      host:'',
      forecast:false,
      activeIndexHome: '/',
      activeIndexLogin: '2',
      dong:[],
      isA:false,
      xiala:false,
      yong:[],
      dialogTableVisible: false,
      input: '',
      search:'',
      phone: '',
      nickname: '',
      password:'',
      checkCode: '',
      completedRegister: false,
      checking: false,
      getCodeText: '获取短信验证码',
      disableGetCode: false,
      isLoading: false,
      markets: [],
      auth: auth,
      marketLoading: false
    }
  },
  mounted () {
    if(window.location.href.split('forecast').length==2){
      document.querySelector('.forecast').className='forecast active'
       document.title='数字货币行情预测,数字货币行情预测网';
    }else{
       document.querySelector('.she').className='she active'
      document.title='区块链社区,区块链论坛,数字货币社区,数字货币论坛';
    }
    if(window.location.href.split('lianqu').length==2){
this.host='https://www.lianqu.net.cn/'
}else if(window.location.href.split('localhost').length==2){
  this.host='/'
}else{
this.host='http://120.78.185.128:3033/#/'
}
    this.getMarket();
    this.listenNotAuthed();
  },
  computed: {
    login_type: function() {
      if (this.activeIndexLogin == 2 && !this.completedRegister) {
        return '注册';
      } else if (this.activeIndexLogin == 1){
        return '登录';
      } else {
        return '进入链区';
      }
    }
  },
  methods: {
    clickFn(){
        this.$router.push('/forecast');//其中login是你定义的一个路由模块
},

     enter(){
     console.log(11)
    },
    blur(){
      var that=this;
      setTimeout(function(){
        that.xiala=false;
      },100)
    },
    focus(){
      if(this.yong.length||this.dong.length){
          this.xiala=true;
        }    
    },
    handleSelect:_.debounce(
        function () {
          let that = this;
          //删除已经结束的请求
          _.remove(sources, function (n) {
            return n.source === null;
          });
          //取消还未结束的请求
          sources.forEach(function (item) {
            if (item !== null && item.source !== null && item.status === 1) {
              item.status = 0;
              item.source.cancel('取消上一个')
            }
          });

          //创建新的请求cancelToken,并设置状态请求中
          var sc = {
            source: this.$http.CancelToken.source(),
            status: 1 //状态1：请求中，0:取消中
          };
          //这个对象加入数组中
          sources.push(sc);
　　　　　　//开始搜索数据，yourhttp替换成你自己的请求路径
          var params = {
            query:this.search,
          };

          this.$http.get('api/v2/search', {
        params: params,
        headers: auth.getAuthHeader(),
        cancelToken: sc.source.token}
          ).then(function (res) {
            //请求成功
            sc.source = null; //置空请求canceltoken

            //TODO这里处理搜索结果
            console.log(res.data);
            if(res.data.users.toString()){
               that.yong = res.data.users.data;
               that.xiala=true;
            }else{
               that.xiala=false;
            };
             if(res.data.feeds.toString()){
               that.dong = res.data.feeds.data
                that.xiala=true;           
                 }else{
               that.xiala=false;
            };
           

          }).catch(function (thrown) {
            //请求失败
            sc.source = null; //置空请求canceltoken

            //下面的逻辑其实测试用
            if (this.$http.isCancel(thrown)) {
              console.log('Request canceled', thrown.message);
            } else {
              //handle error
            }

          });
        },
        300 //空闲时间间隔设置500ms
      ),
    listenNotAuthed () {
      this.eventBus.$on('notAuthed', () => {
        this.dialogTableVisible = true;
      })
    },
    openSearch(name){
      debugger
        var search=this.search;
        this.$root.subheader=false;
        if(name){
           var search=name.replace(/(^\s*)|(\s*$)/g, "");
        }
        var search=search.slice(0, 10)
         this.$root.search=search;
        debugger
         this.xiala=false;
        this.eventBus.$emit('search111',search)  
        this.$router.push('/search');
        
    },
    getMarket () {
      this.marketLoading = true;
      this.$http.get('api/v2/market/list')
        .then(res => {
          this.markets = res.data;
          let i;
          for ( i = 0; i < this.markets.length; i ++ ) {
            if ( this.markets[i]['1h'].split('-').length > 1) {
              this.markets[i]['trend'] = 'bottom';
            } else {
              this.markets[i]['trend'] = 'top';
            }
          }
          this.marketLoading = false;
      })
        .catch(err => {
          this.marketLoading = false;
          this.$message({
            message: '市场预测数据获取失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    openLogin: function() {
      this.activeIndexLogin = '1';
      this.dialogTableVisible = true;
      this.completedRegister = false;
      this.isLoading = false;
    },
    openRegister: function() {
      this.activeIndexLogin = '2';
      this.dialogTableVisible = true;
      this.completedRegister = false;
      this.isLoading = false;
    },
    register: function() {
       this.checking = true;
      if(!this.phone){
        this.$message({
            message: '电话号码不能为空！',
            type: 'error',
            duration: 1000
          }); 
          return;
      }
        if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))){ 
          this.$message({
            message: '请输入正确的手机号码！',
            type: 'error',
            duration: 1000
          });
          //document.mobileform.mobile.focus(); 
          return false; 
       }
       if(!this.password){
        this.$message({
            message: '密码不能为空！',
            type: 'error',
            duration: 1000
          });
          return;
      }
      
      if (!this.completedRegister && this.activeIndexLogin == '2') {
        if (!this.phone || !this.nickname || !this.password) return;
        this.completedRegister = true;
      } else if ( this.completedRegister ) {
        this.isLoading = true;
        this.$http.post('api/v2/users', {
          phone: this.phone,
          name: this.nickname,
          password: this.password,
          verifiable_code: this.checkCode,
          verifiable_type: 'sms'
        }).then(res => {
          this.isLogin = true;
          this.isLoading = false;
          this.dialogTableVisible = false;
          this.$router.push('/person/setting');
          this.$message({
            message: '注册成功，欢迎来到链区！',
            type: 'success',
            duration: 1000
          });
        })
        .catch(err => {
          this.isLoading = false;
          this.$message({
            showClose: true,
            message: (err.response.data.errors.phone && err.response.data.errors.phone[0]) || 
            (err.response.data.errors.password && err.response.data.errors.password[0]) ||
            (err.response.data.errors.name && err.response.data.errors.name[0]) ||
            (err.response.data.errors.verifiable_code && err.response.data.errors.verifiable_code[0]) ||
            (err.response.data.errors.verifiable_type && err.response.data.errors.verifiable_type[0]) ||
            (err.response.data.errors.email && err.response.data.errors.email[0]),
            type: 'error',
            duration: 3000
          });
        });
      } else {
        if (!this.phone || !this.password) return;
        this.isLoading = true;
        let that = this;
        this.$http.post('api/v2/tokens', {
          login: this.phone,
          password: this.password
        }).then(res => {
          debugger;
          that.auth.persist(res.data.token, res.data.user.avatar, res.data.user.id, res.data.user.name);
          that.auth.setAuthenticate(true);
          // that.avatar = res.data.user.avatar;
          that.isLoading = false;
          that.dialogTableVisible = false;
         // that.$router.push('/');
          that.$message({
            message: '登录成功',
            type: 'success',
            duration: 1000
          });
        })
        .catch(err => {
          that.isLoading = false;
          that.$message({
            showClose: true,
            message: (err.response.data.login && err.response.data.login[0]) || ( err.response.data.password && err.response.data.password[0]),
            type: 'error',
            duration: 3000
          });
        });
      }
    },
    getCode: function() {
      this.disableGetCode = true;
      var time = 60;
      var int = setInterval(() => {
        time--;
        this.getCodeText = time + '秒后重发';
        if (time <= 1) {
          this.getCodeText = '重发验证码';
          clearInterval(int);
          this.disableGetCode = false;
        }
      }, 1000);
      this.$http.post('api/v2/verifycodes/register', {
        phone: this.phone
      }).then(res => {

      }).catch(err => {
        this.$message({
          showClose: true,
          message: err.response.data.errors.phone[0],
          type: 'error',
          duration: 3000
        });
      });
    },
    handleCommand: function(command) {
      if (command === 'setting') {
        this.$router.push('/person/setting');
      } else if (command === 'collection') {
        this.$router.push('/person/collection');
      } else if (command === 'fans') {
        this.$router.push('/person/fans');
      } else if (command === 'quit') {
        auth.setAuthenticate(false);
        auth.removeAuth();
        this.$router.push('/');
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav_hread_img {
    float: right;
    padding: 17px 0;
    margin-left: 20px;
    padding-right: 30px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.cont_center {
  width: 1200px;
  margin: 0 auto;
}
.index_hread_one {
  height: 60px;
  width: 100%;
  background: #444444;
  border-bottom: 1px #e4e6e9 solid;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.index_hread_one .logo_icon {
  width: 103px;
  height: 35px;
  float: left;
  margin-top: 12px;
}
.index_hread_one .nav_box {
  margin-left: 25px;
}
.index_hread_one .nav_box a {
  padding: 0 17px;
  font-size: 16px;
  text-decoration: none;
  color: #fff;
  float: left;
  line-height: 60px;
  transition: all .3s ease 0s;
  transition: all .3s ease 0s;
}
.index_hread_one .nav_box a.active {
  background: #585858;
}
.index_hread_one .nav_box a:hover {
  background: #585858;
}
.index_hread_one .nav_box_seach {
  position: relative;
  padding-top: 12px;
  width: 184px;
  float: right;
}
.index_hread_one .nav_box_seach input {
  width: 184px;
  height: 35px;
  background: #696969;
  border-radius: 4px;
  border: 0;
  padding-left: 10px;
  box-sizing: border-box;
  color: #fff;
}
/*.index_hread_one .nav_box_seach .one_input::-webkit-input-placeholder {
  color: #fff;
}
.index_hread_one .nav_box_seach .one_input:-moz-placeholder {
  color: #fff;
}
.index_hread_one .nav_box_seach .one_input::-moz-placeholder {
  color: #fff;
}
.index_hread_one .nav_box_seach .one_input:-ms-input-placeholder {
  color: #fff;
}*/
.index_hread_one .nav_box_seach .seach_icon {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 10px;
  top: 21px;
  display: inline-block;
  background: url(../assets/seach_icon.png) no-repeat;
}
.index_hread_one .logo_icon_txt {
  padding: 0 17px;
  font-size: 16px;
  color: #fff;
  float: right;
  line-height: 60px;
}
.el-button.login-btn {
  background: #e5000b;
   color: #fff;
}
.el-button.login-btn:focus, .el-button.login-btn:hover{
   background: #e70e19;
   color: #fff;
}
.nav__search__control,.nav__search__result__item.nav__search__controlf{
  cursor: pointer;
}
.avatar{
  margin-right: 4px;
      float: left;
}
.nav__search__controlf img{
  width:15px;height: 15px;    display: block;
    padding-top: 3px;border-radius: 50%;
}
.nav__search__result__item:hover{background-color:#edf0f5}
.nav__search__result__container{position:absolute;z-index:1;font-size:14px;padding-top:13px; 
    top: 42px;width:184px}.nav__search__result{background-color:#fff;box-shadow:0 2px 3px rgba(0,0,0,.2)}.nav__search__result__list__hd{display:block;padding:6px 15px;color:#666c72;background-color:#f9f9f9}.nav__search__result__list__hd .more{margin-top:2px;float:right;font-size:13px}.nav__search__result__list__hd .more .iconfont{color:#888e94;vertical-align:middle}.nav__search__control.active{background-color:#edf0f5}.nav__search__result__item{padding:6px 15px;display:block;color:#33353c;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.nav__search__result__item .user-name{margin-left:10px;vertical-align:middle}.nav__search__result__item strong{color:#07d;font-weight:400}.nav__search__result__more{display:block;padding:6px 10px;text-align:center}.nav__search__result__more a{color:#2c78cc}
.el-input.error input::-webkit-input-placeholder{    
  color:#f00;/* WebKit browsers */
}
.el-input.error input:-moz-placeholder{    
  color:#f00;/* Mozilla Firefox 4 to 18 */
}
.el-input.error input::-moz-placeholder{    
  color:#f00;/* Mozilla Firefox 19+ */
}
.el-input.error input:-ms-input-placeholder{    
  color:#f00;/* Internet Explorer 10+ */
}
.header {
      height: 60px;
  background-color: #444;
  position: relative;
}
.subheader {
  height: 49px;
  line-height: 49px;
  /*border-bottom: solid 1px #e6e6e6;*/
  background-color: #FBFBFB;
  padding-left: 5px;
}
.subheader-view-content {
  border-bottom: solid 1px #e6e6e6;
      background-color: #FAFBFb;
      position: fixed;
    z-index: 2;
}
.el-dialog .el-menu--horizontal>.el-menu-item{
  background: #fff;
  color: #3d3e41
}
.el-dialog .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 2px solid #e5000b;
    color: #e5000b;
     background: #fff;
}
.el-dialog .el-menu--horizontal>.el-menu-item:hover {
    color: #e5000b;
}
.header-view-content {
  
      background-color: #444;
}
.subheader>.item {
  font-size: 14px;
  padding-left: 15px;
}
.subheader>.item:not(:last-child) {
  padding-right: 15px;
  border-right: solid 1px #e6e6e6;
}
.subheader>.item>.item-label {
  margin-right: 10px;
}
.subheader>.item>.bottom {
  color: #22A572;
}
.subheader>.item>.top {
  color: #EA3B5A;
}
.img {
    height: 40px;
    width: 100px;
    top: 14px;
    left: 20px;
    z-index: 2;
    position: absolute;
}
.el-menu{
  background: #444;
}
.el-menu--horizontal>.el-menu-item.is-active {
   background: #585858;
}
.el-menu--horizontal {
  border-right: none;
  padding-left: 150px;
  border-bottom: none;
}
.el-menu--horizontal>.el-menu-item {
  font-size: 16px;
  color: #3d3e41;
  padding: 0 17px;

  color:#fff;
}
.el-menu-item:hover {
 background: #585858;
}
.search {
  position: absolute;
  top: 14px;
  left:750px;
  width: 300px;
}
.el-input:not(:last-child) {
  margin-bottom: 20px;
}
.loginGroup {
/*  display: inline-block;
  position: absolute;
  top: 24px;
  left:1080px;*/
  font-size: 16px;
  margin-top: 18px;
  color:#fff;
  cursor: pointer;
}
.loginGroup>span:hover {
  color: #e5000b;
}
.loginGroup .avatar img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
  border-radius: 50%;
}
.loginGroup .message img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.loginGroup .message {
  border-right: solid 1px #e6e6e6;
  margin-right: 10px;
  padding-right: 20px;
}
.login {
  border-right: solid 1px #e6e6e6;
  margin-right: 10px;
  padding-right: 10px;
}
.loginModal .el-menu {
  width: auto !important;
  overflow: hidden !important;
  padding-left: 0;
  display: inline-block;
  border-bottom: none;
}
/*.loginModal .el-menu .el-menu-item{
  padding: 0 10px !important;
  margin: 0 10px !important;
}*/
.login-btn {
  width: 100%;
  margin-top: 20px;
}
</style>

<style>
.el-input.error input::-webkit-input-placeholder{    
  color:#f00;/* WebKit browsers */
}
.el-input.error input:-moz-placeholder{    
  color:#f00;/* Mozilla Firefox 4 to 18 */
}
.el-input.error input::-moz-placeholder{    
  color:#f00;/* Mozilla Firefox 19+ */
}
.el-input.error input:-ms-input-placeholder{    
  color:#f00;/* Internet Explorer 10+ */
}
</style>