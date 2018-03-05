$(function() {
	var mask = spinMask();
	//	商品轮播
	refreshTrolley_badge();
	var _Swiper = {
		Swiper1: function() {
			var mySwiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				loop: true,
				autoplay: 3000
			});
		},
		Swiper2: function() {
			var mySwiper1 = new Swiper('.swiper-container1', {
				slidesPerView: 4, //'auto'
				//					slidesOffsetBefore: 20,
				slideToClickedSlide: true,
				onTransitionEnd: function(swiper) {
					if(swiper.progress == 1) {
						swiper.activeIndex = swiper.slides.length - 1
					}
				}
			})
		}
	}

	indexAjax('flash', 10, $("#template1"), '#banner', 'loadid_1_num', _Swiper.Swiper1);
	indexAjax('jp', 20, $("#template4"), '#jptj', 'loadid_jp_num', 0);
	indexAjax('xsqg', 20, $("#template2"), '.main1', 'loadid_xsqg_num', _Swiper.Swiper2);
	//	首页接口
	function indexAjax(loadid, num, tmpl, id, loadid_num, cbk) {
		var sData = sessionStorage.getItem(loadid);
		if(sData) {
			tmpl.tmpl(JSON.parse(sData)).appendTo(id);
			if(cbk) {
				cbk();
			}
		} else {
			mask.show();
			var datas = {
				loadid: loadid,
			};
			datas[loadid_num] = num;
			datas = api_com_ps(datas);
			//				console.log(JSON.stringify(datas));
			var opsx = {
				url: commonUrl + 'store/index',
				method: 'get',
				data: datas,
				datatype: 'jsonp'
			};
			api_call(opsx, function(data) {
				var users = data.data;
				if(loadid == 'xsqg') {
					var xsqg = users.xsqg.goodslist;
					if(xsqg) {
						tmpl.tmpl(users).appendTo(id);
						sessionStorage.setItem(loadid, JSON.stringify(users))
					}
				} else {
					tmpl.tmpl(users).appendTo(id);
					sessionStorage.setItem(loadid, JSON.stringify(users))
				}

				//					console.log(JSON.stringify(users));
				if(cbk) {
					cbk();
				}
				mask.close();
			});
		}
	}
	//新品推荐
	xptj();

	function xptj() {
		var sData = sessionStorage.getItem('xptj');
		if(sData) {
			$("#template3").tmpl(JSON.parse(sData)).appendTo('#xpcx');
		} else {
			var datas = {
				pid: 3,
				num: 4
			}
			advertising(datas, $("#template3"), '#xpcx');

			function advertising(Object, tmpl, id) {
				var datas = api_com_ps(Object);
				//				console.log(JSON.stringify(datas));
				var opsx = {
					url: commonUrl + 'store/adList',
					method: 'get',
					data: datas,
					datatype: 'jsonp',
				};
				api_call(opsx, function(data) {
					var users = data;
					//					console.log(JSON.stringify(users));
					tmpl.tmpl(users).appendTo(id);
					sessionStorage.setItem('xptj', JSON.stringify(users))
				});
			}
		}
	}
});