/// <reference path="/js/jquery.js" />
/// <reference path="/js/knockout-debug.js" />

function WebmailViewModel()
{
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFoldId = ko.observable();
    self.chosenFoldData = ko.observable();

    // Behaviours
    self.goToFolder = function (folder)
    {
        self.chosenFoldId(folder);
        $.get("/mali", { folder: folder }, self.chosenFoldData);
   
    };
};

ko.applyBindings(new WebmailViewModel());