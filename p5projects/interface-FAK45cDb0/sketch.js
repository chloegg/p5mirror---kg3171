let wandImg, spellbookImg, backgroundImg;
let spellData = [
  {
    name: 'Lumos',
    description: 'Creates light at the end of your wand',
    gesture: 'Swipe up and flick your wand',
    image: 'lumos.png'
  },
  {
    name: 'Expecto Patronum',
    description: 'Creates a shield against Dementors',
    gesture: 'Swipe down and then make a circle with your wand',
    image: 'expecto_patronum.jpg'
  },
  {
    name: 'Wingardium Leviosa',
    description: 'Lifts objects into the air',
    gesture: 'Swish your wand and then point it at the object you want to lift',
    image: 'wingardium_leviosa.jpg'
  }
];

function preload() {
  wandImg = loadImage('wand.png');
  spellbookImg = loadImage('spellbook.png');
  backgroundImg = loadImage('hogwarts_background.png');
  for (let i = 0; i < spellData.length; i++) {
    spellData[i].image = loadImage(spellData[i].image);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(backgroundImg);
  image(spellbookImg, width/2, height/2);
  let x = width/2 - 200;
  let y = height/2 - 200;
  for (let i = 0; i < spellData.length; i++) {
    let spell = spellData[i];
    image(spell.image, x, y);
    textAlign(CENTER);
    textSize(20);
    text(spell.name, x, y + 120);
    textSize(16);
    text(spell.description, x, y + 150);
    textSize(14);
    text(spell.gesture, x, y + 180);
    x += 200;
  }
  image(wandImg, mouseX, mouseY, 100, 100);
}
