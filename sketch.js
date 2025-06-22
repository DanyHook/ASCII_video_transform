/*
----- Coding Tutorial by Patt Vira ----- 
Name: ASCII Art (with Video)
Video Tutorial: https://youtu.be/4IyeLc6J1Uo

Connect with Patt: @pattvira
https://www.pattvira.com/
----------------------------------------
*/

const asciiChar =
  "◼︎♦︎$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,^`'. ";
// const asciiChar = " .:-=+*#%@";

let video;
const size = 4;

let recorder;
let recordedChunks = [];
let isRecording = false;
let recordBtn;
let stopBtn;
let canvas;

function setup() {
  canvas = createCanvas(720, 1280);
  canvas.elt.getContext('2d', { willReadFrequently: true });
  textFont('Courier New'); // Fuente monotipo tipo ASCII


  recordBtn = select('#startRec');
  stopBtn = select('#stopRec');
  recordBtn.mousePressed(startRecording);
  stopBtn.mousePressed(stopRecording);

  video = createCapture({ video: true, audio: true }, videoLoaded);
  video.size(width / size, height / size);
  video.hide(); // hides the original video
}

function videoLoaded() {
  video.volume(0);
}

function mousePressed() {
  video.play(); // video playback starts explicitly on user interaction
}

function draw() {
  background(0);
  video.loadPixels();

  for (let i = 0; i < video.width; i++) {
    for (let j = 0; j < video.height; j++) {
      let pixelIndex = (i + j * video.width) * 4;
      let r = video.pixels[pixelIndex + 0];
      let g = video.pixels[pixelIndex + 1];
      let b = video.pixels[pixelIndex + 2];

      let bright = (r + g + b) / 3;
      let tIndex = floor(map(bright, 0, 255, 0, asciiChar.length - 1));

      let x = i * size + size / 2;
      let y = j * size + size / 2;
      let t = asciiChar.charAt(tIndex);

      fill(0, 255, 0);
      noStroke();
      textSize(size);
      textAlign(CENTER, CENTER);
      text(t, x, y);
    }
  }
}

function startRecording() {
  if (isRecording) return;
  recordedChunks = [];
  const stream = canvas.elt.captureStream(30);
  // Add audio from the video element if available
  const audioTracks = video.elt.srcObject
    ? video.elt.srcObject.getAudioTracks()
    : [];
  if (audioTracks.length > 0) {
    stream.addTrack(audioTracks[0]);
  }
  recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };
  recorder.onstop = saveRecording;
  recorder.start();
  isRecording = true;
  recordBtn.attribute('disabled', '');
  stopBtn.removeAttribute('disabled');
}

function stopRecording() {
  if (!isRecording) return;
  recorder.stop();
  isRecording = false;
  recordBtn.removeAttribute('disabled');
  stopBtn.attribute('disabled', '');
}

function saveRecording() {
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  const a = createA(url, 'ascii_video.webm');
  a.download = 'ascii_video.webm';
  a.elt.click();
  a.remove();
  URL.revokeObjectURL(url);
}
