$(function(){
		$('.main3-5 button').bind('click',function(){
		$('.mask2').show();
	   formInput(null);
	$('.mask2 .closeImg').bind('click',function(){
		$('.mask2').hide();
	})
	});
	thinking('appbanner/modelcode/list?modelcode=bkszx','#navimg','.navimg');	
	appxxzx('mhydt',6,'#template3-1','.main3-1');
	appxxzx('mzxgg',6,'#template3-2','.main3-2');
	appxxzx('mzxgg',2,'#template3-3','.main3-3');
	appxxzx('mwawa',5,'#template3-4','.main3-4');
	appxxzx('mkszx',3,'#template3-6','.main3-6');
	thinking('appxxzx/type/xxzxlistpage?currentPage=1&showCount=5&type=mhydt','#dynamic','.dynamic',countDown);
	function appxxzx(type,num,Obj1,Obj2){
		var datas = {
		type: type,
		top:num
	};
	$.ajax({
		type: 'get',
		url: commonUrl + 'appxxzx/type/list',
		data: datas,
		dataType: 'json',
		success: function(result) {
			if(result.resultcode == 0001) {
				$(Obj1).tmpl(result).appendTo(Obj2);
			} else {
				alert(result.result);
			}
		},
		error: function(xhr, status, error) {
			alert(xhr);
		}
	})
	}
		count_down();
	function count_down(){
		$.ajax({
		type: 'get',
		url: commonUrl + 'appdic/list?bianma=kszxdjs',
		data:'',
		dataType: 'json',
		success: function(result) {
			if(result.resultcode == 0001) {
				var users=result.data;
				var html='';
				for(var i=0;i<users.length;i++){
					html+='<li><span>'+users[i].title+'</span><p>'+users[i].days+'天</p></li>';
				}
				$('.count_down ul').html(html);
				countDown();
			} else {
				alert(result.result);
			}
		},
		error: function(xhr, status, error) {
			alert(xhr);
		}
	})
	}
})
function countDown(){
	var num=$('.count_down ul li').length;
	$('.count_down ul').css('height',num*100+'%');
	var index=0;
	setInterval(function(){
		if(index<num-1){
			index++;
			$('.count_down ul').css('top',index*-100+'%');
		}else{
			index=0;
			$('.count_down ul').css('top',index*-100+'%');
		}
	},4000)
}
function dateTime(String){
	var Ptime=[];
	Ptime.push(String.slice(-4));
	Ptime.push(String.substr(0,5));
    return Ptime;
}
function countDown(data){
	paginator(data.totalResult,data.showCount,pagCallback);
}
function pagCallback(index){
	thinking('appxxzx/type/xxzxlistpage?currentPage='+index+'&showCount=5&type=mhydt','#dynamic','.dynamic');
	$('.dynamic').empty();
}
