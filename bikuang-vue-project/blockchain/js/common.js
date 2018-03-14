var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?3c9d278222b327bdd59b0baae77492f1";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
//var host1='http://localhost:8080/#/'
//jQuery.support.cors = true;
var id = getQueryString('id');
var href = window.location.href;
if (href.split('lianqu').length == 2) {
    var host = 'https://api.lianqu.net.cn/';
    var host1 = 'https://www.lianqu.net.cn/index.html#/';
} else {
    var host = 'http://120.78.185.128:3020/';
    var host1 = 'http://120.78.185.128:3033/';
}
$('.footer_box .bottom').html('联系我们 © 2018 链区网')
var search = { limit: 20, page: 1 }

    // 提取url后面的id
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return '';
}

// $.ajax({ //轮播图
//     url: host + 'api/v2/news_info',
//     dataType: "json",
//     type: "get",
//     data: { location: 'detail' },
//     contentType: "application/json; charset=utf-8",
//     success: function(result) {
//         alert('11111');
//     }
// })

//分享到新浪微博
function shareToSinaWB(event) {
    event.preventDefault();
    var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=895033136'; //真实的appkey，必选参数
    _shareUrl += '&url=' + encodeURIComponent(_url || document.location); //参数url设置分享的内容链接|默认当前页location，可选参数
    _shareUrl += '&title=' + encodeURIComponent(_title || document.title); //参数title设置分享的标题|默认当前页标题，可选参数
    _shareUrl += '&source=' + encodeURIComponent(_source || '');
    _shareUrl += '&sourceUrl=' + encodeURIComponent(_sourceUrl || '');
    _shareUrl += '&content=' + 'utf-8'; //参数content设置页面编码gb2312|utf-8，可选参数
    _shareUrl += '&pic=' + encodeURIComponent(_pic || ''); //参数pic设置图片链接|默认为空，可选参数
    window.open(_shareUrl, '_blank', 'width=' + _width + ',height=' + _height + ',top=' + _top + ',left=' + _left + ',toolbar=no,menubar=no,scrollbars=no, resizable=1,location=no,status=0');
}

//分享到QQ空间
function shareToQzone(event) {
    event.preventDefault();

    var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
    _shareUrl += 'url=' + encodeURIComponent(_url || document.location); //参数url设置分享的内容链接|默认当前页location
    _shareUrl += '&showcount=' + _showcount || 0; //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
    _shareUrl += '&desc=' + encodeURIComponent(_desc || '分享的描述'); //参数desc设置分享的描述，可选参数
    _shareUrl += '&summary=' + encodeURIComponent(_summary || '分享摘要'); //参数summary设置分享摘要，可选参数
    _shareUrl += '&title=' + encodeURIComponent(_title || document.title); //参数title设置分享标题，可选参数
    _shareUrl += '&site=' + encodeURIComponent(_site || ''); //参数site设置分享来源，可选参数
    _shareUrl += '&pics=' + encodeURIComponent(_pic || ''); //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
    window.open(_shareUrl, '_blank', 'width=' + _width + ',height=' + _height + ',top=' + _top + ',left=' + _left + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
}

function label() {
    $.ajax({ //网站标签
        url: host + 'api/v2/news/tags-hot',
        dataType: "jsonp",
        type: "get",
        //data: {offset:1,limit:4},
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            var arr = '';
            $.each(result, function(i, e) {
                arr += '<a href="label.html?id=' + e.id + '" target="_blank" class="tab_list_icon" data-id=' + e.id + '>' +
                    e.name +
                    '</a>';
            })
            $('.cont_body_right_one:eq(4) .tab_list').html(arr)
        }
    })
}

function correlations(id) {
    $.ajax({ //相关资讯
        url: host + 'api/v2/news/' + id + '/correlations',
        dataType: "json",
        type: "get",
        data: { limit: 4 },
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            var arr = '';
            var arr1 = '';
            $.each(result, function(i, e) {
                if (e.cn_name) {
                    var cn_name = e.cn_name;
                } else {
                    var cn_name = ''
                }
                if (e.subject) {
                    var subject = e.subject;
                } else {
                    var subject = '这个家伙很懒，什么也没有留下'
                }
                if (e.logo) {

                    var logo = e.logo;
                } else {
                    var logo = './img/default.png';
                }
                arr1 += '<div class="zx_xg_list">' +
                    '                 <img src="' + logo + ' ">' +
                    '                 <a href="information_detail.html?id=' + e.id + '" class="zx_xg_list_txt limit-three">' +
                    e.title +
                    '                 </a>' +
                    '               </div>';
                arr += '<li data-id="' + e.id + '">' +
                    '                   <img src="' + logo + ' " class="more_one_list">' +
                    '                   <div class="more_one_list_left">' +
                    '                     <h1 class="limit-one">' +
                    '                       ' + e.title + ' <span>' + cn_name + '</span>' +
                    '                     </h1>' +
                    '                     <p>' +
                    subject +
                    '                     </p>' +
                    '                   </div>' +
                    '                 </li>';
            })
            if ($('.zx_xg_box1').length) {
                $('.zx_xg_box1').html(arr1)
                return;
            }

            $('.cont_body_right_one:eq(1) ul').html(arr);
            $('.cont_body_right_one:eq(1) ul li').on('click', function() {
                var id = $(this).attr('data-id');
                window.location.href = 'information_detail.html?id=' + id;
            })
        }
    })
}

