//Menu
//
//This is a class for building a menu in which you scroll with arrows
//
//Menu constructor
function Menu(choiceNumber){
  this.choiceNumber = choiceNumber;
  this.edge = height/4;
  this.size = height/2.5;
  this.state = 0;
}

Menu.prototype.display = function(){
  push();
  rectMode(CENTER);
  fill(150);
  rect(width/2, stateArray[this.state].y, 250, this.size/this.choiceNumber);
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
 if (keyIsDown(UP_ARROW)){
   if(this.state === this.choiceNumber){
     this.state = 1;
     console.log("down is happening")
   }
   else{
     this.state += 1;
   }
 }
 else if (keyIsDown(DOWN_ARROW)){
   if(this.state === 0 || this.state === 1){
     this.state = this.choiceNumber;
   }
   else{
     this.state -= 1;
   }
 }
}
