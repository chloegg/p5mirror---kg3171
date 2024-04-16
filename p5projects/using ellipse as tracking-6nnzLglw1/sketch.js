let tolerance = 20;
let colorToMatch;
let video;
let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
  colorToMatch = color(140, 190, 255);
}

function draw() {
  image(video, 0, 0);
  
  let newPoint = findColor(video, colorToMatch, tolerance);
  if (newPoint !== undefined) {
    trail.push(newPoint);
  }
  
  noStroke();
  fill('#EEDD82');
  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];
    ellipse(p.x, p.y, i, i);
  }
  if (trail.length > 20) {
    trail.splice(0,1);
  }
}

function findColor(input, c, tolerance) {
  let matchR = red(c);
  let matchG = green(c);
  let matchB = blue(c);
  
  input.loadPixels();
  for (let y = 0; y < input.height; y++) {
    for (let x = 0; x < input.width; x++) {
      let index = (y * input.width + x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index + 1];
      let b = input.pixels[index + 2];
      
      if (r >= matchR - tolerance && r <= matchR + tolerance &&
          g >= matchG - tolerance && g <= matchG + tolerance &&
          b >= matchB - tolerance && b <= matchB + tolerance) {
        return createVector(x, y);
      }
    }
  }
}
