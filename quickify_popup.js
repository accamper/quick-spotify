window.console.log('This is popping!');
QuickifyPopup = {};

QuickifyPopup.init = function() {
  QuickifyPopup.song = document.getElementById('song');
  QuickifyPopup.artist = document.getElementById('artist');
  QuickifyPopup.prevBtn = document.getElementById('prev');
  QuickifyPopup.nextBtn = document.getElementById('next');
  QuickifyPopup.playpauseBtn = document.getElementById('playpause');
  QuickifyPopup.addBtn = document.getElementById('add');
  QuickifyPopup.shuffleBtn = document.getElementById('shuffle');
  QuickifyPopup.repeatBtn = document.getElementById('repeat');
  
  // Add listeners for buttons.
  QuickifyPopup.prevBtn.addEventListener('click', function() {
    QuickifySendToContent(QuickifyMessages.PREVIOUS);
  });
  QuickifyPopup.nextBtn.addEventListener('click', function() {
    QuickifySendToContent(QuickifyMessages.NEXT);
  });
  QuickifyPopup.playpauseBtn.addEventListener('click', function() {
    QuickifySendToContent(QuickifyMessages.PLAY_OR_PAUSE);
  });
  QuickifyPopup.addBtn.addEventListener('click', function() {
    QuickifySendToContent(QuickifyMessages.SAVE);
  });
  QuickifyPopup.shuffleBtn.addEventListener('click', function() {
    QuickifySendToContent(QuickifyMessages.SHUFFLE);
  });
  QuickifyPopup.repeatBtn.addEventListener('click', function() {
    QuickifySendToContent(QuickifyMessages.REPEAT);
  });

  // Set up update listener.
  chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        // TODO: Handle broadcast.
        console.log(sender.tab ? "content" : "extension?");
        console.log(request.ping);
      });

  // Notify content we have started.
  QuickifySendToContent(QuickifyMessages.POPUP_ON);
};

QuickifyPopup.exit = function() {
  QuickifySendToContent(QuickifyMessages.POPUP_OFF);
};

window.onload = QuickifyPopup.init;
window.onunload = QuickifyPopup.exit;
