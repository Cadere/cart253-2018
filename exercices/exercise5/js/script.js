// Basic OO Pong
// by Pippin Barr
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
//these are the variables for the color of the background
var bgRed;
var bgGreen;
var bgBlue;

//this sets the initial value of the fgFill color
var fgColorBaseValue = 255;
//this sets the maximum value of the colors
var colorMaxValue = 255;
//this sets the minimum value of the colors
var colorMinValue = 0;
// this sets the pace at which the fgFill color values are modified
var colorModifier = 25.5;


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
  //Create a foreground fill
  fgFill = new Fill(fgColorBaseValue,fgColorBaseValue,fgColorBaseValue);
  // Create a ball
  ball = new Ball(width/2,height/2,10,5);
  ////////// NEW ////////////
  //added ball.setup to set the velocities randomNegative(speed)
  // for some reason I couldn't do it directly in the constructor
  ball.setup();
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);

  //////// NEW /////////
  ////// TEMP /////////
  bgRed = 0;
  bgGreen =  0;
  bgBlue = 0;
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  /////// NEW ///////
  //replaced the background color value with variables
  background(bgRed,bgGreen,bgBlue);
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
//////// END NEW ///////
