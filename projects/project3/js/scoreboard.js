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
  this.fill = "#eeefc0";
}

//defineAttributes()
//
//this function defines the position and size of the Scoreboard
Scoreboard.prototype.defineAttributes = function(){
  this.x = sidebarWidth/2;
  this.y = height/5;
  this.width = sidebarWidth*0.5;
  this.height = height/8;
  var widthRatio = sidebarWidth/10;
  var heightRatio = this.height/3;
  if(widthRatio < heightRatio){
    this.textSize = widthRatio;
  }
  else {
    this.textSize = heightRatio;
  }
}

//display()
//
//displays the Scoreboard
Scoreboard.prototype.display = function(){
  push();
  stroke("#d5dd98");
  strokeWeight(7);
  fill(this.fill);
  ellipseMode(CENTER);
  ellipse(this.x,this.y,this.width,this.height);
  pop();
  push();
  fill("#61a08e");
  textFont(ttLakes);
  textSize(this.textSize);
  textLeading(this.textSize*0.9);
  textAlign(CENTER);
  text(attempts + "/" + nbAttempts + "\n attempts",this.x,this.y);
  pop();
}
