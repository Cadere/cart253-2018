//scoreboard
//
//A class that defines how the scoreboard acts
//
//scoreboard constructor
function Scoreboard(){
  this.x;
  this.y;
  this.width;
  this.height;
  this.fill = 255;
}

//defineAttributes()
//
//this function defines the position and size of the Scoreboard
Scoreboard.prototype.defineAttributes = function(){
  this.x = sidebarWidth/2;
  this.y = height/5;
  this.width = sidebarWidth*0.75;
  this.height = height/10;
}

//display()
//
//displays the Scoreboard
Scoreboard.prototype.display = function(){
  push();
  noStroke();
  fill(this.fill);
  ellipseMode(CENTER);
  ellipse(this.x,this.y,this.width,this.height);
  fill(55);
  textAlign(CENTER, CENTER);
  text(attempts + "/" + nbAttempts,this.x,this.y);
  pop();
}
