// Pong
// by Pippin Barr
//Modified by Eugene Fournier
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.

/////// NEW ///////
// Game colors
//removed bgColor
// this will serve as a base value for the background colors
var colorBaseValue = 100;
var maxColorValue = 255;
// these values will serve to replace bgColor
var bgRed = colorBaseValue;
var bgGreen = colorBaseValue;
var bgBlue = colorBaseValue;
//removed fgcolor
// these values will serve to replace fgcolor : they are the foreground fill
var redValue;
var greenValue;
var blueValue;
// a varaible for the value by which I modify the colors
var colorModifier = 25.5;

// a variable that checks if the game is over
var gameOver;

////// END NEW //////

// BALL

// Basic definition of a ball object with its key properties of
// position, size, velocity, and speed
var ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  ////////// NEW /////////
  // changed the speed because I found it frustratingly slow
  //added the score property
  speed: 8,
  upKeyCode: 87, // The key code for W
  downKeyCode: 83, // The key code for S
  score: 0
  ////////// END NEW ////////////
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  ////////// NEW /////////
  // changed the speed because I found it frustratingly slow
  //added the score property
  speed: 8,
  upKeyCode: 38, // The key code for the UP ARROW
  downKeyCode: 40, // The key code for the DOWN ARROW
  score: 0
  ////////// END NEW ////////////
}

// A variable to hold the beep sound we will play on bouncing
var beepSFX;
////////// NEW /////////
// a variable to hold the cheering sound when you win
var cheeringSound;
var booingSound;
////////// END NEW ////////////

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  ////////// NEW /////////
  cheeringSound = new Audio("assets/sounds/cheering.mp3");
  booingSound = new Audio("assets/sounds/booing.mp3");
  ////////// END NEW ////////////
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640,480);
  rectMode(CENTER);
  noStroke();
  /////// NEW ////////
  //moved fill() to draw since the color values are now getting updated
  //every time someone scores a point
  //base color values are set here; the result is white
  redValue = 255;
  greenValue = 255;
  blueValue = 255;
  /////// END NEW /////

  setupPaddles();
  setupBall();
}

// setupPaddles()
//
// Sets the positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle
  leftPaddle.x = paddleInset;
  leftPaddle.y = height/2;

  // Initialise the right paddle
  rightPaddle.x = width - paddleInset;
  rightPaddle.y = height/2;
}

// setupBall()
//
// Sets the position and velocity of the ball
///// NEW ///////
function setupBall() {
  ball.x = width/2;
  ball.y = height/2;
  ball.vx = randomNegative(ball.speed);
  ball.vy = randomNegative(ball.speed);
}
//////END NEW //////

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  winningCondition();

  if(!gameOver){
    //update background color values
    bgColor();
    // Fill the background
    background(bgRed,bgGreen,bgBlue);

    // Handle input
    // Notice how we're using the SAME FUNCTION to handle the input
    // for the two paddles!
    handleInput(leftPaddle);
    handleInput(rightPaddle);

    // Update positions of all objects
    // Notice how we're using the SAME FUNCTION to handle the input
    // for all three objects!
    updatePosition(leftPaddle);
    updatePosition(rightPaddle);
    updatePosition(ball);

    // Handle collisions
    handleBallWallCollision();
    handleBallPaddleCollision(leftPaddle);
    handleBallPaddleCollision(rightPaddle);

    // Handle the ball going off screen
    handleBallOffScreen();

    //update the color of the objects on screen
    //the values of the color variables are updated at the same time as the scores
    fill(redValue,greenValue,blueValue);

    // Display the paddles and ball
    displayPaddle(leftPaddle);
    displayPaddle(rightPaddle);
    displayBall();
  }
  else {
    displayWinning();
  }
}


