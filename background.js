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
	  window.console.log('play-pause')
      msg = QuickifyMessages.PLAY_OR_PAUSE;
      break;
    case 'next':
	window.console.log('next')
      msg = QuickifyMessages.NEXT;
      break;
    case 'previous':
	window.console.log('previous')
      msg = QuickifyMessages.PREVIOUS;
      break;
    case 'track-add':
	window.console.log('track-add')
      msg = QuickifyMessages.SAVE;
      break;
    case 'repeat':
	window.console.log('repeat')
      msg = QuickifyMessages.REPEAT;
      break;
    case 'shuffle':
	window.console.log('shuffle')
      msg = QuickifyMessages.SHUFFLE;
      break;
    default:
      window.console.log('CANNOT HANDLE THIS COMMAND: ' + command);
      return;
  }
  
  QuickifySendToContent(msg);
});