
var Ototal_datalength;

mui.plusReady(function(){
	MyIndex();
})

function MyIndex() {
	"use strict";
	//$(".swiper-wrapper").empty();
	indexbanger();
	//indexDistribution();
	$(".intrlist ul").empty();
	Ototal_datalength = indexRecommend(6, 0);
};

//刷新首页推荐商品列表和分销商品
function refreshRecommend() {
	$(".intrlist ul").empty();
	Ototal_datalength = indexRecommend(6, 0);
}

//首页banner
function indexbanger() {
	"use strict";
	mui.ajax(commonUrl + 'apigd/shopindexflash', {
		data: {
			pagesize: 5
		},
		type: "get",
		dataType: "json",
		"success": function(data) {
			var ImgList = data.data.listdata;
			var swipter = document.querySelector(".swiper-wrapper");
			var html = "";
			for(var j = 0; j < ImgList.length; j++) {
				html += '<div class="swiper-slide"><div class="img"><a href="javascript:void(0)"><img src="images/backgroundimg500.256.jpg" onload="lazyload(this)" data-lazyload="'+ ImgList[j].data_json.pic +'"/></a></div></div>';
			}
			swipter.innerHTML = html;
			var Img = document.querySelectorAll(".picshow .img img");
			var aHref = document.querySelectorAll(".picshow .img a");

			function myswiper() {
				var swiper = new Swiper('.swiper-container', {
					//effect: 'flip',
					loop: true,
					autoplay: 5000,
					pagination: '.swiper-pagination',
					paginationClickable: true
				});
			}
			myswiper();
		}
	});
};

//		分销商品推荐
//	function indexDistribution() {
//		"use strict";
//		mui.getJSON(Url + 'apigd/shopindexfxgr', {
//			pagesize: 1
//		}, function(data) {
//			var Deta = data.data.listdata;
//			var aHref = document.querySelector(".mainintr .m-left a");
//			var aHref_tit = document.querySelector(".mainintr .m-right .info-top a");
//			var Link_href = aHref.getAttribute("href");
//			var Link = jointUrl(Link_href, Deta[0].id, Deta[0].catid);
//			aHref.setAttribute("href", Link);
//			aHref_tit.setAttribute("href", Link);
//			var Img = document.querySelector(".mainintr .m-left img");
//			var Abt = document.querySelector(".mainintr .m-right .info-top a");
//			var Pjs = document.querySelector(".mainintr .m-right .info-top p");
//			var numberSpan = document.querySelector(".mainintr .m-right .info-bottom .info-b-l .YSnumber");
//			var priceSpan = document.querySelector(".mainintr .m-right .info-bottom .info-b-l .mainintr-price");
//			Img.setAttribute("src", Deta[0].data_json.pic_thumbs.tub_150_100);
//			Abt.innerHTML = Deta[0].title;
//			Pjs.innerHTML = Deta[0].remark;
//			numberSpan.innerHTML = Deta[0].number_sn;
//			priceSpan.innerHTML = Deta[0].price_sell;
//		});
//	}

//推荐商品
function indexRecommend(_pagesize, _index) {
	"use strict";
	var total_datalength = 0;
	mui.ajax(commonUrl + 'apigd/shopindexdefgr', {
		data: {
			page: 1,
			pagesize: _pagesize
		},
		async: false,
		type: "post",
		dataType: "json",
		timeout: 6000,
		success: function(data) {
			var Deta = data.data.listdata;
			if(_pagesize <= 50) { //将首页推荐商品显示数目控制在50个以内
				var ULlist = $(".intrlist ul");
				var i;
				for(i = _index; i < Deta.length; i++) {
					//var _random = Math.random() * 1000;
					//ULlist.append('<li><a href="GoodsIntr.html?id=' + Deta[i].id + '&catid=' + Deta[i].catid + '"><div class="imgbox"><img src="images/backgroundimg500.500.jpg" data-lazyload="' + Deta[i].data_json.pic_thumbs.tub_200_200 + '?version=' + _random + '"/></div><div class="infobox"><div class="info-t"><p>' + Deta[i].title + '</p></div><div class="info-b"><p>￥<span class="mainintr-price">' + Deta[i].price_sell + '</span><span>已售<i class="YSnumber">' + Deta[i].number_sn + '</i>件</span></p></div></div></a></li>');
					ULlist.append('<li><a href="GoodsIntr.html?id=' + Deta[i].id + '&catid=' + Deta[i].catid + '"><div class="imgbox"><img src="images/backgroundimg500.500.jpg" onload="lazyload(this)" data-lazyload="' + Deta[i].data_json.pic_wh_200x200 + '"/></div><div class="infobox"><div class="info-t"><p>' + Deta[i].title + '</p></div><div class="info-b"><p>￥<span class="mainintr-price">' + Deta[i].price_sell + '</span><span>已售<i class="YSnumber">' + Deta[i].number_sn + '</i>件</span></p></div></div></a></li>');
				};
			}
			total_datalength = Deta.length;
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
		}
	});
	return total_datalength;
}

//初始化mui
mui.init({
	swipeBack: false,
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style: '',
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			contentnomore: '没有更多推荐商品了',
			callback: pullupRefresh
		}
	}
});
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		//refreshRecommend();
		var current = plus.webview.currentWebview();
		current.loadURL('Index.html');
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed 
		mui.toast("已更新");
		mui('#pullrefresh').pullRefresh().refresh(true); //重置上拉加载
	}, 0);
}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		indexRecommend(Ototal_datalength + 4, Ototal_datalength);
		//Lazyloadinimg();
		Ototal_datalength = Ototal_datalength + 4;
		mui('#pullrefresh').pullRefresh().endPullupToRefresh((Ototal_datalength - 4 > 20)); //参数为true代表没有更多数据了。
	}, 0);
}

//初始化，并预加载webview模式的选项卡			
function preload() {}
mui.plusReady(function() {
	//读取本地存储，检查是否为首次启动
	var showGuide = plus.storage.getItem("lauchFlag");
	//仅支持竖屏显示
	plus.screen.lockOrientation("portrait-primary");
	if(showGuide) {
		//有值，说明已经显示过了，无需显示；
		//关闭splash页面；
		plus.navigator.closeSplashscreen();
		plus.navigator.setFullscreen(false);
		//预加载
		preload();
	} else {
		//显示启动导航
		//				mui.openWindow({
		//					id: 'guide',
		//					url: 'examples/guide.html',
		//					styles: {
		//						popGesture: "none"
		//					},
		//					show: {
		//						aniShow: 'none'
		//					},
		//					waiting: {
		//						autoShow: false
		//					}
		//				});
		//延迟的原因：优先打开启动导航页面，避免资源争夺
		setTimeout(function() {
			//预加载
			preload();
		}, 200);
	}
});

//function Lazyloadinimg() {
//	(function($) {
//		$('#Lazyloadimg').imageLazyload({
//			placeholder: 'images/backgroundimg500.500.jpg'
//		});
//	})(mui);
//}
//Lazyloadinimg();