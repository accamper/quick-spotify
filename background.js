window.console.log('What is noise? Is it background music?');
// TODO This page will only be needed for the chrome.commands.
// TODO Make sure to set the media keys as default. This should be fun.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ? "content" : "extension?");
      console.log(request.ping);
    });