// handleInput(paddle)
//
// Updates the paddle's velocity based on whether one of its movement
// keys are pressed or not.
// Takes one parameter: the paddle to handle.
function handleInput(paddle) {

  // Set the velocity based on whether one or neither of the keys is pressed

  // NOTE how we can change properties in the object, like .vy and they will
  // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
  // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

  // UNLIKE most variables passed into functions, which just pass their VALUE,
  // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
  // gets passed, so we can change its properties etc.

  // Check whether the upKeyCode is being pressed
  // NOTE how this relies on the paddle passed as a parameter having the
  // property .upKey
  if (keyIsDown(paddle.upKeyCode)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(paddle.downKeyCode)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePosition(object)
//
// Sets the position of the object passed in based on its velocity
// Takes one parameter: the object to update, which will be a paddle or a ball
//
// NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
// properties, which is true of both the two paddles and the ball
function updatePosition(object) {
  object.x += object.vx;
  object.y += object.vy;
}

// handleBallWallCollision()
//
// Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
// and is so reverses its vy
function handleBallWallCollision() {

  // Calculate edges of ball for clearer if statement below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball colliding with top and bottom
  if (ballTop < 0 || ballBottom > height) {
    // If it touched the top or bottom, reverse its vy
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// handleBallPaddleCollision(paddle)
//
// Checks if the ball overlaps the specified paddle and if so
// reverses the ball's vx so it bounces
function handleBallPaddleCollision(paddle) {

  // Calculate edges of ball for clearer if statements below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = paddle.y - paddle.h/2;
  var paddleBottom = paddle.y + paddle.h/2;
  var paddleLeft = paddle.x - paddle.w/2;
  var paddleRight = paddle.x + paddle.w/2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle so reverse its vx
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
      resetBallSpeed();
    }
  }
}

// handleBallOffScreen()
//
// Checks if the ball has gone off screen to the left or right
// and moves it back to the centre if so
function handleBallOffScreen() {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball going off the sides
  if (ballRight < 0 || ballLeft > width) {
    // If it went off either side, reset it to the centre
    ball.x = width/2;
    ball.y = height/2;


    ////////NEW///////
    //this modifies the paddles's scores depending on which side of the screen the ball went off
    // it also modifies the fill color
    if(ballRight < 0){
      rightPaddle.score +=1;
      //the more points the right paddle has vs the left paddle, the more cyan the paddles and ball become
      redValue = constrain(redValue - colorModifier, 0, 255);
      blueValue = constrain(blueValue + colorModifier, 0, 255);
      //this makes it so the ball will next shoot at a random speed towards this paddle
      ball.vy = randomNegative(random(ball.speed/2, ball.speed*2));
      ball.vx = ball.speed;

    }
    if(ballLeft > width){
      //the more points the left  paddle has vs the right paddle, the more yellow the paddles and ball become
      leftPaddle.score +=1;
      redValue = constrain(redValue + colorModifier, 0, 255);
      blueValue = constrain(blueValue - colorModifier, 0, 255);
      //this makes it so the ball will next shoot at a random speed towards this paddle
      ball.vy = randomNegative(random(-ball.speed/2, -ball.speed*2));
      ball.vx = -ball.speed;
    }
    ////////END NEW//////////

    // NOTE that we don't change its velocity here so it just
    // carries on moving with the same velocity after its
    // position is reset.
    // This is where we would count points etc!
  }
}

// displayBall()
//
// Draws ball on screen based on its properties
function displayBall() {
  //////////// NEW//////////////
  // Make ball an ellipse
  ellipse(ball.x,ball.y,ball.size,ball.size);
  /////////// END NEW ///////////////
}

// displayPaddle(paddle)
//
// Draws the specified paddle on screen based on its properties
function displayPaddle(paddle) {
  rect(paddle.x,paddle.y,paddle.w,paddle.h);
}

///////// NEW //////
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

//this updates the values of the variables for the background colors

function bgColor() {
  bgGreen = colorBaseValue + (leftPaddle.score + rightPaddle.score)*2;
  if (bgGreen > 170) {
    //here I am doing a bad job of avoiding magic numbers
    // bgRed and bgBlue start changing value when the total score has reached 35
    // (that's the point I felt the green was getting too saturated)
    // I am using map() here because at first I was using bgRed = colorBaseValue + leftPaddle.score
    // but this led to a sudden jump in color when if became true
    // 13 and  100 here represent slightly arbitrary, plausible score values at the moment of total score = 35
    // and at the moment bgGreen will max up
    bgRed = map(leftPaddle.score, 13, 100, colorBaseValue, maxColorValue);
    bgBlue = map(rightPaddle.score, 13, 100, colorBaseValue, maxColorValue);
  }
}

//this function checks if there's a winner or if it's a draw
function winningCondition(){
  // I am using color values to check winning because they are tied to the score:
  // redValue < 0 or blueValue < 0 means that one of the players has 10 points more than the other
  if (redValue <= 0) {
    gameOver = true;
  }
  else if (blueValue <=0){
    gameOver = true;
  }
  //Here I am using bgGreen as a measure of the game being a draw
  // bgGreen > 255 means 125 points have been scored
  // this is frankly very long
  // it's time for this to end
  else if(bgGreen > 255){
    gameOver = true;
  }
  else {
    gameOver = false;
  }
}


//this function checks if there's a winner or if it's a draw
// and displays appropriate text if such is the case
function displayWinning(){
  // I am using color values to check winning because they are tied to the score:
  // redValue < 0 or blueValue < 0 means that one of the players has 10 points more than the other
  if (redValue <= 0) {
    push();
    beepSFX.pause();
    cheeringSound.play();
    background(colorBaseValue);
    textAlign(CENTER, CENTER);
    textFont("Agency FB");
    textSize(48);
    text("RIGHT PADDLE WON!", width/2, height/2);
    pop();
  }

  if (blueValue <= 0) {
    push();
    beepSFX.pause();
    cheeringSound.play();
    background(colorBaseValue);
    textAlign(CENTER, CENTER);
    textFont("Agency FB");
    textSize(48);
    text("LEFT PADDLE WON!", width/2, height/2);
    pop();
  }
  //Here I am using bgGreen as a measure of the game being a draw
  // bgGreen > 255 means 125 points have been scored
  // this is frankly very long
  // it's time for this to end
  if (bgGreen > 255) {
    push();
    beepSFX.pause();
    booingSound.play();
    background(colorBaseValue);
    textAlign(CENTER, CENTER);
    textFont("Agency FB");
    textSize(48);
    text("IT'S A DRAW!", width/2, height/2);
    pop();
  }
}

//this fucntion resets the ball's velocity to the original speed
function resetBallSpeed(){
  if (ball.vy < 0) {
    ball.vy = -ball.speed;
  }
  else {
    ball.vy = ball.speed;
  }
}
