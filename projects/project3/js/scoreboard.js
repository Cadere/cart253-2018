//scoreboard
//
//A class that defines how the scoreboard acts
//
//scoreboard constructor
function Scoreboard(){
  this.attempts;
  this.x;
  this.y;
  this.width;
  this.height;
  this.fill;
}

//defineAttributes()
//
//this function defines the position and size of the Scoreboard
Scoreboard.prototype.defineAttributes = function(){
  this.x = sidebarWidth/2;
  this.y = height/5;
  this.width = sidebarWitdh*0.75;
  this.y = height/10;
}
