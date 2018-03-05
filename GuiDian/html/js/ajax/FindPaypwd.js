var code = "",
	phone = "";
document.querySelector(".captcha").addEventListener('tap', function() {
	var clock = '';
	var nums = 30;
	var btn;
	var captcha=document.querySelector(".captcha");
	phone = $("#Phone").val();
	if(checkPhone(phone)) {
		authCode(phone);
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
	var wxid = localStorage.getItem("m_openid");
	mui.ajax(commonUrl + 'apigd/sendsms_logined', {
		data: {
			phone: phone,
			type: 'findcode',
			m_openid: wxid
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 6000, //超时时间设置为6秒；
		success: function(data) {
			if(data.code == 1) {
				mui.toast("成功发送短信")
				code = data.data.code;
				sendCode(captcha);
			} else {
				mui.toast(data.msg)
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
						//        加入Ajax
						signinAjax($("#password").val());
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
//找回支付密码
function signinAjax(passwd) {
	var openid = localStorage.getItem('m_openid');
	mui.ajax(commonUrl + 'apigd/memberpaycodefind', {
		data: {
			m_openid: openid,
			paycode: passwd
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 6000, //超时时间设置为6秒；
		success: function(data) {
			if(data.code == 1) {
				mui.toast("修改成功,请牢记您的支付密码!");
				var old_back = mui.back;
				mui.back = function() {
					old_back();
					var backtoInfo = plus.webview.getWebviewById('ChangePaypwd.html');
					mui.fire(backtoInfo, 'backtoInfo');
				};
				mui.back();
//				setTimeout(function() {
//					mui.back = function() {
//						mui.openWindow('MyInfoEdit.html');
//					};
//					mui.back();
//				}, 1000)
			} else {
				if(data.code == '-2') {
					mui.toast("修改失败");
				}
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