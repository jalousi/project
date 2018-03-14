<template>
  <div id="app">
    <header-view/>
    <!-- <transition name="slide-fade"> -->
      <router-view class="pages"/>
    <!-- </transition> -->
    <footer-view v-show="show" />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      show: true,
      subheader:true
    }
  },
  mounted() {
    this.$root.subheader=this.subheader;
    this.$router.afterEach((router) => {
      if (router.path == '/') {
        this.show = false;
      }else if(router.path == '/forecast'){
        if(document.querySelector('.forecast')){
         document.querySelector('.forecast').className='forecast active'
         document.title='数字货币行情预测,数字货币行情预测网';
        }
        if(document.querySelector('.she')){
         document.querySelector('.she').className=''
        }
        if(document.querySelector('.subheader-view-content')){
          document.querySelector('.subheader-view-content').style.display="none"
        }
        
       this.$root.subheader= false;
      } else {
         document.querySelector('.subheader-view-content').style.display="block"
        this.show = true;
      }
    });
    // document.addEventListener('scroll', () => {
    //   const height = document.body.clientHeight;
    //   console.log('scrollTop' + document.body.scrollTop+ '  height:' + height);
    //   if (document.body.scrollTop > height - 500) {
    //     console.log('success');
    //     this.eventBus.$emit('loadMore');
    //   }
    // });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0;
}
*{
  padding: 0;
  margin:0;
}
#app input{outline:none;appearance:none;}
.router-view {
  background-color: #F5F6F8;
}
#app .el-card{
      box-shadow:none;
  } 
.header-view {
  width: 100%;
}
.pages {
  width: 1200px;
  margin:0 auto;
   padding-top:91px;
}
.header-view-content, .subheader-view-content {
  width: 100%;
}
.header, .subheader {
  width: 1200px;
  margin:0 auto;
} 
.header-view-content {
  background-color: white;
  border-bottom: solid 1px #e6e6e6;
}
.subheader-view-content {
  background-color: #FAFBFD;
}
#app {
  /*width: 100%;*/
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
