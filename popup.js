
/**
 * Wrap chrome.tab.executeScript in a promise
 * 
 * @param {string} scriptName 
 */
function loadScriptPromise(scriptName){

    return new Promise(function(resolve, reject){
      chrome.tabs.executeScript(null, {file: scriptName}, function(){

        console.log("Loading script " + scriptName);
        resolve();
      })
    });
}

/**
 * Start annotation process by injecting script into browser page
 */
function startAnnotation() {
  
  console.log("Loading annotations");

  chrome.tabs.insertCSS({file:'style/protip.min.css'});
  chrome.tabs.insertCSS({file:'style/tooltip.css'});
  chrome.tabs.insertCSS({file: 'style/jquery-ui.css'});
  chrome.tabs.insertCSS({file: 'style/jquery-ui.theme.css'});

  loadScriptPromise('script/jquery-3.3.1.js')
    .then(loadScriptPromise('script/jquery-ui.js'))
    .then(loadScriptPromise('script/highlighter.js'))
    .then(loadScriptPromise('script/protip.min.js'))
    .then(loadScriptPromise('wa2.js'));
}

/**
 * Page load listener that registers UI events
 */
$(document).ready(function () {
  //register start annotation
  $('#annotateBtn').click(startAnnotation);

});

