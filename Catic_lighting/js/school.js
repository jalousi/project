
$(function(){
			//	点击学校高亮
		$('.region ul li').eq(0).addClass('click');
		$('.region ul li').bind('click', function() {
			$(this).siblings().removeClass('click');
			$(this).addClass('click');
		});
//	隐藏城市
   $('.region ul li:gt(19)').hide();
   $('.region button').bind('click',function(){
   	 $('.region ul li:gt(19)').show();
   });
   $('.study_abroad .region ul li:gt(15)').hide();
   $('.study_abroad .region button').bind('click',function(){
   	 $('.study_abroad .region ul li:gt(15)').show();
   });
// 自主招生
   $('.recruit_student .school ul li:gt(5)').hide();
   $('.recruit_student .school button').bind('click',function(){
   	 $('.recruit_student .school ul li:gt(5)').show();
   });
// 生涯规划
    $('.career_planning .school ul li:gt(2)').hide();
   $('.career_planning .school button').bind('click',function(){
   	 $('.career_planning .school ul li:gt(2)').show();
   });
// 出国留学
$('.study_abroad .school ul li:gt(5)').hide();
   $('.study_abroad .school button').bind('click',function(){
   	 $('.study_abroad .school ul li:gt(5)').show();
   });
})
