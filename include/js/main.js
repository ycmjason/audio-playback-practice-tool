var audio = new Audio($('audio'));
var audioLooper = new AudioLooper(audio);
var isValidPath = function(path){
  path = '#'+path;
  return navItems.map(function(item){return item.href;}).indexOf(path) > -1;
}
var changeAudio = function(path){
  audioLooper.kill();
  audio.changeSource(path, function(){
    $('.playback_options').hide(); 
    if(isValidPath(path)){
      $('.message').html('Loading...').show();
    }else{
      $('.message').html('Please select a file from the above.').show();
    }
  }, function(){
    $('.message').hide();
    $('.playback_options').show(); 
    audioLooper = new AudioLooper(audio);
    $('.playback_options .exact .from').children('.time')
                            .val(getHumanTime(audioLooper.getFrom()));
    $('.playback_options .exact .to').children('.time')
                            .val(getHumanTime(audioLooper.getTo()));
  });
};

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
      if(event.metaKey){
        event.preventDefault();
        audioLooper.loopBack();
      }else{
        audio.setCurrentTime(audio.getCurrentTime()-3)
      }
      break;
    case RIGHTARROW:
      audio.setCurrentTime(audio.getCurrentTime()+3)
      break;
    default:
      return;
  }
  event.preventDefault();
});

$(window).load(function(){
  $('html, body').fadeIn(1000);
});

$exactFrom = $('.playback_options .exact .from');
$exactTo = $('.playback_options .exact .to');

$exactFrom.children('.leftshift').click(function(){
  audioLooper.setFrom(audioLooper.getFrom()-1);
  console.log('hi');
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

$('.playback_options .loop').click(function(){
  audioLooper.loopBack();
});
