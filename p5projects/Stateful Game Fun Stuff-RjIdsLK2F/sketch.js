let state = 0;
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
  //background(220);
  // Check state , draw different screens
  if (state == 0) {
    drawEnter();
  } else if (state == 1) {
    drawPlay();
  } else if (state == 2) {
    drawExit();
  }
  
}

function mousePressed() {
  state++;
  if (state > 2) {
    state = 0;
  }
}

// Enter Screen
function drawEnter() {
  // Black background
  background(0);
  
  // Draw the title - hot pink letters
  fill(255,105,180);
  textSize(32);
  textAlign(CENTER);
  text('StAtEful GAME - fun stuffs', width/2, height/2);
  
  // if (mouseIsPressed) {
  //   state = 1;
  // }
  
}

// Game Play Screen
function drawPlay() {
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

  // if (mouseIsPressed) {
  //   state = 2;
  // }
}

// End Game Screen
function drawExit() {
  background(0,0,255);
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