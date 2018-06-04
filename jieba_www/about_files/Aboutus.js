$(function () {
    $(".main_tap p").click(function () {
        $(".main_tap p").removeClass("active");
        $(this).addClass("active");
        $(".part").hide().eq($(this).index()).show()
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        map.enableScrollWheelZoom(true);
        var myGeo = new BMap.Geocoder();
        myGeo.getPoint("西藏自治区拉萨市柳梧新区国际总部城", function (point) {
            if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
            }
        }, "西藏自治区");
    })
    //SetNoticeData();
    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    map.enableScrollWheelZoom(true);
    var myGeo = new BMap.Geocoder();
    myGeo.getPoint("西藏自治区拉萨市柳梧新区国际总部城", function (point) {
        if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
        }
    }, "西藏自治区");

    var type = getUrlParam("type");
    $("#hi_type").val(type);
    typeAboutus();
});


function typeAboutus() {
    var type = $("#hi_type").val();
    $(".main_tap p").eq(type).click();
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
//function SetNoticeData(obj) {//公告
//    var pageindex = $(obj).data("index");
//    if (typeof (pageindex) == "undefined" || pageindex == null) {
//        pageindex = 1;
//    }
  
//    var url = '/Home/GetNoticeData2';
//    var data = {};
//    data.pageIndex = pageindex;
//    data.pageSize = $("#Platnotice").data("pagesize");
//    $.post(url, data, function (dt) {
//        var result = JSON.parse(dt);
//        if (result.code == 0) {
//            var $html = '';
//            $("#Platnotice .ann_item").remove();
//            $.each(result.data.list, function () {
//                $html = '<div class="ann_item">'
//                + '<div class="ann_title">'
//                   + '<p class="ann_bt">' + this.Title + '</p>'
//                    + '<p class="ann_time">' + this.CTime + '</p>'
//                + '</div>'
//                + '<div class="ann_con">'
//                    + '<a href="#">' + this.Contents + '</a>'
//                + '</div>'
//            + '</div>';
//                $("#Platnotice .custompage").before($html);
//            });
//            setPage(pageindex, result.data.count);
           
//        } else {
//            $("#myPagination .custompage a:first").removeClass("pagepick");
//            $("#myPagination .custompage a:first").addClass("pagepick");
//        }
//    });
//}


//function setPage(pageindex, pagecount) {
//    var $main = $("#myPagination .custompage");
//    $main.find("a").removeClass("pagepick");
//    $main.find("a").hide();
   

//    if (pageindex > 1) {//<<
//        $main.find("a").eq(0).show();
//        $main.find("a").eq(0).text("<<");
//        $main.find("a").eq(0).data("index", pageindex - 1);
//    }

//    if (pagecount - pageindex > 0) {//>>
//        $main.find("a").eq(6).show();
//        $main.find("a").eq(6).text(">>");
//        $main.find("a").eq(6).data("index", pageindex + 1);
//    }
//    if (pageindex == 1) {
//        $main.find("a").eq(3).show();
//        $main.find("a").eq(3).addClass("pagepick");
//        $main.find("a").eq(3).text(pageindex);
//        $main.find("a").eq(3).data("index", pageindex);
//    }
//    if (pageindex == 2) {
//        $main.find("a").eq(3).show();
//        $main.find("a").eq(3).addClass("pagepick");
//        $main.find("a").eq(3).text(pageindex);
//        $main.find("a").eq(3).data("index", pageindex);
//    }
//    if (pageindex >= 3) {
//        $main.find("a").eq(3).show();
//        $main.find("a").eq(3).addClass("pagepick");
//        $main.find("a").eq(3).text(pageindex);
//        $main.find("a").eq(3).data("index", pageindex);
//    }

//    if (pageindex - 2 > 0) {
//        $main.find("a").eq(1).show();
//        $main.find("a").eq(1).text(pageindex - 2);
//        $main.find("a").eq(1).data("index", pageindex - 2);
//    }
//    if (pageindex - 1 > 0) {
//        $main.find("a").eq(2).show();
//        $main.find("a").eq(2).text(pageindex - 1);
//        $main.find("a").eq(2).data("index", pageindex - 1);
//    }

//    if (pagecount - (pageindex+2) > 0) {
//        $main.find("a").eq(5).show();
//        $main.find("a").eq(5).text(pageindex + 2);
//        $main.find("a").eq(5).data("index", pageindex + 2);
//    }
//    if (pagecount - (pageindex + 1) > 0) {
//        $main.find("a").eq(4).show();
//        $main.find("a").eq(4).text(pageindex + 1);
//        $main.find("a").eq(4).data("index", pageindex + 1);
//    }


//}


