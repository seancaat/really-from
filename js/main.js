var urls = ["scratch.html", "index.html", "3.html", "4.html"];

console.log(window.location.pathname)
function onMIDIMessage(message) {
    data = message.data;
    setSliders(data);

    // console.log(data[1]);

    //go back
    if (data[1] === 58) {
        switch(window.location.pathname) {
            // scratch
            case '/' + urls[0]:
                window.location.href = "/" + urls[1];
                break;

            case '/':
                window.location.href = "/" + urls[3];
                break;

            case '/' + urls[1]:
                window.location.href = "/" + urls[3];
                break;
            case '/' + urls[2]:
                window.location.href = "/" + urls[1];
                break;
            case '/' + urls[3]:
                window.location.href = "/" + urls[2];
                break;
        }
    }

    //go forward
    if (data[1] === 59) {
        switch(window.location.pathname) {
          
            case '/' + urls[0]:
                window.location.href = "/" + urls[1];
                break;

            case '/':
                window.location.href = "/" + urls[2];
                break;

            case '/' + urls[1]:
                window.location.href = "/" + urls[2];
                break;
            case '/' + urls[2]:
                window.location.href = "/" + urls[3];
                break;
            case '/' + urls[3]:
                window.location.href = "/" + urls[1];
                break;
        }
    }

    if(data[1] === 46) {
        // window.location.reload();
        window.location.href = window.location.href;
    }
};








function refreshPage() {}

function pauseAnimation() {}


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

// OPS
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

