let capture;
let button;
let camerasound;
let timeSelect; // Variable for the dropdown menu
let filterSelect; // Variable for the filter selection dropdown
let interval = 3000; // Default time interval
let mode = "start";
let selectedFilter = "none"; // Default filter

let nostalgicMessages = [
    "Ah, the good old days...",
    "Remember when everything was simpler?",
    "Nostalgia is the art of forgetting how bad the past was.",
    "The charm of the past is the romance of what never happened.",
    "Back when the world was in sepia...",
    "Yearning for the simplicity of yesterday."
];

function preload() {
  camerasound = loadSound('cam.mp3');
}

function setup() {
  createCanvas(320, 960);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();

  // Time selection dropdown
  timeSelect = createSelect();
  timeSelect.position(10, 10);
  timeSelect.option('3 seconds', 3000);
  timeSelect.option('7 seconds', 7000);
  timeSelect.option('10 seconds', 10000);
  timeSelect.changed(() => interval = timeSelect.value());

  // Filter selection dropdown
  filterSelect = createSelect();
  filterSelect.position(10, 50);
  filterSelect.option('None', 'none');
  filterSelect.option('Invert', 'invert');
  filterSelect.option('Posterize', 'posterize');
  filterSelect.option('Blur', 'blur');
  filterSelect.option('Threshold', 'threshold');
  filterSelect.option('Black&White', 'blackwhite');
  filterSelect.changed(() => selectedFilter = filterSelect.value());

  button = createButton('Press To Start');
  button.position(250, 240);
  button.mousePressed(getready);
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
    
      switch (selectedFilter) {
    case 'invert':
      filter(INVERT);
      break;
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
    
    drawOldFashionedFrame();
    displayNostalgicMessage(); // Display the nostalgic message
    
  }
  
  }
function getready() {
  button.hide();
  setTimeout(pic, interval); // Use the selected interval
  // if (!camerasound.isPlaying()) {
  //   camerasound.play();
  // }
  // camerasound.loop();
}

function pic() {
  image(capture, 0, 0);
  mode = "pic1";
  setTimeout(nextpic, interval);
}

function nextpic() {
  if (mode == "pic1") {
    mode = "pic2";
    image(capture, 0, 240);
    setTimeout(lastpic, interval);
  }
}

function lastpic() {
  if (mode == "pic2") {
    mode = "done";
    image(capture, 0, 480);
    setTimeout(done, interval);
  }
}

function done() {
  if (mode == "done") {
    mode = "stop";
    image(capture, 0, 720); // Fourth image below the third
    setTimeout(end, 500);
  }
}

function end(){
  camerasound.stop();
   butt1=createButton('Save');
    butt1.position(300,240);
    butt1.mousePressed(savepic);
}
function savepic(){
  save('myCanvas.png');

}

function displayNostalgicMessage() {
    let message = nostalgicMessages[Math.floor(Math.random() * nostalgicMessages.length)];
    textSize(16);
    fill(255);
    textAlign(CENTER, CENTER);

    // Apply the same transformations to the text as the camera feed
    translate(width, 0); // Move to the right side of the canvas
    scale(-1, 1); // Flip horizontally

    // Draw the text so it appears flipped
    text(message, width / 2, capture.height + 50);

    // Reset the transformations after drawing the text
    resetMatrix();
}

function drawOldFashionedFrame() {
  noFill();
  stroke(160, 82, 45); // A brown color for the wooden frame look
  strokeWeight(20); // Thick border for the frame
  rect(0, 0, 320, 960); // Coordinates to cover the canvas
}
