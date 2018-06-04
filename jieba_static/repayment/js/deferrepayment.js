function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2])
	} else {
		return null;
	}
}
var id = getQueryString("id");
var cid = "";
$(function() {
	var url = api + "/api.aspx?action=Borrow&cmd=GetApplyDelayInfo&pl=3&version=1.0&cb_tag=?";
	$.get(url, {
		id: id,
		atoken: aToken
	}, function(msg) {
		console.log(msg);
		if(msg.code == 0) {
			$(".quan_right").text(msg.data.CouponInfo);
			$("#DelayDays").text(msg.data.DelayDays);
			$("#OverDueFee").text(msg.data.OverDueFee);
			$("#Poundage").text(msg.data.Poundage);
			$("#ServiceFee").text(msg.data.ServiceFee);
			$("#ToRepayAccount").text(msg.data.ToRepayAccount);
			$("#Total").text(msg.data.Total);
		}
	})
})
var str="";
$(function() {
		var url = api + "/api.aspx?action=Borrow&cmd=GetApplyDelayRepayCoupons&pl=3&version=1.0&cb_tag=?";
		$.get(url, {
			atoken: aToken
		}, function(msg) {
			console.log(msg);
			if(msg.code == 0) {
				console.log(msg.data.Coupons=="");
				if(msg.data.Coupons!==""){
					for(i=0;i<msg.data.Coupons.length;i++){
						str+='<div class="quan">'+
						   '<div class="quan_amount">￥<span>'+msg.data.Coupons[i].Amount+'</span></div>'+
						'<div class="quan_msg">'+
						'<p class="msg_bt">'+msg.data.Coupons[i].Title+'</p>'+
						'<p class="msg_condition">使用条件：'+msg.data.Coupons[i].Remark+'</p>'+
                        '<p class="msg_deadline">有效期：'+msg.data.Coupons[i].AvaliableDate+'</p>'+
						'<span>'+msg.data.Coupons[i].ID+'</span>'+
							'</div>'+
							'<div class="select_btn noselect"></div>'+
						'</div>'
					}
					$(".quan_list").html(str);
				}else{
					
				}
				
			}
		})	
})

$(function() {
	$(".quan_right").click(function() {
		var url = api + "/api.aspx?action=Borrow&cmd=GetApplyDelayRepayCoupons&pl=3&version=1.0&cb_tag=?";
		$.get(url, {
			atoken: aToken
		}, function(msg) {
			console.log(msg);
			if(msg.code == 0) {
				console.log(msg.data.Coupons=="");
				if(msg.data.Coupons==""){
					$("#prompt").text("暂无可使用优惠券");
						prompt();
				}else{
					$(".layer").show();
				}
				
			}
		})
	})
	
})
var cid=0;
$(function() {
	$(".quan_cancel").click(function() {
		$(".layer").hide();
	})
	$(".quan_list").on("click",".quan",function() {		
		$(".quan").find(".select_btn").removeClass("select").addClass("noselect");
		$(this).find(".select_btn").addClass("select");
		$(".nouse_btn").removeClass("select").addClass("noselect");
		cid=$(".select").siblings(".quan_msg").find("span").text();
		$(".layer").hide();
		$(".quan_right").text($(".select").siblings(".quan_msg").find(".msg_bt").text());
		return cid;
	})
	$(".no_use").click(function() {
		$(".quan").find(".select_btn").removeClass("select").addClass("noselect");
		$(".nouse_btn").removeClass("noselect").addClass("select");
		
		$(".layer").hide();
		$(".quan_right").text("未使用券")
		cid=0;
		return cid;
	})
})

$(function() {
	$(".pay_btn").click(function() {
		window.location.href = "repayment.html?type=0&couponId=" + cid+"&borrowId=" + id;
	})
})