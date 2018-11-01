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

///// NEW /////
// Taken from the spacelove game
// Tracking the current state of the program (title screen to begin)
var state = "TITLE";
/////// END NEW //////

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
  //sets the starting velocity of the ball object we just created
  ball.setup();
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  ////// NEW //////////
  // the switch statement checks the state of the game
  // and displays the proper screen
  switch (state) {
  case "TITLE":
  displayTitle();
  break;

  case "GAME":
  displayGame();
  break;

  case "GAME OVER":
  displayGameOver();
  break;
}
}

/////// NEW ///////
function displayGame() {
  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
/////// NEW ////////
// ball.isOffScreen now recognizes which side of the screen the ball went off to
// The paddle's scores update accordingly
  if (ball.isOffScreen() === "left") {
    ball.reset()
    leftPaddle.updateScore();
  }
  else if (ball.isOffScreen() === "right"){
    ball.reset()
    rightPaddle.updateScore();
  }

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
