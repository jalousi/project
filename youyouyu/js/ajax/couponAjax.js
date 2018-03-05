$(function() {
	var tokenlogin = localStorage.getItem('m_openid');
	//	获取优惠券列表
	Mycoupon(2, '.unused');
	Mycoupon(1, '.used');
	Mycoupon(3, '.expired');

	function Mycoupon(index, e) {
		var datas = {
			token: tokenlogin,
			status: index
		};
		datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'store/userQuanList',
			method: 'GET',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			var users = data.code;
			//			console.log(JSON.stringify(users));
			if(users == 1) {
				$('#template1').tmpl(data).appendTo(e);
			} else {
				$('#template2').tmpl(data).appendTo(e);
			}
			_swiper();
		})
	}

	function _swiper() {
		var mySwiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			autoHeight: true,
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
			$('nav .border').css('left', 10 + index * 32.8 + '%');
			$('nav ul li').eq(index).siblings().removeClass('selected');
			$('nav ul li').eq(index).addClass('selected');
			mySwiper.slideTo(index);
		}
	}
})