//                        Pong-Multiplayer
//                                                            by Max O'Dell

//to get the full arcade-experience please install the included font
//once this is done restart your code-editor(e.g.Atom/Sublime) and browser
//(I couldn't get JS to automatically load it sry ;) )
let ballX;
let ballY;
let ballD;

let tail;

let pad1X;
let pad2X;
let pad1Y;
let pad2Y;
let pad1l;
let pad2l;
let padB;

let stepX;
let stepY;
let stepXdefault;
let stepYdefault;

let sco1;
let sco2;

let chance;

let play;

let myFont;

let red;
let blue;

let r;
let g;
let b;

let z;
let q;


function preload() {
  myFont = "Press Start";
  //myFont = loadFont("./prstart.ttf");
}




function setup() {
  createCanvas(windowWidth, windowHeight - 4);

  //random direction and speed
  chance = [-1, 1]
  stepXdefault = random(8, 15) * random(chance);
  stepYdefault = random(6, 12) * random(chance);

  //padle1 parameters
  pad1l = 180;
  pad1X = 50;
  pad1Y = height / 2 - pad1l / 2;

  //padle2 parameters
  pad2l = pad1l;
  pad2X = width - pad1X;
  pad2Y = height / 2 - pad2l / 2;

  //ball parameters
  ballX = width / 2;
  ballY = height / 2;
  ballD = 60;

  //scoreboard parameters
  sco1 = 0;
  sco2 = 0;

  //play/pause parameter
  play = (-1);

  //tail parameters
  r = 0;
  g = 0;
  b = 0;


  //colour parameters
  red = color(255, 0, 2);
  blue = color(13, 22, 220);


}


//play/pause variable toggle
function keyTyped() {
  if (key === " ") {
    play = play * (-1);
  }
}



function draw() {
  frameRate(60);


  background(0);
  fill(255);

  if (play == (-1)) {
    stepX = 0;
    stepY = 0;
  }
  if (play == 1) {
    stepX = stepXdefault;
    stepY = stepYdefault;
  }


  //frame
  noStroke();
  rect(0, height - 20, width, 25);
  rect(0, 0, width, 70)



  //tail
  q = 0.4;
  z = q;
  fill(r, g, b, 220);
  ellipse(ballX - z * stepXdefault, ballY - z * stepYdefault, ballD);
  z += q;
  fill(r, g, b, 185);
  ellipse(ballX - z * stepXdefault, ballY - z * stepYdefault, ballD * 0.95);
  z += q;
  fill(r, g, b, 150);
  ellipse(ballX - z * stepXdefault, ballY - z * stepYdefault, ballD * 0.9);
  z += q;
  fill(r, g, b, 115);
  ellipse(ballX - z * stepXdefault, ballY - z * stepYdefault, ballD * 0.85);
  z += q;
  fill(r, g, b, 80);
  ellipse(ballX - z * stepXdefault, ballY - z * stepYdefault, ballD * 0.8);
  z += q;
  fill(r, g, b, 45);
  ellipse(ballX - z * stepXdefault, ballY - z * stepYdefault, ballD * 0.75);



  //ball
  noStroke();
  fill(255);
  ellipse(ballX, ballY, ballD);
  ballX += stepX;
  ballY += stepY;



  //left reset
  if (ballX + ballD / 2 < 0) {
    ballX = width / 2;
    ballY = height / 2;
    sco2 += 1;
    stepXdefault = stepXdefault * (-1);
    r = 0;
    g = 0;
    b = 0;
  }

  //right reset
  if (ballX - ballD / 2 > width) {
    ballX = width / 2;
    ballY = height / 2;
    sco1 += 1;
    stepXdefault = stepXdefault * (-1);
    r = 0;
    g = 0;
    b = 0;
  }

  //top bounce
  if (ballY - ballD / 2 < 72.5) {
    stepYdefault = stepYdefault * (-1);
  }

  //bottom bounce
  if (ballY + ballD / 2 > height - 22.5) {
    stepYdefault = stepYdefault * (-1);
  }
  padB = 5;
  //paddle1
  fill(255);
  strokeWeight(3);
  stroke(red);
  rect(pad1X, pad1Y, 10, pad1l, padB);

  //paddle1 controls
  //up
  if (pad1Y > 72.5) {
    if (keyIsDown(87)) {
      pad1Y -= 10
    }
  }
  //down
  if (pad1Y < height - pad1l - 22.5) {
    if (keyIsDown(65)) {
      pad1Y += 10
    }
  }
  //padle1 bounce
  if (ballX - ballD / 2 <= pad1X + padB && ballX + ballD / 2 >= pad1X + padB) {
    if (ballY + ballD / 2 >= pad1Y && ballY - ballD / 2 <= pad1Y + pad1l) {
      stepXdefault = stepXdefault * (-1);
      r = 255;
      g = 0;
      b = 2;
    }
  }

  //paddle2
  fill(255);
  stroke(blue);
  rect(pad2X, pad2Y, 10, pad2l, padB);

  //paddle2 controls
  //up
  if (pad2Y > 72.5) {
    if (keyIsDown(79)) {
      pad2Y -= 10
    }
  }
  //down
  if (pad2Y < height - pad2l - 22.5) {
    if (keyIsDown(76)) {
      pad2Y += 10
    }
  }

  //paddle2 bounce
  if (ballX + ballD / 2 >= pad2X && ballX - ballD / 2 <= pad2X) {
    if (ballY + ballD / 2 >= pad2Y && ballY - ballD / 2 <= pad2Y + pad2l) {
      stepXdefault = stepXdefault * (-1);
      r = 13;
      g = 22;
      b = 220;
    }
  }

  //scoreboard
  fill(255);
  textSize(30);
  textFont(myFont);
  textAlign(LEFT, BASELINE);
  stroke(red);
  text("PLAYER1: " + sco1, 50, 50);
  textAlign(RIGHT, BASELINE)
  stroke(blue);
  text("PLAYER2: " + sco2, width - 50, 50);
  //text(sco1 +":" + sco2,width/2-40,50);

  //pause menu
  if (play == (-1)) {
    stroke(0, 0, 0, 175);
    fill(100, 100, 100, 175);
    rect(100, 100, width - 200, height - 200, 10);
    stroke(0);
    fill(255);
    textFont(myFont);
    textSize(40);
    textAlign(CENTER, BASELINE)
    text("CONTROLS", width / 2, 160);

    //spacebar
    fill(255);
    rect(width / 2 - 200, height - 200, 400, 50, 10);
    fill(0);
    noStroke();
    textSize(30);
    textAlign(CENTER, TOP);
    text("PLAY/PAUSE", width / 2, height - 187);

    //W
    stroke(red);
    fill(255);
    rect(300, 300, 50, 50, 5);
    noStroke();
    fill(0);
    textSize(30);
    textAlign(LEFT, TOP);
    text("W", 312.5, 310);
    //A
    stroke(red);
    fill(255);
    rect(260, 355, 50, 50, 5);
    noStroke();
    fill(0);
    textSize(30);
    textAlign(LEFT, TOP);
    text("A", 272.5, 365);

    //O
    stroke(blue);
    fill(255);
    rect(width - 280, 300, 50, 50, 5);
    noStroke();
    fill(0);
    textSize(30);
    textAlign(LEFT, TOP);
    text("O", width - 267, 310);
    //L
    stroke(blue);
    fill(255);
    rect(width - 260, 355, 50, 50, 5);
    noStroke();
    fill(0);
    textSize(30);
    textAlign(LEFT, TOP);
    text("L", width - 250, 365)


  }
}
