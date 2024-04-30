let startButton;
let instructionsButton;
let customFont;
let hearts = [];
const heartSpeed = 1;
let img;
let img1;

function preload() {
  customFont = loadFont('Jersey15.ttf');
  img = loadImage('shinchan.png');
  img1 = loadImage('playground.png')
}

function setup() {
    createCanvas(800, 500);
    background(255, 192, 203);

    // Generate hearts
    for (let i = 0; i < 20; i++) {
        hearts.push({
            x: random(width),
            y: random(height),
            size: random(10, 40),
            speed: heartSpeed
        });
    }
      setupButtons();
}

function setupButtons() {
    startButton = createButton('Start Game');
    startButton.position(width / 2 - 50, height / 2);
    startButton.mousePressed(startGame);
    startButton.style('background-color', '#F83B9A');
    startButton.style('color', 'white');
    startButton.style('padding', '10px 20px');
    startButton.style('border', 'none');
    startButton.style('border-radius', '10px');
    
    instructionsButton = createButton('Instructions');
    instructionsButton.position(width / 2 - 50, height / 2 + 50);
    instructionsButton.mousePressed(showInstructions);
    instructionsButton.style('background-color', '#FFB6C1');
    instructionsButton.style('color', 'white');
    instructionsButton.style('padding', '10px 20px');
    instructionsButton.style('border', 'none');
    instructionsButton.style('border-radius', '10px');
}


function draw() {
  background(255, 192, 203); //Redraw background to clear old frames
  image(img, 30, -720, width * 1.5, height * 4);
  image(img1, -410, -570, width * 1.5, height * 4);
  drawHearts();
  moveHearts();
  drawTitle(); 
  drawBorder(); 
}

function startGame() {
//
}

function drawHearts() {
  for (let heart of hearts) {
    drawHeart(heart.x, heart.y, heart.size);
  }
}

function drawHeart(x, y, size) {
  fill(255, 105, 180);
  noStroke();
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function moveHearts() {
  for (let heart of hearts) {
    heart.y -= heart.speed;
    if (heart.y < -50) {
      heart.y = height + 50;
      heart.x = random(width);
    }
  }
}

function drawBorder() {
  stroke(180, 15, 139); 
  strokeWeight(18); // Set the thickness of the border
  noFill();
  rect(0, 0, width, height);
}

function drawTitle() {
  // Title
  textSize(75);
  fill(365, 95, 140);
  textAlign(CENTER, CENTER);
  textFont(customFont);
  text("Love Quest", width / 2, height / 3);
}

function showInstructions() {
  document.getElementById('instructionsModal').style.display = 'block';
}

function closeInstructions() {
  document.getElementById('instructionsModal').style.display = 'none';
}

