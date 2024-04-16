/* 
Experimental Photography 2024
Interactive Media Arts @ NYU
Ellen Nickles

External webcams, apps, and tips:
https://tinyurl.com/externalwebcams
*/

/*
Complete this sketch!

Move functions from “Mic threshold example” to Photobooth fullscreen to trigger a capture when volume threshold is exceeded

Mic threshold example:
https://editor.p5js.org/enickles/sketches/vdTv25Y_i

What do you need to adjust in this Photobooth sketch?
HINT: Where to put saveCanvas(`pic.png`); ?
*/

let webcams = [];
let mic;
let micLevel;
let thresholdExceeded = false;

function setup() {
  pixelDensity(1);
  getVideoDevices();
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(240);
  // mirror video device
  translate(width, 0);
  scale(-1, 1);
  micLevel = mic.getLevel();
  let micThreshold = 0.2;

  if (micLevel > micThreshold) {
    // If yes, then was the threshold previously met?
    // because we don't want immmediate repeats
    if (!thresholdExceeded) {
      // If not, then do something!
      console.log("you did it!");
      thresholdExceeded = true;
      saveCanvas(`pic.png`);

    }
  } else {
    console.log("nothing yet");
    thresholdExceeded = false;
  }
}
// if any webcams are detected
if (webcams.length) {
  // Specify camera, check Console
  let myCam = webcams[0];

  image(myCam, width / 2, height / 2, myCam.width / 2, myCam.height / 2);
}

/*------------------------------------*\
  Functions for Video Devices
\*------------------------------------*/

function getVideoDevices() {
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      return devices.filter((device) => device.kind === "videoinput");
    })
    .then((filtered) => getVideo(filtered))
    .catch((err) => {
      if (err.message.substring(0, 19) === "cam.getCapabilities")
        alert(
          "InputDeviceInfo.getCapabilities() is not supported in this browser. Try Chrome or MS Edge."
        );
      else console.warn(`${err.name}: ${err.message}`);
    });
}

function getVideo(cams) {
  for (let cam of cams) {
    let index = cams.indexOf(cam);
    let capabilities = cam.getCapabilities();
    let constraints = {
      audio: false,
      video: {
        deviceId: `${cam.deviceId}`,
        width: `${capabilities.width.max}`,
        height: `${capabilities.height.max}`,
      },
    };
    webcams[index] = createCapture(constraints);
    webcams[index].hide();

    console.log(
      `webcams[${index}]\n${cam.label}\nMax width:\t${constraints.video.width}\nMax height:\t${constraints.video.height}\n`
    );
  }
}
