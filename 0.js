
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









var width = view.size.width;
var height = view.size.height;
var mid = new Point(width/2, height/2);
var toPath = new Path.Rectangle(mid, new Size(300, 200));
var fromPath = new Path.Circle(mid, 100, 100)

// things to try
// s0 change to ring
// s1 interpolate to other shapes
// s2 change to pie
// s3 cycle through gradient
// s4 make them blobby

var bg = new Path.Rectangle(new Point(0,0), view.size);
bg.fillColor = 'white';

var circles = [];

var c = new Path.Circle(mid, 100, 100);
c.fillColor = 'orange';
c.strokeColor = 'orange';
c.strokeScaling = false;

console.log(c.fillColor.hue);

function onMIDIMessage(message) {
    data = message.data;
    setSliders(data);

    // circle to ring
    c.strokeWidth = map(s0.value, 0, c.bounds.width / 16);
    if (c.strokeWidth > Math.min(c.bounds.width/32, c.bounds.height/32)) {
        c.fillColor = 'transparent';
    } else {
        c.fillColor = 'orange';
    }

    // color (interpolate through palette? which would entail )
    // c.fillColor.hue = map(s1.value, 0, 360);
    // c.strokeColor.hue = map(s1.value, 0, 360);

    // make em blobby
    if(data[1] === 2) {
        for(var i = 0; i < c.segments.length; i++) {
            c.segments[i].point.x += (i + 1) * Math.random() * map(s2.value, -0.25, 0.25);
            c.segments[i].point.y -= (i + 1) * Math.random() * map(s2.value, -0.25, 0.25);
        }    
    }
    
    // interpolate da shapes; randomly select a shape to interpolate to, always back to circle
    if(data[1] === 3) {
        if (s3.value >= s3.previous_value) {
            c.interpolate(c, toPath, map(s3.value, 0.25, 0.75));
        } else {
            c.interpolate(c, fromPath, map(s3.value, 0.25, 0.75));
        }
    }
    
    // background color
    if (data[1] === 7) {
        bg.fillColor.brightness = map(s7.value, 0, 1);
    }

    // change the blend mode
    if (data[1] === 6) {
        if (s6.value >= 63) {
            c.blendMode = 'difference';
        } else {
            c.blendMode = 'normal';
        }
    }

    if (data[1] === 1) {
        if(s1.previous_value > s1.value) {
            c.bounds.width *= map(s1.value, 0.99, 0.999);
            c.bounds.height *= map(s1.value, 0.99, 0.999);
            console.log("going down")
        } else if (s1.previous_value < s1.value) {
            c.bounds.width *= map(s1.value, 1.001, 1.01);
            c.bounds.height *= map(s1.value, 1.001, 1.01);
            console.log("going up")
        }
    }

    //resize via tween
    // for all shapes on the screen, 
    

}

function makeCircle() {

}