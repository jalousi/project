<template>
  <div class="person-page">
    <div class="person-content">
      <el-row>
        <el-col :span="5"><div><person-left-view class="left-view"/></div></el-col>
        <el-col :span="19"><div><transition><router-view class="right-view"/></transition></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  name: 'PersonPage',
  data () {
    return {
      auth: auth
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left-view {
    padding-left: 15px;
    padding-right: 15px;
  }
  .right-view {
    padding-right: 15px;
  }
  /*.hello {
    background-color: #F5F6F8;
  }*/
</style>
