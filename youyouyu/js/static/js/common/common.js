/*//定义title属性
下面看一个简单的实例，相信各们一看就能清楚jquery.delay()的使用方法了：

$(‘#angelweb’).slideUp(300).delay(800).fadeIn(400);

上面这句的意思就是使一个ID为angelweb的元素在300毫秒内收起，然后停顿800毫秒后，再在四百毫秒内渐显出来。

怎么样，是不是很简单啊！上面就是jquery.delay()的使用方法了，再来看一个简单的例子：

$('#angelweb').html('Post succeess').delay(300).html('');


$(document).ready(function () {
	$("a,tr,td").ToolTipDemo("#fff", "#000", "#399522");
});

$('body').on('click', $.proxy(function(){
			$('#div1').hide();
			
		}, false));

//批量替换
String.prototype.replaceAll  = function(s1,s2){   
	var reg = new RegExp(s1,"gm");
	//alert(reg)
    return this.replace(reg,s2);    
}
html = html.replaceAll("\\[" + def_vvv + "\\]\\[\\]","[" + tem_fin_pn + "][]");
		

$(document).ready(function(){
alert($(window).height()); //浏览器当前窗口可视区域高度
alert($(document).height()); //浏览器当前窗口文档的高度
alert($(document.body).height());//浏览器当前窗口文档body的高度
alert($(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin

alert($(window).width()); //浏览器当前窗口可视区域宽度
alert($(document).width());//浏览器当前窗口文档对象宽度
alert($(document.body).width());//浏览器当前窗口文档body的宽度
alert($(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding margin

})
//========================Ajax跨域
$.ajax({
    type : "get",//只能get
    async: false,
    url : "http://127.0.0.1/shopapp/api.php?m=Shop&a=catlist&cross=1",
	data: {pid:0,level:1},
    dataType : "jsonp",
    jsonp: "callbackparam",//服务端用于接收callback调用的function名的参数 必须的，不要随意更改
    //jsonpCallback:"success_jsonpCallback",//callback的function名称
    success : function(json){
        //alert(json);
        //alert(json[0].name);
		alert(JSON.stringify(json));
    },
    error:function(){
        alert('fail');
    }
});
*/
//$('#mainxztr').children('td').eq(parseInt(tdind)).find('.ppdiv').html();

//$('textarea').prop('outerHTML');//获取自身html


