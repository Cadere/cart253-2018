//Decoy
//
//A class that defines how a decoy acts
//Decoys look just like balls but do not do anything else than spin
//around the middle of the canvas
// they serve to confuse the players
//
//Decoy constructor
function Decoy(x,y,angle,sinValue,sinMod) {
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.angleSpeed = constrain(1/this.x, -0.2,0.2);
  //The sinValue is the initial value that will be imputed to a modifier for the origin point
  this.sinValue = sinValue;
  //The sinMod is the speed at which the sinValue will be modified in the update method
  this.sinMod = sinMod;
  //the oModifier (originModifier) is added to the origin translation to make the center of rotation more erratic
  this.oModifier = sin(sinValue)*10
}

//display
// this method displays and updates the position of the Decoy
Decoy.prototype.display = function(){
  push();
  translate(width/2+this.oModifier, height/2+this.oModifier);
  rotate(this.angle);
  fill(255);
  noStroke();
  ellipse(this.x,this.y,10);
  console.log(leftScoreboard.x)
  pop();
}

//update
//this method updates the angle of the decoy
Decoy.prototype.update = function(){
  this.angle += this.angleSpeed;
  this.sinValue += this.sinMod;
}

//setup
//this method sets up the initial Decoys
Decoy.prototype.setup = function(){
  push();
  translate(width/2, height/2);
  fill(255);
  noStroke();
  ellipse(this.x, this.y, 10);
  pop();
}
