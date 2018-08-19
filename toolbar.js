/**
 * Javascript component for toolbar
 */

$(document).ready(function(){

    $('#closeLink').click(function(){
        parent.postMessage({ type: "DEACTIVATE_WA2", text: "Hello from the webpage!" }, "*");
    })

});
