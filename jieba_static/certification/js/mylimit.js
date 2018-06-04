$(function() {
	var url = api + "/api.aspx?pl=3&version=1.0&action=UserAuthorize&cmd=GetUserAuthorizeSummary171012&cb_tag=?";
	$.getJSON(url, {
		atoken: aToken,
	}, function(msg) {
		console.log(msg);
		if(msg.code == 0) {
			$(".head_con").text(msg.data.creditline);
			
			if(msg.data.allauth== 1) {
				$(".certication_btn").hide();
				
			}
			if(msg.data.list[0].isauth == 1) {
				$(".complete_tag").eq(0).addClass("com_active");
				$(".complete_tag").eq(0).html('<a href="idcard.html"></a>');
				$(".ci_bt").eq(0).addClass("ci_bt1_a");
			}
			if(msg.data.list[1].isauth == 1) {
				$(".complete_tag").eq(1).addClass("com_active");
				$(".complete_tag").eq(1).html('<a href="personalinfo.html"></a>');
				$(".ci_bt").eq(1).addClass("ci_bt2_a");
			}
			if(msg.data.list[2].isauth == 1) {
				$(".complete_tag").eq(2).addClass("com_active");
				$(".complete_tag").eq(2).html('<a href="bankcard.html"></a>');
				$(".ci_bt").eq(2).addClass("ci_bt3_a");
			}
			if(msg.data.list[3].isauth == 1) {
				$(".complete_tag").eq(3).addClass("com_active");
				$(".complete_tag").eq(3).html('<a href="contactmaninfo.html"></a>');
				$(".ci_bt").eq(3).addClass("ci_bt4_a");
			}
			if(msg.data.list[4].isauth == 1) {
				$(".complete_tag").eq(4).addClass("com_active");
				$(".complete_tag").eq(4).html('<a href="http://m.jieba.cc/credit/operatorauth?pl=3&atoken="' + aToken + '".html"></a>');
				$(".ci_bt").eq(4).addClass("ci_bt5_a");
			}
			
		} else {
			prompt();
			$("#prompt").text(msg.message)
		}

	});

})

function Certication() {
	var url = api + "/api.aspx?pl=3&version=1.0&action=UserAuthorize&cmd=GetUserAuthorizeSummary171012&cb_tag=?";
	$.getJSON(url, {
		atoken: aToken,
	}, function(msg) {
		console.log(msg);
		if(msg.code == 0) {
			if(msg.data.list[0].isauth == 0) {
				window.location.href = "idcard.html"
			} else if(msg.data.list[1].isauth == 0) {
				window.location.href = "personalinfo.html"
			} else if(msg.data.list[2].isauth == 0) {
				window.location.href = "bankcard.html"
			} else if(msg.data.list[3].isauth == 0) {
				window.location.href = "contactmaninfo.html"
			} else if(msg.data.list[4].isauth == 0) {
				window.location.href = "http://m.jieba.cc/credit/operatorauth?pl=3&atoken=" + aToken + ".html"
			} else {

			}
		} else {
			prompt();
			$("#prompt").text(msg.message)
		}

	});
}
$(function() {
	$("#phonebus").click(function() {
		Window.location.href = mapi+"/credit/operatorauth?pl=3&atoken=" + aToken + ".html";
	})

})