//HorizontalMenu
//
//This is a class for building a menu in which you scroll with arrows from side to side
//
//Menu constructor
function HorizontalMenu(centerHeight,choiceNumber,leftKey,rightKey,confirmKey,instructions){
  this.centerHeight = centerHeight;
  //this is the number of choices in the menu
  this.choiceNumber = choiceNumber;
  //this is the menu's distance from the edge of the canvas
  this.edge = width/5;
  this.size = width*0.6;
  // this is the state of the menu i.e. what is selected
  this.state = 0;
  //these are the keys to move in the menu
  this.leftKey = leftKey;
  this.rightKey = rightKey;
  //this is the key to confirm a choice
  this.confirmKey = confirmKey;
  //this is the commands text
  this.instructions = instructions;
  this.menuInfo;
}

//setup()
//
//This method tells the menu which array to take it's information from
HorizontalMenu.prototype.setup = function(menuInfo){
  this.menuInfo = menuInfo;
}
//display()
//
//this method displays the menu
HorizontalMenu.prototype.display = function(){
  push();
  //this displayss a rectangle under the selected option
  rectMode(CENTER);
  noStroke();
  fill("#6f9351");
  //the rectangle moves because it uses information in stateArray to define its position
  rect(this.menuInfo[this.state].y, this.centerHeight, this.size/this.choiceNumber, 150);
  //this displays the title text
  textAlign(LEFT,CENTER);
  textFont(agencyFB);
  textSize(16);
  fill(255);
  text(this.instructions,this.edge+this.size, this.centerHeight);
  //this diplays the images
  imageMode(CENTER);
  for (var i = 0; i < this.choiceNumber; i++){
    image(this.menuInfo[i].image,this.menuInfo[i].y, this.centerHeight, paddleWidth*2, paddleHeight*2);
  }
  pop();
}



// this method handles keyboard imput in order to change the menu's state
HorizontalMenu.prototype.handleInput= function(){

}

HorizontalMenu.prototype.keyPressed = function (){
  if (keyIsDown(this.rightKey)){
    //if the state of the menu is at the maximum, it resets to state 1
    //otherwise the state of the menu goes up by one
    if(this.state === this.choiceNumber-1){
      this.state = 0;
    }
    else{
      this.state += 1;
    }
  }
  //if the state of the menu is at 0 or 1, it goes to state 3
  //it is impossible to go back to state 0 once UP_ARROW or DOWN_ARROW has been pressed
  else if (keyIsDown(this.leftKey)){
    if(this.state === 0){
      this.state = this.choiceNumber-1;
    }
    else{
      this.state -= 1;
    }
  }
}

//handleConfirm
//
//this method handles keyboard input in order to determine if the confirm key has been pressed
HorizontalMenu.prototype.handleConfirm = function(horizontalMenu){
  if (keyIsDown(this.confirmKey)){
    return true;
  }
}
