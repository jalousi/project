var swiperIndex=0;
$(function(){
	var data={};
	thinking('appbanner/modelcode/list?modelcode=bzlxz','#navimg','.navimg');	
	KMthinking('k_sydwzkzl');KMthinking('k_zypxzlxz');KMthinking('k_xlzlxz');
	thinking('appzl/zltype/listpage?currentPage=1&showCount=5&zltype=xlzlxz_yjs','#dataList','.dataList',countDown);
		function KMthinking(type){
		$.ajax({
		type: 'get',
		url: commonUrl + 'appscoure/kmfl/list?kmfl='+type,
		data:'',
		dataType: 'json',
		success: function(result) {
			if(result.resultcode == 0001) {
				data[type]=result.data;
				appscoure(data);
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
//获取咨询列表
function subList(num,callback){
	$('.dataList').empty();
	var name;
	$('.classify2 .swiper-slide ul').eq(swiperIndex).find('li').each(function(i){
		if($(this).hasClass('seleced')){
			name=$(this).attr('name');
		}
	})
	thinking('appzl/zltype/listpage?currentPage='+num+'&showCount=5&zltype='+name,'#dataList','.dataList',callback);
}
function MySwiper() {
	var mySwiper = new Swiper('.about_us .swiper-container1', {
		swipeToPrev : false,
		swipeToNext : false,
  }) 
// 课程切换
  var mySwiper = new Swiper('.subect .swiper-container1', {
	onSlideChangeStart: function(swiper){
      subNav(mySwiper.activeIndex);
    }
  })
  $('.subect .artical .main-center .subNav li').bind('click',function(){
  	mySwiper.swipeTo($(this).index());
  })
//swiper切换效果
  function subNav(index){
	swiperIndex=index;
	subList(1,countDown);
  	$('.subect .artical .main-center .subNav li').eq(index).siblings().removeClass('seleced');
  	$('.subect .artical .main-center .subNav li').eq(index).addClass('seleced');
  }
  	$('.classify2 ul li').bind('click',function(){
        $(this).siblings().removeClass('seleced');
        $(this).addClass('seleced');
		subList(1,countDown);
	})
}
function countDown(data){
	paginator(data.totalResult,data.showCount,pagCallback);
	//资料下载
$('.download .artical .main-center .dataList .section').bind('click',function(){
	downAjax($(this).attr('name_id'));
})	
}
function countDown1(data){
	//资料下载
$('.download .artical .main-center .dataList .section').bind('click',function(){
downAjax($(this).attr('name_id'));
})	
}
function pagCallback(index){
	subList(index,countDown1);
}
//咨询目录HTML模板套入
function appscoure(data){
	if(data.k_sydwzkzl && data.k_zypxzlxz && data.k_xlzlxz ){
		$('#classify2').tmpl(data).appendTo('.classify2');
		MySwiper();
	}else{
		return false;
	}
}
//下载弹窗获取数据
function downAjax(id){
	thinking('appzl/zldetail/id?id='+id,'#download_page','.download_page',downAjaxCallback);
}

function downAjaxCallback(data){
	save(data.data.id);
		$('.download_page').show();
	$('.download_page .closeImg').bind('click',function(){
		$('.download_page').hide();
	})
}
//下载数据增加
function save(id){
$('.download_page .downbtn a').bind('click',function(){
	$.ajax({
		type: 'get',
		url: commonUrl + 'appzlxz/save?zlid='+id,
		data: '',
		dataType: 'json',
		success: function(result) {
			if(result.resultcode == 0001) {
//              alert(result.result);
               }
		},
		error: function(xhr, status, error) {
			alert(xhr);
		}
	})
})
}