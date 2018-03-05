var jschars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var code = "",
	res = "",
	captcha=document.querySelector(".captcha"),
	phone = "";
	 imgCaptcha();
document.querySelector(".captcha").addEventListener('tap', function() {
	var clock = '';
	var nums = 30;
	var btn;
	phone = $("#Phone").val();
	if(checkPhone(phone)) {
		if(imgnumber($('#imgnumber').val())) {
			authCode(phone);
		}
	};

	function sendCode(thisBtn) {
		btn = thisBtn;
		btn.disabled = true; //将按钮置为不可点击
		btn.innerHTML = "重新发送(" + nums + ")";
		thisBtn.style.background = "#999999";
		clock = setInterval(doLoop, 1000); //一秒执行一次
	}

	function doLoop() {
		nums--;
		if(nums > 0) {
			btn.innerHTML = "重新发送(" + nums + ")";
		} else {
			clearInterval(clock); //清除js定时器
			btn.disabled = false;
			btn.innerHTML = '重新发送';
			nums = 30; //重置时间
			document.querySelector(".captcha").style.background = "#fc5046";
		}
	}

//发送验证码
function authCode(phone) {
	mui.ajax(commonUrl + 'apigd/sendsms_lzbxxl', {
		data: {
			phone: phone,
			type: 'regcode',
			imgcodeflag: res,
			imgcode: $('#imgnumber').val()
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 6000, //超时时间设置为6秒；
		success: function(data) {
			if(data.code == 1) {
				mui.toast("成功发送短信")
				code = data.data.code;
				sendCode(captcha);
			} else if(data.code == -1) {
				mui.toast(data.msg);
				//mui.toast("验证码发送失败")
			} else if(data.code == -2) {
				mui.toast(data.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}
});
$("#Phone").blur(function() {
	checkPhone($("#Phone").val());
});
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
		if($("#Phone").val() == phone) {
			if(verifyCode()) {
				if(isPasswd($("#password").val())) {
					if(toispasswd($("#topassword").val(), $("#password").val())) {
						//加入Ajax
						signinAjax($("#Phone").val(), $("#password").val());
					}
				}
			}
		} else {
			mui.toast('该手机号未发送验证码');
		}
		setTimeout(function() {
			flag = 0;
		}, 3000);
	};
}
//注册Ajax
function signinAjax(phone, passwd) {
	mui.ajax(commonUrl + 'apigd/memberfindpwd', {
		data: {
			account: phone,
			m_password: passwd
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 6000, //超时时间设置为6秒；
		success: function(data) {
			if(data.code == 1) {
				mui.toast("修改成功,请重新登录")
				mui.openWindow({
					url: 'Login.html',
					id: 'Login.html'
				});
			} else if(data.code == -1) {
				mui.toast(data.msg);
			} else if(data.code == -2) {
				mui.toast(data.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}
//验证验证码
function verifyCode() {
	if($("#auth_code").val().length == 6 && code.length == 6) {
		if($("#auth_code").val() == code) {
			return true;
		} else {
			mui.toast('验证码错误');
			return false;
		}
	} else {
		mui.toast('验证码错误');
		return false;
	}
}
//		验证图片验证格式
function imgnumber(val) {
	if(val != 0 && val.length == 4) {
		return true;
	} else {
		mui.toast('图片验证码错误');
		return false;
	}
}
//图片验证码
function imgCaptcha() {
	res = generateMixed(20);
	$('.imgcaptcha img').attr('src', commonUrl + 'apigd/imgcode?width=50&height=20&flag=' + res);
}
//		随机数
function generateMixed(n) {
	var res = "";
	for(var i = 0; i < n; i++) {
		var id = Math.ceil(Math.random() * 35);
		res += jschars[id];
	}
	return res;
}