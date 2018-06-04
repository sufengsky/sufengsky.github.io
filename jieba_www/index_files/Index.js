$(function () {
    SetBorrowInfoData();
    SetNoticeData();
    setInterval(SetBorrowInfoData, 10000);
    setInterval(SetNoticeData, 10000);
});

function SetBorrowInfoData() {//借款记录
    var url = '/Home/GetBorrowData';
    var data = {};
    data.pageIndex = $("#borrowInfo").data("pageindex");
    data.pageSize = $("#borrowInfo").data("pagesize");
    $.post(url, data, function (result) {
        if (result.code == 0 && result.resultList.length>0) {
            var $html = '';
            $("#borrowInfo").empty();
            $.each(result.resultList, function () {
                var realName = this.RealName.replace(/.(?=.)/g, '*');
                $html = '<div class="br_item">'
                           + '<p class="br_name">' + realName + '</p>'
                           + '<p class="br_tel">' + this.Mobile.substr(0, 3) + '****' + this.Mobile.substr(7) + '</p>'
                           + '<p class="br_info">成功借款<span class="orange">' + this.BorrowAccount + '</span>元</p>'
                       + '</div>';
                $("#borrowInfo").append($html);
                $("#borrowInfo").data("pageindex", parseInt(data.pageIndex)+1);
            });
        } else {
            $("#borrowInfo").data("pageindex",1);
        }
    },'json');    
}

function SetNoticeData() {//公告
    var url = '/Home/GetNoticeData';
    var data = {};
    data.pageIndex = $("#notice").data("pageindex");
    data.pageSize = $("#notice").data("pagesize");
    $.post(url, data, function (result) {
        if (result.code == 0 && result.resultList.length > 0) {
            var $html = '';
            $("#notice").empty();
            $.each(result.resultList, function () {
                $html = '<li>'
                    + '<p>'
                        + '<a href="/Home/NoticeDetail?id='+this.Id+'">' + this.Title + '</a>'
                    + '</p>'
                    + '<span>' + this.CTime + '</span>'
                + '</li>';
                $("#notice").append($html);
                $("#notice").data("pageindex", parseInt(data.pageIndex) + 1);
            });
        } else {
            $("#notice").data("pageindex", 1);
        }
    });
}