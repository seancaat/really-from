
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

// things to try
// interpolate shapes
// s1 change to ring
// s2 change to pie
// s3 cycle through gradient

var c = new Path.Circle(mid, 100, 100);
c.fillColor = 'orange';    
c.strokeColor = 'black';

function onMIDIMessage(message) {
    data = message.data;
    setSliders(data);
    console.log("s0 value in 0.js: " + s0.value);
}