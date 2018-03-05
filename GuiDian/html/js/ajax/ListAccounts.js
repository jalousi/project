//账户列表
var Data = "",
	wxid = localStorage.getItem("m_openid");
mui.ajax(commonUrl + 'apigd/membercardlist', {
	data: {
		m_openid: wxid
	},
	dataType: 'json', //服务器返回json格式数据
	type: 'get', //HTTP请求类型
	timeout: 6000, //超时时间设置为10秒；
	success: function(data) {
		if(data.code == 1) {
			Data = data.data.listdata,
				html = "";
			for(var i = 0; i < Data.length; i++) {
				if(Data[i].type == 0) {
					var code = Data[i].code.split(" ");
					code = code[code.length - 1];
					html += '<div class="mui-table-view-cell"><div class="mui-slider-right mui-disabled">' +
						'<buttom class="mui-btn mui-btn-red">删除</buttom></div><div class="mui-slider-handle payway">' +
						'<label class="checkgroup"><div class="payway-l"><p class="Unionpay"><sapn>银联账户</sapn>' +
						'<span>****&nbsp;****&nbsp;****&nbsp;' + code + '</span></p></div></label></div></div>'
				} else {
					html += '<div class="mui-table-view-cell"><div class="mui-slider-right mui-disabled">' +
						'<buttom class="mui-btn mui-btn-red">删除</buttom></div><div class="mui-slider-handle payway">' +
						'<label class="checkgroup"><div class="payway-l"><p class="Alipay"><span>支付宝账户</span>' +
						'<span>' + Data[i].code.substr(0, 3) + '****' + Data[i].code.substr(7, 4) + '</span></p></div></label></div></div>'
				}
			}
			$(".Conter").html(html);
			tap()
		} else {
			mui.toast("网络错误");
		};
	},
	error: function(xhr, type, errorThrown) {
		//异常处理；
		mui.toast(RequestErrorMsg(type));
	}
});
//				账户删除
function tap() {
	$(".mui-btn").bind('tap', function() {
		var num = $(this).parent().parent().index();
		var parpen = $(this).parent().parent();
		var btnArray = ['取消', '确定'];
		mui.confirm('您确定删除该账户吗？', '贵点', btnArray, function(e) {
			if(e.index == 1) {
				mui.ajax(commonUrl + 'apigd/membercarddel', {
					data: {
						m_openid: wxid,
						did: Data[num].id
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					timeout: 6000, //超时时间设置为6秒；
					success: function(data) {
						if(data.code == 1) {
							mui.toast("成功删除");
							parpen.remove();
							mui.ajax(Url + 'apigd/membercardlist', {
								data: {
									m_openid: wxid
								},
								dataType: 'json',
								type: 'get',
								timeout: 6000, 
								success: function(data) {
									Data = data.data.listdata;
								},
								error: function(xhr, type, errorThrown) {
									//异常处理；
									mui.toast(RequestErrorMsg(type));
								}
							})
						} else {
							mui.toast("删除失败");
						};
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						mui.toast(RequestErrorMsg(type));
					}
				});
			}
		});
	});
}