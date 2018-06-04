$(function() {
	var relation1 = ['父亲', '母亲', '儿子', '女儿', '兄弟', '姐妹', '配偶'];
	var relation2 = ['同学', '亲戚', '同事', '朋友', '其他'];

	var mobileSelect1 = new MobileSelect({ //关系选择1
		trigger: '.relation1',
		title: '与本人关系',
		wheels: [{
			data: relation1
		}],
		position: [0],
		transitionEnd: function(indexArr, data) {
			console.log(data);
		},
		callback: function(indexArr, data) {
			console.log(data);
		}
	});
	var mobileSelect2 = new MobileSelect({ //关系选择2
		trigger: '.relation2',
		title: '与本人关系',
		wheels: [{
			data: relation2
		}],
		position: [0],
		transitionEnd: function(indexArr, data) {
			console.log(data);
		},
		callback: function(indexArr, data) {
			console.log(data);
		}
	});
})

$(function() { //input输入完 按钮变色
	$('input').on('input propertychange', function() {
		if(($.trim($('.item_insert1').val()) !== "") && ($.trim($('.item_insert2').val()) !== "")&&($.trim($('.item_insert3').val()) !== "") && ($.trim($('.item_insert4').val()) !== "")) {
			$('.submit_btn').css({
				'background-color': '#F86936',

			});
		} else {
			$('.submit_btn').css({
				'background-color': '#ffb196',

			});
		}
	});
});
$(function() {
	var url = api+"/api.aspx?action=UserAuthorize&cmd=GetAuthDetial&authkey=emergencyContactAuth&pl=3&version=1.0&cb_tag=?";
	$.getJSON(url, {
		atoken: aToken,
	}, function(msg) {
		console.log(msg);
		if(msg.code == 0) {
			if(msg.data.familyrelationtxt !== "") {
				$(".relation1").text(msg.data.familyrelationtxt);
				
			}
			if(msg.data.familyname !== "") {
				$("#familyname").val(msg.data.familyname);
				
			}
			if(msg.data.familymobile !== "") {
				$("#familymobile").val(msg.data.familymobile);
			}
			if(msg.data.otherrelationtxt !== "") {
				$(".relation2").text(msg.data.otherrelationtxt);
				
			}
			if(msg.data.othername !== "") {
				$("#othername").val(msg.data.othername);
				
			}
			if(msg.data.othermobile !== "") {
				$("#othermobile").val(msg.data.othermobile);
			}
			
		} else {
			prompt();
			$("#prompt").text(msg.message)
		}
	})
})
$(function() {
	$(".submit_btn").click(function() {
		var familyRelation = $(".relation1").text();
		var otherRelation = $(".relation2").text();
		var familyName= $("#familyname").val();
		var otherName= $("#othername").val();
		var familyMobile= $("#familymobile").val();
		var otherMobile= $("#othermobile").val();
		switch(familyRelation) {
			case '父亲':
				familyRelation = 1;
				break;
			case '母亲':
				familyRelation = 2;
				break;
			case '儿子':
				familyRelation = 3;
				break;
			case '女儿':
				familyRelation = 4;
				break;
			case '兄弟':
				familyRelation = 5;
				break;
			case '姐妹':
				familyRelation = 6;
				break;
			case '配偶':
				familyRelation = 7;
				break;

			default:
				break;
		};   
		var otherRelation = $(".relation2").text();
		switch(otherRelation) {
			case '同学':
				otherRelation = 1;
				break;
			case '亲戚':
				otherRelation = 2;
				break;
			case '同事':
				otherRelation = 3;
				break;
			case '朋友':
				otherRelation = 4;
				break;
			case '其他':
				otherRelationn = 5;
				break;
			default:
				break;
		}
		if( familyRelation == "") {
			prompt();
			$("#prompt").text("请选择与本人的关系")
		} else if(familyName == "") {
			prompt();
			$("#prompt").text("请填写联系人姓名")
		} else if( /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/ .test(familyName) == false) {
			prompt();
			$("#prompt").text("请输入正确的姓名")
		}else if(familyMobile == "") {
			prompt();
			$("#prompt").text("请输入联系人手机号")
		} else if(/^1[34578]\d{9}$/.test(familyMobile) == false) {
			prompt();
			$("#prompt").text("请输入正确的手机号")
		}else if( otherRelation == "") {
			prompt();
			$("#prompt").text("请选择与本人的关系")
		} else if(otherName == "") {
			prompt();
			$("#prompt").text("请填写联系人姓名") 
		} else if(/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/.test(otherName) == false) {
			prompt();
			$("#prompt").text("请输入正确的姓名")
		}else if(otherMobile == "") {
			prompt();
			$("#prompt").text("请输入联系人手机号")
		}else if(/^1[34578]\d{9}$/.test(otherMobile) == false) {
			prompt();
			$("#prompt").text("请输入正确的手机号")
		}else{
			
			var url = api+"/api.aspx?pl=3&version=1.0&action=UserAuthorize&cmd=AddEmergencyContactAuthAuthorize&cb_tag=?";
			$.getJSON(url, {
				atoken: aToken,
				familyName: familyName,
				familyRelation: familyRelation,
				familyMobile: familyMobile,
				otherName: otherName,
				otherRelation: otherRelation,
				otherMobile: otherMobile,
			}, function(msg) {
				console.log(msg)
				if(msg.code == 0) {
                    prompt();
					$("#prompt").text(msg.message);
					setTimeout(function() {
						window.location.href = "http://m.jieba.cc/credit/operatorauth?pl=3&atoken="+aToken+".html"
					}, 2000);
				} else {
					prompt();
					$("#prompt").text(msg.message)
				}

			});
		}
	})
})