//这个方法做了一些操作、然后调用回调函数   
/*
//回调函数1    
 function callback(a,b,c)    
{    
  alert(a+b+c);    
}    
//回调函数2    
function callback2(a,b)    
{    
  alert(a+b);    
}    
//这个方法做了一些操作、然后调用回调函数    
function func_callback(fn,args){    
    fn.apply(this, args);  
}    
     
function test()    
{    
         
    //动态调用方法、并传递参数    
  func_callback(eval("callback2"),['a','b']);    
  func_callback(callback,['a','b','c']);    
}
test();
*/
//获取object对象的长度
function getJsonObjLength(jsonObj) {
	var Length = 0;
	for (var item in jsonObj) {
		Length++;
	}
	return Length;
}
function json_tostring(jsonobj){
	if(typeof jsonobj != 'object'){
		return jsonobj;
	}
	return JSON.stringify(jsonobj);
}
//json格式化输出
function json_format(jsonobj){
	if(typeof jsonobj != 'object'){
		return jsonobj;
	}
	return "<pre>" + JSON.stringify(jsonobj, null, 4) + "</pre>";
	//return "<pre>" + JSON.stringify(jsonobj, null, "\t") + "</pre>"
}
function func_callback(fn,args){    
    fn.apply(this, args);  
} 
function func_enter_sub_null(){
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			return false;
		}
	});
}
function func_enter_sub(objel){
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			$(objel).trigger("click");
		}
	});
}
//设置默认值
function func_def_empty(str,value){
	if(is_null(str)){
		return value;
	}else{
		return str;
	}
}
//thisURL = document.URL;     // http://localhost:81/Test/1.htm?Did=123
//thisHREF = document.location.href; // http://localhost:81/Test/1.htm?Did=123
//thisSLoc = self.location.href;   // http://localhost:81/Test/1.htm?Did=123
//thisDLoc = document.location;   // http://localhost:81/Test/1.htm?Did=123
//
//thisTLoc = top.location.href;   // http://localhost:81/Test/1.htm?Did=123
//thisPLoc = parent.document.location;// http://localhost:81/Test/1.htm?Did=123
//thisTHost = top.location.hostname; // localhost
//thisHost = location.hostname;   // localhost
//
//thisU1 = window.location.protocol; // http:
//thisU2 = window.location.host;   // localhost:81
//thisU3 = window.location.pathname; // /Test/1.htm
function func_getRootPath() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPath = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPath + projectName);
}
function func_getsurlname(){
	return window.document.location.pathname;
}
function func_gethttphost(){
	return window.location.host;
}
function func_gethttp(){
	return window.location.protocol;
}
//获取当前html网络路径
function func_getcurrentpath(){
	var url = func_gethttp() + "//" + func_gethttphost() + func_getsurlname();
	var ss = [];
	ss = url.split("/");
	ss.pop();
	url = ss.join("/");
	return url;
}
//获取当前html相对路径
function func_getcurrentpathdisk(){
	var httpurl = func_getcurrentpath();
	var httpurlroot = func_gethttp() + "//" + func_gethttphost();
	var url = httpurl.replace(httpurlroot,"");
	return url;
}
//获取当前路径文件名
function func_getcurrenturlname(){
	var url = func_getsurlname();
	var ss = [];
	ss = url.split("/");
	var suname = ss.pop();
	return suname;
}
//js获取url参数值
/*
 <Script language="javascript">
 var Request = new Object();
 Request = GetRequest();
 var 参数1,参数2,参数3,参数N;
 参数1 = Request['参数1'];
 参数2 = Request['参数2'];
 参数3 = Request['参数3'];
 参数N = Request['参数N'];
 </Script>
 */
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
function is_null(data){
	if(data == 'undefined' || data == undefined || data == "" || data == 0 || data == "0" || data == 'null' || data == null || data == 'false' || data == false){
		return true;
	}else{
		return false;
	}
}
//js获取url参数值
/*
 <Script language="javascript">
 alert(GetQueryString("参数名1"));
 alert(GetQueryString("参数名2"));
 alert(GetQueryString("参数名3"));
 </Script>
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
function str_trim(str){ //删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
function str_ltrim(str){ //删除左边的空格
	return str.replace(/(^\s*)/g,"");
}
function str_rtrim(str){ //删除右边的空格
	return str.replace(/(\s*$)/g,"");
}
//批量替换 //html = html.replaceAll_tem("\\[" + def_vvv + "\\]\\[\\]","[" + tem_fin_pn + "][]");
String.prototype.replaceAll_tem  = function(s1,s2){   
	var reg = new RegExp(s1,"gm");
	//alert(reg)
    return this.replace(reg,s2);    
}
function func_getRootPathDomain(){
	return "http://" + document.domain;
}

//获取手机端的图片完整路径
function get_full_path(url,http_url){
	
	if(!http_url){
		http_url = func_getRootPathDomain();
	}
	var tem = url;
	
	if(url){
		if(tem.toLowerCase().indexOf("http://") != -1){
			return url;
		}else{
			url = "/" + url;
			url = url.replace("//","/");
			return http_url + url;
		}
	}else{
		return http_url;
	}
}
function func_openwin(url,w,h){
	w = w ? w : 750;
	h = h ? h : 480;
	w = new Number(w);
	h = new Number(h);
	var win_left = ($(window).width()-w)/2;
	var win_top = ($(window).height()-h)/2;
	window.open(url,'','height='+h+',width='+w+',top='+win_top+',left='+win_left+',toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no');
}

function get_inputnames_value(obj1){
	if(!obj1){
		obj1 = "ids";
	}
	var ids = [];
	$("input[name='" + obj1 + "[]']:checked").each(function(){
		/*if(ids){
			ids += "," + $(this).val();
		}else{
			ids = $(this).val();
		}*/
		ids.push($(this).val());
	});
	var idstr = ids.join(",");
	return idstr;
}
function get_selectnames_value(obj1){
	if(!obj1){
		obj1 = "ids";
	}
	var ids = [];
	$("select[name='" + obj1 + "[]']:selected").each(function(){
		/*if(ids){
			ids += "," + $(this).val();
		}else{
			ids = $(this).val();
		}*/
		ids.push($(this).val());
	});
	var idstr = ids.join(",");
	return idstr;
}
//全选
function selectAll(obj1){
	if(!obj1){
		obj1 = "ids";
	}
	//alert(obj1)
	var a = document.getElementsByName(obj1 + "[]")[0].checked?false:true;
	var obj = document.getElementsByTagName("input");
	for(var i=0;i<obj.length;i++){
		if(obj[i].name.indexOf(obj1)!=-1 && obj[i].type=="checkbox"){
			obj[i].checked = a;
		}
	}
}
//全选
function selectAll1(obj1,o){
	if(!obj1){
		obj1 = "ids";
	}
	var oo = $(o);
	//alert(oo.prop("checked"))
	//alert(document.getElementsByName(obj1 + "[]")[0].checked)
	//alert(obj1)
	var a = oo.prop("checked");
	//var a = document.getElementsByName(obj1 + "[]")[0].checked?false:true;
	var obj = document.getElementsByTagName("input");
	for(var i=0;i<obj.length;i++){
		if(obj[i].name.indexOf(obj1)!=-1 && obj[i].type=="checkbox"){
			obj[i].checked = a;
		}
	}
}
//检查手机访问
function func_check_phone(){
	var ck = (navigator.userAgent.match(/(iPhone|iPod|Android|ios|windows mobile|windows phone)/i));
	return ck;
}


