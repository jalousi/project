var wxid = localStorage.getItem("m_openid");

var data_linksele = $('.forcontact');
var data_contentsele = $('.maintext');

mui('.inputboxs').on('tap', '.submitadvice', function() {
	var data_links = data_linksele.val().replace(' ','');
	var data_content = data_contentsele.val().replace(' ','');
	if(data_content != '' && data_links != '') {
		submitAdvices('adds', '', data_links, data_content);
	} else {
		mui.plusReady(function() {
			plus.nativeUI.toast('请完善信息');
		})
	}
});

function submitAdvices(_dotype, _data_title, _data_links, _data_content) {
	mui.ajax(commonUrl + 'apigd/membermsg', {
		data: {
			m_openid: wxid,
			dotype: _dotype,
			data_title: _data_title,
			data_links: _data_links,
			data_content: _data_content
		},
		dataType: 'json',
		type: 'post',
		timeout: 6000,
		success: function(data) {
			if(data.code == 1) {
				mui.plusReady(function() {
					data_linksele.blur();
					data_contentsele.blur();
					plus.nativeUI.toast('感谢您的建议和宝贵意见，我们会继续改进');
					setTimeout(function(){
						mui.back();
					},2000)
				})
			} else if(data.code == -1) {
				mui.plusReady(function() {
					plus.nativeUI.toast('提交失败');
				})
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}