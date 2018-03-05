"use strict";
var _tabcont = $('.SerchList');
//_tabcont.empty();
var _catid = window.location.href.toString().split('catid=')[1];

mui.plusReady(function() {
	commonAjax($('#Whole'), 'def', 1, 5);
});
//通用请求
function commonAjax(_container, _sort, _page, _pagesize) {
	var _datalength;
	var ajaxurl = commonUrl + 'apigd/goodslist';
	mui.ajax(ajaxurl, {
		data: {
			catid: _catid,
			sort: _sort,
			page: _page,
			pagesize: _pagesize
		},
		async: false,
		dataType: 'json',
		type: 'post',
		timeout: 6000,
		success: function(data) {
			if(_page == 1) {
				_container.empty();
			}
			var _data = data.data.listdata;
			if(_data.length > 0) {
				var _imgsrc;
				for(var i = 0; i < _data.length; i++) {
					_imgsrc = _data[i].data_json.pic_wh_60x60 || _data[i].data_json.pic_wh_200x200 || _data[i].data_json.pic || _data[i].data_json.pics;
					_container.append('<section><div class="mainintr"><div class="m-left"><a href="GoodsIntr.html?id=' + _data[i].id + '&catid=' + _data[i].catid + '"><img src="images/backgroundimg500.500.jpg" onload="lazyload(this)" data-lazyload="' + _imgsrc + '"></a></div><div class="m-right"><div class="info-top"><a href="GoodsIntr.html?id=' + _data[i].id + '&catid=' + _data[i].catid + '">' + _data[i].title + '</a></div><div class="info-bottom"><div class="info-b-l"><p>已售' + _data[i].number_sn + '件</p><p>¥<span class="mainintr-price">' + _data[i].price_sell + '</span></p></div><div class="info-b-r"><a class="JoinTrolley" href="javascript:void(0);"></a></div></div></div><input class="thisId" type="hidden" value="' + _data[i].id + '"/></div></section>');
					//点击购物车图标跳转至商品详情页 _container.append('<section><div class="mainintr"><div class="m-left"><a href="GoodsIntr.html?id=' + _data[i].id + '&catid=' + _data[i].catid + '"><img src="' + _data[i].data_json.pic + '"></a></div><div class="m-right"><div class="info-top"><a href="GoodsIntr.html?id=' + _data[i].id + '&catid=' + _data[i].catid + '">' + _data[i].title + '</a></div><div class="info-bottom"><div class="info-b-l"><p>已售' + _data[i].number_sn + '件</p><p>¥<span class="mainintr-price">' + _data[i].price_sell + '</span></p></div><div class="info-b-r"><a href="GoodsIntr.html?id=' + _data[i].id + '&catid=' + _data[i].catid + '"></a></div></div></div></div></section>');
				};
				$('.JoinTrolley').click(function() {
					var _this = $(this);
					var id = _this.closest('.mainintr').find('.thisId').val();
					joinTrollry(id, 1, '', 'cart', 'def', 1);
				});
			}
			_datalength = _data.length;
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
	return _datalength;
}

//mui.plusReady(function(){
//	commonAjax($('#Whole'), 'def', 1, 5);
//});

mui(".tabbar").on('tap', '.sortbySold', function() {
	ChangeSort(this, 'sn', 'sn1', $('#BySold'), 1, 5);
});
mui(".tabbar").on('tap', '.sortbyPrice', function() {
	ChangeSort(this, 'price2', 'price1', $('#ByPrice'), 1, 5);
});

//通用改变排序
function ChangeSort(_this, _desc, _asc, _elm, _page, _pagesize) {
	var sortdesc = 'tab-Desc',
		sortasc = 'tab-Asc';
	if(!hasClass(_this, sortdesc) && !hasClass(_this, sortasc)) {
		_this.classList.add(sortdesc);
		_elm.empty();
		commonAjax(_elm, _desc, _page, _pagesize);
	} else {
		if(hasClass(_this, sortdesc)) {
			_this.classList.remove(sortdesc);
			_this.classList.add(sortasc);
			_elm.empty();
			commonAjax(_elm, _asc, _page, _pagesize);
		} else if(hasClass(_this, sortasc)) {
			_this.classList.remove(sortasc);
			_this.classList.add(sortdesc);
			_elm.empty();
			commonAjax(_elm, _desc, _page, _pagesize);
		}
	}
}

//初始化mui
mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style: 'circle',
			color: '#999999',
			callback: pulldownRefresh
		},
		up: {
			//contentinit:'上拉显示更多',
			contentrefresh: '正在加载...',
			contentnomore: '没有更多商品了',
			callback: pullupRefresh
		}
	}
});

var _page = 1;
var _acont;

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		$('.SerchList').each(function() {
			var _this = $(this);
			var _thisid = _this.attr('id');
			if(_this.hasClass('mui-active')) {
				switch(_thisid) {
					case 'Whole':
						commonAjax(_this, 'def', _page, 5);
						break;
					case 'BySold':
						tabBySold(_this, _page);
						break;
					case 'ByPrice':
						tabByPrice(_this, _page);
						break;
					default:
						break;
				}
			}
		});
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		mui.toast('已更新');
	}, 1000);
}

/**
 * 上拉加载具体业务实现
 */

function pullupRefresh() {
	setTimeout(function() {
		$('.SerchList').each(function() {
			var _this = $(this);
			var _thisid = _this.attr('id');
			if(_this.hasClass('mui-active')) {
				_page = _page + 1;
				switch(_thisid) {
					case 'Whole':
						_acont = commonAjax(_this, 'def', _page, 5);
						break;
					case 'BySold':
						_acont = tabBySold(_this, _page);
						break;
					case 'ByPrice':
						_acont = tabByPrice(_this, _page);
						break;
					default:
						break;
				}
			}
		});
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(_acont == 0); //参数为true代表没有更多数据了。
	}, 500);
}

mui(".tabbar").on('tap', '.mui-tab-item', function() {
	_page = 1;
	mui('#pullrefresh').pullRefresh().refresh(true); //重置上拉加载
});

function tabBySold(_this, _page) {
	var _cont;
	var _thistab = $('.sortbySold');
	if(_thistab.hasClass('tab-Desc')) {
		_cont = commonAjax(_this, 'sn', _page, 5);
	} else if(_thistab.hasClass('tab-Asc')) {
		_cont = commonAjax(_this, 'sn1', _page, 5);
	}
	return _cont;
}

function tabByPrice(_this, _page) {
	var _cont;
	var _thistab = $('.sortbyPrice');
	if(_thistab.hasClass('tab-Desc')) {
		_cont = commonAjax(_this, 'price2', _page, 5);
	} else if(_thistab.hasClass('tab-Asc')) {
		_cont = commonAjax(_this, 'price1', _page, 5);
	}
	return _cont;
}