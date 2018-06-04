//查看浏览器是否支持
function isUploadSupported() {
	if(navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
		return false;
	}
	var elem = document.createElement('input');
	elem.type = 'file';
	return !elem.disabled;
};
//绑定事件
function photoT1(){
	$("#file_front").click();
}
function photoT2(){
	$("#file_back").click();
}
function photoT3(){
	$("#take_input").click();
}
$(function(){
	var url = api+"/api.aspx?pl=3&version=1.0&action=UserAuthorize&cmd=GetAuthDetial&authkey=realNameAuth&cb_tag=?";
	$.getJSON(url, {
		atoken: aToken,
	}, function(msg) {
		console.log(msg);

		if(msg.code == 0) {
			
			if(msg.data.idcardimg1!==""){			
				$("#photo_take1").css({"background":"url("+msg.data.idcardimg1+") center center no-repeat"});
				$("#photo_take1").css({"background-size":"100%"});
				$("#photo_take1").removeAttr("onclick");
				$(".photoed").show();
			}
			if(msg.data.idcardimg2!==""){			
				$("#photo_take2").css({"background":"url("+msg.data.idcardimg2+") center center no-repeat"});
				$("#photo_take2").css({"background-size":"100%"});
				$("#photo_take2").removeAttr("onclick");
			}
			if(msg.data.realname!==""){			
				$("#txtname").text(msg.data.realname);
			}
			if(msg.data.idcard!==""){			
				$("#txtidcard").text(msg.data.idcard);
			}
			if(msg.data.faceimgurl!==""){			
				$(".item_text").text("已认证")
				$("#photo_take3").attr("style", "background: url(" + msg.data.faceimgurl + ") center center no-repeat;background-size: 0.98rem;");
				$("#photo_take3").hide();
				$(".take").addClass("com_active");
				$(".take").removeAttr('onclick');
				$(".item_text").removeAttr('onclick');
			}
			if(msg.data.education!==""){			
				$(".submit_btn").hide();
				$(".back_btn").show();
			}
		}else{
			prompt();
			$("#prompt").text(msg.message)
		}
	})
})
$(function() {

	
	//初始化 身份证上传控件
	if(window.File && window.FileReader && window.FormData) {
		var $inputField = $('#file_front');
		var $backinputField = $('#file_back');

		$inputField.on('change', function(e) {
			var file = e.target.files[0];
			if(file) {

				if(/^image\//i.test(file.type)) {
					readFile(file);
				} else {
					layer.open({
						content: '无法识别的图片!',
						skin: 'msg',
						time: 2

					});
				}
			}
		});

		$backinputField.on('change', function(e) {
			var file = e.target.files[0];

			if(file) {
				if(/^image\//i.test(file.type)) {
					readFile(file);
				} else {
					layer.open({
						content: '无法识别的图片!',
						skin: 'msg',
						time: 2

					});
				}
			}
		});

	} else {
		layer.open({
			content: '不支持的浏览器!',
			skin: 'msg',
			time: 2

		});
	}

})

//readfile
function readFile(file) {
	layer.open({
		content: '认证中',
		skin: 'msg',
		time: 2

	});

	var reader = new FileReader();

	reader.onloadend = function() {
		processFile(reader.result, file.type);
	}

	reader.onerror = function() {
		layer.open({
			content: '读取图片出错!',
			skin: 'msg',
			time: 2

		});
	}

	reader.readAsDataURL(file);
}

