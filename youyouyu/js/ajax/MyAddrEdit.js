mui.init({
	beforeback: function() {
		window.location.href = 'MyAddrManage.html';
		return true;
	}
});
$(function(){
var addid=getQueryString('gwc');
var index = 0,
	Data = "";
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
						var address =$("#Address").val();
						if($('#setMorenBtn').is(':checked')){
							index=1;
						}else{
							index=0;
						}
						if(did) {						
								AddrEditAjax($("#Name").val(), address, $("#Phone").val(),'edit',did);
						} else {
							AddrEditAjax($("#Name").val(), address, $("#Phone").val(),'add',0);
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
		mui.toast("详细地址必须超过五个字");
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

function AddrEditAjax(name, address, phone,dotype,did) {
	var data_json={
		man:name,
		address:address,
		tel:phone,
		area1_names:cityname,
		area1_id:cityid
	};
	data_json=JSON.stringify(data_json);
	var psajax = {
		token: wxid,
		did:did,
		dotype:dotype,
		data_json: data_json,
		isdefault:index
	};
	var datas = api_com_ps(psajax);
//	console.log(JSON.stringify(datas));
	$.post(commonUrl + 'store/userAddressSave', datas, function(data) {
		if(data.code == 1) {
			mui.toast("保存成功");
			var gwcid;
			//如果是从确认订单进来的，添加地址后直接返回订单页面
			if(did){
				gwcid=did;
			}else{
				gwcid=data.data;
			}
            if(addid==0){
            	   history.replaceState(null,'购物车','shopping_cart.html');
		           window.location.href="affirm_order.html?&did="+gwcid;
	         }else{
	         	history.replaceState(null,'个人中心','My_center.html');
	         	window.location.href="MyAddrManage.html";
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

//获取地址详情
function amendAddress() {
	var psajax = {
		token: wxid,
		did: did
	};
	var datas = api_com_ps(psajax);
	$.getJSON(commonUrl + 'store/userAddressRows', datas, function(data) {
		if(data.code == 1) {
			Data = data.data;
			localStorage.setItem('addrid', data.data.id);
			var address = Data.address;
			$("#Name").val(Data.man);
			$("#Phone").val(Data.tel);
			var area_names = Data.area1_names.split(",");
			area_names = area_names.join(" ");
			$("#sel_city #cityResult3").val(area_names);
			$("#Address").val(address);
			if(Data.isdefault == 1) {
				$('#setMorenBtn').attr("checked", true);
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
})