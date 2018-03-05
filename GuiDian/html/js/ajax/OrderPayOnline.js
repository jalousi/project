var wxid = localStorage.getItem("m_openid");
var _orderid = getQueryString('orderid');

$('#Totalpay').html(getQueryString('finalPaynum'));
$('#PayNumb').html(getQueryString('finalPaynum'));

var SysSecond;
var InterValObj;
var showrelesetime = document.querySelector('.relesetime .relesetime-t h2');

mui.getJSON(commonUrl + 'apigd/orderrows', {
	m_openid: wxid,
	did: _orderid
}, function(data) {
	if(data.code == 1) {
		var Data = data.data;
		if(Data.type == 'fx') {
			$('.relesetime-t').hide();
			$('#yuepay').hide();
		} else {
			var nowtime = getNowFormatDate();
			var _finalsecond = DateDiff(nowtime, Data.order_yxtime);
			showrelesetime.innerHTML = timeStamp(nowtime, Data.order_yxtime);
			SysSecond = parseInt(_finalsecond); //倒计时的起始时间（秒）
			InterValObj = window.setInterval(SetRemainTime, 1000);
		}
	}
});

//获取当前时间
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
	return currentdate;
}

//最终秒转天时分
function timeStamp(creattime, endtime) {
	var second_time = DateDiff(creattime, endtime);
	var time = parseInt(second_time) + "秒";
	if(parseInt(second_time) > 60) {

		var second = parseInt(second_time) % 60;
		var min = parseInt(second_time / 60);
		time = toDouble(min) + " : " + toDouble(second);

		if(min > 60) {
			min = parseInt(second_time / 60) % 60;
			var hour = parseInt(parseInt(second_time / 60) / 60);
			time = toDouble(hour) + "小时" + toDouble(min) + " : " + toDouble(second);

			if(hour > 24) {
				hour = parseInt(parseInt(second_time / 60) / 60) % 24;
				var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
				time = day + "天" + toDouble(hour) + "小时" + toDouble(min) + " : " + toDouble(second);
			}
		}

	}
	return time;
}

//计算 时间之间的秒数
function DateDiff(creattime, endtime) {
	var sDate1 = creattime.split(' ')[0],
		stime1 = creattime.split(' ')[1];
	var sDate2 = endtime.split(' ')[0],
		stime2 = endtime.split(' ')[1];

	var startTime = new Date(Date.parse(sDate1.replace(/-/g, "/"))).getTime();
	var endTime = new Date(Date.parse(sDate2.replace(/-/g, "/"))).getTime();
	var days = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);

	var _sencond = parseInt(time_to_sec(stime1)) - parseInt(time_to_sec(stime2));

	var days_sencond = days * 86400 - _sencond;
	return days_sencond;
}

//将时间减去1秒，计算天、时、分、秒 
function SetRemainTime() {
	if(SysSecond > 0) {
		SysSecond = SysSecond - 1;
		var second = Math.floor(SysSecond % 60);
		var minite = Math.floor((SysSecond / 60) % 60);
		var hour = Math.floor((SysSecond / 3600) % 24);
		var day = Math.floor((SysSecond / 3600) / 24);

		//console.log(day + "天" + toDouble(hour) + "小时" + toDouble(minite) + "分" + toDouble(second) + "秒");

		showrelesetime.innerHTML = toDouble(minite) + " : " + toDouble(second);
	} else {
		window.clearInterval(InterValObj);
		//这里可以添加倒计时时间为0后需要执行的事件 
	}
}

function toDouble(i) { //将0-9的数字前面加上0，例1变为01 
	if(i < 10) {
		i = "0" + i;
	}
	return i;
}

//时分秒转秒数
function time_to_sec(time) {
	var s = '';
	var hour = time.split(':')[0];
	var min = time.split(':')[1];
	var sec = time.split(':')[2];

	s = Number(hour * 3600) + Number(min * 60) + Number(sec);
	return s;
};