$(function() {
	$("#Phone").blur(function() {
		checkPhone($("#Phone").val());
	});
	$("#password").blur(function() {
		isPasswd($("#password").val());
	})
})
//登录Ajax
document.querySelector("#login").addEventListener('tap', function() {
	var isbutton=document.querySelector('#login button');
	var person=new addButton(isbutton);
	person.isbutton();
//	isbutton.attr('disabled',true);
	if(checkPhone($("#Phone").val())) {
		if($('#password').val()) {
			loginAjax($("#Phone").val(), $("#password").val());
		} else {
			mui.toast('密码不能为空');
		}
	}
//		setTimeout(function(){
//			isbutton.attr('disabled',false);
//		},1000);
});

function loginAjax(phone, passwd) {
	var datas = {
		clientid: token,
		account: phone,
		password: passwd
	};
	$.ajax(commonUrl + 'store/login', {
		data: datas,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 6000, //超时时间设置为6秒；
		success: function(data) {
			if(data.code == 1) {
				if(data.data == 2) {
					$('.SignPop2').removeClass('none');
					$('.SignPop .button button').bind('click', function() {
						window.location.href = 'index.html';
					});
				} else {
					if(data.data == 3) {
						$('.SignPop1').removeClass('none');
						$('.SignPop1 .button button').bind('click', function() {
							localStorage.setItem('phone',$("#Phone").val());
							localStorage.setItem('pwd',$("#password").val());
							window.location.href = 'resubmission.html';
						});
					} else {
						mui.toast("登录成功");
						localStorage.setItem('m_openid', data.data);
						console.log(token + '/' + data.data);
						setTimeout(function() {
							window.location.href = 'My_center.html';
						}, 1000)
					}
				}
			} else {
				mui.toast("账户或密码错误！");
			};
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}