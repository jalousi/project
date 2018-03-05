$(function() {
	var tokenlogin = localStorage.getItem('m_openid');
	order_details();

	function order_details() {
		var datas = {
			token: tokenlogin,
			did: getQueryString('id')
		};
		datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'appcom/shopThhrRows',
			method: 'GET',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			if(data.code == 1) {
				var users = data.data;
				$('.state-message span').html('￥' + users.money);
				$('.state-message .tuihuo').html(users.remark);
				switch(parseInt(users.status)) {
					case 1:
						$('.schedule').addClass('schedule1');
						mySwiper.slideTo(0);
						break;
					case 2:
					case 4:
					    mySwiper.slideTo(1);
						$('.schedule').addClass('schedule2');
						$('.stateMe li').eq(1).html('审核通过');
						break;
					case 3:
					case 6:
					    mySwiper.slideTo(2);
						$('.schedule').addClass('schedule3');
						$('.stateMe li').eq(1).html('审核失败');
						$('.stateMe li').eq(2).html('退货失败');
						$('.Sbyy').show();
						$('.Sbyy .shibai').html(users.logrows.op_remark);
						break;
					case 5:
					   mySwiper.slideTo(3);
						$('.schedule').addClass('schedule3');
						$('.stateMe li').eq(1).html('审核通过');
						$('.stateMe li').eq(2).html('退货成功');
						break;
				}
			}
		})
	}
	var mySwiper = new Swiper('.swiper-container', {
//		allowSwipeToNext:false,
//		allowSwipeToPrev:false
			});
})