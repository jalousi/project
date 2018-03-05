var index = 1;

function DetileAjax(index) {
	var length = 0,
		wxid = localStorage.getItem("m_openid");
	mui.ajax( commonUrl + 'apigd/memberyuelog', {
		data: {
			m_openid: wxid,
			page: index,
			pagesize: 10
		},

		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 6000, //超时时间设置为6秒；
		success: function(data) {
			if(data.code == 1) {
				var Data = data.data.listdata,
					x = "",
					y = "",
					z = "+",
					html = "";
				if(Data.length > 0) {
					for(var i = 0; i < Data.length; i++) {
						if(Data[i].op_type == 'cz') {
							y = "充值";
						} else {
							if(Data[i].op_type == 'tx') {
								y = "提现";
								z = "";
							} else {
								if(Data[i].op_type == 'yuepay') {
									y = "订单余额支付";
									z = "";
								} else {
									y = "商品分销";
								}
							}
						}
						if(Data[i].status == 1) {
							x = "交易成功";
						} else {
							if(Data[i].status == 2) {
								x = "待处理";
							} else {
								x = "交易失败";
							}
						};
						html += '<div class="main"><div class="main_top"><p><span>' + y + '</span></p>' +
							'<p>' + z + Data[i].value2 + '</p></div><div class="main_bottom"><p>' + Data[i].creat_at + '</p>' +
							'<p>' + x + '</p></div></div>';
						z = "+";
					};
					$(".detail").append(html);
					length = Data.length;
				} else {
					//mui.toast('没有更多数据');
				};
			} else {
				mui.toast("网络错误");
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
	return length;
}
DetileAjax(index);
mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style: 'circle',
			color: '#999999',
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			contentnomore: '没有更多数据了',
			callback: pullupRefresh
		}
	}
});

function pulldownRefresh() {
	setTimeout(function() {
		$('.detail').empty();
		DetileAjax(1);
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1000);
	mui('#pullrefresh').pullRefresh().refresh(true); //重置上拉加载
}

function pullupRefresh() {
	setTimeout(function() {
		index++;
		var _thislength = DetileAjax(index);
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(_thislength == 0); //参数为true代表没有更多数据了。
	}, 500);
}