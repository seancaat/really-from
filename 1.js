window.URL_COUNTER = 0;
var audio = new Audio('audio/1-solitude.mp3');
audio.loop = true;
audio.play();



// PARAMETERIZE
//1. gradient
//2. scale (some get smaller some get bigger)
//3. shapes become different (circles to collection of rings, triangles, irregular polygons using paper js interpolate to; sorta like paul kelpe)
//4. blend mode
//5. change the x of gravity (view bounds is a wall)
//6. change the y of gravity
//7. halt attraction
//8. add / take away shapes

// things i can change

// circles can sometimes fall to the ground
// sometimes mushy

// shadows are silly. what else can i do?



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
//    Composites = Matter.Composites,
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


var particleSizeCt = 50;

// TO HOLD ALL PHYSICS OBJECTS
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
  World.add(engine.world, Bodies.circle(x, y, r * getRandom(0.1, 1.6), bodyOptions));
  // paperjs
  var circle = new Path.Circle(new Point(x, y), r);
  circle.fillColor = 'white';
  circle.shadowColor = new Color(0, 0, 0, 0.27);
  circle.shadowBlur = 4;
  // param
  circle.shadowOffset = new Point(2,2);
  circle.blendMode = 'multiply';
  return circle;
}

function boundsCenter(minX, minY, maxX, maxY){
  return new Point((maxX + minX)/2, (maxY + minY)/2);
}

function normalize(vector) {
  var norm = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  return {x: vector.x / norm, 
          y: vector.y / norm};
}


// PUTTING STUFF TO THE SCREEN
var bg = new Path.Rectangle({
  from: [0,0],
  to: view.viewSize,
  fillColor: 'black'
});

for (var i = 0; i < 50; i++) {
  var random = Math.random() * particleSizeCt;
  Objects.push(addCircle(Math.random() * view.viewSize.width, Math.random() * view.viewSize.height, random, false));   
}

// ANIMATE 
function onFrame(event) {
  for(it in engine.world.bodies){
    var body = engine.world.bodies[it];
    var render = Objects[it];
    
    
    
    // FORCE VECTOR
    var dist_to_center = {x: body.position.x - mid.x,
                          y: body.position.y - mid.y};
    dist_to_center = normalize(dist_to_center);
    dist_to_center = {x: dist_to_center.x * 0.1,
                      y: dist_to_center.y * 0.1};
     
    var forceMagnitude = 0.005 * body.mass;
    
    //BREATHING
//    var total = 0.7;
    var direction = 0.4;
    if(Math.floor(event.time) % 2=== 0) {
      direction = - 1 * map(s6.value, 1.5, 5) * direction;
    }
    Body.applyForce(body, body.position, {
      x: (forceMagnitude) * direction * dist_to_center.x,
      y: (forceMagnitude) * direction * dist_to_center.y
    });
    
    // paperjs calculates position as the center of the bounding rectangle
    // matterjs calculates position as the centroid of the object
    render.position = boundsCenter(body.bounds.min.x, body.bounds.min.y, body.bounds.max.x, body.bounds.max.y);
  }
  
  for (it in Objects) {
    //COLOR
    bg.opacity = map(s0.value, 0, 0.8);
    Objects[it].fillColor.red = map(s1.value, 0, 1);
    Objects[it].fillColor.green = map(s2.value, 0, 1);
    Objects[it].fillColor.blue = map(s3.value, 0, 1);
    
    //STYLE
    Objects[it].shadowOffset = new Point(map(s4.value, 2, 100),
                                         map(s5.value, 2, 100));
    Objects[it].shadowBlur = 0.4 * map(s4.value, 2, 100);
    
    if(s7.value > 63) {
      Objects[it].fillColor = new Color(Math.random(), Math.random(), Math.random());
    }
  }
}

// INTERACTIONS 

// RUN MATTER.JS
Engine.run(engine);
Render.run(render);