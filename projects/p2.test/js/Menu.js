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
 if (keyIsPressed && key === UP_ARROW){
   // upOrDown = "up";
   // return upOrDown;
   if(this.state === this.choiceNumber){
     this.state = 1;
     console.log("down is happening")
   }
   else{
     this.state += 1;
   }
 }
 else if (keyIsDown(DOWN_ARROW)){
   // upOrDown = "down";
   // return upOrDown;
   if(this.state === 0 || this.state === 1){
     this.state = this.choiceNumber;
   }
   else{
     this.state -= 1;
   }
 }
 // else {
 //   upOrDown = "none"
 //   return upOrDown;
 // }
}

// // this method updates the menu's state
// Menu.prototype.update = function(){
//   if(upOrDown = "down"){
//     if(this.state === this.choiceNumber){
//       this.state = 1;
//       console.log("down is happening")
//     }
//     else{
//       this.state += 1;
//     }
//   }
//   if(upOrDown = "up"){
//     if(this.state === 0 || this.state === 1){
//       this.state = this.choiceNumber;
//     }
//     else{
//       this.state -= 1;
//     }
//   }
// }
