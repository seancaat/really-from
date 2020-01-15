window.URL_COUNTER = 0;
var audio = new Audio('audio/1-solitude.mp3');
audio.loop = true;
audio.play();



// PARAMETERIZE
//5. change the x of gravity (view bounds is a wall)
//6. change the y of gravity
// circles can sometimes fall to the ground
// stop physics
// change shadow
// add fkn walls!


// DISPLAY SET UP
$(window).resize(resizeAndRedrawCanvas);
$(document).ready(resizeAndRedrawCanvas);

function resizeAndRedrawCanvas() {
    var desiredWidth = $(window).width();
    var desiredHeight = $(window).height();

    canvas.width = desiredWidth;
    canvas.height = desiredHeight

    view.viewSize = new Size(desiredWidth, desiredHeight);
    view.draw();
}


// PHYSICS SET UP
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Common = Matter.Common,
//    Vertices = Matter.Vertices,
    Render = Matter.Render;

var engine = Matter.Engine.create();

var render = Render.create({
  element: document.body,
  engine: engine,
  visible: false
});

// COORDINATES
var pxRatio = window.devicePixelRatio;
var mid = {x: canvas.width / pxRatio / 2, 
           y: canvas.height / pxRatio / 2};


// var particleSizeCt = 50;
var radii = [13, 21, 34, 55];

// TO HOLD ALL PAPER OBJECTS
var Objects = [];

// ATMOSPHERIC PROPERTIES
var bodyOptions = {
  frictionAir: 0.005,
  friction: 0.8,
  restitution: 0.3,
  isStatic: false
};

engine.world.gravity.scale = 0;

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

function addCircle(x, y, r, isStatic){

  // matterjs
  bodyOptions.isStatic = isStatic;
  World.add(engine.world, Bodies.circle(x, y, r * getRandom(0.1, 1.25), bodyOptions));

  // paperjs
  var circle = new Path.Circle(new Point(x, y), r);
  var color = randof(colors);
  circle.fillColor = color;
  circle.strokeColor = color;
  circle.shadowColor = new Color(0, 0, 0, 0.27);
  circle.shadowBlur = 4;
  circle.shadowOffset = new Point(2,2);
  return circle;
}

// update positions of circles
function boundsCenter(minX, minY, maxX, maxY){
  return new Point((maxX + minX)/2, (maxY + minY)/2);
}

function normalize(vector) {
  var norm = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  return {x: vector.x / norm, 
          y: vector.y / norm};
}


// SET BACKGROUND
var bg = new Path.Rectangle({
  from: [0,0],
  to: view.viewSize,
  fillColor: 'white'
});

// CREATE CIRCLES
for (var i = 0; i < 50; i++) {
  var random = randof(radii);
  Objects.push(addCircle(Math.random() * view.viewSize.width, 
                         Math.random() * view.viewSize.height, 
                         random, 
                         false));   
}






var forceInterval = 2;
// UPDATE PHYSICS 
function onFrame(event) {
  for(it in engine.world.bodies){
    var body = engine.world.bodies[it];
    var render = Objects[it];
    
    // FORCE VECTOR
    var dist_to_center = {x: body.position.x - mid.x, y: body.position.y - mid.y};
    dist_to_center = normalize(dist_to_center);
    dist_to_center = {x: dist_to_center.x * 0.1,
                      y: dist_to_center.y * 0.1};
     
    var forceMagnitude = 0.005 * body.mass;
    
    //BREATHING
    var direction = 0.4;
    if(Math.floor(event.time) % 2 === 0) {
      direction = - 1 * map(s5.value, 1.5, 6) * direction;
    }

    // var direction = -0.4 * Math.sin(event.time) 
    Body.applyForce(body, body.position, {
      x: (forceMagnitude) * direction * dist_to_center.x,
      y: (forceMagnitude) * direction * dist_to_center.y
    });
    
    // paperjs calculates position as the center of the bounding rectangle
    // matterjs calculates position as the centroid of the object
    render.position = boundsCenter(body.bounds.min.x, body.bounds.min.y, body.bounds.max.x, body.bounds.max.y);
  }
}






// INTERACTIONS 
function onMIDIMessage(message) {
  data = message.data;
  setSliders(data);

  if(data[1] === 0) {
    ring(Objects);
  }
  if(data[1] === 1) {
    scale(Objects);
  }

  if(data[1] === 2) {
    makeBlobby(Objects);
  }

  if(data[1] === 3) {
    cycleColors(Objects);
  }

  if(data[1] === 4) {
    shuffleShapes(Objects);
  }

  if(data[1] === 5) {
    //changes the strength of center gravity
    //maybe also smooth/flatten?
  }

  if(data[1] === 6) {
    changeBlendMode(Objects);
  }
  
  if(data[1] === 7) {
    changeBg(bg);
  }

}




// RUN MATTER.JS
Engine.run(engine);
Render.run(render);


console.log(Objects[0].segments);

// INTERACTION FUNCTIONS (change args to hold slider value)
function ring(objects) {
  // VISUAL
  for(var i = 0; i < objects.length; i++) {
    var c = objects[i];
    c.strokeWidth = map(s0.value, 0, c.bounds.width / 12);
    if (c.strokeWidth > Math.min(c.bounds.width/32, c.bounds.height/32)) {
        c.fillColor = 'transparent';
    } else {
        c.fillColor = c.strokeColor;
    }
  }
  // PHYSICS
}

function changeBg(rect) {
    rect.fillColor.brightness = map(s7.value, 0, 1);
}

function makeBlobby(objects) {
  for(var i = 0; i < objects.length; i++) {
    var c = objects[i];

    for(var j = 0; j < c.segments.length; j++) {
      c.segments[j].point.x += (i + 1) * Math.random() * map(s2.value, -0.25, 0.25);
      c.segments[j].point.y -= (i + 1) * Math.random() * map(s2.value, -0.25, 0.25);
    }   

    if( Math.random() < 0.75) {
      c.smooth();
    }
    

  }
}

function changeBlendMode(objects) {
  // VISUAL
  for(var i = 0; i < objects.length; i++) {
    var c = objects[i];
    if (data[1] === 6) {
      if (s6.value >= 63) {
          c.blendMode = 'difference';
      } else {
          c.blendMode = 'normal';
      }
    }
  }

  // PHYSICS
}

function scale(objects) {
  for(var i = 0; i < objects.length; i++) {
    var c = objects[i];
    if(s1.previous_value > s1.value) {
      c.bounds.width *= map(s1.value, 0.99, 0.999);
      c.bounds.height *= map(s1.value, 0.99, 0.999);
    } else if (s1.previous_value < s1.value) {
        c.bounds.width *= map(s1.value, 1.001, 1.01);
        c.bounds.height *= map(s1.value, 1.001, 1.01);
    }
  }
}

function shuffleShapes(objects) {
  for (var i = 0; i < objects.length; i++) {
    var c = objects[i];
    if (Math.random() < 0.499) {
      c.bringToFront();
    }
  }
}

function cycleColors(objects) {
  for (var i = 0; i < objects.length; i++) {
    var c = objects[i];
    var color = randof(colors);
    c.tween({ fillColor: color, strokeColor: color }, {easing: 'easeOutQuad', duration: 200});
  }
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