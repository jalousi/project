
$(function() {
	var jschars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	var code = "",
		res = "",
		type = '',
		phone = "";
	var captcha = document.querySelector(".captcha");
	if($('head title').html() == '忘记密码') {
		var forget=true;
		type = 'findcode';
	} else {
		type = 'regcode';
	}
	//		获取图片验证码
	imgCaptcha();
	$('.imgcaptcha').bind('click', function() {
		imgCaptcha();
	})
	captcha.addEventListener('tap', function() {
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
			$(".captcha").addClass('click');
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
				$(".captcha").removeClass('click');
			}
		}
		//发送验证码
		function authCode(phone) {
//			console.log(type+'_'+token);
			var psajax = {
				clientid: token,
				phone: phone,
				type: type,
				imgcodeflag: res,
				imgcode: $('#imgnumber').val()
			};
			var datas = get_post_ps(psajax);
			$.ajax(commonUrl + 'others/sendSms', {
				data: datas,
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
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
	$("#name").blur(function() {
		verifyName($("#name").val());
	})
	$("#SHname").blur(function() {
		isChinese($("#SHname").val());
	})
	//点击注册事件
	document.querySelector('#step1').addEventListener('tap', sigonTap1);
	if(forget){
		document.querySelector('#complete').addEventListener('tap', function(){
		complete($('#Phone').val()+"_"+type);
	});
	}else{
	var step2 = document.querySelector('#step2');
	var step3 = document.querySelector('#step3');
		step2.addEventListener('tap', sigonTap2);
		step3.addEventListener('tap', sigonTap3);
	}
	//步骤1
	function sigonTap1() {
     var isbutton=document.querySelector('#step1 button');
	var person=new addButton(isbutton);
	person.isbutton();
			if($("#Phone").val() == phone && checkPhone($("#Phone").val())) {
				if(verifyCode()) {
					$('.step1').addClass('none');
					$('.step2').removeClass('none');
				}
			} else {
				mui.toast('该手机号未发送验证码');
			}
	}
	//	步骤2
	function sigonTap2() {
		 var isbutton=document.querySelector('#step2 button');
	var person=new addButton(isbutton);
	person.isbutton();
			if(isPasswd($("#password").val())) {
				if(toispasswd($("#topassword").val(), $("#password").val())) {
					$('.step2').addClass('none');
					$('.step3').removeClass('none');
				}
			}
	}
	//  步骤三
	function sigonTap3() {
var isbutton=document.querySelector('#step3 button');
	var person=new addButton(isbutton);
	person.isbutton();
			if(verifyName($("#name").val())) {
				if(isChinese($("#SHname").val())) {
					if(imgSrc[1] && imgSrc[2] && imgSrc[3]) {
						signinAjax($('#Phone').val(), $('#password').val(), $('#Phone').val() + "_regcode", $('#auth_code').val(), $('#name').val(), $('#SHname').val());
					} else {
						mui.toast("您还未传完所需的图片")
					}
				}
			}
	}
	//注册Ajax
	function signinAjax(phone, passwd, flag, smscode, name, shopname) {
		var data_json = {
			datajson_id_front: imgSrc[1],
			datajson_id_reverse: imgSrc[2],
			datajson_businesslicense: imgSrc[3]
		};
		data_json = JSON.stringify(data_json)
		var psajax = {
			clientid: token,
			account: phone,
			password: passwd,
			smscodeflag: flag,
			smscode: smscode,
			truename: name,
			shopname: shopname,
			data_json: data_json
		};
		var datas = get_post_ps(psajax);
		$.ajax(commonUrl + 'store/userReg', {
			data: datas,
			dataType: 'json',
			type: 'post',
			timeout: 6000,
			success: function(data) {
				if(data.code == 1) {
					$('.SignPop').removeClass('none');
					$('.SignPop .button button').bind('click',function(){
						window.location.href='index.html';
					});
				} else {
					if(data.code == '-2') {
						mui.toast(data.msg);
					} else {
						mui.toast("注册失败")
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
		$('.imgcaptcha img').attr('src', commonUrl + 'others/imgCodeGet?width=60&height=30&flag=' + res + '&clientid=' + token);
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

	//将图片压缩转成base64
	function convertImgToBase64(url, callback, outputFormat) {
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var img = new Image;
		img.crossOrigin = 'Anonymous';
		img.onload = function() {
			var width = img.width;
			var height = img.height;
			// 按比例压缩 rate 倍
			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
			var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg', 0.5);
			callback.call(this, dataURL);
			canvas = null;
		};
		img.src = url;
	}

	function getObjectURL(file) {
		var url = null;
		if(window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if(window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if(window.webkitURL != undefined) { // web_kit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	}
	var imgSrc = [];
	var mask=spinMask();
	// 前端只需要给input file绑定这个change事件即可（上面两个方法不用管）huodong-msg为input class
	$('#fileSelect1').bind('change', function() {
		updata($('.left div img'), 1, $('#fileSelect1'));
	});
	$('#fileSelect2').bind('change', function() {
		updata($('.right div img'), 2, $('#fileSelect2'));
	});
	$('#fileSelect3').bind('change', function() {
		updata($('.charter div img'), 3, $('#fileSelect3'));
	});

	function updata(Class, index, Object) {
		var imageUrl = getObjectURL(Object[0].files[0]);
		mask.show();
		convertImgToBase64(imageUrl, function(base64Img) {
			
			update_head_img(base64Img, index,Class);
			// base64Img为转好的base64,放在img src直接前台展示(<img src="data:image/jpg;base64,/9j/4QMZRXh...." />)
			//alert(base64Img);
			// base64转图片不需要base64的前缀data:image/jpg;base64
			//alert(base64Img.split(",")[1]);
		});
		event.preventDefault();
	}
	//更新用户头像
	function update_head_img(base64Img, index,Class) {
		//先上传
		var datas = {
			data: base64Img,
			clientid: token
		}
		$.post(commonUrl + 'others/upload2', datas, function(data) {
			if(data.code == 1) {
				mui.toast('图片上传成功');
				//			console.log(data.data.full_url);
				imgSrc[index] = data.data.full_url;
				Class.attr('src', imgSrc[index]);
				//触发首页webview上自定义的刷新个人信息和购物车事件
			} else {
				mui.toast("图片上传失败");
			}
			mask.close();
		}, 'json');
	}
	//注册
})