/**
 * 加载信息框
 * @param txt
 * @returns
 var ops = {
	objid:"dialog_id",//操作id
	title:"测试",//标题
	close_title:"隐藏",//取消标题
	data:rdata,//数据
	width:"500px",//宽度 225px 50%
	height:"400px",//高度 225px 50%
	bg_show:true,//是否显示背景层
};
func_dialog(ops);
 */
function func_dialog(ops){
	this.options = {
		objid:"dialog_id",//操作id
		title:"",//标题
		close_title:"隐藏",//取消标题
		data:"",//数据
		width:"50%",//宽度 225px 50%
		height:"400px",//高度 225px 50%
		bg_show:true,//是否显示背景层
	};
	
	this.options = $.extend(this.options, ops);
	
	var setting = this.options;
	if(!setting.objid){
		return false;
	}
	var z_index = 10000;
	var z_index1 = z_index + 10;
	$('#' + setting.objid).remove();
	if(setting.bg_show){
		var height_def = $(document).height();
		//var height_def = $(document.body).height();
		//var height_def = $(window).height();
		if(height_def <= 0){
			height_def = "100%";
		}
		
		var divhtml0 = '<div id="out_bg_' + setting.objid + '" style="overflow: hidden;width: 100%;height: 100%; float:left;left: 0;top: 0;background-color:#999;transparent; opacity: 0.5;filter: Alpha(opacity=50);position: absolute;z-index:' + z_index + ';">';
		divhtml0 += '</div>';
		var div0 = $(divhtml0);
		div0.css("height",height_def);
		$('body').append(div0);
	}
	//overflow-x: hidden;overflow-y:auto;
	var divhtml = '<div id="' + setting.objid + '" style="border:10px solid #999; width: ' + setting.width + ';height: ' + setting.height + '; position: absolute;left: -1000px;top: -1000px;font-size:12px;background:#FFFFFF;transparent; opacity: 1;z-index:' + z_index1 + ';">';
	divhtml += '<div style="height: 30px; line-height: 25px; width: 100%; background:none repeat scroll 0 0 #F0F0F0">';
	divhtml += '<span style="float:left;width:99%;padding:3px;" class="dialog_tem_title_' + setting.objid + '">';
	divhtml += '<font style="float:left;padding-left:3px;">' + setting.title + '</font>';
	divhtml += '<font style="float:right;text-align:right;cursor:pointer;" onclick=$(this).parent().parent().parent().remove();$("#out_bg_' + setting.objid + '").remove();>' + setting.close_title + '</font>';
	divhtml += '</span>';
	//divhtml += '<span style="float:right;text-align:right;padding:3px;cursor:pointer;" onclick=$(this).parent().parent().remove();$("#out_bg_' + setting.objid + '").remove();>' + setting.close_title + '</span>';
	divhtml += '</div>';
	
	
	var height_c = setting.height;
	var height_c = height_c.replace("px","");
	height_c = height_c.replace("%","");
	height_c = new Number(height_c);
	if(setting.height.indexOf("px") != -1){
		height_c = height_c - 50;
		height_c = height_c + "px";
	}else if(setting.height.indexOf("%") != -1){
		height_c = height_c + "%";
	}else{
		height_c = height_c + "px";
	}
	
	divhtml += '<div style="height:' + height_c + ';overflow-y:auto;padding:5px;text-align: center; width: 98%; background-color:#FFFFFF">' + setting.data + '</div>';
	divhtml += '</div>';
	
	
	
	var div = $(divhtml);
	$('body').append(div);
	div.css('zIndex',z_index1);
	div.css('left',parseInt(($(window).width()-div.width())/2));
	var top = parseInt($(window).scrollTop()+($(window).height()-div.height())/2);
	div.css('top',top);	
	
	
	var _move=false;//移动标记  
	var _x,_y;//鼠标离控件左上角的相对位置  
	var dialog_tem_title = div.find(".dialog_tem_title_" + setting.objid).eq(0);
	$(dialog_tem_title).mouseover(function(){  
		$(this).css("cursor","move");
	});
	$(dialog_tem_title).click(function(){  
		$(this).css("cursor","move");
	    //alert("click");//点击（松开后触发）  
	    }).mousedown(function(e){  
	    //$(this).css("cursor","move");
	    _move=true;
	    _x=e.pageX-parseInt(div.css("left"));  
	    _y=e.pageY-parseInt(div.css("top"));  
	    //$(".drag").fadeTo(20, 0.5);//点击后开始拖动并透明显示  
		}
	);  
	$(document).mousemove(function(e){  
	    if(_move){  
	        var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置  
	        var y=e.pageY-_y;  
	        $(div).css({top:y,left:x});//控件新位置  
	    }  
	}).mouseup(function(){  
	_move=false;  
	// $(".drag").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明  
	});  
	
	
	if(setting.bg_show){
		div0.click(function(){
			//var ids = $(this).attr("id");
			$('#'+setting.objid).remove();
			//alert(ids)
			$(this).remove();
		})
	}
}


