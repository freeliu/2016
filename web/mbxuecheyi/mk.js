// 数据绑定
var MKViewModel = function () {
    this.base = ko.observable(new BaseViewModel());
    var self = this;
    self.api = {
        adApi: 'api/Ad/GetsBy',
        getMkIndexPageData: 'api/App/GetMkIndexPageData'
    };
    self.common = ko.observable({
        adPosId: 1001,
        adCount: 3,
        pageLoadingImg: '<img width="60" class="page-loading" src="images/common/icon_loading.gif">',
        currentSbj: ko.observable(),
        currentCmodel: {},
        ads: ko.observableArray(),
        //公共部分数据初始化
        init: function () {
            var initThis = this;
            //加载科目页面
            var sbjId = getQueryString('id') || 1;
            self.common().currentSbj(sbjId);
            self.common().initSbj(sbjId);
            //1.获取轮播图广告
            $.getJSON(self.base().apiDomain.mokao + self.api.adApi, {
                adPosId: this.adPosId,
                count: this.adCount
            }, function (data) {
                initThis.ads(data.Object);
            });
            if (!localStorage.getItem('cModel')) {
                localStorage.setItem('cModel', '{"CModelId":1,"Name":"小车","Adater":"C1/C2/C3","imgUrl":"images/common/menu_car.png"}');
            }
            self.common().currentCmodel = JSON.parse(localStorage.getItem('cModel'));


        },
        topSwiper: new Swiper('#topSwiper', {
            onSlideChangeEnd: function (swiper) {
                self.common().currentSbj(swiper.snapIndex + 1);
                self.common().initSbj(swiper.snapIndex + 1);
            }
        }),
        pageSlideTo: function (index) {
            self.common().topSwiper.slideTo(index);
        },
        initSbj: function (sbjId) {
            switch (sbjId) {
                case 1:
                    self.sbj1().init();
                    break;
                case 2:
                    self.sbj2().init();
                    break;
                case 3:
                    self.sbj3().init();
                    break;
                case 4:
                    self.sbj4().init();
                    break;
            }
        }
    });
    self.sbj1 = ko.observable({
        isloaded: ko.observable(false),
        page: ko.observable(),
        pageData: ko.observable(),
        init: function () {
            if (self.sbj1().isloaded() == false) {
                //1.加载页面
                $.get("template/mk_sbj1.html", function (data) {
                    self.sbj1().page(data);
                    self.sbj1().isloaded(true);
                    ko.applyBindings(self, $("#page-sbj1 .main")[0]);
                    setTimeout(function () {
                        new Swiper('#page-sbj1 .ad-top', {
                            pagination: '.swiper-pagination',
                            autoplay: 2500,
                            speed: 800
                        });

                    }, 1000)
                })
                //2.初始化数据
                if (self.base().token()) {
                    $.getJSON(self.base().apiDomain.mokao + self.api.getMkIndexPageData, {
                        token: self.base().token(),
                        cModelId: self.base().cModel().CModelId,
                        subjectId: 1
                    }, function (data) {
                        self.sbj1().pageData(data.Object);
                    })
                }

            }
        }
    });
    self.sbj2 = ko.observable({
        isloaded: ko.observable(false),
        getListApi: 'api/News/List',
        videoList: ko.observableArray(),
        page: ko.observable(),
        init: function () {
            if (self.sbj2().isloaded() == false) {
                //1.加载页面
                $.get("template/mk_sbj2.html", function (data) {
                    self.sbj2().page(data);
                    self.sbj2().isloaded(true);
                    ko.applyBindings(self, $("#page-sbj2 .main")[0]);
                    setTimeout(function () {
                        new Swiper('#page-sbj2 .ad-top', {
                            pagination: '.swiper-pagination',
                            autoplay: 2500,
                            speed: 800
                        });
                    }, 1000)

                })

                $.getJSON(self.base().apiDomain.mokao + self.sbj2().getListApi, {
                    subjectId: 2,
                    CategoryId: 2,
                    pageSize: 50


                }, function (data) {
                    self.sbj2().videoList(data.Object);
                });
            }
        }
    });
    self.sbj3 = ko.observable({
        isloaded: ko.observable(false),
        page: ko.observable(),
        getListApi: 'api/News/List',
        videoList: ko.observableArray(),
        init: function () {
            if (self.sbj3().isloaded() == false) {
                //1.加载页面
                $.get("template/mk_sbj3.html", function (data) {
                    self.sbj3().page(data);
                    self.sbj3().isloaded(true);
                    ko.applyBindings(self, $("#page-sbj3 .main")[0]);
                    setTimeout(function () {
                        new Swiper('#page-sbj3 .ad-top', {
                            pagination: '.swiper-pagination',
                            autoplay: 2500,
                            speed: 800
                        });
                    }, 1000)

                })

                $.getJSON(self.base().apiDomain.mokao + self.sbj3().getListApi, {
                    subjectId: 3,
                    CategoryId: 2,
                    pageSize: 50
                }, function (data) {
                    self.sbj3().videoList(data.Object);
                });
            }
        }
    });
    self.sbj4 = ko.observable({
        isloaded: ko.observable(false),
        page: ko.observable(),
        pageData: ko.observable(),
        init: function () {
            if (self.sbj4().isloaded() == false) {
                //1.加载页面
                $.get("template/mk_sbj4.html", function (data) {
                    self.sbj4().page(data);
                    self.sbj4().isloaded(true);
                    ko.applyBindings(self, $("#page-sbj4 .main")[0]);
                    setTimeout(function () {
                        new Swiper('#page-sbj4 .ad-top', {
                            pagination: '.swiper-pagination',
                            autoplay: 2500,
                            speed: 800
                        });

                    }, 1000)

                })
                //2.初始化数据
                if (self.base().token()) {
                    $.getJSON(self.base().apiDomain.mokao + self.api.getMkIndexPageData, {
                        token: self.base().token(),
                        cModelId: self.base().cModel().CModelId,
                        subjectId: 4
                    }, function (data) {
                        self.sbj4().pageData(data.Object);
                    })
                }
            }
        }
    });

    self.common().init();
}

