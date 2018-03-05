var wxid = localStorage.getItem("m_openid");
var _orderid = getQueryString('orderid');
$('.myOrderid').html(_orderid);

var SysSecond;
var InterValObj;

mui.getJSON(commonUrl + 'apigd/orderrows', {
	m_openid: wxid,
	did: _orderid
}, function(data) {
	if(data.code == 1) {
		var Data = data.data;
		$('.Creattime').html(Data.creat_at);
		$('.ShouldPaynum').html(Data.order_price_total);
		$('.FinalPaynum').html(Data.order_price_final.toFixed(2));

		mui('footer').on('tap', '.tjdd', function() {
			var _FinalPaynum = $('.FinalPaynum').html();
			creatMywebview('OrderPayOnline.html?orderid=' + _orderid + '&finalPaynum=' + _FinalPaynum , 'OrderPayOnline.html');
		});
	}
});

function changeOrderStatus(_orderid, _optiontype) {
	mui.ajax(commonUrl + 'apigd/orderstatus', {
		data: {
			m_openid: wxid,
			orderid: _orderid,
			data_optype: _optiontype
		},
		dataType: 'json',
		type: 'post',
		timeout: 6000,
		success: function(data) {
			if(data.code == 1) {
				mui.plusReady(function() {
					plus.nativeUI.toast('操作成功');
				})
			} else if(data.code == -1) {
				mui.plusReady(function() {
					plus.nativeUI.toast('操作失败');
				})
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}