<template>
  <div class="body">
    <el-row>
      <el-col :span="5.2" style="width:21.67%">
        <div class="left">
          <left-view/>
        </div>
      </el-col>

      <el-col :span="13.6" style="width:56.66%">
        <div class="main">
          <main-view/>
        </div>
      </el-col>
      <el-col :span="5.2" style="width:21.67%">
        <div class="right">
          <right-view/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'body-view',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
/*  .body {
    padding-top: 100px;
  }*/
</style>
