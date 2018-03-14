		var id=getQueryString('id');
    if(id==2){
      var limit=32
       var showData=32;
    }else if(id==4){
      var limit=24;
      var showData=24;
    }else{
      var limit=12;
       var showData=12;
    }
		var data={
			cate_id:id,
			limit:limit,
			key:'',
			page:1,
		}
		list();
		$(document).on('click','.txt_center_box a',function(){//字母搜索
			$(this).addClass('active').siblings().removeClass('active');
			var id=$(this).attr('data-id');
			if(id){
				data.cate_id=id;
			}else{
				var html=$(this).html().trim();
				$('.paging_box .paging_num span.curent').html(1)
				data.key=html;
			}		
			data.page=1;
			list();
		})
      $(document).on('click','.index_cont_screen .screen_txt_new',function(){//字母搜索
      $(this).addClass('active').siblings().removeClass('active');
      var type=$(this).attr('data-type');  
      data.type=type;
      list();
    })
		$('.paging_left').on('click',function(){//上一页
			if(data.page>1){
				var page=Number($('.paging_box .paging_num span.curent').html())
			$('.paging_box .paging_num span.curent').html(page-1)
				data.page=data.page-1;
				list();	
			}			
		})
		$('.paging_right').on('click',function(){//下一页
			var page=Number($('.paging_box .paging_num span.curent').html())
			$('.paging_box .paging_num span.curent').html(page+1)
			data.page=data.page+1;
			list();
		})
		function list(){
			var listarguments=arguments;
	var index = layer.load(0, {shade: false});
			 $.ajax({
                url: host+'api/v2/news',
                dataType: "jsonp",
                type: "get",
                data: data,
                contentType: "application/json; charset=utf-8",
                success: function (result) {
              		var arr='';
              		var list=result.data;
              		if(id==2){
              			$.each(list,function(i,e){
              			if(e.logo){
              				var logo=e.logo;
              			}else{
              				var logo='./img/unknown.png' 
              			}
		    arr+='<div class="jy_list" data-id="'+e.id+'">'+
'						<div class="jy_list_cont height_auto">'+
'<a href="digital_detail.html?id='+e.id+'">'+
'							<div class="jy_list_cont_top">'+
'								<img src="'+logo+'" height="70" width="70">'+
'								<h1 class="limit-one">'+e.title+'</h1>'+
'								<h2>'+e.en_name+'</h2>'+
'								<p>'+e.subject+'</p>'+
'							</div></a>'+
'							<a href="digital_detail.html?id='+e.id+'" class="look_icon">'+
'								进入查看'+
'							</a>'+
'						</div>'+
'					</div>';
              		})
              		$('.jy_list_box').html(arr);
                  $('.jy_list').on('click',function(){
                    var id=$(this).attr('data-id');
                      window.location.href='digital_detail.html?id='+id+'';
                    })
              	}else if(id==3){
              		$.each(list,function(i,e){
              			if(e.country){
              				var country=e.country.cname;
              			}else{
              				var country=''
              			}
              				var one='';
              				var two='';
              				var three='';
              			if(e.types){
              				var one=e.types[0]?e.types[0].name:'';
              				var two=e.types[1]?'、'+e.types[1].name:'';
              				var three=e.types[2]?'、'+e.types[2].name:'';
              			}             			
	arr+='<a href="trade_detail.html?id='+e.id+'&&idd='+e.platform_id+'" class="jy_list">'+
'						<div class="jy_list_cont">'+
'<div class="jy_list_cont_hread" style="text-align:center;">'+
'							<img src="'+e.logo+'" class="" width="124" height="124">'+
'</div>'+
'							<div class="jy_list_cont_txt">'+
'								<h1 class="limit-one">'+
e.title+
'								</h1>'+
'								<p>'+e.subject+
'								</p>'+
'							</div>'+
'							<div class="jy_list_cont_footer">'+
'								<p>可以交易：'+e.can_trade_symbols+'种货币</p>'+
'								<p>国&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：'+country+'</p>'+
'								<p>支持交易：<span class="color_one">'+one+'</span><span class="color_two">'+two+'</span><span class="color_three">'+three+'</span></p>'+
'							</div>'+
'						</div>'+
'					</a>';
              		})
              		$('.jy_list_box').html(arr);
              	}else if(id==4){
              		$.each(list,function(i,e){
              			if(e.en_name){
              				var en_name='('+e.en_name+')';
              			}else{
              				var en_name=''
              			}
                      if(e.category){
                      var category=e.category.name;
                    }else{
                      var category='&nbsp'
                    }
		    arr+='<div class="qu_kuai_box_list" data-id="'+e.id+'"><div class="qu_kuai_box_list_cont">'+
        '<a href="block_detail.html?id='+e.id+'">'+
'							<div class="qu_kuai_box_list_cont_hread clearfix">'+
'								<img src="'+e.logo+'">'+
'								<div class="cont_hread_txt">'+
'									<h1 class="limit-one">'+e.title+' <span> '+en_name+' </span></h1>'+
'									<p>'+e.subject+'</p>'+
'								</div>'+
'							</div>'+
'							<div class="qu_kuai_box_list_cont_footer">'+
'             <span class="gongzheng_icon">'+category+'</span>'+
'             <span class="newhouse_icon">'+e.country.cname+'</span>'+
'             <span class="bignum_icon">'+e.hits+'</span>'+
'							</div>'+
'						</div>'+
'					</div></a></div>';
              		})
              		$('.qu_kuai_box').html(arr);
              	}
              	layer.close(index);
              		
              		$('.paging_box .paging_num span.last').html('/'+result.lastPage)
                  if(result.total>5){
                   $('.jy_list_paging').show()
                    $('.jy_list_paging').pagination({
              //mode: 'fixed',
            prevCls:'paging_left',
            nextCls:'paging_right',
            prevContent: '上页',
              nextContent: '下页',
               coping: true,
              totalData:result.total,
              showData:showData,
              isHide:true,
             // count:3,
              endPage:result.lastPage,
              //pageCount:result.lastPage,
              current:result.currentPage,
              callback: function (api) {
                $('.paging_box .paging_num span.curent').html(api.getCurrent())
                  data.page=api.getCurrent();
                  listarguments.callee();
              }
          }); 
                  }else{
                    $('.jy_list_paging').hide()
                  }
              		

                },
                error: function (err) {
                	 layer.close(index);
                   // bms.promptMsg('错误');
                }
            	});
		}