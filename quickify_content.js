window.console.log('this is content, quality content');

var Quickify = {};

// Whether we are broadcasting.
Quickify.isIdle = true;

// Variable for broadcasting.
Quickify.broadcastInterval = undefined;

// Time since last popup messaging.
Quickify.age = 0;

// Interval time in ms.
Quickify.interval = 400;

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

  var trackNameDiv = document.querySelector(".now-playing-bar div div [href*='/album/']");
  var trackArtistDiv = document.querySelector(".now-playing-bar div div [href*='/artist/']");
  var trackCurrentDiv = document.querySelector(".playback-bar__progress-time");
  var trackLengthDiv = document.querySelectorAll(".playback-bar__progress-time")[1];  
  // var trackRemainingDiv = Quickify.getById('remaining');
  var shuffleDiv = document.querySelector(".spoticon-shuffle-16");
  var repeatDiv = document.querySelector(".spoticon-repeat-16");

  statusMsg.song = trackNameDiv.textContent;  
  statusMsg.artist = trackArtistDiv.textContent;
  statusMsg.songLength = trackLengthDiv.textContent;
  // statusMsg.remainingTime = trackRemainingDiv && trackRemainingDiv.textContent;
  statusMsg.currentTime = trackCurrentDiv.textContent;
  statusMsg.isPlaying = (document.querySelector(".spoticon-pause-16")) ? true : false;
  statusMsg.isShuffled = shuffleDiv.classList.contains("control-button--active");  
  statusMsg.isRepeated = repeatDiv.classList.contains("control-button--active");
  statusMsg.isSaved = (document.querySelector(".spoticon-added-16")) ? true : false;

  chrome.runtime.sendMessage(statusMsg);
};


Quickify.log = function(msg) {

  window.console.log('[Quickify] ' + msg);
};


Quickify.resetAge = function() {
  Quickify.age = 0;
};


Quickify.playOrPause = function() {
  (document.querySelector(".spoticon-play-16") || document.querySelector(".spoticon-pause-16")).click()
};


Quickify.next = function() {
  document.querySelector(".spoticon-skip-forward-16").click();
};


Quickify.previous = function() {
  document.querySelector(".spoticon-skip-back-16").click();
};


Quickify.save = function() {
  (document.querySelector(".spoticon-add-16") || document.querySelector(".spoticon-added-16")).click();
};


Quickify.repeat = function() {
  document.querySelector(".spoticon-repeat-16").click();
};


Quickify.shuffle  = function() {
  document.querySelector(".spoticon-shuffle-16").click();
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
            //Quickify.setIdle(true);
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
        Quickify.resetAge();
        Quickify.broadcast();
      });
};

Quickify.init();
