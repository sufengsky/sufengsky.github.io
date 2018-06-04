$(function() {
	var education = ['初中以下', '初中', '高中', '中专', '大专', '本科', '硕士', '博士'];
	var worktype = ['其他', "上班族", "企业主", "个体户", "学生党"];
	var mobileSelect2 = new MobileSelect({ //工作类型选择
		trigger: '.worktype',
		title: '工作类型',
		wheels: [{
			data: worktype
		}],
		position: [0],
		transitionEnd: function(indexArr, data) {

		},
		callback: function(indexArr, data) {

		}
	});
	var mobileSelect1 = new MobileSelect({ //学历选择
		trigger: '.education',
		title: '学历',
		wheels: [{
			data: education
		}],
		position: [0],
		transitionEnd: function(indexArr, data) {

		},
		callback: function(indexArr, data) {

		}
	});

	var area1 = new LArea(); //省市区选择
	area1.init({
		'trigger': '#address',
		'valueTo': '#value1',
		'keys': {
			id: 'id',
			name: 'name'
		},
		'type': 1,
		'data': LAreaData
	});
	area1.value = [0, 0, 0];
})
$(function() {
	var url = api + "/api.aspx?pl=3&version=1.0&action=UserAuthorize&cmd=GetAuthDetial&authkey=realNameAuth&cb_tag=?";
	$.getJSON(url, {
		atoken: aToken,
	}, function(msg) {
		console.log(msg);

		if(msg.code == 0) {

			if(msg.data.worktypetxt !== "") {
				$(".worktype").text(msg.data.worktypetxt);

			}
			if(msg.data.educationtxt !== "") {
				$(".education").text(msg.data.educationtxt);

			}
			if(msg.data.province !== "") {
				$("#address").text(msg.data.province + msg.data.city + msg.data.distinct);
			}
			if(msg.data.nowaddress !== "") {
				$(".address_insert").val(msg.data.nowaddress);
				$('.submit_btn').css({
					'background-color': '#F86936',
				});
			}

		} else {
			prompt();
			$("#prompt").text(msg.message)
		}
	})
})
$(function() { //input输入完 按钮变色
	$('input').on('input propertychange', function() {
		if(($.trim($('.address_insert').val()) !== "")) {
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

function subMit() {

	var worktypeV = $(".worktype").text();
	var educationV = $(".education").text();
	var distinctId = $("#value1").val().substring(14, 20);
	switch(worktypeV) {
		case '其他':
			worktypeV = 0;
			break;
		case '上班族':
			worktypeV = 1;
			break;
		case '企业主':
			worktypeV = 2;
			break;
		case '个体户':
			worktypeV = 3;
			break;
		case '学生党':
			worktypeV = 4;
			break;
		default:
			break;
	}
	switch(educationV) {
		case '初中以下':
			educationV = 1;
			break;
		case '初中':
			educationV = 2;
			break;
		case '高中':
			educationV = 3;
			break;
		case '中专':
			educationV = 4;
			break;
		case '大专':
			educationV = 5;
			break;
		case '本科':
			educationV = 6;
			break;
		case '硕士':
			educationV = 7;
			break;
		case '博士':
			educationV = 8;
			break;
		default:
			break;
	}

	if(worktypeV == "") {
		prompt();
		$("#prompt").text("请选择工作类型")
	} else if(educationV == "") {
		prompt();
		$("#prompt").text("请选择学历")
	} else if(distinctId == "") {
		prompt();
		$("#prompt").text("请选择现居地址")
	} else if($(".address_insert").val() == "") {
		prompt();
		$("#prompt").text("请填写具体地址")
	} else {

		var url = api + "/api.aspx?pl=3&version=1.0&action=UserAuthorize&cmd=AddUserInfoAuth171012&cb_tag=?";
		$.getJSON(url, {
			atoken: aToken,
			distinctId: distinctId,
			education: educationV,
			worktype: worktypeV,
			address: $(".address_insert").val()
		}, function(msg) {
			console.log(msg)
			if(msg.code == 0) {
				prompt();
				$("#prompt").text(msg.message);
				setTimeout(function() {
					window.location.href = "bankcard.html"
				}, 2000);
			} else {
				prompt();
				$("#prompt").text(msg.message)
			}

		});
	}
}