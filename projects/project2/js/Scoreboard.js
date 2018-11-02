// Scoreboard
//
// A class that defines how a scoreboard acts
// Includes displaying the player score

// Scoreboard constructor
//
// Sets the properties with the provided arguments
function Scoreboard (x,y,width,height,fill,name,paddle){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fill = fill;
  this.name = name;
  this.paddle = paddle;
  this.score;
  this.xCenter = this.x + this.width/2;
}

//display
//
//this method displays the Scoreboard
Scoreboard.prototype.display = function() {
  push();
  fill(this.fill);
  noStroke();
  rect(this.x,this.y,this.width,this.height);
  fill(255);
  textFont("Agency FB");
  textSize("36");
  textAlign (CENTER, CENTER);
  text(this.name, this.xCenter, this.y + this.height*0.8);
  text(this.score, this.x + this.width*0.8, this.y + this.height*0.6);
}

//update
//
//this methods updates the scoreboard
Scoreboard.prototype.update = function() {
  this.score = this.paddle.score;
}
