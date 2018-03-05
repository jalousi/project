var commonUrl = 'http://www.yyylsx.com/appapi/api/';
var shareUrl = 'http://gd.hngdstny.com/';
var goodsshareurl = 'http://gd.hngdstny.com/wxgzh/';
//后退按钮强制刷新
window.onpageshow=function(e){
    var a=e||window.event;
    if(a.persisted){
        window.location.reload();
    }
}
//刷新购物车角标
var refreshTrolley_badge=function(){
	var tokenlogin=localStorage.getItem('m_openid');
	if(tokenlogin){
	var datas = {
				token: tokenlogin,
				cart_type: 'cart'
			};
			datas = api_com_ps(datas);
			//					console.log(JSON.stringify(datas));
			var opsx = {
				url: commonUrl + 'store/cartList',
				method: 'GET',
				data: datas,
				datatype: 'json',
			};
			api_call(opsx, function(data) {
				if(data.code!=-9){
				var users = data.data.lists;
				if(users.length == 0) {
					$('.mui-badge').removeClass('one');
				} else {
					$('.mui-badge').html("<span>"+users.length+"</span");
					$('.mui-badge').addClass('one');
				}
				}else{
					$('.mui-badge').removeClass('one');
				}
			})
			}else{
				$('.mui-badge').removeClass('one');
			}
}
//获取公用token
var token = (function() {
	var _token = localStorage.getItem('token');
	if(! _token) {
		$.ajax({
			type: "post",
			url: commonUrl + "others/apiValid",
			async: true,
			dataType: 'json',
			success: function(result) {
				_token = result.data;
				localStorage.setItem('token', _token);
//		     window.location.reload();
			}
		});
	}
	return _token;
})();
//创建并打开新的webview
function creatMywebview(_webviewUrl, _webviewId) {
	window.location.href = _webviewUrl;
}
//按钮点击间隔构造函数
var addButton=function(btn){
	this.isbutton=function(){
		btn.disabled=true;
		setTimeout(function(){
			btn.disabled=false;
		},1000)
	};
}
//加载等待框
var spinMask=function(){
var mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；
var opts = {
  lines: 10, // The number of lines to draw
  length: 10, // The length of each line
  width: 2, // The line thickness
  radius: 6, // The radius of the inner circle
  scale: 0.1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#ffffff', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  opacity: 0.1, // Opacity of the lines
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  speed: 1, // Rounds per second
  trail: 80, // Afterglow percentage
  fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: 'auto', // Top position relative to parent
  left: 'auto', // Left position relative to parent
  shadow: 'none', // Box-shadow for the lines
  position: 'absolute' // Element positioning
};
mask.show();
var target = document.querySelector('.mui-backdrop');
var spinner = new Spinner(opts);
spinner.spin(target);
mask.close();
return mask;
}
//处理浮点数计算问题
function changeTwoDecimal_f(x) {
	var f_x = parseFloat(x);
	if(isNaN(f_x)) {
//		alert('function:changeTwoDecimal->parameter error');
		return false;
	}
	var f_x = Math.round(x * 100) / 100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if(pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while(s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}
//判断值是否有效
//function is_null(data, index) {
//	if(data == 'undefined' || data == undefined || data == "" || data == 0 || data == "0" || data == 'null' || data == null || data == 'false' || data == false) {
//		return index;
//	} else {
//		return data;
//	}
//}
//公用参数
function api_com_ps(ops) {
	ops.clientid = token;
	return ops;
}
//判断是否登录
function istoken() {
	if(localStorage.getItem('m_openid')) {
		return true;
	} else {
		return false;
	}
}

function promptLogin() {
	var btnArray = ['再逛逛', '去登录'];
	mui.confirm('您还未登录账号哦', '悠悠雨', btnArray, function(e) {
		if(e.index == 1) {
			window.location.href = 'login.html';
		} else {
			window.location.href = 'index.html';
		}
	})
	window.stop();
}
//刷新购物车
//function refreshTrolley() {
//	//触发首页webview上自定义的刷新购物车事件
//	mui.fire(motherwebview, 'refreshTrolleyList');
//	refreshTrolley_badge();
//}
//
////刷新购物车角标
//function refreshTrolley_badge() {
//	//触发首页webview上自定义的刷新购物车角标
//	mui.fire(motherwebview, 'refreshTrolley-badge');
//	mui.fire(motherwebview, 'refreshTrolley');
//}

//加入购物车或立即购买
function joinTrollry(_id, _numb, _attrs, _cart_type, _goodstype, _tabIndex) {
	var wxid = localStorage.getItem("m_openid");
	if(wxid) {
		var psajax = {
			m_openid: wxid,
			cart_type: _cart_type,
			gid: _id,
			number: _numb,
			attrs: _attrs
		};
		var datas = get_post_ps(psajax);
		$.post(commonUrl + 'apigd/cartadd', datas, function(data) {
			if(data.code == 1) {
				if(_tabIndex == 2) {
					creatMywebview('OrderSure.html?type=' + _goodstype, 'OrderSure.html');
				} else {
					mui.toast('加入购物车成功');
					refreshTrolley();
				}
			} else {
				mui.toast('加入购物车失败');
			}
		}, 'json');
	} else {
		//弹出登录窗口
		window.location.href = 'Login.html';
	};
}

//请求错误的错误信息提示
function RequestErrorMsg(_code) {
	var ErrorMsg;
	switch(_code) {
		case 'timeout':
			ErrorMsg = '啊噢~网络有点不给力呢,请重试~';
			break;
		case 'abort':
			ErrorMsg = '啊噢~网络中断了,请检查您的网络~';
			break;
		default:
			ErrorMsg = '啊噢~加载失败了~';
			break;
	}
	return ErrorMsg;
}

//获取url中的数据
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
};

//在url后加入需传递的数据
function jointUrl(num1, num2, num3) {
	var Href = num1 + "?id=" + num2 + "&catid=" + num3;
	return Href;
}

//验证姓名
function verifyName(val) {
	var reg = /^[\u4E00-\u9FA5]{2,4}$/;
	if(!reg.test(val)) {
		mui.toast("请输入正确的姓名");
		return false;
	} else {
		return true;
	}
}

//验证中文
function isChinese(temp) {
	if(!temp == "") {
		var re = /[^\u4e00-\u9fa5]/;
		if(re.test(temp)) {
			mui.toast('请输入中文');
			return false;
		} else {
			return true;
		}
	} else {
		mui.toast("商户名称不能为空");
	}
}

//验证手机号
function checkPhone(phone) {
	if(!(/^1[34578]\d{9}$/.test(phone))) {
		mui.toast("请输入正确的手机号");
		return false;
	} else {
		return true;
	}
}

//字符串去点空格
function Trim(str, is_global) {
	var result;
	result = str.replace(/(^\s+)|(\s+$)/g, "");
	return result;
};　
//验证银行卡
function CheckBankNo(t_bankno) {  　　
	var bankno = Trim(t_bankno.val(), "g");
	if(bankno == "") {    　　
		mui.toast("请填写银行卡号");     
		return false;   
	}   
	if(bankno.length < 16 || bankno.length > 19) {     
		mui.toast("银行卡号长度必须在16到19之间");     
		return false;   
	}   
	var num = /^\d*$/; //全数字
	   
	if(!num.exec(bankno)) {     
		mui.toast("银行卡号必须全为数字");     
		return false;   
	}    //开头6位
	   
	var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";   
	if(strBin.indexOf(bankno.substring(0, 2)) == -1) {     
		mui.toast("银行卡号开头6位不符合规范");     
		return false;   
	}     
	mui.toast("验证通过!");     
	return true;   
}

//验证密码
function isPasswd(s) {
	var patrn = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+){6,15}$/;
	if(!patrn.exec(s)) {
		mui.toast('请输入正确密码');
		return false;
	} else {
		return true;
	}
}

