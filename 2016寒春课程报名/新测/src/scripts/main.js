/*
 * @Author: 勇
 * @Date:   2015-07-23 11:13:52
 * @Last Modified by:   duanyong
 * @Last Modified time: 2015-10-26 14:03:29
 */

// meta================
function mkmeta() {
    var meta = document.createElement("meta");
    meta.setAttribute("name", "Author");
    meta.setAttribute("content", "duanyong");
    // document.head.appendChild(meta);
    $("head").append(meta);
}
mkmeta();


var xcLiHeight = $(".xc-list ul li").height();
var xcLiHeightSpan = $(".xc-list ul li").innerHeight() / 1.2;
$(".xc-list ul li").css({
    "border-radius": xcLiHeight + "px",
    "line-height": xcLiHeight + "px"
});

$(".click-scale").on("click", function() {
    $(this).toggleClass("scale-2")
})

$(".last-li-p").css({
    "line-height": $(".last-li-p").height() / 2.8 + "px",
    "margin-top": $(".last-li-p").height() / 6 + "px"
});

$(".xc-list ul li .col-xs-3").css({
    "border-radius": xcLiHeightSpan + "px",
    "width": xcLiHeightSpan + "px",
    "margin-top": (xcLiHeight - parseInt(xcLiHeightSpan)) / 2 + "px",
    "height": xcLiHeightSpan + "px",
    "line-height": xcLiHeightSpan + "px"
});


$(".last-li").css({
    "line-height": 0
});

var infoTitleColor = $(".content-xc.xc-info .col-xs-3").css("color");
$(".content-xc.xc-info h3").css("color", infoTitleColor);

var xcH2Height = $(".content-xc h2").height();
$(".content-xc h2").css({
    "line-height": xcH2Height + "px"
});

var xcTop = $(".xc-top").height();
$(".xc-info i").css({
    "line-height": xcTop + "px"
});



// if ($(window).height() < $(window).width()) {
//     $(".content-xc").addClass("none");
// } else {
//     $(".content-xc").removeClass("none");
// }


var orientLayer = document.getElementById("vertical");
//判断横屏竖屏
function checkDirect() {
    if (document.documentElement.clientHeight <= document.documentElement.clientWidth) {
        return "portrait";
    } else {
        return "landscape";
    }
}
//显示屏幕方向提示浮层
function orientNotice() {
    var orient = checkDirect();
    if (orient == "portrait") {
        $(".content-xc").addClass("none");
    } else {
        $(".content-xc").removeClass("none");
    }
}

function init() {
    orientNotice();
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        setTimeout(orientNotice, 200);
    })
}
init();
