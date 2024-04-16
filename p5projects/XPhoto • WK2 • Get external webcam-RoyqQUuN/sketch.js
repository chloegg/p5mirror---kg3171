/* 
Experimental Photography 2024
Interactive Media Arts @ NYU
Ellen Nickles

External webcams, apps, and tips:
https://tinyurl.com/externalwebcams
*/

let webcams = [];
let num = 0;

function setup() {
  pixelDensity(1);
  // Reset canvas width and height based
  // on camera capabilities, check Console
  createCanvas(1920, 1080);
  getVideoDevices();
}

function draw() {
  // mirror video device
  translate(width, 0);
  scale(-1, 1);

  // if any webcams are detected
  if (webcams.length) {
    // Specify camera, check Console
    image(webcams[0], 0, 0, width, height);
  }

  // Convert to black and white
  // Only use with built-in or Iriun camera
  // filter(GRAY)
  // For other webcams use separate apps
  // linked in document above
}

function mousePressed() {
  num++;
  saveCanvas(`pic${num}.png`);
}


function getVideoDevices() {
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      return devices.filter((device) => device.kind === "videoinput");
    })
    .then((filtered) => getVideo(filtered))
    .catch((err) => {
      if (err.message.substring(0,19) === "cam.getCapabilities")
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
