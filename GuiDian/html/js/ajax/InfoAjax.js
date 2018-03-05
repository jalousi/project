window.onload = function Myinfo() {
	var wx = localStorage.getItem('m_openid');
	mui.ajax(commonUrl + 'apigd/member', {
		data: {
			m_openid: wx
		},
		type: "get",
		dataType: "json",
		"success": function(data) {
			if(data.code == 1) {
				$(".firster .headimgbox img").attr('src', is_null(data.data.data_json.pic, data.data.data_json.pic_def));
				$(".firster a p").html(is_null(data.data.m_nickname, data.data.m_account));
				localStorage.setItem('account', data.data.m_account);
				if(is_null(data.data.paycode,false) != false){
					$('.paypwd').hide();
				}
			} else {
				mui.plusReady(function() {
					//plus.nativeUI.toast('网络错误');
				})
			}
		}
	});
	decide();
}

function decide() {
	var wx = localStorage.getItem('m_openid'),
		index = "";
	mui.ajax(commonUrl +'apigd/checkisfx', {
		data: {
			m_openid: wx
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		success: function(data) {
			if(data.code == 1) {
				index = false;
			} else {
				index = true;
			}
			decidetap(index);
			vipOb(index);
		}
	});
}

function vipOb(index) {
	$('.blance').bind('tap', function() {
		if(index) {
			mui.toast("您还不是VIP会员");
		} else {
			creatMywebview('Mybalance.html', 'Mybalance.html');
		}
	})
	$('.vip').bind('tap', function() {
		if(index) {
			mui.toast("您还不是VIP会员");
		} else {
			creatMywebview('VipListPrev.html', 'VipListPrev.html');
		}
	})
	$('.order').bind('tap', function() {
		if(index) {
			mui.toast("您还不是VIP会员");
		} else {
			creatMywebview('OrderExtend.html', 'OrderExtend.html');
		}
	})
}

function is_null(data, index) {
	if(data == 'undefined' || data == undefined || data == "" || data == 0 || data == "0" || data == 'null' || data == null || data == 'false' || data == false) {
		return index;
	} else {
		return data;
	}
}

function decidetap(index) {
	$('.ShareQrCode').bind('tap', function() { //jquery的点击事件
		if(index) {
			$('.tankuangyinying').fadeIn(100); //全局变得黑的效果，具体的div就是theme-popover-mask这个
			$('.tankuangleirong').fadeIn(200); //将隐藏的窗口div显示出来
		} else {
			creatMywebview('MyQrCode.html', 'MyQrCode.html');
		}
	});
	$(".tankuangleirong .goumai").click(function() {
		$('.tankuangyinying').fadeOut(100); //
		$('.tankuangleirong').fadeOut(200); //将显示的窗口隐藏起来
	});
}

document.getElementById("logOut").addEventListener('tap', function() {
	var btnArray = ['取消', '确定'];
	mui.confirm('您确定退出登录吗？', '贵点', btnArray, function(e) {
		if(e.index == 1) {
			localStorage.setItem('m_openid', "");
			//弹出登录窗口
			mui.plusReady(function() {
				var loginwindow = plus.webview.getWebviewById('Login.html');
				if(loginwindow != '[object Object]') { //无登陆页面webview
					var mylogin = plus.webview.create('Login.html', 'Login.html', {
						top: '0px',
						bottom: '0px'
					});
					var aniShowM = 'pop-in';
					if(parseFloat(mui.os.version) < 4.4) { //Android平台暂时
						aniShowM = 'slide-in-right';
					}
					mylogin.addEventListener("titleUpdate", function() {
						setTimeout(function() {
							mylogin.show(aniShowM, 300);
						}, 0);
					});
				} else { //有登陆页面webview
					var aniShowM = 'pop-in';
					if(parseFloat(mui.os.version) < 4.4) { //Android平台暂时
						aniShowM = 'slide-in-right';
					}
					loginwindow.addEventListener("titleUpdate",
						function() {
							setTimeout(function() {
								loginwindow.show(aniShowM, 300);
							}, 0);
						});
				};
				var motherwindow = plus.webview.getLaunchWebview();
				//触发首页webview上自定义的事件
				mui.fire(motherwindow, 'refueshpage-logout');
				mui.fire(motherwindow, 'refreshTrolley-logout');
			})
		}
	})
});