var istokenlogin=true;
$(function() {
	//				Ajax获取数据
	refreshTrolley_badge();
	var sku,number_min;
	var datas = {
			did: getQueryString('id')
		},
		 tokenlogin = localStorage.getItem('m_openid');
	if(tokenlogin) {
		datas.tokenlogin = tokenlogin
	}
	goodintrAjax(datas);
	function goodintrAjax(datas) {
		datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'store/shopGoodsDetails',
			method: 'get',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			 var users = data.data;
			 if(data.code==-9){
			 	istokenlogin=false;
			 }
			 sku=skuFn(users);
			 number_min=parseInt(users.rows.number_min);
			$('#template1').tmpl(users).appendTo('#goodintr');
			_swiper();
			$('.goodintr .product .content').html(users.rows.content);
		})
	}

	function _swiper() {
		var mySwiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationType: 'fraction'
		});

		$('.footernav1 ul li:gt(0)').bind('click', function() {
			if(istoken() && istokenlogin){
			if($('.specification').is(':hidden')) {
				$('.mask').show();
				$('.specification').slideDown(500);
				event.stopPropagation();
			} else {
				if($(this).index() == 1) {
					appCart('buy');
				} else {
					appCart('cart');
					$('.specification').slideUp(300);
					$('.mask').hide();
				}
			}
			}else{
				var btnArray = ['再逛逛', '去登录'];
					mui.confirm('您还未登录账号哦', '悠悠雨', btnArray, function(e) {
						if(e.index == 1) {
							window.location.href='login.html';
						}
					})
			}
		});
		//			$('body:not(.specification)').bind('click', function(event) {
		//				$('.specification').slideUp();
		//			})
		$('.specification .goods_top .right img').bind('click', function() {
			$('.specification').slideUp(300);
			$('.mask').hide();
		})

		//				数量加减
		$('.size .quantity .plus').bind('click', function() {
			if($('.size .quantity .number').val() < sku) {
			SizeNumber(1);
			}else{
				mui.toast('库存不足');
			}
		})
		$('.size .quantity .minus').bind('click', function() {
			if($('.size .quantity .number').val() > number_min) {
				SizeNumber(-1);
			}else{
				mui.toast('已是最低购买数量！');
			}
		})
		$('.size .quantity .number').bind('input oninput',function(){
			$this=$(this);
			var value=parseInt($this.val());
			if(value > sku){
				mui.toast('您的输入数值超过库存数！');
				$(this).val(sku);
			}
			if(value < number_min){
				mui.toast('已是最低购买数量！');
				$(this).val(number_min);
			}
			minusColor();
			plusColor();
		})
		
		//              减号变色
		minusColor();
        plusColor();
		function plusColor() {
			var Number = $('.size .quantity .number');
			var plus = $('.size .quantity .plus');
			if(Number.val() >= sku ) {
				plus.addClass('min');
			} else {
				plus.removeClass('min');
			}
		};
		function minusColor() {
			var Number = $('.size .quantity .number');
			var minus = $('.size .quantity .minus');
			if(Number.val() <=number_min) {
				minus.addClass('min');
			} else {
				minus.removeClass('min');
			}
		};

		function SizeNumber(index) {
			var value = $('.size .quantity .number').val();
			$('.size .quantity .number').val(parseInt(value) + parseInt(index));
			minusColor();
			plusColor();
		}
	};
//	加入购物车
    function appCart(type){
    	var datas={
    		token:tokenlogin,
    		gid:getQueryString('id'),
    		number:$('.size .quantity .number').val(),
    		cart_type:type
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
			if(data.code==1){
				if(type=='buy'){
					window.location.href='affirm_order.html';
				}else{
					refreshTrolley_badge();
				mui.toast('成功加入购物车');
				}
			}
		})
   }
// 获取库存
function skuFn(data){
	var sku=data.rows.skuprice.sku;
	return parseInt(sku);
}
})