/**
 * 吐丝信息框
 * @param txt
 * @returns
 */
function func_tk1(txt,time,fun){
	if(txt === false || txt == undefined){
		$('.tusi').remove();
	}else{
		$('.tusi').remove();
		time = time ? time : 2000;
		$('.tusi').remove();
		var div = $('<div class="tusi" style="background-color:#000;max-width: 85%;min-height: 77px;min-width: 270px;position: absolute;left: -1000px;top: -1000px;text-align: center;border-radius:10px;"><span style="color: #ffffff;line-height: 77px;font-size: 23px;">'+txt+'</span></div>');
		$('body').append(div);
		div.css('zIndex',9999999);
		div.css('left',parseInt(($(window).width()-div.width())/2));
		var top = parseInt($(window).scrollTop()+($(window).height()-div.height())/2);
		div.css('top',top);
		setTimeout(function(){
			div.remove();
	    	if(fun){
	    		eval(fun);
	    	}
		},time);
	}
}


/**
 * 吐丝信息框 带效果的
 * @param txt
 * @returns
 * func_tk2(tema[1],1000,"jumpAclick('" + $('#hid_ajax_submit_rurl').val() + "')");
 */
function func_tk2(txt,time,fun){
	if(txt === false || txt == undefined){
		$('.tusi').remove();
	}else{
		$('.tusi').remove();
		time = time ? time : 2000;
		var div = $('<div class="tusi" style="background-color:#000;max-width: 85%;min-height: 77px;min-width: 270px;position: absolute;left: -1000px;top: -1000px;text-align: center;border-radius:10px;"><span style="color: #ffffff;line-height: 77px;font-size: 23px;">'+txt+'</span></div>');
		$('body').append(div);
		div.css('zIndex',9999999);
		div.css('left',parseInt(($(window).width()-div.width())/2));
		var top = parseInt($(window).scrollTop()+($(window).height()-div.height())/2);
		div.css('top',top);
		setTimeout(function(){
			div.animate({ 
		        top: top-200,
		        opacity:0}, {
		        duration:888,
		        complete:function(){
		        	div.remove();
		        	if(fun == undefined || fun == 'undefined' || fun === '' ){
		        		return ;
		        	}else{
		        		eval(fun);
		        	}
		        }
		    });
		},time);
	}
}
//延迟执行
function init_delay(func,timer){
	if(is_null(timer)){
		timer = 1000
	}
	setTimeout(function(){
		eval(func)
	},timer);
}
/**
 * 加载信息框
 * @param txt
 * @returns
 */