function columnist() {
    $.ajax({ //专栏作者
        url: host + 'api/v2/user/recommends',
        dataType: "jsonp",
        type: "get",
        data: { offset: 1, limit: 4 },
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            var arr = '';
            $.each(result, function(i, e) {
                if (e.bio) {
                    var bio = e.bio;
                } else {
                    var bio = '这个家伙很懒，什么也没有留下'
                }
                if (e.avatar) {
                    var avatar = e.avatar;
                } else {
                    var avatar = './img/unknown.png'
                }
                arr += '<li data-id="' + e.id + '">' +
                    '                   <img src="' + avatar + '" class="more_one_list">' +
                    '                   <div class="more_one_list_left">' +
                    '                     <h1>' + e.name + '</h1>' +
                    '<p class="color_eee">' + bio +
                    '                     </p>' +
                    '                   </div>' +
                    '                 </li>';
            })

            $('.cont_body_right_one:eq(2) ul').html(arr)
            $('.cont_body_right_one:eq(2) ul li').on('click', function() {
                var id = $(this).attr('data-id');
                window.location.href = host1 + 'person_center?id=' + id;
            })
        }
    })
}

function forcast() {
    $.ajax({ //预测
        url: host + 'api/v2/forecast',
        dataType: "jsonp",
        type: "get",
        data: { limit: 10 },
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            var arr = '';
            $.each(result.data, function(i, e) {
                if (e.status == 'S') {
                    var status = '<span class="txt_center color_7e98db">进行中</span>';
                }
                if (e.status == 'Y') {
                    var status = '<span class="txt_center color_19b56d">成功</span>';
                }
                if (e.status == 'N') {
                    var status = '<span class="txt_center color_ec2546">失败</span>';
                }
                arr += '<div class="right_one_table_list">' +
                    '                   <span>' + e.platform.name + '/' + e.symbol.alias + '</span><span class="txt_center color_f56c6c">' + e.for_price + '</span>' + status +
                    '                 </div>';
            })

            $('.cont_body_right_one:eq(3) .forcast').html(arr)
        }
    })

}

//资讯列表;
function rightlist(id, type) {
    $.ajax({
        url: host + 'api/v2/news',
        dataType: "jsonp",
        type: "get",
        data: { cate_id: id, limit: 4, type: type },
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            var list = result.data;
            if (id == '') { //咨询页面右侧最新动态
                var arr = '';
                $.each(list, function(i, e) {
                    if (i == 4) {
                        return false;
                    }
                    if (e.cn_name) {
                        var cn_name = e.cn_name;
                    } else {
                        var cn_name = ''
                    }
                    if (e.subject) {
                        var subject = e.subject;
                    } else {
                        var subject = '这个家伙很懒，什么也没有留下'
                    }
                    if (e.logo) {
                        var logo = e.logo;
                    } else {
                        var logo = './img/default.png';
                    }
                    //               			              		arr+='<li data-id="'+e.id+'">'+
                    // '			    					<img src="'+logo+' " class="more_one_list">'+
                    // '			    					<div class="more_one_list_left">'+
                    // '			    						<h1 class="limit-one">'+
                    // '			    							'+e.title+' <span>'+cn_name+'</span>'+
                    // '			    						</h1>'+
                    // '			    						<p>'
                    // 			    						+subject+
                    // '			    						</p>'+
                    // '			    					</div>'+
                    // '			    				</li>';
                    arr += '<li data-id="' + e.id + '" style="padding:0 0 10px 10px;background:url(img/block.png) no-repeat -10px 0;"><p class="more_two_list_left">' + subject + '</p>' +
                        '</li>';

                })
                $('.cont_body_right_one:eq(0) ul').html(arr);
                $('.cont_body_right_one:eq(0) ul li').on('click', function() {
                    var id = $(this).attr('data-id');
                    window.location.href = 'information_detail.html?id=' + id;
                })

            } else if (id == 2) { //热门数字货币;
                var arr = '';
                $.each(list, function(i, e) {
                    if (i == 4) {
                        return false;
                    }
                    if (e.subject) {
                        var subject = e.subject;
                    } else {
                        var subject = '这个家伙很懒，什么也没有留下'
                    }
                    if (e.logo) {
                        var logo = e.logo;
                    } else {
                        var logo = './img/unknown.png'
                    }

                    arr += '<li data-id="' + e.id + '">' +
                        '			    					<img src="' + logo + '" class="more_one_list">' +
                        '			    					<div class="more_one_list_left">' +
                        '			    						<h1>' +
                        e.title +
                        '			    						</h1>' +
                        '			    						<p class="color_eee">' +
                        subject +
                        '			    						</p>' +
                        '			    					</div>' +
                        '			    				</li>';

                })
                $('.cont_body_right_one:eq(1) ul').html(arr);
                $('.cont_body_right_one:eq(1) ul li').on('click', function() {
                    var id = $(this).attr('data-id');
                    window.location.href = 'block_detail.html?id=' + id;
                })

            }

        },
        error: function(err) {
            // bms.promptMsg('错误');
        }
    });
}

