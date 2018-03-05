$(function(){
	var tokenlogin = localStorage.getItem('m_openid');
	getIntegral();
//	当前余额
	function getIntegral(){
		var datas = {
			token: tokenlogin,
		};
		datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'store/getIntegral',
			method: 'GET',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			if(data.code==1){
			var users = data.data;
			//			console.log(JSON.stringify(users));
			$('header p').html(users.credit_cz);
        }
		})
	}
//	余额明细
userRecord();
	function userRecord(){
		var datas = {
			token: tokenlogin,
			type:'credit'
		};
		datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'store/userRecord',
			method: 'GET',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			if(data.code==1){
			var users = data.data.listdata;
			if(users.length>0){
			//			console.log(JSON.stringify(users));
			$('#template1').tmpl(data.data).appendTo('.balance_list');
			}else{
				$('#template2').tmpl(data).appendTo('.balance_list');
			}
        }
		})
	}
})
