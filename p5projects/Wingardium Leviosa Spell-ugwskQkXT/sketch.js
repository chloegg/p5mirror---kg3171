let tolerance = 20;
let colorToMatch;
let video;
let trail = [];
let spellSound;

// load the spell sound file in preload
function preload() {
  spellSound = loadSound('wingardium_leviosa.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // startWebserial();
  
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
    
    // play the spell sound when the trail length is greater than a threshold and the movement is swish and flick
    if (trail.length > 20 && checkMovement(trail, "swish and flick")) {
      spellSound.play();
      
      // serial.write('R');
    }
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

// check if the movement is swish and flick
function checkMovement(trail, movement) {
  let start = trail[0];
  let end = trail[trail.length-1];
  
  // calculate the direction vector of the trail
  let direction = createVector(end.x - start.x, end.y - start.y);
  
  // calculate the angle between the direction vector and a reference vector pointing to the right
  let angle = direction.heading() - HALF_PI;
  angle = (angle < 0) ? TWO_PI + angle : angle;
  
  // check if the angle falls within the swish and flick range
  if (angle > PI/4 && angle < 3*PI/4) {
    return true;
  } else {
    return false;
  }
}
