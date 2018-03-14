<template>
  <div class="person-right-view">
    <div>
      <el-card class="person-info-card" :body-style="{padding: '0 0 20px 0'}">
        <el-menu :default-active="activeIndex" @select="(index) => {activeIndex = index}" mode="horizontal" >
          <el-menu-item index="1">个人信息</el-menu-item>
        <!--   <el-menu-item index="2">交易设置</el-menu-item> -->
          <el-menu-item index="3">修改密码</el-menu-item>
        </el-menu>
        <el-form v-show="activeIndex == '1'" :label-position="'left'" class="form" ref="form" :model="form" label-width="100px">
          <el-form-item class="img">
            <!-- <img :src="auth.user.avatar" />
            <input type="file" ref="fileInput" name="file" @change="changeAvatar" style="display: none" />
            <el-button @click="() => this.$refs.fileInput.click()">更改头像</el-button> -->
            <el-upload
              class="avatar-uploader"
              
              :action="$http.defaults.baseURL + 'api/v2/user/avatar'"
              :headers = "headers"
              :show-file-list="false"
              :name="'avatar'"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img  :src="imageUrl" class="avatar">
              <el-button>更改头像</el-button>
            </el-upload>
          </el-form-item>
          <!-- <el-form-item label="昵称:">
            <el-input placeholder="请输入昵称" v-model="form.name"></el-input>
          </el-form-item> -->
          <el-form-item label="性别:">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所在地:">
            <el-input placeholder="请输入所在城市" v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="自我介绍:">
            <el-input placeholder="简单的介绍下自己吧！" :maxlength="maxlength" type="textarea" v-model="form.intro"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="savePersonInfo" type="danger">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form v-show="activeIndex == '2'" :label-position="'left'" class="form" ref="form" :model="form" label-width="100px">
          <el-form-item label="交易平台:">
            <el-select v-model="form.platForm" placeholder="请选择交易平台">
              <el-option v-for="(platform,idx) of platforms" :label="platform.name" :value="platform.id" :key="idx"></el-option>
              <!-- <el-option label="okccoin" value="okc"></el-option>
              <el-option label="火币" value="huoc"></el-option>
              <el-option label="中币(chbtc)" value="chbtc"></el-option> -->
            </el-select>
          </el-form-item>
          </el-form-item>
          <el-form-item label="apiKey:">
            <el-input placeholder="请输入apiKey" v-model="form.apiKey"></el-input>
          </el-form-item>
          <el-form-item label="secretKey:">
            <el-input placeholder="请输入secretKey" v-model="form.secretKey"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="savePlatform" type="danger">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form v-show="activeIndex == '3'" :label-position="'left'" class="form" ref="form" :model="form" label-width="100px">
          <el-form-item label="原密码:">
            <el-input type="password" placeholder="请输入原密码" v-model="form.currentPwd"></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item label="设置新密码:">
            <el-input type="password" placeholder="请输入新密码" v-model="form.newPwd"></el-input>
            <span class="tips">请使用6-16字母(区分大小写)、数字、特殊符号，建议组合使用</span>
          </el-form-item>
          <el-form-item label="确认新密码:">
            <el-input type="password" placeholder="请再次输入新密码" v-model="form.confirmNewPwd"></el-input>
            <span class="tips">请再次输入新密码</span>
          </el-form-item>
          <el-form-item>
            <el-button >取消</el-button>
            <el-button @click="savePassword" type="danger" >保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  name: 'PersonSettingView',
  data () {
    return {
      activeIndex: '1',
      auth: auth,
      maxlength:90,
      headers:{},
      form: {
        name: '',
        sex: '男',
        address: '',
        intro: '',
        platForm: '',
        apiKey: '',
        secretKey: '',
        currentPwd: '',
        newPwd: '',
        confirmNewPwd: '',
      },
      platforms: [],
      imageUrl: auth.user.avatar
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
    
        this.imageUrl = URL.createObjectURL(file.raw);
        this.getPersonInfo()
        this.$message({
          message: '头像变更成功!',
          type: 'success',
          duration: 1000
        });
    },
    getPersonInfo() {
      this.$http.get('api/v2/user', {
        headers: this.auth.getAuthHeader()
      })
        .then(res => {
           document.querySelector('.person-info .avatar img').setAttribute('src',res.data.avatar+"?t="+Math.random())
           document.querySelector('.avatar img').setAttribute('src',res.data.avatar+"?t="+Math.random())
           
           

         // this.data = res.data;
          //this.img=this.data.avatar;
         // this.eventBus.$emit('img',this.img);  
          localStorage.access_avatar=res.data.avatar;
      })
        .catch(err => {
          //console.log(res)
          // debugger;
          // this.$message({
          //   message: '获取动态信息失败！',
          //   type: 'error',
          //   duration: 1000
          // });
      });
    },
    beforeAvatarUpload(file) {
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
    changeAvatar ($event) {
      debugger;
      var avatar = $event.target.files[0];
      this.$http.post('api/v2/user/avatar', {
        avatar: avatar
      }, {
        headers: this.auth.getAuthHeader()
      })
        .then(res => {
          this.$message({
            message: '头像更新成功！',
            type: 'success',
            duration: 1000
          });
      })
        .catch(err => {
          this.$message({
            message: '头像更新失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    savePersonInfo () {
      let sex = 0;
      if (this.form.sex == '男') {
        sex = 1;
      } else if (this.form.sex == '女') {
        sex = 2;
      } else {
        sex= 0;
      }
      this.$http.patch('api/v2/user', {
        name: this.form.name,
        bio: this.form.intro,
        sex: sex,
        location: this.form.address
      }, {
        headers: this.auth.getAuthHeader()
      })
        .then(res => {
          this.$message({
            message: '个人信息设置成功！',
            type: 'success',
            duration: 1000
          });
      })
        .catch(err => {
          this.$message({
            message: '个人信息设置失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    getPlatform() {
      this.$http.get('api/v2/trade/platform', {
        headers: this.auth.getAuthHeader()
      })
        .then(res => {
          this.platforms = res.data;
      })
        .catch(err => {

      });
    },
    savePlatform() {
      this.$http.post('api/v2/trade/binding', {
        platform_id: this.form.platForm,
        keyid: this.form.apiKey,
        keySecret: this.form.secretKey
      }, {
        headers: this.auth.getAuthHeader()
      })
        .then(res => {
          this.$message({
            message: '交易设置成功！',
            type: 'success',
            duration: 1000
          });
      })
        .catch(err => {
          this.$message({
            message: '交易设置失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    savePassword() {
      this.$http.put('api/v2/user/password', {
        old_password: this.form.currentPwd,
        password: this.form.newPwd,
        password_confirmation: this.form.confirmNewPwd
      }, {
        headers: this.auth.getAuthHeader()
      })
        .then(res => {
          this.$message({
            message: '密码设置成功！',
            type: 'success',
            duration: 1000
          });
      })
        .catch(err => {
          this.$message({
            message: '密码设置失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
  },
  create(){
 
    console.log(this.headers)
  },
  mounted () {
       this.headers=this.auth.getAuthHeader();
     //this.headers.Accept='application/json';
     document.querySelector('.el-textarea textarea').style.width='450px';
     document.querySelector('.el-textarea textarea').style.height='100px';
    document.querySelector('.el-form-item.img .el-form-item__content').style.marginLeft='0px'
    this.getPlatform();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form-item.img .el-form-item__content{
margin-right: 10px !important;
}
.el-textarea textarea{
  width:450px;
  height: 100px;
}
.person-right-view .el-card {
  height: 597px;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid #FA5555;
}
.el-menu-item:first-child {
  margin-left: 50px;
}
.person-info-card .avatar img {
  width: 80px;
  height: 80px;
  vertical-align:middle;
}
.person-info-card .form {
  padding-left: 50px;
  margin-top: 40px;
}
.person-info-card .form img{
  margin-right: 50px;
  border-radius: 50%;
}
/*.el-input,.el-textarea {
  width: 300px;
  right: 0;
}
.margin {
  margin-top: 20px;
}
.nickname-input {
  margin-left: 50px;
}
.sex-input {
  margin-left: 50px;
}
.address-input {
  margin-left: 35px;
}
.introduce-input {
  margin-left: 20px;
}
.save-btn {
  margin-left: 95px;
  background-color: #E5000B;
  padding: 12px 40px;
  margin-top: 30px;
  margin-bottom: 137px;
}*/
.person-info-card form .el-input,.el-textarea,.el-select {
  width: 350px;
}
.form img {
  width: 100px;
  height: 100px;
  vertical-align: middle;
}
.form .img>div{
  margin-left: 0 !important; 
}
.form .el-form-item .el-button {
  padding: 12px 30px;
  margin-top: 20px;
  /*margin-bottom: 30px;*/
}
.form .el-form-item .tips {
  font-size: 12px;
  color: #878D99;
}
</style>
