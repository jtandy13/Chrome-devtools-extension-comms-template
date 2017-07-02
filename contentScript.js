// inject a script into the page
var injection = document.createElement('script');
injection.src = chrome.extension.getURL('injectable.js');
(document.head||document.documentElement).appendChild(injection);
injection.onload = function() {
    injection.parentNode.removeChild(injection);
};

//Create a custom DOM event for communication with the page
function sendCmd(cmd) {
    var cmdEvent = new CustomEvent('myCmdEvent', {detail: cmd});
    window.dispatchEvent(cmdEvent);
}

// open a port for long-term communication with the event page
console.log("content script loaded!");
var port = chrome.runtime.connect({name: "content-script"});
port.postMessage({ text: "Hey event page . . ." });
port.onMessage.addListener(function(message){
    if (message.text == "Yeah content script . . .") {
        console.log(message.text);
        port.postMessage({ text: "What do you think of this port?" });
    }
    else if (message.text == "It's awesome!") {
        console.log(message.text);
        port.postMessage({text: "Yeah totally!"})
    }
});

// The content script does not have access to page's properties and functions.
// That is why the injected script is needed.
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if (message.type = "EVENT_PAGE") {
            console.log(message.text);
            sendResponse({response: "I can't do it but my secret agent can!"});
            // Send the command to the page through a custom event
            sendCmd("overrideConfirm");
        }
    }
)