"use strict";
var _Serchcont = $('.SerchList');
_Serchcont.empty();
var serchinput = document.getElementById("search");

function SerchList(_keywords, _page, _pagesize) {
	serchinput.value = _keywords;
	var _datalength;
	mui.ajax(commonUrl + 'apigd/goodslist', {
		data: {
			title: _keywords,
			page: _page,
			pagesize: _pagesize
		},
		async: false,
		dataType: 'json',
		type: 'post',
		timeout: 6000,
		success: function(data) {
			var _data = data.data.listdata;
			_datalength = _data.length;
			if(_data.length < 1) {
				mui.toast('无搜索结果', {
					duration: 'long',
					type: 'div'
				});
			} else {
				var _imgsrc;
				for(var i = 0; i < _data.length; i++) {
					_imgsrc = _data[i].data_json.pic_wh_60x60 || _data[i].data_json.pic_wh_200x200 || _data[i].data_json.pic || _data[i].data_json.pics;
					_Serchcont.append('<section><div class="mainintr"><div class="m-left"><a href="GoodsIntr.html?id=' + _data[i].id + '&catid=' + _data[i].catid + '"><img src="images/backgroundimg500.500.jpg" onload="lazyload(this)" data-lazyload="' + _imgsrc + '"></a></div><div class="m-right"><div class="info-top"><a href="GoodsIntr.html?id=' + _data[i].id + '&catid=' + _data[i].catid + '">' + _data[i].title + '</a></div><div class="info-bottom"><div class="info-b-l"><p>已售' + _data[i].number_sn + '件</p><p>¥<span class="mainintr-price">' + _data[i].price_sell + '</span></p></div><div class="info-b-r"><a href="GoodsIntr.html?id=' + _data[i].id + '&catid=' + _data[i].catid + '"></a></div></div></div></div></section>');
					//_Serchcont.append('<section><div class="mainintr"><div class="m-left"><a href="GoodsIntr.html?id=' + _data[i].id + '&catid=' + _data[i].catid + '"><img src="' + _data[i].data_json.pic + '"></a></div><div class="m-right"><div class="info-top"><a href="GoodsIntr.html?id=' + _data[i].id + '&catid=' + _data[i].catid + '">' + _data[i].title + '</a></div><div class="info-bottom"><div class="info-b-l"><p>已售' + _data[i].number_sn + '件</p><p>¥<span class="mainintr-price">' + _data[i].price_sell + '</span></p></div><div class="info-b-r"><a href="GoodsIntr.html?id=' + _data[i].id + '&catid=' + _data[i].catid + '"></a></div></div></div></div></section>');
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理;
			mui.toast(RequestErrorMsg(type));
		}
	});
	return _datalength;
}

mui.plusReady(function() {
	var keywordsonload = plus.storage.getItem('serchkeywords');
	_Serchcont.empty();
	SerchList(keywordsonload, 1, 50);
	onlyforios();
});

serchinput.addEventListener('search', function(e) {
	var savekeywords = this.value.replace(/(^\s+)|(\s+$)/g, '');
	if(savekeywords == '') {
		mui.toast('请输入您想要搜索的商品', {
			duration: 'long',
			type: 'div'
		});
	} else {
		_Serchcont.empty();
		SerchList(savekeywords, 1, 50);
		mui.plusReady(function() {
			plus.storage.setItem('serchkeywords', savekeywords);
		});
	}
});

mui("header").on('tap', '.Searchbtn', function() {
	var serchval = serchinput.value.replace(/(^\s+)|(\s+$)/g, '');
	if(serchval == '') {
		mui.toast('请输入您想要搜索的商品', {
			duration: 'long',
			type: 'div'
		});
	} else {
		_Serchcont.empty();
		SerchList(serchval, 1, 50);
		mui.plusReady(function() {
			plus.storage.setItem('serchkeywords', serchval);
		});
	}
});

var onlyforios = function() { //处理ios 输入法弹出时
	document.querySelector("html").addEventListener('touchstart', function(e) {
		document.getElementById("search").blur();
	});
}