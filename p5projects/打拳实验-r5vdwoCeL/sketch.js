let video;
let poseNet;
let poses = {};
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;



function setup() {
  createCanvas(600, 400);
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
  //   console.log("x: " + leftWristX);
      
    }    
  });
}

function draw() {
  background(220);
  image(video, 0, 0, );
  fill(255,0,0)
  noStroke()
  ellipse(leftWristX,leftWristY,30,30);
  ellipse(rightWristX, rightWristY,30,30)
  
  
     if (leftWristX <=100)  {
      textSize(60);
    textAlign(CENTER);
    text('😀',0, 12, width)
  }
}

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}





/*
const video = document.getElementById('video');

// Create a new poseNet method
const poseNet = ml5.poseNet(video, modelLoaded);





*/