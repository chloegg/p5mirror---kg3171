/* 
Experimental Photography 2024
Interactive Media Arts @ NYU
Ellen Nickles

External webcams, apps, and tips:
https://tinyurl.com/externalwebcams
*/

let mic;
let micLevel;
let thresholdExceeded = false;

function setup() {
  createCanvas(400, 400);

  // STEP 1
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220);
  // STEP 2
  // What's the reading, range 0-1
  micLevel = mic.getLevel(); 

  // STEP 3
  // check the reading
  //console.log(micLevel);

  // STEP 4
  // set amount based on readings
  let micThreshold = 0.2;

  // STEP 5
  // is the level greater than threshold?
  if (micLevel > micThreshold) {
    // If yes, then was the threshold previously met?
    // because we don't want immmediate repeats
    if (!thresholdExceeded) {
      // If not, then do something!
      console.log("you did it!");
      thresholdExceeded = true;
    }
  } else {
    console.log("nothing yet");
    thresholdExceeded = false;
  }
}
