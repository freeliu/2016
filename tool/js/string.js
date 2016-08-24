//字符串占用空间计算
String.prototype.getWidth = function (fontSize)
{
    var f = fontSize,
             o = $('<div>' + this + '</div>')
             .css({
                 'position': 'absolute',
                 'float': 'left',
                 'white-space': 'nowrap',
                 'visibility': 'hidden',
                 'font-size': f
             })
             .appendTo($('body')),
             w = o.width();
    o.remove();
    return w;
};