function func_loading(txt){
	var tt = '';
	if(txt){
		tt = txt;
	}
	var txt = tt;
	if(txt == "hide"){
		$('.qp_lodediv').remove();
	}else{
		//txt = '';
		$('.qp_lodediv').remove();
		var div = $('<div class="qp_lodediv" style="background-color:#000;width: 269px;height: 107px;position: absolute;left: -1000px;top: -1000px;text-align: center;"><span style="color: #ffffff;line-height: 107px;font-size: 23px; white-space: nowrap;">&nbsp;&nbsp;&nbsp;'+txt+'</span></div>');
		$('body').append(div);
		div.css('zIndex',9999999);
		div.css('left',parseInt(($(window).width()-div.width())/2));
		var top = parseInt($(window).scrollTop()+($(window).height()-div.height())/2);
		div.css('top',top);
	}	
}
/**
 * 加载信息框
 * @param txt
 * @returns
 */
function func_loading_iframe(txt,iframename){
	var tt = '';
	if(txt){
		tt = txt;
	}
	var txt = tt;
	if(txt == "hide"){
		$(window.frames[iframename]).find('.qp_lodediv').remove();
	}else{
		//txt = '';
		$(window.frames[iframename]).find('.qp_lodediv').remove();
		var div = $('<div class="qp_lodediv" style="background-color:#000;width: 269px;height: 107px;position: absolute;left: -1000px;top: -1000px;text-align: center;"><span style="color: #ffffff;line-height: 107px;font-size: 23px; white-space: nowrap;">&nbsp;&nbsp;&nbsp;'+txt+'</span></div>');
		$('body').append(div);
		div.css('zIndex',9999999);
		div.css('left',parseInt(($(window).width()-div.width())/2));
		var top = parseInt($(window).scrollTop()+($(window).height()-div.height())/2);
		div.css('top',top);
	}	
}
//构造自定义跳转，兼容ie HTTP_REFERER
function jumpAclick(url){
	if(url == undefined || url == 'undefined' || url === '' ){
		return false;
	}
	var theLink = '';
    if (document.getElementById) {
       theLink = document.getElementById('redirect_link');
       if (!theLink) {
          theLink = document.createElement('a');
          theLink.style.display = 'none';
          theLink.id = 'redirect_link';
          document.body.appendChild(theLink);
       }  
       if (url) theLink.href = url;
    }  
    if ((theLink) && (theLink.click)){
    	theLink.click();
    }else{
    	location.href = url;
    }
}

// 说明：用 JavaScript 实现网页图片等比例缩放
// 整理：http://www.CodeBit.cn
function func_drawImage(ImgD,FitWidth,FitHeight){
	var image = new Image();
	image.src = ImgD.src;
	if(image.width>0 && image.height>0){
		if(image.width/image.height>= FitWidth/FitHeight){
			if(image.width>FitWidth){
				ImgD.width=FitWidth;
				ImgD.height=(image.height*FitWidth)/image.width;
			}else{
				ImgD.width=image.width;
				ImgD.height=image.height;
			}
		}else{
			if(image.height>FitHeight){
				ImgD.height=FitHeight;
				ImgD.width=(image.width*FitHeight)/image.height;
			}else{
				ImgD.width=image.width;
				ImgD.height=image.height;
			}
		}
	}
} 

//识别中文
function func_toUtf8(str) {   
    var out, i, len, c;   
    out = "";   
    len = str.length;   
    for(i = 0; i < len; i++) {   
    	c = str.charCodeAt(i);   
    	if ((c >= 0x0001) && (c <= 0x007F)) {   
        	out += str.charAt(i);   
    	} else if (c > 0x07FF) {   
        	out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
        	out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	} else {   
        	out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	}
    }
    return out;
}  

