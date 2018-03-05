$(function() {
	$('.main3-5 button').bind('click',function(){
		$('.mask2').show();
	   formInput(null);
	$('.mask2 .closeImg').bind('click',function(){
		$('.mask2').hide();
	})
	});
	(function(){
		var datas = {
		modelcode: 'bsy'
	};
	$.ajax({
		type: 'get',
		url: commonUrl + 'appbanner/modelcode/list',
		data: datas,
		dataType: 'json',
		success: function(result) {
			if(result.resultcode == 0001) {
//				alert(JSON.stringify(result));
				$('#template1').tmpl(result).appendTo('.nav');
				setTimeout(function(){
					MySwiper();
				},100)
			} else {
				alert(result.result);
			}
		},
		error: function(xhr, status, error) {
			alert(xhr);
		}
	})
	})();
	appxxzx('mhydt',8,'#template1-2','.main1-2');
	appxxzx('mkszx',6,'#template1-3','.main1-3');
	appxxzx('mhydt',6,'#template3-1','.main3-1');
	appxxzx('mzxgg',6,'#template3-2','.main3-2');
	appxxzx('mzxgg',2,'#template3-3','.main3-3');
	appxxzx('mwawa',4,'#template3-4','.main3-4');
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
	thinking('appxxzx/tw/type/list?top=6&type=mxyxs','#template4','.main4');
	thinking('appscoure/hostlist?top=10','#template5','.main5-1');
	thinking('appxxzx/type/details?top=4&type=kmsz','#template2','.main2');

})

function MySwiper() {
	var mySwiper1 = new Swiper('.swiper-container', {
		pagination: '.pagination',
		createPagination: true,
		paginationClickable: true,
		autoplay:4000,
		loop:true,
		onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
			swiperAnimateCache(swiper); //隐藏动画元素 
			swiperAnimate(swiper); //初始化完成开始动画
		},
		onSlideChangeEnd: function(swiper) {
			if(swiper.previousIndex < swiper.activeIndex) {
				$('.ani').attr('swiper-animate-effect', 'bounceInRight');
			} else {
				$('.ani').attr('swiper-animate-effect', 'bounceInLeft');
			}
			swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		}
	})
	$('.pagination-Prev').click(function() {
		mySwiper1.swipePrev();
	})
	$('.pagination-Next').click(function() {
		mySwiper1.swipeNext();
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