//资讯列表(数字货币,交易平台,区块链项目,最新文章等综合)接口 tab切换
function tab() {
    var index = layer.load(0, { shade: false });
    if (href.split('label').length == 2) {
        var url = host + 'api/v2/news/tags/' + id
    } else {
        var url = host + 'api/v2/news'
    }

    $.ajax({
        url: url,
        dataType: "jsonp",
        type: "get",
        data: search,
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            var arr = '';
            var list = result.data;
            if (href.split('label').length == 2) {
                var a = '<li class="tab active"><a data-id="0" href="javascript:;">' + result.keyword + '</a></li>'
                $('#j-newslist').html(a);
            }
            $.each(list, function(i, e) {
                if (e.category) {
                    var category = e.category.name;
                } else {
                    var category = ''
                }
                if (e.user && e.user.avatar) {
                    var avatar = e.user.avatar;
                } else {
                    var avatar = './img/unknown.png'
                }
                if (e.user && e.user.name) {
                    var name = e.user.name;
                } else {
                    var name = ''
                }
                if (e.subject) {
                    var subject = e.subject;
                } else {
                    var subject = '这个家伙很懒，什么也没有留下'
                }
                if (e.logo != null) {
                    var logo = e.logo;
                } else {
                    var logo = './img/default.png';
                }
                arr += '<li data-id="' + e.id + '">' +
                    '			    					<div class="item-img">' +
                    '			    						<img src="' + logo + '">' +
                    '			    					</div>' +
                    '			    					<div class="item-content">' +
                    '								        <h2 class="item-title">' +
                    '								            <a href="javascript:void(0);">' +
                    '								               	 ' + e.title + '            ' +
                    '								            </a>' +
                    '								        </h2>' +
                    '								        <div class="item-excerpt">' +
                    '								            <p>' + subject + '</p>' +
                    '								        </div>' +
                    '								        <div class="item-meta">' +
                    '								            <div class="item-meta-li author">' +
                    '								                <a data-user="48" target="_blank" href="###" class="avatar">' +
                    '								                    <img src="' + avatar + '" class="func-um_user gravatar avatar avatar-60 um-avatar um-avatar-uploaded" width="26" height="26" alt="宁采臣">                ' +
                    '								                </a>' +
                    '								                <a class="nickname" href="###" target="_blank">' + name + '</a>' +
                    '								            </div>' +
                    '								            <a href="###" class="qiye_icon">' + category + '</a>' +
                    '								            <a href="###" class="time_icon">' + e.created_at + '</a>' +
                    '								        </div>' +
                    '								    </div>' +
                    '			    				</li>';
            })

            $('.cont_body_left_cont ul').append(arr);
            $('.cont_body_left_cont ul li').on('click', function() {
                var id = $(this).attr('data-id');
                window.open("information_detail.html?id=" + id, '_blank')
                    //window.location.href="information_detail.html?id="+id;
            });
            layer.close(index);
            $('.dropload-loading').remove();
            if (result.currentPage == result.lastPage) {
                $('.cont_body_left_cont ul').append('<div class="dropload-noData">暂无数据</div>');
                return;
            } else {
                $('.cont_body_left_cont ul').append('<div class="dropload-loading"><div class="dropload-load" data-page=' + (result.currentPage + 1) + '>浏览更多</div></div>');
            }

            // Exposure.init( $('.cont_body_left_cont ul li:last'), function( el ){//每次必须重新绑定曝光元素；这是对于一开始没有出现在屏幕上的；
            //               if(!$('.cont_body_left_cont ul li:last').length){   
            //                     return;
            //                    }
            // $('.cont_body_left_cont ul').append('<div class="dropload-loading"><div class="dropload-load">...加载中</div></div>');
            // var page=result.currentPage+1;
            // search.page=page;
            // tab();  
            //     })

        },
        error: function(err) {
            layer.close(index);
        }
    });
}
$(document).on('click', '.dropload-load', function() {
        var page = $(this).attr('data-page');
        search.page = page;
        tab();
    })
    //返回全部资讯分类和已订阅的分类，在未登录或未订阅状态下返回父级分类.一级分类
    // $.ajax({
    //        url: host+'api/v2/news/cates',
    //        dataType: "json",
    //        type: "get",
    //        //data: JSON.stringify(data),
    //        contentType: "application/json; charset=utf-8",
    //        success: function (result) {
    //        	var arr='';
    //        	$.each(result.my_cates,function(i,e){
    //        		//if(i==0){
    //        			//arr+='<li class="tab active"><a data-id="'+e.id+'" href="javascript:;">'+e.name+'</a></li>'
    //        		//}else{
    //        			arr+='<a class="tab" data-id="'+e.id+'" >'+e.name+'</a>'	
    //        		//}            		
    //        	})
    //        	//$('.nav_box').append(arr);


