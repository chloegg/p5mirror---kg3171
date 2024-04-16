let x = 0;
let num = 0

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  // saveCanvas("pic.jpg");
  // saveCanvas("pic.png");
  saveCanvas(`pic${num}.png`)
}


function draw() {
  background(220);
  circle(x, height / 2, 50);
  x++;
  if (x > width) {
    x = 0;
  }
}