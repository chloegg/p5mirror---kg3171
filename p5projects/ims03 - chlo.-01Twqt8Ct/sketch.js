//ims03 - chlo.
//https://editor.p5js.org/kg3171/sketches/01Twqt8Ct

//fork: https://openprocessing.org/sketch/2037835

//This code creates a dynamic, interactive visual art piece in p5.js, where 200 circular shapes ("clips") are animated against a black background, continuously moving in a random manner while smoothly transitioning through a predefined array of colors. The colors change more rapidly every few seconds, creating a visually engaging effect. The clips exhibit a pulsing behavior by gradually increasing and then resetting their transparency, adding depth to the visualization.

//fullscreen: added a full screen button at the bottom that enables the sketch to enter full screen when pressed

//data: focuses in on the seconds and changes the color every second & grabs random color in the color array to change the sketch's color

//canvas: canvas is set to windowWidth and windowHeight which allows it to fit in any size window

//-------------------------------------------

// Define an array of colors for the clips
let colors = [
  "#ff0000", // red
  "#ff7f00", // orange
  "#ffff00", // yellow
  "#7fff00", // chartreuse green
  "#00ff00", // green
  "#00ff7f", // spring green
  "#00ffff", // cyan
  "#007fff", // azure
  "#0000ff", // blue
  "#7f00ff", // violet
  "#ff00ff", // magenta
  "#ff007f", // rose
  "#ff1493", // deep pink
  "#9932cc", // dark orchid
  "#8a2be2", // blue violet
  "#6495ed", // cornflower blue
  "#008b8b", // dark cyan
  "#006400", // dark green
  "#bdb76b", // dark khaki
  "#8b008b", // dark magenta
  "#556b2f", // dark olive green
  "#ff8c00", // dark orange
  "#e9967a", // dark salmon
  "#9400d3", // dark violet
  "#ff6347", // tomato
  "#40e0d0", // turquoise
  "#ee82ee", // violet
  "#f5deb3", // wheat
];
// Variables for future use (random seed, clips array)
let mySeed;
let clips = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  ellipseMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);
  mySeed = floor(random(1, 100000));

  setBackground(windowWidth);

  // Create 200 clip objects and store them in the clips array
  for (let i = 0; i < 200; i++) {
    clips.push(new Clip(windowWidth / 2, windowHeight / 2));
  }
  // Create a full screen button and set its functionality
  fullscreenButton = createButton("Full Screen");
  fullscreenButton.mousePressed(screenFull);
}

function draw() {
  addBlur();

  for (let clip of clips) {
    clip.display();
    clip.move();
  }
}

function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}

// Adjust the canvas size when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setBackground(windowWidth);
}

// Class definition for a Clip object
class Clip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.x0 = x;
    this.y0 = y;
    this.transp = 0.0;
    this.size = 1000;
    this.size0 = this.size;
    this.color = this.generateColor(); // Initial color
  }

  display() {
    colorMode(RGB); // Switch to RGB mode for coloring
    this.color = this.generateColor();
    fill(this.color);
    noStroke();
    push();
    translate(this.x, this.y);
    scale(0.5);
    ellipse(0, 0, this.size);
    pop();
    colorMode(HSB, 360, 100, 100, 100); // Switch back to HSB if needed elsewhere
    if (this.transp < 90) {
      this.transp += 0.5;
    } else {
      this.transp = 0.0;
    }
  }

  move() {
    if (this.size > 1) {
      this.size /= 1.05;
    } else {
      this.size = this.size0;
      this.x = this.x0;
      this.y = this.y0;
      this.transp = 0;
    }

    // Random movement
    this.x += random([-20, 0, 20]);
    this.y += random([-20, 0, 20]);
  }

  generateColor() {
    let currentSecond = second();
    let fraction = (currentSecond % 30) / 30; // Modulo 30 for faster changes, divided by 30 for a 0-1 range
    let index = floor(fraction * colors.length);
    let nextIndex = (index + 1) % colors.length;
    let color1 = color(colors[index]);
    let color2 = color(colors[nextIndex]);
    return lerpColor(color1, color2, fraction);
  }
}

function addBlur() {
  drawingContext.shadowOffsetX = -1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 5;
  drawingContext.shadowColor = "black";
}

function setBackground(mySize) {
  fill("black");
  strokeWeight(5);
  rect(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
}
