//Menu
//
//This is a class for building a menu in which you scroll with arrows
//
//Menu constructor
function Menu(choiceNumber,upKey,downKey){
  //this is the number of choices in the menu
  this.choiceNumber = choiceNumber;
  //this is the menu's distance from the edge of the canvas
  this.edge = height/4;
  this.size = height/2.5;
  // this is the state of the menu i.e. what is selected
  this.state = 0;
  this.upKey = upKey;
  this.downKey = downKey;
}

//display()
//
//this method displays the menu
Menu.prototype.display = function(){
  push();
  //this diplsyas a rectangle under the selected option
  rectMode(CENTER);
  noStroke();
  fill("#6f9351");
  //the rectangle moves because it uses information in stateArray to define its position
  rect(width/2, stateArray[this.state].y, 250, this.size/this.choiceNumber);
  //this displays the text of the different options
  textAlign(CENTER,CENTER);
  textFont("Agency FB");
  textSize(24);
  fill(255);
  text("RUNNING HERD",width/2,stateArray[1].y);
  text("PEN THE SHEEP",width/2,stateArray[2].y);
  text("CHARACTER PICKER",width/2,stateArray[3].y);
  pop();
}



// this method handles keyboard imput in order to change the menu's state
Menu.prototype.handleInput= function(){
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
