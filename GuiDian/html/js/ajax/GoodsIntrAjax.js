//2017-07-24
var id = getQueryString("id");
var wxid = localStorage.getItem("m_openid");
var Lazyloadinimg = mui('#Lazyloadimg').imageLazyload({
	placeholder: '../images/backgroundimg500.500.jpg'
});

window.onload = function onloadInfo() {
	GoodsIntr();
};

function GoodsIntr() {
	"use strict";
	var catid = getQueryString("catid");
	var _Title = "";
	var _goodstype;
	mui.ajax(commonUrl + 'apigd/goodsrows', {
		data: {
			did: id,
			catid: catid
		},
		async: false,
		dataType: 'json',
		type: 'post',
		timeout: 6000,
		success: function(data) {
			var Data = data.data.rows;
			_goodstype = Data.type;
			imglunbo();
			titlebt();
			//param_json();
			BuyRule();
			wxshares(Data.data_json.pic_wh_60x60,Data.title);
			//首页轮播
			function imglunbo() {
				var pic = Data.data_json.pic;
				var pics = Data.data_json.pics;
				pics.unshift(pic);
				var swipter = document.querySelector(".swiper-container1 .swiper-wrapper");
				var html = "";
				for(var j = 0; j < pics.length; j++) {
					html += '<div class="swiper-slide"><div class="img"><a href="javascript:void(0)"><img src="images/backgroundimg500.500.jpg"/></a></div></div>';
				}
				swipter.innerHTML = html;
				var Img = document.querySelectorAll(".picshow .img img");
				for(var i = 0; i < pics.length; i++) {
					var _random = Math.random() * 1000;
					Img[i].setAttribute("data-lazyload", pics[i] + '?version=' + _random);
				}
				Lazyloadinimg.addElements();
				mySwiper();
			}
			//商品资料
			function titlebt() {
				var Title = document.querySelector(".intros .left .Title");
				Title.innerHTML = Data.title;
				_Title = Data.title;
				var remark = document.querySelector(".intros .left .remark");
				remark.innerHTML = Data.remark;
				var price = document.querySelector(".intros .left .margin-t .price c");
				price.innerHTML = Data.price_sell;
				var number_sn = document.querySelector(".intros .left .margin-t span b");
				number_sn.innerHTML = Data.number_sn;
				//商品详情	
				var content = document.querySelector(".swiper-container4 .imgs");
				content.innerHTML = Data.content;
				recommend();
			}
			//          商品规格
			//		function param_json() {
			//			var param = Data.param_json;
			//			var gghtml = "";
			//			if(param) {
			//				for(var i = 0; i < param.length; i++) {
			//					gghtml += '<tr><td class="name"></td><td class="value"></td></tr>';
			//				}
			//				var table = document.querySelector(".goodssize ");
			//				table.innerHTML = gghtml;
			//				var Name = document.querySelectorAll(".goodssize tr .name");
			//				var Value = document.querySelectorAll(".goodssize tr .value");
			//				for(var j = 0; j < param.length; j++) {
			//					Name[j].innerHTML = param[j].name;
			//					Value[j].innerHTML = param[j].value;
			//				}
			//			}
			//		}

			//购买商品的数量、重量等
			function BuyRule() {
				var Rules = Data.attr_list.sku_yes;
				var Conter = $('.Chosebox');
				for(var i = 0; i < Rules.length; i++) {
					Conter.append('<div class="flexbox"><span class="flexbox-tit">' + Rules[i].name + '</span><ul class="mui-table-view-radio"></ul></div>');
					var muiradio = $('.flexbox').eq(i).find('.mui-table-view-radio');
					for(var j = 0; j < Rules[i].child.length; j++) {
						muiradio.append('<li class="mui-table-view-cell"><a>' + Rules[i].child[j] + '</a></li>');
					}
					muiradio.find('.mui-table-view-cell').eq(0).addClass('mui-selected');
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});

	//推荐商品
	function recommend() {
		mui.getJSON(commonUrl + 'apigd/goodsr', {
			page: 1,
			pagesize: 3,
			title: _Title
		}, function(data) {
			var tjhtml = "",
				Data = data.data.listdata;
			if(Data.length > 0) {
				for(var j = 0; j < Data.length; j++) {
					tjhtml += '<li><a href="GoodsIntr.html"><div class="imgbox"><img src="images/backgroundimg500.500.jpg"/></div><p>精选蓝莓2盒</p><strong>¥&nbsp;<span>49.9</span></strong></a></li>'
				}
				var recommend = document.querySelector(".recommend .goods  ul");
				recommend.innerHTML = tjhtml;
				var pics = document.querySelectorAll(".goods ul li .imgbox img")
				var title = document.querySelectorAll(".goods ul li a p");
				var price = document.querySelectorAll(".recommend .goods  ul li a  span");
				var ahref = document.querySelectorAll(".goods ul li a ");
				for(var i = 0; i < Data.length; i++) {
					title[i].innerHTML = Data[i].title;
					price[i].innerHTML = Data[i].price_sell;
					var _random = Math.random() * 1000;
					pics[i].setAttribute("data-lazyload", Data[i].data_json.pic_thumbs.tub_200_200 + '?version=' + _random);
					var Link_href = ahref[i].getAttribute("href");
					var Link = jointUrl(Link_href, Data[i].id, Data[i].catid);
					ahref[i].setAttribute("href", Link);
				}
				Lazyloadinimg.addElements();
			} else {
				mui.toast("无推荐商品")
			}
		});
	}

	//选中的商品规格
	function getRules() {
		var Rules = '';
		$('.flexbox').each(function() {
			var _thisrule = $(this).find('.mui-selected a').text();
			Rules += _thisrule + ',';
		});
		return Rules.trimEnd(',');
	}

	//加入购物车 或者 立即购买
	var surebuy = document.querySelector('.surebuy');
	var BackDrop = document.querySelector('.backdrop');
	var BackDropmask = document.querySelector('.backdp-mask');
	var BackDroppanel = document.querySelector('.backdp-panel');
	var oClass = 'show';

	var tabIndex;
	mui(".footer").on('tap', '.selectsize', function() {
		if(wxid) {
			showMask();
			tabIndex = this.getAttribute('Tabindex');
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
	});
	surebuy.addEventListener('tap', function() {
		hideMask();
		Decidebuy();
	});
	BackDropmask.addEventListener('tap', function() {
		hideMask();
	});

	document.querySelector('.closebox').addEventListener('tap', function() {
		hideMask();
	});

	var finalnum = 1;
	//减少物品
	$(".price-minus").click(function() {
		var me = $(this),
			txt = me.next("[name='PriceNum']");
		var val = parseFloat(txt.text());
		if(val <= 1) {
			finalnum = 1;
		} else {
			finalnum = val - 1;
		}
		txt.text(finalnum);
	});

	//增加物品
	$(".price-plus").click(function() {
		var me = $(this),
			txt = me.prev("[name='PriceNum']");
		var val = parseFloat(txt.text());
		finalnum = val + 1;
		txt.text(finalnum);
	});

	//加入购物车(tabIndex = 1 )、立即购买(tabIndex = 2)
	function Decidebuy() {
		var myRules = getRules().toString();
		if(tabIndex == "1") {
			joinTrollry(id, finalnum, myRules, 'cart', 'def', 1);
		} else if(tabIndex == "2") {
			joinTrollry(id, finalnum, myRules, 'buy', _goodstype, 2);
		}
	}

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

	String.prototype.trimEnd = function(c) { //去除字符串末尾指定字符
		if(c == null || c == "") {
			var str = this;
			var rg = /s/;
			var i = str.length;
			while(rg.test(str.charAt(--i)));
			return str.slice(0, i + 1);
		} else {
			var str = this;
			var rg = new RegExp(c);
			var i = str.length;
			while(rg.test(str.charAt(--i)));
			return str.slice(0, i + 1);
		}
	}
}

//顶部图片轮播
function mySwiper() {
	var Swiper1 = new Swiper('.swiper-container1', {
		effect: 'flip',
		pagination: '.swiper-pagination',
		paginationClickable: true,
	});
}

function wxshares(pic, title) {
	var Intent = null,
		File = null,
		Uri = null,
		main = null;
	var shares = null;
	var shareImageUrl = '';
	mui.plusReady(function() {
		updateSerivces();
		if(plus.os.name == "Android") {
			Intent = plus.android.importClass("android.content.Intent");
			File = plus.android.importClass("java.io.File");
			Uri = plus.android.importClass("android.net.Uri");
			main = plus.android.runtimeMainActivity();
		}
	})
	/**
	 * 更新分享服务
	 */
	function updateSerivces() {
		plus.share.getServices(function(s) {
			shares = {};
			for(var i in s) {
				var t = s[i];
				shares[t.id] = t;
			}
		}, function(e) {
			mui.toast("获取分享服务列表失败：" + e.message);
		});
	}
	//分享按钮点击事件
	document.querySelector(".sharebtn a").addEventListener('tap', shareHref);

	function shareHref() {
		alert(pic);
		console.log(pic);
		var ids = [{
				id: "weixin",
				ex: "WXSceneSession" /*微信好友*/
			}, {
				id: "weixin",
				ex: "WXSceneTimeline" /*微信朋友圈*/
			}],
			bts = [{
				title: "发送给微信好友"
			}, {
				title: "分享到微信朋友圈"
			}];
		plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: bts
			},
			function(e) {
				var i = e.index;
				if(i > 0) {
					shareAction(ids[i - 1].id, ids[i - 1].ex);
				}
			}
		);
	}
	/**
	 * 分享操作
	 */
	function shareAction(id, ex) {
		var s = null;
		if(!id || !(s = shares[id])) {
			return;
		}
		if(s.authenticated) {
			mui.toast("---已授权---");
			shareMessage(s, ex);
		} else {
			mui.toast("---未授权---");
			s.authorize(function() {
				shareMessage(s, ex);
			}, function(e) {
				mui.toast("认证授权失败");
			});
		}
	}
	/**
	 * 发送分享消息
	 */
	function shareMessage(s, ex) {
		var msg = {
			content: '分享-详情',
			href: 'http://gd.hngdstny.com/wx/index/share?m_openid=' + wxid + '&goodsid=' + id,
			title: title,
			content: '贵点有机，健康生活倡导者。',
			thumbs: [pic],
			pictures: [pic],
			extra: {
				scene: ex
			}
		};
		s.send(msg, function() {
			mui.toast("分享成功!");
		}, function(e) {
			mui.toast("分享失败!");
		});
	}
};