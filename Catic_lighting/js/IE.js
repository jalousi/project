var win = window;
var doc = win.document;
var input = doc.createElement ("input");
var ie = (function (){
//"!win.ActiveXObject" is evaluated to true in IE11
//if (win.ActiveXObject === undefined) return null;
if (!win.XMLHttpRequest) return 6;
if (!doc.querySelector) return 7;
if (!doc.addEventListener) return 8;
if (!win.atob) return 9;
//if (!input.dataset) return 10;
//return 11;
})();
if( ie<=9){
	$('.common').hide();
	$('.IE7_8').show();
}
