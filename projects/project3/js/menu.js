//menu
//
//A class that defines how the menu acts
//
//scoreboard constructor
function Menu(){
  this.x;
  this.topEdge;
  this.body;
  this.width;
  this.height;
  this.options = 4;
  this.optionHeight;
  this.textSize;
  this.fill = "#aed79d";
  this.highlightFill = "#eeefc0";
}

//defineAttributes()
//
//this function defines the position and size of the Scoreboard
Menu.prototype.defineAttributes = function(){
  this.x = sidebarWidth/2;
  this.topEdge = height*0.35;
  this.body = height*0.5;
  this.width = sidebarWidth*0.75;
  this.height = height*0.08;
  var widthRatio = sidebarWidth/10;
  var heightRatio = this.height/3;
  if(widthRatio < heightRatio){
    this.textSize = widthRatio;
  }
  else {
    this.textSize = heightRatio;
  }
  this.optionHeight = [];
  for (var i = 0; i < this.options; i++){
    this.optionHeight.push(this.topEdge+this.body/(this.options+1)*(i+1));
  }
}

//display()
//
//displays the Scoreboard
Menu.prototype.display = function(){
  push();
  noStroke();
  fill(this.fill);
  rectMode(CENTER);
  for (var i = 0; i < this.options; i++){
    rect(this.x, this.optionHeight[i],this.width,this.height);
  }
  pop();
  push();
  fill("#61a08e");
  textFont(ttLakes);
  textSize(this.textSize);
  textLeading(this.textSize*0.9);
  textAlign(CENTER, CENTER);
  text("START A NEW GAME",this.x,this.topEdge);
  pop();
}
