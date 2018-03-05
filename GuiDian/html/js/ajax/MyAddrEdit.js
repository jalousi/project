mui.init({
	beforeback: function() {
		var refresh_MyAddrManage = plus.webview.getWebviewById('MyAddrManage.html');
		mui.fire(refresh_MyAddrManage, 'refresh-MyAddrManage');
		return true;
	}
});

var index = 0,
	Data = "";
var setMorenBtn = document.querySelector('#setMorenBtn');
setMorenBtn.addEventListener('click', function(event) {
	if(setMorenBtn.checked) {
		index = 1;
	} else {
		index = 0;
	}
}, false);
var flag = 0;
FastClick.attach(document.body); //ios点击优化
$(".footer .save").bind('tap', saveTap);
$("#Name").blur(function() {
	verifyName($("#Name").val());
});
$("#Phone").blur(function() {
	checkPhone($("#Phone").val());
});

//点击事件
function saveTap() {
	if(flag == 0) {
		flag = 1;
		if(verifyName($("#Name").val())) {
			if(checkPhone($("#Phone").val())) {
				if(checkCity($("#sel_city").text())) {
					if(Address($("#Address").val())) {
						//        加入Ajax
						var address = $("#sel_city").text() + $("#Address").val();
						if(did) {
							if(IsAddress()) {
								mui.back();
							} else {
								saveAddress(index, $("#Name").val(), address, $("#Phone").val());
							}
						} else {
							AddrEditAjax(index, $("#Name").val(), address, $("#Phone").val());
						}
					}
				}
			}
		}
		setTimeout(function() {
			flag = 0;
		}, 3000);
	};
}

//详细地址
function Address(value) {
	if(value.length > 5) {
		return true;
	} else {
		mui.toast("请输入正确的详细地址");
		return false;
	}
}
//选择城市
function checkCity(value) {
	if(value != "请选择您所在的城市") {
		return true;
	} else {
		mui.toast("请选择城市");
		return false;
	}
}
//添加地址
var wxid = localStorage.getItem("m_openid");
var did = getQueryString("did");

function AddrEditAjax(index, name, address, phone) {
	var area_names = $("#sel_city").text().split(" ");
	area_names = area_names.join(",");
	mui.post(commonUrl + 'apigd/memberaddressadd', {
		m_openid: wxid,
		data_man: name,
		data_address: address,
		data_tel: phone,
		isdefault: index,
		data_area1_names: area_names
	}, function(data) {
		if(data.code == 1) {
			mui.toast("保存成功");
			//如果是从确认订单进来的，添加地址后直接返回订单页面
			if(window.location.href.indexOf('isOrderSure') >= 0) {
				localStorage.setItem('addrid', data.data);
				var refresh_OrderSure = plus.webview.getWebviewById('OrderSure.html');
				mui.fire(refresh_OrderSure, 'refreshMyAddr');
				var refresh_MyAddrManage = plus.webview.getWebviewById('MyAddrManage.html');
				mui.fire(refresh_MyAddrManage, 'refresh-MyAddrManage');
				plus.webview.show(refresh_OrderSure);
			} else {
				mui.back();
			}
		} else {
			mui.toast("保存失败");
		}
	}, 'json');
}
//修改地址
if(did) {
	amendAddress();
}

function amendAddress() {
	mui.getJSON(commonUrl + 'apigd/memberaddressrows ', {
		m_openid: wxid,
		did: did
	}, function(data) {
		if(data.code == 1) {
			Data = data.data;
			var address = Data.address;
			$("#Name").val(Data.man);
			$("#Phone").val(Data.tel);
			var area_names = Data.area1_names.split(",");
			area_names = area_names.join(" ");
			$("#sel_city").html(area_names);
			$("#Address").val(address.replace(area_names, ""));
			if(Data.isdefault == 1) {
				setMorenBtn.setAttribute("checked", true);
				index = 1;
			} else {
				index = 0;
			}
		} else {
			mui.toast('获取地址失败');
		}
	})
}
//判断信息是否改变
function IsAddress() {
	var address = $("#sel_city").text() + $("#Address").val();
	if($("#Name").val() == Data.man && $("#Phone").val() == Data.tel && address == Data.address && index == Data.isdefault) {
		return true;
	} else {
		return false;
	}
}
//修改保存的地址
function saveAddress(index, name, address, phone) {
	var area_names = $("#sel_city").text().split(" ");
	area_names = area_names.join(",");
	mui.post(commonUrl + 'apigd/memberaddressedit', {
		m_openid: wxid,
		data_man: name,
		data_address: address,
		data_tel: phone,
		isdefault: index,
		data_area1_names: area_names,
		data_id: did
	}, function(data) {
		if(data.code == 1) {
			mui.toast("修改成功");
			//如果是从确认订单进来的，添加地址后直接返回订单页面
			if(window.location.href.indexOf('isOrderSure') >= 0) {
				localStorage.setItem('addrid', data.data);
				var refresh_OrderSure = plus.webview.getWebviewById('OrderSure.html');
				mui.fire(refresh_OrderSure, 'refreshMyAddr');
				var refresh_MyAddrManage = plus.webview.getWebviewById('MyAddrManage.html');
				mui.fire(refresh_MyAddrManage, 'refresh-MyAddrManage');
				plus.webview.show(refresh_OrderSure);
			} else {
				mui.back();
			}
		} else {
			mui.toast("修改失败");
		}
	}, 'json');
}