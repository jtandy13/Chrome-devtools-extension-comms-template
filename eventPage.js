// Set up a listener to handle incoming connections
console.log("event page loaded!");
chrome.runtime.onConnect.addListener(function(port) {
    // Store the incoming port as a local variable
    var thisPort = port;
    // Routing system to catch multiple port connections
    if (thisPort.name == "content-script"){
        thisPort.onMessage.addListener(function(message) {
            if (message.text == "Hey event page . . .") {
                console.log(message.text);
                thisPort.postMessage({text: "Yeah content script . . ."});
            } else if (message.text == "What do you think of this port?") { 
                console.log(message.text);
                thisPort.postMessage({text: "It's awesome!"});
            } else if (message.text == "Yeah totally!") {
                console.log(message.text);
            }
        })
        //Send a one-time message to the content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log("sending message to tab: " + tabs[0].url);
            chrome.tabs.sendMessage(tabs[0].id, {type: "EVENT_PAGE", 
                text: "Can you please override the confirm() function sir!"})
        });
    } else if (thisPort.name == "devtools-page") {
        thisPort.onMessage.addListener(function(message) {
           if (message.text == "Hey event page . . .") {
                console.log("recieved message from devtools page");
            }
        })
    }
});

