var index = 0,
	flag = 0;
var xzUninon = document.querySelector(".Unionpay");
var xzAli = document.querySelector(".Alipay");
var yinghang = document.querySelector(".yinghang");
var _account = document.querySelector("#_account");
xzUninon.onclick = function() {
	yinghang.style.display = "block";
	_account.style.display = "none";
	index = 0;
}
xzAli.onclick = function() {
	yinghang.style.display = "none";
	_account.style.display = "block";
	index = 1;
}
document.querySelector("#xingxi button").addEventListener('tap', function() {
	if(flag == 0) {
		flag = 1;
		if(index == 0) {
			if(isChinese($("#unionpay").val())) {
				if(verifyName($("#name").val())) {
					if(CheckBankNo($('#account'))) {
						addaccount($("#unionpay").val(), index);
					}
				}
			}
		} else {
			if(verifyName($("#name").val())) {
				if(checkPhone($('#account').val())) {
					if(toispasswd($("#_account").val(), $("#account").val())) {
						addaccount("支付宝", index);
					}
				}
			}
		};
		setTimeout(function() {
			flag = 0;
		}, 3000);
	}
});
//添加账户Ajax
function addaccount(title, type) {
	var wxid = localStorage.getItem("m_openid");
	mui.ajax( commonUrl + 'apigd/membercardadd', {
		data: {
			m_openid: wxid,
			data_name: $('#name').val(),
			data_code: $("#account").val(),
			data_bank: title,
			data_type: type
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 6000, //超时时间设置为6秒；
		success: function(data) {
			if(data.code == 1) {
				mui.toast("添加成功");
				creatMywebview("ListAccounts.html","ListAccounts.html");
			} else {
				mui.toast("网络错误");
			};
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}

//银行卡四位显示
document.querySelector('#account').onkeyup = function(event) {
	if(index == 0) {
		var v = this.value;
		if(/\S{5}/.test(v)) {
			this.value = v.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
		};
	};
};

$("#account").blur(function() {
	if(index == 0) {
		CheckBankNo($("#account"));
	} else {
		checkPhone($("#account").val());
	}
});
$("#_account").blur(function() {
	toispasswd($(this).val(), $("#account").val());
});
$("#name").blur(function() {
	verifyName($(this).val());
});
$("#unionpay").blur(function() {
	isChinese($(this).val());
});