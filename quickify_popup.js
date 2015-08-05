window.console.log('This is popping!');
QuickifySendToContent(QuickifyMessages.POPUP_ON);
QuickifySendToContent(QuickifyMessages.PLAY_OR_PAUSE);
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ? "content" : "extension?");
      console.log(request.ping);
    });
