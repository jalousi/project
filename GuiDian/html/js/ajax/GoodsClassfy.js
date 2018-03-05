"use strict";
var _tabbar = $('.tabbar'),
	_tabcont = $('.tabcont');
_tabbar.empty();
_tabcont.empty();

function getGoodsClassfy() {
	mui.ajax(commonUrl + 'apigd/goodscatlist?pid=0&level=2', {
		data: {},
		dataType: 'json',
		type: 'post',
		timeout: 6000,
		success: function(data) {
			$('.W-GoodsClassfy').removeClass('hide');
			var _data = data.data;
			for(var i = 0; i < _data.length; i++) {
				_tabbar.append('<a class="mui-tab-item">' + _data[i].name + '</a>');
				_tabcont.append('<div class="Classfy mui-control-content"></div>');
				for(var n = 0; n < _data[i].child.length; n++) {
					$('.mui-control-content').eq(i).append('<section class="smallclass"><div class="tit"><p>' + _data[i].child[n].name + '</p></div><div class="goodswrap"><ul></ul></div></section>');
					for(var m = 0; m < _data[i].child[n].child.length; m++) {
						$('.mui-control-content').eq(i).children('.smallclass').eq(n).find('.goodswrap ul').append('<li><a href="GoodsList.html?' + 'catid=' + _data[i].child[n].child[m].id + '"><img src="images/backgroundimg500.500.jpg" onload="lazyload(this)" data-lazyload="' + _data[i].child[n].child[m].data_json.pic + '"><span class="goodsname">' + _data[i].child[n].child[m].name + '</span></a></li>');
					}
				};
			};
			_tabbar.find('.mui-tab-item:eq(0)').addClass('mui-active');
			_tabcont.find('.mui-control-content:eq(0)').addClass('mui-active');

			var _Id = 'Classfy_';
			for(var i = 1; i <= $('.tabbar a').length; i++) { //Tab选项卡动态添加ID
				$('.tabbar a').eq(i - 1).attr('href', '#' + _Id + i);
				$('.Classfy').eq(i - 1).attr('id', _Id + i);
			};
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}

document.getElementById("search").addEventListener('search', function(e) {
	var savekeywords = this.value.replace(/(^\s+)|(\s+$)/g, '');
	if(savekeywords == '') {
		mui.toast('请输入您想要搜索的商品', {
			duration: 'long',
			type: 'div'
		});
	} else {
		mui.plusReady(function() {
			plus.storage.setItem('serchkeywords', savekeywords);
		});
		SerchGoods();
	}
});

//搜索
function SerchGoods() {
	document.getElementById("search").blur();
	mui.openWindow({
		url: 'SearchList.html'
	});
}

var onlyforios = function() { //处理ios 输入法弹出时
	document.querySelector("html").addEventListener('touchstart', function(e) {
		document.getElementById("search").blur();
	});
}

//语音识别完成事件
document.getElementById("search").addEventListener('recognized', function(e) {
	var Finalval = e.detail.value.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\。|\？]/g, "");
	this.value = Finalval;
	console.log(Finalval);
});

var nativeWebview, imm, InputMethodManager;
var initNativeObjects = function() {
	if(mui.os.android) {
		var main = plus.android.runtimeMainActivity();
		var Context = plus.android.importClass("android.content.Context");
		InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
		imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
	} else {
		nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
	}
};
var showSoftInput = function() {
	if(mui.os.android) {
		//onlyfoAndro();
		//imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
	} else {
		onlyforios();
		nativeWebview.plusCallMethod({
			"setKeyboardDisplayRequiresUserAction": false
		});
	}
};

mui.plusReady(function() {
	getGoodsClassfy();
	initNativeObjects();
	showSoftInput();
});