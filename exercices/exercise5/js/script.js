// Basic OO Pong
// by Pippin Barr
// Modified by Eugene Fournier
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

//////// NEW ////////
//in exercise 4, the background and fill colors change
// so I am adding the same variables for it

//variables for colors in general
//
//this sets the maximum value of the colors
var colorMaxValue = 255;
//this sets the minimum value of the colors
var colorMinValue = 0;

//Variables for fgFill
//
//this sets the initial value of the fgFill color
var fgColorBaseValue = 255;
// this sets the pace at which the fgFill color values are modified
var fgColorModifier = 25.5;
//this sets the initial value

//Variables for bgFill
//
//this sets the initial value of the bgFill color
var bgColorBaseValue = 100;
// this sets the pace at which the bgFill color values are modified
var bgColorModifier = 0.02;

//variable for whether the game is over or not
var gameOver;

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  cheeringSound = new Audio("assets/sounds/cheering.mp3");
  booingSound = new Audio("assets/sounds/booing.mp3");

//////// END NEW ////////

// setup()
//
// Creates the ball and paddles
/////// NEW //////
// note: in the previous version I had modified the paddle speed from 5 to 8
// because 5 was painfully slow
// in this version the paddle speed has a basic speed of 10 which is totally reasonnable
// so I did not modify it
///////END NEW//////
function setup() {
  createCanvas(640,480);
  ///////// NEW /////////
  // No stroke because I find it more aesthetic
  noStroke();
  //Create a foreground fill
  fgFill = new Fill(fgColorBaseValue,fgColorBaseValue,fgColorBaseValue,fgColorModifier);
  //Create a background fill
  bgFill = new Fill(bgColorBaseValue, bgColorBaseValue,bgColorBaseValue,bgColorModifier);
  ///////// END NEW ///////////
  // Create a ball
  ball = new Ball(width/2,height/2,10,5);
  ////////// NEW ////////////
  //added ball.setup to set the velocities randomNegative(speed)
  // for some reason I couldn't do it directly in the constructor
  ball.setup();
  ///////// END NEW ///////////
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  /////// NEW ///////
  //the game can now end, so all the play stuff only happens if gameOver is false
  // we check if the game is over
  winningCondition();
  //then act accordingly
  if (!gameOver) {
    //this method makes the color of the background increasingly green as the game progresses
    bgFill.bgProgress();
    //replaced the background color value with bgFill properties
    background(bgFill.red,bgFill.green,bgFill.blue);
    console.log("bgFill.green", bgFill.green);
    ////// END NEW /////

    leftPaddle.handleInput();
    rightPaddle.handleInput();

    ball.update();
    leftPaddle.update();
    rightPaddle.update();

    ////// NEW /////////
    // if ball.isOffScreen() is true,
    // ball.wentLeft() is checked
    // if ball.wentLeft() is true, rightPaddle's score is updated
    //if ball.wentLeft() is false, then ball went right, and leftPaddle's score is updated
    if (ball.isOffScreen()) {
      if(ball.wentLeft()) {
        rightPaddle.updateScore();
        fgFill.rightScored();
      }
      else{
        leftPaddle.updateScore();
        fgFill.leftScored();
      }
      ball.reset();
    }
    console.log("rightPaddle score", rightPaddle.score, "leftPaddle score",leftPaddle.score);
    //////// END NEW ///////

    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);

    ball.display();
    leftPaddle.display();
    rightPaddle.display();
  }
  else {
    displayWinning();
  }
}

/////// NEW ///////
//this spits a value or its negative at random
function randomNegative(value) {
  var r = random();
  var result;
  if (r < 0.5){
    result = value;
  }
  else {
    result = -value;
  }
  return result;
}

//this function checks if there's a winner or if it's a draw
function winningCondition(){
  // I am using color values to check winning because they are tied to the score:
  // fgFill.red < colorMinValue or fgFill.blue < colorMinValue means that one of the players has 10 points more than the other
  if (fgFill.red <= colorMinValue) {
    gameOver = true;
    return gameOver;
  }
  else if (fgFill.blue <=colorMinValue){
    gameOver = true;
    return gameOver;
  }
  //Here I am using bgGreen as a measure of the game being a draw
  // bgFill.green === colorMaxValue-1 means the game has been going on for a long while
  // it's time for this to end
  else if(bgFill.green === colorMaxValue){
    gameOver = true;
    return gameOver;
  }
  else {
    gameOver = false;
    return gameOver;
  }
}

//function displayWinning()
//
// this function displays text when one of the players wins or there is a draw
function displayWinning(){
  if (fgFill.red <= colorMinValue) {
    push();
    beepSFX.pause();
    cheeringSound.play();
    background(bgColorBaseValue);
    textAlign(CENTER, CENTER);
    textFont("Agency FB");
    textSize(48);
    text("RIGHT PADDLE WON!", width/2, height/2);
    pop();
  }

  if (fgFill.blue <= colorMinValue) {
    push();
    beepSFX.pause();
    cheeringSound.play();
    background(bgColorBaseValue);
    textAlign(CENTER, CENTER);
    textFont("Agency FB");
    textSize(48);
    text("LEFT PADDLE WON!", width/2, height/2);
    pop();
  }
  if (bgFill.green === colorMaxValue) {
    push();
    beepSFX.pause();
    booingSound.play();
    background(bgColorBaseValue);
    textAlign(CENTER, CENTER);
    textFont("Agency FB");
    textSize(48);
    text("IT'S A DRAW!", width/2, height/2);
    pop();
  }
}
//////// END NEW ///////