//processFile
function processFile(dataURL, fileType) {
	var maxWidth = 800;
	var maxHeight = 800;

	var image = new Image();
	image.src = dataURL;

	image.onload = function() {
		var width = image.width;
		var height = image.height;
		var shouldResize = (width > maxWidth) || (height > maxHeight);

		var newWidth;
		var newHeight;

		if(width > height) {
			newHeight = height * (maxWidth / width);
			newWidth = maxWidth;
		} else {
			newWidth = width * (maxHeight / height);
			newHeight = maxHeight;
		}

		var canvas = document.createElement('canvas');

		canvas.width = newWidth;
		canvas.height = newHeight;

		var context = canvas.getContext('2d');

		context.drawImage(this, 0, 0, newWidth, newHeight);

		dataURL = canvas.toDataURL(fileType);

		var re = /data:image\/\w+;base64,/g;
		var imagebase64 = dataURL.replace(re, "");
		$.ajax({
			url: "/Certification/PersonalImage",
			timeout: 1000 * 10,
			type: 'post',
			dataTypeString: 'json',
			data: {
				base64str: imagebase64
			},
			success: function(data) {
				if(data != "0") {
					layer.open({
						content: '认证成功!',
						skin: 'msg',
						time: 2,
						success: function() {
							//返回成功的信息
							if(data.code == 0) {
								var backurl = "background: url(" + data.data.url + ") center center no-repeat;background-size:1.33rem"
								//如果是正面的身份证 则把名字跟身份证号 写入
								if(data.data.idcard_type == 1) {

									$("#txtname").text(data.data.name);
									$("#txtidcard").text(data.data.citizen_id);
									$("#photo_take1").attr("style", backurl);
									$(".photo_take1").removeAttr('onclick');
								} else {
									$("#photo_take2").attr("style", backurl);
									$(".photo_take2").removeAttr('onclick');
								}
							} else {
								layer.open({
									content: data.message,
									skin: 'msg',
									time: 2

								});

							}
						}
					});
				} else {
					layer.open({
						content: data.message,
						skin: 'msg',
						time: 2

					});
				}

			},
			complete: function(XMLHttpRequest, status) {
				if(status == 'timeout') { //超时,status还有success,error等值的情况
					//axTimeoutTest.abort();

					layer.open({
						content: '验证超时!',
						skin: 'msg',
						time: 2

					});

				}
			}
		});

	};

	image.onerror = function() {
		layer.open({
			content: '读取图片出错!',
			skin: 'msg',
			time: 2

		});
	};

}
$(function() {
	$("#take_input").change(function() {
		//	Deferred()
		layer.open({
			content: '认证中',
			skin: 'msg',
		});
		$.ajax({
			url: '../../certification/VerifyIdNumberBySlient',
			type: 'POST',
			cache: false,
			data: new FormData($('#f_video')[0]),
			processData: false,
			contentType: false
		}).done(function(data) {
			if(JSON.parse(data).code == 0) {
				var backurl = "background: url(" + JSON.parse(data).data.url + ") center center no-repeat;background-size: 0.98rem;"
				$(".item_text").text("已认证")
				$("#photo_take3").attr("style", backurl);
				$("#photo_take3").hide();
				$(".take").addClass("com_active");
				$(".take").removeAttr('onclick');
				$(".item_text").removeAttr('onclick');
				$('.submit_btn').css({
					'background-color': '#F86936',
				});
			}
			layer.closeAll();
			console.log(JSON.parse(data).message)
			prompt();
			$("#prompt").text(JSON.parse(data).message)
		}).fail(function(data) {
			prompt();
			$("#prompt").text(JSON.parse(data).message)			
			layer.closeAll();
		});

	})
});

function saveBtn() {
	var idcord = $("#txtidcard").text();
	var realname = $("#txtname").text();
	var faceurl = $("#photo_take3").css("background-image").split("\"")[1]

	if($("#txtname").text() == "" || $("#txtidcard").text() == "") {
		prompt();
		$("#prompt").text('请认证身份证信息');

	} else if($("#photo_take3").text() == "前往拍摄") {
		prompt();
		$("#prompt").text('请进行人脸识别')
	} else {
		var url = api+"/api.aspx?pl=3&version=1.0&action=UserAuthorize&cmd=AddRealNameAuth171012&cb_tag=?";
		$.getJSON(url, {
			atoken: aToken,
			idcord: idcord,
			realname: realname,
			faceurl: faceurl,
		}, function(msg) {
			console.log(msg)
			if(msg.code == 0) {
				prompt();
				$("#prompt").text(msg.message);
				setTimeout(function() {
					window.location.href = "personalinfo.html"
				}, 2000);
			} else {
				prompt();
				$("#prompt").text(msg.message);

			}

		});
	}
}
function Back(){
	window.history.back()
}
