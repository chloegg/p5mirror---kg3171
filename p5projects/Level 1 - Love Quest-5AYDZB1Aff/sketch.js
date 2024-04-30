let player;
let ground;
let gravity = 0.6;  // Slightly adjusted for better realism
let jump = -15;
let playerImg;

function preload() {
  playerImg = loadImage('shin.png', () => {
    console.log("Image loaded successfully");
    player = new Player(); // Initialize player here only after image is confirmed to be loaded
  }, (error) => {
    console.error("Failed to load image:", error);
  });
}

function setup() {
  createCanvas(800, 500);
  ground = height - 50;
  // Check if player has been initialized, if not, initialize or handle the case
  if (!player) {
    console.log("Waiting for image to load before initializing player.");
  }
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
        this.img = playerImg;  // Hold reference to the loaded image

        // Initialize width and height to undefined or a default value
        this.width = undefined;
        this.height = undefined;
    }

    update() {
        this.vy += this.gravity;
        this.y += this.vy;
        this.y = constrain(this.y, 0, ground - (this.height || 30));  // Use 30 as a placeholder if height is undefined
    }

    display() {
        // Calculate width and height if not already set and if the image is fully loaded
        if (!this.width && this.img.width > 0) {
            this.width = this.img.width / 2;
            this.height = this.img.height / 2;
        }

        // Ensure width and height have been set before trying to display the image
        if (this.width && this.height) {
            image(this.img, this.x - this.width / 2, this.y - this.height, this.width, this.height);
        }
    }

    jump() {
        if (this.y >= ground - (this.height || 30)) {  // Use 30 as a placeholder if height is undefined
            this.vy = -15;  // Jump force
        }
    }
}
