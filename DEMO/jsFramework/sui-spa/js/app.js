/**
 * Created by Administrator on 2016/6/23.
 */
$(function (){
    $(document).on("pageLoadStart", function(e, pageId, $page) {
        if(pageId == "pageIndex") {}
        console.dir(e)
        console.log(e)
        console.log($page)
    });
    <!-- 默认必须要执行$.init(),实际业务里一般不会在HTML文档里执行，通常是在业务页面代码的最后执行 -->
   $.init()
})

// 封装get和post请求，用于同一处理未登陆情况
// ajax get 返回string
function getText(url,data,callback) {
       $.get(url,data,function (data) {
           //约定，登录失效，或者为登录返回-1
           if(data.code==-1)
           {
             window.location='#login';
           }else {
              if($.isFunction(callback))
              {
                  callback(data);
              }
           }
       })
}
// ajax get 返回json
function get(url,data,callback) {
    $.getJSON(url,data,function (data) {
        //约定，登录失效，或者为登录返回-1
        if(data.code==-1)
        {
            window.location='#login';
        }else {
            if($.isFunction(callback))
            {
                callback(data);
            }
        }
    })
}
function post(url,data,callback) {
    $.post(url,data,function (data) {
        //约定，登录失效，或者为登录返回-1
        if(data.code==-1)
        {
            window.location='login.html';
        }else {
            if($.isFunction(callback))
            {
                callback(data);
            }
        }
    },'json')
}


$(document).on("pageInit", function(e, pageId, $page) {
    var url='../page/'+pageId+'.html'
    getText(url,null,function (data) {
        $page.append(data);
    })
});
