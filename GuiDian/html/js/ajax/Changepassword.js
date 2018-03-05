
$("#Phone").blur(function() {
	checkPhone($("#Phone").val());
});
$("#password").blur(function() {
	isPasswd($("#password").val());
});
$("#topassword").blur(function() {
	toispasswd($("#topassword").val(), $("#password").val());
});
document.querySelector('#submit').addEventListener('tap', sigonTap);

function sigonTap() {
	var flag = 0;
	if(flag == 0) {
		flag = 1;
		if(checkPhone($("#Phone").val())) {
			if(isPasswd($("#password").val())) {
				if(toispasswd($("#topassword").val(), $("#password").val())) {
					//加入Ajax
					findpasswrodAjax($("#rewpasswrod").val(), $("#password").val());
				}
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
	mui.ajax( commonUrl + 'apigd/memberpwd', {
		data: {
			m_openid: openid,
			m_password0: passwd0,
			m_password: passwd
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 6000, //超时时间设置为6秒；
		success: function(data) {
			if(data.code == 1) {
				mui.toast("修改成功,请重新登录")
				localStorage.setItem('m_openid', "");
				localStorage.setItem('ifchangepwd', "istrue");
				mui.openWindow({
					url: 'Login.html',
					id: 'Login'
				});
			} else {
				mui.toast("手机号或密码错误");
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}