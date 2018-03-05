function _loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if(typeof(callback) != "undefined"){
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }
    }
    script.src = url;
    document.head.appendChild(script);
}

/*loadScript("jquery-latest.js", function () { //加载,并执行回调函数
 alert($(window).height());
 });*/
//loadScript("jquery-latest.js"); //加载js文件

//获取js文件对象
function get_local_jsfile(filename){
    $.ajaxSettings.async = false;
    $.getScript(filename);  //加载js文件
    $.ajaxSettings.async = true;
}

//包含html页面
/*
ops = {
    file:"",//文件地址 func_getcurrentpathdisk() + '/tpl/tpl_head_nav.html',//文件地址
    elem:"",//元素容器
    data:"",//json数据
    render:"",//是否渲染模板
}
*/
function html_tpl_render(ops,callback){
    if(is_null(ops)){
        ops = {};
    }
    if(typeof ops != 'object'){
        ops = {};
    }
    if(is_null(ops.data)){
        ops.data = {};
    }
    if(typeof ops.data != 'object'){
        ops.data = {};
    }
    $.ajaxSettings.async = false;
    $.get(ops.file,{},function(html){
        ops.html = html;
        if(ops.render == true){
            var tem_html = $.template( "tem_html", html );
            $.tmpl( tem_html, ops.data).appendTo( ops.elem );
        }
        if(!is_null(callback)){
            callback(ops);
            //eval(callbackf + '(' + JSON.stringify(ops) + ')');
        }
    });
    $.ajaxSettings.async = true;
}
get_local_jsfile("js/static/js/lazyload/lazyload.js");
get_local_jsfile("js/static/js/common/common.js");
get_local_jsfile("js/static/js/common/stores.js");
get_local_jsfile("js/static/js/jquery/jquery.tmpl.js");
//$.ajaxSettings.async = false;
//$.getScript("../../static/js/lazyload/lazyload.js");  //加载js文件
//$.getScript("../../static/js/common/common.js");  //加载js文件
//$.getScript("../../static/js/common/stores.js");  //加载js文件
//$.ajaxSettings.async = true;

//接口调用
/*
var ops = {
    url: '',
    method: 'post',
    data: {},
    datatype: 'json',
};
*/
function api_call(ops,callbackx){
    if(is_null(ops)){
        ops = {};
    }
    if(typeof ops != 'object'){
        ops = {};
    }
    if(ops.datatype){
        ops.datatype = ops.datatype.toLowerCase();
    }
    if(!is_null(ops.method)){
        ops.method = ops.method.toLowerCase();
    }else{
        ops.method = 'post';
    }
    if(ops.method == 'post'){
        $.post(ops.url,ops.data,function(data){
            if(!is_null(callbackx)){
                if(ops.datatype == 'json'){
                    data = JSON.parse(data);
                }
                callbackx(data);
                //eval(callbackf + '(' + JSON.stringify(ops) + ')');
            }
        });
    }else{
        if(ops.datatype == 'jsonp'){
            $.ajax({
                type : "get",
                data: ops.data,
                async: true,  //设置同步异步
                url : ops.url,
                dataType : "jsonp",
                jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                //jsonpCallback:callback,//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                success : function(data){
                    callbackx(data);
                },
                error:function(e){
                    alert("FAIL：" + ops.url);
                    //alert_json(XMLHttpRequest)
                    alert_json(textStatus)
                    //alert_json(errorThrown)
                    //alert("FAIL：" + JSON.stringify(e.responseText));
                }
            });
        }else if(ops.datatype == 'json'){
            $.ajax({
                type : "get",
                data: ops.data,
                async: true,  //设置同步异步
                url : ops.url,
                dataType : "json",
                success : function(data){
                    callbackx(data);
                },
                error:function(e){
                    alert("FAIL：" + ops.url);
                    //alert_json(XMLHttpRequest)
                    alert_json(textStatus)
                    //alert_json(errorThrown)
                    //alert("FAIL：" + JSON.stringify(e.responseText));
                }
            });
        }else{
            $.ajax({
                type : "get",
                data: ops.data,
                async: true,  //设置同步异步
                url : ops.url,
                dataType : "",
                success : function(data){
                    data = JSON.parse(data);
                    callbackx(data);
                },
                error:function(e){
                    alert("FAIL：" + ops.url);
                    //alert_json(XMLHttpRequest)
                    alert_json(textStatus)
                    //alert_json(errorThrown)
                    //alert("FAIL：" + JSON.stringify(e.responseText));
                }
            });
        }

    }

}

