var swiperIndex=0;
$(function(){
	var data={};
	thinking('appbanner/modelcode/list?modelcode=bcjcx','#navimg','.navimg');	
	KMthinking('cjtype_xljycj');KMthinking('cjtype_zypxcj');KMthinking('cjtype_sydwzkcj');
	thinking('appcjxxcx/listpage?currentPage=1&showCount=100&type=xljycjcx_wljycj','#dataList','.dataList');
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
function subList(num){
	$('.dataList').empty();
	var name;
	$('.classify2 .swiper-slide ul').eq(swiperIndex).find('li').each(function(i){
		if($(this).hasClass('seleced')){
			name=$(this).attr('name');
		}
	})
	thinking('appcjxxcx/listpage?currentPage=1&showCount='+num+'&type='+name,'#dataList','.dataList');
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
	subList(100);
  	$('.subect .artical .main-center .subNav li').eq(index).siblings().removeClass('seleced');
  	$('.subect .artical .main-center .subNav li').eq(index).addClass('seleced');
  }
  	$('.classify2 ul li').bind('click',function(){
        $(this).siblings().removeClass('seleced');
        $(this).addClass('seleced');
		subList(100);
	})
}
//咨询目录HTML模板套入
function appscoure(data){
	if(data.cjtype_xljycj && data.cjtype_zypxcj && data.cjtype_sydwzkcj ){
		$('#classify2').tmpl(data).appendTo('.classify2');
		MySwiper();
	}else{
		return false;
	}
}
