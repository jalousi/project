var liIndex=0;
$(function() {
	
	var tokenlogin = localStorage.getItem('m_openid');
	order_details();

	function order_details() {
		var datas = {
			token: tokenlogin,
			isgoods: 0,
			did: getQueryString('did')
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
			if(data.code == 1) {
				var users = data.data;
				shopThhrSq(users.orderid);
				delImg();
			}
		})
	}

	function shopThhrSq(orderid) {
		$('.submit').bind('click', function() {
			if(th_remark() && th_money() &&isloadIMG()) {
				var datas = {
					token: tokenlogin,
					orderid: orderid,
					type: 'th',
					remark: th_remark(),
					money: th_money(),
					ogids:getQueryString('ids')
				};
				if(imgSrc.length>0){
					datas.pics=imgSrc.join(',');
				}
				datas = api_com_ps(datas);
				var opsx = {
					url: commonUrl + 'appcom/shopThhrSq',
					method: 'POST',
					data: datas,
					datatype: 'json',
				};
				api_call(opsx, function(data) {
					if(data.code==1){
						mui.toast('提交成功');
						window.location.href='Th_schedule.html?id='+data.data;
					}else{
						mui.toast(data.msg);
					}
				})
			}
		})
	}

	//删除图片
	function delImg() {
		$('.uploadImg .uploadImg-click p span').html(imgSrc.length);
		$('.uploadImg .loading .del').unbind('click').bind('click', function() {
			delIndex($(this).parent().index());
			$(this).parent().remove();
		})
		function delIndex(index){
			imgSrc.splice(index,1);
			if(imgSrc.length<=6){
				$('.uploadImg .uploadImg-click').show();
				$('.uploadImg .uploadImg-click p span').html(imgSrc.length);
			}
		}
	}
	//检测退货理由
	function th_remark() {
		var salesM = $('.explain p textarea').val();
		if(salesM == "") {
			mui.toast('请输入退货理由！');
			return false;
		} else {
			return salesM;
		}
	}
	//检测退货金额
	function th_money() {
		var money = $('.Money input').val();
		if(money == "" || isNaN(money) || money == " ") {
			mui.toast('请输入正确的退货金额！');
			return false;
		} else {
			return money;
		}
	}
		//检测是否有图片在上传
	function isloadIMG() {
		var index=true;
		$.each(imgSrc, function(e) {
		      if(imgSrc[e]=='false'){
		      	index=false;
		      	mui.toast('还有未上传完的图片！');
		      	return false;
		      }
		});
		return index;
	}


	function convertImgToBase64(url, callback, outputFormat) {
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var img = new Image;
		img.crossOrigin = 'Anonymous';
		img.onload = function() {
			var width = img.width;
			var height = img.height;
			// 按比例压缩 rate 倍
			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
			var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg', 0.1);
			callback.call(this, dataURL);
			canvas = null;
		};
		img.src = url;
	}

	function getObjectURL(file) {
		var url = null;
		if(window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if(window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if(window.webkitURL != undefined) { // web_kit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	}
	var imgSrc = [];
//	剩余图片上传数量
	var SurplusImg=6;
	// 前端只需要给input file绑定这个change事件即可（上面两个方法不用管）huodong-msg为input class
	$('#fileSelect').bind('change', function() {
//		mask.show();
		updata($('#fileSelect'));
	});

	function updata(_Object) {
        if(_Object[0].files.length <=SurplusImg-imgSrc.length){
           for(var j=0;j<_Object[0].files.length;j++){
           	var txt1='<li><div class="loadingImg"><img src="img/fangxing@3x.png"/></div><div class="del"><img src="img/delimg.png"></div></li>'; 
                  $('.uploadImg-click').before(txt1);
                  imgSrc.push('false');
           }
            if(imgSrc.length>=6){
				  	$('.uploadImg-click').hide();
				  }
           delImg();
        	for(var i=0;i<_Object[0].files.length;i++){
			var imageUrl = getObjectURL(_Object[0].files[i]);
			convertImgToBase64(imageUrl, function(base64Img) {
			update_head_img(base64Img, i);
			// base64Img为转好的base64,放在img src直接前台展示(<img src="data:image/jpg;base64,/9j/4QMZRXh...." />)
			//alert(base64Img);
			// base64转图片不需要base64的前缀data:image/jpg;base64
			//alert(base64Img.split(",")[1]);
		});
		}
        }else{
        	mui.toast('图片数量超出限定值！');
        }
		event.preventDefault();
	}
	//更新用户头像
	function update_head_img(base64Img, index) {
		//先上传
		var datas = {
			data: base64Img,
			clientid: token
		};
		$.post(commonUrl + 'others/upload2', datas, function(data) {
			if(data.code == 1) {
				$('.loading li').eq(liIndex).find('.loadingImg img').attr('src',data.data.full_url);
				if(imgSrc[liIndex]=='false'){
					imgSrc[liIndex]=data.data.full_url;
					mui.toast('图片上传成功');
				}
				liIndex++;
//				  imgSrc.push(data.data.full_url);
				  
//                var txt1='<li><div class="loadingImg"><img src="'+data.data.full_url+'"></div><div class="del"><img src="img/delimg.png"></div></li>'; 
//                $('.uploadImg-click').before(txt1);
				//触发首页webview上自定义的刷新个人信息和购物车事件
			} else {
				mui.toast("图片上传失败");
			}
//			mask.close();
		}, 'json');
	}
})