//        },
//        error: function (err) {
//           // bms.promptMsg('错误');
//        }
//    	});
function child(id) { //获取一个分类下的子分类
    $.ajax({
        url: host + 'api/v2/news/cates/' + id + '/child',
        dataType: "jsonp",
        type: "get",
        //data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            var arr = '';
            if (id == 4) {
                $.each(result, function(i, e) {
                    arr += '<a  class="tab" data-id="' + e.id + '" href="javascript:;">' + e.name + '</a>'
                })
                var a = '<a data-id="4" class="tab active"href="javascript:;">全部</a>'
                $('.txt_center_box').html(a + arr);
            } else {
                $.each(result, function(i, e) {
                    arr += '<li class="tab" data-id="' + e.id + '"><a  href="javascript:;">' + e.name + '</a></li>'
                })
                var a = '<li class="tab active"><a data-id="0" href="javascript:;">最新文章</a></li>'
                $('#j-newslist').html(a + arr);
            }

        },
        error: function(err) {
            // bms.promptMsg('错误');
        }
    });

}



$(document).on('click', '#j-newslist li', function() {
    $(this).addClass('active').siblings().removeClass('active');
    var id = $(this).attr('data-id');
    $('.cont_body_left_cont ul').html('')
    search.cate_id = id;
    search.page = 1;
    search.search = '';
    tab()
})
$(document).on('click', '.tab_list a', function() {
        $('.cont_body_left_cont ul').html('');
        var id = $(this).attr('data-id');
        //search.search=html;
        //search.page=1;
        $(this).addClass('active').siblings().removeClass('active')
        $.ajax({ //网站标签
                url: host + 'api/v2/news/tags/' + id,
                dataType: "json",
                type: "get",
                //data: {offset:1,limit:4},
                contentType: "application/json; charset=utf-8",
                success: function(result) {
                    // var arr='';
                    // $.each(result,function(i,e){
                    //   arr+='<a href="###" class="tab_list_icon" data-id='+e.id+'>'
                    //   +e.name+
                    // '</a>';
                    // })                  
                    // $('.cont_body_right_one:eq(4) .tab_list').html(arr)
                }
            })
            //tab()
    })
    //   $(document).on('click','.nav_box a',function(){//一级调
    // 	var id=$(this).attr('data-id');
    // 	child(id)
    // })
var title = '<a href="home.html">首页</a>       ' +
    '         <a href="digital_currency.html?id=2"  data-id="2">数字货币</a>      ' +
    '         <a href="trading_platform.html?id=3"  data-id="3">交易平台</a>       ' +
    '         <a href="block_chain.html?id=4"  data-id="4">区块链项目</a>       ' +
    '         <a href="information.html?id=5"  data-id="1">资讯</a>       ' +
    '         <a href="' + host1 + 'forecast">预测 </a>      ';
// '         <a href="'+host1+'">社区</a>';
$('.nav_box').html(title);
if (href.split('label').length == 2) {
    $('.nav_box a').eq(4).addClass('active')
} else if (href.split('digital').length == 2) {
    $('.nav_box a').eq(1).addClass('active')
} else if (href.split('trading').length == 2) {
    $('.nav_box a').eq(2).addClass('active')
} else if (href.split('trade').length == 2) {
    $('.nav_box a').eq(2).addClass('active')
} else if (href.split('block_').length == 2) {
    $('.nav_box a').eq(3).addClass('active')
} else if (href.split('information').length == 2) {
    $('.nav_box a').eq(4).addClass('active')
} else {
    $('.nav_box a').eq(0).addClass('active')
}


