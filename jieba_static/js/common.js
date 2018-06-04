function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if(arr = document.cookie.match(reg))

		return unescape(arr[2]);
	else
		return null;
}

function setCookie(cookiename, cookievalue, hours) {
	var date = new Date();
	date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
	document.cookie = cookiename + "=" + cookievalue + "; path=/;domain=.jieba.cc;expires = " + date.toGMTString();

}

function prompt() {
	$("#prompt").show();
	setTimeout(function() {
		$("#prompt").fadeOut("slow", function() {
			$("#prompt").hide();
		});
	}, 1000)
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2])
	} else {
		return null;
	}
}
var aToken = getCookie("atoken");

var api = "http://api168.jieba.cc";
var mapi="http://m168.jieba.cc";

