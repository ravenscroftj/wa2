/**
 * WebAnnotator2 core code
 */

// namespace
if (typeof wa2 == "undefined") {
    var wa2 = {};
};

/**
 * Currently selected text from page (if applicable)
 */
wa2.aSelection = null;

/**
 * Register to listen for window message events from toolbar
 */
wa2.registerWindowMessageListener = function (iframe) {

    var iframe = document.getElementById('wa2Toolbar');
    // hook into window post messages
    window.addEventListener("message", function (event) {

        if (event.source != iframe.contentWindow) {
            return;
        }

        if (event.data.type && (event.data.type == "DEACTIVATE_WA2")) {
            console.log("Deactivate WA2 extension")
            wa2.deactivate();
        }

    });
}

wa2.showEdit = function(){

}

wa2.hideEdit = function(){

}

wa2.getSelection = function(){
    if (window.getSelection) {
        selection = window.getSelection();
    } else {
        alert("WA, error in selection !");
    }

    var newSelection = {
        rangeCount : selection.rangeCount,
        range: [],
        text: selection.toString()
    };
    var r;
    for (r = 0; r < selection.rangeCount; ++r ){
        newSelection.range[r] = selection.getRangeAt( r );
    }

    return newSelection;
}

/**
 * Function called at completion of script injection to register new stuff
 */
wa2.initPage = function () {
    // inject toolbar
    var height = '40px';
    var iframe = document.createElement('iframe');
    iframe.setAttribute("id", "wa2Toolbar");
    iframe.src = chrome.extension.getURL('toolbar.html');
    iframe.style.height = height;
    iframe.style.width = '100%';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.zIndex = '938089'; // Some high value
    // Etc. Add your own styles if you want to
    document.documentElement.appendChild(iframe);

    //now we register the window message listener
    wa2.registerWindowMessageListener(iframe);

    //insert tooltip
    $(document).append();

    $(document).on("mouseup", function () {
        wa2.aSelection = wa2.getSelection();

        if(wa2.aSelection && wa2.aSelection.text != "") {
            
            //wa2.insertAnnotation();
        }

    })

}

wa2.insertAnnotation = function(){
    // create the spans to hightlight the selected text
    var aAttributes = {};
    //element = content.document.getElementById("WA_data_element");
    //webannotator.WAid = Math.max(webannotator.WAid, parseInt(element.getAttribute("WA-maxid"))) + 1;
    //aAttributes["class"] = "WebAnnotator_" + sectionName;
    aAttributes['class'] = "bob";
    aAttributes['wa-type'] = "person";
    aAttributes['WA-id'] = 1;
    //aAttributes["wa-type"] = sectionName;
    //aAttributes["WA-id"] = ""+webannotator.WAid;
    // subtype
    subtypes = "";
    //for (subtype in webannotator.attributesOptions) {
    //    subtypes += subtype + ":" + webannotator.attributesOptions[subtype] + ";";
    //}
    //aAttributes["wa-subtypes"] = subtypes;
    //color = webannotator.htmlWA.getColorFromNode(sectionName);
    color = ['white','red'];
    aAttributes["style"] = "color:" + color[0] + "; background-color:" + color[1] + ";";

    // Highlight (from Scrapbook)
    sbHighlighter.set(wa2.aSelection, aAttributes);
}

wa2.deactivate = function () {
    document.documentElement.removeChild(document.getElementById('wa2Toolbar'));
}




// prepare document ready listener
wa2.initPage();
