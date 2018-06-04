$(function() {
	if($(".status").length == 1) {
		$(".status").eq(0).css({
			"border-left": "none"
		})
	}
})

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2])
	} else {
		return null;
	}
}

function JK() {
	var ba = $("#BorrowAccount").text();
	ba = ba.substring(0, ba.length - 1);
	window.location.href = mapi + "/doc/explain?strtype=JKXY&ba=" + ba + "&bid=" + id;
}

function PT() {
	var ba = $("#BorrowAccount").text();
	ba = ba.substring(0, ba.length - 1);
	window.location.href = mapi + "/doc/explain?strtype=PTFWXY&ba=" + ba + "&bid=" + id;
}

function SQ() {
	var ba = $("#BorrowAccount").text();
	ba = ba.substring(0, ba.length - 1);
	window.location.href = mapi + "/doc/explain?strtype=SQKKWTS&ba=" + ba + "&bid=" + id;
}
var id = getQueryString("id");

var str = "";
var ba =
	$(function() {
		var url = api + "/api.aspx?action=Borrow&cmd=GetBorrowApplyDetail&pl=3&version=1.0&cb_tag=?";
		$.getJSON(url, {
			id: id,
			atoken: aToken
		}, function(msg) {
			console.log(msg);

			if(msg.code == 0) {
				for(i = 0; i < msg.data.Progresss.length; i++) {

					str += '<div class="status status' + (i + 1) + '">' +
						'<div class="step_icon"></div>' +
						'<p class="status_bt">' + msg.data.Progresss[i].Title + '<span>' + msg.data.Progresss[i].CTime + '</span></p>' +
						'<p class="status_text">' + msg.data.Progresss[i].Descript1 + '</p>' +
						'</div>'
				}
				$(".status_con").html(str);
				//		$("#AreadyRepayAccount").text(msg.data.AreadyRepayAccount);
				$("#BankCard").text(msg.data.BankCard);
				$("#BorrowAccount").text(msg.data.BorrowAccount);
				//	$("#CTime").text(msg.data.CTime);
				//		$("#DiscountAccount").text(msg.data.DiscountAccount);
				$("#IntrestAccount").text(msg.data.IntrestAccount);
				$("#LastRepayDate").text(msg.data.LastRepayDate);
				$("#DayInterestRate").text(msg.data.DayInterestRate);
				//		$("#LoanAccount").text(msg.data.LoanAccount);
				//		$("#RealRepayDate").text(msg.data.RealRepayDate);
				$("#SpanDays").text(msg.data.SpanDays + '(' + msg.data.CTime + '至' + msg.data.LastRepayDate + ')');
				$("#ToRepayAccount").text(msg.data.ToRepayAccount);
				$("#RepaidBenjin").text(msg.data.RepaidBenjin);
				$("#RepaidInterest").text(msg.data.RepaidInterest);
				$("#RepaidFaxi").text(msg.data.RepaidFaxi);
				$("#TotalRepayAccount").text(msg.data.TotalRepayAccount);
				//		$("#TotalServiceFee").text(msg.data.TotalServiceFee);
				$(".ToRepayAccount").text('￥' + msg.data.ToRepayAccount);
				$(".BankCard").text(msg.data.BankCard);
				$(".amount_text span").text(msg.data.ToRepayAccount)
				amount = msg.data.ToRepayAccount.substring(0, msg.data.ToRepayAccount.length - 1);

				if(msg.data.CanApplyRepay == 0) {
					$(".repay_part").hide();
					$(".empty").hide();
				}
				var ToRepayAccount = msg.data.ToRepayAccount;
				ToRepayAccount = ToRepayAccount.substring(0, ToRepayAccount.length - 1)
				if(Number(ToRepayAccount) <= 300) {
					$(".change_btn").hide();
				}
				return amount;
			} else {
				$("#prompt").text(msg.data.message);
				prompt();
			}
		})

	})

