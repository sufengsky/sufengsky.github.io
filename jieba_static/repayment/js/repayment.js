function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2])
	} else {
		return null;
	}
}
var str = "";
$(function() {
	$(".bo_right").click(function() {

		$(".layer").show();
		$(".prompt_tan").hide();
		$(".tan").addClass("tan_ani");
	})
	$(".tan_close").click(function() {
		$(".tan").removeClass("tan_ani");
		$(".layer").hide();

	})
	$(".prompt_text").click(function() {
		$(".layer").show();
		$(".tan").removeClass("tan_ani");
		$(".prompt_tan").show();
	});
	$(".know").click(function() {
		$(".layer").hide();
		$(".prompt_tan").hide();
	})

})

$(function() { //获取银行卡列表
	var url = api + "/api.aspx?action=UserCenter&cmd=GetUserBankCardList&pl=3&version=1.0&cb_tag=?";

	$.get(url, {
		atoken: aToken
	}, function(msg) {
		console.log(msg);
		if(msg.code == 0) {
			for(i = 0; i < msg.data.list.length; i++) {
				str += '<div class="bank">' +
					'<div class="item_left bank_left">' +
					'<img src="' + msg.data.list[i].BankImgUrl + '" />' +
					'<p>' + msg.data.list[i].BankShortName + '</p>' +
					'<span>' + msg.data.list[i].ID + '</sapn>' +
					'</div>' +
					'<div class="item_right bank_right">' +
					'<div class="select_btn"></div>' +
					'</div>' +
					'</div>'
			}
			$(".bank_part").html(str);
			$('.bp_left img').attr("src", msg.data.list[0].BankImgUrl);
			$('.bp_left p').text(msg.data.list[0].BankShortName);
			$('.bp_left span').text(msg.data.list[0].ID);
			$(".bank").eq(0).find(".select_btn").addClass("select");

		};
	})

})

