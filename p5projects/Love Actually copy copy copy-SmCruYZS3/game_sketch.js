let player;
let ground;
let gravity = 0.6;  // Slightly adjusted for better realism
let jump = -15;
let playerImg;

function preload() {
  playerImg = loadImage('shin.png');  // Adjust the path as necessary
}

function setup() {
  createCanvas(800, 500);
  player = new Player();
  ground = height - 50;  // Make sure this is correctly positioning the ground
}

function draw() {
  background(135, 206, 235);  // Clear background each frame
  fill(0, 155, 0);  // Green ground
  rect(0, ground, width, 50);  // Draw ground

  player.update();
  player.display();  // Make sure player is always drawn last to be on top
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.jump();
  }
}

class Player {
    constructor() {
        this.x = 50;
        this.y = ground - 30;
        this.vy = 0;
        this.gravity = 0.6;
        this.img = playerImg;
        this.width = this.img.width / 2;
        this.height = this.img.height / 2;

        // Log initial properties
        console.log("Player created with x:", this.x, "y:", this.y, "width:", this.width, "height:", this.height);
    }

  update() {
    this.vy += this.gravity;
    this.y += this.vy;
    this.y = constrain(this.y, 0, ground - this.height);  // Ensure the player doesn't go below the ground
  }

  display() {
    image(this.img, this.x - this.width / 2, this.y - this.height, this.width, this.height);  // Draw the image centered at (this.x, this.y)
  }

  jump() {
    if (this.y >= ground - this.height) {  // Check if the player is on the ground
      this.vy = -15;  // Jump force
    }
  }
}
