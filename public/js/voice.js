var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//let colors = ['purple', 'yellow'];
let isListening = false;

var recognition = new SpeechRecognition();
if (SpeechGrammarList) {
    // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
    // This code is provided as a demonstration of possible capability. You may choose not to use it.
    // var speechRecognitionList = new SpeechGrammarList();
    // var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
    // speechRecognitionList.addFromString(grammar, 1);
    // recognition.grammars = speechRecognitionList;
}

recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.input');
var colorHTML = '';
// colors.forEach(function (v, i, a) {
//     colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
// });


function indicateListen(state) {
    const body = document.getElementsByTagName('body')
    const lbutton = document.getElementById('listen-button')
    if (state) {
        body[0].classList.remove("nolisten");
        body[0].classList.add("listen");
        lbutton.classList.add("listening");
    } else {
        body[0].classList.remove("listen");
        body[0].classList.add("nolisten");
        lbutton.classList.remove("listening");

    }
}

const listen = document.getElementById('listen-button');
listen.onclick = function () {
    if (document.body.classList.contains('nolisten')) {
        recognition.start();
        indicateListen(true)
    }
    else
    {
        recognition.abort();
        recognition.stop();
        indicateListen(false)
    }
}


// Catch voice
recognition.onresult = function (event) {
    console.log(event)
    console.log('Confidence: ' + event.results[0][0].confidence);
    console.log(event.results[0][0].transcript)
    matchIt(event.results[0][0].transcript);
}

recognition.onspeechend = function () {
    recognition.stop();
    const button = document.getElementById('listen-button');
    button.click();
    handleSend()
}

recognition.onerror = function (event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
    indicateListen(false)
}

