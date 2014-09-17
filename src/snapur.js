/*globals $, chrome, console */

$(function () {
    'use strict';
    
    var $message = $('#message');
    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0],
            options = {
                format: 'png'
            };
        
        chrome.tabs.captureVisibleTab(currentTab.windowId, options, function (dataUrl) {
            chrome.tabs.create({ url: dataUrl }, function () {
            });
        });
    });
});