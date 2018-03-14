<template>
  <div class="forecast-view">
    <el-card class="forecast-card" :body-style="{padding: '0 0 20px 0'}">
      <div class="comment">
        用户分享预测——<span style="color: #7e7e80;font-size: 14px">您也可以添加您的预测，测试自己。测试可以是公开的或者私人的（只对自己可见）。预测成功会提高用户评分，但不正确的预测会降低评分。</span>
        <el-button @click="showAddForecast"  class="forcasat_btn" style="margin-left: 20px;">
          添加预测
        </el-button>
        <el-dialog 
          :visible.sync="showAddForecastModal"
          width="30%"
          center>
          <el-form ref="form" :rules="rules" :label-position="'left'" class="form" :model="form" label-width="100px">
            <el-form-item label="平台" prop="platform">
              <el-select @change="platformSelected" v-model="form.platform" placeholder="请选择平台">
                <el-option v-for="(platform,idx) of platforms" :label="platform.name" :value="platform.id" :key="idx"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="showSymbol" label="品种" prop="symbol">
              <el-select @change="symbolSelected" value-key="alias" v-model="form.symbol" placeholder="请选择品种">
                <el-option v-for="(symbol,idx) of symbols" :label="symbol.alias" :value="symbol" :key="idx"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="品种">
              <el-autocomplete
                v-model="form.type"
                :fetch-suggestions="symbolSearch"
                placeholder="请输入品种"
                @select="symbolSelected"
              ></el-autocomplete>
            </el-form-item> -->
            <el-form-item v-show="showPrice" label="当前价格">
              <div>{{currentPrice}}</div>
            </el-form-item>
            <el-form-item label="预测价格" prop="forecastPrice">
              <el-input class="forecastPrice" placeholder="请输入预测价格" v-model="form.forecastPrice"></el-input>
            </el-form-item>
            <el-form-item label="期限" required>
              <el-col :span="10">
                <el-form-item prop="deadline">
                  <el-select v-model="form.deadline">
                    <el-option   v-for="(index,idx) of deadlines" :label="index" :value="index" :key="idx"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
                
              <el-col :span="10" class="unit">
                <el-form-item prop="unit">
                  <el-select v-model="form.unit" >
                    <el-option label="小时" value="H"></el-option>
                    <el-option label="天" value="D"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- <el-form-item label="期限" class="deadline" prop="deadline">
              <el-select v-model="form.deadline">
                <el-option v-for="index of deadlines" :label="index" :value="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="unit">
              <el-select v-model="form.unit" >
                <el-option label="小时" value="H"></el-option>
                <el-option label="天" value="D"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="权限" prop="access">
              <el-select v-model="form.access" placeholder="请选择权限">
                <el-option label="对所有人可见" value="Y"></el-option>
                <el-option label="仅对自己可见" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="addForecast" type="danger">保存</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div> 
      <div class="table">
        <template>
          <el-table
            :data="forcasts"
            style="width: 100%"
            >
            <el-table-column
              label="交易平台"
              width="160">
              <template slot-scope="scope">
                <!-- <div :class="scope.row.icon"></div> -->
                <span>{{ scope.row.platform.name}}</span>
              </template>
            </el-table-column>
             <el-table-column
              label="币种"
              width="160">
              <template slot-scope="scope">
                <!-- <div :class="scope.row.icon"></div> -->
                <span>{{ scope.row.symbol.alias}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="当前价格"
              width="160">
              <template slot-scope="scope">
                <span style="color: #F56C6C">{{ '$' + scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="预测价格"
              width="160">
              <template slot-scope="scope">
                <span>{{ '$' + scope.row.for_price }}</span>
              </template>
            </el-table-column>
            <el-table-column
            prop="expired"
            label="截止日期"
            width="160">
            </el-table-column>
             <el-table-column 
            width="160"
            label="预测作者">
            <template slot-scope="scope">
                <span>{{ scope.row.user.name }}</span>
              </template>
            </el-table-column>
            <el-table-column 
            width="160"
            label="状态">
              <template slot-scope="scope">
                <span :style="'color:' + statusColor[scope.row.status]">{{ statusMap[scope.row.status] }}</span>
              </template>
            </el-table-column>
           

          </el-table>
        <!--    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="tpageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination> -->
      <div style="text-align:center"><el-pagination
             @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next,total"
        :total="totalCount"
        :page-size="20">
             
      </el-pagination></div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>
import auth from '../auth'
import Vue from 'vue'
export default {
  name: 'ForecastPage',
  mounted () {
    this.getForecast();
  },
  data () {
    return {
        currentPage:1,
        totalCount:20,
        rules: {
          platform: [
            { type:'number', required: true, message: '请选择平台', trigger: 'change' },
          ],
          symbol: [
            { type:'object', required: true, message: '请选择品种', trigger: 'change' },
          ],
          forecastPrice: [
            { required: true, message: '请输入预测金额', trigger: 'blur' },
          ],
          unit: [
            { required: true, message: '请选择时间单位', trigger: 'change' },
          ],
          deadline: [
            { type:'number', required: true, message: '请选择期限', trigger: 'change' },
          ],
          access: [
            { required: true, message: '请选择设置权限', trigger: 'change' },
          ]
        },
        forcasts: [],
        showAddForecastModal : false,
        queryString: '',
        showPrice: false,
        showSymbol: false,
        currentPrice: 0,
        form: {
          forecastPrice: '',
          deadline: '',
          unit: '',
          access: '',
          platform: '',
          symbol: ''
        },
        deadlines: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
        symbols: null,
        auth: auth,
        platforms: [],
        symbols: [],
        statusMap: {
          S: '正在进行中',
          Y: '成功',
          N: '失败'
        },
        statusColor: {
          S: '#7e98db',
          Y: '#67C23A',
          N: '#ec2546'
        }
    }
  },
  props:{
          pageSizes:Array,    //决定每页显示的条数[10,15,20,25]
          checkBox:Boolean,  //决定是否显示复选框
          description:String, //分页脚底左侧的数据说明
          tableHeight:Number,  //分页列表的高度
          pageSize:Number,
      },
  methods: {
    changeSize:function(){
       // this._data.tpageSize = this.pageSize;
      },
      handleSizeChange:function(size){
        console.log(size);
        //this.$emit("pageSizeChange",size);

      },
      handleCurrentChange:function(currentPage){
        this.currentPage=currentPage
        this.getForecast();
        //this.$emit("currentPageChange",currentPage);
      },
    platformSelected(id) {
      this.form.symbol = '';
      this.showSymbol = true;
      this.showPrice = false;
      this.getSymbols(id);
    },
    showAddForecast() {
       if(auth.getAuthenticatd()){
         this.showAddForecastModal = true;
        this.getPlatforms();
      }else{
          Vue.prototype.eventBus.$emit('notAuthed');
      }
     
    },
    getSymbols (platformId) {
      this.$http.get('api/v2/trade/platform/' + platformId + '/symbols')
        .then(res => {
          this.symbols = res.data;
      })
        .catch(err => {
          this.$message({
            message: '品种信息获取失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    getForecast() {
      this.$http.get('api/v2/forecast',{params: {
page:this.currentPage,limit:20}})
        .then(res => {
          this.totalCount=Number(res.data.total);
          this.forcasts = res.data.data;
      })
        .catch(err => {
          this.$message({
            message: '预测列表获取失败！',
            type: 'error',
            duration: 1000
          });
      });
    },
    getPlatforms() {
         this.$http.get('api/v2/trade/platform')
        .then(res => {
          this.platforms = res.data;
      })
        .catch(err => {
          this.$message({
            message: '交易平台获取失败！',
            type: 'error',
            duration: 1000
          });
      });    
    },
    addForecast: function() {
      var form = this.$refs.form;
      form.validate((valid) => {
        if ( valid ) {
          this.$http.post('api/v2/forecast', {
            symbol_id: this.form.symbol.id,
            symbols: this.form.symbol.symbols,
            platform_id: this.form.platform,
            price: this.currentPrice,
            for_price: this.form.forecastPrice,
            access: this.form.access,
            validity: this.form.deadline,
            validity_type: this.form.unit
          }, {
            headers: this.auth.getAuthHeader()
          })
            .then(res => {
              this.showAddForecastModal = false;
              this.$message({
                message: '添加预测成功！',
                type: 'success',
                duration: 1500
              });
              this.getForecast();
          })
            .catch(err => {
              this.$message({
                message: '添加预测失败！',
                type: 'error',
                duration: 1000
              });
          });
        }
      })
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    symbolSearch(queryString, cb) {
      this.showPrice = false;
      var symbols = this.symbols, results;
      if (symbols) {
        results = symbols.filter(this.createStateFilter(queryString));
        cb(results);
      } else {
        this.$http.get('api/v2/forecast/symbol')
          .then(res => {
            var data = res.data;
            var i, value = [];
            for( i=0; i < data.length; i++) {
              data[i].value = data[i].name;
            }
            this.symbols = results = data;
            cb(results);
        })
          .catch(err => {
            this.$message({
              message: '品种信息获取失败！',
              type: 'error',
              duration: 1000
            });
        });
      }
      this.queryString = queryString;
    },
    symbolSelected() {
      this.$http.get('api/v2/trade/price', {
        params: {
          platform_id: this.form.platform,
          symbols: this.form.symbol.symbols,
          symbol_id: this.form.symbol.id
        }
      })
        .then(res => {
          this.showPrice = true;
          this.currentPrice = res.data[0];
      })
        .catch(err => {
          this.$message({
            message: '品格价格获取失败！',
            type: 'error',
            duration: 1000
          });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app .table .el-table .cell{
  line-height: 35px;
}
</style>
<style scoped>
.pages{
padding-top: 40px;
}

.el-button.forcasat_btn{
  background: #e5000b;
   color: #fff;
}
.el-button.forcasat_btn{
  padding: 8px  16px;
}
.el-button.forcasat_btn:focus, .el-button.forcasat_btn:hover{
   background: #e70e19;
   color: #fff;
}
  .deadline .el-select {
    width: 106px;
  }
  .unit {
    margin-left: 5px;
  }
  .forecastPrice {
    width: 217px;
  }
  .comment {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    border-bottom: solid 1px #e6e6e6;
    font-size: 14px;
  }
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
