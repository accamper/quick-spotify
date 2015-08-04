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

Quickify.init = function() {
  // TODO
  // Setup listeners for popup open and close.
  // TODO
  // Setup listeners for actions
  Quickify.setIdle(false);  
};


  
Quickify.init();
