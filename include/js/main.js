var audio = new Audio($('audio'));
var changeAudio = (function(){
  var audioLooper;
  return function(path){
    if(audioLooper){
      audioLooper.kill();
    }

    audio.changeSource(path, function(){
      $('playback_options').hide(); 
      $('loading_message').show();
    }, function(){
      $('loading_message').hide();
      $('playback_options').show(); 

      audioLooper = new AudioLooper(audio);

      $exactFrom = $('.playback_options .exact .from');
      $exactFrom.children('.time').val(getHumanTime(audioLooper.getFrom()));
      $exactTo = $('.playback_options .exact .to');
      $exactTo.children('.time').val(getHumanTime(audioLooper.getTo()));

      $exactFrom.children('.leftshift').click(function(){
        audioLooper.setFrom(audioLooper.getFrom()-1);
      });
      $exactFrom.children('.time').change(function(){
        audioLooper.setFrom(parseHumanTime($(this).val()));                 
        $(this).val(getHumanTime(audioLooper.getFrom()));
      })
      $exactFrom.children('.rightshift').click(function(){
        audioLooper.setFrom(audioLooper.getFrom()+1);
      });
      $exactFrom.children('.leftshift, .rightshift').click(function(){
        $(this).siblings('.time').val(getHumanTime(audioLooper.getFrom()));
      });

      $exactTo.children('.leftshift').click(function(){
        audioLooper.setTo(audioLooper.getTo()-1);
      });
      $exactTo.children('.time').change(function(){
        audioLooper.setTo(parseHumanTime($(this).val()));                 
        $(this).val(getHumanTime(audioLooper.getTo()));
      })
      $exactTo.children('.rightshift').click(function(){
        audioLooper.setTo(audioLooper.getTo()+1);
      });
      $exactTo.children('.leftshift, .rightshift').click(function(){
        $(this).siblings('.time').val(getHumanTime(audioLooper.getTo()));
      });
      

      $('.playback_options .approximate .from').click(function(){
        var time = audio.getCurrentTime();
        if(audioLooper.setFrom(time)){
          $exactFrom.children('.time').val(getHumanTime(time));
        }
      });

      $('.playback_options .approximate .to').click(function(){
        var time = audio.getCurrentTime();
        if(audioLooper.setTo(time)){
          audioLooper.loopBack();
          $exactTo.children('.time').val(getHumanTime(time));
        }
      });

      $('.playback_options .reset').click(function(){
        audioLooper.reset();
        $exactFrom.children('.time').val(getHumanTime(audioLooper.getFrom()));
        $exactTo.children('.time').val(getHumanTime(audioLooper.getTo()));
      });

    });
  };
})();

/* track hash change */
(window.onhashchange = function(){
  changeAudio(getHashValue());
})();

/* track keyboard events */
$(window).keydown(function(event){
  SPACEBAR   = 32;
  LEFTARROW  = 37;
  RIGHTARROW = 39;
  switch(event.keyCode){
    case SPACEBAR:
      if(audio.isPlaying()){
        audio.pause();
      }else{
        audio.play();
      }
      break;
    case LEFTARROW:
      audio.setCurrentTime(audio.getCurrentTime()-3)
      break;
    case RIGHTARROW:
      audio.setCurrentTime(audio.getCurrentTime()+3)
      break;
  }
});