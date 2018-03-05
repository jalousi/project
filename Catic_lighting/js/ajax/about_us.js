$(function() {
	thinking('appbanner/modelcode/list?modelcode=bgsjs','#navimg','.navimg');
	thinking('appxxzx/type/details?type=mgsjj&top=2','#template1','.main1');
	thinking('appgsfzlc/list?top=4','#main2','.main2');	
	thinking('appxxzx/tw/type/list?top=12&type=mryzz','#template3','.main3',MySwiper);	
	thinking('appxxzx/tw/type/list?top=4&type=mgswh','#template4-1','.main4-1');
	thinking('appxxzx/type/details?type=mwmtd&top=1','#template4-2','.main4-2',KMthinking);
		function KMthinking(){
		$.ajax({
		type: 'get',
		url: commonUrl + 'appxxzx/type/videodetails',
		data:'',
		dataType: 'json',
		success: function(result) {
			if(result.resultcode == 0001) {
                $('.main4-2 .left video').attr('src',result.data.imgurl);
                videoPlay();
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

function MySwiper() {
	var mySwiper = new Swiper('.about_us .swiper-container1', {
  }) 
	$('.pagination-Prev').click(function() {
		mySwiper.swipePrev();
	})
	$('.pagination-Next').click(function() {
		mySwiper.swipeNext();
	})
}

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
function videoPlay(){
	var video1=$('.left video')[0];
    $('.left .play').bind('click',function(){
    	if(video1.paused){
    		$(this).find('img').hide();
    	video1.play();
    	}else{
    	$(this).find('img').show();
    	video1.pause();
    	}
    	
    })
    video1.onpause=function(){
    	$('.left .play img').show();
    }
    video1.onplay=function(){
    	$('.left .play img').hide();
    }
}
