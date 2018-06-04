
//获取微信分享需要的验证信息；
$(function getWeiXinSign() {
    $.post("http://m.jieba.cc/user/GetWeiXinSign",
        {},
        function (data) {
            $("#hidData").val(data);
            var dataJson = JSON.parse(data);
            $("#txtMoney").text(dataJson.data.amount);
            $("#txtCount").text(dataJson.data.payCount);
            $("#txtPayMoney").text(dataJson.data.payMoney);
        });
});

$(function () {
	if(navigator.userAgent.match(/(iPhone|iPad|ios)/i)) {
		$(".apple").show();
		$("#unlink span").show();
	} else {
		$(".apple").hide();
		$("#unlink span").hide();
	}
})

$(function() {
	$(".rule").click(function(){
		$(".layer").show();
	})
	$(".close_btn").click(function(){
		$(".layer").hide();
	})
})

//微信分享相关方法

//判断是否是在微信内打开
function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}


//分享入口
 
function wapShare() { 
    if (is_weixn()) {
        $(".layer_invite").show();
        $("#knowclose").click(function () {
            $(".layer_invite").hide();
        });
    }
    var dataJson = JSON.parse($("#hidData").val());
    var shareUrl = "http://m.jieba.cc/page/activity/invitefriend/invitepage.html?icode=" + dataJson.data.icode;
    if (navigator.userAgent.match(/(iPhone|iPod|ios)/i)) {
        window.webkit.messageHandlers.IosAppShare.postMessage({
            title: "送你一个大礼包，快来领取吧",
            contents: "没钱花？来借吧财富啊！首借免息，申请便捷，操作简单。申请1分钟即可放款。点我申请！",
            imgage: "http://static.jieba.cc/upload/apk/image/adviertisement.jpg",
            shareurl: shareUrl
        });
    } else {
        android.jsOnClickShare("{title: '送你一个大礼包，快来领取吧',contents: '没钱花？来借吧财富啊！首借免息，申请便捷，操作简单。申请1分钟即可放款。点我申请！' , imgage: 'http://static.jieba.cc/upload/apk/image/adviertisement.jpg ', shareurl: '"+shareUrl+"'}");  //jsOnFinishWebview()为安卓的方法名 ，替换就行
    }
}

$(function () {
    var dataJson = JSON.parse($("#hidData").val());
    //微信配置 
    wx.config({
        debug: false,
        appId: dataJson.data.appId,
        timestamp:dataJson.data.timeStamp,
        nonceStr: dataJson.data.nonceStr,
        signature: dataJson.data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
    });
    var Title = "送你一个大礼包，快来领取吧";
    var Desc = "没钱花？来借吧财富啊！首借免息，申请便捷，操作简单。申请1分钟即可放款。点我申请！";
    var icode = dataJson.data.icode;
    //微信朋友圈

});
wx.ready(function () {
    var dataJson = JSON.parse($("#hidData").val());
    var linkStr = "http://m.jieba.cc/page/activity/invitefriend/invitepage.html?icode=" + dataJson.data.icode;
    var imgUrlStr = 'http://m.jieba.cc/image/activity-Invite.png';
    //发送给朋友
    alert(dataJson.data.icode);
    wx.onMenuShareAppMessage({
        title: Title,
        desc: Desc,
        link: linkStr + "&qd=1&hd=1&ly=0",
        imgUrl: imgUrlStr
    });
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: Title,
        link: linkStr + "&qd=3&hd=1&ly=0",
        imgUrl: imgUrlStr
    });
    //分享到QQ
    wx.onMenuShareQQ({
        title: Title,
        desc: Desc,
        link: linkStr + "&qd=2&hd=1&ly=0" ,
        imgUrl: imgUrlStr
    });
    //分享到QQ空间
    wx.onMenuShareQZone({
        title: Title,
        desc: Desc,
        link: linkStr + "&qd=4&hd=1&ly=0",
        imgUrl: imgUrlStr
    });
})

wx.error(function (ex) {
    var url = "/app/Activity/LogWrite";
    var data = {};
    data.ex = JSON.stringify(ex);
    $.post(url, data, function (dt) {

    });
});





 