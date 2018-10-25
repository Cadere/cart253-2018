// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
/////// NEW ////////
// removed vx and vy from the arguments you can specify, as it made speed obsolete
// the values of this.vx and this.vy are no longer assigned here
// Sets the properties with the provided arguments
function Ball(x,y,size,speed) {
  this.x = x;
  this.y = y;
  this.vx;
  this.vy;
  this.size = size;
  this.speed = speed;
}
////////// END NEW ////////

///////// NEW ////////
//this function sets the initial velocity of the Ball to the speed or the negative of the speed, at random
//I wanted to do this along with stating the arguments but it wasn't working
Ball.prototype.setup = function(){
  this.vx = randomNegative(this.speed);
  this.vy = randomNegative(this.speed);
}
////////// END NEW ////////

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    return true;
  }
  else {
    return false;
  }
}

////////// NEW ///////////
//wentLeft()
//
// checks which side the ball has moved off
Ball.prototype.wentLeft = function () {
  // check for going off screen to the left
  if (this.x + this.size < 0){
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  fill(255);
  /////// NEW ///////
  //changed the ball to an ellipse
  ellipse(this.x,this.y,this.size,this.size);
  /////// END NEW ////////
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      //////// NEW //////////
      // Resets vy to original velocity
      if (this.vy < 0){
        this.vy = -this.speed;
      }
      else {
        this.vy = this.speed;
      }

    }
  }
}

// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
  /////// NEW ////////
  //this makes it so the ball shoots back towards the paddle that just won a point
  // ie if it went out left, it will shoot right
  // this simply reverses the vx value
  this.vx = -this.vx;
  //this resets the vy to a random direction and a random speed
  //this way the scoring paddle cannot know if the ball will go up or down and how fast
  this.vy = randomNegative(random(this.speed/2, this.speed*2));
  //////// END NEW///////
}
