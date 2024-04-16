let font;
let bgImage;
let spells = [];

function preload() {
  font = loadFont('assets/Harry-P.ttf');
  bgImage = loadImage('assets/hogwarts-castle.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(48);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
}

function draw() {
  // Draw background image
  image(bgImage, width/2, height/2, width, height);

  // Draw spells
  for (let i = 0; i < spells.length; i++) {
    spells[i].draw();
  }
}

function mousePressed() {
  // Create a new spell at the mouse position
  let spell = new Spell(mouseX, mouseY);
  spells.push(spell);
}

class Spell {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.color = color(random(255), random(255), random(255), 200);
    this.text = "Expelliarmus!";
  }

  draw() {
    // Update position
    this.position.add(this.velocity);

    // Draw text
    fill(this.color);
    text(this.text, this.position.x, this.position.y);

    // Remove spell if offscreen
    if (this.position.x < -500 || this.position.x > width + 500 || this.position.y < -500 || this.position.y > height + 500) {
      let index = spells.indexOf(this);
      spells.splice(index, 1);
    }
  }
}
