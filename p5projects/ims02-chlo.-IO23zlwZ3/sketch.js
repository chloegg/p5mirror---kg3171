//forked from: https://openprocessing.org/sketch/2049192

//Comments: 
//The code is a p5.js sketch that dynamically generates a visual representation titled "息するコード" (Breathing Code) by Shunsuke Takawo. The code uses a recursive function to create a fractal-like pattern of rectangles, which change size and position based on a combination of sine and cosine functions, creating a pulsating, breathing effect. Each rectangle is filled with characters from the title, adding a textual layer to the visual complexity. The sketch employs a variety of color schemes, and the appearance of the rectangles and text changes over time, creating a continuous, animated effect.

//Features:

//Visuals: pulsating, breathing effect through the recursive subdivision of rectangles, with their sizes modulated by sine and cosine functions, reflecting the "Breathing Code" concept.

//Geometry: creating movement of the rectangles 

//Interactive Resizing: The sketch responds to window resizing events, adapting the canvas size and recalculating dimensions to maintain the visual integrity of the artwork.

//Color Schemes: The code uses predefined color palettes to fill the shapes, contributing to the aesthetic diversity and visual appeal of the generated pattern.

//-----------------------------------------------------------

// Global variables for graphics, color palette, offset, width, and title
let graphics;
let palette;
let offset;
let w;
let title = "息するコード高尾俊介";
// let title = "Breathing Code / Shunsuke Takawo";

let title_char_array;

let font;

// Preloads necessary assets before the sketch starts
function preload() {
  font = loadFont("DotGothic16-Regular.ttf"); //load specific font 
  title_char_array = getCharArray(title);
}

// Converts a string into an array of character codes
function getCharArray(str) {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i));
  }
  return arr;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  noSmooth();
  offset = 0;
  palette = random(colorScheme).colors.concat();
}



function draw() {
  blendMode(BLEND);
  background(0, 0, 0);
  // blendMode(ADD);
  randomSeed(231017);
  push();
  // translate(width / 2, height / 2);
  // rotate(45);
  // translate(-w / 2, -w / 2);
  recursiveRect(offset, offset, width - offset * 2, height - offset * 2, 4);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = sqrt(sq(width) + sq(height));
  offset = 0;
}

// Function to draw rectangles recursively
function recursiveRect(x, y, w, h, depth) {
  if (depth < 0) return;
    // Calculate size and position modifiers based on random and trigonometric functions
  let rsx = random(10000);
  let rsy = random(10000);
  let t =
    (x + w / 2 - offset + (y - offset + h / 2) * (width - offset * 2)) /
    ((width - offset * 2) * (height - offset * 2));
  let nw = (sin(rsx + y / 10 + t * 360 + frameCount / 5) / 2 + 0.5) * w;
  let nh = (cos(rsy + x / 10 + t * 360 + frameCount / 5) / 2 + 0.5) * h;

  if (depth == 0) {
    drawRect(x, y, nw, nh, t);
    drawRect(x + nw, y, w - nw, nh, t);
    drawRect(x, y + nh, nw, h - nh, t);
    drawRect(x + nw, y + nh, w - nw, h - nh, t);
  } else {
    recursiveRect(x, y, nw, nh, depth - 1);
    recursiveRect(x + nw, y, w - nw, nh, depth - 1);
    recursiveRect(x, y + nh, nw, h - nh, depth - 1);
    recursiveRect(x + nw, y + nh, w - nw, h - nh, depth - 1);
  }
}

// Function to draw individual rectangles and include text
function drawRect(x, y, w, h, t) {
  // let v = t % 1;
  let v = ((x + y * width) / (width * height) + frameCount / 500+t) % 1; //(t +min(w / h, h / w))%1;
  v += min(w / h, h / w) % 1;
  v = map(sin(easeInOutCirc(v) * 360), -1, 1, 0, 1);
  push();
  translate(x + w / 2, y + h / 2);
  let colors = shuffle(palette.concat());
  let rotate_num = int(random(4));
  let str_num = int(title_char_array.length * v);
  let str = String.fromCharCode(title_char_array[str_num]);
  if (rotate_num % 2 == 1) {
    let tmp = w;
    w = h;
    h = tmp;
  }
  rotate_num *= 90;
  rotate(rotate_num);
  rectMode(CENTER);
  let black_white = random() > 0.5;
  if (min(w, h) > 10) {
    if (black_white) {
      fill(0, 0, 10);
    } else {
      fill(0, 0, 90);
    }
    // fill(0,0,100);
    noStroke();
    rect(0, 0, w-2, h-2);
    drawingContext.clip();
    let textsize = 13;
    scale(w / textsize, h / textsize);
    if (black_white) {
      fill(0, 0, 90);
    } else {
      fill(0, 0, 10);
    }
    textFont(font);
    textAlign(CENTER, CENTER);
    // rotate(-rotate_num);

    text(str, 0, -3);
  }
  pop();
}

// Predefined color schemes
let colorScheme = [
  {
    name: "Benedictus",
    colors: ["#F27EA9", "#366CD9", "#5EADF2", "#636E73", "#F2E6D8"],
  },
  {
    name: "Cross",
    colors: ["#D962AF", "#58A6A6", "#8AA66F", "#F29F05", "#F26D6D"],
  },
  {
    name: "Demuth",
    colors: ["#222940", "#D98E04", "#F2A950", "#BF3E21", "#F2F2F2"],
  },
  {
    name: "Hiroshige",
    colors: ["#1B618C", "#55CCD9", "#F2BC57", "#F2DAAC", "#F24949"],
  },
  {
    name: "Hokusai",
    colors: ["#074A59", "#F2C166", "#F28241", "#F26B5E", "#F2F2F2"],
  },
  {
    name: "Hokusai Blue",
    colors: ["#023059", "#459DBF", "#87BF60", "#D9D16A", "#F2F2F2"],
  },
  {
    name: "Java",
    colors: ["#632973", "#02734A", "#F25C05", "#F29188", "#F2E0DF"],
  },
  {
    name: "Kandinsky",
    colors: ["#8D95A6", "#0A7360", "#F28705", "#D98825", "#F2F2F2"],
  },
  {
    name: "Monet",
    colors: ["#4146A6", "#063573", "#5EC8F2", "#8C4E03", "#D98A29"],
  },
  {
    name: "Nizami",
    colors: ["#034AA6", "#72B6F2", "#73BFB1", "#F2A30F", "#F26F63"],
  },
  {
    name: "Renoir",
    colors: ["#303E8C", "#F2AE2E", "#F28705", "#D91414", "#F2F2F2"],
  },
  {
    name: "VanGogh",
    colors: ["#424D8C", "#84A9BF", "#C1D9CE", "#F2B705", "#F25C05"],
  },
  {
    name: "Mono",
    colors: ["#D9D7D8", "#3B5159", "#5D848C", "#7CA2A6", "#262321"],
  },
  {
    name: "RiverSide",
    colors: ["#906FA6", "#025951", "#252625", "#D99191", "#F2F2F2"],
  },
];

function setGradientGraphics(c1, c2, c3, target, i) {
  let gradient = target.drawingContext.createLinearGradient(
    0,
    0,
    0,
    target.height
  );
  gradient.addColorStop(0, c1);
  gradient.addColorStop(1, c2);
  gradient.addColorStop(1 / 2, c3);
  target.drawingContext.fillStyle = gradient;
  target.noStroke();
  target.rect(i, 0, 1, target.height);
}

function easeInOutCirc(x) {
  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

function easeInOutElastic(x) {
  const c5 = (2 * Math.PI) / 4.5;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}