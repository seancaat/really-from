var midi, data;

var s0 = {value: 1, previous_value: 0};
var s1 = {value: 1, previous_value: 0};
var s2 = {value: 1, previous_value: 0};
var s3 = {value: 1, previous_value: 0};
var s4 = {value: 1, previous_value: 0};
var s5 = {value: 1, previous_value: 0};
var s6 = {value: 1, previous_value: 0};
var s7 = {value: 1, previous_value: 0};

// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}


// midi functions
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

function onMIDIFailure(error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
    data = message.data;
  
    console.log(data);
  
    switch(data[1]) {
      case 0:
        s0.previous_value = s0.value;
        s0.value = data[2];        
        console.log("Slider 1: " + s0.value);
        break;
      case 1:
        s1.previous_value = s1.value;
        s1.value = data[2];
        console.log("Slider 2: " + s1.value);
        break;
      case 2:
        s2.previous_value = s2.value;
        s2.value = data[2];
        console.log("Slider 3: " + s2.value);
        break;
      case 3:
        s3.previous_value = s3.value;
        s3.value = data[2];
        console.log("Slider 4: " + s3.value);
        break;
      case 4:
        s4.previous_value = s4.value;
        s4.value = data[2];
        console.log("Slider 5: " + s4.value);
        break;
      case 5:
        s5.previous_value = s5.value;
        s5.value = data[2];
        console.log("Slider 6: " + s5.value);
        break;
      case 6:
        s6.previous_value = s6.value;
        s6.value = data[2];
        console.log("Slider 7: " + s6.value);
        break;
      case 7:
        s7.previous_value = s7.value;
        s7.value = data[2];
        console.log("Slider 8: " + s7.value);
        break;
      case 58:
      case 43:
        if(window.URL_COUNTER === 0) {
          window.location = window.URLS[4];
          return;
        } else {
          window.URL_COUNTER = window.URL_COUNTER - 1;
          window.location = window.URLS[window.URL_COUNTER];
        }
        break;
      case 59:
      case 44:
        if(window.URL_COUNTER === 4) {
          window.location = window.URLS[0];
          return;
        } else {
          window.URL_COUNTER = window.URL_COUNTER + 1;
          window.location = window.URLS[window.URL_COUNTER];
        }
        break;
      case 41:
        // play button
        location.reload();
        break;
    }
}
 
//  map from value from [a,b] to [c,d], where a,b = 0,127
//  becasue all sliders go from 0 to 127
function map(value, c, d) {
  return (value - 0) * (d - c) / (127 - 0) + c;
}






