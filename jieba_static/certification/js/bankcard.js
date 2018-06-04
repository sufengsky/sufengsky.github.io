$(function() {

	var bank = ['工商银行', '农业银行', '中国银行', '建设银行', '交通银行', '招商银行', '光大银行', '华夏银行', '民生银行', '浦发银行', '广发银行', '中信银行', '北京银行', '平安银行', '上海银行', '杭州银行', ''];
	var bankhide = ['其他', '上班族', '企业主', '个体户', '学生党'];

	var mobileSelect1 = new MobileSelect({ //开户银行选择
		trigger: '.bank',
		title: '开户银行',
		wheels: [{
			data: bank
		}],
		position: [0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
		transitionEnd: function(indexArr, data) {

		},
		callback: function(indexArr, data) {

		}
	});
	var mobileSelect2 = new MobileSelect({ //兼容
		trigger: '.bankhide',
		title: '银行隐藏',
		wheels: [{
			data: bankhide
		}],
		position: [0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
		transitionEnd: function(indexArr, data) {
			console.log(data);
		},
		callback: function(indexArr, data) {
			console.log(data);
		}
	});

	$(function() { //input输入完 按钮变色
		$('input').on('input propertychange', function() {
			if(($.trim($('.item_insert1').val()) !== "") && ($.trim($('.item_insert2').val()) !== "")) {
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

});
$(function() {
	var url = api+"/api.aspx?action=UserAuthorize&cmd=GetAuthDetial&authkey=bankCardIsAdd&pl=3&version=1.0&cb_tag=?";
	$.getJSON(url, {
		atoken: aToken,
	}, function(msg) {
       console.log(msg);
		if(msg.code == 0) {
			if(msg.data.bankid) { 
				$("#account").val(msg.data.account);
				$(".bank").text(msg.data.bankname);
				$("#reservephone").val(msg.data.reservephone);
				$('.submit_btn').css({
					'background-color': '#F86936',
				});
				$('.submit_btn').text("重新绑卡");
			}else{
				
			}
		} else {
            prompt();
			$("#prompt").text(msg.message)
		}
	})
})
$(function() {
	$(".submit_btn").click(function() {
		var bankV = $(".bank").text();
		switch(bankV) {
			case '工商银行':
				bankV = 1;
				break;
			case '农业银行':
				bankV = 2;
				break;
			case '中国银行':
				bankV = 3;
				break;
			case '建设银行':
				bankV = 4;
				break;
			case '交通银行':
				bankV = 5;
				break;
			case '招商银行':
				bankV = 6;
				break;
			case '光大银行':
				bankV = 7;
				break;
			case '华夏银行':
				bankV = 8;
				break;
			case '民生银行':
				bankV = 9;
				break;
			case '浦发银行':
				bankV = 10;
				break;
			case '广发银行':
				bankV = 11;
				break;
			case '中信银行':
				bankV = 12;
				break;
			case '北京银行':
				bankV = 13;
				break;
			case '平安银行':
				bankV = 14;
				break;
			case '邮政储蓄':
				bankV = 15;
				break;
			case '上海银行':
				bankV = 16;
				break;
			case '兴业银行':
				bankV = 17;
				break;
			case '杭州银行':
				bankV = 22;
				break;
			case '浙商银行':
				bankV = 24;
				break;
			case '江苏银行':
				bankV = 27;
				break;

			default:
				break;
		};
		if($("#account").val() == "") {
			prompt();
			$("#prompt").text("请输入您的银行卡号")
		} else if(bankV == "") {
			prompt();
			$("#prompt").text("请选择开户银行")
		} else if($("#reservephone").val() == "") {
			prompt();
			$("#prompt").text("请输入银行预留手机号")
		} else {
			var url = api+"/api.aspx?pl=3&version=1.0&action=UserAuthorize&cmd=AddBankCardAuthorize&cb_tag=?";
			$.getJSON(url, {
				atoken: aToken,
				bankname: bankV,
				account: $("#account").val(),
				reservephone: $("#reservephone").val(),
			}, function(msg) {
				console.log(msg)
				if(msg.code == 0) {
					prompt();
					$("#prompt").text(msg.message);
					setTimeout(function() {
						window.location.href = "contactmaninfo.html"
					}, 2000);
				} else {
					prompt();
					$("#prompt").text(msg.message);
				}

			});
		}

	})
})