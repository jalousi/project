	// 百度地图API功能
	window.onload = function() {
//
//		aBmap('长沙市芙蓉区五一大道湘域中央1栋2209室');
//
//		function aBmap(city) {
//			var map = new BMap.Map("allmap"); // 创建Map实例
//			map.centerAndZoom(city, 15);
//
//			map.centerAndZoom(new BMap.Point(116.4035, 39.915), 8);
//			setTimeout(function() {
//				map.setZoom(14);
//			}, 2000); //2秒后放大到14级
//			map.enableScrollWheelZoom(true);
//			var myGeo = new BMap.Geocoder();
//			myGeo.getPoint(city, function(point) {
//				if(point) {
//					map.centerAndZoom(point, 15);
//					map.addOverlay(new BMap.Marker(point));
//					map.addOverlay(point); //添加谷歌marker
//				} else {
//					alert("您选择地址没有解析到结果!");
//				}
//			}, "长沙市");
//		}
//
//		//  在线咨询
		$('.consulting,.content div p span,.section4 .school ul li').bind('click', function() {
			open_win();
		})		
	};
	function open_win() {
			var width = 500; //弹出窗口的宽度;  
			var height = 500; //弹出窗口的高度;  
			var top = (window.screen.availHeight - height) / 2; //窗口的垂直位置;  
			var left = (window.screen.availWidth - width) / 2; //窗口的水平位置;  
			window.open('http://p.qiao.baidu.com/cps/chat?siteId=11214044&userId=24531059', 'newwindow', 'height=' + height + ',width=' + width + ',top=' + top + ',left=' + left + ',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
			//			window.open("http://p.qiao.baidu.com/cps/chat?siteId=11214044&userId=24531059","在线咨询","_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")
		}