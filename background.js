/**
 * Background script for WebAnnotator2 which manages persistance of annotation data between UI elements
 * 
 * Author: James Ravenscroft
 */

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
    if(request.type == "deactivate") {
        chrome.tabs.executeScript({
            file: 'deactivate.js'
        });
    }
});