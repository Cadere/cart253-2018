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
  this.state = 1;
  //these are the keys to move in the menu
  this.leftKey = leftKey;
  this.rightKey = rightKey;
  //this is the key to confirm a choice
  this.confirmKey = confirmKey;
  //this is the commands text
  this.instructions = instructions;
  this.menuState;
}

//setup()
//
//This method tells the menu which array to take it's information from
HorizontalMenu.prototype.setup = function(menuState){
  this.menuState = menuState;
}
//display()
//
//this method displays the menu
HorizontalMenu.prototype.display = function(){
  push();
  //this diplsyas a rectangle under the selected option
  rectMode(CENTER);
  noStroke();
  fill(100);
  //the rectangle moves because it uses information in stateArray to define its position
  rect(this.menuState[this.state].y, this.centerHeight, this.size/this.choiceNumber, 150);
  //this displays the title text
  textAlign(CENTER,CENTER);
  textFont("Agency FB");
  textSize(24);
  fill(255);
  text(this.commands,width/2, this.centerHeight+100);
  //this diplays the images
  imageMode(CENTER);
  for (var i = 0; i < this.choiceNumber; i++){
    image(this.menuState[i].image,this.menuState[i].y, this.centerHeight, paddleWidth*2, paddleHeight*2);
  }
  pop();
}



// this method handles keyboard imput in order to change the menu's state
HorizontalMenu.prototype.handleInput= function(){
 if (keyIsDown(this.upKey)){
   //if the state of the menu is at the maximum, it resets to state 1
   //otherwise the state of the menu goes up by one
   if(this.state === this.choiceNumber){
     this.state = 1;
   }
   else{
     this.state += 1;
   }
 }
 //if the state of the menu is at 0 or 1, it goes to state 3
 //it is impossible to go back to state 0 once UP_ARROW or DOWN_ARROW has been pressed
 else if (keyIsDown(this.downKey)){
   if(this.state === 0 || this.state === 1){
     this.state = this.choiceNumber;
   }
   else{
     this.state -= 1;
   }
 }
}
