function Audio($audioElem){
  // $audioElem should be $('...')
  if ($audioElem.length!=1){
    console.log('given audio elem.length!=1.');
    return;
  }

  this.getElem = function(){
    return $audioElem;
  };
  this.isPlaying = function(){
    return !$audioElem.prop('paused')
  };
  this.play = function(){
    $audioElem.trigger('play');
  };
  this.pause = function(){
    $audioElem.trigger('pause');
  };
  this.getDuration = function(){
    return $audioElem.prop('duration');
  };
  this.getCurrentTime = function(){
    return $audioElem.prop('currentTime');
  };
  this.setCurrentTime = function(time){
    $audioElem.prop('currentTime', time);
  };
  this.isValidTime = function(time){
    return 0 <= time && time <= this.getDuration();
  }
  this.changeSource = function(path, progresscb, donecb){
    $audioElem.children('source').prop('src', path);
    $audioElem.trigger('load');
    if(progresscb && $.isFunction(progresscb)){
      this.on('progress', progresscb)
    }
    if(donecb && $.isFunction(donecb)){
      this.on('loadedmetadata', donecb);
    }
  };
  this.on = function(event, handler){
    $audioElem.on(event, handler);
  };
}
