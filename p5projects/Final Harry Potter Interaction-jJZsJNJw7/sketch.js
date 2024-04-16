let tolerance = 20;
let colorToMatch;
let video;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
  colorToMatch = color(140, 190, 255);
}

function draw() {
  image(video, 0, 0);
  
  let firstPx = findColor(video, colorToMatch, tolerance);
  if (firstPx !== undefined) {
    fill(colorToMatch);
    strokeWeight(2);
    circle(firstPx.x, firstPx.y, 30);
  }
}

function mousePressed() {
  loadPixels();
  colorToMatch = get(mouseX, mouseY);
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
