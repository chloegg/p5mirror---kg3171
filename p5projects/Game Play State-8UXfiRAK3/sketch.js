// let x = 1;
// let xdir = 1;
// let y = 1;
// let ydir = 1;
// let w = 10;
// let h = 10;

let ball = {
  x: 1,
  y: 20,
  xdir: 1,
  ydir: -1,
  w: 10,
  h: 20,
  r: 200,
  g: 100,
  b: 50
};

let balloon = {
  x: 10,
  y: 200,
  xdir: 2,
  ydir: -2,
  w: 100,
  h: 20,
  r: 100,
  g: 101,
  b: 1
};

let hotairballoon = {
  x: 10,
  y: 200,
  xdir: 2,
  ydir: -3,
  w: 100,
  h: 200,
  r: 2,
  g: 101,
  b: 1  
};

function setup() {
  createCanvas(400, 400);
  ball.xdir = random(-4,4);
  balloon.w = random(10,200);
  hotairballoon.r = random(100,200);
}

function draw() {
  background(220);
  drawShape(ball);
  moveShape(ball);
  checkBounce(ball);
  
  drawShape(balloon);
  moveShape(balloon);
  checkBounce(balloon);
  
  drawShape(hotairballoon);
  moveShape(hotairballoon);
  checkBounce(hotairballoon);
  
}

function drawShape(whichShape) {
  // draw shape
  fill(whichShape.r, whichShape.g, whichShape.b);
  ellipse(whichShape.x,whichShape.y,whichShape.w,whichShape.h);
}

function moveShape(whichShape) {
  // move shape
  whichShape.x = whichShape.x + whichShape.xdir;
  whichShape.y = whichShape.y + whichShape.ydir;
}
  
function checkBounce(whichShape) {
  // check bounce
  if (whichShape.x >= width || whichShape.x <= 0) {
    whichShape.xdir = whichShape.xdir * -1;
  }
  
  if (whichShape.y >= height || whichShape.y <= 0) {
    whichShape.ydir = whichShape.ydir * -1;
  }  
}