//二次验证密码
function toispasswd(a, b) {
	if(a === b) {
		return true;
	} else {
		mui.toast('两次输入的账号不一样')
		return false;
	};
}

//公钥加密
function rsapubcode(data) {
	//rsa公钥
	var rsapubcode = '-----BEGIN PUBLIC KEY-----';
	rsapubcode += 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxdNA33HOaWoV4iY/t0J7';
	rsapubcode += 'RvUWH6BK4Dy3tmQFVVMRAvDnfSmR8jUIj24+8oddfouc4r6HwY5Ok02hMY04qBxb';
	rsapubcode += 'bTwLdICnkQuhwHDWoZAZ+qVj4vnjE0BunNmrTuu0eBh36/yN92AjoUsBhqFOIRsG';

	rsapubcode += 'j+6aBZuFpS7TRfdWnNcRdZE1zA4hewi5tGkONAJR3/p3xWT0jxXrqGKdiZuzfqxc';
	rsapubcode += '5zjNwQ4qNMhmlujz0fvI3XFb8Z+s7nDGO4P+/FWzW5mYbRO93dsV/WQcbV+7Jbev';
	rsapubcode += '0CtsFV8N1TNOdmLyhzBTWcJjLvxKl9UMflqcdV8DzRp3OjHpAcg/a7E+a3AEKxXm';

	rsapubcode += 'QOYJQg7Zyl+S2L0NbDJnKKbrttIqrT7HC51xgeYzcIe88TkWu2dWnbSDpF5lpk50';
	rsapubcode += 'ncFlSLV8eXP41VbP7u8vybwXFP+WIPJeIcF5/luXwGrKb8xI0Bp1FVwIhj0vekE1';
	rsapubcode += 'oatfm9kmpe+vd4QPvZ0kPqISiCzTAIlAjJgZheNV2xaIZQncCrfJcpNKGvDRvbPl';
	rsapubcode += 'NIV5RPargSwgoQEIHB8WgsxqwYQssbHbN4ZkXMW0I1fLl23WhTHVo6O9UeWE6dcb';
	rsapubcode += 'LhJuSJBRnXeeac6S96a1/jgFaqQPNyc2kSjw2Y2VSjVE2AlJ5NfGLYzqWR/cMLQF';

	rsapubcode += 'E8JcpxDHwxEX3GEphk7e8ZUCAwEAAQ==';
	rsapubcode += '-----END PUBLIC KEY-----';

	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(rsapubcode);
	var encrypted = encrypt.encrypt(data);
	return encrypted;
}
//将对象转成url 参数  
function ps_url(param, key) {
	var paramStr = "";
	if(param instanceof String || param instanceof Number || param instanceof Boolean) {
		paramStr += "&" + key + "%==%" + encodeURIComponent(param);
	} else {
		if(typeof param == "object") {
			$.each(param, function(i) {
				var k = (key == null) ? i : (key + (param instanceof Array ? "[" + i + "]" : "." + i));
				paramStr += '&' + ps_url1(this, k);
			});
		}
	}
	return paramStr.substr(1);
}
//将对象转成url 参数  
function ps_url1(param, key) {
	if(typeof param == 'object') {
		var paramStr = "";
		paramStr += "&" + key + "%==%" + encodeURIComponent(param);
		return paramStr.substr(1);
	} else {
		return "";
	}

}
//获取最终请求参数
function get_post_ps(psajax, isrsa) {
	return psajax;
	//	if(isrsa == -1) {
	//		return psajax;
	//	}
	//
	//	if(typeof psajax != "object") {
	//		psajax = {};
	//	}
	//	if(typeof jQuery == 'undefined') {
	//		psajax = Object.assign({}, psajax);
	//	} else {
	//		psajax = $.extend({}, psajax);
	//	}
	//	var signObject = psajax;
	//	var sign = rsapubcode(ps_url(signObject));
	//
	//	var datas = {
	//		signs: sign,
	//		isrsa: 1
	//	};
	//	return datas;
}

//以下为原生js方法
function hasClass(element, csName) {　　　
	return !!element.className.match(new RegExp("(\\s|^)" + csName + "(\\s|$)"));　　
}　　　　　　
function addClass(element, csName) {　　　　　　　
	if(!hasClass(element, csName)) {　　　　　　　　　
		element.className += ' ' + csName;　　　　　　
	}
}

function removeClass(element, csName) {
	if(hasClass(element, csName)) {
		element.className = element.className.replace(new RegExp("(\\s|^)" + csName + "(\\s|$)"), "");
	}
};
