var swiperIndex=0,seeIndex=1,shownum=3;
$(function() {
	var data={};
	thinking('appbanner/modelcode/list?modelcode=bkmsz','#navimg','.navimg');	
KMthinking('sxljy');KMthinking('szypx');KMthinking('ssydwzk');KMthinking('sxqhz');
thinking('appscoure/kmlx/type/list?currentPage=1&showCount=3&kmlx=xljy_cj&type=0','#subList0','.subList',countDown);
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
$('#see_more').bind('click',function(){
		if(swiperIndex==3){
  		subList(1);
  	}else{
  		subList(0);
  	}
})

})
function subList(type){
	var name,Sindex,Stype=type;
	seeIndex++;
	$('.classify2 .swiper-slide ul').eq(swiperIndex).find('li').each(function(i){
		if($(this).hasClass('seleced')){
			name=$(this).attr('name');
			Sindex=$(this).index();
		}
	})
	if(type==1 && Sindex<2){
		shownum=24;
	}else if(type==1 && Sindex>=2){
		Stype++
		shownum=12;
	}else{
		shownum=3;
	};
	thinking('appscoure/kmlx/type/list?currentPage='+seeIndex+'&showCount='+shownum+'&kmlx='+name+'&type='+type,'#subList'+Stype,'.subList',countDown);
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
  function subNav(index){
  	swiperIndex=index;
  	$('.subList').empty();
  	seeIndex=0;
  	if(swiperIndex==3){
  		subList(1);
  	}else{
  		subList(0);
  	}
  	$('.subect .artical .main-center .subNav li').eq(index).siblings().removeClass('seleced');
  	$('.subect .artical .main-center .subNav li').eq(index).addClass('seleced');
  }
  	$('.classify2 ul li').bind('click',function(){
        $(this).siblings().removeClass('seleced');
        $(this).addClass('seleced');
          	$('.subList').empty();
  	seeIndex=0;
	if(swiperIndex==3){
  		subList(1);
  	}else{
  		subList(0);
  	}
	})
}

function countDown(data){
	if(data.data.length>=shownum){
		$('#see_more').show();
	}else{
		$('#see_more').hide();
	}
	 $('.subect .artical .main-center .subList ul li .right-messge .purchase>button').bind('click',function(){
 	$(this).parent().find('.level2').addClass('click');
 })
// 课程缴费
$('.subect .artical .main-center .subList ul li .right-messge .purchase .level2bottom').bind('click',function(){
	$('.subect .mask1').show();
	$('.subect .mask1 .closeImg').bind('click',function(){
		$('.subect .mask1').hide();
	})
})
//课程预约
$('.subect .artical .main-center .subList ul li .right-messge .purchase .level2top').bind('click',function(){
	$('.subect .mask2').show();
	var subject=$(this).parent().parent().siblings('h2').html();
	formInput(subject);
	$('.subect .mask2 .closeImg').bind('click',function(){
		$('.subect .mask2').hide();
	})
})
}

function appscoure(data){
	if(data.sxljy && data.szypx && data.ssydwzk && data.sxqhz){
		$('#classify2').tmpl(data).appendTo('.classify2');
		MySwiper();
	}else{
		return false;
	}
}

