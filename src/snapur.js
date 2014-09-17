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
            $message.text('Uploading snapshot to Imgur...');
            
            $.ajax({
                url: 'https://api.imgur.com/3/image',
                type: 'POST',
                headers: {
                    Authorization: 'Client-ID f957f05bea2a82a'
                },
                data: {
                    image: dataUrl.split(',')[0],
                    type: 'base64',
                    title: currentTab.title,
                    description: 'Snaped from ' + currentTab.url
                },
                dataType: 'json'
            }).done(function (json) {
                $message.text('Opening snapshot from Imgur...');
                    
                chrome.tabs.create({ url: json.data.link }, function () {
                    $message.text('');
                });
            }).fail(function (xhr) {
                var response = JSON.parse(xhr.responseText);
                
                $('#message').text(response.data.error).addClass('error');
            });
        });
    });
});