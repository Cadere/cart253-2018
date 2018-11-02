//Decoy
//
//A class that defines how a decoy acts
//Decoys look just like balls but do not do anything else than spin
//around the middle of the canvas
// they serve to confuse the players
//
//Decoy constructor
function Decoy(x,y,angle) {
  this.x = x;
  this.y = y;
  this.angle = angle;
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
  this.angle+=0.01
  pop();
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
