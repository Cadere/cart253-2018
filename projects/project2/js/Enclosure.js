//Enclosure
//
//A class that defines how an enclosure acts
//the enclosure handles collisions with the ball and resets it
//but it does not dock points to the players
//
//Enclosure constructor
function Enclosure(x,y,width,height,fill){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fill = fill;
  this.score = 0;
}

// display()
//
// Draw the Enclosure as a rectangle on the screen
Enclosure.prototype.display = function() {
  push();
  fill(this.fill);
  rectMode(CENTER);
  noStroke();
  rect(this.x,this.y,this.width,this.height);
  pop();
}
//updateScore
//
// this method updates the enclosure's score
Enclosure.prototype.updateScore = function() {
  this.score += 1;
}
///////// END NEW //////////

////////// NEW /////////
//resetScore
//
// this method resets the enclosure's score to 0
Enclosure.prototype.resetScore = function () {
  this.score = 0
}
