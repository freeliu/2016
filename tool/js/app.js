/**
 * Created by liurongchang on 2016/4/20.
 */
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

// 仅驾校详情和教练详情用使用，其它使用popMsg
var Msg = function (title, linkUrl, linkText, content, smallContent) {
    this.title = title;
    this.linkUrl = linkUrl;
    this.linkText = linkText;
    this.content = content;
    this.smallContent = smallContent;
};

//显示消息后自动关闭
function popMsg(mSecond, msgStr, callback) {
    var msg = '<div id="msg" class="text-center" style="position: absolute;z-index:9999; width: 100%;top: 40%;display: none"> ' +
        '<div  class="inline-block p-2 color-white " style="background-color: #333; border-radius: 12px" > </div> </div>';
    if ($('#msg').length == 0) {
        $('body').append(msg);
    }

    $("#msg div").text(msgStr);
    $("#msg").fadeIn(500);
    setTimeout(function () {
        $("#msg").fadeOut(500);
        $.isFunction(callback) ? callback() : null;
    }, mSecond);
}

//显示加载图标
function showLoading() {
    var loading = '<div id="loading" class="text-center" style="position: absolute;width: 100%;top: 40%;display: none"> ' +
        '<img width="80" class="inline-block" src="/images/common/icon_loading.gif"> </div>';
    if ($('#loading').length == 0) {
        $('body').append(loading);
    }
    $("#loading").fadeIn(300);

}
//隐藏加载图标
function hideLoading() {
    $("#loading").fadeOut(300);
}

//公共
$(function () {
    //消除移动端300毫秒的延迟点击事件
    FastClick.attach(document.body);

    $(".modal").on("show", function () {
        $("body").addClass("modal-open");
    }).on("hidden", function () {
        $("body").removeClass("modal-open")
    });
})

function showStars(point, width) {
    var starStrs = "";
    for (var i = 1; i < 6; i++) {
        if (point >= i) {
            starStrs += "<img width=" + width + " style='position: relative;bottom: 2px' src='images/popup/pop_star_full@2x.png' >"
        } else if (point == i - 0.5) {
            starStrs += "<img width=" + width + " style='position: relative;bottom: 2px' src='images/popup/pop_star_half@2x.png' >"
        } else {
            starStrs += "<img width=" + width + " style='position: relative;bottom: 2px' src='images/popup/pop_star_empty@2x.png' >"
        }
    }
    starStrs += "<span style='font-size: '" + width + "px" + " class='ml-1 color-yellow'>" + (point * 1.00).toString() + "</span>"
    return starStrs;
};

//查询url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}