//详情评论接口
function remarks(id) {
    $('#remarks').on('click', function() { //评论
        var body = $('textarea').val();
        $.ajax({
            url: host + 'api/v2/news/' + id + '/comments',
            dataType: "json",
            type: "post",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('access_token'));
            },
            data: { body: body },
            success: function(result) {
                if (href.split('information_detail').length == 2) {
                    layer.msg(result.message[0], function() {
                        remarklist(id);
                    });
                } else {
                    layer.msg(result.message[0], { icon: 1 }, function() {
                        $('.project_info_left_hread a:eq(1)').addClass('active').siblings().removeClass('active');
                        $('.project_info_left_body').eq(1).removeClass('dis').siblings().addClass('dis');
                        remarklist(id);
                    });
                }


            },
            error: function(err) {
                if (err.status == '401') {
                    layer.msg('发表评论失败，请先登录', { icon: 2 }, function() {
                        $('.zhenzhao').show();
                        $('.el-dialog__wrapper').show()
                    });
                }
            }
        });
    })
}

function remarklist(id, page) {
    //获取资讯评论列表
    $.ajax({
        url: host + 'api/v2/news/' + id + '/comments',
        dataType: "json",
        type: "get",
        data: { page: page, limit: 10 },
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            var arr = '';
            if (href.split('information_detail').length == 2) {
                $.each(result.comments.data, function(i, e) {
                    if (e.user.avatar) {
                        var avatar = e.user.avatar;
                    } else {
                        var avatar = './img/unknown.png'
                    }
                    arr += '<div class="zx_xg_pl_list clearfix">' +
                        '                 <img src="' + avatar + '">' +
                        '                 <div class="zx_xg_pl_txt ">' +
                        '                   <h2>' + e.user.name + '</h2>' +
                        '                   <h3>2018-12-13 13:46</h3>' +
                        '                   <p>' + e.body + '</p>' +
                        '                 </div>' +
                        '               </div>';
                })



            } else {
                $.each(result.comments.data, function(i, e) {
                    if (e.user.avatar) {
                        var avatar = e.user.avatar;
                    } else {
                        var avatar = './img/unknown.png'
                    }
                    arr += '<div class="pinlun_list clearfix">' +
                        '               <img src="' + avatar + '" class="pinlun_list_hread">' +
                        '               <div class="pinlun_list_txt">' +
                        '                 <h1>' + e.user.name + '</h1>' +
                        '                 <div class="pinlun_list_star clearfix">' +
                        '                   <div class="star_box dis">' +
                        '                     <i class="star_list"></i>' +
                        '                     <i class="star_list"></i>' +
                        '                     <i class="star_list"></i>' +
                        '                     <i class="star_list"></i>' +
                        '                     <i class="star_list"></i>' +
                        '                   </div>' +
                        '                   <label class="time_right_txt">' + e.created_at + '</label>' +
                        '                 </div>' +
                        '                 <p>' + e.body +
                        '                 </p>' +
                        // '                  <a href="###" class="zhankai_txt">展开评论</a>'+
                        '               </div>' +
                        '             </div>';
                })
            }
            $('.number').html(result.comments.total)
            $('.comment_list').html(arr);
            $('.jy_list_paging').pagination({
                mode: 'unfixed',
                prevCls: 'paging_left',
                nextCls: 'paging_right',
                prevContent: '上页',
                nextContent: '下页',
                // totalData:result.comments.total,
                //showData:3,
                isHide: true,
                keepShowPN: true,
                pageCount: result.comments.last_page,
                current: result.comments.current_page,
                callback: function(api) {
                    //$('.paging_box .paging_num span.curent').html(api.getCurrent())
                    var page = api.getCurrent();
                    remarklist(id, page)
                        // listarguments.callee();
                }
            });

        },
        error: function(err) {
            // bms.promptMsg('错误');
        }
    });
}

