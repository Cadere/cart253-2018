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
  this.textSize;
  this.fill = "#f3b8ac";
}

//defineAttributes()
//
//this function defines the position and size of the Scoreboard
Scoreboard.prototype.defineAttributes = function(){
  this.x = sidebarWidth/2;
  this.y = height/5;
  this.width = sidebarWidth*0.75;
  this.height = height/10;
  this.textSize = sidebarWidth/9;
}

//display()
//
//displays the Scoreboard
Scoreboard.prototype.display = function(){
  push();
  noStroke();
  fill(this.fill);
  rectMode(CENTER);
  rect(this.x,this.y,this.width,this.height);
  fill(255);
  textFont(ttLakes);
  textSize(this.textSize);
  textLeading(this.textSize*0.9);
  textAlign(CENTER, CENTER);
  text(attempts + "/" + nbAttempts + "\n attempts",this.x,this.y);
  pop();
}
