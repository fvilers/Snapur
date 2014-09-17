/*globals $, chrome */

$(function () {
    'use strict';
    
    var $message = $('#message');
    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];
        
        $message.text("Current tab url is " + currentTab.url);
    });
});