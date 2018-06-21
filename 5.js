window.URL_COUNTER = 4;
var audio = new Audio('audio/5-godspeed.mp3');
audio.loop = true;
audio.play();

var point = new Point(0,0);
var radius = 5;

var num = 18;
var group = [];

for(var i = 0; i < num; i ++) {
  var cir = new Path.Circle(view.center, radius);
  cir.strokeColor = 'white';
  group.push(cir);
}
  

function onFrame(event) {
  var rand_rad = 270 * Math.random();
  var rand_angle = getRandom(0,360);
  var pos = {x: Math.cos(rand_angle * Math.PI / 180) * rand_rad,
             y: Math.sin(rand_angle * Math.PI / 180) * rand_rad};
  
  for(it in group) {
    group[it].position.x = map(s0.value, 0, view.viewSize.width);
    group[it].position.y = map(s1.value, 0, view.viewSize.height);
  }
  
  for(var i = 0; i < num; i ++) { 
//    group[i].
  }
}