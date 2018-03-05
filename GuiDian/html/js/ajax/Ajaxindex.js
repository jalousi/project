window.onload = function data_exchange() {
	"use strict";
	var Url = " http://gd.hngdstny.com/sx/apigd/";
	indexbanger();
	indexDistribution();
	indexRecommend();
	//		首页banner
	function indexbanger() {
		"use strict";
		mui.ajax(Url + 'apigd/shopindexflash', {
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
					html += '<div class="swiper-slide"><div class="img"><a><img/></a></div></div>';
				}
				swipter.innerHTML = html;
				var Img = document.querySelectorAll(".picshow .img img");
				var aHref = document.querySelectorAll(".picshow .img a");
				for(var i = 0; i < ImgList.length; i++) {
					Img[i].setAttribute("src", ImgList[i].data_json.pic);
					aHref[i].setAttribute("href", ImgList[i].links);
					aHref[i].setAttribute("title", ImgList[i].title);
				}
				ck();
			}
		});
	};
	//		分销商品推荐
	function indexDistribution() {
		"use strict";
		mui.getJSON(Url + 'apigd/shopindexfxgr', {
			pagesize: 1
		}, function(data) {
			var Deta = data.data.listdata;
			var aHref = document.querySelector(".mainintr .m-left a");
			var Link_href = aHref.getAttribute("href");
			var Link = jointUrl(Link_href, Deta[0].id, Deta[0].catid);
			aHref.setAttribute("href", Link);
			var Img = document.querySelector(".mainintr .m-left img");
			var Abt = document.querySelector(".mainintr .m-right .info-top a");
			var Pjs = document.querySelector(".mainintr .m-right .info-top p");
			var numberSpan = document.querySelector(".mainintr .m-right .info-bottom .info-b-l .YSnumber");
			var priceSpan = document.querySelector(".mainintr .m-right .info-bottom .info-b-l .mainintr-price");
			Img.setAttribute("src", Deta[0].data_json.pic_thumbs.tub_150_100);
			Abt.innerHTML = Deta[0].title;
			Pjs.innerHTML = Deta[0].remark;
			numberSpan.innerHTML = Deta[0].number_sn;
			priceSpan.innerHTML = Deta[0].price_sell;
		});
	}
	//		推荐商品
	function indexRecommend() {
		"use strict";
		mui.getJSON(Url + 'apigd/shopindexdefgr', {
			page: 1,
			pagesize: 6
		}, function(data) {
			var Deta = data.data.listdata;
			var html = ""
			for(var i = 0; i < Deta.length; i++) {
				html += '<li><a href="GoodsIntr.html"><div class="imgbox"><img src="images/backgroundimg500.500.jpg"></div><div class="infobox"><div class="info-t"><p></p></div><div class="info-b"><p>￥<span class="mainintr-price"></span><span>已售<span class="YSnumber"></span>件</span></p></div></div></a></li>'
			}
			var ULlist = document.querySelector(".intrlist ul");
			ULlist.innerHTML = html;
			var Img = document.querySelectorAll(".intrlist ul li a .imgbox img");
			var Abt = document.querySelectorAll(".intrlist ul li .infobox .info-t p");
			var numberSpan = document.querySelectorAll(".intrlist ul li .infobox .info-b .YSnumber");
			var priceSpan = document.querySelectorAll(".intrlist ul li .infobox .info-b .mainintr-price");
			var Ahref = document.querySelectorAll(".intrlist ul li a");
			for(var j = 0; j < Deta.length; j++) {
				Abt[j].innerHTML = Deta[j].title;
				numberSpan[j].innerHTML = Deta[j].number_sn;
				priceSpan[j].innerHTML = Deta[j].price_sell;
				Img[j].setAttribute("src", Deta[j].data_json.pic_thumbs.tub_200_200);
				var Link_href = Ahref[j].getAttribute("href");
				var Link = jointUrl(Link_href, Deta[j].id, Deta[j].catid);
				Ahref[j].setAttribute("href", Link);
			}
		});
	}
}
//拼接url
function jointUrl(num1, num2, num3) {
	var Href = num1 + "?id=" + num2 + "&catid=" + num3;
	return Href;
}