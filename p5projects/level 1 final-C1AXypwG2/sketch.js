let characterImg;
let characterX, characterY;
let characterVY = 0; // Velocity in the Y direction
let gravity = 0.5; // Strength of gravity
let jumping = false; // Is the character currently jumping?
let levelCompleteZone;
let platforms = [];
let actualHeight = 120; // Adjust this to the actual height of the image
let boxImg; 
let triggerX = 585; // X-coordinate of the trigger area
let triggerY = 200; // Y-coordinate of the trigger area
let triggerWidth = 300; // Width of the trigger area
let triggerHeight = 100;

function preload() {
  characterImg = loadImage('shin.png');
  boxImg = loadImage('playground.png');
}

function setup() {
  createCanvas(800, 600);
  characterX = 0;
  characterY = height - 120;
  levelCompleteZone = { x: width - 190, y: height - 260, width: 200, height: 280 };

  // Increase size by 50%
  let sizing = 2;
  levelCompleteZone.width *= sizing;
  levelCompleteZone.height *= sizing;

  // Adjust position to keep the box centered at its original location
  levelCompleteZone.x -= (levelCompleteZone.width * sizing - levelCompleteZone.width) / 2;
  levelCompleteZone.y -= (levelCompleteZone.height * sizing - levelCompleteZone.height) / 2;

  // Define platforms
  platforms.push({ x: 300, y: 490, width: 100, height: 20 });
  platforms.push({ x: 500, y: 390, width: 150, height: 20 });
}


function draw() {
  background(135, 206, 235);

  fill(0, 128, 0);
  rect(0, height - 50, width, 50);

  // Draw the enlarged image
  image(boxImg, levelCompleteZone.x, levelCompleteZone.y, levelCompleteZone.width, levelCompleteZone.height);

  // Draw platforms
  fill(169, 169, 169); // Grey color for platforms
  for (let plat of platforms) {
    rect(plat.x, plat.y, plat.width, plat.height);
  }

  // Character physics
  characterVY += gravity;
  characterY += characterVY;

  // Collision with ground
  if (characterY > height - 120) {
    characterY = height - 120;
    characterVY = 0;
    jumping = false;
  }

  // Collision with platforms
  for (let plat of platforms) {
    if (characterX + 100 > plat.x && characterX < plat.x + plat.width) { // Check horizontal overlap
      if (characterVY > 0 && characterY + actualHeight >= plat.y && characterY + actualHeight <= plat.y + 20) {
        // Only adjust position if character is falling down (characterVY > 0)
        characterY = plat.y - actualHeight; // Adjust Y so character stands right on the platform
        characterVY = 0;
        jumping = false;
      }
    }
  }

  // Draw the character
  image(characterImg, characterX, characterY, 100, actualHeight);

  // Check if the character is within the boundaries of the image
if (
    characterX >= triggerX &&
    characterX <= triggerX + triggerWidth &&
    characterY + actualHeight >= triggerY &&
    characterY <= triggerY + triggerHeight
  ) {
    displayQuestion();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    characterX -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    characterX += 10;
  } else if (keyCode === UP_ARROW && !jumping) {
    characterVY = -10; // Jumping velocity
    jumping = true;
  } else if (keyCode === DOWN_ARROW) {
    characterY += 10;
  }
}

function displayQuestion() {
  noLoop(); // Stop drawing to freeze the game
  let userAnswer = prompt("What is the essence of love?"); // Sample question
  if (userAnswer.toLowerCase() === "kindness") { // Check answer
    alert("Correct! Moving to next level.");
    characterX = 50; // Reset position or move to next level
    characterY = height - 100;
    loop(); // Resume game loop
  } else {
    alert("Try again!");
    loop(); // Resume game loop
  }
}