var type = getQueryString("type");
var couponId = getQueryString("couponId");
var borrowId = getQueryString("borrowId");
var id = getQueryString("borrowId");
var cid = "";
var amount = getQueryString("amount");
var money = Number(getQueryString("money"));
var amountE = "";
$(function() { //获取页面数据
	var fee = "";
	var url = mapi + "/EBJWebPay/Index?&pl=3&version=1.0&type=" + type + "&money=" + money + "&couponId=" + couponId + "&borrowId=" + borrowId + "&atoken=" + aToken;
	$.get(url, function(msg) {
		var data = $.parseJSON(msg);
		console.log(data);
		if(data.code == 0) {
			$(".main_amount span").text(amount);
			amounty = amount;
			amountE = data.data.amount;
			$(".pay_btn span").text(amount);
			$(".pt_amount").text(data.data.fee + "元");
			$(".ptan_amount").text(data.data.fee + "元");
			if(data.data.issupport != 1) {
				$(".alipay").hide();
			};
			if(data.data.wxsupport != 1) {
				$(".wxpay").hide();
			}
			return amountE, amounty;
		} else {

		}
	})
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		$(".alipay").hide();
		$(".pt_text").text("微信还款手续费：");
		$(".ptan_text").text("使用微信还款，微信将收取手续费")
	} else {
		$(".wxpay").hide();
		$(".pt_text").text("支付宝还款手续费：");
		$(".ptan_text").text("使用支付宝还款，支付宝将收取手续费")
	}
	if(money != 0) {
		$(".quan_usable").hide();
	} else {
		$(".quan_usable").show();
	}
})
$(function() { //选择银行卡
	$(".bank_part").on("click", ".select_btn", function() {
		$(".select_btn").removeClass("select");
		$(this).addClass("select");
		$(".bp_left img").attr("src", $(this).parent().siblings().find("img").attr("src"));
		$(".bp_left p").text($(this).parent().siblings().find("p").text());
		$(".bp_left span").text($(this).parent().siblings().find("span").text());
		$(".selectp").removeClass("select");
		$(".select_bank").addClass("select");
		$(".pay_btn").html("银行卡支付" + "<span>" + $(".pay_btn span").text() + "</span>元");
		$(".layer").hide();
		$(".tan").removeClass("tan_ani");
	})
})
$(function() { //选择支付方式
	$(".select_bank").click(function() {
		$(".selectp").removeClass("select");
		$(".selectp").addClass("noselect");
		$(this).addClass("select");
		var url = mapi + "/EBJWebPay/Index?&pl=3&version=1.0&type=" + type + "&money=" + money + "&couponId=" + couponId + "&borrowId=" + borrowId + "&atoken=" + aToken;
		$.get(url, function(msg) {
			var data = $.parseJSON(msg);
			console.log(data);
			if(data.code == 0) {
				$(".pay_btn").html("银行卡支付<span>" + (Number(data.data.amount) - Number(data.data.fee)).toFixed(2) + "</span>元");
			} else {
				$("#prompt").text(data.data.message);
				prompt();
			}
		})
	});
	$(".select_alipay ").click(function() {
		if(Number($(".main_amount span").text() == 0)) {
			$("#prompt").text("暂不支持该支付方式");
			prompt();
		} else {
			$(".selectp").removeClass("select");
			$(".selectp").addClass("noselect");
			$(this).addClass("select");
			var url = mapi + "/EBJWebPay/Index?&pl=3&version=1.0&type=" + type + "&money=" + money + "&couponId=" + couponId + "&borrowId=" + borrowId + "&atoken=" + aToken;
			$.get(url, function(msg) {
				var data = $.parseJSON(msg);
				console.log(data);
				if(data.code == 0) {
					$(".pay_btn").html("支付宝支付<span>" + data.data.amount + "</span>元");
				} else {
					$("#prompt").text(data.data.message);
					prompt();
				}
			})
		}

	})
	$(".select_wxpay ").click(function() {
		if(Number($(".main_amount span").text() == 0)) {
			$("#prompt").text("暂不支持该支付方式");
			prompt();
		} else {
			$(".selectp").removeClass("select");
			$(".selectp").addClass("noselect");
			$(this).addClass("select");
			var url = mapi + "/EBJWebPay/Index?&pl=3&version=1.0&type=" + type + "&money=" + money + "&couponId=" + couponId + "&borrowId=" + borrowId + "&atoken=" + aToken;
			$.get(url, function(msg) {
				var data = $.parseJSON(msg);
				console.log(data);
				if(data.code == 0) {
					$(".pay_btn").html("微信支付<span>" + data.data.amount + "</span>元");
				} else {
					$("#prompt").text(data.data.message);
					prompt();
				}
			})
		}

	})

})
$(function() {
	$(".pay_btn").click(function() { //支付
		var bcid = $(".bp_left span").text();
		cid = $(".quan_cid").text();
		if($(".pay_btn").text().indexOf("支付宝") != "-1") {
			if($(".pay_btn span").text() != "0.00") {
				window.location.href = mapi + "/EBJWebPay/ApplyRepayAli?borrowId=" + id + "&money=" + money + "&cid=" + cid;
			} else {
				$("#prompt").text("暂不支持该支付方式");
				prompt();
			}

		} else if($(".pay_btn").text().indexOf("微信") != "-1") {
			if($(".pay_btn span").text() != "0.00") {
				window.location.href = mapi + "/ebjwebpay/ApplyRepayWebchat?borrowId=" + id + "&money=" + money + "&cid=" + cid;
			} else {
				$("#prompt").text("暂不支持该支付方式");
				prompt();
			}

		} else {
			var url = api + "/api.aspx?action=Borrow&cmd=SubmitApplyRepay&pl=3&version=1.0&cb_tag=?";
			$.getJSON(url, {
				id: id,
				bcid: bcid,
				money: money,
				cid: cid,
				atoken: aToken
			}, function(msg) {
				console.log(msg);
				if(msg.code == "10000") {

					$("#prompt").text("正在处理中");
					prompt();
					setTimeout(function() {
						window.location.href = mapi;
					}, 2000);
				} else {
					$("#prompt").text(msg.data.message);
					prompt();
				}
			});
		}

	})
})
var amounty = "";
$(function() { //优惠券
	
	$(".quan_cancel").click(function() {
		$(".quan_part").hide();
		$(".layer").hide();
	})
	$(".quan_list").on("click", ".quan", function() {
		$(".quan").find(".select_btn").removeClass("select").addClass("noselect");
		$(this).find(".select_btn").addClass("select");
		$(".nouse_btn").removeClass("select").addClass("noselect");
		$(".qu_right").text("-" + $(this).find(".quan_amount span").text());
		$(".quan_cid").text($(this).find(".quan_msg span").text());
		couponId = $(this).find(".quan_msg span").text();
		var url = mapi + "/EBJWebPay/Index?&pl=3&version=1.0&type=" + type + "&couponId=" + couponId + "&borrowId=" + borrowId + "&atoken=" + aToken;
		$.get(url, function(msg) {
			var data = $.parseJSON(msg);
			console.log(data);
			if(data.code == 0) {
				$(".main_amount span").text((Number(data.data.amount) - Number(data.data.fee)).toFixed(2));

				$(".pt_amount").text(data.data.fee + "元");
				$(".ptan_amount").text(data.data.fee + "元");
				if($(".select_alipay").hasClass("select")) {
					$(".pay_btn span").text(data.data.amount);
				} else {
					$(".pay_btn span").text((Number(data.data.amount) - Number(data.data.fee)).toFixed(2));
				}

			} else {

			}
		})
		$(".quan_part").hide();
		$(".layer").hide();
	})
	$(".no_use").click(function() {
		couponId = getQueryString("couponId");
		$(".quan").find(".select_btn").removeClass("select").addClass("noselect");
		$(".nouse_btn").removeClass("noselect").addClass("select");
		$(".qu_right").html("<span>" + counts + "</span>张优惠券");
		$(".quan_part").hide();
		$(".layer").hide();
		var url = mapi + "/EBJWebPay/Index?&pl=3&version=1.0&type=" + type + "&money=" + money + "&couponId=" + couponId + "&borrowId=" + borrowId + "&atoken=" + aToken;
		$.get(url, function(msg) {
			var data = $.parseJSON(msg);
			console.log(data);
			if(data.code == 0) {
				$(".main_amount span").text(amount);
				
				$(".pt_amount").text(data.data.fee + "元");
				$(".ptan_amount").text(data.data.fee + "元");
				if($(".select_alipay").hasClass("select")) {
					$(".pay_btn span").text(data.data.amount);
				} else {
					$(".pay_btn span").text((Number(data.data.amount) - Number(data.data.fee)).toFixed(2));
				}
			} else {
                    $("#prompt").text(data.data.message);
					prompt();
			}
		})
	})
})
var strq = "";
var counts = ""
$(function() { //获取优惠券列表
	var url = api + "/api.aspx?action=Borrow&cmd=GetApplyRepayCoupons&pl=3&version=1.0&cb_tag=?";
	$.get(url, {
		atoken: aToken
	}, function(msg) {
		console.log(msg);
		if(msg.code == 0) {
			counts = msg.data.Coupons.length;
			$(".qu_right span").text(counts);
			for(i = 0; i < msg.data.Coupons.length; i++) {
				strq += '<div class="quan">' +
					'<div class="quan_amount">￥<span>' + msg.data.Coupons[i].Amount + '</span></div>' +
					'<div class="quan_msg">' +
					'<p class="msg_bt">' + msg.data.Coupons[i].Title + '</p>' +
					'<p class="msg_condition">使用条件：' + msg.data.Coupons[i].Remark + '</p>' +
					'<p class="msg_deadline">有效期：' + msg.data.Coupons[i].AvaliableDate + '</p>' +
					'<span>' + msg.data.Coupons[i].ID + '</span>' +
					'</div>' +
					'<div class="select_btn noselect"></div>' +
					'</div>'
			}
			$(".quan_list").html(strq);
			return counts
		}
	})
})
$(function() {
	$(".qu_right").click(function() {
		$(".layer").show();
		$(".quan_part").show();
	})

})