function UserAnswer(examId, answer, isRight) {
    this.examId = examId;
    this.answer = answer;
    this.isRight = isRight;
}

//题目页viewModel
var ExamViewModel = function () {
    this.base = ko.observable(new BaseViewModel());
    // paperType  1:顺序练习，2:随机练习，3:章节练习，4:专项练习(知识点)，5:模拟考试
    window.viewModel = this;
    var self = this,
        paperType = getQueryString('paperType'),
        subjectId = getQueryString('sbj'),
        typeId = getQueryString('typeId') || 0,
        pageSize = 5;

    self.api = {
        getExamPaperApi: 'api/ExamPaper/Get',
        getExamQuestion: 'api/ExamQuestion/Get',
        //添加对题
        addRight: 'api/ExamExt1/AddRight',
        addError: 'api/ExamExt1/AddError',
        addCollect: 'api/ExamExt1/AddCollect',
        delCollect2: 'api/ExamExt1/DelCollect2',
        getCollects: 'api/DataSync/GetCollects'

    };
    var getExamsFromServer = function (idsArr, callback) {
        if ($.isArray(idsArr) && idsArr.length > 0) {
            var xhr = $.ajax({
                type: "post",
                url: self.base().apiDomain.mokao + self.api.getExamQuestion,
                data: JSON.stringify(idsArr),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (self.exams().length > 500) {
                        self.exams([]);
                    }
                    $.each(data.Object, function (i, item) {
                        item.userAnswer = ko.observable();
                        item.selectA = ko.observable();
                        item.selectB = ko.observable();
                        item.selectC = ko.observable();
                        item.selectD = ko.observable();
                        item.Video = null;
                        if (item.Img) {
                            if (item.Img.indexOf('.swf') > -1 || item.Img.indexOf('.mp4') > -1) {
                                item.Video = item.Img.replace(".swf", ".mp4");
                                item.Img = null;
                            }
                        }
                    })

                    self.exams(data.Object);
                    hideLoading();
                    if ($.isFunction(callback)) {
                        callback();
                    }

                }, error: function (data) {
                    hideLoading();
                    popMsg(data.Message)
                }
            });
            setTimeout(function () {
                if (xhr.readyState < 4) {
                    showLoading();
                }
            }, 500);
        }
    }

    self.title = paperType == 1 ? '顺序练习' : paperType == 2 ? '随机练习' : paperType == 3 ? '章节练习' : paperType == 4 ? '专项练习' : '模拟考试';
    self.subjectName = subjectId == 1 ? '科目一' : subjectId == 2 ? '科目二' : subjectId == 3 ? '科目三' : '科目四';
    document.title = self.title;
    self.paperType = paperType;
    //所有的题目id
    self.examIds = ko.observableArray();
    self.currentExam = ko.observable({
        Answer: "4",
        ExamId: 1089,
        Explain: "现在都是违法行为，没有违规行为和违章行为一说。",
        Img: null,
        OptA: "过失行为",
        OptB: "违规行为",
        OptC: "违章行为",
        OptD: "违法行为",
        Title: "驾驶机动车在道路上违反道路交通安全法的行为，属于什么行为？",
        userAnswer: ko.observable(),
        Video: null
    });


    function getUserAnswerByExamId(examId) {
        for (var i = 0; i < self.userAnswers().length; i++) {
            if (self.userAnswers()[i].examId == examId) {
                return self.userAnswers()[i].answer;
            }
        }
    }

    self.currentexamsIndex = ko.pureComputed(function () {
        return self.examIds().indexOf(self.currentExam().ExamId);
    });
    self.examsCount = ko.observable();

    self.exams = ko.observableArray();
    self.setCurrenExamByIndex = function (index) {
        var isDownloaded = false;
        var examId = self.examIds()[index];
        for (var i = 0; i < self.exams().length; i++) {
            var exam = self.exams()[i];
            if (exam.ExamId == examId) {
                exam.userAnswer(getUserAnswerByExamId(examId))
                isDownloaded = true;
                self.currentExam(exam);
            }
        }
        if (isDownloaded == false) {
            getExamsFromServer([examId], function () {
                self.setCurrenExamByIndex((index));
            });
        }
    };

    //用户答案
    self.userAnswers = ko.observableArray();
    self.rightNum = ko.observable(0);
    self.wrongNum = ko.observable(0);
    self.unAnswerNum = ko.observable(0);

    //对题，错题ids
    self.rightExamIds = ko.observableArray();
    self.wrongExamIds = ko.observableArray();

    // 1.获取题目id
    //type =rigth 对题集，type=wrong 错题集...
    if (!getQueryString('type')) {
        var xhr = $.getJSON(self.base().apiDomain.mokao + self.api.getExamPaperApi, {
            token: localStorage.getItem('token'),
            cModelId: JSON.parse(localStorage.getItem('cModel')).CModelId,
            subjectId: subjectId,
            paperType: paperType,
            typeId: typeId
        }, function (data) {
            self.examIds(data.Object.ExamIds);
            getExamsFromServer(self.examIds().slice(0, pageSize), self.setCurrenExamByIndex(0));
            self.examsCount(data.Object.ExamIds.length);
            self.unAnswerNum(data.Object.ExamIds.length);

        });
        setTimeout(function () {
            if (xhr.readyState < 4) {
                showLoading();
            }
        }, 500);
    } else {
        var sessionExamIds = sessionStorage.getItem('examIds');
        if (sessionExamIds) {
            var arr = sessionExamIds.split(',');
            for (var i = 0; i < arr.length; i++) {
                self.examIds().push(parseInt(arr[i]));
            }
            self.examsCount(self.examIds().length);
            self.unAnswerNum(self.examIds().length);
            self.setCurrenExamByIndex(0)
        }
    }


    self.showNext = function () {
        if (self.currentexamsIndex() + 1 < self.examsCount()) {
            self.setCurrenExamByIndex(self.currentexamsIndex() + 1);
        }

    }
    self.showPre = function () {

        if (self.currentexamsIndex() > 0) {
            self.setCurrenExamByIndex(self.currentexamsIndex() - 1);
        }
    }


    self.showAnswer = function (userAnswer, exam) {
        if (exam.userAnswer() || self.setting().isStudyModel()) {
            return;
        }
        exam.userAnswer(userAnswer);
        var isRigth = exam.Answer == userAnswer;
        self.userAnswers().push(new UserAnswer(exam.ExamId, userAnswer, isRigth));
        if (isRigth) {
            self.rightNum(self.rightNum() + 1);
            self.rightExamIds.push(exam.ExamId);

        } else {
            self.wrongNum(self.wrongNum() + 1);
            self.wrongExamIds().push(exam.ExamId);
        }
        self.unAnswerNum(self.examIds().length - self.userAnswers().length);

        //提交对题/错题
        if(self.base().token())
        {
            $.post({
                url: self.base().apiDomain.mokao + (isRigth ? self.api.addRight : self.api.addError),
                data: {
                    Token: self.base().token(),
                    CModel_Id: self.base().cModel().CModelId,
                    Subject_Id: subjectId,
                    ExamIds: exam.ExamId
                }
            });
        }


        if (isRigth && self.setting().isAutoNextWhileRight()) {
            popMsg(1000, '正确', function () {
                self.showNext();
            })
        }
    }


    //清除记录
    self.clearRecord = function () {
        self.userAnswers([]);
        self.wrongExamIds([]);
        self.rightExamIds([]);
        self.rightNum(0);
        self.wrongNum(0);
        self.unAnswerNum(self.examIds().length);
        $.each(self.exams(), function (i, item) {
            item.userAnswer(null);
        });
        popMsg(1500, '已清除记录')
    }

    //用户收藏的题目id
    self.collectIds = ko.observableArray();
    if(self.base().token())
    {
        $.getJSON(self.base().apiDomain.mokao + self.api.getCollects, {token: self.base().token()}, function (data) {
            for (var i = 0; i < data.Object.length; i++) {
                self.collectIds(self.collectIds().concat(data.Object[i].ExamIds.split(',')));
            }
            var arr = self.collectIds().slice(0, self.collectIds().length);
            self.collectIds([]);
            for (var i = 0; i < arr.length; i++) {
                if ((arr[i])) {
                    self.collectIds().push(parseInt(arr[i]));
                }
            }
        })

    }



    //添加或删除收藏
    self.toggleCollect = function () {
        if(!self.base().token())
        {
            popMsg(1500,'请登陆后再操作')
            return
        }
        var isAdd = self.collectIds().indexOf(self.currentExam().ExamId) == -1;
        if (isAdd) {
            self.collectIds().push(self.currentExam().ExamId);
        } else {
            self.collectIds().splice(self.collectIds().indexOf(self.currentExam().ExamId));
        }
        self.collectIds(self.collectIds());
        $.post(self.base().apiDomain.mokao + (isAdd ? self.api.addCollect : self.api.delCollect2), {
            Token: self.base().token(),
            CModel_Id: self.base().cModel().CModelId,
            Subject_Id: subjectId,
            ExamIds: self.currentExam().ExamId
        }, function (data) {
            if (data.Success) {
                popMsg(1000, isAdd ? '收藏成功' : '已取消收藏');
            } else {
                popMsg(2000, data.Message);
            }
        });
    }
    self.setting = ko.observable({
        isStudyModel: ko.observable(false),
        isAutoNextWhileRight: ko.observable(true),
        toggleStudyModel: function () {
            self.setting().isStudyModel(!self.setting().isStudyModel());
        },
        toggleAutoNextWhileRight: function () {
            self.setting().isAutoNextWhileRight(!self.setting().isAutoNextWhileRight());
        }
    });
    self.leftTime = ko.observable();
    if (paperType == 5) {
        setInterval(function () {

        }, 1000)
    }
    self.submitMokao = function () {

    }

    self.selectA = function () {
        if (self.currentExam().userAnswer() || self.setting().isStudyModel()) {
            return;
        }
        self.currentExam().selectA(!self.currentExam().selectA());

    }
    self.selectB = function () {
        if (self.currentExam().userAnswer() || self.setting().isStudyModel()) {
            return;
        }
        self.currentExam().selectB(!self.currentExam().selectB());
    }
    self.selectC = function () {
        if (self.currentExam().userAnswer() || self.setting().isStudyModel()) {
            return;
        }
        self.currentExam().selectC(!self.currentExam().selectC());
    }
    self.selectD = function () {
        if (self.currentExam().userAnswer() || self.setting().isStudyModel()) {
            return;
        }
        self.currentExam().selectD(!self.currentExam().selectD());
    }
    self.showMulAnswer = function () {

        if (self.currentExam().userAnswer() || self.setting().isStudyModel()) {
            return;
        }
        var exam = self.currentExam();
        var uAnarr = [];
        if (self.currentExam().selectA()) {
            uAnarr.push(1);
        }
        if (self.currentExam().selectB()) {
            uAnarr.push(2);
        }
        if (self.currentExam().selectC()) {
            uAnarr.push(3);
        }
        if (self.currentExam().selectD()) {
            uAnarr.push(4);
        }

        self.currentExam().userAnswer(uAnarr.toString());
        var isRigth = exam.Answer == self.currentExam().userAnswer();
        self.userAnswers().push(new UserAnswer(exam.ExamId, self.currentExam().userAnswer(), isRigth));
        if (isRigth) {
            self.rightNum(self.rightNum() + 1);
            self.rightExamIds.push(exam.ExamId);

        } else {
            self.wrongNum(self.wrongNum() + 1);
            self.wrongExamIds().push(exam.ExamId);
        }
        self.unAnswerNum(self.examIds().length - self.userAnswers().length);

        //提交对题/错题
        if(self.base().token())
        {
            $.post({
                url: self.base().apiDomain.mokao + (isRigth ? self.api.addRight : self.api.addError),
                data: {
                    Token: self.base().token(),
                    CModel_Id: self.base().cModel().CModelId,
                    Subject_Id: subjectId,
                    ExamIds: exam.ExamId
                }
            });
        }



        if (isRigth && self.setting().isAutoNextWhileRight()) {
            popMsg(1000, '正确', function () {
                self.showNext();
            })
        }

    }

    self.AnswerText = ko.pureComputed(function () {
        var s = "";
        var arr = self.currentExam().Answer.split(',');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == 1) {
                s += " A "
            }
            if (arr[i] == 2) {
                s += " B "
            }
            if (arr[i] == 3) {
                s += " C "
            }
            if (arr[i] == 4) {
                s += " D "
            }
        }
        return s;
    })


}

