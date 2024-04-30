//https://editor.p5js.org/kg3171/sketches/q38GhePJ8
//ims06-chlo.

let capture;
let button;
let camerasound;
let timeSelect;
let filterSelect;
let interval = 3000;
let mode = "start";
let selectedFilter = "none";
let backgroundMusic;
let frameColor = "#7fff00";
let colorSelect;
let userInput;
let countdownTime = 0;
let showTimer = false;
let startOverButton;
let butt1; // Define butt1 variable
let selectedImage = null;

let emojis = ['🌷', '🌿', '🩰', '🍼', '🍡', '👻', '💖', '🌟', '🫧', '🌸', '🎏','⛄️','🫐','🍓','🧾','🃏','🧊','🍰','🦢','🌊','🎈', '🧸','🛒','🎀','🎁','🔫','💕','🖍','🎧','🧃','🎂','🍅','🥑','🍊',''];

function preload() {
    camerasound = loadSound("cam.mp3");
    backgroundMusic = loadSound("background.mp3");
    font = loadFont("font.otf");

}

function setup() {
    createCanvas(320, 960);
    capture = createCapture(VIDEO);
    capture.size(320, 240);
    capture.hide();

    colorSelect = createSelect();
    colorSelect.position(400, 90);
    colorSelect.option("Green", "#7fff00");
    colorSelect.option('Black', '#000000');
    colorSelect.option('Pink', '#FFC0CB');
    colorSelect.option('Blue', '#1493ff');
    colorSelect.option('Gray', '#dbe2e9');
    colorSelect.option('Orange', '#ffa500');
    colorSelect.option('DarkPink', '#ff69b4');
    colorSelect.changed(() => (frameColor = colorSelect.value()));

    timeSelect = createSelect();
    timeSelect.position(400, 10);
    timeSelect.option("3 seconds", 3000);
    timeSelect.option("7 seconds", 7000);
    timeSelect.option("10 seconds", 10000);
    timeSelect.changed(() => (interval = timeSelect.value()));

    filterSelect = createSelect();
    filterSelect.position(400, 50);
    filterSelect.option("None", "none");
    filterSelect.option("Posterize", "posterize");
    filterSelect.option("Blur", "blur");
    filterSelect.option("Threshold", "threshold");
    filterSelect.option("Black&White", "blackwhite");
    filterSelect.changed(() => (selectedFilter = filterSelect.value()));

    button = createButton("Press To Start");
    button.position(405, 240);
    button.mousePressed(getready);

    startOverButton = createButton("Start Over");
    startOverButton.position(405, 200);
    startOverButton.mousePressed(startOver);

    if (!backgroundMusic.isPlaying()) {
        backgroundMusic.loop();
    }

    userInput = createInput("");
    userInput.position(400, 130);
    userInput.attribute("placeholder", "Type text here");
}



function draw() {
    push(); // Always save the drawing state at the start
    translate(width, 0); // Move the origin to mirror the image
    scale(-1, 1); // Scale negatively on the x-axis to flip/mirror the image

    image(capture, 0, 0); // Display the mirrored image

    if (selectedFilter !== "none") {
        applyFilter(); // Apply filters only when not "none"
    }

    if (mode === "done") {
        drawOldFashionedFrame(); // Additional UI elements
    }

    pop(); // Restore original state after every frame
}
function applyFilter() {
    switch (selectedFilter) {
        case "posterize":
            filter(POSTERIZE, 3);
            break;
        case "blur":
            filter(BLUR, 3);
            break;
        case "threshold":
            filter(THRESHOLD);
            break;
        case "blackwhite":
            filter(GRAY);
            break;
    }
}

function getready() {
    button.hide();
    setTimeout(pic, interval);
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
    push(); // Mirror each capture
    translate(width, 0);
    scale(-1, 1);
    image(capture, 0, 240);
    pop();
    mode = "pic1";
    setTimeout(nextpic, interval);
}

function startOver() {
    mode = "start";
    userInput.value("");
    button.show();
    butt1.hide();
}

function nextpic() {
    if (mode == "pic1") {
        push();
        translate(width, 0);
        scale(-1, 1);
        image(capture, 0, 480);
        pop();
        mode = "pic2";
        setTimeout(lastpic, interval);
    }
}

function lastpic() {
    if (mode == "pic2") {
        push();
        translate(width, 0);
        scale(-1, 1);
        image(capture, 0, 720);
        pop();
        mode = "done";
        setTimeout(done, interval);
    }
}

function done() {
  
   if (mode == "done") {
    mode = "stop";
    image(capture, 0, 960);
   }
  
  let userText = userInput.value(); // Get the text from the input
    fill(0); // Text color
    textSize(30); // Text size
    textAlign(CENTER, BOTTOM);
    textFont(font);
    text(userText, width / 2, 970 - 10); // Position the text at the bottom

    drawRandomEmoji(); // Draw emojis across the entire photo strip
    setTimeout(() => {
        end();
        butt1.show();
    }, 500);
}

function end() {
    camerasound.stop();
    butt1 = createButton("Save");
    butt1.position(405, 240);
    butt1.mousePressed(savepic);
    backgroundMusic.stop();
}

function savepic() {
    save("myCanvas.png");
}

function drawOldFashionedFrame() {
    noFill();
    stroke(frameColor);
    strokeWeight(35);
    rect(0, 0, 320, 960);
}