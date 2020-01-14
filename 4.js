window.URL_COUNTER = 3;
// PARAMETERIZE
//1. color scheme (hue) -- interpolate all colors
//2. background color
//3. speed x
//4. speed y
//5. magnitude x 
//6. magnitude y
//7. blur
//8. scale



// animate a blur shape
//

var audio = new Audio('audio/4-fkku.mp3');
audio.loop = true;
audio.play();


var width = view.viewSize.width;
var height = view.viewSize.height; 

//paramterize blur
var filter = document.getElementsByTagName("feGaussianBlur")[0];
var blur_radius = filter.getAttribute("stdDeviation");

// how to shift through color schemes?
var colors = [
  'rgb(236,112,99)',
  'rgb(155,96,52)',
  'rgb(245,189,75)',
  'rgb(231,231,130)',
  'rgb(234,240,183)',
  'rgb(173,213,167)',
  'rgb(106,183,128)',
  'rgb(109,191,137)',
  'rgb(34,95,62)',
  'rgb(124,199,177)',
  'rgb(106,188,204)',
  'rgb(131,207,240)',
  'rgb(184,209,236)',
  'rgb(62,88,167)',
  'rgb(212,175,207)',
  'rgb(245,219,234)',
  'rgb(250,190,208)',
  'rgb(245,287,203)',
  'rgb(211,3,34)',
  'rgb(90,86,88)',
  'rgb(113,113,113)',
  'rgb(202,202,202)',
];

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

var bg = new Path.Rectangle({
  from: [0,0],
  to: view.viewSize,
  fillColor: new Color(0, 0.02, 0.29)
});

var rectangles = [];

// parameterize this
var amount_multiplier = 3;

for (var i = 0; i < sizes.length * amount_multiplier; i++) {
  var rect = new Path.Rectangle(new Point(width * Math.random(), height * Math.random()), sizes[Math.floor(Math.random() * sizes.length)]);
  rect.opacity = getRandom(0.65, 1);
  rect.rotation = 360 * Math.random();
  rect.fillColor = colors[Math.floor(Math.random() * colors.length)];
  rect.blendMode = "lighten";
  rect.smooth();
  rectangles.push(rect);
}

// ANIMATE 
function onFrame(event) {
  var t = event.time;  
  
  // PARAMETERS
  bg.opacity = map(s1.value, 0, 1);
  
  var travel_x = map(s2.value, 2.7, 5);
  var travel_y = map(s3.value, 1.2, 3);
  var scale_x = map(s4.value, 0.5, 2.1);
  var scale_y = map(s5.value, 0.2, 1.7);
  var scale_x_rate = map(s6.value, 3, 10);
  var scale_y_rate = map(s7.value, 7, 15);
  
  
  for (var i = 0; i< rectangles.length; i++) {
    if (i % 2 === 0) {
      if (i % 2 === 0) {
        rectangles[i].position.x -= travel_x * x(i + t / 7);  
      } else {
        rectangles[i].position.x += travel_x * x(t / 7);  
      }      
    } else {
      if (i % 2 === 0) {
        rectangles[i].position.y -= travel_y * x(t / 10);  
      } else {
        rectangles[i].position.y += travel_y * x((t + i) / 10);  
      }
    }    
    rectangles[i].rotate(i * 0.03);
  }
  
  for(it in rectangles) {
    if (i % 2 === 0) {
      rectangles[it].bounds.size.width += scale_x * y(t / scale_x_rate);
      rectangles[it].bounds.size.height += scale_y * y(t / scale_y_rate);
    } else {
      // or could just scale itself
      rectangles[it].bounds.size.width += scale_x * y(t / scale_x_rate);
      rectangles[it].bounds.size.height += scale_y * y(t / scale_y_rate);
    }
  }
}

// PARAMETERIZE
function x(t) {
  return Math.cos(t);
}

function y(t) {
  return Math.sin(t);
}