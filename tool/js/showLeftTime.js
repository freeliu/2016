/* global $ */
//显示剩余时间   
var showLeftTime = setInterval(function () {
        var lastAuthorizeTime = parseInt(localStorage.getItem("authorizeTime"));
        var now = Date.now();
        var timespan = now - lastAuthorizeTime;
        var leftTime = 1500 - Math.floor(timespan / 1000);
        $("#lefttime").html(leftTime);
        if (leftTime <= 0) {
            clearInterval(showLeftTime);
        }
    }, 1000);

//c# json 格式日期计算剩余时间
function getLeftTime(beginTimeStr, endTimeStr)
{
    beginTimeStr = beginTimeStr.replace("/Date(", "").replace(")/", "").replace(/-/g, "/");
    endTimeStr = endTimeStr.replace("/Date(", "").replace(")/", "").replace(/-/g, "/");
    var date1 = isNaN(beginTimeStr) ? new Date(beginTimeStr) : new Date(parseInt(beginTimeStr));
    var date2 = isNaN(endTimeStr) ? new Date(endTimeStr) : new Date(parseInt(endTimeStr));

    var timespan = Date.parse(date2.toString()) - Date.parse(date1.toDateString());

    if (timespan <= 0)
    {
        return "";
    }
    var remainTime = "";
    var secend = Math.floor(timespan / 1000);
    var minute = Math.floor(secend / 60);
    var hour = Math.floor(minute / 60);
    var date = Math.floor(hour / 24);
    if (date > 0)
    {
        remainTime += date + "天";
        if (hour % 24 > 0)
        {
            remainTime += hour % 24 + "小时";
        }

    } else
    {
        if (hour > 0)
        {
            remainTime += hour + "小时";
            if (minute % 60 > 0)
            {
                remainTime += minute % 60 + "分钟";
            }
        } else
        {
            remainTime += minute % 60 + "分钟";
        }
    }

    return remainTime;
}