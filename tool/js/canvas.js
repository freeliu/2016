function isIE()
{
    var nu = navigator.userAgent;
    if (nu.indexOf("Edge") > -1 || nu.indexOf("rv:11") > -1 || nu.indexOf("MSIE") > -1)
    {
        return true;
    } else
    {
        return false;
    }

}

//保存canvas 到本地，暂不支持ie
//a：a标签对象（只支持通过a标签点击来下载）
//canvas :canvas对象
//saveName:保存名称，无需后缀名
function saveCanvas(a, canvas, saveName)
{
    if (isIE())
    {
        alert("模板图片使用新技术生成,目前所有ie均不支持下载，请使用其它浏览器（如谷歌），百度、360、QQ、猎豹等国产浏览器切换到极速模式后可正常使用");
        e.preventDefault();
        return;
    }
    $(a)[0].href = canvas.toDataURL();
    $(a)[0].download = saveName + ".png";
}