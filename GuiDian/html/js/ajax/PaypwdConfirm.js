var check_pass_word = '';
var passwords = $('#password');

var character, index = 0;

mui('.canclebox').on('tap', '.cancle', function() {
	var btnArray = ['确定', '取消'];
	mui.confirm('确定离开?', '温馨提示', btnArray, function(e) {
		if(e.index == 1) {} else {
			hideMask();
			passwords.children().html('').removeClass("active-num");
			index = 0;
		}
	});
});

mui('#keyboard').on('touchstart', '.symbol', function() {
	this.classList.add('bg-gray');
});
mui('#keyboard').on('touchend', '.symbol', function() {
	this.classList.remove('bg-gray');
});

$('#keyboard li').click(function() {
	if($(this).hasClass('delete')) {
		passwords.children().eq(--index % 6).html('').removeClass("active-num");
		if(passwords.children().eq(0).html() == '') {
			index = 0;
		}
		return false;
	}
	if($(this).hasClass('cancle')) {
		hideMask();
		passwords.children().html('').removeClass("active-num");
		index = 0;
		return false;
	}
	if($(this).hasClass('symbol')) {
		character = $(this).text();
		passwords.children().eq(index++ % 6).html(character).addClass("active-num");

		if(passwords.children().eq(5).html() != '') {
			var temp_rePass_word = '';
			for(var i = 0; i < passwords.children().length; i++) {
				temp_rePass_word += passwords.children().eq(i).html();
			}

			mui.getJSON(commonUrl + 'apigd/yuepay', {
				m_openid: wxid,
				orderid: _orderid,
				total: amount,
				paycode: temp_rePass_word
			}, function(data) {
				switch(data.code) {
					case -2:
						plus.nativeUI.toast(data.msg);
						passwords.children().html('').removeClass("active-num");
						index = 0;
						break;
					case -1:
						plus.nativeUI.toast('支付失败');
						passwords.children().html('').removeClass("active-num");
						index = 0;
						break;
					case 1:
						$("#keyboard li").unbind();
						plus.nativeUI.toast('支付成功');
						var motherwindow = plus.webview.getLaunchWebview();
						mui.fire(motherwindow, 'refueshMyInfo');
						setTimeout(function() {
							plus.webview.show(motherwindow);
						}, 1500)
						break;
					default:
						plus.nativeUI.toast('未知错误');
						passwords.children().html('').removeClass("active-num");
						index = 0;
						break;
				}
			});
		}
	}
	return false;
});

var BackDrop = document.querySelector('.backdrop');
var BackDropmask = document.querySelector('.backdp-mask');
var BackDroppanel = document.querySelector('.backdp-panel');
var oClass = 'show';

function hideMask() {
	removeClass(BackDropmask, oClass);
	removeClass(BackDroppanel, oClass);
	removeClass(BackDrop, oClass);
	setTimeout(function() {
		BackDrop.style.display = "none";
	}, 200)
}

function showMask() {
	BackDrop.style.display = "block";
	setTimeout(function() {
		addClass(BackDrop, oClass);
		addClass(BackDropmask, oClass);
		addClass(BackDroppanel, oClass);
	}, 0)
}