// Scoreboard
//
// A class that defines how a scoreboard acts
// Includes displaying the player score

// Scoreboard constructor
//
// Sets the properties with the provided arguments
function Scoreboard (x,y,size,fill,name,paddle){
  this.x = x;
  this.y = y;
  this.size = size;
  this.fill = fill;
  this.name = name;
  this.paddle = paddle;
  this.score;
  this.xCenter = this.x + this.size/2;
}

//display
//
//this method displays the Scoreboard
Scoreboard.prototype.display = function() {
  push();
  fill(this.fill);
  noStroke();
  rect(this.x,this.y,this.size,this.size);
  fill(255);
  textFont("Agency FB");
  textSize(14);
  textAlign (CENTER, CENTER);
  //this displays the player name at the bottom of the scoreboard
  text(this.name, this.xCenter, this.y + this.size*0.85);
  // this displays "have escaped from" right above the player's name
  text("escaped from", this.xCenter, this.y + this.size*0.6);
  //
  textSize(24);
  // this displays the score at the top right of the scoreboard
  text(this.score, this.x + this.size*0.3, this.y + this.size*0.3);
  pop();
}

//update
//
//this methods updates the scoreboard
Scoreboard.prototype.update = function() {
  this.score = this.paddle.score;
}
