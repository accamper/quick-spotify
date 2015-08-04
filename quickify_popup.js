window.console.log('This is popping!');
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ? "content" : "extension?");
      console.log(request.ping);
    });
