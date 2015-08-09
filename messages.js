var QuickifyMessages = {
  PLAY_OR_PAUSE: 'q play/pause',
  NEXT: 'q next',
  PREVIOUS: 'q prev',
  SAVE: 'q save',
  REPEAT: 'q repeat',
  SHUFFLE: 'q shuffle',
  POPUP_ON: 'q popup on',
  POPUP_OFF: 'q popup off',
  STATUS: 'q status'
};

var QuickifySendToContent = function(msg) {
  chrome.tabs.query({url: 'https://play.spotify.com/*'},
      function(tabs) {
        // Open a spotify tab if one does not exist yet.
        if (tabs.length === 0) {
          chrome.tabs.create({url: 'https://play.spotify.com'},
            function onCreated(tab) {
              chrome.tabs.sendMessage(tab.id, msg);
            });
        }
        for (var i = 0; i < tabs.length; i++) {
          chrome.tabs.sendMessage(tabs[i].id, msg);
        };
      });
};
