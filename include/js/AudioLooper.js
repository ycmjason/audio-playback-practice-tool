function AudioLooper(audio){
  /* initialise playback from/to as soon as audioElem is ready */
  var playback = {from:0, to:audio.getDuration()};

  /* Looping handling */
  var loopBack = function(){
    audio.setCurrentTime(playback.from);
  };
  var startLooping = function(){
    var intervalId = setInterval(function(){
      if(audio.getCurrentTime() > playback.to){
        loopBack();
      }
    }, 1000);
    return function(){
      clearInterval(intervalId);
    };
  };
  var stopLooping = startLooping();

  this.setFrom = function(from){
    if(!audio.isValidTime(from) || playback.to - from < 1) return false;
    playback.from = from;
    if(audio.getCurrentTime() < playback.from){
      loopBack();
    }
    return true;
  };
  this.setTo = function(to){
    if(!audio.isValidTime(to) || to - playback.from < 1) return false;
    playback.to = to;
    if(audio.getCurrentTime() > playback.to){
      loopBack()
    }
    return true;
  };
  this.reset = function(){
    this.setFrom(0);
    this.setTo(audio.getDuration());
  };
  this.getFrom = function(human){
    return playback.from;
  };
  this.getTo = function(human){
    return playback.to;
  };
  this.kill = function(){
    stopLooping();
  };
  this.loopBack = loopBack;
}
