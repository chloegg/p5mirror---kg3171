let font;
let bgImage;
let spells = [];
let lightThreshold = 100;
let lightColor;

function preload() {
  font = loadFont('HARRYP__.TTF');
  bgImage = loadImage('harry-potter.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(48);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  // Set up light tracking
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  // Get average brightness of captured video
  capture.loadPixels();
  let totalBrightness = 0;
  let numPixels = 0;
  for (let i = 0; i < capture.pixels.length; i += 4) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    let brightness = (r + g + b) / 3;
    totalBrightness += brightness;
    numPixels++;
  }
  let avgBrightness = totalBrightness / numPixels;

  // Set light color based on brightness
  if (avgBrightness > lightThreshold) {
    lightColor = color(255, 255, 0);
  } else {
    lightColor = color(255);
  }

  // Draw background image
  image(bgImage, width/2, height/2, width, height);

  // Draw spells
  for (let i = 0; i < spells.length; i++) {
    spells[i].draw();
  }
}

function mousePressed() {
  // Create a new spell at the mouse position
  let spell = new Spell(mouseX, mouseY, lightColor);
  spells.push(spell);
}

class Spell {
  constructor(x, y, color) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.color = color;
    this.text = "Expelliarmus!";
  }

  draw() {
    // Update position
    this.position.add(this.velocity);

    // Draw text
    fill(this.color);
    text(this.text, this.position.x, this.position.y);

    // Remove spell if offscreen
    if (this.position.x < -500 || this.position.x > width + 500 || this.position.y < -500 || this.position.y > height + 500) {
      let index = spells.indexOf(this);
      spells.splice(index, 1);
    }
  }
}
