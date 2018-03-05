//mui js
mui.init({
	swipeBack: true //启用右滑关闭功能
});

//主列表点击事件
mui('.page-slideright').on('tap', 'a', function() {
	var _id = this.getAttribute("data-wid");
	var href = this.getAttribute('href');

	if(!_id) {
		_id = href.split('?')[0];
	}

	if(href.indexOf('GoodsList.html') >=0 ) {
		_id = href.split('?')[0];
	}
	
	//非plus环境，直接走href跳转
	if(!mui.os.plus) {
		location.href = href;
		return;
	}

	if(~href.indexOf('.html')) {
		var showloading = false;
		if(~href.indexOf('GoodsList.html') || ~href.indexOf('GoodsIntr.html')) {
			showloading = true;
		};
		mui.openWindow({
			url: href,
			id: _id,
			styles: {
				top: '0px', //新页面顶部位置
				bottom: '0px' //新页面底部位置
			},
			extras: {

			},
			createNew: true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
				event: 'titleUpdate', //页面显示时机，默认为titleUpdate事件时显示
				extras: {} //窗口动画是否使用图片加速
			},
			waiting: {
				autoShow: showloading, //自动显示等待框，默认为true
				title: 'Loading...', //等待对话框上显示的提示内容
				options: {
					//width: '40px', //等待框背景区域宽度，默认根据内容自动计算合适宽度
					//height: '40px' //等待框背景区域高度，默认根据内容自动计算合适高度
				}
			}
		});
	}
});