//发送js客户端错误到服务器 
window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
    var jsErrorMsg = "出错页面：" + window.location.href + "；出错文件：" + scriptURI + "；错误信息：" + errorMessage + "；出错行号：" + lineNumber + "出错列号：" + columnNumber + "；错误详情：" + errorObj;
    $.ajax({
        url: "/Common/RecordJsError",
        data: {
            msg: jsErrorMsg
        },
        type: "post"
    });
}
