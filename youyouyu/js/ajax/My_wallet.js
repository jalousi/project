$(function(){
	var tokenlogin = localStorage.getItem('m_openid');
	getBalance();
//	当前余额
	function getBalance(){
		var datas = {
			token: tokenlogin,
		};
		datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'store/getBalance',
			method: 'POST',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			if(data.code==1){
			var users = data.data;
			//			console.log(JSON.stringify(users));
			$('header h3 span').html(changeTwoDecimal_f(users.yue_cz));
		  }
		})
	}
//	余额明细
userRecord();
	function userRecord(){
		var datas = {
			token: tokenlogin,
			type:'yue',
			status:1
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
