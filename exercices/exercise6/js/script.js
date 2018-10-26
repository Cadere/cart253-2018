// Broken Basic OO Pong
// by Pippin Barr
//
// A broken primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
//////////////// FIXED:ball mispelled as bal
var ball;
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  //////////////// FIXED: createCanvas mispelled as crateCanvas
  createCanvas(640,480);
  noStroke();
  // Create a ball
  //////////////// FIXED: Ball speed and velocities were way too high
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,600,10,UP_ARROW,DOWN_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  //////////////// FIXED: missing )
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
  //////////////// FIXED: missing }
}


    // draw()
    //
    // Handles input, updates all the elements, checks for collisions
    // and displays everything.
    function draw() {
      background(0);

      leftPaddle.handleInput();
      rightPaddle.handleInput();

//////////////// FIXED: missing () after .update --> ball.update()
      ball.update();
      leftPaddle.update();
      rightPaddle.update();
//////////////// FIXED: missing {
//////////////// FIXED: ball.isOffTheScreen should have been ball.isOffScreen
      if (ball.isOffScreen()){
        //////////////// FIXED: reset();  should have been ball.reset();
      ball.reset();
    }

    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);

    ball.display();
    leftPaddle.display();
    //////////////// FIXED: missing )
    rightPaddle.display();
    }
