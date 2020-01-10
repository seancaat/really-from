window.URL_COUNTER = 2;
var audio = new Audio('audio/3-quarrel.mp3');
audio.loop = true;
audio.play();


// PARAMETERIZE
//1.
//2. 
//3. 
//4. 
//5. 
//6. 
//7. 
//8. 

// rectangles could flicker their shapes
// text could move


//console.log
var width = view.size.width;
var height = view.size.height;

var bg = new Path.Rectangle({
  from: [0,0],
  to: view.viewSize,
  fillColor: 'black'
});

var sizes = [
      new Size(290, 297),
      new Size(287, 312),
      new Size(287, 307),
      new Size(296, 224),
      new Size(156, 146),
      new Size(159, 157),
      new Size(147, 148),
      new Size(69, 72),
      new Size(77, 76),
      new Size(73, 73),
      new Size(17, 16),
      new Size(18, 16),
      new Size(16, 17)
    ];
var amount_multiplier = 2;

var r = [];

for (var i = 0; i < sizes.length * amount_multiplier; i++) {
  var a = 1;
  if(i < Math.floor(sizes.length * amount_multiplier / 2)) {
    a = 2;
  }
  var rect = new Path.Rectangle(new Point(width * Math.random(),
                                          height * Math.random() / a), sizes[Math.floor(Math.random() * sizes.length)]);
  rect.fillColor = 'black';
  rect.shadowColor = new Color(1,0,0,0.2);
  rect.shadowOffset = new Point(-15,15);
  rect.opacity = 0.4;
  r.push(rect);
}

function onFrame(event) {
  var quote_opacity =  document.getElementById("quote-p").style.opacity;
  var top_opacity = document.getElementById("top-p").style.opacity = "0.3";
  var bottom_opacity = document.getElementById("bottom-p").style.opacity = "0.3";
  
  
//  var to_tmp = map(s4.value, 0.1, 0.9);
//  var bo_tmp = map(s4.value, 0.1, 0.9);
//  var qo_tmp = 1 - map(s4.value, 0.1, 0.9);
  
  
  var shadow_off_x = -1*map(s0.value, 0.5, 35);
  var shadow_off_y = map(s1.value, 0.5, 35);
  var square_opacity = map(s2.value, 0.3, 0.98);
  var translate_speed_q = map(s3.value, 30, 120);
  bg.opacity = map(s5.value, 0, 1);
  var shadow_opacity = map(s6.value, 0.4, 1);
  var rotation = map(s7.value, 0, 0.4);
  
  
  for (var i = 0; i < r.length; i++) {
    var item = r[i];
    
    
    item.shadowColor = new Color(1, 0, 0, shadow_opacity);
    
    item.opacity = square_opacity;
    item.shadowOffset = new Point(shadow_off_x,shadow_off_y);
    item.position.x += item.bounds.width / translate_speed_q;
    item.position.y += 0.17 * Math.sin(i + event.time / 20);
    
    if(i % 2 === 0) {
      item.rotate(-rotation);
    } else {
      item.rotate(rotation);
    }
    

    if (item.bounds.left > view.size.width) {
        item.position.x = -item.bounds.width;
    }
  }
}


//var txt = "If those whom we begin to love could know us as we were before meeting them … they could perceive what they have made of us.";
//var i = 0;
//var speed = 50;
//
//function typeWriter() {
//  if (i < txt.length) {
//    document.getElementById("top-p").innerHTML += txt.charAt(i);
//    i++;
//    setTimeout(typeWriter, speed);
//  }
//}