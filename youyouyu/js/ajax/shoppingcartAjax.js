if(istoken()) {
	$(function() {
		var mask=spinMask();
		refreshTrolley_badge();
		var tokenlogin = localStorage.getItem('m_openid');
		var Gdata, skus = [],number_min=[];var DelIndex = 0;
		mask.show();
		cartList();
//		全选按钮点击切换
		$('.account .left p').bind('click', function() { 
			if($(this).hasClass('checked')) {
				$(this).removeClass("checked");
				$('section .checkbox').removeClass('checked');
			} else {
				$(this).addClass("checked");
				$('section .checkbox').addClass('checked');
			}
			totalPrices();
		})
/*        	删除商品按钮切换*/
			$('.compile button').bind('click', function() {
				if(DelIndex == 0) {
					$(this).html('完成');
					$('.account a button .but1').html('删除');
					DelIndex = 1;
					$('section .checkbox').removeClass('checked');
					$('.account .left p').removeClass("checked");
				} else {
					$(this).html('编辑');
					$('.account a button .but1').html('确认订单');
					DelIndex = 0;
				}
				totalPrices();
			})
		//	获取用户购物车数据列表
		function cartList() {
			var datas = {
				token: tokenlogin,
				cart_type: 'cart'
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
				if(data.code ==1){
				 Gdata = data.data.lists;
				 data.data.DelIndex=DelIndex;
				if(Gdata.length == 0) {
					$('.shopping_cart article').hide();
					$('.shopping_cart .empty').show();
				} else {
					$('.content *').remove();
					$('#template1').tmpl(data.data).appendTo('.content');
					AjaxAmendsize();
					checkbox();
					totalPrices();
					skuEach(Gdata);
					ischeckedS();
				}
				mask.close();
				}else{
					mui.toast('请重新登录！');
						setTimeout(function(){
							window.location.href='login.html';
						},500);
				}
			})
		}
//     遍历商品库存和起订数量
		function skuEach(data) {
			$.each(data, function(index) {
				skus.push(parseInt(data[index].skuprice.sku));
				number_min.push(parseInt(data[index].goods.number_min))
			});
		}

		function AjaxAmendsize() {
			//	 	购物车数量加减效果
			$('.content .size .right').bind('click', function() {
				var index = $(this).parent().parent().index();
				if($('.content section').eq(index).find('.size p input').val() < skus[index]) {
					SizeNumber(index, 1);
				} else {
					mui.toast('库存不足');
				}
			})
			$('.content .size .left').bind('click', function() {
				var index = $(this).parent().parent().index();
				if($('.content section').eq(index).find('.size p input').val() > number_min[index]) {
					SizeNumber(index, -1);
				}else{
					mui.toast('购买数量最少为'+number_min[index]+'件！');
				}
			})

			function SizeNumber(index, num) {
				var Oinput = $('.content section').eq(index).find('.size p input');
				var value = Oinput.val();
				numberAjax(Gdata[index].flag, parseInt(value) + parseInt(num));
				Oinput.val(parseInt(value) + parseInt(num));
			}
			//		手动输入购买数量
			$('.content section .size p input').blur(function() {
				var index = $(this).parents('section').index();
				var Oinput = $('.content section').eq(index).find('.size p input');
				var value = Oinput.val();
				if(value > skus[index]) {
					mui.toast('您的输入数值超过库存数！');
					$(this).val(skus[index]);
				}
				if(value < number_min[index]) {
					mui.toast('购买数量最少为'+number_min[index]+'件！');
					$(this).val(number_min[index]);
				}
				numberAjax(Gdata[index].flag, $(this).val());
			})
		};

		//	购物车数量加减Ajax
		function numberAjax(flag, num) {
			var datas = {
				token: tokenlogin,
				flag: flag,
				number: num,
				cart_type: 'cart'
			};
			datas = api_com_ps(datas);
			//					console.log(JSON.stringify(datas));
			var opsx = {
				url: commonUrl + 'store/upCartNumber',
				method: 'POST',
				data: datas,
				datatype: 'json',
			};
			api_call(opsx, function(data) {
				//			alert(data.msg);
				totalPrices();
			})
		}
		//	商品价格计算
		function totalPrices() {
			var totalprices = 0; var cknum=0;
			$('.content section .checkbox').each(function(e) {
				if($(this).hasClass('checked')) {
					cknum++;
					var unit = $(this).siblings('.right').find('p').html();
					var size = $(this).siblings('.size').find('input').val();
					unit = unit.slice(1);
					totalprices += parseFloat(changeTwoDecimal_f(parseFloat(unit) * parseInt(size)));
				}
			})
			$('.account .left div h3 span').html(changeTwoDecimal_f(totalprices));
			$('.account a button .but2').html("("+cknum+")");
		}
		// 商品选中切换
		function checkbox() {
			$('section .checkbox').bind('click', function() {
				$(this).toggleClass('checked', 10);
				ischeckedS();
				totalPrices();
			});

			
			//          点击确认订单或者删除按钮
			$('.account a button').unbind().bind('click', function() {
				if(DelIndex == 0) {
					if($('#add h3')) {
						var flag = gainFlag();
						if(flag) {
							clearingCart(flag);
						} else {
							mui.toast('您未选中任何商品');
						};
					};
				} else {
					var flag = gainFlag();
					if(flag.length > 0) {
						var btnArray = ['取消', '确定'];
						mui.confirm("您确定删除该商品吗?", '悠悠雨', btnArray, function(e) {
							if(e.index == 1) {
								delAjax(flag);
							}
						})
					}else{
						mui.toast('您未选中任何商品');
					}
				}
			})
		}
		//      获取操作商品的flag;
		function gainFlag() {
			var flags = [];
			$('.content section').each(function(e) {
				var checkbox = $(this).find('.checkbox');
				if(checkbox.hasClass('checked')) {
					flags.push(Gdata[e].flag);
				}
			})
			flags = flags.join(',');
			return flags;
		}
//		判断商品是否全选
  function ischeckedS(){
  	var check=true;
  	$('.content section .checkbox').each(function(e) {
				if(! $(this).hasClass('checked')) {
					check=false;
				}
			})
     if(check){
     	$('.account .left p').addClass('checked');
     }else{
     	$('.account .left p').removeClass('checked');
     }
  }
  
		//      删除商品Ajax
		function delAjax(flag) {
			var datas = {
				token: tokenlogin,
				flag: flag,
				cart_type: 'cart'
			};
			datas = api_com_ps(datas);
			//		console.log(JSON.stringify(datas));
			var opsx = {
				url: commonUrl + 'store/delectCart',
				method: 'POST',
				data: datas,
				datatype: 'json',
			};
			api_call(opsx, function(data) {
				if(data.code == 1) {
					cartList();
					refreshTrolley_badge();
				}
			})
		}
		//      结算商品Ajax
		function clearingCart(flag) {
			var datas = {
				token: tokenlogin,
				flag: flag,
				cart_type: 'cart'
			};
			datas = api_com_ps(datas);
			//		console.log(JSON.stringify(datas));
			var opsx = {
				url: commonUrl + 'store/clearingCart',
				method: 'POST',
				data: datas,
				datatype: 'json',
			};
			api_call(opsx, function(data) {
				if(data.code == 1) {
					window.location.href = "affirm_order.html";
				}
			})
		}
	})
} else {
	promptLogin();
}