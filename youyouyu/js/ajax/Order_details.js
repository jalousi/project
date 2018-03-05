$(function(){
	var tokenlogin = localStorage.getItem('m_openid');
	order_details();
	function order_details() {
		var datas = {
			token: tokenlogin,
			isgoods: 1,
			did:getQueryString('did')
		};
		datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'store/orderDetails',
			method: 'GET',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			if(data.code==1){
			var users = data.data;
			
			//			console.log(JSON.stringify(users));
				$('#template1').tmpl(users).appendTo('.addrEdit');
				$('#template2').tmpl(users).appendTo('.details_content');
				thretreat(data.data.status);
			}
		})
	}
	function thretreat(status){
		if(status==20 || status==30 || status==70){
		}else{
			$('.compile button').show();
			$('.compile button').bind('click',function(){
			window.location.href="salesSelets.html?did="+getQueryString('did');
		})
		}
	}
})
