window.URL_COUNTER = 2;
var audio = new Audio('audio/3-quarrel.mp3');
audio.loop = true;
audio.play();



// PARAMETERIZE
// 1. shapes can become gradient of black and transparent 

// 4. speed + skew?

// 6. warp text / cycle through fonts randomly
var fontClasses = ["sans-serif","serif","system-sans-serif","system-serif","code","courier","helvetica","avenir","athelas","georgia","times","bodoni mt","calisto mt","garamond","baskerville"];

// 8. trigger marquee text

// 10. blend mode
// 11. change top and bottom segment lengths? maybe too irregular for teh vibe

// 

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
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(290, 297)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(287, 312)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(287, 307)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(296, 224)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(156, 146)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(159, 157)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(147, 148)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(69, 72)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(77, 76)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(73, 73)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(17, 16)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(18, 16)),
      new Rectangle(new Point(Math.random() * width, Math.random() * height), new Size(16, 17))
];

var amount_multiplier = 2;

var rect = new Path.Rectangle(view.center, new Size(1,1));
    rect.fillColor = 'black';
    rect.opacity = 1;
var rectSymbol = new SymbolDefinition(rect);

var redShadow = new Path.Rectangle(view.center, new Size(1,1));
    redShadow.fillColor = 'red';
    redShadow.opacity = 1;
var shadowSymbol = new SymbolDefinition(redShadow);

var r = [];
var rs = [];

for (var i = 0; i < sizes.length * amount_multiplier; i++) {
  var shadowInstance = new SymbolItem(redShadow);
  var instance = new SymbolItem(rectSymbol);

  shadowInstance.fitBounds(sizes[i], true);
  instance.fitBounds(sizes[i], true);

  rs.push(shadowInstance);
  r.push(instance);
}


var translate_speed_q = 30;
bg.opacity = 0;

var quote_opacity =  document.getElementById("quote-p").style.opacity;
var top_opacity = document.getElementById("top-p").style.opacity = "0.3";
var bottom_opacity = document.getElementById("bottom-p").style.opacity = "0.3";

function onFrame(event) {
  
  for (var i = 0; i < r.length; i++) {
    var item = r[i];
    var shadowItem = rs[i];

    item.position.x += item.bounds.width / translate_speed_q;
    item.position.y += 0.17 * Math.sin(i + event.time / 20);
    
    shadowItem.position.x += shadowItem.bounds.width / translate_speed_q;
    shadowItem.position.y += 0.17 * Math.sin(i + event.time / 20);
    
    if (item.bounds.left > view.size.width) {
        item.position.x = -item.bounds.width;
        item.position.x = -item.bounds.width;

        shadowItem.position.x = -shadowItem.bounds.width;
        shadowItem.position.x = -shadowItem.bounds.width;
    }
  }
}

var counter = 0;
function onMIDIMessage(message) {
  data = message.data;
  setSliders(data);

  if(data[1] === 0) {
    changeOpacity(r, s0);
  }

  if(data[1] === 1) {
    moveShadowX(rs, s1);
  }

  if(data[1] === 2) {
    moveShadowY(rs, s2);
  }

  if(data[1] === 3) {
    changeSpeed(s3);
  }

  if(data[1] === 4) {
    scale(r, s4);
    scale(rs, s4);
  }

  if(data[1] === 5) {
    changeOpacity(rs, s5);
  }

  if(data[1] === 6) {
    counter++;
    if(counter > 5) {
      changeFonts();
      counter = 0;
    }
    
  }
  
  if(data[1] === 7) {
    changeBgOpacity(bg, s7);
  }

}


// INTERACTION FUNCTIONS (change args to hold slider value)

function changeSpeed(slider) {
  translate_speed_q = map(slider.value, 30, 120)
}

function scale(objects, slider) {
  for(var i = 0; i < objects.length; i++) {
    var c = objects[i];
    if(slider.previous_value > slider.value) {
      // c.bounds.width *= map(slider.value, 0.99, 0.999);
      c.bounds.height *= map(slider.value, 0.99, 0.999);
    } else {
        // c.bounds.width *= map(slider.value, 1.001, 1.01);
        c.bounds.height *= map(slider.value, 1.001, 1.01);
    }
  }
}

function changeBgOpacity(rect, slider) {
  rect.opacity = map(slider.value, 0, 1);
}

function changeOpacity(objects, slider) {
  for(var i = 0; i < objects.length; i++) {
    objects[i].opacity = map(slider.value, 0.4, 1);
  }
  
  
}

function moveShadowX(objects, slider) {
  for(var i = 0; i < objects.length; i++) {
    if(slider.previous_value > slider.value) {
      objects[i].position.x += objects[i].bounds.width * 0.01;
    } else {
      objects[i].position.x -= objects[i].bounds.width * 0.01;
    }
  }
  
}

function moveShadowY(objects, slider) {
  for(var i = 0; i < objects.length; i++) {
    if(slider.previous_value > slider.value) {
      objects[i].position.y -= objects[i].bounds.height * 0.005;
    } else {
      objects[i].position.y += objects[i].bounds.height * 0.005;
    }
  }
}

function changeFonts() {
  document.getElementById("top-p").style.fontFamily = randof(fontClasses);
  document.getElementById("quote-p").style.fontFamily = randof(fontClasses);
  document.getElementById("bottom-p").style.fontFamily = randof(fontClasses);
}









// WEIRD MIDI STUFF I THINK SHOULDN'T HAVE TO BE INCLUDED
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
      sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
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