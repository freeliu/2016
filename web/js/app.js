/// <reference path="lib/jQuery.js" />
/// <reference path="lib/angular.js" />

var xcyApp = angular.module("xcyApp", ['ngResource']);


var mkService=xcyApp.service("mkService", function ($http) {
    this.getCModels=function () {
        
    }
    
    var self=this;
    self.cModels =[];
    (function () {
     $http.get("http://mokao.xuecheyi.com/api/BaseData/GetCModels").success(function (data) {
         self.cModels=data;
     })
    })();
    
})

xcyApp.controller("mokaoController", function ($http, mkService) {
    var self = this;
    self.cModels = commonService.cModels;
    self.currentCat = self.cModels[0];
})



