// Ball2
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, checking if it went off screen,
// and bouncing off paddles.

// Ball2 constructor
//
// Sets the properties with the provided arguments
///////// NEW //////////
// removed vx and vy from arguments as they made speed redundant
// this.vx and this.vy are no longer set from the start
//they now use the ball.setup method to be set
function Ball2(x,y,size,speed) {
  this.x = x;
  this.y = y;
  this.vx;
  this.vy;
  this.size = size;
  this.speed = speed;
  this.angle;
  this.lastPaddle;
}

///////// NEW ////////
//replaced the cartesian speed by polar coordinates for a more unpredictable ball
Ball2.prototype.setup = function(){
  this.angle = randomDouble(random(PI*0.15,PI*0.4));
}
////////// END NEW ////////
// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball2.prototype.update = function () {
  //calculate velocity
  this.vx = this.speed*cos(this.angle);
  this.vy = this.speed*sin(this.angle);
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.angle = -this.angle;
  }
}

Ball2.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0) {
    return "left";
  }
  else if (this.x > width) {
    return "right";
  }
  else {
    return "false";
  }
}

// display()
//
// Draw the ball as a sheep on the screen
Ball2.prototype.display = function () {
  push();
  imageMode(CENTER);
  translate(this.x,this.y);
  rotate(this.angle);
  //the image displays slightly larger than the object size because the "sheep"
  //is not perfectly round - it has a beak and little hands and a tail sticking out
  // and i did not want these to be the point at which a collision was considered to be happening
  image(sheep,0,0,this.size*1.2,this.size*1.2);
  pop();
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball2.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.angle += PI;
      // change lastPaddle to the paddle that was called in the function
      this.lastPaddle = paddle;
    }
  }
}
//////////NEW /////////
// enclosureCollison(enclosure)
//
//check if this ball overlaps the enclosure
//and if so reset ball add to enclosure score
Ball2.prototype.enclosureCollision = function(enclosure) {
  //check if the ball overlaps with the enclosure on x axis
  if(this.x+this.size > enclosure.x - enclosure.width/2 && this.x < enclosure.x + enclosure.width/2){
    //Check if the ball overlaps the enclosure on y axis
    if(this.y+this.size > enclosure.y - enclosure.height/2 && this.y < enclosure.y + enclosure.height/2) {
      return true;
      this.lastPaddle = none;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
}
//////// END NEW ///////

// reset()
//
// Set position back to top of the screen with a random angle
Ball2.prototype.reset = function () {
  this.x = width/2;
  this.y = 0;
  this.angle = randomDouble(random(PI*0.15,PI*0.4));
}

//BarkedAt()
// this modifies the ball angle accordingly to being barked at
Ball2.prototype.barkedAt = function(paddle) {
  if (paddle.barkStatus === "clockwise"){
    this.angle += PI/16;
  }
  if (paddle.barkStatus === "counter"){
    text("B0RK",this.x+edge, this.y+random(-60,0));
    this.angle -= PI/16;
  }
  console.log("ball2 is being barkedAt");
}