//试卷查看
var ExamDetailViewModel = function () {
    this.base = ko.observable(new BaseViewModel(true));
    // paperType  1:顺序练习，2:随机练习，3:章节练习，4:专项练习(知识点)，5:模拟考试

    var self = this,
        paperType = getQueryString('paperType'),
        subjectId,
        typeId = getQueryString('typeId') || 0,
        pageSize = 5;
    window.viewModel = self;
    self.api = {
        getExamPaperApi: 'api/ExamPaper/Get',
        getExamQuestion: 'api/ExamQuestion/Get',
        //添加对题
        addRight: 'api/ExamExt1/AddRight',
        addError: 'api/ExamExt1/AddError',
        addCollect: 'api/ExamExt1/AddCollect',
        delCollect2: 'api/ExamExt1/DelCollect2',
        getCollects: 'api/DataSync/GetCollects',
        getMkDetail: 'api/Exam/GetMkDetail'


    };

    self.detail = ko.observable({
        CModel_Id: 1,
        ClientID: 2,
        Dtl: {
            AllIds: "sample string 2",
            Answers: "sample string 3",
            ErrorIds: "sample string 5",
            IgnoreIds: "sample string 6",
            RecordId: 1,
            RightIds: "sample string 4"
        },
        ErrorCount: 14,
        ExamDate: "2016-05-10 14:57:51.296",
        IgnoreCount: 15,
        IsExam: true,
        IsPass: true,
        RecordId: 1,
        RightCount: 13,
        Score: 10.1,
        Subject_Id: 1,
        TotalCount: 12,
        UseSecond: 9,
        UserName: "sample string 3",
        User_Id: 2
    });


    self.title = paperType == 1 ? '顺序练习' : paperType == 2 ? '随机练习' : paperType == 3 ? '章节练习' : paperType == 4 ? '专项练习' : '模拟考试';
    self.subjectName = subjectId == 1 ? '科目一' : subjectId == 2 ? '科目二' : subjectId == 3 ? '科目三' : '科目四';
    document.title = self.title;
    self.paperType = paperType;

    self.isOnlyShowWrong = ko.observable(false);
    self.toggleOnlyShowWrong = function () {
        self.isOnlyShowWrong(!self.isOnlyShowWrong());
        self.exams([]);
        if (self.isOnlyShowWrong()) {
            self.examIds(self.examErrorIds());
        } else {
            self.examIds(self.examAllIds());
        }
        self.setCurrenExamByIndex(0);

    }
    //所有的题目id
    self.examAllIds = ko.observableArray();
    self.examIds = ko.observableArray();

    self.examErrorIds = ko.observableArray();
    self.currentExam = ko.observable({
        Answer: "4",
        ExamId: 1089,
        Explain: "现在都是违法行为，没有违规行为和违章行为一说。",
        Img: null,
        OptA: "过失行为",
        OptB: "违规行为",
        OptC: "违章行为",
        OptD: "违法行为",
        Title: "驾驶机动车在道路上违反道路交通安全法的行为，属于什么行为？",
        userAnswer: ko.observable(),
        Video: null
    });


    function getUserAnswerByExamId(examId) {
        for (var i = 0; i < self.userAnswers().length; i++) {
            if (self.userAnswers()[i].examId == examId) {
                return self.userAnswers()[i].answer;
            }
        }
    }

    self.currentexamsIndex = ko.pureComputed(function () {
        return self.examIds().indexOf(self.currentExam().ExamId);
    });
    self.examsCount = ko.computed(function () {
        return self.examIds().length;
    })

    self.exams = ko.observableArray();
    self.setCurrenExamByIndex = function (index) {
        var isDownloaded = false;
        var examId = self.examIds()[index];
        if (!self.exams()) {
            return;
        }
        for (var i = 0; i < self.exams().length; i++) {
            var exam = self.exams()[i];
            if (exam.ExamId == examId) {
                exam.userAnswer(getUserAnswerByExamId(examId))
                isDownloaded = true;
                self.currentExam(exam);
            }
        }
        if (isDownloaded == false) {
            getExamsFromServer([examId], function () {
                self.setCurrenExamByIndex((index));
            });
        }
    };

    //用户答案
    self.userAnswers = ko.observableArray();
    self.rightNum = ko.observable(0);
    self.wrongNum = ko.observable(0);
    self.unAnswerNum = ko.observable(0);

    //对题，错题ids
    self.rightExamIds = ko.observableArray();
    self.wrongExamIds = ko.observableArray();


    // 1.获取detail
    var xhr = $.getJSON(self.base().apiDomain.mokao + self.api.getMkDetail, {
        token: self.base().token,
        recordID: getQueryString('recordId')
    }, function (data) {
        self.detail(data.Object);
        for (var i = 0; i < data.Object.Dtl.AllIds.split(',').length; i++) {
            self.examAllIds().push(parseInt(data.Object.Dtl.AllIds.split(',')[i]));

        }
        self.examIds(self.examAllIds());
        for (var i = 0; i < data.Object.Dtl.ErrorIds.split(',').length; i++) {
            self.examErrorIds().push(parseInt(data.Object.Dtl.ErrorIds.split(',')[i]));
        }

        var arr = JSON.parse(data.Object.Dtl.Answers);
        for (var i = 0; i < arr.length; i++) {
            self.userAnswers().push(new UserAnswer(arr[i].id, arr[i].val ? arr[i].val : ''))
        }


        self.rightExamIds(data.Object.Dtl.RightIds);

        self.wrongExamIds(data.Object.Dtl.ErrorIds);


        getExamsFromServer(self.examIds().slice(0, pageSize), self.setCurrenExamByIndex(0));
//            self.examsCount(data.Object.TotalCount);
        self.unAnswerNum(data.Object.TotalCount);
        subjectId = self.detail().Subject_Id;
    })


    setTimeout(function () {
        if (xhr.readyState < 4) {
            showLoading();
        }
    }, 500);

    var getExamsFromServer = function (idsArr, callback) {
        if ($.isArray(idsArr) && idsArr.length > 0) {
            var xhr = $.ajax({
                type: "post",
                url: self.base().apiDomain.mokao + self.api.getExamQuestion,
                data: JSON.stringify(idsArr),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $.each(data.Object, function (i, item) {
                        item.Video = null;
                        item.userAnswer = ko.observable();
                        item.selectA = ko.observable();
                        item.selectB = ko.observable();
                        item.selectC = ko.observable();
                        item.selectD = ko.observable();
                        if (item.Img) {
                            if (item.Img.indexOf('.swf') > -1 || item.Img.indexOf('.mp4') > -1) {
                                item.Video = item.Img.replace(".swf", ".mp4");
                                item.Img = null;
                            }
                        }
                    })

                    self.exams(data.Object);
                    hideLoading();
                    if ($.isFunction(callback)) {
                        callback();
                    }

                }, error: function (data) {
                    hideLoading();
                    popMsg(data.Message)
                }
            });
            setTimeout(function () {
                if (xhr.readyState < 4) {
                    showLoading();
                }
            }, 500);
        }
    }


    self.showNext = function () {
        if (self.currentexamsIndex() + 1 < self.examsCount()) {
            self.setCurrenExamByIndex(self.currentexamsIndex() + 1);
        }

    }
    self.showPre = function () {

        if (self.currentexamsIndex() > 0) {
            self.setCurrenExamByIndex(self.currentexamsIndex() - 1);
        }
    }


    //用户收藏的题目id
    self.collectIds = ko.observableArray();

    if(self.base().token())
    {
        $.getJSON(self.base().apiDomain.mokao + self.api.getCollects, {token: self.base().token()}, function (data) {
            self.collectIds(data.Object[0].ExamIds.split(','));
        });
    }

    //添加或删除收藏
    self.toggleCollect = function () {
        if(!self.base().token())
        {
            popMsg(1500,'请登陆后再操作')
            return
        }
        var isAdd = self.collectIds().indexOf(self.currentExam().ExamId) == -1;
        if (isAdd) {
            self.collectIds().push(self.currentExam().ExamId);
        } else {
            self.collectIds().splice(self.collectIds().indexOf(self.currentExam().ExamId));
        }
        self.collectIds(self.collectIds());
        $.post(self.base().apiDomain.mokao + (isAdd ? self.api.addCollect : self.api.delCollect2), {
            Token: self.base().token(),
            CModel_Id: self.base().cModel().CModelId,
            Subject_Id: subjectId,
            ExamIds: self.currentExam().ExamId
        }, function (data) {
            if (data.Success) {
                popMsg(1000, isAdd ? '收藏成功' : '已取消收藏');
            } else {
                popMsg(2000, data.Message);
            }
        });
    }
    self.setting = ko.observable({
        isStudyModel: ko.observable(false),
        isAutoNextWhileRight: ko.observable(true),
        toggleStudyModel: function () {
            self.setting().isStudyModel(!self.setting().isStudyModel());
        },
        toggleAutoNextWhileRight: function () {
            self.setting().isAutoNextWhileRight(!self.setting().isAutoNextWhileRight());
        }
    });
    self.leftTime = ko.observable();
    if (paperType == 5) {
        setInterval(function () {

        }, 1000)
    }
    self.submitMokao = function () {

    }

    self.selectA = function () {
        if (self.currentExam().userAnswer() || self.setting().isStudyModel()) {
            return;
        }
        self.currentExam().selectA(!self.currentExam().selectA());

    }
    self.selectB = function () {
        if (self.currentExam().userAnswer() || self.setting().isStudyModel()) {
            return;
        }
        self.currentExam().selectB(!self.currentExam().selectB());
    }
    self.selectC = function () {
        if (self.currentExam().userAnswer() || self.setting().isStudyModel()) {
            return;
        }
        self.currentExam().selectC(!self.currentExam().selectC());
    }
    self.selectD = function () {
        if (self.currentExam().userAnswer() || self.setting().isStudyModel()) {
            return;
        }
        self.currentExam().selectD(!self.currentExam().selectD());
    };

    self.AnswerText = ko.pureComputed(function () {
        var s = "";
        var arr = self.currentExam().Answer.split(',');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == 1) {
                s += " A "
            }
            if (arr[i] == 2) {
                s += " B "
            }
            if (arr[i] == 3) {
                s += " C "
            }
            if (arr[i] == 4) {
                s += " D "
            }
        }
        return s;
    });
    self.cModelName = ko.pureComputed(function () {
        if (self.detail().CModel_Id == 1) {
            return '小车'
        }
        if (self.detail().CModel_Id == 2) {
            return '货车'
        }
        if (self.detail().CModel_Id == 3) {
            return '客车'
        }
        if (self.detail().CModel_Id == 4) {
            return '摩托车'
        }
    });
    self.subjectName = ko.pureComputed(function () {
        if (self.detail().Subject_Id == 1) {
            return '科目一'
        }
        if (self.detail().Subject_Id == 2) {
            return '科目二'
        }
        if (self.detail().Subject_Id == 3) {
            return '科目三'
        }
        if (self.detail().Subject_Id == 4) {
            return '科目四'
        }
    });
}

