Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

function getHashValue(){
  return window.location.hash.substr(1);
}
function getHumanTime(timeInSec){
  timeInSec = Math.floor(timeInSec);
  var min = Math.floor(timeInSec/60);
  var sec = timeInSec%60;
  return (min).pad(2)+':'+(sec).pad(2);
}
function parseHumanTime(humanTime){
  // human time: 02:34
  var split = humanTime.split(":");
  var min = parseInt(split[0]);
  var sec = parseInt(split[1]);
  return min*60 + sec;
}
