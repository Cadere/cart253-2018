//position
//
//A class that contains information about cartesian coordinates
//
//position constructor
function Position(x,y){
  this.x = x;
  this.y = y;
}

//update()
//
//updates the values of this.x and this.y
Position.prototype.update = function(pX,pY) {
  this.x = pX;
  this.y = pY;
}
