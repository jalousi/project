var wxid = localStorage.getItem("m_openid");

var _conter = $('.OrderList .ddxq');
_conter.empty();

var _addressid = 0;
var _mytotal;
var _YouhqId;
var goodstype = getQueryString('type');
var _translatefee = 10;
if(goodstype=='fx'){
	$('.translatefee').hide();
	_translatefee = 0;
}

getAddressList();
getCartbuyList();

//自定义事件：选择地址之后刷新确认订单页面地址信息
document.addEventListener('refreshMyAddr', function() {
	getAddressList();
});

//自定义事件：取消订单之后，返回确认订单之前的页面
document.addEventListener('backtoGoods', function() {
	mui.back();
});

function getAddressList() {
	mui.getJSON(commonUrl + 'apigd/memberaddress', {
		m_openid: wxid,
		page: 1,
		pagesize: 10
	}, function(data) {
		var Data = data.data.listdata;
		if(Data.length > 0) {
			$('.Mychoseaddr').empty();
			var _addrindex = 0;
			var oaddrid = localStorage.getItem('addrid');
			if(oaddrid != null) {
				for(var i = 0; i < Data.length; i++) {
					if(Data[i].id == oaddrid) {
						_addrindex = i;
					}
				}
			}
			$('.Mychoseaddr').prepend('<div class="mrsite"><a href="MyAddrManage.html?isOrderSure" class="clearfix"><img src="images/location.png"><div class="dzxx"><p>收货人：<span class="xm">' + Data[_addrindex].man + '</span><span class="hm">' + Data[_addrindex].tel + '</span></p><p><span class="shdz">收货地址：</span><span class="dz">' + Data[_addrindex].address + '</span></p></div></a></div>');
			_addressid = Data[_addrindex].id;
			localStorage.removeItem('addrid');
		}
	});
}

function getCartbuyList() {
	mui.ajax(commonUrl + 'apigd/cartbuylist', {
		data: {
			m_openid: wxid
		},
		dataType: 'json',
		type: 'post',
		timeout: 6000,
		success: function(data) {
			if(data.code == 1) {
				var _data = data.data;
				var _imgsrc;
				for(var i = 0; i < _data.length; i++) {
					var _attrs = (_data[i].buys.attrs).replace(',', '<em class="paddingem"></em>');
					_imgsrc = _data[i].goods.data_json.pic_wh_60x60 || _data[i].goods.data_json.pic_wh_200x200 || _data[i].goods.data_json.pic || _data[i].goods.data_json.pics;
					_conter.append('<div class="splb"><img src="' + _imgsrc + '"><div class="spsm"><h2>' + _data[i].goods.title + '</h2><span class="rules">' + _attrs + '</span><p>¥' + _data[i].buys.price + '</p></div><p>×<span>' + _data[i].buys.number + '</span></p></div>');
				};
				if(window.location.href.indexOf('mytotal=') >= 0) {
					_mytotal = parseFloat(getQueryString('mytotal')).toFixed(2);
				} else {
					_mytotal = (parseFloat(_data[0].buys.price) * _data[0].buys.number).toFixed(2);
				}
				$('.ddzj span').html('￥ ' + _mytotal);
				$('footer .hj .finalprice').html('￥ ' + (parseFloat(_mytotal) + _translatefee).toFixed(2));		//默认加10元运费
				$('.selectyhq a').attr('href', 'MyYouhq.html?ischeck=1&mytotal=' + _mytotal);
			} else if(data.code == -1) {
				plus.nativeUI.toast('订单信息错误!');
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}

//自定义事件：确认订单 ---- 获取选中的优惠券的面值
document.addEventListener('refreshYouhq', function(event) {
	var _Youhqsnum = parseFloat(event.detail.Youhqsnum);
	_YouhqId = event.detail.YouhqId;
	$('.selectyhq .right').empty().append('<span class="yhqprice">-￥' + _Youhqsnum + '</span>');
	$('.youhprice').html(_Youhqsnum);
	var _finalnum = parseFloat(_mytotal) - parseFloat(_Youhqsnum) + _translatefee;		//默认加10元运费
	$('footer .hj .finalprice').html('￥ ' + _finalnum.toFixed(2));
});

//点击提交订单按钮提交订单
mui(".tjdd").on('tap', '.SubmitOrder', function() {
	if(_addressid == 0) {
		plus.nativeUI.toast('请填写配送地址');
	} else {
		mui.ajax(commonUrl + 'apigd/cartorder', {
			data: {
				m_openid: wxid,
				data_addressid: _addressid,
				type: goodstype,
				quanid: _YouhqId
			},
			dataType: 'json',
			type: 'post',
			timeout: 6000,
			success: function(data) {
				if(data.code == 1) {
					var motherwindow = plus.webview.getLaunchWebview();
						mui.fire(motherwindow, 'refreshTrolleyList');
						mui.fire(motherwindow, 'refreshTrolley',{
							goodsnum: 0
						});
					creatMywebview('OrderPay.html?orderid=' + data.data.orderid, 'OrderPay.html');
				} else if(data.code == -1) {
					plus.nativeUI.toast('请勿重复提交订单');
				} else if(data.code == -2) {
					plus.nativeUI.toast(data.msg);
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				mui.toast(RequestErrorMsg(type));
			}
		});
	}
})