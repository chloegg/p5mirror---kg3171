let mouth = 6
let eye = 9
let angle = 0

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  if (mouth < 50 && eye > 5) {
    mouth += 1;
    eye -= 1;
  }
}

function eyes(x,y,w,h) {
ellipse(x, y, w, h);
}

function draw() {
  background(230,202,253);
  
  //background
   rectMode(RADIUS);
fill(275,275,200);
rect(350,350,300,300); // Draw white rectangle 
  noStroke(rect)
  
   fill(275,400,250);
  square(100,200,150);
  
   //hair
  
  fill(102, 51, 0);
  rect(200, 215, 85, 130, 75, 75, 0, 0);
  
   //neck
  fill(240, 210, 200);
  rect(201, 298, 30, 35, 0, 0, 30, 30);
  
  //face
  fill(253, 234, 221)
   ellipse(200,200,125,160);
  
  //hair part 2
  fill(102, 51, 0);
   arc(140, 118, 125, 115, 0, PI / 2);
  
    //ears
  fill(240, 210, 200);
  ellipse(133, 210, 15, 30);
  ellipse(268, 210, 15, 30);
  
  //nose
  ellipse(200, 210, 15, 30);
  
  //eyes
  ellipseMode(RADIUS);
fill(255);
eyes(165, 200, 10, eye); // Outer white ellipse
ellipseMode(CENTER);
fill(100);
ellipse(165, 200, 10, eye); // Inner gray ellipse
  
  ellipseMode(RADIUS);
fill(255);
ellipse(235, 200, 10, eye); // Outer white ellipse
ellipseMode(CENTER);
fill(100);
ellipse(235, 200, 10, eye); // Inner gray ellipse
  
  //eyebrows
      arc(235, 180, 17, 7, PI, 0);
  arc(165, 180, 17, 7, PI, 0);
  
  //mouth
  fill(90, 20, 10);
 arc(201, 245, 25, mouth, 0, PI);
  
    //cheek
  fill(235, 175, 168, 180);
  circle(150, 225, 25);
  circle(250, 225, 25);
  
  //earring
  fill(255)
  ellipse(270, 226, 6, 8); 
  ellipse(133, 227, 6, 8); 
}