song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristStatus = "";
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("08 Collective Behavior.mp3")
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log('Score Left Wrist - '+scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X - "+leftWristX+" Left Wrist Y - "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X - "+rightWristX+" Right Wrist Y - "+rightWristY);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    leftWristStatus = song1.isPlaying();
    rightWristStatus = song2.isPlaying();
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(leftWristStatus == false){
            song1.play();
            document.getElementById('song_name').innerHTML = "DJ is playing";
        }
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(rightWristStatus == false){
            song2.play();
            document.getElementById('song_name').innerHTML = "Little Alchemy 2 is playing";
        }
    }  
}
function start(){
    song1.play();
}