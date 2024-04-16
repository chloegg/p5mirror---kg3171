/*
Serial Library:
https://github.com/yoonbuck/p5.WebSerial/wiki/Guide
*/

// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();

// HTML button object:
let portButton;

// Color of the circle
let circleColor = 255;
let circleX = 10;

function setup() {
  createCanvas(400,400);
  
  // check to see if serial is available:
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);

  // check for any ports that are available:
  serial.getPorts();

  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
}

////////////
// DRAW  ///
////////////
function draw() {
 
  background(0); 
  fill(circleColor); 
  ellipse(circleX, 50, 50, 50);
}

/////////////////////////////
// SEND AND RECEIVE DATA  ///
/////////////////////////////

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  let inString = serial.readStringUntil("\r\n");
  //check to see that there's actually a string there:
  
  if (inString) {
    let values = split(inString, ',');

    if (values.length > 1){ 
      circleColor = int(map(values[0], 0,1023, 0, 255));
      circleX = int(map(values[1], 0,1023, 0, 400));

      serial.write("x"); 
    }
  }
}


////////////////////////////////////////////
// UTILITY FUNCTIONS TO MAKE CONNECTION  ///
////////////////////////////////////////////

// if there's no port selected,
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}

// make the port selector window appear:
function choosePort() {
  serial.requestPort();
}

// open the selected port, and make the port
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);

  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
    serial.write("x");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}

// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}

// try to connect if a new serial port
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}