//模拟考试
var ExamSimulateViewModel = function () {
    window.vm = this;
    this.base = ko.observable(new BaseViewModel());
    // paperType  1:顺序练习，2:随机练习，3:章节练习，4:专项练习(知识点)，5:模拟考试

    var self = this,
        paperType = getQueryString('paperType'),
        subjectId = getQueryString('sbj'),
        typeId = getQueryString('typeId') || 0,
        pageSize = 10;

    self.api = {
        getExamPaperApi: 'api/ExamPaper/Get',
        getExamQuestion: 'api/ExamQuestion/Get',
        postExam: 'api/ExamPaper/Post'

    };
    self.title = '模拟考试';
    self.subjectName = subjectId == 1 ? '科目一' : subjectId == 2 ? '科目二' : subjectId == 3 ? '科目三' : '科目四';
    document.title = self.title;
    self.paperType = paperType;
    //所有的题目id
    self.examIds = ko.observableArray();
    self.currentExam = ko.observable(
        {
            Answer: "4",
            ExamId: 1089,
            Explain: "现在都是违法行为，没有违规行为和违章行为一说。",
            Img: null,
            OptA: "过失行为",
            OptB: "违规行为",
            OptC: "违章行为",
            OptD: "违法行为",
            Title: "驾驶机动车在道路上违反道路交通安全法的行为，属于什么行为？",
            userAnswer: ko.observable(),
            Video: null
        }
    );

    self.currentexamsIndex = ko.pureComputed(function () {
        return self.examIds().indexOf(self.currentExam().ExamId);
    });
    self.examsCount = ko.observable();

    self.exams = ko.observableArray();
    self.setCurrenExamByIndex = function (index) {
        var isDownloaded = false;
        var examId = self.examIds()[index];
        for (var i = 0; i < self.exams().length; i++) {
            var exam = self.exams()[i];
            if (exam.ExamId == examId) {
                isDownloaded = true;
                self.currentExam(exam);
            }
        }
        if (isDownloaded == false) {
            getExamsFromServer([examId], function () {
                self.setCurrenExamByIndex((index));
            });
        }
    };

    //用户答案
    self.answers = ko.observableArray();
    self.rightNum = ko.observable(0);
    self.wrongNum = ko.observable(0);
    self.unAnswerNum = ko.observable(0);

    //对题，错题ids
    self.rightExamIds = ko.observableArray();
    self.wrongExamIds = ko.observableArray();

    var cipher = "";
    var examTime = "";

    // 1.获取题目id
    var xhr = $.getJSON(self.base().apiDomain.mokao + self.api.getExamPaperApi, {
        token: localStorage.getItem('token'),
        cModelId: JSON.parse(localStorage.getItem('cModel')).CModelId,
        subjectId: subjectId,
        paperType: paperType,
        typeId: typeId
    }, function (data) {
        self.examIds(data.Object.ExamIds);
        cipher = data.Object.Cipher;
        examTime = data.Object.ExamTime
        getExamsFromServer(self.examIds().slice(0, pageSize), self.setCurrenExamByIndex(0));
        self.examsCount(data.Object.ExamIds.length);
        self.unAnswerNum(data.Object.ExamIds.length);
        for (var i = 0; i < self.examIds().length; i++) {
            self.answers().push({id: self.examIds()[i], val: ""});
        }

    });

    setTimeout(function () {
        if (xhr.readyState < 4) {
            showLoading();
        }
    }, 500);

    var getExamsFromServer = function (idsArr, callback) {
        if ($.isArray(idsArr) && idsArr.length > 0) {
            var xhr = $.ajax({
                type: "post",
                url: self.base().apiDomain.mokao + self.api.getExamQuestion,
                data: JSON.stringify(idsArr),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $.each(data.Object, function (i, item) {
                        item.selectA=ko.observable();
                        item.selectB=ko.observable();
                        item.selectC=ko.observable();
                        item.selectD=ko.observable();
                        item.userAnswer = null;
                        item.Video = null;
                        if (item.Img) {
                            if (item.Img.indexOf('.swf') > -1 || item.Img.indexOf('.mp4') > -1) {
                                item.Video = item.Img.replace(".swf", ".mp4");
                                item.Img = null;
                            }
                        }
                    })
                    self.exams(self.exams().concat(data.Object));
                    hideLoading();
                    if ($.isFunction(callback)) {
                        callback();
                    }

                }, error: function (data) {
                    hideLoading();
                    popMsg(data.Message)
                }
            });
            setTimeout(function () {
                if (xhr.readyState < 4) {
                    showLoading();
                }
            }, 500)
        }
    }


    self.showNext = function () {
        if (self.currentexamsIndex() + 1 < self.examsCount()) {
            self.setCurrenExamByIndex(self.currentexamsIndex() + 1);
        }

    }
    self.showPre = function () {

        if (self.currentexamsIndex() > 0) {
            self.setCurrenExamByIndex(self.currentexamsIndex() - 1);
        }
    }
    self.setAnswer = function (userAnswer, exam) {
        if (exam.userAnswer) {
            return;
        }
        if(userAnswer==exam.Answer)
        {
            self.rightNum(self.rightNum()+1);
            self.rightExamIds.push(exam.ExamId);
        }else {
            self.wrongExamIds.push(exam.ExamId);
            self.wrongNum(self.wrongNum()+1);
        }


        self.unAnswerNum(self.unAnswerNum() - 1);
        exam.userAnswer = userAnswer;
        self.currentExam(self.currentExam());
        for (var i = 0; i < self.answers().length; i++) {
            if (exam.ExamId == self.answers()[i].id) {
                self.answers()[i].val = userAnswer;
            }
        }

//      self.answers().push({id: exam.ExamId, val: userAnswer});
        setTimeout(function () {
            self.showNext();
        }, 500);

    }

    self.selectA = function () {
        if (self.currentExam().userAnswer) {
            return;
        }
        self.currentExam().selectA(!self.currentExam().selectA());

    }
    self.selectB = function () {
        if (self.currentExam().userAnswer) {
            return;
        }
        self.currentExam().selectB(!self.currentExam().selectB());
    }
    self.selectC = function () {
        if (self.currentExam().userAnswer) {
            return;
        }
        self.currentExam().selectC(!self.currentExam().selectC());
    }
    self.selectD = function () {
        if (self.currentExam().userAnswer) {
            return;
        }
        self.currentExam().selectD(!self.currentExam().selectD());
    }
    self.setMulAnswer = function () {
        if (self.currentExam().userAnswer) {
            return;
        }
        var exam = self.currentExam();
        var uAnarr = [];
        if (self.currentExam().selectA()) {
            uAnarr.push(1);
        }
        if (self.currentExam().selectB()) {
            uAnarr.push(2);
        }
        if (self.currentExam().selectC()) {
            uAnarr.push(3);
        }
        if (self.currentExam().selectD()) {
            uAnarr.push(4);
        }
        self.setAnswer(uAnarr.toString(),self.currentExam())

    }


    self.isSubmiting = ko.observable(false);

    var useSecend=0;
    setInterval(function () {
        useSecend++;
    },1000)

    self.submitMokao = function () {
        if (self.isSubmiting()) {
            popMsg(1500, '正在提交请稍候');
        }
        if(self.base().token())
        {
            var xhr = $.ajax({
                type: "post",
                url: self.base().apiDomain.mokao + self.api.postExam,
                data: JSON.stringify({
                    ClientID: 2,
                    Token: self.base().token(),
                    Cipher: cipher,
                    ExamTime: examTime,
                    CModelId: self.base().cModel().CModelId,
                    SubjectId: getQueryString('sbj'),
                    Answers: self.answers()

                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    hideLoading();
                    if (data.Success) {
                        window.location = 'examScore.html?recordId=' + data.Object.RecordId;
                    } else {
                        popMsg(data.Message);
                    }
                }
            });
            setTimeout(function () {
                if (xhr.readyState < 4) {
                    showLoading();
                }
            }, 500);
        }else {
            // self.obj({UseSecond:getQueryString('useSecond'),Score:getQueryString('score')})
            window.location='examScore.html?useSecond='+useSecend+'&score='+(subjectId==1?self.rightNum():self.rightNum()*2);

        }
    }
}

