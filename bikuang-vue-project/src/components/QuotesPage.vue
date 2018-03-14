<template>
  <div class="forecast-view">
    <!-- <div class="filter">
      <el-button>
        美元
      </el-button>
      <el-button>
        人民币
      </el-button>
      <el-button>
        价格由低到高
      </el-button>
      <el-button>
        价格由高到低
      </el-button>
    </div> -->
    <el-card class="forecast-card" :body-style="{padding: '0 0 20px 0'}">
      <!-- <el-menu :default-active="'1'" mode="horizontal" >
        <el-menu-item index="1">BTC</el-menu-item>
        <el-menu-item index="2">BCH</el-menu-item>
        <el-menu-item index="3">ETH</el-menu-item>
        <el-menu-item index="4">LTC</el-menu-item>
        <el-menu-item index="5">BCH</el-menu-item>
        <el-menu-item index="6">ETC</el-menu-item>
        <el-menu-item index="7">DASH</el-menu-item>
        <el-menu-item index="8">HSR</el-menu-item>
      </el-menu>  -->
      <div class="table">
        <template>
          <el-table v-loading="loadData"
            :data="markets"
            style="width: 100%">
            <el-table-column
              label="名称"
              >
              <template slot-scope="scope">
                <!-- <div :class="scope.row.icon"></div> -->
                <!-- <img :src="scope.row.img" style="width:20px;height:20px"/> -->
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="市值"
              >
              <template slot-scope="scope">
                <span>{{ scope.row.cap }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格"
              >
            </el-table-column>
            <el-table-column
            prop="24hVol"
            label="24h Vol."
            >
            </el-table-column>
            <el-table-column 
            
            label="1h %">
              <template slot-scope="scope">
                <span :style="'color:' + statusColor[scope.row['1h'].indexOf('-')+ '']">{{ scope.row['1h'] }}</span>
              </template>
            </el-table-column>
            <el-table-column 
            
            
            label="24h %">
            <template slot-scope="scope">
                <span :style="'color:' + statusColor[scope.row['24h'].indexOf('-')+ '']">{{ scope.row['24h'] }}</span>
              </template>
            </el-table-column>
            <el-table-column 
            
            
            label="7d %">
            <template slot-scope="scope">
                <span :style="'color:' + statusColor[scope.row['7d'].indexOf('-')+ '']">{{ scope.row['7d'] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'QuotesPage',
  created () {
    this.getMarketInfo();
  },
  methods: {
    getMarketInfo () {
      this.loadData = true;
      this.$http.get('api/v2/market', {
        params: {
          cap: '',
          price: '',
          volume: '',
          type: ''
        }
      })
        .then(res => {
          debugger;
          this.markets = res.data;
          this.loadData = false;
          // this.markets = res.data;
          // let i;
          // for ( i = 0; i < this.markets.length; i ++ ) {
          //   if ( this.markets[i]['1h'].split('-').length > 1) {
          //     this.markets[i]['trend'] = 'bottom';
          //   } else {
          //     this.markets[i]['trend'] = 'top';
          //   }
          // }
        })
          .catch(err => {
            this.$message({
              message: '市场预测数据获取失败！',
              type: 'error',
              duration: 1000
            });
        });
    }
  },
  data () {
    return {
      markets: [],
      loadData: false,
      statusColor: {
        '-1': '#F56C6C',
        '0': '#67C23A'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter {
    margin-bottom: 20px;
    text-align: center;
  }
  .filter .el-button:active {
    color: white;
    background-color: #3D3E41;
    border-color: #3D3E41;
  }
  .filter .el-button:hover {
    color: white;
    background-color: #3D3E41;
    border-color: #3D3E41;
  }
  .filter .el-button:focus {
    color: white;
    background-color: #3D3E41;
    border-color: #3D3E41;
  }
  .forecast-view .el-menu {
    padding-left: 20px;
  }
  .comment {
    height: 54px;
    line-height: 54px;
    padding-left: 20px;
    border-bottom: solid 1px #e6e6e6;
    font-size: 14px;
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #FA5555;
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
