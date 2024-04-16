// The midi notes of a scale
var notes = [ 60, 62, 64, 65, 67, 69, 71];
var osc;

let x = 320;
let y = 180;
let xspeed = 5;
let yspeed = 2;

// let r = 25;

function setup() {
  createCanvas(720, 400);
  

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function draw() {

  // Draw a keyboard

  // The width for each key
  var w = width / notes.length;
  for (var i = 0; i < notes.length; i++) {
    var x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY < height) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(200,255,200);
      // Or just rolling over
      } else {
        fill(100,200,300);
      }
    } else {
      fill(300,50,250);
    }


    // Draw the key
    circle(x, 100, w, height);
   ellipse(x, y, 50, 50);
   x += xspeed;
   y += yspeed;
   if (x > width - 50 || x < 50) {
     xspeed = -xspeed;
   }
  if (y > height - 50 || y < 50) {
     yspeed = -yspeed;
  }
  }

}

// When we click
function mousePressed() {
  // Map mouse to the key index
  var key = floor(map(mouseX, 0, width, 0, notes.length));
  playNote(notes[key]);
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);

}