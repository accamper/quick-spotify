window.console.log('this is content, quality content');
var Quickify = {};

// Whether we are broadcasting.
Quickify.isIdle = true;

// Variable for broadcasting.
Quickify.broadcastInterval = undefined;

// Time since last popup messaging.
Quickify.age = 0;

// Interval time in ms.
Quickify.interval = 1000;


Quickify.setIdle = function(idle) {
  if (idle == Quickify.isIdle) return;
  Quickify.isIdle = idle;
  if (idle) {
    // Kill broadcasting.
    window.clearInterval(Quickify.broadcastInterval);
    Quickify.broadcastInterval = undefined;
  } else {
    // Start broadcasting.
    Quickify.age = -Quickify.interval;
    Quickify.broadcast();
    Quickify.broadcastInterval = window.setInterval(
        Quickify.broadcast, Quickify.interval);
  }
};


Quickify.broadcast = function() {
  // Set idle if there has been 5min of inactivity with the popup.
  Quickify.age += Quickify.interval;
  if (Quickify.age > 1000 * 60 * 5) {
    Quickify.setIdle(true);
    return;
  }
  // TODO Actually send a relevant message with the current state. Eg. Chosen song, isPlaying.
  chrome.runtime.sendMessage(
      {ping: "pong " + Quickify.age},
      function(response) {});
};


Quickify.log = function(msg) {
  window.console.log('[Quickify] ' + msg);
};


Quickify.playOrPause = function() {
  Quickify.log('play or pause');
};


Quickify.next = function() {
  Quickify.log('next');
};


Quickify.previous = function() {
  Quickify.log('previous');
};


Quickify.mute = function() {
  Quickify.log('mute');
};


Quickify.init = function() {
  // Setup listeners.
  chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        switch (request) {
          case QuickifyMessages.POPUP_ON:
            Quickify.setIdle(false);
            break;
          case QuickifyMessages.POPUP_OFF:
            Quickify.setIdle(true);
            break;
          case QuickifyMessages.PLAY_OR_PAUSE:
            Quickify.playOrPause();
            break;
          case QuickifyMessages.NEXT:
            Quickify.next();
            break;
          case QuickifyMessages.PREVIOUS:
            Quickify.previous();
            break;
          case QuickifyMessages.MUTE:
            Quickify.mute();
            break;
          default:
            Quickify.log("I don't know how to handle this message: " + request);
            break;
        }
      });
  Quickify.setIdle(false);  
};

Quickify.init();