//题目章节、专项等
var ExamCategoryViewModel = function () {
    window.viewModel = this;
    this.base = ko.observable(new BaseViewModel());
    var self = this;
    var api = {
        getChapters: 'api/BaseData/GetChapters',
        //专项练习（知识点）
        getKnowTypes: 'api/BaseData/GetKnowTypes'
    }
    // paperType  1:顺序练习，2:随机练习，3:章节练习，4:专项练习(知识点)，5:模拟考试
    var paperType = getQueryString('paperType'),
        subjectId = getQueryString('sbj');
    self.chapters = ko.observableArray();
    self.knowTypes = ko.observableArray();

    self.title = paperType == 1 ? '顺序练习' : paperType == 2 ? '随机练习' : paperType == 3 ? '章节练习' : paperType == 4 ? '专项练习' : '模拟考试';
    self.subjectName = subjectId == 1 ? '科目一' : subjectId == 2 ? '科目二' : subjectId == 3 ? '科目三' : '科目四';
    document.title = self.title;

    self.paperType = paperType;
    self.subjectId = subjectId;

    if (paperType == 3) {
        var xhr = $.getJSON(
            self.base().apiDomain.mokao + api.getChapters,
            {cModelId: self.base().cModel().CModelId, SubjectId: subjectId},
            function (data) {
                hideLoading();
                self.chapters(data.Object);
                var count = 0;
                for (var i = 0; i < data.Object.length; i++) {
                    count += data.Object[i].Count;
                }
                self.chapters.unshift(
                    {
                        ChapterId: 0,
                        Name: "全部试题",
                        Count: count,
                    }
                )
            }
        );
        setTimeout(function () {
            if (xhr.readyState < 4) {
                showLoading();
            }
        }, 500);
    }
    if (paperType == 4) {
        var xhr = $.getJSON(
            self.base().apiDomain.mokao + api.getKnowTypes,
            {cModelId: self.base().cModel().CModelId, SubjectId: subjectId},
            function (data) {
                hideLoading();
                self.knowTypes(data.Object);
                var count = 0;
                for (var i = 0; i < data.Object.length; i++) {
                    count += data.Object[i].Count;
                }
                self.knowTypes.unshift(
                    {
                        KnowTypeId: 0,
                        Name: "全部试题",
                        Count: count,
                    }
                )
            }
        );
        setTimeout(function () {
            if (xhr.readyState < 4) {
                showLoading();
            }
        }, 500)
    }
}