function Protocol() {
	window.location.href = mapi + "/doc/explain?strtype=jkxgxy";
}

var amount = "";
$(function() {
	$(".fee").click(function() {
		var ba = $("#BorrowAccount").text();
		ba = ba.substring(0, ba.length - 1);
		var url = api + "/api.aspx?action=Borrowa&cmd=GetFee&pl=3&version=1.0&cb_tag=?";
		$.getJSON(url, {
			ba: ba,
			atoken: aToken
		}, function(msg) {
			console.log(msg);
			if(msg.code == 0) {
				$("#AuthFee").text(msg.data.AuthFee);
				$("#PlatFee").text(msg.data.PlatFee);
				$("#RiskFee").text(msg.data.RiskFee);
				$("#RiskPrepareFee").text(msg.data.RiskPrepareFee);
				$("#Total").text(msg.data.TotalServiceFee);
				$(".layer").show();
				$(".fee_tan").show();
			}
		});

	})

	$(".know_btn").click(function() {
		$(".layer").hide();
		$(".fee_tan").hide();
	})
})

$(function() { //部分还款
	$(".change_btn").click(function() {
		$(".layer").show();
		$(".part_tan").show();
	})
	$(".part_closebtn").click(function() {
		$(".layer").hide();
		$(".part_tan").hide();
	})
	$(".cancel_btn").click(function() {
		$(".layer").hide();
		$(".part_tan").hide();
	})
	$(".add").click(function() {
		var repayAmount = $(".amount_text span").text();

		repayAmount = repayAmount.substring(0, repayAmount.length - 1);
		console.log(repayAmount);
		if(Number($(".amount").text()) >= Number(repayAmount)) {
			$(this).addClass("unadd");
			$(".amount").text(repayAmount);
		} else {

			$(this).removeClass("unadd");
			$(".sub").removeClass("unsub");

			$(".amount").text((Number($(".amount").text()) + 100).toFixed(2));
//			if(Number($(".amount").text()) >= Number(repayAmount)) {
//				$(this).addClass("unadd");
//				$(".amount").text(repayAmount);
//			}
			if(Number($(".amount").text())+Number(100) >= Number(repayAmount)) {
				$(this).addClass("unadd");
				$(".amount").text(repayAmount);
			}
		}
	});
	$(".sub").click(function() {
		var repayAmount = $(".amount_text span").text();

		repayAmount = repayAmount.substring(0, repayAmount.length - 1);
		console.log(repayAmount);

		if(Number($(".amount").text()) <= 200) {
			$(this).addClass("unsub");
		//	$(".amount").text(200.00);
		} else {
			$(this).removeClass("unsub");
			
			
			if(Number($(".amount").text()) < Number(repayAmount)) {
				$(".add").removeClass("unadd");
			}
			if(Number($(".amount").text())-Number(100) ==200) {
				$(this).addClass("unsub");

			}
			if(Number($(".amount").text()) == Number(repayAmount)) {
				$(".add").removeClass("unadd");
				$(".amount").text(parseInt((Number($(".amount").text()) - 100)).toFixed(2));
			}else{
				$(".amount").text((Number($(".amount").text()) - 100).toFixed(2));
			}
		};
		
	})

})

$(function() {
	$(".pay_btn").click(function() {
		var repayAmount = $(".amount_text span").text();
		repayAmount = repayAmount.substring(0, repayAmount.length - 1);
		var amountP = $(".amount").text();
		if(amountP == repayAmount) {
			window.location.href = "repayment.html?type=1&couponId=0&borrowId=" + id + "&amount=" + amount + "&money=0";
		} else {
			window.location.href = "repayment.html?type=1&couponId=0&borrowId=" + id + "&amount=" + amountP + "&money=" + amountP;
		}

	})
})
$(function() {
	$(".repay_btn").click(function() {
		window.location.href = "repayment.html?type=1&couponId=0&borrowId=" + id + "&amount=" + amount + "&money=0";
	})
})