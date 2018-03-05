var wxid = localStorage.getItem("m_openid");
mui.ajax(commonUrl + 'apigd/membertxset', {
	data: {
		m_openid: wxid
	},
	dataType: 'json', //服务器返回json格式数据
	type: 'post', //HTTP请求类型
	timeout: 6000, //超时时间设置为6秒；
	success: function(data) {
		if(data.code == 1) {
			$('.tishiyu span').html(data.data.tx_sxf);
		} else {
			mui.toast('请求失败');
		};
	},
	error: function(xhr, type, errorThrown) {
		//异常处理；
		mui.toast(RequestErrorMsg(type));
	}
});

mui.ajax(commonUrl + 'apigd/memberyue', {
	data: {
		m_openid: wxid
	},
	dataType: 'json', //服务器返回json格式数据
	type: 'get', //HTTP请求类型
	timeout: 6000, //超时时间设置为6秒；
	success: function(data) {
		if(data.code == 1) {
			$('.mybalance h2').html(is_null(data.data.yue_value_use) + "<span>元</span>");
			localStorage.setItem('yue', is_null(data.data.yue_value_use));
			$('.earning_w p').html(is_null(data.data.value2));
			$('.earning-L p').html(is_null(data.data.value1));
		} else {
			mui.toast('请求失败');
		};
		document.querySelector(".semit").addEventListener('tap', function() {
			if(data.data.yue_value_use > 0) {
				$('.tankuangyinying').fadeIn(100); //全局变得黑的效果，具体的div就是theme-popover-mask这个
				$('.tankuangleirong').fadeIn(200); //将隐藏的窗口div显示出来
			} else {
				mui.toast('余额不足');
			}
		})
	},
	error: function(xhr, type, errorThrown) {
		//异常处理；
		mui.toast(RequestErrorMsg(type));
	}
});
$(".tankuangleirong .goumai").click(function() {
	$('.tankuangyinying').fadeOut(100); //
	$('.tankuangleirong').fadeOut(200); //将显示的窗口隐藏起来
	creatMywebview("Selectaccout.html", "Selectaccout.html");
});

function is_null(data) {
	if(data == 'undefined' || data == undefined || data == "" || data == 0 || data == "0" || data == 'null' || data == null || data == 'false' || data == false) {
		return 0;
	} else {
		return data;
	}
}