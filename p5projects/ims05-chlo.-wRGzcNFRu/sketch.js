//https://editor.p5js.org/kg3171/sketches/wRGzcNFRu
//ims05-chlo.

let capture;
let button;
let camerasound;
let timeSelect; // Variable for the dropdown menu
let filterSelect; // Variable for the filter selection dropdown
let interval = 3000; // Default time interval
let mode = "start";
let selectedFilter = "none"; // Default filter
let backgroundMusic;
let frameColor = '#7fff00';
let colorSelect;
let userInput;

let nostalgicMessages = [
    "🥑🐢🍄🧃🔫",
    "🌷🍰🍓🧷🎀",
    "🫧🧋🦢🎧🕶️",
    "🌸🍡🩰🎀🛍",
    "🧾🥣🍼🧊🥚",
    "🫐🎏⛄️🌊🦋"
];

function preload() {
  camerasound = loadSound('cam.mp3');
  backgroundMusic = loadSound('background.mp3');
  font = loadFont('font.otf');
}

function setup() {
  createCanvas(320, 960);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  
  colorSelect = createSelect();
  colorSelect.position(400, 90);
  colorSelect.option('Green', '#7fff00');
  colorSelect.option('Black', '#000000');
  colorSelect.option('Pink', '#FFC0CB');
  colorSelect.option('Blue', '#1493ff');
  colorSelect.option('Gray', '#dbe2e9');
  colorSelect.option('Orange', '#ffa500');
  colorSelect.option('DarkPink', '#ff69b4');
  colorSelect.changed(() => frameColor = colorSelect.value());

  // Time selection dropdown
  timeSelect = createSelect();
  timeSelect.position(400, 10);
  timeSelect.option('3 seconds', 3000);
  timeSelect.option('7 seconds', 7000);
  timeSelect.option('10 seconds', 10000);
  timeSelect.changed(() => interval = timeSelect.value());

  // Filter selection dropdown
  filterSelect = createSelect();
  filterSelect.position(400, 50);
  filterSelect.option('None', 'none');
  filterSelect.option('Posterize', 'posterize');
  filterSelect.option('Blur', 'blur');
  filterSelect.option('Threshold', 'threshold');
  filterSelect.option('Black&White', 'blackwhite');
  filterSelect.changed(() => selectedFilter = filterSelect.value());

  button = createButton('Press To Start');
  button.position(250, 240);
  button.mousePressed(getready);
  
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.loop();
    
    userInput = createInput('');
  userInput.position(400, 130); // Adjust position as needed
    userInput.attribute('placeholder', 'Type text here');
  
}
}

function draw() {
  if (mode == 'start') {
    translate(width, 0);
    scale(-1, 1);
    image(capture, 0, 0);
}
  else if (mode=='pic1'){
    translate(width,0);
  scale(-1, 1);
  image(capture, 0, 0); 
    
  }
  else if (mode=='pic2'){
    translate(width,0);
  scale(-1, 1);
  image(capture, 0, 0); 
  }
  else if (mode=='done'){
    translate(width,0);
  scale(-1, 1);
  image(capture, 0, 0); 
    
    
    drawOldFashionedFrame();
    displayNostalgicMessage(); // Display the nostalgic message
    
  }
  
    switch (selectedFilter) {
    case 'posterize':
      filter(POSTERIZE, 3);
      break;
    case 'blur':
      filter(BLUR, 3);
      break;
    case 'threshold':
      filter(THRESHOLD);
      break;
    case 'blackwhite':
        filter(GRAY);
        break;
  }

  }

function getready() {
  button.hide();
  setTimeout(pic, interval); // Use the selected interval
}

function pic() {
  image(capture, 0, 240);
  mode = "pic1";
  setTimeout(nextpic, interval);
}

function nextpic() {
  if (mode == "pic1") {
    mode = "pic2";
    image(capture, 0, 480);
    setTimeout(lastpic, interval);
  }
}

function lastpic() {
  if (mode == "pic2") {
    mode = "done";
    image(capture, 0, 720);
    setTimeout(done, interval);
  }
}

function done() {
  if (mode == "done") {
    mode = "stop";
    image(capture, 0, 960); // Adjust if needed

    let userText = userInput.value(); // Get the text from the input
    fill(0); // Text color
    textSize(30); // Text size
    textAlign(CENTER, BOTTOM);
    textFont(font);
    text(userText, width / 2, 970 - 10); // Position the text at the bottom

    setTimeout(end, 500);
  }
}


function end(){
  camerasound.stop();
   butt1=createButton('Save');
    butt1.position(300,240);
    butt1.mousePressed(savepic);
  
  backgroundMusic.stop();


}
function savepic(){
  save('myCanvas.png');

}

function displayNostalgicMessage() {
    let message = nostalgicMessages[Math.floor(Math.random() * nostalgicMessages.length)];

    textSize(30); // Keep or adjust the text size as needed
    textAlign(CENTER, CENTER);
    
    // Clear the previous message by redrawing a smaller background area
    // Adjust the fill color and coordinates as needed to match your layout
    fill(211, 245, 245); // Background color of the message area
    noStroke();
    // Reduce both the vertical start position and height of the rectangle
    rect(0, capture.height + 30, width, 40); // Further reduced height and adjusted position

    // Set the fill color back for the text
    fill(0); // Black text

    // Apply the same transformations to the text as the camera feed
    translate(width, 0);
    scale(-1, 1);

    // Adjust the vertical position of the text to align with the new rectangle size
    text(message, width / 2, capture.height + 50);

    // Reset the transformations after drawing the text
    resetMatrix();
}

function drawOldFashionedFrame() {
  noFill();
  stroke(frameColor);
  strokeWeight(35);
  rect(0, 0, 320, 960);
}
