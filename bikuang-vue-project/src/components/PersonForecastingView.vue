<template>
  <div class="forecast-view">
    <el-card class="person-forecast-card" :body-style="{padding: '0 0 20px 0'}">
      <el-menu :default-active="'1'" mode="horizontal" >
        <el-menu-item index="1">我的预测</el-menu-item>
      </el-menu>
      <div class="table">
        <template>
          <el-table
            :data="forecasts"
            style="width: 100%">
            <el-table-column
              label="品种"
              >
              <template slot-scope="scope">
                <!-- <div :class="scope.row.icon"></div> -->
                <!-- <span>{{ scope.row.symbol.name }}</span> -->
                <span>{{ scope.row.platform.name +' / ' + scope.row.symbol.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="价格"
              >
              <template slot-scope="scope">
                <span style="color: #F56C6C">{{ '$' + scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="预测"
              >
              <template slot-scope="scope">
                <span>{{ '$' + scope.row.for_price }}</span>
              </template>
            </el-table-column>
            <el-table-column
            prop="expired"
            label="截止日期"
            >
            </el-table-column>
            <el-table-column 
            
            label="状态">
              <template slot-scope="scope">
                <span :style="'color:' + statusColor[scope.row.status]">{{ statusMap[scope.row.status] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  name: 'PersonForecastingView',
  mounted () {
    this.getForecast();
  },
  methods: {
    getForecast () {
      debugger;
      this.$http.get('api/v2/forecast/my', {
        params: {
          limit: 20,
          offset: 0
        },
        headers: this.auth.getAuthHeader()
      })
        .then(res => {
          this.forecasts = res.data;
          // this.$message({
          //   message: '个人信息设置成功！',
          //   type: 'success',
          //   duration: 1000
          // });
      })
        .catch(err => {
          this.$message({
            message: '预测信息获取失败！',
            type: 'error',
            duration: 1000
          });
      });
    }
  },
  data () {
    return {
      auth: auth,
      forecasts: [],
      statusMap: {
        S: '正在进行中',
        Y: '成功',
        N: '失败'
      },
      statusColor: {
        S: '#909399',
        Y: '#67C23A',
        N: '#F56C6C'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .forecast-view .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #FA5555;
    padding: 0;
    margin-left: 40px;
  }
  .table {
    padding: 0 20px;
  }
  .table .etc{
    width: 20px;
    height: 25px;
    vertical-align: middle;
    display: inline-block;
    background: url("../assets/icon.png") 0 -170px no-repeat;
  }
  .table .neo{
    width: 20px;
    height: 25px;
    vertical-align: middle;
    display: inline-block;
    background: url("../assets/icon.png") 0 -207px no-repeat;
  }
  .table .cn{
    width: 20px;
    height: 25px;
    vertical-align: middle;
    display: inline-block;
    background: url("../assets/icon.png") 0 -250px no-repeat;
  }
  .table .coinsafe{
    width: 20px;
    height: 25px;
    vertical-align: middle;
    display: inline-block;
    background: url("../assets/icon.png") 0 -290px no-repeat;
  }
  .table .Bitfinex{
    width: 20px;
    height: 25px;
    vertical-align: middle;
    display: inline-block;
    background: url("../assets/icon.png") 0 -332px no-repeat;
  }
  .table .Bitflyer{
    width: 20px;
    height: 25px;
    vertical-align: middle;
    display: inline-block;
    background: url("../assets/icon.png") 0 -375px no-repeat;
  }
</style>
