window.URL_COUNTER = 3;
// PARAMETERIZE
//1. color scheme (hue) -- interpolate all colors
//2. background color
//3. speed x
//4. speed y
//5. magnitude x 
//6. magnitude y
//7. blur ()
//8. scale



// animate a blur svg shape circles that get blurry when canvas is not
// change size of shapes randomly 
// blobby?
// speed by a lot
// tangent functions? x is tangent y is random
// blend modes
// gradient fills like drwing
// cycle through colors

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
  fillColor: new Color(0, 0.02, 0.29),
  opacity: 0
});

var r = [];
var amount_multiplier = 3;

for (var i = 0; i < sizes.length * amount_multiplier; i++) {
  var rect = new Path.Rectangle(new Point(width * Math.random(), height * Math.random()), sizes[Math.floor(Math.random() * sizes.length)]);
  rect.opacity = getRandom(0.65, 1);
  rect.rotation = 360 * Math.random();
  rect.fillColor = colors[Math.floor(Math.random() * colors.length)];
  rect.blendMode = "lighten";
  rect.smooth();
  r.push(rect);
}


var travel_x = 3
var travel_y = 2;
var scale_x = map(s4.value, 0.5, 2.1);
var scale_y = map(s5.value, 0.2, 1.7);
var scale_x_rate = map(s6.value, 3, 10);
var scale_y_rate = map(s7.value, 7, 15);

// ANIMATE 
function onFrame(event) {
  var t = event.time;  
  
  for (var i = 0; i< r.length; i++) {
    if (i % 2 === 0) {
      if (i % 2 === 0) {
        r[i].position.x -= travel_x * x(i + t / 7);  
      } else {
        r[i].position.x += travel_x * x(t / 7);  
      }      
    } else {
      if (i % 2 === 0) {
        r[i].position.y -= travel_y * x(t / 10);  
      } else {
        r[i].position.y += travel_y * x((t + i) / 10);  
      }
    }    
    r[i].rotate(i * 0.03);
  }
  
  for(it in r) {
    if (i % 2 === 0) {
      r[it].bounds.size.width += scale_x * y(t / scale_x_rate);
      r[it].bounds.size.height += scale_y * y(t / scale_y_rate);
    } else {
      // or could just scale itself
      r[it].bounds.size.width += scale_x * y(t / scale_x_rate);
      r[it].bounds.size.height += scale_y * y(t / scale_y_rate);
    }
  }
}




//INTERACTIONS
var counter = 0;
function onMIDIMessage(message) {
  data = message.data;
  setSliders(data);

  if(data[1] === 0) {
    changeBgOpacity(bg, s0);
  }

  if(data[1] === 1) {
    scaleX(r, s1);
  }

  if(data[1] === 2) {
    scaleY(r, s2);
  }

  if(data[1] === 3) {
    speedX(s3);
  }

  if(data[1] === 4) {
    speedY(s4);
  }

  if(data[1] === 5) {
  }

  if(data[1] === 6) {
    counter++;
    if(counter > 20) {
      cycleColors(r);
      counter = 0;
    }
  }
  
  if(data[1] === 7) {
    changeBlendMode(r, s7);
  }

}


function changeBgOpacity(rect, slider) {
  rect.opacity = map(slider.value, 0, 1);
}

function scaleX(objects, slider) {
  for(var i = 0; i < objects.length; i++) {
    var c = objects[i];
    if(slider.previous_value > slider.value) {
      c.bounds.width *= map(slider.value, 0.99, 0.999);
    } else if (slider.previous_value < slider.value) {
      c.bounds.width *= map(slider.value, 1.001, 1.01);
    }
  }
  scale_x = map(s4.value, 0.5, 3);
}

function scaleY(objects, slider) {
  for(var i = 0; i < objects.length; i++) {
    var c = objects[i];
    if(slider.previous_value > slider.value) {
      c.bounds.height *= map(slider.value, 0.99, 0.999);
    } else if (slider.previous_value < slider.value) {
        c.bounds.height *= map(slider.value, 1.001, 1.01);
    }
  }

  scale_y = map(s5.value, 0.2, 2.5);

}

function speedX(slider) {
  travel_x = map(slider.value, 2.7, 7);
  scale_x_rate = map(s6.value, 3, 10);spmap(s6.value, 3, 10);
}

function speedY(slider) {
  travel_y = map(slider.value, 1.2, 4);
  scale_y_rate = map(s7.value, 7, 15);
}

function changeBlendMode(objects, slider) {
  for(var i = 0; i < objects.length; i++) {
    var c = objects[i];
    if (slider.value >= 63) {
      c.blendMode = 'lighten';
    } else {
      c.blendMode = 'difference';
    }
  }
}

function cycleColors(objects) {
  for (var i = 0; i < objects.length; i++) {
    var c = objects[i];
    var color = randof(colors);
    c.fillColor = color;
    c.strokeColor = color;
  }
}












// PARAMETERIZE
function x(t) {
  return Math.cos(t);
}

function y(t) {
  return Math.sin(t);
}


// WEIRD MIDI STUFF I THINK SHOULDN'T HAVE TO BE INCLUDED
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
      sysex: false
  }).then(onMIDISuccess);
} else {
    alert("No MIDI support in your browser.");
}

function onMIDISuccess(midiAccess) {
  // when we get a succesful response, run this code
  midi = midiAccess; 
  // this is our raw MIDI data, inputs, outputs, and sysex status

  var inputs = midi.inputs.values();
  // loop over all available inputs and listen for any MIDI input
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {      
    input.value.onmidimessage = onMIDIMessage;
  }
}

function randof(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}