$(function() {
		var tokenlogin = localStorage.getItem('m_openid');
		getBalance();
		userphone();
	//	当前余额
	function getBalance() {
		var datas = {
			token: tokenlogin,
		};
		datas = api_com_ps(datas);
		var opsx = {
			url: commonUrl + 'store/getBalance',
			method: 'POST',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			if(data.code == 1) {
				var users = data.data;
				$('header h3 span').html(changeTwoDecimal_f(users.yue_cz));
			}
		})
	}
	//	获取当前手机号
	function userphone() {
		var datas = {
			token: tokenlogin
		}
		datas = api_com_ps(datas);
		//				console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'store/getData',
			method: 'get',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			var users = data.data;
			$('.phone h3').html(users.account);
		});
		memberCzHdList();
		modDocRows();
	}
//	获取充值规则
function modDocRows() {
		var datas = {
			did:9
		}
		datas = api_com_ps(datas);
		//				console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'appcom/modDocRows',
			method: 'get',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			var users=data.data;
			$('.rule div').html(users.content);
		});
	}
//	获取充值列表
	function memberCzHdList() {
		var datas = {
		}
		datas = api_com_ps(datas);
		//				console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'appcom/memberCzHdList',
			method: 'get',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			$('#template1').tmpl(data).appendTo('.money_list');
			$('.bottom .msize').html(changeTwoDecimal_f(data.data[0].data_json.price_max));
			moneysize();
		  $('.recharge .bottom').bind('click', function() {
			userRecharge();
		})
		});
	}
	
	//	充值金额点击切换
	function moneysize() {
		$('.money_list section').bind('click', function() {
			$(this).siblings().removeClass('selected');
			$(this).addClass('selected');
			$('.bottom .msize').html(changeTwoDecimal_f($(this).html()));
		})
		$('.money_list section input').bind('input oninput',function() {
			$('.bottom .msize').html(changeTwoDecimal_f($(this).val()));
		})
	}

	//点击充值

	function userRecharge() {
		var datas = {
			token: tokenlogin,
			money: $('.bottom .msize').html()
		}
		datas = api_com_ps(datas);
//						console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'store/userRecharge',
			method: 'POST',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			if(data.code == 1) {
				localStorage.setItem('orderid', data.data);
				GainopenID();
			}
		});
	}
	//获取网页授权的code
	function GainopenID() {
			var ajaxurl = commonUrl + "weixin/getWebSqUrl";
			var ps = {
				rurl: "http://www.yyylsx.com/weixin/Wechatpay.html",
				scope: 'snsapi_base'
			};
			ps = api_com_ps(ps);
			$.post(ajaxurl, ps, function(json) {
				var data = JSON.parse(json);
				if(data.code == 1) {
					var squrl = data.data;
					window.location.href = squrl;
				}
			});
	}
})