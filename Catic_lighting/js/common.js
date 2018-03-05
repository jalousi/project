//共用接口IP
var commonUrl = 'http://118.190.148.224:8080/FHMYSQL/';
//底部栏
thinking('applxwm/detail','#footer','.message ul');
//通用AJAX
	function thinking(url,obj1,obj2,callback){
		$.ajax({
		type: 'get',
		url: commonUrl + url,
		data:'',
		dataType: 'json',
		success: function(result) {
			if(result.resultcode == 0001) {
				$(obj1).tmpl(result).appendTo(obj2);
				if(callback){
					callback(result);
				}
			} else {
				alert(result.result);
			}
		},
		error: function(xhr, status, error) {
			alert(xhr);
		}
	})
	}
//	分页
	function paginator(total,num,callback){
		$('#jqpaginator ul').empty();
		$('#jqpaginator ul').jqPaginator({
				totalCounts: total,
				pageSize: num,
				//  first: '<li class="first"><a href="javascript:;">Previous</a></li>',
				//  last: '<li class="last"><a href="javascript:;">Previous</a></li>',
				prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
				next: '<li class="next"><a href="javascript:;">下一页</a></li>',
				page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
				onPageChange: function(num, type) {
					if(callback){
						callback(num);
					}
				}
			});
	}
	
//	弹框预约
function formInput(subject){
	$(".phone input").bind('input oninput',function() {
	checkPhone($(this).val(),$(this));
	});
	$(".subject input").bind('input oninput',function() {
	is_input($(this))
	});
	$(".name input").bind('input oninput',function() {
	is_input($(this))
	});
	if(subject){
		$("label.subject input").val(subject);
	}
	$('.subscribe .submit button').unbind('click').bind('click',function(){
		if( is_input($('.name input')) && checkPhone($('.phone input').val(),$('.phone input')) && is_input($('.subject input'))){
			submitAjax();
		}
	})
	function submitAjax(){
		var datas={
			name:$('.name input').val(),
			phone:$('.phone input').val(),
			km:$('.subject input').val(),
			email:$('.email input').val()
		};
			$.ajax({
		type: 'post',
		url: commonUrl+'appzxyy/save',
		data: datas,
		dataType: 'json',
		success: function(result) {
			if(result.resultcode == 0001) {
				alert(result.result);
			} else {
				alert(result.result);
			}
		},
		error: function(xhr, status, error) {
			alert(xhr);
		}
	})
	}
}
function is_input(Object){
	if(is_null(Object.val())){
		Object.parent().addClass('error');
		return false;
	}else{
		Object.parent().removeClass('error');
		return true;
	}
}
//获取url中的数据
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
};
function jointUrl(num1, num2, num3) {
	var Href = num1 + "?id=" + num2 + "&catid=" + num3;
	return Href;
}

//验证姓名
function verifyName(val,Object) {
	var reg = /^[\u4E00-\u9FA5]{2,4}$/;
	if(!reg.test(val)) {
		Object.parent().addClass('error');
		return false;
	} else {
		Object.parent().removeClass('error');
		return true;
	}
}

//验证中文
function isChinese(temp) {
	if(!temp == "") {
		var re = /[^\u4e00-\u9fa5]/;
		if(re.test(temp)) {
			mui.toast('请输入中文');
			return false;
		} else {
			return true;
		}
	} else {
		mui.toast("商户名称不能为空");
	}
}

//验证手机号
function checkPhone(phone,Object) {
	if(!(/^1[34578]\d{9}$/.test(phone))) {
		Object.parent().addClass('error');
		return false;
	} else {
		Object.parent().removeClass('error');
		return true;
	}
}

//字符串去点空格
function Trim(str, is_global) {
	var result;
	result = str.replace(/(^\s+)|(\s+$)/g, "");
	return result;
};　
//验证银行卡
function CheckBankNo(t_bankno) {  　　
	var bankno = Trim(t_bankno.val(), "g");
	if(bankno == "") {    　　
		mui.toast("请填写银行卡号");     
		return false;   
	}   
	if(bankno.length < 16 || bankno.length > 19) {     
		mui.toast("银行卡号长度必须在16到19之间");     
		return false;   
	}   
	var num = /^\d*$/; //全数字
	   
	if(!num.exec(bankno)) {     
		mui.toast("银行卡号必须全为数字");     
		return false;   
	}    //开头6位
	   
	var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";   
	if(strBin.indexOf(bankno.substring(0, 2)) == -1) {     
		mui.toast("银行卡号开头6位不符合规范");     
		return false;   
	}     
	mui.toast("验证通过!");     
	return true;   
}

//验证密码
function isPasswd(s) {
	var patrn = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+){6,15}$/;
	if(!patrn.exec(s)) {
		mui.toast('请输入正确密码');
		return false;
	} else {
		return true;
	}
}

//二次验证密码
function toispasswd(a, b) {
	if(a === b) {
		return true;
	} else {
		mui.toast('两次输入的账号不一样')
		return false;
	};
}
function is_null(data){
	if(data == 'undefined' || data == undefined || data == "" || data == 0 || data == "0" || data == 'null' || data == null || data == 'false' || data == false){
		return true;
	}else{
		return false;
	}
}






