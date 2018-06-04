$(function() {
	$.ajax({
		url: "header.html",
		async: false,
		type: "get",
		dataType: "html",
		success: function(msg) {
			$("#header").html(msg)
		}
	})
	$.ajax({
		url: "footer.html",
		async: false,
		type: "get",
		dataType: "html",
		success: function(msg) {
			$("#footer").html(msg)
		}
	})
})
$(function() {
	$(".client").hover(function(){
		$(".app").show();
		$(".client").css({"color":"#b49b5e"})
	},function(){
		$(".app").hide();
		$(".client").css({"color":"#333333"})
	})
})