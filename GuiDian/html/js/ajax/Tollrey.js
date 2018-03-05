window.onload = function MyTrolley() {
	var wxid = localStorage.getItem("m_openid");
	Data = "";
	if(wxid) {
		cartData();
		//	购物车基本数据
		function cartData() {
			mui.getJSON(commonUrl + 'apigd/cartlist ', {
				m_openid: wxid
			}, function(data) {
				Data = data.data;
				var html = "";
				if(Data.length > 0) {
					mui.plusReady(function() {
						//获取首页webview
						var wvs = plus.webview.getLaunchWebview();
						//触发首页webview上自定义的模拟tap事件
						mui.fire(wvs, 'refreshTrolley', {
							goodsnum: Data.length
						});
					});
					for(var i = 0; i < Data.length; i++) {
						html += '<li class="goodslist"><div class="mui-input-row mui-checkbox mui-left"><label><div class="imgbox"><img src="images/Goods.jpg"></div><div class="buyit"><div class="buyit-top"><span class="goodsname">海南芒果（大台农）2000g</span><span class="deletgoods"><img src="images/trash.png"></span></div><div class="buyit-center"><span class="rules">规格</span></div><div class="buyit-bottom"><div class="singelprice"><span class="single-goods">￥<strong class="prices">59.90</strong></span><input class="sonprice" type="hidden" value="69.9"/></div><div class="priceadd"><span class="price-minus">-</span><span class="price-num" name="PriceNum">1</span><span class="price-plus">+</span></div></div></div></label><input name="checkbox" value="Item 1" type="checkbox" checked></div></li>';
					}
					var Ul = document.querySelector(".Conter .W-Trolley ul");
					Ul.innerHTML = html;
					var Pic = document.querySelectorAll(".goodslist  .imgbox img");
					var Tltle = document.querySelectorAll(".goodslist .buyit .buyit-top .goodsname");
					var Remark = document.querySelectorAll(".goodslist .buyit .buyit-center .rules");
					var price = document.querySelectorAll(".goodslist .buyit .buyit-bottom  .sonprice");
					var Nber = document.querySelectorAll(".goodslist .buyit .buyit-bottom  .priceadd .price-num");
					var prices = document.querySelectorAll(".goodslist .buyit .buyit-bottom  .singelprice .prices");
					var _imgsrc;
					for(var j = 0; j < Data.length; j++) {
						_imgsrc = Data[j].goods.data_json.pic_wh_60x60 || Data[j].goods.data_json.pic_wh_200x200 || Data[j].goods.data_json.pic || Data[j].goods.data_json.pics;
						Pic[j].setAttribute("src", _imgsrc);
						Tltle[j].innerHTML = Data[j].goods.title;
						Remark[j].innerHTML = (Data[j].buys.attrs).replace(',', '<em class="paddingem"></em>');
						price[j].setAttribute("value", Data[j].buys.price);
						Nber[j].innerHTML = Data[j].buys.number;
						prices[j].innerHTML = (Data[j].buys.price * Data[j].buys.number).toFixed(2);
					}
					$('.TotalCount').removeClass('hide');
					youhua();
				} else {
					$('.Trolleyempty').removeClass('hide');
					$('.TotalCount').hide();
					$('.W-Trolley').hide();
				}
			});
		}
		//	修改购物车
		function amend(index, num) {
			mui.post(commonUrl + 'apigd/cartedit', {
				m_openid: wxid,
				cart_type: 'cart',
				flag: Data[index].flag,
				number: num
			}, function(data) {
				if(data.code != 1) {
					plus.nativeUI.toast('操作失败');
				}
			}, 'json');
		}
	} else {
		mui.plusReady(function() {
			plus.nativeUI.toast('请先登录');
			var loginwindow = plus.webview.getWebviewById('Login.html');
			if(loginwindow != '[object Object]') { //无登陆页面webview
				var mylogin = plus.webview.create('Login.html', 'Login.html', {
					top: '0px',
					bottom: '0px'
				});
				var aniShowM = 'pop-in';
				if(parseFloat(mui.os.version) < 4.4) { //Android平台暂时
					aniShowM = 'slide-in-right';
				}
				mylogin.addEventListener("titleUpdate", function() {
					setTimeout(function() {
						mylogin.show(aniShowM, 300);
					}, 0);
				});
			} else { //有登陆页面webview
				var aniShowM = 'pop-in';
				if(parseFloat(mui.os.version) < 4.4) { //Android平台暂时
					aniShowM = 'slide-in-right';
				}
				loginwindow.addEventListener("titleUpdate",
					function() {
						setTimeout(function() {
							loginwindow.show(aniShowM, 300);
						}, 0);
					});
			};
			//获取首页webview
			var wvs = plus.webview.getLaunchWebview();
			//触发首页webview上自定义的模拟tap事件
			mui.fire(wvs, 'refreshTrolley', {
				goodsnum: 0
			});
		})
	}

	//购物车列表结算,确认订单
	mui('.countbtbox').on('tap', '.CountBtn', function(e) {
		var arr=new Array;
		$('.W-Trolley input[type=checkbox]').each(function(i){
			if($(this).is(':checked')){
				arr.push(Data[i].flag)
			}
		})
	     var Arr=arr.join(',');
		mui.ajax(commonUrl + 'apigd/cartjs', {	
			data: {
				m_openid: wxid,
				flag:Arr
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				if(data.code == 1) {
					var _mytotal = $('.TotalNum').html();
					creatMywebview('OrderSure.html?mytotal='+_mytotal, 'OrderSure.html');
				} else if(data.code == -1) {
					plus.nativeUI.toast('结算失败!');
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
			}
		});
	});
}