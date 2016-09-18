var Common = function () {
    var apiUrl = 'http://test.tripadmin.meishakeji.com/api/';
    this.api = {
        orderList: apiUrl + 'airtickettool/list',
        //OrderId
        cancel: apiUrl + 'airtickettool/cancel',
        //暂未使用，直接在列表中过滤了，todo：需求
        filter: apiUrl + 'airtickettool/filter',
        edit: apiUrl + 'airtickettool/edit',
        //OrderId
        bookdetail: apiUrl + 'airtickettool/bookdetail',
        //OrderId
        orderdetail: apiUrl + 'airtickettool/orderdetail',
        //OrderId
        pass: apiUrl + 'airtickettool/pass',
    };
    this.ajax = function (url, data, type, callback) {
        var commonSelf = this;
        var xhr = $.ajax({
            url: url
            , data: data
            , type: type
            , dataType: 'json'
            , success: function (jsonData) {
//                commonSelf.hideLoading();
                if (jsonData.Code == '-1001') {
                    //                    localStorage.removeItem('Auth');
                    //                    commonSelf.popMsg(jsonData.Msg, function () {
                    //                       
                    //                    });
                }
                else {
                    if ($.isFunction(callback)) {
                        callback(jsonData);
                    }
                }
            }
            , error: function (msg) {
                //一般是服务器异常
                //todao：统一发送信息到后台
                console.dir(msg);
            }
        });
        return xhr;
    };
    this.getJson = function (url, data, callback) {
        return this.ajax(url, data, 'get', callback);
    };
    this.postJson = function (url, data, callback) {
        return this.ajax(url, data, 'post', callback);
    };
}
var common = new Common();
var vm = new Vue({
    el: "body"
    , data: {
        orderList: [],
        filter: {flightWay: "", takeAlong: "", status: "", searchText: ""},
        bookDetail: {
            FromCity: "",
            ToCity: "",
            FlightWay: "",
            ClassType: "",
            FromDate: "",
            ToDate: "",
            FromTime: "",
            ToTime: "",
            AnticipatedPrice: 0,
            Passenger: [
                {
                    Name: "",
                    PassengerType: 0,
                    PassengerTypeStr: "",
                    IdentityType: 0,
                    IdentityTypeStr: "",
                    IdentityNo: "",
                    FromTicketNumber: "",
                    ToTicketNumber: ""
                }
            ],
            ContactPhoneNo: "",
            VipCardId: ""
        },
        orderDetail: {
            FromCity: "",
            ToCity: "",
            FlightWay: "",
            ClassType: "",
            FromAirLine: "",
            ToAirLine: "",
            FromFlightNumber: "",
            ToFlightNumber: "",
            ActualFromDate: "",
            ActualFromTime: "",
            ActualToDate: "",
            ActualToTime: "",
            ActualFromPrice: 0,
            ActualToPrice: 0,
            Passenger: [
                {
                    Name: "",
                    PassengerType: 0,
                    PassengerTypeStr: "",
                    IdentityType: 0,
                    IdentityTypeStr: "",
                    IdentityNo: "",
                    FromTicketNumber: "",
                    ToTicketNumber: ""
                }
            ]
        },
        editObj: {
            FlightWay:"",
            OrderId: "-1",
            ActualFromDate: "",
            ActualFromTime: "",
            ActualToDate: "",
            ActualToTime: "",
            ActualFromPrice: null,
            ActualToPrice: null,
            FromAirLine: "",
            ToAirLine: "",
            FromFlightNumber: "",
            ToFlightNumber: "",
            FromCity: "",
            ToCity: "",
            Passenger: [],
            ClassType:""
        },
        //异步请求状态，放在重复点击按钮
        xhrStatus: {
            isCancelling: false,
            isEditting: false,
            isGettingBookDetail: false,
            isGettingOrderdetail: false,
            isGettingOrderlist: false,
            isPassing: false
        }

    }
    , methods: {
        init: function () {
            this.getOrderList();
        },
        getOrderList: function () {
            var self = this;
            common.getJson(common.api.orderList, null, function (rsp) {
                self.orderList = rsp.Data.OrderList;
            })
        },
        getBabyOrChildrenText: function (order) {
            var s = "", childrenNum = 0, babbyNum = 0;
            for (var i = 0; i < order.Passenger.length; i++) {
                if (order.Passenger[i].PassengerTypeStr == "儿童") {
                    childrenNum++;
                } else if (order.Passenger[i].PassengerTypeStr == "婴儿") {
                    babbyNum++
                }
            }
            if (childrenNum > 0) {
                if (childrenNum == 1) {
                    s += " 儿童 ";
                } else {
                    s += " " + childrenNum + "儿童 ";
                }
            }
            if (babbyNum > 0) {
                if (childrenNum > 0) {
                    s += "|";
                }
                if (babbyNum == 1) {
                    s += " 婴儿 ";
                } else {
                    s += " " + babbyNum + "婴儿 ";
                }
            }
            s = s.replace(/\s/g, "");
            if (s) {
                return s
            } else {
                return "-"
            }

        },
        getStatusText: function (status) {
            switch (status) {
                case 1:
                    return "待审核";
                case 2:
                    return "正在预定";
                case 3:
                    return "已出票";
                case 4:
                    return "已完成";
                case 5:
                    return "审核不通过";
                case 6:
                    return "订单取消";
            }
        },
        //通过审核
        pass: function (orderId) {
            var self = this;
            if (self.xhrStatus.isPassing) {
                return;
            }
            if (confirm("确定要通过订单" + orderId + "的审核吗？")) {
                self.xhrStatus.isPassing = true;
                common.postJson(common.api.pass, {Data: JSON.stringify({OrderId: orderId})}, function (rsp) {
                    if (rsp.Code == 0) {
                        self.getOrderList();
                        alert("成功");
                    } else {
                        alert(rsp.Msg);
                    }
                    self.xhrStatus.isPassing = false;
                });
            }

        },
        //取消订单
        cancel: function (orderId) {
            var self = this;
            if (self.xhrStatus.isCancelling) {
                return;
            }
            if (confirm("确定要取消订单" + orderId + "吗？")) {
                self.xhrStatus.isCancelling = true;
                common.postJson(common.api.cancel, {Data: JSON.stringify({OrderId: orderId})}, function (rsp) {
                    if (rsp.Code == 0) {
                        self.getOrderList();
                        alert("成功");
                    } else {
                        alert(rsp.Msg);
                    }
                    self.xhrStatus.isCancelling = false;
                });
            }
        },
        getBookDetail: function (orderId) {
            var self = this;
            if (self.xhrStatus.isGettingBookDetail) {
                return;
            }
            self.xhrStatus.isGettingBookDetail = true;
            common.postJson(common.api.bookdetail, {Data: JSON.stringify({OrderId: orderId})}, function (rsp) {
                if (rsp.Code == 0) {
                    self.bookDetail = rsp.Data;
                    $("#modal-bookDetail").modal("show");
                } else {
                    alert(rsp.Msg);
                }
                self.xhrStatus.isGettingBookDetail = false;
            });
        },
        getOrderDetail: function (orderId) {
            var self = this;
            if (self.xhrStatus.isGettingOrderdetail) {
                return;
            }
            self.xhrStatus.isGettingOrderdetail = true;
            common.postJson(common.api.orderdetail, {Data: JSON.stringify({OrderId: orderId})}, function (rsp) {
                if (rsp.Code == 0) {
                    self.orderDetail = rsp.Data;
                    $("#modal-orderDetail").modal("show");
                } else {
                    alert(rsp.Msg);
                }
                self.xhrStatus.isGettingOrderdetail = false;
            });
        },

        edit: function (orderId) {
            var self = this;
            if (self.editObj.OrderId == orderId) {
                if(self.editObj.FlightWay=="单程")
                {
                    $("#modal-orderEdit").modal("show");
                }else {
                    $("#modal-orderEdit2").modal("show");
                }
            } else {
                self.editObj = {
                    FlightWay:"",
                    ActualFromDate: "",
                    ActualFromTime: "",
                    ActualToDate: "",
                    ActualToTime: "",
                    ActualFromPrice: null,
                    ActualToPrice: null,
                    FromAirLine: "",
                    ToAirLine: "",
                    FromFlightNumber: "",
                    ToFlightNumber: "",
                    FromCity: "",
                    ToCity: "",
                    ClassType:"",
                    Passenger: []
                };
                common.postJson(common.api.bookdetail, {Data: JSON.stringify({OrderId: orderId})}, function (rsp) {
                    if (rsp.Code == 0) {
                        self.editObj.OrderId = orderId;
                        self.editObj.ActualFromDate = rsp.Data.FromDate;
                        self.editObj.ActualToDate = rsp.Data.FromDate.ToDate;
                        self.editObj.FromCity = rsp.Data.FromCity;
                        self.editObj.ToCity = rsp.Data.ToCity;
                        self.editObj.Passenger = [];
                        self.editObj.ClassType= rsp.Data.ClassType;
                        self.editObj.FlightWay=rsp.Data.FlightWay;
                        for (var i = 0; i < rsp.Data.Passenger.length; i++) {
                            var p = rsp.Data.Passenger[i];
                            var editP = {
                                Name: p.Name,
                                PassengerType: p.PassengerType,
                                IdentityType: p.IdentityType,
                                IdentityNo: p.IdentityNo,
                                FromTicketNumber: "",
                                ToTicketNumber: "",
                                IdentityTypeStr: p.IdentityTypeStr
                            };
                            self.editObj.Passenger.push(editP);
                        }
                        if(self.editObj.FlightWay=="单程")
                        {
                            $("#modal-orderEdit").modal("show");
                        }else {
                            $("#modal-orderEdit2").modal("show");
                        }
                    } else {
                        alert(rsp.Msg);
                    }

                });
            }
            /*            common.postJson(common.api.orderdetail, {Data: JSON.stringify(this.editObj)}, function (rsp) {
             if (rsp.Code == 0) {
             alert("成功");
             } else {
             alert(rsp.Msg);
             }

             });*/
        },
        editSubmit:function () {
            var self = this;
            if (self.xhrStatus.isEditting) {
                return;
            }
            if (confirm("确定要保存吗")) {
                self.xhrStatus.isEditting = true;
                self.editObj.ActualFromPrice=parseFloat(self.editObj.ActualFromPrice)*100;
                self.editObj.ActualToPrice=parseFloat(self.editObj.ActualToPrice)*100;
                for(var i=0;i<self.editObj.Passenger.length;i++)
                {
                    self.editObj.Passenger[i].PassengerType=parseInt(self.editObj.Passenger[i].PassengerType);
                    self.editObj.Passenger[i].IdentityType =parseInt(self.editObj.Passenger[i].IdentityType );
                }
                
                common.postJson(common.api.edit, {Data: JSON.stringify(self.editObj)}, function (rsp) {
                    if (rsp.Code == 0) {
                        self.getOrderList();
                        alert("成功");
                    } else {
                        alert(rsp.Msg);
                    }
                    self.xhrStatus.isEditting = false;
                });
            }
        }
        

    }
    , computed: {
        fliterOrderList: function () {
            var arr = [];
            for (var i = 0; i < this.orderList.length; i++) {
                var o = this.orderList[i];
                if (this.filter.flightWay && this.filter.flightWay != o.FlightWay) {
                    continue;
                }
                if (this.filter.status && this.filter.status != o.Status) {
                    continue;
                }
                if (this.filter.takeAlong && this.getBabyOrChildrenText(o).indexOf(this.filter.takeAlong) == -1
                    || (this.filter.takeAlong.indexOf("|") > -1) && this.getBabyOrChildrenText(o).indexOf("|") == -1
                    || (this.filter.takeAlong.indexOf("|") == -1) && this.getBabyOrChildrenText(o).indexOf("|") > -1
                ) {
                    continue;
                }

                if (this.filter.searchText &&
                    (o.FromCity.indexOf(this.filter.searchText.trim()) == -1 &&
                    o.ToCity.indexOf(this.filter.searchText.trim()) == -1 &&
                    o.ContactPhoneNo.indexOf(this.filter.searchText.trim()) == -1 &&
                    o.VipCardId.indexOf(this.filter.searchText.trim()) == -1)
                ) {
                    continue;
                }
                arr.push(o);
            }
            return arr;
        }
    }
});
$(function () {
    vm.init();
})