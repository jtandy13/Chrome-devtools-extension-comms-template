// Create a port for communication with the event page
// https://developer.chrome.com/extensions/runtime#type-Port
var port = chrome.runtime.connect({
    name: "devtools-page"
});
port.postMessage({ text: "Hey event page . . ." });
