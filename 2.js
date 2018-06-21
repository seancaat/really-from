window.URL_COUNTER = 1;
var audio = new Audio('audio/2-grown-ass.mp3');
audio.loop = true;
audio.play();



var tv1 = new Raster('http://res.cloudinary.com/s3ancat/image/upload/v1524110946/tv1.png');
var scale1 = 0.6;
tv1.scale(scale1);
tv1.position.x = view.center.x + scale1 * tv1.size.width / 2;
tv1.position.y = view.center.y + scale1 * tv1.size.height / 2;
var clones = 12;
var angle = 360 / clones;
for(var i = 0; i < clones; i++) {
	var clonedTV = tv1.clone();
	clonedTV.rotate(angle * i, tv1.bounds.topLeft);
};


var v_window1 = new Raster('http://res.cloudinary.com/s3ancat/image/upload/v1524111699/v-window1.png');
var scale1 = 0.55;
v_window1.scale(scale1);
v_window1.position.x = view.center.x + scale1 * tv1.size.width / 2;
v_window1.position.y = view.center.y + scale1 * tv1.size.height / 2;
var clones = 16;
var angle = 360 / clones;
for(var i = 0; i < clones; i++) {
	var clonedTV = v_window1.clone();
	clonedTV.rotate(angle * i, tv1.bounds.topLeft);
};






var v_window = new Raster('http://res.cloudinary.com/s3ancat/image/upload/v1524111699/v-window.png');
var scale1 = 0.55;
v_window.scale(scale1);
v_window.position.x = view.center.x + scale1 * tv1.size.width / 2;
v_window.position.y = view.center.y + scale1 * tv1.size.height / 2;
var clones = 16;
var angle = 360 / clones;
for(var i = 0; i < clones; i++) {
	var clonedTV = v_window.clone();
	clonedTV.rotate(angle * i, tv1.bounds.topLeft);
};



//vectors

//var point = new Point(0, view.center.y - 10);
//var size = new Size(view.size.width * 0.7, 120);
//var r1 = new Path.Rectangle(point, size);
//r1.strokeColor = 'green';
//r1.position = view.center;
//
//size = new Size(view.size.width * 0.55, view.size.width * 0.3);
//var r2 = new Path.Rectangle(point, size);
//r2.strokeColor = 'blue';
//r2.position = view.center;
//
//size = new Size(view.size.width * 0.35, view.size.width * 0.5);
//var r2 = new Path.Rectangle(point, size);
//r2.strokeColor = 'red';
//r2.position = view.center;





var tv0 = new Raster('http://res.cloudinary.com/s3ancat/image/upload/v1524110946/tv0.png');
var scale0 = 0.3;
tv0.scale(scale0);
tv0.position.x = view.center.x + scale0 * tv0.size.width / 2;
tv0.position.y = view.center.y + scale0 * tv0.size.height / 2;
clones = 12;
var angle = 360 / clones;
for(var i = 0; i < clones; i++) {
	var clonedTV = tv0.clone();
	clonedTV.rotate(angle * i, tv0.bounds.topLeft);
};

var children = project.activeLayer.children;

function onFrame(event) {
  for (var i = 0; i < children.length; i++) {
	var child = children[i];
    if (i % 2 === 0) {
      child.rotate(1);
    } else {
      child.rotate(-2);
    } 
  }
}