//Decoy
//
//A class that defines how a decoy acts
//Decoys look just like balls but do not do anything else than spin
//around the middle of the canvas
// they serve to confuse the players
//
//Decoy constructor
function Decoy(x,y,angle,andleSpeed) {
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.angleSpeed = angleSpeed;
}

//display
// this method displays and updates the position of the Decoy
Decoy.prototype.display = function(){
  push();
  translate(width/2, height/2);
  rotate(this.angle);
  fill(255);
  noStroke();
  ellipse(this.x,this.y,10);
  console.log(leftScoreboard.x)
  pop();
}

//update
//this method updates the angle of the decoy
Decoy.prototype.display = function(){
  this.angle += this.angleSpeed;
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
