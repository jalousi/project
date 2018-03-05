var type=getQueryString('type');
$(function(){
	thinking('appbanner/modelcode/list?modelcode=bkszx','#navimg','.navimg');	
	thinking('appxxzx/type/xxzxlistpage?currentPage=1&showCount=8&type='+type,'#dynamic','.dynamic',countDown);
})
//获取咨询列表
function subList(num){
	$('.dynamic').empty();
	thinking('appxxzx/type/xxzxlistpage?currentPage='+num+'&showCount=8&type='+type,'#dynamic','.dynamic');
}
function countDown(data){
	paginator(data.totalResult,data.showCount,pagCallback);
}
function pagCallback(index){
	subList(index);
}
function dateTime(String){
	var Ptime=[];
	Ptime.push(String.slice(-4));
	Ptime.push(String.substr(0,5));
    return Ptime;
}