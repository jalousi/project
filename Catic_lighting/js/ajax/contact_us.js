$(function(){
	thinking('appbanner/modelcode/list?modelcode=blxwm','#navimg','.navimg');	
	thinking('applxwm/detail','#leave','.navimg-contact');
   $('.auth_code img').attr('src',commonUrl+'code/lycode.do?t='+genTimestamp());
   $('.auth_code img').bind('click',function(){
   	$(this).attr('src',commonUrl+'code/lycode.do?t='+genTimestamp());
   })
   formInput();
    function formInput(){
	$(".phone input").bind('input oninput',function() {
	checkPhone($(this).val(),$(this));
	});
	$(".email input").bind('input oninput',function() {
	is_input($(this))
	});
	$(".name input").bind('input oninput',function() {
	is_input($(this))
	});
	$(".qq input").bind('input oninput',function() {
	is_input($(this))
	});
	$(".auth_code input").bind('input oninput',function() {
	is_input($(this))
	});
	$('.leave-words .submit button').unbind('click').bind('click',function(){
		if(is_input($('.name input')) &&  checkPhone($('.phone input').val(),$('.phone input')) && is_input($('.leave_word textarea')) && is_input($('.auth_code input'))){
			submitAjax();
		}
	})
	function submitAjax(){
		var datas={
			name:$('.name input').val(),
			phone:$('.phone input').val(),
			content:$('.leave_word textarea').val(),
			email:$('.email input').val(),
			code:$('.auth_code input').val(),
			qq:$('.qq input').val()
		};
			$.ajax({
		type: 'post',
		url: commonUrl+'appzxly/save',
		data: datas,
		dataType: 'json',
		success: function(result) {
			if(result.resultcode == 0001) {
				alert(result.result);
				$('.auth_code img').attr('src',commonUrl+'code/lycode.do?t='+genTimestamp());
			} else {
				alert(result.decription);
			}
		},
		error: function(xhr, status, error) {
			alert(xhr);
		}
	})
	}
}
   
})
function genTimestamp() {
			var time = new Date();
			return time.getTime();
		}
