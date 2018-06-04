var api_site_domain = "http://api.jieba.cc";

function prompt() {
	$("#prompt").show();
	setTimeout(function() {
		$("#prompt").fadeOut("slow", function() {
			$("#prompt").hide();
		});
	}, 1000)
}
$(function() { //input输入完 按钮变色
	$('input').on('input propertychange', function() {
		if(($.trim($('.mobile').val()) !== "") && ($.trim($('.smscode').val()) !== "")) {
			$('.register_btn').css({
				'background-color': '#fa4f47',

			});
		} else {
			$('.register_btn').css({
				'background-color': '#dbdbdb',

			});
		}
	});
});
$(function() {
	$(".agree").click(function() {
		event.preventDefault();
		if($(".agree").find("span").text() == 1) {
			$(".agree").css({
				"background": " url(images/noagree.png) 0.02rem center no-repeat"
			});
			$(".agree").css({
				"background-size": "0.28rem"
			});
			$(".agree").find("span").text(0);
		} else {
			$(".agree").css({
				"background": " url(images/agree.png) 0.02rem center no-repeat"
			});
			$(".agree").css({
				"background-size": "0.28rem"
			});
			$(".agree").find("span").text(1);

		}
	})

});
//获取url中的参数
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);


var count = 1;

function Count() {
	if(count <= 1) {
		sendCode();
		count++;
		return count;
	} else {
		$(".item2").show();
		sendCode2();
		return count;
	}
}

function sendCode() {

	var mobile = $(".mobile").val();
	if(mobile == "") {
		prompt();
		$("#prompt").text("请输入您的手机号")
	} else if(!/^1[34578]\d{9}$/.test(mobile)) {
		prompt();
		$("#prompt").text("请输入正确的手机号")
	} else {
		var url = api_site_domain + "/Api.aspx?action=Users&cmd=SendMobileVerifyCode&version=1.0&pl=3&typeId=0&cb_tag=?";
		$.getJSON(url, {
			mobile: mobile,

		}, function(msg) {
			console.log(msg);
			if(msg.code == 0) {

				$("#smscode_btn").val("还剩(60s)");
				var time = 60;
				$("#smscode_btn").attr("disabled", "disabled");
				$(".smscode_btn").css({
					"background-color": "#bdbdbd"
				});
				setTime = setInterval(function() {
					if(time <= 1) {
						clearInterval(setTime);
						$("#smscode_btn").val("重新获取");
						$("#smscode_btn").removeAttr("disabled");
						$(".smscode_btn").css({
							"background-color": "#FA4F47"
						});
						return;
					}
					time--;
					$("#smscode_btn").val("还剩(" + time + "s)");
				}, 1000);
				return setTime;
			} else {
				if(msg.message.indexOf("该手机号已存在，请直接登录") != "-1") {
					prompt();
					$("#prompt").text("该手机号已注册，请直接登录");
					setTimeout(function() {
						downLoad()
					}, 2000);

				} else {
					prompt();
					$("#prompt").text(msg.message)
				}
			}
		});
	}

}

function sendCode2() {
	var mobile = $(".mobile").val();
	var icode = $(".vcode").val();
	if(mobile == "") {
		prompt();
		$("#prompt").text("请输入您的手机号")

	} else if(!/^1[34578]\d{9}$/.test(mobile)) {
		prompt();
		$("#prompt").text("请输入正确的手机号")
	} else if(!icode) {
		prompt();
		$("#prompt").text("请输入图形验证码")
	} else {
		var url = api_site_domain + "/Api.aspx?action=Users&cmd=SendMobileVerifyCode&version=1.0&pl=3&typeId=0&cb_tag=?";
		$.getJSON(url, {
			mobile: mobile,
			iCode: icode,
		}, function(msg) {
			if(msg.code == 0) {

				$("#smscode_btn").val("还剩(60s)");
				var time = 60;
				$("#smscode_btn").attr("disabled", "disabled");
				$(".smscode_btn").css({
					"background-color": "#bdbdbd"
				});
				setTime = setInterval(function() {
					if(time <= 1) {
						clearInterval(setTime);

						$("#smscode_btn").val("重新获取");
						$("#smscode_btn").removeAttr("disabled");
						$(".smscode_btn").css({
							"background-color": "#FA4F47"
						});
						return;
					}
					time--;
					$("#smscode_btn").val("还剩(" + time + "s)");
				}, 1000);
				return setTime;
			} else {
				if(msg.message.indexOf("该手机号已存在，请直接登录") != "-1") {
					prompt();
					$("#prompt").text("该手机号已注册，请直接登录");
					setTimeout(function() {
						downLoad()
					}, 2000);
				} else {
					prompt();
					$("#prompt").text(msg.message)
				}
			}
		});
	}

}

function register() {

    var invitecode = $.getUrlParam("invitecode");
	var mobile = $(".mobile").val();
	var smscode = $(".smscode").val();
	var icode = $(".vcode").val();
	if(mobile == "") {
		prompt();
		$("#prompt").text("请输入您的手机号")
	} else if(!/^1[34578]\d{9}$/.test(mobile)) {
		prompt();
		$("#prompt").text("请输入正确的手机号")
	} else if(smscode == "") {
		prompt();
		$("#prompt").text("请输入短信验证码")
	} else if($(".agree span").text() != '1') {
		prompt();
		$("#prompt").text("需同意《借吧注册协议》，才能申请")
	} else {
		if(count == 2) {
			var url = api_site_domain + "/api.aspx?pl=3&version=1.0&action=Users&cmd=Regist2&cb_tag=?";
			$.getJSON(url, {
				mobile: mobile,
				vCode: smscode,
				inviteCode: invitecode,
			}, function(msg) {
				console.log(msg)
				if(msg.code == 0) {
					$("#smscode_btn").val("获取验证码");
					window.clearInterval(setTime);
					$("#smscode_btn").removeAttr("disabled");
					$(".smscode_btn").css({
						"background-color": "#FA4F47"
					});
					prompt();
					$("#prompt").text("领取成功，请下载app查看")
					setTimeout(function() {
						downLoad()
					}, 2500);
				} else {
					prompt();
					$("#prompt").text(msg.message)
				}
			})
		} else {

			if(icode == "") {
				prompt();
				$("#prompt").text("请输入图形二维码")
			} else {
				var url = api_site_domain + "/api.aspx?pl=3&version=1.0&action=Users&cmd=Regist&cb_tag=?";
				$.getJSON(url, {
					mobile: mobile,
					vCode: smscode,
					iCode: icode,
					inviteCode: invitecode,
				}, function(msg) {
					console.log(msg)
					if(msg.code == 0) {
						$("#smscode_btn").val("获取验证码");
						window.clearInterval(setTime);
						$("#smscode_btn").removeAttr("disabled");
						$(".smscode_btn").css({
							"background-color": "#FA4F47"
						});
						prompt();
						$("#prompt").text("领取成功，请下载app查看")
						setTimeout(function() {
							downLoad()
						}, 2500);
					} else {
						prompt();
						$("#prompt").text(msg.message)
					}
				})
			}

		}

	}
}

function downLoad() {
	window.location.href = "http://m.jieba.cc/down";
}