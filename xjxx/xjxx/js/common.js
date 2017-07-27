//显示提示信息对话框 1 秒后消失
//message:要显示的信息
function showMessage(message) {
    var info = "<div class='ac_toast' id='toast-default' style='display:block;'><div class='ac_toast_backdrop'></div>" +
    "<div class='ac_toast_dialog'><div class='ac_toast_content'><span>" + message + "</span></div></div></div>";
    $("body").append(info);
    setTimeout(function () { $("#toast-default").remove() }, 1000);
}