let state = 0;
let video;
let poseNet;
let vid;
let poses = {};
let leftKneeX = 0;
let leftKneeY = 0;
let rightKneeX = 0;
let rightKneeY = 0;
let timer = 10; 

function setup() {
  createCanvas(400, 400);
  
  vid= createVideo(
    ['换手换腿跳.mov'],
    vidLoad
);
  vid.size (200,200)
  
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
 // poseNet.flipHorizontal = true;
  // Listen to new 'pose' events
  poseNet.on('pose', (results) => {
    poses = results;
   // console.log(poses);
    if (poses.length > 0) {
      if (poses[0].pose.leftKnee.confidence > 0.5) {
      leftKneeX = poses[0].pose.leftKnee.x;
      leftKneeY = poses[0].pose.leftKnee.y;}
      if (poses[0].pose.rightKnee.confidence > 0.5){
      rightKneeX = poses[0].pose.rightKnee.x;
      rightKneeY = poses[0].pose.rightKnee.y;
      }
  //   console.log("x: " + leftKneeX);
      
      }    
  });
}


function draw() {
  //background(220);
  // Check state , draw different screens
  if (state == 0) {
    drawEnter();
  } else if (state == 1) {
    drawPlay();
  } else if (state == 2) {
    drawExit();
  }

}

function mousePressed() {
  state++;
  if (state > 2) {
    state = 0;
  }
}

// Enter Screen
function drawEnter() {
  // Blue background
  background(60,92,165);
  
  // Draw the title - hot pink letters
  fill(225);
  textSize(32);
  textFont('Georgia')
  textAlign(CENTER);
  text('EXERCISE BEGIN!', width/2, height/2);
  
  // if (mouseIsPressed) {
  //   state = 1;
  // }
  
}

// Game Play Screen
function drawPlay() {
   background(220);
  image(video, 0, 0, );
  fill(255,0,0)
  noStroke()
  ellipse(leftKneeX,leftKneeY,30,30);
  ellipse(rightKneeX, rightKneeY,30,30)
  
  
     if (leftKneeX <=230)  {
       fill(255)
      textSize(60);
    textAlign(CENTER, TOP);
    text('Correct!',0, 12, width)
  }
  
  //Countdown
  fill(225,225,225)
  textSize(20);
  textAlign(LEFT)
  text(timer, 190,300);
  text("Time remaining：",30,300);
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
      if(timer==0){
       drawExit();
    }

  // if (mouseIsPressed) {
  //   state = 2;
  // }
}

// End Game Screen
function drawExit() {
  background(60,92,165);
   // Draw the title - hot pink letters
  fill(225);
  textSize(32);
  textFont('Georgia')
  textAlign(CENTER);
  text('WELL DONE!', width/2, height/2);
  
}
  
  function modelLoaded() {
  console.log('Model Loaded!');

  
}

function vidLoad() {
  vid.loop();
  vid.volume(0);
}
