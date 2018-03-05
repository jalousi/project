var wxid = localStorage.getItem("m_openid");

var _ischeck = 1;
var _money = '';
if(window.location.href.indexOf('ischeck') >= 0) {
	_ischeck = getQueryString('ischeck');
	_money = getQueryString('mytotal');
}

getYouhqList(_ischeck, _money);

function getYouhqList(_ischeck, _money) {
	mui.ajax(commonUrl + 'apigd/memberquanlist', {
		data: {
			m_openid: wxid,
			ischeck: _ischeck,
			money: _money,
			page: 1,
			pagesize: 50
		},
		type: 'post',
		dataType: 'json',
		timeout: 6000,
		success: function(data) {
			if(data.code == 1) {
				var _data = data.data.listdata;
				if(_data.length > 0) {
					var _yhqbox = $('.yhqbox');
					_yhqbox.empty();
					if(window.location.href.indexOf('mytotal') >= 0) {
						_yhqbox.addClass('mui-table-view-radio');
					};
					for(i = 0; i < _data.length; i++) {
						_yhqbox.append('<li class="mui-table-view-cell"><strong>￥<span class="yhqnum">' + _data[i].use_value + '</span></strong><div class="yhqinfo"><p class="yhqinfo-t">满' + _data[i].data_json.moneyt + '元可用，可使用一次</p><p class="yhqinfo-b">有效期至：<span class="endstime">' + _data[i].use_etime + '</span></p></div><input class="YouhqId" type="hidden" value="'+ _data[i].id +'"/></li>');
					}
					$('.mui-table-view-cell').click(function(){
						var _this = $(this);
						var _Youhqsnum = _this.find('.yhqnum').html();
						var _YouhqId = _this.find('.YouhqId').val();
						var wvs = plus.webview.getWebviewById('OrderSure.html');
						mui.fire(wvs, 'refreshYouhq', {
							Youhqsnum: _Youhqsnum,
							YouhqId: _YouhqId
						});
						setTimeout(function(){
							mui.back();
						},300)
					});
				} else {
					mui.plusReady(function() {
						plus.nativeUI.toast('无可用优惠券');
					})
				}
			} else if(data.code == -1) {
				mui.plusReady(function() {
					plus.nativeUI.toast('网络错误');
				})
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}