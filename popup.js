
/**
 * Start annotation process by injecting script into browser page
 */
function startAnnotation() {
  
  chrome.tabs.insertCSS({file:'style/protip.min.css'});
  chrome.tabs.insertCSS({file:'style/tooltip.css'})

  chrome.tabs.executeScript(null, { file: 'script/jquery-3.3.1.js' }, function () {
    chrome.tabs.executeScript(null, { file: 'script/highlighter.js' }, function () {
      chrome.tabs.executeScript(null, { file: 'script/protip.min.js' }, function () {
        chrome.tabs.executeScript(null, { file: 'wa2.js' });
      });
    });
  });
}

/**
 * Page load listener that registers UI events
 */
$(document).ready(function () {
  //register start annotation
  $('#annotateBtn').click(startAnnotation);

});

