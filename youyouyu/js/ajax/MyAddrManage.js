var wxid = localStorage.getItem("m_openid");
var Data = "";
AddList();
var gwcId=getQueryString('gwc');
function isOrder(data){
if(gwcId==1){
	$('.addrsbox .myAddrli .addr-msg').bind('click',function(){
		var index=$(this).parent().index();
		window.location.href='affirm_order.html?&did='+data[index].id;
	})
	var compile=$('.addrsbox .myAddrli .addr-edit .box .compile');
	var complieHref=compile.attr('href');
	compile.attr('href',complieHref+'&gwc=0');
	$('.footer a').attr('href',"MyAddrEdit.html?&gwc=0");
};
}
//地址列表
function AddList() {
	$(".Conter .addrsbox").empty();
	var psajax = {
		token: wxid
	};
	var datas = api_com_ps(psajax);
	$.getJSON(commonUrl + 'store/addressList', datas, function(data) {
		Data = data.data.listdata;
		var html = "";
		if(Data.length>0) {
			for(var i = 0; i < Data.length; i++) {
				var Link = EditAddress(Data[i].id);
				html +='<section class="myAddrli"><div class="addr-msg"><p>'+Data[i].man+'</p><p>'+Data[i].tel+'</p><p>'+Data[i].address_full+'</p></div>'
					    +'<div class="addr-edit"><label class="defaultbox"><input type="checkbox" class="defaultaddr" name="defaultaddr" />默认地址</label><div class="editbox"><div class="box"><a class="compile" href="'+Link+'"><span>编辑</span></a>'
					    +'</div><div class="box"><a href="javascript:void(0);" class="deletaddr"><span>删除</span></a></div></div></div><input class="Selectedaddrid" type="hidden" value="0" /></section>'
			}
			$(".Conter .addrsbox").html(html);

//			var _addrid;
//			if(window.location.href.indexOf('isOrderSure') >= 0) {
//				$('.myAddrli .addr-msg').click(function() {
//					_addrid = $(this).closest('.myAddrli').find('.Selectedaddrid').val();
//					localStorage.setItem('addrid', _addrid);
//					var OrderSure_href = localStorage.getItem('OrderSure-href');
//					window.location.href = OrderSure_href;
//				});
//			}

			mui('.editbtn').on('tap', 'a', function() {
				var href = this.getAttribute('href');
				var id = href;
				creatMywebview(href, id);
			})
}else{
	$('.MyAddrs .empty').show();
}
		dafelut();
		isOrder(Data);
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
			num = 1;
		var $this = $(this);
		$this.closest('section').siblings().find('input[type=checkbox]').prop("checked", false);
		$this.closest('section').siblings().find('.defaultbox').removeClass('orange');
		if($this.prop("checked")) {
			$this.parent().addClass('orange');
			num = 1;
		} else {
			$this.parent().removeClass('orange');
			num = 2;
		};
		isDefault(index, num);

		function isDefault(index, num) {
			var psajax = {
				dotype:'edit',
				token: wxid,
				isdefault: num,
				did: Data[index].id
			};
			var datas = api_com_ps(psajax);
//			console.log(JSON.stringify(datas));
			$.post(commonUrl + 'store/userAddressSave', datas, function(data) {
				if(data.code == 1) {
					if(num == 1){
						mui.toast("设为默认地址成功!");
					}
					//AddList();
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
		mui.confirm('您确定删除该地址吗？', '悠悠雨', btnArray, function(e) {
			if(e.index == 1) {
				$this.closest('section').remove();
				DeleteAddress(index);
			}
		});

		function DeleteAddress(index) {
			var psajax = {
				token: wxid,
				did: Data[index].id
			};
			var datas = api_com_ps(psajax);
			$.post(commonUrl + 'store/delectAddress', datas, function(data) {
				if(data.code == 1) {
					mui.toast("删除成功");
					$.getJSON(commonUrl + 'store/addressList', datas, function(data) {
		             Data = data.data.listdata;
					});
				} else {
					mui.toast("删除失败")
				}
			}, 'json');
		}
	});
}