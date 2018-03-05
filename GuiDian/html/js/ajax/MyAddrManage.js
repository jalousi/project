var wxid = localStorage.getItem("m_openid");
var Data = "";
AddList();
//自定义事件：选择地址之后刷新确认订单页面地址信息
document.addEventListener('refresh-MyAddrManage', function() {
	AddList();
});

//地址列表
function AddList() {
	$(".Conter .addrsbox").empty();
	if(window.location.href.indexOf('isOrderSure') >= 0) {
		$('.footer a').attr('href','MyAddrEdit.html?isOrderSure');
	}
	mui.getJSON(commonUrl + 'apigd/memberaddress', {
		m_openid: wxid,
		page: 1,
		pagesize: 10
	}, function(data) {
		Data = data.data.listdata;
		var html = "";
		if(Data) {
			for(var i = 0; i < Data.length; i++) {
				var Link = EditAddress(Data[i].id);
				html += '<section class="myAddrli"><div class="addr-msg"><p>' + Data[i].man + '</p><p>' + Data[i].tel + '</p><p>' + Data[i].address + '</p></div><div class="addr-edit">' +
					'<label class="defaultbox"><input type="checkbox" class="defaultaddr" name="defaultaddr"/>默认地址</label>' +
					'<div class="editbox"><div class="box editbtn"><a href="' + Link + '"><img src="images/edit.png"><span>编辑</span></a></div><div class="box"><a href="javascript:void(0);" class="deletaddr"><img src="images/trash.png"><span>删除</span></a></div></div></div><input class="Selectedaddrid" type="hidden" value="' + Data[i].id + '"/></section>'
			}
			$(".Conter .addrsbox").html(html);

			var _addrid;
			$('.myAddrli .addr-msg').click(function() {
				_addrid = $(this).closest('.myAddrli').find('.Selectedaddrid').val();
				mui.init({
					beforeback: function() {
						localStorage.setItem('addrid', _addrid);
						var refresh_OrderSure = plus.webview.getWebviewById('OrderSure.html');
						mui.fire(refresh_OrderSure, 'refreshMyAddr');
						return true;
					}
				});
				mui.back();
			});

			mui('.editbtn').on('tap', 'a', function() {
				var href = this.getAttribute('href');
				var id = href;
				creatMywebview(href, id);
			})
		}
		dafelut();
	});
}
//地址编辑
function EditAddress(did) {
	var Ahref = "MyAddrEdit.html";
	var Link = jointcommonUrl(Ahref, did);
	if(window.location.href.indexOf('isOrderSure') >= 0) {
		Link = Link + '&isOrderSure';
	}
	return Link;
}
//拼接commonUrl
function jointcommonUrl(num1, num2) {
	var Href = num1 + "?did=" + num2;
	return Href;
}

function dafelut() {
	for(var j = 0; j < Data.length; j++) {
		if(Data[j].isdefault == 1) {
			$(".addrsbox section:eq(" + j + ") .defaultbox input").attr('checked', true);
			$(".addrsbox section:eq(" + j + ") .defaultbox").addClass('orange');
		}
	}

	//修改默认地址
	$('.defaultaddr').click(function() {
		var index = $(this).closest('section').index(),
			num = 0;
		var $this = $(this);
		$this.closest('section').siblings().find('input[type=checkbox]').prop("checked", false);
		$this.closest('section').siblings().find('.defaultbox').removeClass('orange');
		if($this.prop("checked")) {
			$this.parent().addClass('orange');
			num = 1;
		} else {
			$this.parent().removeClass('orange');
			num = 0;
		};
		isDefault(index, num);

		function isDefault(index, num) {
			mui.post(commonUrl + 'apigd/memberaddressdef', {
				m_openid: wxid,
				isdefault: num,
				data_id: Data[index].id
			}, function(data) {
				if(data.code == 1) {
					mui.toast("设为默认地址成功!");
					AddList();
				} else {
					mui.toast("设为默认地址失败!");
				}
			}, 'json');
		}
	});
	//地址删除
	$('.deletaddr').click(function() {
		var index = $(this).closest('section').index();
		var $this = $(this);
		var btnArray = ['取消', '确定'];
		mui.confirm('您确定删除该地址吗？', '贵点', btnArray, function(e) {
			if(e.index == 1) {
				$this.closest('section').remove();
				DeleteAddress(index);
			}
		});

		function DeleteAddress(index) {
			mui.post(commonUrl + 'apigd/memberaddressdel', {
				m_openid: wxid,
				did: Data[index].id
			}, function(data) {
				if(data.code == 1) {
					mui.toast("删除成功");
					mui.getJSON(commonUrl + 'apigd/memberaddress', {
						m_openid: wxid,
						page: 1,
						pagesize: 10
					}, function(data) {
						Data = data.data.listdata;
					});
				} else {
					mui.toast("删除失败")
				}
			}, 'json');
		}
	});
}