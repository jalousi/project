
$("#password").blur(function() {
	isPasswd($("#password").val());
})
$("#topassword").blur(function() {
	toispasswd($("#topassword").val(), $("#password").val());
})
document.querySelector('#submit').addEventListener('tap', sigonTap);

function sigonTap() {
	var flag = 0;
	if(flag == 0) {
		flag = 1;
		if(isPasswd($("#password").val())) {
			if(toispasswd($("#topassword").val(), $("#password").val())) {
				//加入Ajax
				findpasswrodAjax($("#rewpasswrod").val(), $("#password").val());
			}
		}
		setTimeout(function() {
			flag = 0;
		}, 3000);
	};
}

//修改密码Ajax
function findpasswrodAjax(passwd0, passwd) {
	var openid = localStorage.getItem('m_openid');
	mui.ajax(commonUrl + 'apigd/memberpaycodeeidt', {
		data: {
			m_openid: openid,
			paycode0: passwd0,
			paycode: passwd
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 6000, //超时时间设置为6秒；
		success: function(data) {
			if(data.code == 1) {
				mui.toast("修改成功!");
				setTimeout(function() {
					mui.back();
				}, 1000);
			} else {
				mui.toast("修改失败!");
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}

//自定义事件：选择地址之后刷新确认订单页面地址信息
document.addEventListener('backtoInfo', function() {
	mui.back();
});