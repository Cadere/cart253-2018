// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
//////////////// FIXED: next line was not commented
//Paddle constructor
//////////////// FIXED: next line was not commented
//Sets the properties with the provided arguments or defaults
//////////////// FIXED: paddle mispelled as pladdle
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.xv = 0;
  this.yv = 0;
  this.w = w;
  this.h = h;
  //////////////// FIXED: speed mispelled as speeed
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
//////////////// FIXED: prototype misspelled
Paddle.prototype.handleInput = function() {
  //////////////// FIXED: parameter should be this.upKey
  if (keyDown(this.upKey)) {
    this.vy = -this.speed;
  }
  //////////////// FIXED: parameter should have been this.downKey
  else if (keyDown(this.downKey)) {
    //////////////// FIXED: this.vy = -this.speed should have been this.vy = this.speed so it behaves properly
    this.vy = this.speed;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constraint(this.y,0,hight-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
//////////////// FIXED: disploy instead of display and missing {
Paddle.prototype.display = function() {
  rectangle(this.x,this.y,this.w,this.h);
}
