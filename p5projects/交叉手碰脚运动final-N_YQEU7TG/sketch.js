let state = 0;
let video;
let poseNet;
let vid;
let poses = {};
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;
let leftAnkleX = 0;
let leftAnkleY = 0;
let rightAnkleX = 0;
let rightAnkleY = 0;
let timer = 10; 

function setup() {
  createCanvas(400, 400);
  
  vid= createVideo(
    ['交叉碰腿 (1).mov'],
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
    //console.log(poses);
    if (poses.length > 0) {
      if (poses[0].pose.leftWrist.confidence > 0.5) {
      leftWristX = poses[0].pose.leftWrist.x;
      leftWristY = poses[0].pose.leftWrist.y;}
      if (poses[0].pose.rightWrist.confidence > 0.5){
      rightWristX = poses[0].pose.rightWrist.x;
      rightWristY = poses[0].pose.rightWrist.y;
      }
       if (poses[0].pose.leftAnkle.confidence > 0.8) {
      leftAnkleX = poses[0].pose.leftAnkle.x;
      leftAnkleY = poses[0].pose.leftAnkle.y;}
      if (poses[0].pose.rightAnkle.confidence > 0.8){
      rightAnkleX = poses[0].pose.rightAnkle.x;
      rightAnkleY = poses[0].pose.rightAnkle.y;
  //   console.log("x: " + leftWristX);
      
      }
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
  ellipse(leftWristX,leftWristY,30,30);
  ellipse(rightWristX, rightWristY,30,30)
  ellipse(leftAnkleX,leftAnkleY,20)
  ellipse(rightAnkleX,rightAnkleY,20)
  
  
     if (leftWristX <=50+rightAnkleX)  {
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
