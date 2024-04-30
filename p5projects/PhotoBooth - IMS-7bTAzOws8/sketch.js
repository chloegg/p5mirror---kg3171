//https://editor.p5js.org/kg3171/sketches/7bTAzOws8
//PhotoBooth - IMS

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
let startOverButton;
let butt1; // Define butt1 variable

let emojis = ['🌷', '🌿', '🩰', '🍼', '🍡', '👻', '💖', '🌟', '🫧', '🌸', '🎏','⛄️','🫐','🍓','🧾','🃏','🧊','🍰','🦢','🌊','🎈', '🧸','🛒','🎀','🎁','🔫','💕','🖍','🎧','🧃','🎂','🍅','🥑','🍊',''];


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
  button.position(405, 240);
  button.mousePressed(getready);
  
  startOverButton = createButton("Start Over");
    startOverButton.position(405, 200);
    startOverButton.mousePressed(startOver);
  
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.loop();
  }
    
    userInput = createInput('');
  userInput.position(400, 130); // Adjust position as needed
    userInput.attribute('placeholder', 'Type text here');
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

function drawRandomEmoji() {
    const numberOfEmojis = round(random(15, 30)); // Increased number of emojis for the whole strip
    textSize(25); // Set the emoji size

    for (let i = 0; i < numberOfEmojis; i++) {
        let emoji = random(emojis); // Select a random emoji
        let xPos = random(20, 300); // Randomize the x position between 20 and 300
        let yPos = random(20, 940); // Randomize the y position across the whole canvas height
        text(emoji, xPos, yPos); // Draw the emoji at the random position
    }
}

function pic() {
  image(capture, 0, 240);
  mode = "pic1";
  setTimeout(nextpic, interval);
}

function startOver() {
    mode = "start"; // Reset the mode to the initial state
    userInput.value(""); // Clear the user input field
    button.show(); // Show the start button again if it was hidden
    butt1.hide(); // Ensure the save button is hidden

    timeSelect.value(3000); 
    filterSelect.value('none'); 
    colorSelect.value('#7fff00'); 
    frameColor = '#7fff00'; 

    if (backgroundMusic.isPlaying()) {
        backgroundMusic.stop();
    }
    backgroundMusic.loop();

    // Clear the canvas and redraw background if necessary
    clear();
    background(255); // Set to default white background, or as needed

    // Reset the capture device if necessary
    capture.remove(); // Stop the existing capture
    capture = createCapture(VIDEO); // Restart capture
    capture.size(320, 240);
    capture.hide();
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
    translate(width, 0); // Move the origin to the canvas's right edge for mirroring
    scale(-1, 1); // Apply horizontal flip to mirror everything
    
     drawRandomEmoji();

    let userText = userInput.value(); // Get the text from the input
    fill(0); // Text color
    textSize(30); // Text size
    textAlign(CENTER, BOTTOM);
    textFont(font);
     text(userInput.value(), width / 2, 950);

    setTimeout(end, 500);
  }
}

function end() {
    camerasound.stop();
    butt1 = createButton("Save");
    butt1.position(405, 240);
    butt1.mousePressed(savepic);
    backgroundMusic.stop();
}

function savepic(){
  save('myCanvas.png');

}
function drawOldFashionedFrame() {
  noFill();
  stroke(frameColor);
  strokeWeight(35);
  rect(0, 0, 320, 960);
}