function getCode(phone) {
    $.ajax({ //验证码
        url: host + 'api/v2/verifycodes/register',
        dataType: "json",
        type: "post",
        data: { phone: phone },
        success: function(result) {
            //cursor: not-allowed;
            $('#code').css('cursor', 'not-allowed')
            var time = 60;
            var int = setInterval(function() {
                time--;
                $('#code').html(time + '秒后重发');
                if (time <= 1) {
                    $('#code').css('cursor', 'pointer')
                    $('#code').html('重发验证码');
                    clearInterval(int);
                }
            }, 1000);
        },
        error: function(ret, status) {
            console.log(ret)
            var result = JSON.parse(ret.responseText);
            if (result.errors.phone) {
                layer.msg(result.errors.phone[0], { icon: 2 });
            }
        }
    })
}
if (window.localStorage && window.localStorage.getItem('access_token')) {
    if (window.localStorage.getItem('access_avatar') != 'null') {
        var avatar = window.localStorage.getItem('access_avatar')
    } else {
        var avatar = './img/unknown.png';

    }
    var arr = '<div class="nav_hread_img">' +
        '           <img src="' + avatar + '">' +
        '         </div>';
    $('.loginstatus').html(arr);
    //     $('.nav_hread_img').on('click',function(e){
    //   $('#dropdown-menu-9567').css('left','1156px')
    //   e.stopPropagation();
    // })
    //       $(document).on('click',function(){
    //   $('#dropdown-menu-9567').css('left','-444px')
    // })
} else {
    var arr = '<a href="###" class="zhuce_icon_txt">注册</a><a href="###" class="logo_icon_txt">登录</a>';
    $('.loginstatus').html(arr);
}


