var commonUrl = 'http://gd.hngdstny.com/sx/apigd/';

var motherwebview;
var creatMywebview;
mui.plusReady(function() {
	//获取首页webview
	motherwebview = plus.webview.getLaunchWebview();

	//创建并打开新的webview
	creatMywebview = function(_webviewUrl, _webviewId) {
		var aniShowM = 'pop-in';
		if(parseFloat(mui.os.version) < 4.4) { //Android平台暂时
			aniShowM = 'slide-in-right';
		}
		var webview_style = {
			popGesture: "close",
			hardwareAccelerated: true
		}
		var extras = {};

		var mywebview = plus.webview.create(_webviewUrl, _webviewId, webview_style, extras);
		mywebview.addEventListener("titleUpdate", function() {
			setTimeout(function() {
				mywebview.show(aniShowM, 300);
			}, 0);
		});
	}
});

//刷新购物车
function refreshTrolley() {
	//触发首页webview上自定义的刷新购物车事件
	mui.fire(motherwebview, 'refreshTrolleyList');
	refreshTrolley_badge();
}

//刷新购物车角标
function refreshTrolley_badge() {
	//触发首页webview上自定义的刷新购物车角标
	mui.fire(motherwebview, 'refreshTrolley-badge');
	mui.fire(motherwebview, 'refreshTrolley');
}

//加入购物车或立即购买
function joinTrollry(_id, _numb, _attrs, _cart_type, _goodstype, _tabIndex) {
	var wxid = localStorage.getItem("m_openid");
	if(wxid) {
		mui.post(commonUrl + 'apigd/cartadd', {
			m_openid: wxid,
			cart_type: _cart_type,
			gid: _id,
			number: _numb,
			attrs: _attrs
		}, function(data) {
			if(data.code == 1) {
				if(_tabIndex == 2) {
					creatMywebview('OrderSure.html?type=' + _goodstype, 'OrderSure.html');
				} else {
					plus.nativeUI.toast('加入购物车成功');
					refreshTrolley();
				}
			} else {
				plus.nativeUI.toast('加入购物车失败');
			}
		}, 'json');
	} else {
		//弹出登录窗口
		mui.plusReady(function() {
			plus.nativeUI.toast("请先登录");
			setTimeout(function() {
				var loginwindow = plus.webview.getWebviewById('Login.html');
				if(loginwindow != '[object Object]') { //无登陆页面webview
					var mylogin = plus.webview.create('Login.html', 'Login.html', {
						top: '0px',
						bottom: '0px'
					});
					var aniShowM = 'pop-in';
					if(parseFloat(mui.os.version) < 4.4) { //Android平台暂时
						aniShowM = 'slide-in-right';
					}
					mylogin.addEventListener("titleUpdate", function() {
						setTimeout(function() {
							mylogin.show(aniShowM, 300);
						}, 0);
					});
				} else { //有登陆页面webview
					var aniShowM = 'pop-in';
					if(parseFloat(mui.os.version) < 4.4) { //Android平台暂时
						aniShowM = 'slide-in-right';
					}
					loginwindow.addEventListener("titleUpdate", function() {
						setTimeout(function() {
							loginwindow.show(aniShowM, 300);
						}, 0);
					});
				}
			}, 1000)
		});
	};
}

//支持从缓存获取图片的懒加载方法（需引用md5.min.js和pluRready之后用）
function lazyload(obj, callback) {
	var debug = false; // 默认打印调试日志
	if(obj.getAttribute('data-loaded')) {
		return;
	}

	var image_url = obj.getAttribute('data-lazyload');
	debug && console.log(image_url);

	// 1. 转换网络图片地址为本地缓存图片路径，判断该图片是否存在本地缓存
	// http://...jpg -> md5
	// 缓存目录 _downloads/image/(md5).jpg
	var image_md5 = md5(image_url);
	var local_image_url = '_downloads/image/' + image_md5 + '.jpg'; // 缓存本地图片url
	var absolute_image_path = plus.io.convertLocalFileSystemURL(local_image_url); // 平台绝对路径

	// new temp_img 用于判断图片文件是否存在
	var temp_img = new Image();
	temp_img.src = absolute_image_path;
	temp_img.onload = function() {
		debug && console.log('存在本地缓存图片文件' + local_image_url + '，直接显示');

		// 1.1 存在，则直接显示（本地已缓存，不需要淡入动画）
		obj.setAttribute('src', absolute_image_path);
		obj.setAttribute('data-loaded', true);
		obj.classList.add('img-lazyload');

		callback && callback();
		return;
	}
	temp_img.onerror = function() {
		debug && console.log('不存在本地缓存图片文件');

		// 1.2 下载图片缓存到本地
		debug && console.log('开始下载图片' + image_url + ' 缓存到本地: ' + local_image_url);

		function download_img() {
			var download_task = plus.downloader.createDownload(image_url, {
				filename: local_image_url // filename:下载任务在本地保存的文件路径
			}, function(download, status) {
				if(status != 200) {
					// 下载失败,删除本地临时文件
					debug && console.log('下载失败,status' + status);
					if(local_image_url != null) {
						plus.io.resolveLocalFileSystemURL(local_image_url, function(entry) {
							entry.remove(function(entry) {
								debug && console.log("临时文件删除成功" + local_image_url);
								// 重新下载图片
								download_img();
							}, function(e) {
								debug && console.log("临时文件删除失败" + local_image_url);
							});
						});
					}
				} else {
					// 把下载成功的图片显示
					// 将本地URL路径转换成平台绝对路径
					obj.setAttribute('src', plus.io.convertLocalFileSystemURL(local_image_url));
					obj.setAttribute('data-loaded', true);
					obj.classList.add('img-lazyload');

					callback && callback();
				}
			});
			download_task.start();
		}
		download_img();
	}
}

//请求错误的错误信息提示
function RequestErrorMsg(_code){
	var ErrorMsg;
	switch (_code){
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
			mui.toast('请输入正确的银行名称');
			return false;
		} else {
			return true;
		}
	} else {
		mui.toast("银行名称不能为空");
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
	if(is_global.toLowerCase() == "g")
		result = result.replace(/\s/g, "");
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