//用户错题、对题、收藏等章节
var ExamUserChaptersInfoViewModel = function () {
    window.viewModel = this;
    this.base = ko.observable(new BaseViewModel(true));
    var self = this;
    var api = {
        getChapters: 'api/BaseData/GetChapters',
        //专项练习（知识点）
        getKnowTypes: 'api/BaseData/GetKnowTypes',

        getRightList: 'api/ExamExt1/GetRightList',
        getErrorList: 'api/ExamExt1/GetErrorList',
        getCollectList:'api/ExamExt1/GetCollectList',
        getGetIgnoreList:'api/ExamExt1/GetIgnoreList'
    }

    var apistr = "";
    self.type = getQueryString('type')
    if (self.type == 'right') {
        apistr = api.getRightList;
    } else if (self.type == 'wrong') {
        apistr = api.getErrorList;
    }else if(self.type=='collect')
    {
        apistr = api.getCollectList;
    }
    else if(self.type=='ignore')
    {
        apistr = api.getGetIgnoreList;
    }


    // paperType  1:顺序练习，2:随机练习，3:章节练习，4:专项练习(知识点)，5:模拟考试
    var paperType = 3,
        subjectId = getQueryString('sbj');
    self.chapters = ko.observableArray();
    self.knowTypes = ko.observableArray();

    self.title = paperType == 1 ? '顺序练习' : paperType == 2 ? '随机练习' : paperType == 3 ? '章节练习' : paperType == 4 ? '专项练习' : '模拟考试';
    self.subjectName = subjectId == 1 ? '科目一' : subjectId == 2 ? '科目二' : subjectId == 3 ? '科目三' : '科目四';
    document.title = self.title;

    self.paperType = paperType;
    self.subjectId = subjectId;
    self.setSessionData = function (data) {
        if(data.Count){
            sessionStorage.setItem('examIds', data.ExamIds);
            return true;
        }else {
            return false;
        }

    }

    var xhr = $.getJSON(
        self.base().apiDomain.mokao + apistr,
        {
            token: self.base().token(),
            cModelId: self.base().cModel().CModelId,
            subjectID: subjectId,
            errType: 1,
            pageIndex: 0,
            pageSize: self.type=='ignore'?3000:20
        },
        function (data) {
            hideLoading();
            var count = 0;
            var arr = [];
            for (var i = 0; i < data.Object.length; i++) {
                if (data.Object[i].ExamCount!=undefined) {
                    count += data.Object[i].ExamCount;
                    data.Object[i].Count = data.Object[i].ExamCount;
                } else if (data.Object[i].ErrorCount!=undefined) {
                    count += data.Object[i].ErrorCount;
                    data.Object[i].Count = data.Object[i].ErrorCount;
                }
                if(self.type=='ignore')
                {
                    sessionStorage.setItem('examIds',data.Object.toString());
                    window.location='exam.html?paperType=1&sbj='+subjectId+'&typeId=0&type=ignore';

                }

                if(data.Object[i].ExamIds)
                {
                    arr = arr.concat(data.Object[i].ExamIds.split(','));
                }

            }


            self.chapters(data.Object);
            self.chapters.unshift(
                {
                    ChapterId: 0,
                    ChapterName: "全部",
                    Count: count,
                    ExamIds: arr.toString()
                }
            )
        }
    );
    setTimeout(function () {
        if (xhr.readyState < 4) {
            showLoading();
        }
    }, 500);

}