function login() {
    var login = '  <div class="zhenzhao" style="display: none"></div>' +
        '   <div class="el-dialog__wrapper" style="display: none">' +
        '   <div class="el-dialog el-dialog--center loginModal" style="width: 30%; margin-top: 15vh;">' +
        '     <div class="el-dialog__header">' +
        '       <ul   class="el-menu el-menu--horizontal denglu">' +
        '         <li class="el-menu-item is-active" data-id="1">登录</li> ' +
        '         <li class="el-menu-item" data-id="2">注册</li>' +
        '       </ul>' +
        '       <div  class="yanzheng" style="display: none;">' +
        '         <h1>验证手机</h1> ' +
        '         <h3 style="color: rgb(153, 153, 153);">请输入你收到的６位数验证码</h3>' +
        '       </div>' +
        '       <div  class="el-dialog__headerbtn">' +
        '         <img src="img/close.png" class="el-dialog__close el-icon el-icon-close"></img>' +
        '       </div>' +
        '     </div>' +
        '     <div class="el-dialog__body">' +
        '       <div class="content">' +
        '         <div>' +
        '           <div class="yanzheng phone" ="" style="margin-bottom: 20px;display: none;text-align: left;">' +
        '             <span>15601687621</span>' +
        '           </div>' +
        '           <div  class="yanzheng el-input el-input-group el-input-group--append error"style="display: none;">' +
        '             <input autocomplete="off" id="checkcode"style="border-right: 0;"placeholder="请输入6位短信验证码" type="text" class="el-input__inner">' +
        '             <div class="el-input-group__append ">' +
        '               <div   id="code" class="el-button el-button--default ">' +
        '                 <span>获取短信验证码</span>' +
        '               </div>' +
        '             </div>' +
        '           </div>' +
        '           <div  class="el-input denglu">' +
        '             <input autocomplete="off" placeholder="手机号"id="phone" type="text" class="el-input__inner">' +
        '           </div> ' +
        '           <div class="el-input denglu">' +
        '             <input autocomplete="off" placeholder="密码"  id="password" type="password" class="el-input__inner">' +
        '           </div>' +
        '           <div class="el-input denglu" style="display: none">' +
        '             <input autocomplete="text" placeholder="昵称" id="name" type="text" class="el-input__inner">' +
        '           </div>' +
        '           <div class="zhuce dis denglu"style="text-align: left;margin-bottom: 20px;">' +
        '             <span style="color: rgb(153, 153, 153); font-size: 13px;">注册即代表同意</span>《注册协议》' +
        '               </div>' +
        '         </div>' +
        '         <div>' +
        '           <button type="button" class="el-button login-btn el-button--default">' +
        '             <span>登录</span>' +
        '           </button>' +
        '         </div>' +
        '       </div>' +
        '     </div>' +
        '   </div>' +
        '   </div>';
    var search = '<div class="nav__search__result__container">' +
        '          <div class="nav__search__result">' +
        '            <div class="nav__search__result__list">' +
        '              <div class="nav__search__result__list__hd nav__search__control">' +
        '                动态' +
        '              </div>' +
        '              <div class="nav__search__result__list__bd" id="dong">' +
        '              </div>  ' +
        '            </div>' +
        '            <div class="nav__search__result__list">' +
        '              <div class="nav__search__result__list__hd nav__search__control">' +
        '                用户' +
        '              </div>' +
        '              <div class="nav__search__result__list__bd" id="yong">' +

        '              </div>  ' +
        '            </div>' +
        '          </div>' +
        '        </div>';

    var xiala = '<ul  class="el-dropdown-menu el-popper dis" id="dropdown-menu-9567" style="transform-origin: center top 0px; z-index: 2010; width:98px;position: absolute; top: 49px; left: 1100px;" x-placement="bottom-end">' +
        '     <li tabindex="-1" class="el-dropdown-menu__item"><a href=' + host1 + 'person/fans>我的粉丝</a></li>' +
        '     <li tabindex="-1" class="el-dropdown-menu__item"><a href=' + host1 + 'person/collection>我的收藏</a></li>' +
        '     <li tabindex="-1" class="el-dropdown-menu__item"><a href=' + host1 + 'person/setting>设置</a></li>' +
        '     <li tabindex="-1" class="el-dropdown-menu__item" id="quit">退出</li>' +
        '     <div x-arrow="" class="popper__arrow" style="left: 68.5px;"></div>' +
        '   </ul>';
    $('body').append(login)

    $('.index_hread_one .nav_hread_img').append(xiala)
    $(document).on('click', '#quit', function() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('access_avatar')
        localStorage.removeItem('access_uid')
        localStorage.removeItem('access_name')
        var arr = '<a href="###" class="zhuce_icon_txt">注册</a><a href="###" class="logo_icon_txt">登录</a>';
        $('#dropdown-menu-9567').css('left', '1433px')
        $('.loginstatus').html(arr);

    })
    $('.nav_hread_img').hover(function() {
        $("#dropdown-menu-9567").css('display', 'block');
    }, function() {
        $("#dropdown-menu-9567").css('display', 'none');
    });

    $('.el-icon-close').on('click', function() {
        $('.el-dialog__wrapper').hide();
        $('.zhenzhao').hide()
    })
    $('.el-dialog__wrapper').on('click', function() {
        $('.el-dialog__wrapper').hide()
        $('.zhenzhao').hide()
    })
    $('#code').on('click', function() {
        var phone = $('#phone').val();
        getCode(phone)
    })
    $('.el-dialog').on('click', function() {
        return false;
    })
    $('.one_input').on('input', function() {
        var search1 = $('.one_input').val();
        if (!search1) {
            $('.nav__search__result__container').hide()
            return;
        } else {
            $('.nav__search__result__container').show();
        }
        $.ajax({ //搜索
            url: host + 'api/v2/search',
            dataType: "json",
            type: "get",
            data: { query: search1, limit: 5 },
            success: function(result) {
                if (!$('#dong').length) {
                    $('.nav_box_seach').after(search)
                }

                var arr = '';
                var arr1 = '';
                if (!search1) {
                    return
                }
                $.each(result.feeds.data, function(i, e) {
                    if (i == 5) {
                        return false;
                    }
                    arr += '<div class="nav__search__result__item nav__search__controlf" >' + e.feed_content +
                        '                </div>';
                })
                $.each(result.users.data, function(i, e) {
                    if (i == 5) {
                        return false;
                    }
                    if (e.avatar) {
                        var avatar = e.avatar
                    } else {
                        var avatar = './img/unknown.png';

                    }
                    arr1 += '<div class="nav__search__result__item nav__search__controlf">' +
                        '                 <div class="avatar">' +
                        '                 <img src="' + avatar + '" />' +
                        '              </div>' +
                        '                 <div class="market">' + e.bio + '</div></div>'
                })

                $('#dong').html(arr)
                $('#yong').html(arr1)
                $('.nav__search__controlf').on('click', function() {
                    var html = $(this).html();
                    var html = html.slice(0, 10)
                    console.log(html)
                    localStorage.setItem('search', html);
                    window.location.href = host1 + 'search';
                })
            },
            error: function(ret, status) {
                console.log(ret)
            }
        })
    })

    $(document).on('click', '.logo_icon_txt', function() {
        $('.el-dialog__wrapper').show();
        $('.zhenzhao').show();
        $('#phone').val('');
        $('#password').val('');
        $('#name').val('');
        $('#checkcode').val('');
        $('.zhuce').hide();
        $('.yanzheng').hide()
        $('.denglu').show();
        $('.content .el-input:eq(3)').hide();
        $('.el-menu li').eq(0).addClass('is-active')
        $('.el-menu li').eq(1).removeClass('is-active')
        $('.login-btn span').html('登录');
    })
    $(document).on('click', '.zhuce_icon_txt', function() {
        $('.el-dialog__wrapper').show();
        $('.zhenzhao').show();
        $('.zhuce').show();
        $('.yanzheng').hide()
        $('.denglu').show();
        $('.content .el-input:eq(3)').show();
        $('.el-menu li').eq(0).removeClass('is-active')
        $('.el-menu li').eq(1).addClass('is-active')
        $('.login-btn span').html('注册');
        $('#phone').val('');
        $('#password').val('');
        $('#name').val('');
        $('#checkcode').val('');
    })
    $('.el-menu li').on('click', function() {
        $('#phone').val('');
        $('#password').val('');
        $('#name').val('');
        $('#checkcode').val('');
        var index = $(this).index();
        if (index == 1) {
            $('.zhuce').show();
            $('.content .el-input:eq(3)').show();
            $('.login-btn span').html('注册');
        } else {
            $('.zhuce').hide();
            $('.content .el-input:eq(3)').hide();
            $('.login-btn span').html('登录');
        }
        $(this).addClass('is-active').siblings().removeClass('is-active');
    })
    $('.login-btn').on('click', function() {
        var index = $('.el-menu .el-menu-item.is-active').attr('data-id');
        console.log(index);
        var phone = $('#phone').val();
        var password = $('#password').val();
        var name = $('#name').val();
        var checkcode = $('#checkcode').val();

        if (!phone) {
            layer.msg('电话号码不能为空！', { icon: 2 });
            $('#phone').focus();
            return;
        }
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))) {
            layer.msg('请输入正确的手机号码！', { icon: 2 });
            $('#phone').focus();
            return;
        }
        if (!password) {
            layer.msg('密码不能为空！', { icon: 2 });
            $('#password').focus();
            return;
        }
        if (index == 2) {
            if (!name) {
                layer.msg('昵称、不能为空！', { icon: 2 });
                $('#name').focus();
                return;
            } else {
                $('.login-btn span').html('进入链区');
                $('.yanzheng.phone span').html(phone)
                $('.yanzheng').show();
                $('.denglu').hide();
            }
        }
        if (index == 1) {
            $.ajax({ //登录
                url: host + 'api/v2/tokens',
                dataType: "json",
                type: "post",
                data: { login: phone, password: password },
                // contentType: "application/json; charset=utf-8",
                success: function(result) {
                    localStorage.setItem('access_token', result.token)
                    localStorage.setItem('access_avatar', result.user.avatar)
                    localStorage.setItem('access_uid', result.user.id)
                    localStorage.setItem('access_name', result.user.name)

                    layer.msg('登录成功', { icon: 1 });
                    $('.el-dialog__wrapper').hide();
                    $('.zhenzhao').hide();
                    if (localStorage.getItem('access_avatar') != 'null') {
                        var avatar = localStorage.getItem('access_avatar')
                    } else {
                        var avatar = './img/unknown.png';

                    }
                    var arr = '<div class="nav_hread_img">' +
                        '           <img src="' + avatar + '">' +
                        '         </div>';
                    $('.loginstatus').html(arr);
                    $('.index_hread_one .nav_hread_img').append(xiala)
                    $('.nav_hread_img').hover(function() {
                        $("#dropdown-menu-9567").css('display', 'block');
                    }, function() {
                        $("#dropdown-menu-9567").css('display', 'none');
                    });

                },
                error: function(ret, status) {
                    var result = JSON.parse(ret.responseText);
                    if (result.login) {
                        layer.msg(result.login[0], { icon: 2 });
                    } else {
                        layer.msg(result.password[0], { icon: 2 });
                    }
                }
            })
        } else {
            if ($('#checkcode').val()) {
                $.ajax({ //注册
                    url: host + 'api/v2/users',
                    dataType: "json",
                    type: "post",
                    data: {
                        phone: phone,
                        name: name,
                        password: password,
                        verifiable_code: checkcode,
                        verifiable_type: 'sms'
                    },
                    success: function(result) {
                        layer.msg('注册成功，欢迎来到币矿！', { icon: 1 });
                    },
                    error: function(ret, status) {
                        var result = JSON.parse(ret.responseText).errors;
                        if (result.phone) {
                            layer.msg(result.phone[0], { icon: 2 });
                        } else if (result.password) {
                            layer.msg(result.password[0], { icon: 2 });
                        } else if (result.verifiable_code) {
                            layer.msg(result.verifiable_code[0], { icon: 2 });
                        } else if (result.verifiable_type) {
                            layer.msg(result.verifiable_type[0], { icon: 2 });
                        } else if (result.name) {
                            layer.msg(result.name[0], { icon: 2 });
                        }
                    }
                })
            }

        }


    })

}
$('.logo_icon').on('click', function() {
    window.location.href = 'home.html';
})
$('.seach_icon').on('click', function() {
    var html = $('.one_input').val()
    localStorage.setItem('search', html)
    window.location.href = host1 + 'search';
})

document.onkeydown = function huichesearch(e) { //回车搜索
    varkeyCode = window.event ? e.keyCode : e.which;
    if (e.keyCode == 13) {
        var html = $('.one_input').val()
        if (html) {
            localStorage.setItem('search', html)
            window.location.href = host1 + 'search';
        }


    }
}