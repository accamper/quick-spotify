window.console.log('What is noise? Is it background music?');
// On install make sure to refresh all spotify pages. 
chrome.runtime.onInstalled.addListener(function(details) {
  chrome.tabs.query({url: QuickifyUrl},
    function(tabs) {
      // Refresh spotify tabs.
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.reload(tabs[i].id);
      };
    });
});
// This page is only needed for the chrome.commands.
chrome.commands.onCommand.addListener(function(command) {
  var msg = '';
  switch (command) {
    case 'play-pause':
      msg = QuickifyMessages.PLAY_OR_PAUSE;
      break;
    case 'next':
      msg = QuickifyMessages.NEXT;
      break;
    case 'previous':
      msg = QuickifyMessages.PREVIOUS;
      break;
    case 'track-add':
      msg = QuickifyMessages.SAVE;
      break;
    case 'repeat':
      msg = QuickifyMessages.REPEAT;
      break;
    case 'shuffle':
      msg = QuickifyMessages.SHUFFLE;
      break;
    default:
      window.console.log('CANNOT HANDLE THIS COMMAND: ' + command);
      return;
  }
  
  QuickifySendToContent(msg);
});

