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
  this.optionText = ["8 TILES", "12 TILES", "16 TILES", "24 TILES"]
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
  //displays the boxes
  push();
  noStroke();
  fill(this.fill);
  rectMode(CENTER);
  for (var i = 0; i < this.options; i++){
    rect(this.x, this.optionHeight[i],this.width,this.height);
  }
  pop();
  //detects hovering and displays a yellow box over the option
  //over which the mouse is hovering
  this.detectHover();
  //displays the title text
  push();
  fill("#eeefc0");
  textFont(ttLakesBold);
  textSize(this.textSize);
  textLeading(this.textSize*0.9);
  textAlign(CENTER, TOP);
  text("START A NEW GAME",this.x,this.topEdge);
  pop();
  //displays the option texts
  push();
  fill("#61a08e");
  textFont(ttLakes);
  textSize(this.textSize);
  textLeading(this.textSize*0.9);
  textAlign(CENTER, CENTER);
  for (var i = 0; i < this.options; i++){
    text(this.optionText[i],this.x,this.optionHeight[i]);
  }
  pop();
}

//detectHover()
//
//detects if the mouse is hovering over one of the options
// and displays a rectangle over this option
Menu.prototype.detectHover = function(){
  if(mouseX > this.x-this.width/2 && mouseX < this.x+this.width/2){
    for (var i = 0; i < this.options; i++){
      if(mouseY > this.optionHeight[i]-this.height/2 && mouseY < this.optionHeight[i]+this.height/2){
        push();
        noStroke();
        fill(this.highlightFill);
        rectMode(CENTER);
        rect(this.x, this.optionHeight[i],this.width,this.height);
        pop();
      }
    }
  }
}
