/**
 * Created by liurongchang on 2016/4/20.
 */
//百度统计
$(function () {
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?b3305c20b6be1afb6e13eb1a226e247d";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
})


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
    var msg = '<div id="msg" class="text-center" style="position: absolute;z-index:9999; width: 100%;top: 40vh;display: none"> ' +
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
    var loading = '<div id="loading" class="text-center" style="position: absolute;z-index: 999999; width: 100%;top: 40vh;display: none"> ' +
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

var
//教练详情
    teacherApi = 'api/JlTeacherEx1/GetTeacherDtl',
    jlCommentApi = 'api/JlComment/List',
    jlAskApi = 'api/JlAsk/GetAsks',

//驾校详情
    schoolApi = 'api/JxSchoolEx1/GetSchoolDtl',
    lessonApi = 'api/JxSchoolEx2/GetLessons',
    showsApi = 'api/JxSchoolEx2/GetShows',
    jxCommentApi = 'api/JxComment/List',
    jxAskApi = 'api/JxAsk/GetAsks',
    jxTeamsApi = 'api/JxSchoolEx2/GetTeams',
    jxJxRegisterApi = 'api/JxRegister/Add',
    appUrl = browser.versions.ios || browser.versions.iPhone || browser.versions.iPad
        ? "https://itunes.apple.com/cn/app/xue-che-yi-xue-che-kao-jia/id1091188280?mt=8"
        : "http://android.myapp.com/myapp/detail.htm?apkName=com.xuecheyi.mb";

// var userApiDomain = 'http://120.24.52.184:106/',
//     regionApiDomain = 'http://120.24.52.184:888/',
//     newsApiDomain = 'http://120.24.52.184:107/',
//     mokaoApiDomain= 'http://120.24.52.184:105/';
var userApiDomain = 'http://user.xuecheyi.com/',
    regionApiDomain = 'http://jx.xuecheyi.com/',
    newsApiDomain = 'http://news.xuecheyi.com/',
    mokaoApiDomain = 'http://mokao.xuecheyi.com/';

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

//格式化时间差
function forMateTimespan(timespan) {
    if (timespan <= 0) {
        return "";
    }

    var remainTime = "";
    var secend = Math.floor(timespan / 1000);
    var minute = Math.floor(secend / 60);
    var hour = Math.floor(minute / 60);
    var date = Math.floor(hour / 24);
    if (date > 0) {
        remainTime += date + "天";
        if (hour % 24 > 0) {
            remainTime += hour % 24 + "小时";
        }

    } else {
        if (hour > 0) {
            remainTime += hour + "小时";
            if (minute % 60 > 0) {
                remainTime += minute % 60 + "分前";
            }
        } else {
            remainTime += minute % 60 + "分前";
        }
    }

    return remainTime;

}

//基础数据
var BaseViewModel = function (isNeedlogin) {
    var self = this;
    self.apiDomain = {
        news: newsApiDomain,
        user: userApiDomain,
        mokao: mokaoApiDomain
    }

    var userGetInfoApi = 'api/User/GetInfo';

    self.token = ko.observable();
    self.cModel = ko.observable();
    self.userInfo = ko.observable(
        {
            id: 0,
            user_name: "",
            mobile: "",
            email: "",
            avatar: ""
        }
    );

    //初始化基础数据
    (function init() {
        self.token(localStorage.getItem('token'));
        if (!localStorage.getItem('cModel')) {
            localStorage.setItem('cModel', '{"CModelId":1,"Name":"小车","Adater":"C1/C2/C3","imgUrl":"images/common/menu_car.png"}');
        }
        self.cModel(JSON.parse(localStorage.getItem('cModel')));
        if (isNeedlogin) {
            if (!self.token()) {
                popMsg(1500, '当前操作需要登录', function () {
                    window.location = 'login.html?from=' + window.location.href;
                });
            }
            $.getJSON(self.apiDomain.user + userGetInfoApi, {clientID: 2, token: self.token()}, function (data) {
                if (data.Success && data.Object == null) {
                    popMsg(1500, "登录已失效，请重新登陆", function () {
                        self.token(null);
                        window.location = 'login.html?from=' + window.location.href;
                    });
                }
                if (data.Message && data.Message.indexOf('无效的登录凭证') > -1) {
                    self.token(null);
                    popMsg(1500, "登录已失效，请重新登陆", function () {
                        window.location = 'login.html?from=' + window.location.href;
                    });
                }
                self.userInfo(data.Object);
            })
        } else {
            $.getJSON(self.apiDomain.user + userGetInfoApi, {clientID: 2, token: self.token()}, function (data) {
                if (data.Success && data.Object == null) {
                    self.token(null);
                }
                if (data.Message && data.Message.indexOf('无效的登录凭证') > -1) {
                    self.token(null);
                }
                if (data.Object) {
                    self.userInfo(data.Object);
                }
            })
        }
    })()


}




