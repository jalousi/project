var wxid = localStorage.getItem("m_openid");
var _orderid = getQueryString('orderid');
var amount = getQueryString('finalPaynum');

$('#Surepay').click(function() {
	var channel_id;
	$('.payway').each(function() {
		var $this = $(this);
		if($this.hasClass('mui-selected')) {
			channel_id = $this.find('.checkgroup').attr('id');
			if(channel_id == 'yuepay') {
				showMask();
//				var btnArray = ['确定', '取消'];
//				mui.confirm('将直接从您余额扣取，是否继续?', '温馨提示', btnArray, function(e) {
//					if(e.index == 1) {} else {
//						mui.getJSON(commonUrl + 'apigd/yuepay', {
//							m_openid: wxid,
//							orderid: _orderid,
//							total: amount
//						}, function(data) {
//							switch(data.code) {
//								case -2:
//									plus.nativeUI.toast(data.msg);
//									break;
//								case -1:
//									plus.nativeUI.toast('支付失败');
//									break;
//								case 1:
//									plus.nativeUI.toast('支付成功');
//									var motherwindow = plus.webview.getLaunchWebview();
//									mui.fire(motherwindow, 'refueshMyInfo');
//									setTimeout(function() {
//										plus.webview.show(motherwindow);
//									}, 1500)
//									break;
//								default:
//									plus.nativeUI.toast('未知错误');
//									break;
//							}
//						});
//					}
//				});
			} else {
				pay(channel_id);
			}
		}
	});
})

var pays = {};

function plusReady() {
	// 获取支付通道
	plus.payment.getChannels(function(channels) {
		for(var i in channels) {
			var channel = channels[i];
			if(channel.id == 'qhpay' || channel.id == 'qihoo') { // 过滤掉不支持的支付通道：暂不支持360相关支付
				continue;
			}
			pays[channel.id] = channel;

			checkServices(channel);
		}
	}, function(e) {
		console.log('获取支付通道失败：' + e.message);
	});
}
document.addEventListener('plusready', plusReady, false);
// 检测是否安装支付服务
function checkServices(pc) {
	if(!pc.serviceReady) {
		var txt = null;
		switch(pc.id) {
			case 'alipay':
				txt = '检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？';
				break;
			default:
				txt = '系统未安装“' + pc.description + '”服务，无法完成支付，是否立即安装？';
				break;
		}
		plus.nativeUI.confirm(txt, function(e) {
			if(e.index == 0) {
				pc.installService();
			}
		}, pc.description);
	}
}

var w = null;

// 支付
function pay(id) {
	if(w) {
		return;
	} //检查是否请求订单中
	if(id === 'appleiap') {
		console.log('应用内支付');
		//clicked('payment_iap.html');
		return;
	}
	console.log('----- 请求支付 -----');
	var url;
	if(id == 'alipay') {
		url = commonUrl + 'apigd/h5alipayreq';
	} else if(id == 'wxpay') {
		url = commonUrl + 'apigd/wxjspayreq';
	} else {
		plus.nativeUI.alert('当前环境不支持此支付通道！', null, '捐赠');
		return;
	}
	//var appid = plus.runtime.appid;

	url += '?orderid=' + _orderid + '&total=' + amount + '&m_openid=' + wxid;

	w = plus.nativeUI.showWaiting();
	// 请求支付订单
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
			case 4:
				w.close();
				w = null;
				if(xhr.status == 200) {
					console.log('----- 请求订单成功 -----');
					console.log(xhr.responseText);
					var _responseText = JSON.parse(xhr.responseText);
					var order;
					switch(_responseText.code) {
						case -2:
							plus.nativeUI.toast(_responseText.msg);
							break;
						case -1:
							plus.nativeUI.toast('发起支付失败');
							break;
						case 1:
							order = _responseText.data;
							break;
						default:
							plus.nativeUI.toast('未知错误');
							break;
					}
					plus.payment.request(pays[id], order, function(result) {
						console.log('----- 支付成功 -----');
						console.log(JSON.stringify(result));
						var motherwindow = plus.webview.getLaunchWebview();
						mui.fire(motherwindow, 'refueshpage');
						plus.webview.show(motherwindow);
						plus.nativeUI.alert('支付成功：感谢你的支持，我们会继续努力完善产品。', function() {}, '贵点');
					}, function(e) {
						console.log('----- 支付失败 -----');
						console.log('[' + e.code + ']：' + e.message);
						switch(e.code) {
							case -100:
								plus.nativeUI.toast('用户取消!');
								break;
							default:
								break;
						}
					});
				} else {
					console.log('----- 请求订单失败 -----');
					console.log(xhr.status);
					mui.alert('获取订单信息失败！请检查您的网络是否正常', '贵点', function() {});
				}
				break;
			default:
				break;
		}
	}
	xhr.open('GET', url);
	console.log('请求支付订单：' + url);
	xhr.send();
}

(function(w) {
	document.addEventListener('plusready', function() {
		console.log("Immersed-UserAgent: " + navigator.userAgent);
	}, false);

	var immersed = 0;
	var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
	if(ms && ms.length >= 3) {
		immersed = parseFloat(ms[2]);
	}
	w.immersed = immersed;

	if(!immersed) {
		return;
	}
	var t = document.getElementById('header');
	t && (t.style.paddingTop = immersed + 'px', t.style.background = '#D74B28', t.style.color = '#FFF');
	t = document.getElementById('content');
	t && (t.style.marginTop = immersed + 'px');
	t = document.getElementById('scontent');
	t && (t.style.marginTop = immersed + 'px');
	t = document.getElementById('dcontent');
	t && (t.style.marginTop = immersed + 'px');
	t = document.getElementById('map');
	t && (t.style.marginTop = immersed + 'px');
})(window);