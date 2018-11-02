// Scoreboard
//
// A class that defines how a scoreboard acts
// Includes displaying the player score

// Scoreboard constructor
//
// Sets the properties with the provided arguments
function Scoreboard (x,y,width,height,fill,name){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fill = fill;
  this.name = name;
  this.score;
  this.xCenter = this.x + this.width/2;
}

//display
//
//this method displays the Scoreboard
Scoreboard.prototype.display(){
  push();
  fill(this.fill);
  noStroke();
  rect(this.x,this.y,this.width,this.height);
  fill(255);
  textFont("Agency FB");
  textSize("24");
  textAlign (CENTER, CENTER);
  text(this.name, this.xCenter, (this.y + this.height/5))
}
