window.console.log('This is popping!');
QuickifyPopup = {};

QuickifyPopup.handleStatus = function(request, sender, sendResponse) {
  if (request.type != QuickifyMessages.STATUS) return;
  QuickifyPopup.song.textContent = request.song;
  QuickifyPopup.artist.textContent = request.artist;
  QuickifyPopup.setTime(request.currentTime, request.songLength);
  QuickifyPopup.playpauseBtn.classList.toggle('pause', request.isPlaying);
  QuickifyPopup.shuffleBtn.classList.toggle('on', request.isShuffled);
  QuickifyPopup.repeatBtn.classList.toggle('on', request.isRepeated);
  QuickifyPopup.addBtn.classList.toggle('done', request.isSaved);
};

QuickifyPopup.setTime = function(currentTime, songLength) {
  QuickifyPopup.currentTime.textContent = currentTime;
  QuickifyPopup.songLength.textContent = songLength;
  // Parse time to set progress accordingly.
  var parseTime = function(time) {
    var tArr = time.split(':');
    var secs = 0;
    var mult = 1;
    for (var i = tArr.length - 1; i >=0; i--) {
      secs += Number(tArr[i]) * mult;
      mult *= 60;
    }
    return secs;
  };
  var fullWidth = 280;
  var newWidth = (parseTime(currentTime) / parseTime(songLength)) * fullWidth;
  QuickifyPopup.timeProgress.style.width = Math.round(newWidth) + 'px';
  // TODO handle be able to drag/drop time.
};



QuickifyPopup.init = function() {
  QuickifyPopup.song = document.getElementById('song');
  QuickifyPopup.artist = document.getElementById('artist');
  QuickifyPopup.prevBtn = document.getElementById('prev');
  QuickifyPopup.nextBtn = document.getElementById('next');
  QuickifyPopup.playpauseBtn = document.getElementById('playpause');
  QuickifyPopup.addBtn = document.getElementById('add');
  QuickifyPopup.shuffleBtn = document.getElementById('shuffle');
  QuickifyPopup.repeatBtn = document.getElementById('repeat');
  QuickifyPopup.currentTime = document.getElementById('current');
  QuickifyPopup.timeProgress = document.getElementById('progress');
  QuickifyPopup.songLength = document.getElementById('end');
  
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
  chrome.runtime.onMessage.addListener(QuickifyPopup.handleStatus);

  // Notify content we have started.
  QuickifySendToContent(QuickifyMessages.POPUP_ON);
};

QuickifyPopup.exit = function() {
  QuickifySendToContent(QuickifyMessages.POPUP_OFF);
};

window.onload = QuickifyPopup.init;
// TODO: This isn't working, nbd but should figure it out eventually.
window.onbeforeunload = QuickifyPopup.exit;
