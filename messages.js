var QuickifyMessages = {
  PLAY_OR_PAUSE: 'q play/pause',
  NEXT: 'q next',
  PREVIOUS: 'q prev',
  MUTE: 'q mute',
  POPUP_ON: 'q popup on',
  POPUP_OFF: 'q popup off',
  STATUS: 'q status'
};

var QuickifySendToContent = function(msg) {
  chrome.tabs.query({url: 'https://play.spotify.com/*'},
      function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
          chrome.tabs.sendMessage(tabs[i].id, msg);
        };
      });
};
