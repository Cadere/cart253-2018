// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,leftKey,rightKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
  this.score = 0;
  this.character;
  this.barkFill = 0;
  this.barkStatus = "none";
}


////////////// NEW ////////////
//setup()
//tells paddle which character object to get information from
Paddle.prototype.setup = function(character) {
  this.character = character;
}
//////// END NEW ////////

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

//////// NEW /////////
//handleBark()
//
// handles imput from the right and left key to handle barking
Paddle.prototype.handleBark = function() {
  if (keyIsDown(this.rightKey)) {
    this.barkFill = 255;
    this.barkStatus = "clockwise";
    return this.barkStatus;
  }
  else if (keyIsDown(this.leftKey)) {
    this.barkFill = 255;
    this.barkStatus = "counter";
    return this.barkStatus;
    console.log("handleBark")
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a "dog" on the screen
Paddle.prototype.display = function() {
  image(this.character.image,this.x,this.y,this.w,this.h);
}

///////// NEW ////////
//displayBark
//
//this methods displays a bark text next to the paddle and updates the bark opacity (barkFill)
Paddle.prototype.displayBark = function(edge){
  push();
  textFont(agencyFB);
  textSize(16);
  textAlign(CENTER,CENTER);
  fill(255,this.barkFill);
  if (this.barkStatus === "clockwise"){
    text("BARK",this.x+edge, this.y+random(0,60));
  }
  if (this.barkStatus === "counter"){
    text("B0RK",this.x+edge, this.y+random(-60,0));
  }
  this.barkFill -= 5;
}

//updateBark
//
//this method updates the barkStatus when the barkFill reaches 0
Paddle.prototype.updateBark = function() {
  if(this.barkFill === 0){
    this.barkStatus = "none";
    return this.barkStatus;
  }
}

//updateScore
//
// this method updates the paddle's score
Paddle.prototype.updateScore = function() {
  this.score += 1;
}
///////// END NEW //////////

////////// NEW /////////
//resetScore
//
// this method resets the paddle's score to 0
Paddle.prototype.resetScore = function () {
  this.score = 0
}
//////// END NEW ////////
