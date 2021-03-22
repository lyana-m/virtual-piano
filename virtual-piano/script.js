const piano = document.querySelector('.piano'),
  pianoKeys = document.querySelectorAll('.piano-key');
let isMouseDown;

function addFlag() {
  isMouseDown = true;
}

function removeFlag() {
  isMouseDown = false;
}

function playAudio(event) {
  let note = event.target.getAttribute('data-note');
  const audio = document.querySelector(`audio[data-note="${note}"]`);
  if (isMouseDown) {
    audio.currentTime = 0;
    audio.play();
  }
}

function addClassActive(event) {
  if (isMouseDown) {
    let key = event.target;
    key.classList.add('piano-key-active');
    key.classList.add('piano-key-active-pseudo');
  }
}

function removeClassActive(event) {
  let key = event.target;
  key.classList.remove('piano-key-active');
  key.classList.remove('piano-key-active-pseudo');
}

document.addEventListener('mouseup', removeFlag);
pianoKeys.forEach(key => {
  key.addEventListener('mousedown', addFlag);
  key.addEventListener('mousedown', playAudio);
  key.addEventListener('mousedown', addClassActive);
  key.addEventListener('mouseup', removeClassActive);
  key.addEventListener('mouseout', removeClassActive);
  key.addEventListener('mouseover', addClassActive);
  key.addEventListener('mouseover', playAudio);
});

//

const btnContainer = document.querySelector('.btn-container');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

btnContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-letters')) {
    pianoKeys.forEach(key => key.classList.add('piano-key-letter'));
    btnLetters.classList.add('btn-active');
    btnNotes.classList.remove('btn-active');
  } else {
    pianoKeys.forEach(key => key.classList.remove('piano-key-letter'));
    btnNotes.classList.add('btn-active');
    btnLetters.classList.remove('btn-active');
  }
});

function playAudioOnKeyboard(event) {
  if (event.repeat) {
    return;
  }
  const audio = document.querySelector(`audio[data-key="${event.code}"]`);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

function addClassActive2(event) {
  let key = document.querySelector(`[data-letter=${event.key.toUpperCase()}]`);
  if (key) {
    key.classList.add('piano-key-active');
    key.classList.add('piano-key-active-pseudo');
  }
}

function removeClassActive2(event) {
  let key = document.querySelector(`[data-letter=${event.key.toUpperCase()}]`);
  if (key) {
    key.classList.remove('piano-key-active');
    key.classList.remove('piano-key-active-pseudo');
  }
}

window.addEventListener('keydown', playAudioOnKeyboard);
window.addEventListener('keydown', addClassActive2);
window.addEventListener('keyup', removeClassActive2);



function activateFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen(); // W3C spec
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen(); // Firefox
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(); // Safari
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen(); // IE/Edge
  }
}

function deactivateFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

const fullscreenBtn = document.querySelector('.fullscreen');

fullscreenBtn.addEventListener('click', () => {
  if (document.fullscreenElement || document.webkitFullscreenElement ||
    document.mozFullScreenElement) {
    deactivateFullscreen();
  } else {
    activateFullscreen(document.documentElement);
  }
});