/*globals chrome, console */

(function () {
    'use strict';
    
    var message = document.getElementById('message');
    console.log(message);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0],
            options = {
                format: 'png'
            };
        
        chrome.tabs.captureVisibleTab(currentTab.windowId, options, function (dataUrl) {
            message.innerHTML = 'Uploading snapshot to Imgur...';
            
            var httpRequest = new XMLHttpRequest(),
                data = { image: dataUrl.split(",")[1]  };

            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === 4) {
                    var response = JSON.parse(httpRequest.responseText);
                    
                    if (httpRequest.status === 200) {
                        message.innerHTML = 'Opening snapshot from Imgur...';
                
                        chrome.tabs.create({ url: response.data.link }, function () {
                            message.innerHTML = '';
                        });
                    } else {
                        message.innerHTML = response.data.error;
                        message.classList.add('error');
                    }
                }
            };

            httpRequest.open("POST", "https://api.imgur.com/3/upload");
            httpRequest.setRequestHeader("Authorization", "Client-ID f957f05bea2a82a");
            httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            httpRequest.send(JSON.stringify(data));
        });
    });
}());