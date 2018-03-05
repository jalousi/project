var addId=getQueryString('did');
$(function(){
	var tokenlogin = localStorage.getItem('m_openid');
	var addIndex=0;
	var quanlist,qid;
	//	获取选中地址
	addedit();
	cartList();
//	获取默认地址
function addedit(){
	var datas={
    		token:tokenlogin
    	};
    	datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'store/addressList',
			method: 'GET',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			var users=data.data.listdata;
				if(users.length>0){
					if(addId){
//						获取地址index
						for(i=0;i<users.length;i++){
							if(users[i].id==addId){
								addIndex=i;
							}
						}
					}else{
						addId=users[0].id;
					}
					$('.addrEdit .nullAdd').hide();
					$('#template1').tmpl(users[addIndex]).appendTo('#add');
				}else{
					$('.addrEdit .nullAdd').show();
				}
		})
}
//获取订单商品列表
	 function cartList(){
    	var datas={
    		token:tokenlogin,
    		cart_type:'buy'
    	};
    	datas = api_com_ps(datas);
		//					console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'store/cartList',
			method: 'GET',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			var users=data.data.lists;
			quanlist=data.data.quanlist;
			if(users.length>0){
				$('#template2').tmpl(data.data).appendTo('.content');
				$('.get_point p span span').html(data.data.dhblv_credit);
				totalPrices();
				if(quanlist.length>0){
				$('.couponCenter').empty();
		        $('#template3').tmpl(data.data).appendTo('.couponCenter');
		         kyquan(data.data);
		         selectCoupon();
		    }
			}
		})
    }
	 //	商品价格计算
     function totalPrices(num){
     	var totalprices=0;
     	$('.content section').each(function(e){
     			var unit=$(this).find('.right div p').html();
     			var size=$(this).find('.right h3 .spansize').html();
     			unit=unit.slice(1);
     			size=size.slice(1);
     			totalprices+=parseFloat(changeTwoDecimal_f(parseFloat(unit)*parseInt(size)));
     	});
     	if(num){
     		totalprices=parseFloat(totalprices)-parseFloat(num);
     	}
     	$('.footer1 .taoil').html(changeTwoDecimal_f(totalprices));
     	$('.checkstand section span span').html(changeTwoDecimal_f(totalprices));
     	$('.checkstand .payment button').unbind().bind('click',function(){
     			createOrder();
     	})
     }
//   提交订单
    function createOrder(){
    	var datas={
    		token:tokenlogin,
    		cart_type:'buy',
    		data_addressid:addId,
    		type:'sell'
    	};
    	if(qid){
    		datas.quanid=qid;
    	}
    	datas = api_com_ps(datas);
//		console.log(JSON.stringify(datas));
		var opsx = {
			url: commonUrl + 'appyyyl/shopCartOrder',          
			method: 'POST',
			data: datas,
			datatype: 'json',
		};
		api_call(opsx, function(data) {
			mui.toast(data.msg);
			if(data.code==1){
				history.replaceState(null, 'index', 'index.html');
				window.location.href='My_order.html';
			}
		})
    }
   
//  获取可用优惠券
function kyquan(data){
	if(quanlist.length>0){
		$('.coupon .top .title span').hide();
		$('.coupon .top .size span').html(quanlist.length);
		$('.coupon .top').bind('click',function(){
//		  $('.affirm_order .mask').show();
		  $('.affirm_order .selectCoupon').css('display','flex');
		});
	}else{
		$('.coupon .top p span').show();
	}
}
function selectCoupon(){
	$('.affirm_order .selectCoupon section').bind('click',function(){
		$(this).toggleClass('checked');
		$(this).siblings().removeClass('checked');
		$('.affirm_order .selectCoupon section').each(function(e){
			if($(this).hasClass('checked')){
				setTimeout(function(){
					showquan(e);
				},300);
			}
		})
	});
}
//选中优惠券显示出来
function showquan(index){
	var showQ=quanlist[index];
	qid=showQ.id;
	$('.coupon .bottom p span').html(showQ.use_json.money);
	totalPrices(showQ.use_json.money);
	$('.coupon .bottom').css('display','flex');
	$('.affirm_order .mask').hide();
	$('.affirm_order .selectCoupon').css('display','none');
}
})
