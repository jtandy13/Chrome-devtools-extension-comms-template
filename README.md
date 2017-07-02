# Chrome-devtools-extension-comms-template
This template is an example of how communication can work between the Chrome extension event page, the content script, the devtools page, and the page itself. 

## Techniques demonstrated include:
* Simple one-time requests
* Long-lived connections
* Script injection into the page
* Communication between the page and the content script using an event driven api
* Use of a routing system to handle multiple port communication from the event page

```javascript
chrome.runtime.onConnect.addListener(function(port) {
    // Store the incoming port as a local variable
    var thisPort = port;
    // Routing system to catch multiple port connections
    if (thisPort.name == "content-script") {
        // . . .
    }
    if (thisPort.name == "devtools-page") {
        // . . .
    }
});
```

## Links
Message Passing
https://developer.chrome.com/extensions/messaging

Event pages
https://developer.chrome.com/extensions/event_pages

Content scripts
https://developer.chrome.com/extensions/content_scripts
