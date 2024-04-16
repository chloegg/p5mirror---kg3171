let state = 0;
let video;
let poseNet;
let vid;
let poses = {};
let leftKneeX = 0;
let leftKneeY = 0;
let rightKneeX = 0;
let rightKneeY = 0;

function setup() {
  createCanvas(400, 400);
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
     console.log("x: " + leftKneeX);
      
      }    
  });

}

function draw() {
  
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
  
}

 function modelLoaded() {
  console.log('Model Loaded!');

  
}
