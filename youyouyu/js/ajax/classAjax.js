var tokenlogin;
var mask=spinMask();
var istokenlogin=true;
refreshTrolley_badge();
var sclassify1=sessionStorage.getItem('classify1');
if(! sclassify1){
	sclassify1=0;
}
var sclassify2=sessionStorage.getItem('classify2');
if(! sclassify2){
	sclassify2=0;
}
$(function() {
	//	搜索
	$('.serchbox p').bind('tap', function() {
		serch();
	});
	$('.serchbox input').bind('search', function() {
		serch();
	});

	function serch() {
		var serchValue = $('.serchbox input').val();
		if(serchValue) {
			window.location.href = 'shopping_list.html';
			localStorage.setItem('serchval', serchValue);
		} else {
			$('.serchbox input').attr('placeholder', '请输入要搜索的商品');
		}
	}
	//	分类数据
	(function() {
		var sData=sessionStorage.getItem('classify');
	if(sData){
		classifyajax(JSON.parse(sData))
	}else{
		var datas = {
			level: 1
		};
		datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'appcom/shopCat',
			method: 'get',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			classifyajax(data);
			sessionStorage.setItem('classify',JSON.stringify(data));
		});
	}
	})();
	function  classifyajax(data){
		var users = data.data;
			classify(data);
			//					console.log(JSON.stringify(users));
			$('#template0').tmpl(data).appendTo('#classify1');
			if(sclassify1){
				classify2(users[sclassify1], sclassify1);
				$('.classify .tabbar div p').css('top', 4.9 * sclassify1 + 'rem');
				if(sessionStorage.getItem('istokenlogin')=="false"){
					istokenlogin=false;
					$('.classify').addClass('notoken');
				}
			}else{
				classify2(users[0], 0);
			}
			$('#classify1 a').bind('tap', function() {
				sclassify2=0;
				var index = $(this).index() - 1;
				$(this).siblings().removeClass('mui-active');
				classify2(users[index], index);
				$('.classify .tabbar div p').css('top', 4.9 * index + 'rem');
				sessionStorage.setItem('classify1',index);
			})
	}
	//获取二级分类
	function classify2(data, num) {
		$('#nav').empty();
		$('#template1').tmpl(data).appendTo('#nav');
		shoppingList(data.child[0].id, '#shop' + num + 0,true);
	_swiper(num,data.child);
			
		
//		$('#nav .swiper-slide').bind('click', function() {
//			var index = $(this).index();
//			shoppingList(data.child[index].id, '#shop' + num + index);
//		})
		
	}

	// 分类数据模板
	function classify(users) {
		$('#template2').tmpl(users).appendTo('#shoppingList');
		if(sclassify1){
			$('#shoppingList .Classfy').eq(sclassify1).addClass('mui-active');
		}else{
			$('#shoppingList .Classfy').eq(0).addClass('mui-active');
		}
		if(istoken()) {
			tokenlogin = localStorage.getItem('m_openid');
		} else {
			$('.classify').addClass('notoken');
		}
	}
})
//获取商品列表;
function shoppingList(id, Object,index) {
	var sData=sessionStorage.getItem(id);
	if(sData){
		$(Object).empty();
		$('#template3').tmpl(JSON.parse(sData)).appendTo(Object);
		AjaxAmendsize();
	}else{
		mask.show();
	var datas = {
		pid: id,
		pagesize:500
	};
	if(istoken()){
		datas.tokenlogin=tokenlogin;
	}
	datas = api_com_ps(datas);
	var opsx = {
		url: commonUrl + 'store/shopGoodsSearch',
		method: 'get',
		data: datas,
		datatype: 'json',
	};
	api_call(opsx, function(data) {
		if(index){
		if(data.code== -9){
			sessionStorage.setItem('istokenlogin','false');
			$('.classify').addClass('notoken');
			istokenlogin=false;
		   }else{
		   	sessionStorage.setItem('istokenlogin','true');
		   }
		}
		var users = data.data;
		if(users.listdata.length>0){
		$(Object).empty();
		//					console.log(JSON.stringify(users));
		$('#template3').tmpl(users).appendTo(Object);
		sessionStorage.setItem(id,JSON.stringify(users));
		AjaxAmendsize();
		}else{
			mui.toast('当前没有分类没有数据哟！')
		}
		mask.close();
	});
	}
}

