//Card
//
// a class that holds information for a card
//
//Card constructor
function Card(image,position,value){
  //value will be used in a future version to match cards
  this.value = value;
  this.image = image;
  this.position = position;
}

//display()
//
//this method displays the card image at the proper location
Card.prototype.display = function(){
  push();
  imageMode(CENTER);
  image(this.image,this.position.x,this.position.y);
  pop();
}
