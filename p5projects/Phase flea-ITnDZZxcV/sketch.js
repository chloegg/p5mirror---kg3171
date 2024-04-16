let r = 0;
let g = 100;
let b = 50;

let history = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(r,g,b);
  r++;
  if (r > 200){ r = 0; }
  let mpos = {x: mouseX,
                 y: mouseY};
  
  if (mouseIsPressed === true) {
      history.push(mpos);
  if (history.length > 500) {
    history.shift();
  }
  for (let i = 0; i < history.length; i++) {
    ellipse(history[i].x,history[i].y,10,10);
    history[i].y++
  }
  ellipse(mouseX,mouseY,10,10);
  }
    
  
  // history.push(mpos);
  // if (history.length > 500) {
  //   history.shift();
  // }
  // for (let i = 0; i < history.length; i++) {
  //   ellipse(history[i].x,history[i].y,10,10);
  //   history[i].y++
  // }
  // ellipse(mouseX,mouseY,10,10);
}