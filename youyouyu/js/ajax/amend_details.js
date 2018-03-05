	//将图片压缩转成base64
	function amend() {
		function convertImgToBase64(url, callback, outputFormat) {
			var canvas = document.createElement('CANVAS');
			var ctx = canvas.getContext('2d');
			var img = new Image;
			img.crossOrigin = 'Anonymous';
			img.onload = function() {
				var width = img.width;
				var height = img.height;
				// 按比例压缩 rate 倍
				canvas.width = 200;
				canvas.height = 200;
				ctx.drawImage(img, 0, 0, width, height, 0, 0, 200, 200);
				var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg', 0.5);
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
		$('#fileSelect').bind('change', function(event) {
			var imageUrl = getObjectURL($(this)[0].files[0]);
			convertImgToBase64(imageUrl, function(base64Img) {
				update_head_img(base64Img);
				// base64Img为转好的base64,放在img src直接前台展示(<img src="data:image/jpg;base64,/9j/4QMZRXh...." />)
				//alert(base64Img);
				// base64转图片不需要base64的前缀data:image/jpg;base64
				//alert(base64Img.split(",")[1]);
			});
			event.preventDefault();
		})

		function update_head_img(base64Img) {
			//先上传
			var datas = {
				data: base64Img,
				clientid: token
			}
			$.post(commonUrl + 'others/upload2', datas, function(data) {
				if(data.code == 1) {
//					mui.toast('图片上传成功');
					var Url = data.data.full_url;
					$('section div img').attr('src', Url);
					modification('datajson_pic', Url);
					//触发首页webview上自定义的刷新个人信息和购物车事件
				} else {
					mui.toast("图片上传失败");
				}
			}, 'json');
		}
//修改个人信息
		function modification(type, value) {
			var data_json = {};
			data_json[type] = value;
			data_json = JSON.stringify(data_json);
			var datas = {
				token: localStorage.getItem('m_openid'),
				data_json: data_json
			}
			datas = api_com_ps(datas);
			//				console.log(JSON.stringify(datas));
			var opsx = {
				url: commonUrl + 'store/userInfoSave',
				method: 'post',
				data: datas,
				datatype: 'json',
			};
			api_call(opsx, function(data) {
				if(data.code==1){
				   mui.toast('图片修改成功');
				}
			});
		}
	}