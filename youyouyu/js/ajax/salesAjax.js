var Gdata;
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
			Gdata=users.goodslist;
			//			console.log(JSON.stringify(users));
				$('#template1').tmpl(users).appendTo('.content');
				checkbox();
				$('.account').bind('click',function(){
					var ids=gainFlag();
					window.location.href='retreatFor.html?ids='+ids+'&did='+getQueryString('did');
				})
			}
		})
	}
})
function checkbox() {
			$('section').bind('click', function() {
				$(this).find('.checkbox') .toggleClass('checked', 10);
			});
		}
function gainFlag() {
			var flags = [];
			$('.content section').each(function(e) {
				var checkbox = $(this).find('.checkbox');
				if(checkbox.hasClass('checked')) {
					flags.push(Gdata[e].id);
				}
			})
			flags = flags.join(',');
			return flags;
		}