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
  this.turned = false;
}

//display()
//
//this method displays the card image at the proper location
Card.prototype.display = function(){
  push();
  imageMode(CENTER);
  image(this.image,this.position.x,this.position.y,cardSize,cardSize);
  //this displays the back image if the card hasn't been clicked
  if(!this.turned){
    image(cardBack,this.position.x,this.position.y,cardSize,cardSize);
  }
  pop();
}

//turnCard();
//
//this method handles if the card has been clicked
Card.prototype.turnCard = function(){
  console.log("turnCard");
  if(mouseX > this.position.x-cardSize/2 && mouseX < this.position.x+cardSize/2){
    if(mouseY > this.position.y-cardSize/2 && mouseY < this.position.y+cardSize/2 ){
      this.turned = true;
      lastCardValue = this.value;
    }
  }
}

//reset();
//
//this method resets this.turned to false
Card.prototype.reset = function(){
  this.turned = false;
}
