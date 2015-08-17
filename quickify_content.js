window.console.log('this is content, quality content');
var Quickify = {};

// Whether we are broadcasting.
Quickify.isIdle = true;

// Variable for broadcasting.
Quickify.broadcastInterval = undefined;

// Time since last popup messaging.
Quickify.age = 0;

// Interval time in ms.
Quickify.interval = 700;


Quickify.setIdle = function(idle) {
  if (idle == Quickify.isIdle) return;
  Quickify.log('Set idle to ' + idle);
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
  var statusMsg = {};
  statusMsg.type = QuickifyMessages.STATUS;

  var trackNameDiv = Quickify.getById('track-name');
  var trackArtistDiv = Quickify.getById('track-artist');
  var trackLengthDiv = Quickify.getById('track-length');
  var trackCurrentDiv = Quickify.getById('track-current');
  var trackAddDiv = Quickify.getById('track-add');
  var playPauseDiv = Quickify.getById('play-pause');
  var shuffleDiv = Quickify.getById('shuffle');
  var repeatDiv = Quickify.getById('repeat');

  statusMsg.song = trackNameDiv.textContent;
  statusMsg.artist = trackArtistDiv.textContent;
  statusMsg.songLength = trackLengthDiv.textContent;
  statusMsg.currentTime = trackCurrentDiv.textContent;
  statusMsg.isPlaying = playPauseDiv.classList.contains('playing');
  statusMsg.isShuffled = shuffleDiv.classList.contains('active');
  statusMsg.isRepeated = repeatDiv.classList.contains('active');
  statusMsg.isSaved = repeatDiv.classList.contains('added');

  chrome.runtime.sendMessage(statusMsg);
};


Quickify.log = function(msg) {
  window.console.log('[Quickify] ' + msg);
};


Quickify.getById = function(id) {
  var appPlaya = document.getElementById('app-player');
  var elt = appPlaya && appPlaya.contentDocument.getElementById(id);
  if (!elt) {
    Quickify.log('DID THEY CHANGE THE IDS???? SOMEONE TELL THE DEVELOPER!!!');
  }
  return elt; 
};


Quickify.playOrPause = function() {
  Quickify.log('play or pause');
  Quickify.getById('play-pause').click();
};


Quickify.next = function() {
  Quickify.log('next');
  Quickify.getById('next').click();
};


Quickify.previous = function() {
  Quickify.log('previous');
  Quickify.getById('previous').click();
};


Quickify.save = function() {
  Quickify.log('save');
  Quickify.getById('track-add').click();
};


Quickify.repeat = function() {
  Quickify.log('repeat');
  Quickify.getById('repeat').click();
};


Quickify.shuffle  = function() {
  Quickify.log('shuffle');
  Quickify.getById('shuffle').click();
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
            return;
          case QuickifyMessages.PLAY_OR_PAUSE:
            Quickify.playOrPause();
            break;
          case QuickifyMessages.NEXT:
            Quickify.next();
            break;
          case QuickifyMessages.PREVIOUS:
            Quickify.previous();
            break;
          case QuickifyMessages.SAVE:
            Quickify.save();
            break;
          case QuickifyMessages.REPEAT:
            Quickify.repeat();
            break;
          case QuickifyMessages.SHUFFLE:
            Quickify.shuffle();
            break;
          default:
            Quickify.log("I don't know how to handle this message: " + request);
            return;
        }
        Quickify.broadcast();
      });
};

Quickify.init();
