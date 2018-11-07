//CHARACTER
//
//A class that stores information for the paddle character
//
//Character constructor
function Character(menu,imageArray,colorArray,endImage){
  this.menu = menu;
  this.imageArray = imageArray;
  this.colorArray = colorArray;
  this.endImage = endImage;
  this.state = 0;
  this.image = this.imageArray[0];
  this.color = this.colorArray[0];
  this.lost = this.endImage[0];
}

Character.prototype.characterPicked = function(){
  this.state = this.menu.state;
  this.image = this.imageArray[this.menu.state];
  this.color = this.colorArray[this.menu.state];
  this.lost = this.endImage[this.menu.state];
}
