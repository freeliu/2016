function Pagination(loadDataFunName, totalCount, currentPage, pageSize)
{
    totalCount = parseInt(totalCount);
    currentPage = parseInt(currentPage);
    pageSize = parseInt(pageSize);
    this.paginationSize = {
        "small": "pagination-sm",  
        "normal": "",
        "large": "pagination-lg"
    };
    this.getPaginationStr = function (paginationSizeOption)
    {
        var paginationStr = "";
        paginationStr += '<ul class="pagination ' + paginationSizeOption + '">';
        paginationStr += '<li ' + (currentPage < 2 ? 'class="disabled"' : '') + '><a ' + (currentPage < 2 ? 'onclick="return false"' : '') + ' href="javascript:' + loadDataFunName + '(' + (currentPage - 1) + "," + pageSize + ')">上一页</a></li>';
        if (currentPage > 5)
        {
            paginationStr += '<li ' + (currentPage * pageSize >= totalCount ? 'class="disabled"' : '') + '><a ' + (currentPage * pageSize >= totalCount ? 'onclick="return false"' : '') + ' href="javascript:' + loadDataFunName + '(' + 1 + "," + pageSize + ')">' + 1 + '</a></li><li class="disabled"><a>...</a></li>';
        }
        for (var i = Math.floor((currentPage - 1) / 5) * 5 + 1; i <= Math.floor((currentPage - 1) / 5) * 5 + 5; i++)
        {
            if (i * pageSize < totalCount + pageSize)
            {
                paginationStr += '<li ' + (currentPage == i ? 'class="active"' : '') + '><a  href="javascript:' + loadDataFunName + '(' + i + ',' + pageSize + ')">' + i + '</a></li>';
            }
        }
        if (currentPage <= (Math.ceil(totalCount / pageSize)) - 5)
        {
            paginationStr += '<li class="disabled"><a>...</a></li><li ' + (currentPage * pageSize >= totalCount ? 'class="disabled"' : '') + '><a ' + (currentPage * pageSize >= totalCount ? 'onclick="return false"' : '') + ' href="javascript:' + loadDataFunName + '(' + Math.ceil(totalCount / pageSize) + "," + pageSize + ')">' + Math.ceil(totalCount / pageSize) + '</a></li>';
        }
        paginationStr += '<li ' + (currentPage * pageSize >= totalCount ? 'class="disabled"' : '') + '><a ' + (currentPage * pageSize >= totalCount ? 'onclick="return false"' : '') + ' href="javascript:' + loadDataFunName + '(' + (currentPage + 1) + "," + pageSize + ')">下一页</a></li>';

        paginationStr += '</ul>';
        return paginationStr;
    };
}
