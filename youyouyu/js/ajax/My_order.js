$(function(){
	var tokenlogin = localStorage.getItem('m_openid');
	var Sindex=0;
	if(getQueryString('index')){
		Sindex=getQueryString('index');
	}
	huoquorder();
	function huoquorder(){
	MyOrder(0,'.all');
	MyOrder('20,30','.dfh');
	MyOrder(50,'.dsh');
	}
	function MyOrder(status,Tobject) {
		var datas = {
			token: tokenlogin,
			isgoods: 1
		};
		if(status != 0){
			datas.status=status;
		}
		datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'store/orderList',
			method: 'GET',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			$('Tobject').empty();
			var users = data.data.listdata;
			//			console.log(JSON.stringify(users));
			if(users.length>0) {
				$('#template1').tmpl(data.data).appendTo(Tobject);
			} else {
				$('#template2').tmpl(data.data).appendTo(Tobject);
			}
			_swiper();
		})
	}
	MyOrderTh();
		function MyOrderTh() {
		var datas = {
			token: tokenlogin,
			type: 'th'
		};
		datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'appcom/shopThhrOrderList',
			method: 'GET',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			$('.ywc').empty();
			var users = data.data.listdata;
			//			console.log(JSON.stringify(users));
			if(users.length>0) {
				$('#template3').tmpl(data.data).appendTo('.ywc');
			} else {
				$('#template2').tmpl(data.data).appendTo('.ywc');
			}
			_swiper();
		})
	}
	function _swiper() {
					var mySwiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						autoHeight: true,
						initialSlide :Sindex,
						//					paginationType: 'fraction'
						onSlideChangeEnd: function(swiper) {
							border(swiper.activeIndex);
						}
					});

					$('nav ul li').bind('click', function() {
						var index = $(this).index();
						border(index);
					})

					function border(index) {
						$('nav .border').css('left', 5 + index * 25.2 + '%');
						$('nav ul li').eq(index).siblings().removeClass('selected');
						$('nav ul li').eq(index).addClass('selected');
						setTimeout(function(){
							mySwiper.slideTo(index);
						},10);
					}
//					取消订单,确认收货,删除订单
              $('section .bottom button').unbind().bind('click',function(){
              	var Cstring=Trim($(this).text());
              	var ahref=$(this).parents('section').find('.shoppingList a').attr('href');
              	var did=ahref.slice(ahref.indexOf('=')+1);
                 if(Cstring=='取消订单'){
                 	confirm('您确定取消订单吗?',did,'qx')
                 }
                 if(Cstring=='删除订单'){
                 	confirm('您确定删除订单吗?',did,'del')
                 }
                 if(Cstring=='确认收货'){
                 	confirm('您确定货物已到您手中吗?',did,'msh')
                 }
              })
              function confirm(Constring,did,type){
                  var btnArray = ['取消', '确定'];
		mui.confirm(Constring, '悠悠雨', btnArray, function(e) {
				if(e.index==1){
					 shopOrderOp(type,did);
				}
		})
		}
          function   shopOrderOp(type,did){
          	var datas = {
			token: tokenlogin,
			optype:type,
			did:did
		};
		datas = api_com_ps(datas);
//							console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'appyyyl/shopOrderOp',
			method: 'POST',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			//			console.log(JSON.stringify(users));
			if(data.code==1){
				huoquorder();
			}
		})
          }
      }
	
})
