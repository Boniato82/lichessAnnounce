var moveLetters = new Array();
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var enabled = null;
var announceId = null;
var sounds = new Array();

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        if (key == 'enabled'){
            enabled = storageChange.newValue
        }
    }
});

var init = function (){
    sounds['R'] = 'Rook.wav'
    sounds['Q'] = 'Queen.wav'
    sounds['N'] = 'Knight.wav'
    sounds['B'] = 'Bishop.wav'
    sounds['K'] = 'King.wav'
    sounds['x'] = 'Takes.wav'
    sounds['a'] = 'A.wav'
    sounds['b'] = 'B.wav'
    sounds['c'] = 'C.wav'
    sounds['d'] = 'D.wav'
    sounds['e'] = 'E.wav'
    sounds['f'] = 'F.wav'
    sounds['g'] = 'G.wav'
    sounds['h'] = 'H.wav'
    sounds['1'] = '1.wav'
    sounds['2'] = '2.wav'
    sounds['3'] = '3.wav'
    sounds['4'] = '4.wav'
    sounds['5'] = '5.wav'
    sounds['6'] = '6.wav'
    sounds['7'] = '7.wav'
    sounds['8'] = '8.wav'
    sounds['O-O'] = 'sc.wav'
    sounds['O-O-O'] = 'lc.wav'
    sounds['+'] = 'Check.wav'
    sounds['#'] = 'Checkmate.wav'

    var config = {
        subtree: true,
        childList: true
    };

    var target = document.querySelector('.replay');

    window.console.log('started');
    observer.observe(target, config);
};

function announceMove () {
    if( moveLetters.length > 0 ){
        file = 'sounds/es/' + sounds[moveLetters[0]]
        console.log(file)
        var audio = new Audio(chrome.extension.getURL(file))
        audio.play()
        moveLetters.shift()
    }
    else {
        clearInterval(announceId);
    }
}


var observer = new MutationObserver(function( mutations ) {
    if ( enabled == false ) { return; }

    lastMove = $(document).find('move.active');

    if ( lastMove != null ) {
        move = lastMove[0].textContent
        if ( move == null ) {
            return;
        }
        if ( move == 'O-O' || move == 'O-O-O' ) {
            moveLetters.push(move);
        }
        else {
            moveLetters = move.split('');
        }
    }

    if ( moveLetters.length > 0 ) {
        announceId = setInterval(function(){ announceMove(); }, 1000);
    }
});

init();