//检查手机号
function func_ck_mobile(tel){    
	var re=/^(13[0-9]{9})|(15[89][0-9]{8})$/;   
	if(!re.test(tel)){      
		//alert('请输入正确的手机号码。');
		return false;
	}
	return true;
}
//检查邮箱
function func_ck_email(email) { 
    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/; 
    if (!pattern.test(email)) { 
        //alert("请输入正确的邮箱地址。");
        return false;
    }
    return true;
}
//alert(dateFormat.myTime.UnixToDate(1427186646,"-:",8))
//dateFormat.myTime.DateToUnix('2014-5-15 20:20:20')
var dateFormat = {
	myTime: {
		/**
		 * 当前时间戳
		 * @return <int>        unix时间戳(秒)  
		 */
		CurTime: function(){
			return Date.parse(new Date())/1000;
		},
		/**              
		 * 日期 转换为 Unix时间戳
		 * @param <string> 2014-01-01 20:20:20  日期格式              
		 * @return <int>        unix时间戳(秒)              
		 */
		DateToUnix: function(string) {
			var f = string.split(' ', 2);
			var d = (f[0] ? f[0] : '').split('-', 3);
			var t = (f[1] ? f[1] : '').split(':', 3);
			return (new Date(
					parseInt(d[0], 10) || null,
					(parseInt(d[1], 10) || 1) - 1,
					parseInt(d[2], 10) || null,
					parseInt(t[0], 10) || null,
					parseInt(t[1], 10) || null,
					parseInt(t[2], 10) || null
					)).getTime() / 1000;
		},
		/**              
		 * 时间戳转换日期              
		 * @param <int> unixTime    待时间戳(秒)              
		 * @param <bool> format    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)              
		 * @param <int>  timeZone   时区              
		 */
		UnixToDate: function(unixTime, format, timeZone ) {
			if (typeof (timeZone) == 'number')
			{
				unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
			}
			var time = new Date(unixTime * 1000);
			var Year = time.getUTCFullYear();
			var Month = time.getUTCMonth()+1;
			var Day = time.getUTCDate();
	
			var Hour = time.getUTCHours();
			var Min = time.getUTCMinutes();
			var Sec = time.getUTCSeconds();
			
			var year_f,month_f,day_f,hour_f,min_f,sec_f;
			
			year_f = Year;
	
			if (Month >= 10 ){
		     month_f = Month;
		    }
		    else{
		     month_f = "0" + Month;
		    }
		    if (Day >= 10 ){
		     day_f = Day ;
		    }
		    else{
		     day_f = "0" + Day ;
		    }
		    
		    if (Hour >= 10 ){
		     hour_f = Hour ;
		    }
		    else{
		     hour_f = "0" + Hour ;
		    }
		    
		    if (Min >= 10 ){
		     min_f = Min ;
		    }
		    else{
		     min_f = "0" + Min ;
		    }
		    
		    if (Sec >= 10 ){
		     sec_f = Sec ;
		    }
		    else{
		     sec_f = "0" + Sec ;
		    }
		    
		    format = format ? format : "-:";
		    //var year_f,month_f,day_f,hour_f,min_f,sec_f;
		    if(format == '-'){
		    	//YYYY-mm-dd
		    	return year_f + "-" + month_f + "-" + day_f;
		    }
		    if(format == '-:'){
		    	//YYYY-mm-dd HH:ii:ss
		    	return year_f + "-" + month_f + "-" + day_f + " " + hour_f + ":" + min_f + ":" + sec_f;
		    }
		    if(format == '/'){
		    	//YYYY-mm-dd
		    	return year_f + "/" + month_f + "/" + day_f;
		    }
		}
	}
}


function date_format(date, format) {
	if (typeof date === "string") {
		var mts = date.match(/(\/Date\((\d+)\)\/)/);
		if (mts && mts.length >= 3) {
			date = parseInt(mts[2]);
		}
	}
	date = new Date(date);
	if (!date || date.toUTCString() == "Invalid Date") {
		return "";
	}
	var map = {
		"M": date.getMonth() + 1, //月份
		"d": date.getDate(), //日
		"h": date.getHours(), //小时
		"m": date.getMinutes(), //分
		"s": date.getSeconds(), //秒
		"q": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};

	format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
		var v = map[t];
		if (v !== undefined) {
			if (all.length > 1) {
				v = '0' + v;
				v = v.substr(v.length - 2);
			}
			return v;
		}
		else if (t === 'y') {
			return (date.getFullYear() + '').substr(4 - all.length);
		}
		return all;
	});
	return format;
}
/*创建随机验证码*/
function func_createCode(len,panel){
	code = ""; 
	var checkCode = document.getElementById(panel);   
	var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
	for(var i = 0; i < len; i++) {
		var index = Math.floor(Math.random()*36); 
		code += random[index];
	}
	checkCode.innerHTML = code;
}

/*检查验证码*/
function func_checkCode(inputNum,veri){
	if(document.getElementById(inputNum).value.toUpperCase() == document.getElementById(veri).innerHTML && document.getElementById(inputNum).value != ''){
		return true;
	}else{
		document.getElementById(inputNum).value = '';
		func_createCode(4,veri);
		return false;
	}

}

/*判断邮箱*/
function func_isEmail(str){
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	return reg.test(str);
}

/*判断手机号码*/
function func_isPhone(num){ 
	var patrn = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/; 
	if (!patrn.exec(num)) { 
		return false; 
	}else{
		return true; 
	}
}

