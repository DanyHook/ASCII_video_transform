/*
----- Coding Tutorial by Patt Vira ----- 
Name: ASCII Art (with Video)
Video Tutorial: https://youtu.be/4IyeLc6J1Uo

Connect with Patt: @pattvira
https://www.pattvira.com/
----------------------------------------
*/

let asciiChar = "◼︎♦︎$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,^`'. ";
// let asciiChar = " .:-=+*#%@";

let video;
let size = 4;
let vidSize;

function setup() {
  let canvas = createCanvas(720, 1280);
  canvas.elt.getContext('2d', { willReadFrequently: true });
  textFont('Courier New'); // Fuente monotipo tipo ASCII

  vidSize = width / size;

  video = createVideo("Automatic.MP4", videoLoaded);
  video.size(width / size, height / size);
  video.hide(); // hides the original video
}

function videoLoaded() {
  video.loop();
  video.volume(0); // muted video for smoother autoplay
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