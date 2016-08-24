//用于检测是否ie，及其版本
var ieCheck = { isIE: false, ieVersion: -1, isEdge: false };
var nu = navigator.userAgent;
if (nu.indexOf("Edge") > -1)
{
    ieCheck.isEdge = true;
} else if (nu.indexOf("rv:11") > -1)
{
    ieCheck.isIE = true;
    ieCheck.ieVersion = 11;
} else if (nu.indexOf("MSIE") > -1)
{
    ieCheck.isIE = true;
    ieCheck.ieVersion = parseInt(nu.toLowerCase().match(/msie ([\d.]+)/)[1]);
}