function _swiper(num,datas) {
	var Swiperclass='.swiper-container'+num;
		var mySwiper = new Swiper('.swiper-container', {
			slidesPerView: 'auto', //'auto'
			slidesOffsetBefore: 10,
			slideToClickedSlide: true,
			onTransitionEnd: function(swiper) {
				if(swiper.progress == 1) {
					swiper.activeIndex = swiper.slides.length - 1
				}
			}
		})


		var mySwiper1 = new Swiper(Swiperclass, {
			pagination: '.swiper-pagination',
			initialSlide:sclassify2,
			//					autoHeight: true, //高度随内容变化
			onSlideChangeEnd: function(swiper) {
				var swindex=swiper.activeIndex;
				Border(swiper.activeIndex);
				shoppingList(datas[swindex].id,'#shop' + num + swindex,false)
			}
		});
		$('nav .swiper-slide').bind('click', function() {
			$(this).siblings().removeClass('selected');
			$(this).addClass('selected');
			mySwiper1.slideTo($(this).index());
		});
		
	function Border(index) {
		$(Swiperclass).find('.swiper-slide section').hide();
		$(Swiperclass).find('.swiper-slide').eq(index).find('section').show();
		$('nav .swiper-slide').eq(index).siblings().removeClass('selected');
		$('nav .swiper-slide').eq(index).addClass('selected');
		sessionStorage.setItem('classify2',index);
		mySwiper.slideTo(index);
	};
	setTimeout(function(){
		mySwiper1.update(true);
	},10)
	
	//点击加入购物按钮
}
//加入购物车
function appCart(id, num, Object) {
	var datas = {
		token: tokenlogin,
		gid: id,
		number: num,
		cart_type: 'cart'
	};
	datas = api_com_ps(datas);
	//					console.log(JSON.stringify(datas));
	var opsx = {
		url: commonUrl + 'store/cartAdd',
		method: 'POST',
		data: datas,
		datatype: 'json',
	};
	api_call(opsx, function(data) {
		if(data.code == 1) {
			if(Object.is(':hidden')){
//				显示加减框
				var right=Object.parent();
			right.addClass('click');
			setTimeout(function() {
			right.find('p').show();
			right.find('.left').show();
		}, 550);
				refreshTrolley_badge();
				mui.toast('成功加入购物车',{ duration:500});
			}
			Object.html(num);
			
		} else {
			mui.toast(data.msg);
		}
		mask.close();
	})
}

function AjaxAmendsize() {
	//	 	购物车数量加减效果
	$('.add').unbind('click').bind('click', function() {
//		var right=$(this).parent();
//		if(right.find('p').is(':hidden')){
//			right.addClass('click');
//			setTimeout(function() {
//			right.find('p').show();
//			right.find('.left').show();
//		}, 500);
//		}
		mask.show();
		var id = $(this).parent().parent().parent().find('.left_img a').attr('href');
		id = id.slice(id.indexOf('=') + 1);
		var $p = $(this).parent().find('p');
		var num = parseInt($p.html()) + 1;
		appCart(id, num, $p);
	})
	$('.minus').unbind('click').bind('click', function() {
		var $p = $(this).parent().find('p');
		var id = $(this).parent().parent().parent().find('.left_img a').attr('href');
		id = id.slice(id.indexOf('=') + 1);
		if($p.html() > 1) {
			var num = parseInt($p.html()) - 1;
			appCart(id, num, $p);
		}
	})
}
//获取库存
//function shopGoodsDetails(did) {
//	var sku;
//	var datas = {
//		did: did,
//		tokenlogin: tokenlogin
//	};
//	goodintrAjax(datas);
//
//	function goodintrAjax(datas) {
//		datas = api_com_ps(datas);
//		//					console.log(JSON.stringify(datas));
//		var opsx = {
//			url: commonUrl + 'store/shopGoodsDetails',
//			method: 'get',
//			data: datas,
//			datatype: 'json',
//			async: false
//		};
//		api_call(opsx, function(data) {
//			var users = data.data;
//			sku = skuFn(users);
//		})
//	}
//	return sku;
//}
//
//function skuFn(data) {
//	var sku = data.rows.skuprice.sku;
//	return parseInt(sku);
//}